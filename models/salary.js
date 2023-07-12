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
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			monthly: { type: DataTypes.INTEGER, allowNull: false },
			allowance: { type: DataTypes.INTEGER },
			bonus: { type: DataTypes.INTEGER },
		},
		{
			sequelize,
			modelName: 'salary',
		}
	);
	return salary;
};
