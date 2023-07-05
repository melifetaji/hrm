'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class salary extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.employee, { foreignKey: 'eid' });
		}
	}
	salary.init(
		{
			sid: { type: DataTypes.INTEGER, primaryKey: true },
			amount: { type: DataTypes.INTEGER, allowNull: false },
			annual: DataTypes.BIGINT,
			bonus: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'salary',
		}
	);
	return salary;
};
