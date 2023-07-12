const express = require('express');
const passport = require('passport');

const router = express.Router();

const applicantController = require('../controllers/applicant');

router.get('/all', applicantController.getApplicants);
router.get('/:id', applicantController.getApplicantById);
router.post('/', applicantController.postCreate);
router.get('/', applicantController.getApplicantsByOpenings);

module.exports = router;
