'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class projectEmployee extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}
	projectEmployee.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
		},
		{
			sequelize,
			modelName: 'projectEmployee',
		}
	);
	return projectEmployee;
};
