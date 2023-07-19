const Opening = require('../models').opening;

class OpeningRepository {
	async getAll() {
		try {
			return await Opening.findAll();
		} catch (error) {
			throw new Error('Failed to get openings');
		}
	}

	async getById(id) {
		try {
			return await Opening.findByPk(id);
		} catch (error) {
			throw new Error('Failed to get opening by ID');
		}
	}

	async create(data) {
		try {
			return await Opening.create(data);
		} catch (error) {
			throw new Error('Failed to create opening');
		}
	}

	async update(id, updated) {
		try {
			const result = await Opening.update(updated, { where: { id: id } });
			if (result[0] === 0) {
				throw new Error('Opening not found.');
			}
		} catch (error) {
			throw new Error('Failed to update opening');
		}
	}

	async delete(id) {
		try {
			const result = await Opening.destroy({ where: { id: id } });
			if (result === 0) {
				throw new Error('Opening not found.');
			}
		} catch (error) {
			throw new Error('Failed to delete opening');
		}
	}
}

module.exports = new OpeningRepository();
