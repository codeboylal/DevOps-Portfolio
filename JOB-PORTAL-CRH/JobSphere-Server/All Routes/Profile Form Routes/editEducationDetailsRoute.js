// const express = require('express');
// const router = express.Router();
// const ProfileController = require('../../Controller/Profile Controller/editEducationDetails');

// // Define the route to update education data
// router.put('/profile/education/:id', ProfileController.updateEducation);
// router.get('/education/:id', ProfileController.getEducationById);


// module.exports = router;










const express = require('express');
const router = express.Router();
const ProfileController = require('../../Controller/Profile Controller/editEducationDetails');

// Define the route to update education data
router.put('/profile/education/:id/:editItem', ProfileController.updateEducation);
router.get('/education/:id', ProfileController.getEducationById);
// router.delete('/education/:profileId/:educationId', ProfileController.deleteEducation); // New route for delete

module.exports = router;
