const { Sequelize } = require('../models');

const Leaves = require('../models').leaves;
const Op = Sequelize.Op;

class LeavesRepository {
	async create(leaveData) {
		try {
			const { startDate, endDate, eid } = leaveData;

			// Calculate the start and end dates of the current year
			const currentYear = new Date().getFullYear();
			const yearStartDate = new Date(currentYear, 0, 1);
			const yearEndDate = new Date(currentYear, 11, 31);

			const leaves = await Leaves.findAll({
				where: {
					eid,
					status: 'approved',
					startDate: {
						[Op.between]: [yearStartDate, yearEndDate],
					},
				},
			});

			let totalDaysCount = 0;
			for (const leave of leaves) {
				const startDate = new Date(leave.startDate);
				const endDate = new Date(leave.endDate);
				const daysCount =
					Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
				totalDaysCount += daysCount;
			}

			const leavesLimit = 30;

			const requestedDaysCount =
				Math.ceil(
					(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
				) + 1;

			if (totalDaysCount + requestedDaysCount >= leavesLimit) {
				throw new Error(
					`You have reached the maximum limit of ${leavesLimit} leaves for the year`
				);
			}

			// Create the leave
			const leave = await Leaves.create(leaveData);
			return leave;
		} catch (error) {
			throw error;
		}
	}

	async getAll() {
		try {
			const leaves = await Leaves.findAll();
			return leaves;
		} catch (error) {
			throw new Error('Failed to retrieve leaves');
		}
	}

	async getByStatus(status) {
		try {
			const leaves = await Leaves.findAll({ where: { status } });
			return leaves;
		} catch (error) {
			throw new Error('Failed to retrieve leaves by status');
		}
	}

	async getByEmployee(eid) {
		try {
			const leaves = await Leaves.findAll({ where: { eid } });
			return leaves;
		} catch (error) {
			throw new Error('Failed to retrieve leaves by employee');
		}
	}

	async getById(id) {
		try {
			const leave = await Leaves.findOne({ where: { id } });
			return leave;
		} catch (error) {
			throw new Error('Failed to retrieve leave');
		}
	}

	async approve(leaveId, updateData) {
		try {
			const leave = await Leaves.findByPk(leaveId);
			if (!leave) {
				throw new Error('Leave not found');
			}

			await leave.update(updateData);
			return leave;
		} catch (error) {
			throw new Error('Failed to update leave');
		}
	}

	async delete(leaveId) {
		try {
			const leave = await Leaves.findByPk(leaveId);
			if (!leave) {
				throw new Error('Leave not found');
			}

			await leave.destroy();
			return true;
		} catch (error) {
			throw new Error('Failed to delete leave');
		}
	}
}

module.exports = new LeavesRepository();
