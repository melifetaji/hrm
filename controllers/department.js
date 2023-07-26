const express = require('express');
const DepartmentRepository = require('../repositories/DepartmentRepository');
const passport = require('passport');

const {
	createSchema,
	updateSchema,
} = require('../validators/departmentValidator');

exports.postCreate = async (req, res) => {
	const data = req.body;
	const { error, value } = createSchema.validate(data);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		const department = await DepartmentRepository.create(value);
		return res.status(200).json(department);
	} catch (err) {
		return res.status(500).json({ err });
	}
};

exports.getAll = async (req, res) => {
	try {
		const all = await DepartmentRepository.getAll();
		if (all.length === 0) {
			return res.status(404).json({ err: 'No departments were found!' });
		}
		res.status(200).json(all);
	} catch (err) {
		res
			.status(500)
			.json({ err: 'An error occurred while fetching departments!' });
	}
};

exports.getById = async (req, res) => {
	const id = req.params.id;
	if (!req.user.did == id) {
		return res.status(403).json({ err: 'No permissions' });
	}

	try {
		const department = await DepartmentRepository.getById(id);

		if (department) {
			return res.status(200).json(department);
		}

		return res.status(404).json({ err: 'Department not found' });
	} catch (err) {
		return res
			.status(500)
			.json({ err: 'An error occurred while fetching department!' });
	}
};

exports.patchUpdate = async (req, res) => {
	const id = req.params.id;
	const { error, value } = updateSchema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		await DepartmentRepository.update(id, value);
		return res.status(200).json('Successfully updated department');
	} catch (err) {
		return res
			.status(500)
			.json({ err: 'An error occurred while updating department!' });
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;

	try {
		await DepartmentRepository.delete(id);
		res.status(200).json('Successfully deleted department');
	} catch (err) {
		res
			.status(500)
			.json({ err: 'An error occurred while deleting department!' });
	}
};
