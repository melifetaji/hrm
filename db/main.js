const { User } = require('./models/User');
const { Org } = require('./models/Org');

Org.hasMany(User, {
	foreignKey: {
		allowNull: true,
	},
});
