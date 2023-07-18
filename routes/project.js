const express = require('express');
const passport = require('passport');

const router = express.Router();
const projectController = require('../controllers/project');

const { auth, admin, adminManager } = require('../middleware/auth');

router.post('/create', adminManager, projectController.postCreate);
router.get('/:id', auth, projectController.getById);
router.patch('/:id', adminManager, projectController.patchUpdate);
router.delete('/:id', adminManager, projectController.delete);
router.get('/', adminManager, projectController.getAll);

module.exports = router;
