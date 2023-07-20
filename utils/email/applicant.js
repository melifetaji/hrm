const transporter = require('./index');
const UserRepository = require('../../repositories/userRepository');

require('dotenv').config();

const applicantMail = async () => {
	try {
		const emails = await UserRepository.getAdminEmails();

		const options = {
			from: 'melfetaji@gmail.com',
			to: emails,
			subject: 'New Job Application Received',
			html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <title>New Job Application Received</title>
                </head>
                <body>
                  <p>Dear Hiring Team,</p>
                  <p>We have received a new application for the recent job opening at our company. Please review the candidate's application at your earliest convenience and proceed with the necessary steps for the recruitment process.</p>
                  <p>Best regards,</p>
                  <p>Project</p>
                </body>
              </html>
            `,
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

module.exports = applicantMail;
