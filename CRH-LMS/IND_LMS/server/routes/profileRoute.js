const express = require("express");
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  checkProfileExists
} = require("../controller/profileController.js");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-profile",authMiddleware, createProfile);
router.get("/get-profile/:id",getProfile);
router.get("/check-profile", authMiddleware, checkProfileExists);
router.put("/update-profile/:id",authMiddleware, updateProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
