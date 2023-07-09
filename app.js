const express = require('express');
const passport = require('passport');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis').default;

require('dotenv').config();
require('./strategies/local');

const { sequelize, User } = require('./models');

const app = express();

// Redis

// app.set('trust proxy', 1);
const redisClient = redis.createClient({
	post: 6379,
	host: 'localhost',
});

redisClient
	.connect()
	.then(console.log('Redis Connected!'))
	.catch(console.error);

// Middleware
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new RedisStore({ client: redisClient }),
		resave: false,
		cookie: {
			secure: false, //true for production (https)
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
const userRoutes = require('./routes/employee');
const announcementRoutes = require('./routes/announcement');
app.use('/users', userRoutes);
app.use('/announcements', announcementRoutes);

// Start Server & Connect to DB!
app.listen({ port: 3000 }, async () => {
	console.log('Server running on port 3000');
	await sequelize.authenticate();
	console.log('Database Connected!');
});
