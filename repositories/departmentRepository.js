const Department = require('../models').department;

class DepartmentRepository {
	async getAll() {
		try {
			return await Department.findAll();
		} catch (error) {
			throw new Error('Failed to get Departments: ' + error.message);
		}
	}

	async getById(id) {
		try {
			return await Department.findByPk(id);
		} catch (error) {
			throw new Error('Failed to get Department by ID: ' + error.message);
		}
	}

	async create(data) {
		try {
			return await Department.create(data);
		} catch (error) {
			throw new Error('Failed to create Department: ' + error.message);
		}
	}

	async update(id, updated) {
		try {
			const result = await Department.update(updated, { where: { id: id } });
			if (result[0] === 0) {
				throw new Error('Department not found.');
			}
		} catch (error) {
			throw new Error('Failed to update Department: ' + error.message);
		}
	}

	async delete(id) {
		try {
			const result = await Department.destroy({ where: { id: id } });
			if (result === 0) {
				throw new Error('Department not found.');
			}
		} catch (error) {
			throw new Error('Failed to delete Department: ' + error.message);
		}
	}
}

module.exports = new DepartmentRepository();
