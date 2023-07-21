'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class resetToken extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.employee, {
				foreignKey: 'eid',
				allowNull: false,
				onDelete: 'CASCADE',
			});
		}
	}
	resetToken.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			token: { type: DataTypes.STRING, allowNull: false },
			expiresAt: { type: DataTypes.DATE, allowNull: false },
		},
		{
			sequelize,
			modelName: 'resetToken',
		}
	);
	return resetToken;
};
