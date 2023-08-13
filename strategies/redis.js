const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
require('dotenv').config();

console.log('comeshere');

// Create and configure Redis client
const redisClient = redis.createClient({
	port: 6379, // Corrected property name from 'post' to 'port'
	host: 'project.efwsmb.ng.0001.eun1.cache.amazonaws.com',
});

const connecting = async () => {
	await redisClient.connect();
}
	connecting();

// Connect to Redis
// Listen for the 'connect' event on the Redis client
redisClient.on('connect', () => {
	console.log('Redis Connected!');
});

// Listen for the 'error' event on the Redis client
redisClient.on('error', (error) => {
	console.error('Redis Error:', error);
});

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
