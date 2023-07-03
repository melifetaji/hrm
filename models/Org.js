const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connect');

const Org = sequelize.define('Org', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	name: DataTypes.STRING,
});

exports.Org = Org;
