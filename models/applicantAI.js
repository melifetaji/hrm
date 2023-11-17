'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class applicantAI extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.applicant, { foreignKey: 'aiid' });
		}
	}
	applicantAI.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

			rating: { type: DataTypes.INTEGER, allowNull: false },
			match: { type: DataTypes.INTEGER, allowNull: false },
		},
		{
			sequelize,
			modelName: 'applicantAI',
		}
	);
	return applicantAI;
};
