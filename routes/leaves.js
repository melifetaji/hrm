const express = require('express');
const passport = require('passport');

const router = express.Router();

const leaveController = require('../controllers/leave');

router.post('/create', leaveController.postCreate);
router.get('/', leaveController.getAll);
router.patch('/:id/approve', leaveController.patchApprove);
router.get('/employee/:id', leaveController.getByEmployee);
router.delete('/:id', leaveController.deleteLeave);

module.exports = router;
