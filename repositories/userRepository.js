const ProjectEmployee = require('../models').projectEmployee;
const Employee = require('../models').employee;
const Project = require('../models').project;
const Salary = require('../models').salary;
class UserRepository {
	async getUserById(id) {
		try {
			return await Employee.findByPk(id);
		} catch (error) {
			throw new Error('Failed to get user by ID');
		}
	}
	async getWithSalary(eid) {
		const user = await Employee.findOne({
			where: { eid },
			include: { model: Salary },
		});
		return user;
	}
	async getUserByEmail(email) {
		try {
			return await Employee.findOne({ where: { email } });
		} catch (error) {
			throw new Error('Failed to get user by email');
		}
	}
	async getAllEmails() {
		try {
			const emails = await Employee.findAll({
				attributes: ['email'],
				raw: true,
			});

			return emails.map((obj) => obj.email);
		} catch (error) {
			throw new Error('Failed to get user emails');
		}
	}

	async getAdminEmails() {
		try {
			const emails = await Employee.findAll({
				attributes: ['email'],
				raw: true,
				where: { role: 'admin' },
			});

			return emails.map((obj) => obj.email);
		} catch (error) {
			throw new Error('Failed to get user emails');
		}
	}

	async getUsersByDepartment(did) {
		try {
			return await Employee.findAll({ where: { did } });
		} catch (error) {
			throw new Error('Failed to get user by did');
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
			throw new Error('Error retrieving users by project');
		}
	}

	async createUser(userData) {
		try {
			return await Employee.create(userData);
		} catch (error) {
			throw new Error('Failed to create user');
		}
	}

	async createSalary(salaryData) {
		try {
			return await Salary.create(salaryData);
		} catch (error) {
			throw new Error('Failed to create user');
		}
	}

	async updateSalary(eid, updatedSalaryData) {
		try {
			const user = await Employee.findByPk(eid);
			if (!user) {
				throw new Error('User not found.');
			}

			const salary = await user.getSalary();
			if (!salary) {
				throw new Error('Salary not found.');
			}

			await salary.update(updatedSalaryData);

			return salary;
		} catch (error) {
			throw new Error('Failed to update salary');
		}
	}

	async updateUser(id, updatedUserData) {
		try {
			const result = await Employee.update(updatedUserData, {
				where: { eid: id },
			});
		} catch (error) {
			throw new Error(error);
		}
	}

	async deleteUser(id) {
		try {
			const result = await Employee.destroy({ where: { eid: id } });
			if (result === 0) {
				throw new Error('User not found.');
			}
		} catch (error) {
			throw new Error('Failed to delete user');
		}
	}

	async assignToProject(employeeEid, projectId) {
		try {
			return await ProjectEmployee.create({ employeeEid, projectId });
		} catch (error) {
			throw new Error('Failed to assign user to project');
		}
	}
}

module.exports = new UserRepository();
