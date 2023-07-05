'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class department extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsToMany(models.project, { through: 'ProjectsDepartments' });
			this.hasMany(models.opening, { foreignKey: 'did' });
			this.belongsToMany(models.employee, {
				through: 'DepartmentManager',
			});
			this.belongsToMany(models.employee, {
				through: 'EmployeeDepartment',
			});
		}
	}
	department.init(
		{
			did: { type: DataTypes.INTEGER, primaryKey: true },
			name: { type: DataTypes.STRING, allowNull: false },
			description: DataTypes.STRING,
			manager: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'department',
		}
	);
	return department;
};
