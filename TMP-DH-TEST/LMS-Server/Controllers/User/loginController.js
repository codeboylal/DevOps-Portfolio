// // const bcrypt = require('bcrypt'); // To compare hashed passwords
// // const User = require('../../Model/UserModel/model'); // Import User model

// // // Login user
// // const loginUser = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // Check if the user exists
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ message: 'User does not exist' });
// //     }

// //     // Check if password matches
// //     const isPasswordValid = await bcrypt.compare(password, user.password);
// //     if (!isPasswordValid) {
// //       return res.status(400).json({ message: 'Invalid password' });
// //     }

// //     // Successfully logged in
// //     res.status(200).json({ message: 'Login successful', user });
// //   } catch (error) {
// //     console.error('Error during login:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // module.exports = { loginUser };

// // const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");
// // const UserModel = require("../../Model/model"); // Make sure this path is correct
// // const JWT_SECRET = 'nhm1kGFJuuPLBl_1fIr6_nW4fBlvdaj0h8Gu42OoA93kWXAfXGdu8GKp7-yB_ELE';

// // exports.login = async (req, res) => {
// //     const { email, password } = req.body;

// //     try {
// //         const user = await UserModel.findOne({ email });
// //         if (!user) {
// //             return res.status(400).json({ message: "Invalid Credentials" });
// //         }

// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) {
// //             return res.status(400).json({ message: "Invalid Credentials" });
// //         }

// //         const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
// //         res.json({ token, email: user.email });

// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ error: "Server error" });
// //     }
// // };
// const express = require("express");
// const { login } = require("../../Controller/User/loginController");
// const router = express.Router();

// // Login Route
// router.post("/login", login);

// module.exports = router;
