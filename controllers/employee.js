const express = require('express');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const passport = require('passport');

const {
	registerSchema,
	updateSchema,
	passwordSchema,
} = require('../validators/userValidator');

exports.getUserByDepartment = async (req, res) => {
	const did = req.query.did;
	console.log(did);
	try {
		if (!req.isAuthenticated()) {
			return res.status(403).json({ err: 'You need to log in' });
		}
		const users = await userRepository
			.getUsersByDepartment(did)
			.catch((e) => console.log(e));

		if (!users) {
			return res.status(404).json({ err: 'No users were found!' });
		}

		return res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ err: "Couldn't fetch your profile" });
	}
};

exports.getProfile = (req, res) => {
	try {
		if (!req.isAuthenticated()) {
			return res.status(403).json({ err: 'You need to log in' });
		}
		return res.status(200).json(req.user);
	} catch (err) {
		res.status(500).json({ err: "Couldn't fetch your profile" });
	}
};

exports.getLogout = (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		req.session.destroy(function (err) {
			if (!err) {
				res
					.status(200)
					.clearCookie('connect.sid', { path: '/' })
					.json({ status: 'Success' });
			}
		});
	});
};

exports.postLogin = async (req, res, next) => {
	if (req.isAuthenticated()) {
		res.status(200);
	}

	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(403).json({ err: 'Not authorized' });
		}
		req.login(user, function (err) {
			if (err) {
				return next(err);
			}
			return res.sendStatus(200);
		});
	})(req, res, next);
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
		res.status(500).json('An error occurred while updating the user.');
	}
};

exports.patchPassword = async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.send('You are not authenticated');
	}
	const data = req.body;
	const { error, value } = passwordSchema.validate(data);

	if (error) {
		return res.status(403).json({ error: error.details[0].message });
	}

	if (data.password !== data.confirm) {
		return res.status(403).json({ error: 'Password confirmation incorrect' });
	}

	const salt = await bcrypt.genSalt(10);
	const password = await bcrypt.hash(data.password, salt);

	try {
		await userRepository.updateUser(req.user.eid, { password: password });
		return res.status(200).json('Password updated successfully');
	} catch (err) {
		return res.status(500).json('An error occurred while changing password!');
	}
};
