const express = require('express');
const passport = require('passport');
const { redisClient, sessionMiddleware } = require('./strategies/redis');
const logger = require('./utils/logger');

require('dotenv').config();
require('./strategies/local');

const { sequelize, User } = require('./models');

const app = express();

// Middleware
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');
app.use(logger);

// Routes
const userRoutes = require('./routes/employee');
const announcementRoutes = require('./routes/announcement');
const openingRoutes = require('./routes/openings');
const applicantRoutes = require('./routes/applicant');
const departmentRoutes = require('./routes/department');
const projectRoutes = require('./routes/project');
const leaveRoutes = require('./routes/leaves');
const passwordResetRoutes = require('./routes/passwordReset');

app.use('/apply', applicantRoutes);
app.use('/users', userRoutes);
app.use('/announcements', announcementRoutes);
app.use('/openings', openingRoutes);
app.use('/departments', departmentRoutes);
app.use('/projects', projectRoutes);
app.use('/leaves', leaveRoutes);
app.use('/password', passwordResetRoutes);

app.listen({ port: 3000 }, async () => {
	console.log('Server running on port 3000');
	// await sequelize.sync({ force: true });
	await sequelize.authenticate();
	console.log('Database Connected!');
});
