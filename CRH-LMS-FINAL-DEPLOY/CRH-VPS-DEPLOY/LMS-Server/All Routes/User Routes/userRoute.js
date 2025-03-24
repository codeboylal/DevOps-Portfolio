// const passport = require ('passport');

// const { signupUser } = require('../../Controllers/User Controller/userController');


// const express = require('express');

// const { signupUser} = require('../../Controllers/User/userController'); // Ensure proper casing


// const router = express.Router();
// router.post('/signup', signupUser);


// module.exports = router;
const express = require("express");
const { signup, forgotPassword, resetPassword } = require("../../Controllers/User/userController");
const router = express.Router();

// Signup Route
router.post("/signup", signup);

// Forgot Password Route
router.post("/forgot-password", forgotPassword);

// Reset Password Route
router.post('/reset-password/:token', resetPassword);

module.exports = router;


// router.use(passport.initialize());
// router.use(passport.session());
// router.get(
//     '/auth/google' , passport.authenticate('google', {scope:
//         ['email','profile']
//     })
// );

// router.get(
//     '/auth/google/callback' , passport.authenticate('google',{
//         successRedirect: '/success',
//         failureRedirect: '/failure'
//     })
// )
// router.get('/success',successGoogleLogin)
// router.get('/failure',failureGoogleLogin)

// Signup route
