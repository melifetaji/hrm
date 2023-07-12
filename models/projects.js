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
			this.belongsToMany(models.employee, {
				through: 'projectEmployee',
			});
		}
	}
	projects.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			status: {
				type: DataTypes.ENUM('pending', 'ongoing', 'completed'),
				defaultValue: 'pending',
			},
		},
		{
			sequelize,
			modelName: 'project',
		}
	);
	return projects;
};
