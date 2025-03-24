const { verifyToken } = require("../../utils/JWT Utility/jwtUtils");

// Middleware to verify token (Authentication)
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided, access denied" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token, access denied" });
  }
};

// Middleware for role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access is denied" });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
