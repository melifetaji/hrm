const crypto = require('crypto');
const moment = require('moment');
const userRepository = require('../repositories/userRepository');
const ResetTokenRepository = require('../repositories/resetTokenRepository');
const forgotMail = require('./email/forgot-password');

async function generateToken(email) {
	try {
		const user = await userRepository.getUserByEmail(email);
		if (!user) {
			throw new Error('User not found.');
		}

		const token = crypto.randomBytes(32).toString('hex');

		const expiresAt = moment().add(1, 'hour');

		await ResetTokenRepository.create(token, expiresAt, user.eid);

		await forgotMail(email, token);

		return true;
	} catch (error) {
		throw error;
	}
}

module.exports = generateToken;
