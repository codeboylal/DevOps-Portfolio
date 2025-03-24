const {User} = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const PasswordReset =require("../models/passwordReset.js") 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email
    pass: process.env.EMAIL_PASS  // Your Gmail App Password (Not your regular password)
  }
});


// User Signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    
    
    if (user) return res.status(400).json({ message: "User already exists" });
    

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    user = new User({ firstName, lastName, email, phone, password: hashedPassword });
    

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
    
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log({ email, password })
    

    // Check if user exists
    let user = await User.findOne({ email });

    // console.log(user,"user");

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // console.log(isMatch)
    
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token, user: { firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone }});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// 1️⃣ Request Password Reset
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    console.log(email);
    

    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a secure reset token
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    
    const expiresAt = Date.now() + 3600000; // Token expires in 1 hour

    // Store token in database
    await PasswordReset.create({ email, token, expiresAt });

    // Reset link
    const resetLink = `${process.env.Client_URL_EMAIL}reset-password/${token}`;

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
    });

    res.json({ message: "Password reset link sent to your email." });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("token from db",token)
    const { password } = req.body;

    // Find the reset record based on the token
    const resetRecord = await PasswordReset.findOne({token});

    console.log("token from reset",resetRecord);
    
    if (!resetRecord) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const isTokenValid = token === resetRecord.token;

    console.log(isTokenValid);
    

    
    if (!isTokenValid) {
      return res.status(400).json({ message: "Invalid token or mismatched" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    await User.findOneAndUpdate({ email: resetRecord.email }, { password: hashedPassword });

    // Delete the used token from the database
    await PasswordReset.deleteOne({ _id: resetRecord._id });

    res.json({ message: "Password reset successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};




