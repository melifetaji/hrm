const express = require('express');
const { sequelize, User } = require('./models');

const app = express();
app.use(express.json());

// Routes
const userRoutes = require('./routes/employee');
app.use('/users', userRoutes);

// Start Server & Connect to DB!
app.listen({ port: 3000 }, async () => {
	console.log('Server running on port 3000');
	await sequelize.authenticate();
	console.log('Database Connected!');
});
