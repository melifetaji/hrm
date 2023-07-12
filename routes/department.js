const express = require('express');
const passport = require('passport');

const router = express.Router();

const departmentController = require('../controllers/department');

router.post('/create', departmentController.postCreate);
router.get('/:id', departmentController.getById);
router.patch('/:id', departmentController.patchUpdate);
router.delete('/:id', departmentController.delete);
router.get('/', departmentController.getAll);

module.exports = router;
