const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const generateToken = require('../utils/token-generator');

const userRepository = require('../repositories/userRepository');
const ResetTokenRepository = require('../repositories/resetTokenRepository');

const { passwordSchema } = require('../validators/userValidator');

exports.reset = async (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}

	const { token, password, confirm } = req.body;

	const { error, value } = passwordSchema.validate({ password, confirm });

	if (error) {
		return res.status(403).json({ error: error.details[0].message });
	}

	if (password !== confirm) {
		return res.status(403).json({ error: 'Password confirmation incorrect' });
	}

	try {
		const resetToken = await ResetTokenRepository.findByToken(token);

		if (!resetToken) {
			return res.status(400).json({ error: 'Invalid or expired token.' });
		}

		let user = await userRepository.getUserById(resetToken.eid);

		user = user.dataValues;

		if (!user) {
			return res.status(400).json({ error: 'User not found.' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(value.password, salt);

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
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}

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
