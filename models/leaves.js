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
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			startDate: { type: DataTypes.DATE, allowNull: false },
			endDate: { type: DataTypes.DATE, allowNull: false },
			status: {
				type: DataTypes.ENUM('pending', 'approved', 'rejected'),
				defaultValue: 'pending',
			},
			reason: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'leaves',
		}
	);
	return leaves;
};
