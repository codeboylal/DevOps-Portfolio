const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token

  if (!token) return res.status(401).json({ message: "Access Denied" }); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user ID in req.user

    next();
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Invalid Token" });
  }
};
