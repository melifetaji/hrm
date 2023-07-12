const express = require('express');
const passport = require('passport');

const router = express.Router();

const projectController = require('../controllers/project');

router.post('/create', projectController.postCreate);
router.get('/:id', projectController.getById);
router.patch('/:id', projectController.patchUpdate);
router.delete('/:id', projectController.delete);
router.get('/', projectController.getAll);

module.exports = router;
