// const express = require('express');
// const {
//     createProfile,
//     getProfiles,
//     getProfileById,
//     updateProfile,
//     deleteProfile
// } = require('../../Controller/Profile Controller/editProfileController');

// const router = express.Router();

// // Routes for profile management
// router.post('/', createProfile);
// router.get('/', getProfiles);
// router.get('/:id', getProfileById);
// router.put('/:id', updateProfile);
// router.delete('/:id', deleteProfile);

// module.exports = router;










const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../../Controller/Profile Controller/editProfileController');

// PUT route to update profile by ID
router.put('/:id', updateProfile);

// Optional: GET route to get a profile by ID
// router.get('/:id', getProfile);
router.get('/:id', getProfile);


module.exports = router;
