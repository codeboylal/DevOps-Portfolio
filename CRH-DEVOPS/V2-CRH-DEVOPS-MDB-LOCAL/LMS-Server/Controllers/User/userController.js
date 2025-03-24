// const User = require('../../Model/UserModel/model');
// const bcrypt = require('bcrypt'); // Import bcrypt


// // Sign up user
// const signupUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

//     // Create new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword, // Save hashed password
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };









// module.exports = { signupUser};
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const UserModel = require("../../Model/UserModel/model");

exports.signup = async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
        });

        await newUser.save();
        res.status(201).json({ success: true, message: "User created successfully!" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        console.log(`Password reset link: ${resetLink}`);
        res.json({ message: 'Password reset link sent', resetLink });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in resetting password' });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        if (!token) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await UserModel.findOne({ email: 'user_email@example.com' });
        
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in resetting password' });
    }
};
