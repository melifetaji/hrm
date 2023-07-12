const Project = require('../models').project;

class ProjectRepository {
	async getAll() {
		try {
			return await Project.findAll();
		} catch (error) {
			throw new Error('Failed to get Projects: ' + error.message);
		}
	}

	async getById(id) {
		try {
			return await Project.findByPk(id);
		} catch (error) {
			throw new Error('Failed to get Project by ID: ' + error.message);
		}
	}

	async create(data) {
		try {
			return await Project.create(data);
		} catch (error) {
			throw new Error('Failed to create Project: ' + error.message);
		}
	}

	async update(id, updated) {
		try {
			const result = await Project.update(updated, { where: { id: id } });
			if (result[0] === 0) {
				throw new Error('Project not found.');
			}
		} catch (error) {
			throw new Error('Failed to update Project: ' + error.message);
		}
	}

	async delete(id) {
		try {
			const result = await Project.destroy({ where: { id: id } });
			if (result === 0) {
				throw new Error('Project not found.');
			}
		} catch (error) {
			throw new Error('Failed to delete Project: ' + error.message);
		}
	}
}

module.exports = new ProjectRepository();
