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
			this.hasMany(models.employee, { foreignKey: 'did' });
			this.belongsToMany(models.project, { through: 'ProjectsDepartments' });
			this.belongsToMany(models.employee, {
				through: 'DepartmentManager',
			});
		}
	}
	department.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: { type: DataTypes.STRING, allowNull: false },
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'department',
		}
	);
	return department;
};
