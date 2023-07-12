const express = require('express');
const passport = require('passport');

const router = express.Router();

const employeeController = require('../controllers/employee');

router.patch('/change-password', employeeController.patchPassword);
router.post('/register', employeeController.postCreateUser);
router.get('/logout', employeeController.getLogout);
router.post('/login', employeeController.postLogin);
router.get('/department', employeeController.getUserByDepartment);
router.get('/profile', employeeController.getProfile);
router.delete('/:id', employeeController.deleteUser);
router.patch('/:id', employeeController.patchUpdateUser);
router.get('/:id', employeeController.getUserById);

module.exports = router;
