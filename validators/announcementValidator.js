const Joi = require('joi');

const createSchema = Joi.object({
	name: Joi.string().min(2).max(50).required(),
	description: Joi.string().min(2).max(500).required(),
	image: Joi.string(),
	eid: Joi.string().required(),
});

const updateSchema = Joi.object({
	name: Joi.string().min(2).max(50),
	description: Joi.string().min(2).max(500),
	image: Joi.string(),
});

module.exports = { createSchema, updateSchema };
