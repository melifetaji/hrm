const express = require('express');
const announcementRepository = require('../repositories/announcementRepository');
const passport = require('passport');

const {
	createSchema,
	updateSchema,
} = require('../validators/announcementValidator');

exports.postCreate = async (req, res) => {
	if (!req.isAuthenticated() || !req.user) {
		return res.status(403).json({ err: 'Not authorized' });
	}

	if (req.user.role === 'basic') {
		return res.status(403).json({ err: 'No permissions' });
	}

	let announcement = req.body;
	announcement.eid = req.user.eid;

	const { error, value } = createSchema.validate(announcement);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		await announcementRepository.createAnn(value);
		res.status(200).json(value);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.getAll = async (req, res) => {
	if (!req.isAuthenticated() || !req.user) {
		return res.status(403).json({ err: 'Not authorized' });
	}

	try {
		const all = await announcementRepository.getAllAnn();
		if (!all) {
			return res.status(404).json({ err: 'No announcements were found!' });
		}
		res.status(200).json(all);
	} catch (err) {
		res
			.status(500)
			.json({ err: 'An error occurred while fetching announcements!' });
	}
};

exports.getById = async (req, res) => {
	if (!req.isAuthenticated() || !req.user) {
		return res.status(403).json({ err: 'Not authorized' });
	}

	try {
		const id = req.params.id;

		const ann = await announcementRepository.getAnnById(id);
		if (!ann) {
			return res.status(404).json({ err: 'Announcement not found' });
		}
		return res.status(200).json(ann);
	} catch (err) {
		return res
			.status(500)
			.json({ err: 'An error occurred while fetching announcements!' });
	}
};

exports.patchUpdate = async (req, res) => {
	if (!req.isAuthenticated() || !req.user) {
		return res.status(403).json({ err: 'Not authorized' });
	}
	if (req.user.role == 'basic') {
		return res.status(403).json({ err: 'Not authorized' });
	}

	const id = req.params.id;
	const { error, value } = updateSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		await announcementRepository.updateAnn(id, value);
		return res.status(200).json('Successfully updated announcement');
	} catch (err) {
		return res
			.status(500)
			.json({ err: 'An error occurred while updating announcement!' });
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
		await announcementRepository.deleteAnn(id);
		res.status(200).json('Successfully deleted announcement');
	} catch (err) {
		res
			.status(500)
			.json({ err: 'An error occurred while deleting announcement!' });
	}
};
