// const express = require("express");
// const { loginUser, registerUser } = require("../../../Controller/Sign In Up/SignIn/signInController");

// const router = express.Router();

// // Login route
// router.post("/login", loginUser);

// // Registration route (optional)
// router.post("/register", registerUser);

// module.exports = router;









const express = require("express");
const { loginUser, registerUser } = require("../../../controllers/Sign In Up/SignIn/signInController.js");

const { authenticate, authorize } = require("../../../middleware/Auth Middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/login", loginUser);
router.post("/register", registerUser);

// Example of a protected route
router.get("/protected", authenticate, authorize("admin"), (req, res) => {
  res.status(200).json({ message: "Access granted to admin" });
});

module.exports = router;
