const { Op } = require('sequelize');
const ResetToken = require('../models').resetToken;

class ResetTokenRepository {
	async create(token, expiresAt, eid) {
		try {
			return await ResetToken.create({
				token,
				expiresAt,
				eid,
			});
		} catch (error) {
			throw new Error('Failed to create ResetToken');
		}
	}

	async findByToken(token) {
		try {
			return await ResetToken.findOne({
				where: {
					token,
					expiresAt: { [Op.gt]: new Date() },
				},
			});
		} catch (error) {
			throw new Error('Failed to get ResetToken by token');
		}
	}

	async delete(token) {
		try {
			const result = await ResetToken.destroy({
				where: { token },
			});
			if (result === 0) {
				throw new Error('ResetToken not found.');
			}
		} catch (error) {
			throw new Error('Failed to delete ResetToken');
		}
	}
}

module.exports = new ResetTokenRepository();
