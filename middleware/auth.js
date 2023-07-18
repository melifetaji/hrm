const express = require('express');
const passport = require('passport');

const auth = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(400).json('You are not authenticated');
	}
	next();
};

module.exports = auth;
