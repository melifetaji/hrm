const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const crypto = require('crypto');
const moment = require('moment');
const forgotMail = require('../utils/email/forgot-password');

const userRepository = require('../repositories/userRepository');
const ResetTokenRepository = require('../repositories/resetTokenRepository');

exports.reset = async (req, res) => {
	const { token, password } = req.body;

	try {
		const resetToken = await ResetTokenRepository.findByToken(token);

		if (!resetToken) {
			return res.status(400).json({ error: 'Invalid or expired token.' });
		}

		let user = await userRepository.getUserById(resetToken.eid);

		user = user.dataValues;
		console.log(user);
		if (!user) {
			return res.status(400).json({ error: 'User not found.' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		user.password = hashedPassword;
		await userRepository.updateUser(resetToken.eid, {
			password: hashedPassword,
		});

		await ResetTokenRepository.delete(token);

		res.status(200).json({ message: 'Password reset successful.' });
	} catch (error) {
		res.status(500).json(error.message);
	}
};

exports.forgot = async (req, res) => {
	const { email } = req.body;

	try {
		const result = await generateToken(email);
		if (result) {
			res
				.status(200)
				.json({ message: 'Password reset email sent successfully.' });
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
};

async function generateToken(email) {
	try {
		const user = await userRepository.getUserByEmail(email);
		if (!user) {
			throw new Error('User not found.');
		}

		const token = crypto.randomBytes(32).toString('hex');

		const expiresAt = moment().add(1, 'hour');

		await ResetTokenRepository.create(token, expiresAt, user.eid);

		await forgotMail(email, token);

		return true;
	} catch (error) {
		throw error;
	}
}
