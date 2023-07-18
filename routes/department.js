const express = require('express');
const passport = require('passport');

const router = express.Router();
const departmentController = require('../controllers/department');

const { auth, admin, adminManager } = require('../middleware/auth');

router.post('/create', adminManager, departmentController.postCreate);
router.get('/:id', auth, departmentController.getById);
router.patch('/:id', adminManager, departmentController.patchUpdate);
router.delete('/:id', admin, departmentController.delete);
router.get('/', adminManager, departmentController.getAll);

module.exports = router;
