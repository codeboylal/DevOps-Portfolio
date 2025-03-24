const express = require("express");
const router = express.Router();
const { getOrCreateBio, updateBio } = require("../controller/bioController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/get-bio", authMiddleware, getOrCreateBio); // Get or create bio
router.put("/update-bio", authMiddleware, updateBio);  // Update bio

module.exports = router;
