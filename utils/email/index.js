// email.js

const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
	service: 'hotmail',
	auth: {
		user: process.env.SENDER_EMAIL,
		pass: process.env.SENDER_PASSWORD,
	},
	tsl: true,
	pool: true,
});

module.exports = transporter;
