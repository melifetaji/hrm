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
