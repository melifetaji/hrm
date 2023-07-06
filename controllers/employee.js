const express = require('express');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');

const { registerSchema, updateSchema } = require('../validators/userValidator');

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

		const hashedPassword = await bcrypt.hash(value.password, 10);
		value.password = hashedPassword;

		await userRepository.createUser(value);
		res.status(200).json({ message: 'User registered successfully.' });
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
