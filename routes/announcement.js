const express = require('express');
const passport = require('passport');

const router = express.Router();

const announcementController = require('../controllers/announcement');

router.post('/create', announcementController.postCreate);
router.get('/:id', announcementController.getById);
router.patch('/:id', announcementController.patchUpdate);
router.delete('/:id', announcementController.delete);
router.get('/', announcementController.getAll);

module.exports = router;
