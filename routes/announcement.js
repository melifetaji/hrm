const express = require('express');
const passport = require('passport');

const router = express.Router();

const announcementController = require('../controllers/announcement');

router.post('/create', announcementController.postCreate);

module.exports = router;
