const express = require('express');
const passport = require('passport');

const router = express.Router();
const leaveController = require('../controllers/leave');
const { auth, admin, adminManager } = require('../middleware/auth');

router.post('/create', auth, leaveController.postCreate);
router.get('/', admin, leaveController.getAll);
router.patch('/:id/approve', admin, leaveController.patchApprove);
router.get('/employee/:id', auth, leaveController.getByEmployee);
router.delete('/:id', auth, leaveController.deleteLeave);
router.get('/:id', auth, leaveController.getById);

module.exports = router;
