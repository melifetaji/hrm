const Joi = require('joi');

const createSchema = Joi.object({
	startDate: Joi.date().required(),
	endDate: Joi.date().required(),
	reason: Joi.string().max(500).required(),
});

const approveSchema = Joi.object({
	status: Joi.valid('approved', 'rejected').required(),
});

module.exports = { createSchema, approveSchema };
