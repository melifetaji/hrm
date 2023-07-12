const Joi = require('joi');

const createSchema = Joi.object({
	name: Joi.string().min(2).max(50).required(),
	description: Joi.string().min(2).max(500).required(),
	status: Joi.string().valid('pending', 'ongoing', 'completed'),
});

const updateSchema = Joi.object({
	name: Joi.string().min(2).max(50),
	description: Joi.string().min(2).max(500),
	status: Joi.string().valid('pending', 'ongoing', 'completed'),
});

module.exports = { createSchema, updateSchema };
