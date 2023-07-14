const express = require('express');
const passport = require('passport');

const router = express.Router();

const leaveController = require('../controllers/leave');

router.post('/create', leaveController.postCreate);

module.exports = router;
