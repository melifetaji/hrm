const express = require('express');
const passport = require('passport');
const session = require('express-session');

const { sequelize, User } = require('./models');

require('./strategies/local');

const app = express();

app.use(express.json());
app.use(
	session({
		secret: 'melifetaji',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
const userRoutes = require('./routes/employee');
app.use('/users', userRoutes);

// Start Server & Connect to DB!
app.listen({ port: 3000 }, async () => {
	console.log('Server running on port 3000');
	await sequelize.authenticate();
	console.log('Database Connected!');
});
