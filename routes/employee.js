const express = require('express');
const passport = require('passport');

const router = express.Router();

const employeeController = require('../controllers/employee');

router.post('/register', employeeController.postCreateUser);

router.post('/login', passport.authenticate('local'), (req, res) => {
	if (req.isAuthenticated()) {
		res.sendStatus(200);
	}
});

router.get('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

router.delete('/:id', employeeController.deleteUser);
router.patch('/:id', employeeController.patchUpdateUser);

router.get('/:id', employeeController.getUserById);

module.exports = router;
