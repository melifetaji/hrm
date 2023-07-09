const express = require('express');
const passport = require('passport');

const router = express.Router();

const openingController = require('../controllers/opening');

router.post('/create', openingController.postCreate);
router.get('/:id', openingController.getById);
router.patch('/:id', openingController.patchUpdate);
router.delete('/:id', openingController.delete);
router.get('/', openingController.getAll);

module.exports = router;
