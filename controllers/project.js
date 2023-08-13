const express = require('express');
const ProjectRepository = require('../repositories/projectRepository');
const passport = require('passport');

const {
	createSchema,
	updateSchema,
} = require('../validators/projectValidator');

exports.postCreate = async (req, res) => {
	const data = req.body;
	const { error, value } = createSchema.validate(data);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	if (!value.manager) {
		value.manager = req.user.eid;
	}

	try {
		const project = await ProjectRepository.create(value);
		return res.status(200).json(project);
	} catch (err) {
		return res.status(500).json({ error: 'Failed to create project.' });
	}
};

exports.getAll = async (req, res) => {
	try {
		const all = await ProjectRepository.getAll();
		if (all.length === 0) {
			return res.status(404).json({ err: 'No projects were found!' });
		}
		res.status(200).json(all);
	} catch (err) {
		res.status(500).json({ err: 'An error occurred while fetching projects!' });
	}
};

exports.getById = async (req, res) => {
	const id = req.params.id;

	if (req.user.role == 'basic' && !req.user.did == id) {
		return res.status(403).json({ err: 'No permissions' });
	}

	try {
		const project = await ProjectRepository.getById(id);

		if (project) {
			return res.status(200).json(project);
		}

		return res.status(404).json({ err: 'project not found' });
	} catch (err) {
		return res
			.status(500)
			.json({ err: 'An error occurred while fetching project!' });
	}
};

exports.patchUpdate = async (req, res) => {
	const id = req.params.id;
	const { error, value } = updateSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		await ProjectRepository.update(id, value);
		return res.status(200).json('Successfully updated project');
	} catch (err) {
		return res
			.status(500)
			.json({ err: 'An error occurred while updating project!' });
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;

	try {
		await ProjectRepository.delete(id);
		res.status(200).json('Successfully deleted project');
	} catch (err) {
		res.status(500).json({ err: 'An error occurred while deleting project!' });
	}
};
