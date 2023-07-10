const Opening = require('../models').opening;

class OpeningRepository {
	async getAll() {
		try {
			return await Opening.findAll();
		} catch (error) {
			throw new Error('Failed to get openings: ' + error.message);
		}
	}

	async getById(id) {
		try {
			return await Opening.findByPk(id);
		} catch (error) {
			throw new Error('Failed to get opening by ID: ' + error.message);
		}
	}

	async create(data) {
		try {
			return await Opening.create(data);
		} catch (error) {
			throw new Error('Failed to create opening: ' + error.message);
		}
	}

	async update(id, updated) {
		try {
			const result = await Opening.update(updated, { where: { id: id } });
			if (result[0] === 0) {
				throw new Error('Opening not found.');
			}
		} catch (error) {
			throw new Error('Failed to update opening: ' + error.message);
		}
	}

	async delete(id) {
		try {
			const result = await Opening.destroy({ where: { id: id } });
			if (result === 0) {
				throw new Error('Opening not found.');
			}
		} catch (error) {
			throw new Error('Failed to delete opening: ' + error.message);
		}
	}
}

module.exports = new OpeningRepository();
