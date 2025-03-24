// const User = require("../../../Models/Sign In Up/SignIn/signInModel");
 
// const { generateToken } = require("../../../utils/JWT Utility/jwtUtils");
 
// //
 
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Email:", email);  // Log email
//   console.log("Password:", password);  // Log password
 
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
 
//     // Log the stored hashed password
//     console.log("Stored hashed password:", user.password);
 
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }
 
//     const token = generateToken(user._id, user.role);
//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       id: user._id
//     });
//   } catch (error) {
//     console.error("Server error:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
 
 
 
// const User = require("../../../Models/Sign In Up/SignIn/signInModel");
// const { generateToken } = require("../../../utils/JWT Utility/jwtUtils");
// const bcrypt = require("bcrypt");
 
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
 
//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
 
//     // Compare the provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }
 
//     // Generate JWT token
//     const token = generateToken(user._id, user.role);
 
//     // Return success response
//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       id: user._id,
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
 
 
 
 
 
 
const User = require("../../../Models/Sign In Up/SignIn/signInModel");
const { generateToken } = require("../../../utils/JWT Utility/jwtUtils");
const bcrypt = require("bcrypt");
 
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    // If user is not verified, return an error message
    if (user.accountStatus === "mail not verified" || user.accountStatus === "deleted") {
      return res.status(400).json({ message: "Not a verified user" });
    }
 
    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
 
    // Generate JWT token
    const token = generateToken(user._id, user.role);
 
    // console.log(user)
    // Return success response
    return res.status(200).json({
      message: "Login successful",
      token,
      id: user._id,
      accountStatus: user.accountStatus, // Adding account status to the response for frontend handling
      access: user.access
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};