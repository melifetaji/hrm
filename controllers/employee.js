const express = require('express');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const passport = require('passport');

const { registerSchema, updateSchema } = require('../validators/userValidator');

exports.postLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
	} catch (e) {
		res.status(500).json('An error occurred while logging in');
	}
};

exports.getUserById = async (req, res) => {
	try {
		const id = req.params.id;
		let user = await userRepository.getUserById(id);

		delete user.dataValues.password;
		user = user.dataValues;

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json('An error occurred while finding user');
	}
};

exports.postCreateUser = async (req, res) => {
	try {
		const data = req.body;

		// Validation
		const { error, value } = registerSchema.validate(data);

		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(value.password, salt);

		value.password = hashedPassword;

		await userRepository.createUser(value);

		passport.authenticate('local')(req, res, () => {
			res
				.status(200)
				.json({ message: 'User registered and logged in successfully.' });
		});
	} catch (err) {
		res
			.status(500)
			.json({ error: 'An error occurred while registering the user.' });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		await userRepository.deleteUser(id);
		res.status(200).json('User deleted successfully!');
	} catch (err) {
		res.status(500).json('An error occurred while deleting the user.');
	}
};

exports.patchUpdateUser = async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;

		const { error, value } = updateSchema.validate(data);

		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}

		await userRepository.updateUser(id, data);
		res.status(200).json('User updated successfully!');
	} catch (err) {
		res.status(500).json('An error occurred while updating the user.');
	}
};
