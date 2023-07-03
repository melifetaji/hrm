const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('project', 'root', 'melifetaji', {
	dialect: 'mysql',
	hostname: 'localhost',
});

function init() {
	sequelize
		.sync()
		.then((res) => {
			console.log('Database connected successfully');
		})
		.catch((err) => {
			console.log('Database connection error!');
		});
}

module.exports = { init, sequelize };
