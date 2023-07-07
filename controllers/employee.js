const express = require('express');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const passport = require('passport');

const { registerSchema, updateSchema } = require('../validators/userValidator');

exports.getLogout = (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
};

exports.postLogout = (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
};

exports.postLogin = async (req, res) => {
	console.log(req.body);
	passport.authenticate('local');
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
		console.log('comes here');
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
		res.status(500).json({ error: 'An error occurred while creating user' });
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
	if (!req.isAuthenticated()) {
		return res.send('You are not authenticated');
	}
	try {
		const id = req.params.id;
		const data = req.body;
		console.log(req.user);
		if (req.user.eid !== id) {
			return res.status(401).send('You can only update your own profile');
		}

		const { error, value } = updateSchema.validate(data);

		if (error) {
			return res.status(403).json({ error: error.details[0].message });
		}

		await userRepository.updateUser(id, data);
		res.status(200).json('User updated successfully!');
	} catch (err) {
		res.status(500).json({ err });
	}
};
