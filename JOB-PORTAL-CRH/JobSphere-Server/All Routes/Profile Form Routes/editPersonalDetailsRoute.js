const express = require("express");
const router = express.Router();
const profileController = require("../../Controller/Profile Controller/editPersonalDetailsController");

// Define the PUT route for updating personal details
// router.put('/profile/:id', profileController.updatePersonalDetails);
router.put('/profile/:id', profileController.updatePersonalDetails);

router.get('/:id', profileController.getProfileById);

module.exports = router;
