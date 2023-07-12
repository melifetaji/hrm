const ProjectEmployee = require('../models').projectEmployee;
const Employee = require('../models').employee;
const Project = require('../models').project;

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

	async getUsersByDepartment(did) {
		try {
			return await Employee.findAll({ where: { did } });
		} catch (error) {
			throw new Error('Failed to get user by did: ' + error.message);
		}
	}

	async getUsersByProject(projectId) {
		try {
			const users = await Employee.findAll({
				include: [
					{
						model: Project,
						through: {
							model: ProjectEmployee,
							where: { projectId: projectId },
						},
						attributes: [],
						required: true,
					},
				],
			});

			return users;
		} catch (error) {
			throw new Error('Error retrieving users by project: ' + error.message);
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

	async assignToProject(employeeEid, projectId) {
		try {
			console.log(employeeEid, 'EIDDDDDD');
			console.log(projectId, 'PIDDDDDD');
			return await ProjectEmployee.create({ employeeEid, projectId });
		} catch (error) {
			throw new Error('Failed to create user: ' + error.message);
		}
	}
}

module.exports = new UserRepository();
