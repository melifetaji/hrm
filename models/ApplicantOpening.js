'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class applicantOpening extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}
	applicantOpening.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
		},
		{
			sequelize,
			modelName: 'applicantOpening',
		}
	);
	return applicantOpening;
};
