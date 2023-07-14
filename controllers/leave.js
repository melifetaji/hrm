const express = require('express');
const LeavesRepository = require('../repositories/leaveRepository');
const passport = require('passport');

const { createSchema, approveSchema } = require('../validators/leaveValidator');

exports.postCreate = async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ err: 'Not authenticated' });
	}

	const data = req.body;

	let { error, value } = createSchema.validate(data);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	value.eid = req.user.eid;

	try {
		await LeavesRepository.create(value);
		return res.status(200).json('Leave request successfully submitted!');
	} catch (err) {
		return res.status(500).send(err.message);
	}
};
