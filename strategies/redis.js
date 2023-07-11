const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
require('dotenv').config();

// Create and configure Redis client
const redisClient = redis.createClient({
	port: 6379, // Corrected property name from 'post' to 'port'
	host: 'localhost',
});

// Connect to Redis
redisClient
	.connect()
	.then(() => console.log('Redis Connected!'))
	.catch((e) => console.log(e));

// Export the Redis client and session middleware
module.exports = {
	redisClient,
	sessionMiddleware: session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new RedisStore({ client: redisClient }),
		cookie: {
			secure: false, // true for production (https)
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
		},
	}),
};
