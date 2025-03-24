// const User = require("../../../Models/Sign In Up/SignIn/signInModel");

// // Handle user login
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Validate password
//     const isMatch = await user.isPasswordMatch(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // Successful login
//     return res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Register a new user (optional, for testing)
// exports.registerUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const newUser = new User({ email, password });
//     await newUser.save();

//     return res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };















// const User = require("../../../Models/Sign In Up/SignIn/signInModel");


// // Handle user login
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Direct password comparison (no hashing)
//     if (user.password !== password) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // Successful login
//     return res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Register a new user (optional, for testing)
// exports.registerUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const newUser = new User({ email, password });
//     await newUser.save();

//     return res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };






// const User = require("../../../Models/Sign In Up/SignIn/signInModel");

// const { generateToken } = require("../../../utils/JWT Utility/jwtUtils");

// // Register a new user
// exports.registerUser = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const newUser = new User({ email, password, role });
//     await newUser.save();

//     return res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Login user and generate token
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = generateToken(user._id, user.role);
//     return res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };





const User = require("../../../Models/Sign In Up/SignIn/signInModel");

const { generateToken } = require("../../../utils/JWT Utility/jwtUtils");

// Register a new user
exports.registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ email, password, role }); // Save plain text password
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};




exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateToken(user._id, user.role);
    return res.status(200).json({ message: "Login successful", token, id: user._id });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
