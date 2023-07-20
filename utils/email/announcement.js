const transporter = require('./index');
const UserRepository = require('../../repositories/userRepository');

require('dotenv').config();

const announcementMail = async (announcement) => {
	try {
		const emails = await UserRepository.getAllEmails();

		const options = {
			from: 'melfetaji@gmail.com',
			to: emails,
			subject: announcement.name,
			text: announcement.description,
		};

		transporter.sendMail(options, (err, info) => {
			if (err) {
				console.log(`Error sending email`, err);
			} else {
				console.log(`Email sent`, info.response);
			}
		});
	} catch (err) {
		throw new Error('Failed to send the emails');
	}
};

module.exports = announcementMail;
