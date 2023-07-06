const express = require('express');

const router = express.Router();

const employeeControler = require('../controllers/employee');

router.post('/register', employeeControler.postCreateUser);
router.delete('/:id', employeeControler.deleteUser);
router.patch('/:id', employeeControler.patchUpdateUser);
router.get('/:id', employeeControler.getUserById);

module.exports = router;
