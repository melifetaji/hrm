const express = require('express');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const { sequelize, User } = require('./models');

require('./strategies/local');

const app = express();

const memoryStore = new session.MemoryStore();

app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: memoryStore,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
const userRoutes = require('./routes/employee');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
	res.send('home page');
});

// Start Server & Connect to DB!
app.listen({ port: 3000 }, async () => {
	console.log('Server running on port 3000');
	await sequelize.authenticate();
	console.log('Database Connected!');
});
