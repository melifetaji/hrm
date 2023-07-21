const transporter = require('./index');

const forgotMail = async (email, token) => {
	try {
		const options = {
			from: 'melfetaji@gmail.com',
			to: email,
			subject: 'Password Reset',
			text: `Click the following link to reset your password: localhost/password/reset?token=${token}`, // Replace with your password reset link
			html: `<p>Click the following link to reset your password: <a href="localhost/password/reset?token=${token}">Reset Password</a></p>`, // Replace with your password reset link (HTML version)
		};

		try {
			await transporter.sendMail(options);
			console.log('Password reset email sent successfully.');
		} catch (error) {
			console.error('Failed to send password reset email:', error);
			throw error;
		}
	} catch (err) {
		throw new Error('Failed to send the emails');
	}
};

module.exports = forgotMail;
