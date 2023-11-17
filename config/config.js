const fs = require('fs');
require('dotenv').config();

module.exports = {
	development: {
		username: 'postgres',
		password: 'meli123',
		host: 'localhost',
		port: 5432,
		dialect: 'postgres',
		logging: false,
		dialectOptions: {},
	},
	test: {
		username: 'postgres',
		password: 'meli123',
		host: 'localhost',
		port: 5432,
		dialect: 'postgres',
		logging: false,
		dialectOptions: {},
	},
	production: {
		username: 'postgres',
		password: 'meli123',
		host: 'localhost',
		port: 5432,
		dialect: 'postgres',
		logging: false,
		dialectOptions: {},
	},
};
