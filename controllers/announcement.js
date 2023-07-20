const express = require('express');
const announcementRepository = require('../repositories/announcementRepository');
const passport = require('passport');
const announcementMail = require('../utils/email/announcement');

const {
	createSchema,
	updateSchema,
} = require('../validators/announcementValidator');

exports.postCreate = async (req, res) => {
	let announcement = req.body;
	announcement.eid = req.user.eid;

	const { error, value } = createSchema.validate(announcement);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		const announcement = await announcementRepository.createAnn(value);
		await announcementMail(announcement);

		return res.status(200).json(value);
	} catch (err) {
		return res.status(500).json(err);
	}
};

exports.getAll = async (req, res) => {
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
