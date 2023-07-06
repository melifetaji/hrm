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
				foreignKey: 'oid',
			});
			this.belongsTo(models.department, { foreignKey: 'did' });
		}
	}
	opening.init(
		{
			oid: { type: DataTypes.INTEGER, primaryKey: true },
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
