const cron = require('node-cron');

const ResetTokenRepository = require('../../repositories/resetTokenRepository');

const cronTokens = cron.schedule('0 0 * * *', async () => {
	try {
		await ResetTokenRepository.deleteExpired();
	} catch (error) {
		throw new Error(error.messsage);
	}
});

module.exports = cronTokens;
