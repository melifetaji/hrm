const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connect');

const User = sequelize.define('User', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},
	firstname: DataTypes.STRING,
	lastname: DataTypes.STRING,
	email: DataTypes.STRING,
	password: DataTypes.STRING,
});

exports.User = User;
