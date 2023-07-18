const express = require('express');
const passport = require('passport');

const router = express.Router();
const employeeController = require('../controllers/employee');

const { auth, admin, adminManager } = require('../middleware/auth');

router.patch('/change-password', auth, employeeController.patchPassword);
router.post('/register', employeeController.postCreateUser);
router.get('/logout', employeeController.getLogout);
router.post('/login', employeeController.postLogin);
router.get('/department', adminManager, employeeController.getUserByDepartment);
router.get('/profile', auth, employeeController.getProfile);
router.get('/project', adminManager, employeeController.getUsersByProject);
router.post('/assign', admin, employeeController.assignToProject);
router.patch('/:id/salary', admin, employeeController.patchUpdateSalary);
router.delete('/:id', admin, employeeController.deleteUser);
router.patch('/:id', auth, employeeController.patchUpdateUser);
router.get('/:id', admin, employeeController.getUserById);

module.exports = router;
