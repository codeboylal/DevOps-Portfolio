const express = require("express");
const { signup, login, requestPasswordReset, resetPassword } = require("../controller/authController.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);


module.exports = router;
