const express = require('express');
const openingRepository = require('../repositories/openingRepository');
const passport = require('passport');

const {
	createSchema,
	updateSchema,
} = require('../validators/openingValidator');

exports.postCreate = async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ err: 'Not authenticated' });
	}
	if (req.user.role == 'basic') {
		return res.status(403).json({ err: 'No permissions' });
	}
	const data = req.body;
	const { error, value } = createSchema.validate(data);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		await openingRepository.create(value);
		return res.status(200).json('Opening successfully created!');
	} catch (err) {
		return res.status(500).json({ err });
	}
};

exports.getAll = async (req, res) => {
	if (!req.isAuthenticated() || !req.user) {
		return res.status(403).json({ err: 'Not authorized' });
	}

	try {
		const all = await openingRepository.getAll();
		if (!all) {
			return res.status(404).json({ err: 'No openings were found!' });
		}
		res.status(200).json(all);
	} catch (err) {
		res.status(500).json({ err: 'An error occurred while fetching openings!' });
	}
};

exports.getById = async (req, res) => {
	if (!req.isAuthenticated() || !req.user) {
		return res.status(403).json({ err: 'Not authorized' });
	}

	const id = req.params.id;

	try {
		const opening = await openingRepository.getById(id);

		if (opening) {
			return res.status(200).json(opening);
		}

		return res.status(404).json({ err: 'Opening not found' });
	} catch (err) {
		return res
			.status(500)
			.json({ err: 'An error occurred while fetching openings!' });
	}
};

exports.patchUpdate = async (req, res) => {
	if (!req.isAuthenticated() || !req.user) {
		return res.status(403).json({ err: 'Not authorized' });
	}
	if (req.user.role == 'basic') {
		return res.status(403).json({ err: 'No permissions' });
	}

	const id = req.params.id;
	const { error, value } = updateSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		await openingRepository.update(id, value);
		return res.status(200).json('Successfully updated opening');
	} catch (err) {
		return res
			.status(500)
			.json({ err: 'An error occurred while updating opening!' });
	}
};

exports.delete = async (req, res) => {
	if (!req.isAuthenticated() || !req.user) {
		return res.status(403).json({ err: 'Not authorized' });
	}
	if (req.user.role == 'basic') {
		return res.status(403).json({ err: 'Not authorized' });
	}

	const id = req.params.id;

	try {
		await openingRepository.delete(id);
		res.status(200).json('Successfully deleted opening');
	} catch (err) {
		res.status(500).json({ err: 'An error occurred while deleting opening!' });
	}
};
