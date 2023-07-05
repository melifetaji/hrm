'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class projects extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsToMany(models.department, { through: 'ProjectsDepartments' });
			this.belongsTo(models.employee, { foreignKey: 'manager' });
		}
	}
	projects.init(
		{
			pid: { type: DataTypes.INTEGER, primaryKey: true },
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'project',
		}
	);
	return projects;
};
