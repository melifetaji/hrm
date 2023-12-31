const Joi = require('joi');

const registerSchema = Joi.object({
	fname: Joi.string().min(2).max(30).required(),
	lname: Joi.string().min(2).max(30).required(),
	password: Joi.string().min(8).max(30).required(),
	gender: Joi.string().min(2).max(10),
	age: Joi.number().min(1).max(120),
	email: Joi.string().email().required(),
	position: Joi.string().min(2).max(20),
	did: Joi.string(),
	role: Joi.string().valid('admin', 'manager', 'basic'),
	ssn: Joi.number(),
	salary: Joi.object(),
});

const updateSchema = Joi.object({
	fname: Joi.string().min(2).max(30),
	lname: Joi.string().min(2).max(30),
	gender: Joi.string().min(2).max(10),
	age: Joi.number().min(1).max(120),
	position: Joi.string().min(2).max(20),
	did: Joi.string(),
	role: Joi.string().valid('admin', 'manager', 'basic'),
	ssn: Joi.number(),
	salary: Joi.object(),
});

const passwordSchema = Joi.object({
	password: Joi.string().min(8).max(30).required(),
	confirm: Joi.string().min(8).max(30).required(),
});

const updateSalary = Joi.object({
	monthly: Joi.number(),
	bonus: Joi.number(),
	allowance: Joi.number(),
});

module.exports = { registerSchema, updateSchema, passwordSchema, updateSalary };
