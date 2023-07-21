const express = require('express');
const passport = require('passport');

const router = express.Router();
const passwordResetController = require('../controllers/passwordReset');

router.patch('/reset', passwordResetController.reset);
router.post('/forgot', passwordResetController.forgot);

module.exports = router;
