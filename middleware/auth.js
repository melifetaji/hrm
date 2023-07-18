const express = require('express');
const passport = require('passport');

const auth = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(400).json('You are not authenticated');
	}
	next();
};

const admin = (req, res, next) => {
	if (!req.isAuthenticated() || req.user.role !== 'admin') {
		return res.status(400).json('You cannot access this page');
	}
	next();
};

const adminManager = (req, res, next) => {
	if (!req.isAuthenticated() || req.user.role === 'basic') {
		return res.status(400).json('You cannot access this page');
	}
	next();
};

module.exports = { auth, admin, adminManager };
