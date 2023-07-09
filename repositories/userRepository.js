const Employee = require('../models').employee;

class userRepository {
	async getUserById(id) {
		return Employee.findByPk(id);
	}

	async getUserByEmail(email) {
		return Employee.findOne({ where: { email } });
	}

	async createUser(userData) {
		return Employee.create(userData);
	}

	async updateUser(id, updatedUserData) {
		return Employee.update(updatedUserData, { where: { eid: id } });
	}

	async deleteUser(id) {
		return Employee.destroy({ where: { eid: id } });
	}
}

module.exports = new userRepository();
