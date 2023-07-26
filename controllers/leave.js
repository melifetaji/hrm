const express = require('express');
const LeavesRepository = require('../repositories/leaveRepository');
const passport = require('passport');

const { createSchema, approveSchema } = require('../validators/leaveValidator');

exports.postCreate = async (req, res) => {
	const data = req.body;

	let { error, value } = createSchema.validate(data);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	value.eid = req.user.eid;

	try {
		const leave = await LeavesRepository.create(value);
		return res.status(200).json(leave);
	} catch (err) {
		return res.status(500).send(err.message);
	}
};

exports.getAll = async (req, res) => {
	const status = req.query.status;

	try {
		let leaves;

		if (!status) {
			leaves = await LeavesRepository.getAll();
		} else {
			leaves = await LeavesRepository.getByStatus(status);
		}

		if (leaves.length === 0) {
			return res.status(404).json('No leave requests were found');
		}

		res.status(200).json(leaves);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

exports.patchApprove = async (req, res) => {
	const id = req.params.id;
	const data = req.body;

	const { error, value } = approveSchema.validate(data);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		await LeavesRepository.approve(id, value);
		res.status(200).json('Success');
	} catch (err) {
		res.status(500).json(err.message);
	}
};

exports.getByEmployee = async (req, res) => {
	const id = req.params.id;

	if (req.user.role !== 'admin' || req.user.eid !== id) {
		return res.status(403).json({ err: 'No permissions' });
	}

	try {
		const leaves = await LeavesRepository.getByEmployee(id);
		if (leaves.length === 0) {
			return res.status(404).json({ err: 'No leave requests were found' });
		}
		return res.status(200).json(leaves);
	} catch (err) {
		return res.status(500).json(err.message);
	}
};

exports.deleteLeave = async (req, res) => {
	const id = req.params.id;
	const eid = req.user.eid;

	const leaveToDelete = await LeavesRepository.getById(id);

	if (!leaveToDelete) {
		return res.status(404).json({ err: 'Leave request not found' });
	}

	if (req.user.role !== 'admin' || leaveToDelete.eid !== eid) {
		return res.status(400).json({ err: 'No permissions' });
	}

	try {
		await LeavesRepository.delete(id);
		return res.status(200).json('Leave request deleted successfully');
	} catch (err) {
		return res.status(500).json(err.message);
	}
};

exports.getById = async (req, res) => {
	const id = req.params.id;

	try {
		const leave = await LeavesRepository.getById(id);
		if (!leave) {
			return res.status(404).json('Leave request not found');
		}
		if (req.user.role !== 'admin' || leave.eid !== req.user.eid) {
			return res.status(400).json({ err: 'No permissions' });
		}
		return res.status(200).json(leave);
	} catch (err) {
		res.status(500).json(err.message);
	}
};
