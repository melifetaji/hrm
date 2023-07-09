'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class opening extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsToMany(models.applicant, {
				through: 'ApplicantsOpenings',
				as: 'opening',
				foreignKey: 'id',
			});
		}
	}
	opening.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: { type: DataTypes.STRING, allowNull: false },
			description: { type: DataTypes.STRING, allowNull: false },
		},
		{
			sequelize,
			modelName: 'opening',
		}
	);
	return opening;
};
