const Opening = require('../models').opening;

class OpeningRepository {
	async getAll() {
		return Opening.findAll();
	}

	async getById(id) {
		return Opening.findByPk(id);
	}

	async create(data) {
		return Opening.create(data);
	}

	async update(id, updatedAnn) {
		return Opening.update(updatedAnn, { where: { id: id } });
	}

	async delete(id) {
		return Opening.destroy({ where: { id: id } });
	}
}

module.exports = new OpeningRepository();
