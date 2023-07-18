const express = require('express');
const passport = require('passport');

const router = express.Router();
const announcementController = require('../controllers/announcement');

const { auth, admin, adminManager } = require('../middleware/auth');

router.post('/create', adminManager, announcementController.postCreate);
router.patch('/:id', adminManager, announcementController.patchUpdate);
router.delete('/:id', adminManager, announcementController.delete);
router.get('/:id', auth, announcementController.getById);
router.get('/', auth, announcementController.getAll);

module.exports = router;
