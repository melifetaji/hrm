const express = require('express');
const app = express();
const { init } = require('./db/connect');

const PORT = 3000 || process.env.PORT;

app.use(express.json());

// Database Connection
init();

app.post('/user', (req, res) => {
	res.send(req.body);
});

app.get('/user/:id', (req, res) => {
	res.send({ id: req.params.id });
});

app.get('/user', (req, res) => {
	res.send({ id: req.query.id });
});

app.listen(PORT, () => {
	console.log(`App is running on port: ${PORT} `);
});

const { User } = require('./models/User');
const { Org } = require('./models/Org');

Org.hasMany(User, {
	foreignKey: {
		allowNull: true,
	},
});
