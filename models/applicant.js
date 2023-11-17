'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class applicant extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsToMany(models.opening, {
				through: 'applicantOpening',
			});
			this.hasOne(models.applicantAI, { foreignKey: 'aiid' });
		}
	}
	applicant.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			fname: { type: DataTypes.STRING, allowNull: false },
			lname: { type: DataTypes.STRING, allowNull: false },
			age: DataTypes.INTEGER,
			email: { type: DataTypes.STRING, allowNull: false },
			experience: DataTypes.INTEGER,
			message: DataTypes.STRING,
			cv: { type: DataTypes.STRING, allowNull: false },
		},
		{
			sequelize,
			modelName: 'applicant',
		}
	);
	return applicant;
};
