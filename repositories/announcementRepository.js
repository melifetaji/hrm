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
		return Announcement.update(updatedAnn, { where: { id: id } });
	}

	async deleteAnn(id) {
		return Announcement.destroy({ where: { id: id } });
	}
}

module.exports = new announcementRepository();
