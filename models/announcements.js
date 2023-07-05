'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class announcements extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.employee, { foreignKey: 'eid' });
		}
	}
	announcements.init(
		{
			id: { type: DataTypes.INTEGER, primaryKey: true },
			name: { type: DataTypes.STRING, allowNull: false },
			description: { type: DataTypes.STRING, allowNull: false },
			image: DataTypes.BLOB,
		},
		{
			sequelize,
			modelName: 'announcements',
		}
	);
	return announcements;
};
