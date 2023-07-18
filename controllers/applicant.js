const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const ApplicantRepository = require('../repositories/applyRepository');
const OpeningRepository = require('../repositories/openingRepository');
const { applySchema } = require('../validators/applyValidator');

exports.postCreate = async (req, res) => {
	const openingId = req.query.id;
	let data = req.body;

	const { error, value } = applySchema.validate(data);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		const application = await ApplicantRepository.create(value);
		await ApplicantRepository.createApplicantOpening(
			application.dataValues.id,
			openingId
		);
	} catch (err) {
		return res.status(500).json(err.message);
	}

	return res.status(200).json('Applied Successfully');
};

exports.getApplicantsByOpenings = async (req, res) => {
	if (!req.isAuthenticated() || !req.user) {
		return res.status(403).json({ err: 'Not authorized' });
	}

	const openingId = req.query.id;
	try {
		const applicants = await ApplicantRepository.getApplicantsByOpening(
			openingId
		);
		if (applicants.length === 0) {
			return res.status(404).json({ err: 'No applicants were found' });
		}
		return res.status(200).json(applicants);
	} catch (err) {
		return res
			.status(500)
			.json({ err: 'An error occurred while fetching applicants' });
	}
};

exports.getApplicantById = async (req, res) => {
	const id = req.params.id;

	try {
		const applicant = await ApplicantRepository.getById(id);
		if (!applicant) {
			return res.status(404).json({ err: 'Applicant not found' });
		}
		return res.status(200).json(applicant);
	} catch (err) {
		return res.status(500).json(err);
	}
};

exports.getApplicants = async (req, res) => {
	try {
		const applicants = await ApplicantRepository.getAll();
		if (!applicants) {
			return res.status(404).json({ err: 'Applicant not found' });
		}
		return res.status(200).json(applicants);
	} catch (err) {
		return res.status(500).json(err);
	}
};
