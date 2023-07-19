const Department = require('../models').department;

class DepartmentRepository {
	async getAll() {
		try {
			return await Department.findAll();
		} catch (error) {
			throw new Error('Failed to get Departments');
		}
	}

	async getById(id) {
		try {
			return await Department.findByPk(id);
		} catch (error) {
			throw new Error('Failed to get Department by ID');
		}
	}

	async create(data) {
		try {
			return await Department.create(data);
		} catch (error) {
			throw new Error('Failed to create Department');
		}
	}

	async update(id, updated) {
		try {
			const result = await Department.update(updated, { where: { id: id } });
			if (result[0] === 0) {
				throw new Error('Department not found.');
			}
		} catch (error) {
			throw new Error('Failed to update Department');
		}
	}

	async delete(id) {
		try {
			const result = await Department.destroy({ where: { id: id } });
			if (result === 0) {
				throw new Error('Department not found.');
			}
		} catch (error) {
			throw new Error('Failed to delete Department');
		}
	}
}

module.exports = new DepartmentRepository();
