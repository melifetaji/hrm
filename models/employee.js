'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class employee extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.announcements, { foreignKey: 'eid' });
			this.hasMany(models.project, { foreignKey: 'manager' });
			this.belongsToMany(models.department, {
				through: 'DepartmentManager',
			});
			this.hasOne(models.salary, { foreignKey: 'eid' });
			this.hasMany(models.leaves, { foreignKey: 'eid' });
			this.belongsToMany(models.department, {
				through: 'EmployeeDepartment',
			});
		}
	}
	employee.init(
		{
			eid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			fname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			gender: DataTypes.ENUM('male', 'female'),
			age: { type: DataTypes.INTEGER, allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false, unique: true },
			password: { type: DataTypes.STRING, allowNull: false },
			position: { type: DataTypes.STRING },
			role: {
				type: DataTypes.ENUM('admin', 'manager', 'basic'),
				defaultValue: 'basic',
			},
			ssn: { type: DataTypes.STRING },
		},
		{
			sequelize,
			modelName: 'employee',
		}
	);
	return employee;
};
