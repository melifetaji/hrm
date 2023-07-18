const express = require('express');
const passport = require('passport');

const router = express.Router();
const openingController = require('../controllers/opening');

const { auth, admin, adminManager } = require('../middleware/auth');

router.post('/create', adminManager, openingController.postCreate);
router.patch('/:id', adminManager, openingController.patchUpdate);
router.delete('/:id', adminManager, openingController.delete);
router.get('/:id', openingController.getById);
router.get('/', openingController.getAll);

module.exports = router;
