const express = require('express');
const passport = require('passport');

const router = express.Router();
const applicantController = require('../controllers/applicant');

const { admin } = require('../middleware/auth');

router.get('/all', admin, applicantController.getApplicants);
router.get('/:id', admin, applicantController.getApplicantById);
router.post('/', applicantController.postCreate);
router.get('/', admin, applicantController.getApplicantsByOpenings);

module.exports = router;
