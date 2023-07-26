const Announcement = require('../models').announcements;

class announcementRepository {
	async getAllAnn() {
		try {
			return await Announcement.findAll();
		} catch (error) {
			throw new Error('Failed to get announcements');
		}
	}

	async getAnnById(id) {
		try {
			return await Announcement.findByPk(id);
		} catch (error) {
			throw new Error('Failed to get announcement by ID');
		}
	}

	async createAnn(data) {
		try {
			return await Announcement.create(data);
		} catch (error) {
			throw new Error('Failed to create announcement');
		}
	}

	async updateAnn(id, updatedAnn) {
		try {
			const result = await Announcement.update(updatedAnn, {
				where: { id },
			});
			if (result[0] === 0) {
				throw new Error('Announcement not found.');
			}
			return result;
		} catch (error) {
			throw new Error('Failed to update announcement');
		}
	}

	async deleteAnn(id) {
		try {
			const result = await Announcement.destroy({ where: { id: id } });
			if (result === 0) {
				throw new Error('Announcement not found.');
			}
		} catch (error) {
			throw new Error('Failed to delete announcement');
		}
	}
}

module.exports = new announcementRepository();
