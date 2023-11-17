const Joi = require('joi');

const applySchema = Joi.object({
	fname: Joi.string().min(2).max(30).required(),
	lname: Joi.string().min(2).max(30).required(),
	age: Joi.number().min(1).max(120),
	experience: Joi.number().required(),
	email: Joi.string().email().required(),
	message: Joi.string().min(0).max(500),
	cv: Joi.binary().required(),
});

module.exports = { applySchema };
