const express = require('express');
const passport = require('passport');

const router = express.Router();

const applicantController = require('../controllers/applicant');

router.get('/all', applicantController.getApplicants);
router.post('/', applicantController.postCreate);
router.get('/', applicantController.getApplicantsByOpenings);
router.get('/:id', applicantController.getApplicantById);

module.exports = router;
