const Employee = require('../models').employee;

class userRepository {
	async getUserById(userId) {
		return Employee.findByPk(userId);
	}

	async getUserByEmail(email) {
		return Employee.findOne({ where: { email } });
	}

	async createUser(userData) {
		return Employee.create(userData);
	}

	async updateUser(userId, updatedUserData) {
		return Employee.update(updatedUserData, { where: { eid: userId } });
	}

	async deleteUser(userId) {
		return Employee.destroy({ where: { eid: userId } });
	}
}

module.exports = new userRepository();
