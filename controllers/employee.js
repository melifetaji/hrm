const express = require('express');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');

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
		const hashedPassword = await bcrypt.hash(data.password, 10);
		data.password = hashedPassword;

		await userRepository.createUser(data);
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

		await userRepository.updateUser(id, data);
		res.status(200).json('User updated successfully!');
	} catch (err) {
		res.status(500).json('An error occurred while updating the user.');
	}
};
