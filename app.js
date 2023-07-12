const express = require('express');
const passport = require('passport');
const { redisClient, sessionMiddleware } = require('./strategies/redis');

require('dotenv').config();
require('./strategies/local');

const { sequelize, User } = require('./models');

// Middleware
const app = express();
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Routes
const userRoutes = require('./routes/employee');
const announcementRoutes = require('./routes/announcement');
const openingRoutes = require('./routes/openings');
const applicantRoutes = require('./routes/applicant');
const departmentRoutes = require('./routes/department');
const projectRoutes = require('./routes/project');

app.use('/apply', applicantRoutes);
app.use('/users', userRoutes);
app.use('/announcements', announcementRoutes);
app.use('/openings', openingRoutes);
app.use('/departments', departmentRoutes);
app.use('/projects', projectRoutes);

// Start Server & Connect to DB!z
app.listen({ port: 3000 }, async () => {
	console.log('Server running on port 3000');
	// await sequelize.sync({ force: true });
	await sequelize.authenticate();
	console.log('Database Connected!');
});
