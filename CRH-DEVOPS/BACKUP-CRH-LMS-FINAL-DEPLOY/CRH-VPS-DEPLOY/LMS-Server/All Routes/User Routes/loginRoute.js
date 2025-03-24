// const express = require('express');
// const { loginUser } = require('../../Controllers/User/loginController');
// const router = express.Router();

// // POST route to login the user
// router.post('/login', loginUser);

// module.exports = router;
const express = require("express");
const { login } = require("../../Controllers/User/loginController");
const router = express.Router();

// Login Route
router.post("/login", login);

module.exports = router;
