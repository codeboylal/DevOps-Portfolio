// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const profileController = require('../../../Controller/Profile Controller/Work Experience/workExperienceTypeNo');
// const profileController = require('../controllers/profileController');

// Route to update work experience
router.put('/profile/:id', profileController.updateWorkExperience);
// Route to get profile by ID
router.get('/profile/:id', profileController.getProfileById);


// Route to update work experience
// router.put('/profile/work-experience', profileController.updateWorkExperience);
module.exports = router;