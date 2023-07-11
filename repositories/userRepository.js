const Employee = require('../models').employee;

class UserRepository {
	async getUserById(id) {
		try {
			return await Employee.findByPk(id);
		} catch (error) {
			throw new Error('Failed to get user by ID: ' + error.message);
		}
	}

	async getUserByEmail(email) {
		try {
			return await Employee.findOne({ where: { email } });
		} catch (error) {
			throw new Error('Failed to get user by email: ' + error.message);
		}
	}

	async createUser(userData) {
		try {
			return await Employee.create(userData);
		} catch (error) {
			throw new Error('Failed to create user: ' + error.message);
		}
	}

	async updateUser(id, updatedUserData) {
		try {
			const result = await Employee.update(updatedUserData, {
				where: { eid: id },
			});
			if (result[0] === 0) {
				throw new Error('User not found.');
			}
		} catch (error) {
			throw new Error('Failed to update user: ' + error.message);
		}
	}

	async deleteUser(id) {
		try {
			const result = await Employee.destroy({ where: { eid: id } });
			if (result === 0) {
				throw new Error('User not found.');
			}
		} catch (error) {
			throw new Error('Failed to delete user: ' + error.message);
		}
	}
}

module.exports = new UserRepository();
