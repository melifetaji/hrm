const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const ApplicantRepository = require('../repositories/applyRepository');
const OpeningRepository = require('../repositories/openingRepository');
const { applySchema } = require('../validators/applyValidator');
const applicantMail = require('../utils/email/applicant');
const generateRandomFileName = require('../utils/name-generator');
const evaluate = require('../utils/ai-evaluation');

exports.postCreate = async (req, res) => {
	const openingId = req.query.id;

	if (req.files.cv.size > 10 * 1024 * 1024) {
		return res.status(413).send('File size exceeds 10MB');
	}

	if (req.files.cv.mimetype !== 'application/pdf') {
		return res.status(413).send('Only PDF is allowed');
	}

	let data = req.body;
	let cv = req.files.cv;

	const randomName = generateRandomFileName(cv.name);

	data.cv = randomName;

	let uploadPath = path.join(__dirname, '..', '/cv-uploads/') + randomName;

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
		cv.mv(uploadPath, function (err) {
			if (err) {
				throw new Error(err);
			} else {
				console.log('File uploaded successfully');
			}
		});
		res.status(200).json(application);
		await applicantMail();

		const cvData = await evaluate(application.dataValues.id, openingId);

		console.log(cvData);
	} catch (err) {
		return res.status(500).json(err.message);
	}
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
