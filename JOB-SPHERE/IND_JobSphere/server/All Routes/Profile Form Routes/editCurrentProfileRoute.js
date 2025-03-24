// routes/profile.route.js
const express = require('express');
const router = express.Router();
const { updateProfile,getProfileById } = require('../../Controller/Profile Controller/currentProfileController');

// PUT request to update a profile by ID
router.put('/:id', updateProfile);
router.get('/:id', getProfileById);


module.exports = router;
