const express = require("express");
const { createEducation, getEducation, updateEducation, deleteEducation } = require("../controller/educationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, createEducation);
router.get("/get", authMiddleware, getEducation);
router.put("/update/:id", authMiddleware, updateEducation);
router.delete("/delete/:id", authMiddleware, deleteEducation);

module.exports = router;
