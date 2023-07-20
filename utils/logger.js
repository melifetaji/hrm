const morgan = require('morgan');
const chalk = require('chalk');

const colorizedLogFormat = (tokens, req, res) => {
	const status = tokens.status(req, res);
	let bgColor;

	if (status >= 500) {
		bgColor = chalk.bgRed;
	} else if (status >= 400) {
		bgColor = chalk.bgYellow;
	} else if (status >= 200 && status < 300) {
		bgColor = chalk.bgGreen;
	} else {
		bgColor = chalk.bgWhiteBright; // Default background color for other status codes
	}

	return [
		bgColor(`[${tokens.date(req, res, 'iso')}]`),
		chalk.white(
			`"${tokens.method(req, res)} ${tokens.url(req, res)} HTTP/${tokens[
				'http-version'
			](req, res)}"`
		),
		bgColor(status),
		chalk.magenta(`${tokens['response-time'](req, res)} ms`),
	].join(' ');
};

const logger = morgan(colorizedLogFormat);

module.exports = logger;
