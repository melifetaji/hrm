const Announcement = require('../models').announcements;

class announcementRepository {
	async getAllAnn() {
		return Announcement.findAll();
	}

	async getAnnById(id) {
		return Announcement.findByPk(id);
	}

	async createAnn(data) {
		return Announcement.create(data);
	}

	async updateAnn(id, updatedAnn) {
		return Employee.update(updatedAnn, { where: { id: id } });
	}

	async deleteAnn(id) {
		return Employee.destroy({ where: { id: id } });
	}
}

module.exports = new announcementRepository();
