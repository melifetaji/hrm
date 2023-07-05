'use strict';
const { fail } = require('assert');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class leaves extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.employee, { foreignKey: 'eid' });
		}
	}
	leaves.init(
		{
			lid: { type: DataTypes.INTEGER, primaryKey: true },
			date: { type: DataTypes.DATE, allowNull: false },
			reason: DataTypes.STRING,
			status: DataTypes.STRING,
			days: { type: DataTypes.INTEGER, allowNullL: false },
		},
		{
			sequelize,
			modelName: 'leaves',
		}
	);
	return leaves;
};
