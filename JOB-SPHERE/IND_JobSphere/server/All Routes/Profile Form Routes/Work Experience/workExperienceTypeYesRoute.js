// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const { saveWorkExperience } = require('../../../Controller/Profile Controller/Work Experience/workExperienceTypeYes');

router.put('/experienceYes/:email', saveWorkExperience);

module.exports = router;
