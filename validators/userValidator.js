const Joi = require('joi');

const registerSchema = Joi.object({
	fname: Joi.string().min(2).max(30).required(),
	lname: Joi.string().min(2).max(30).required(),
	password: Joi.string().min(8).max(30).required(),
	gender: Joi.string().min(2).max(10),
	age: Joi.number().min(1).max(120),
	email: Joi.string().email().required(),
	position: Joi.string().min(2).max(20),
	role: Joi.string().min(2).max(20),
	ssn: Joi.number(),
});

const updateSchema = Joi.object({
	fname: Joi.string().min(2).max(30),
	lname: Joi.string().min(2).max(30),
	gender: Joi.string().min(2).max(10),
	age: Joi.number().min(1).max(120),
	position: Joi.string().min(2).max(20),
	role: Joi.string()
		.valid('admin', 'manager', 'basic')
		.required()
		.min(2)
		.max(20),
	ssn: Joi.number(),
});

module.exports = { registerSchema, updateSchema };
