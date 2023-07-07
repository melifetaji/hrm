const express = require('express');
const passport = require('passport');

const router = express.Router();

const employeeControler = require('../controllers/employee');

router.post('/register', employeeControler.postCreateUser);

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.sendStatus(200);
});

router.delete('/:id', employeeControler.deleteUser);
router.patch('/:id', employeeControler.patchUpdateUser);

router.get('/:id', employeeControler.getUserById);

module.exports = router;
