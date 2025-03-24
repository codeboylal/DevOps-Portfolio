const bcrypt = require("bcrypt");
const users = require('../../Models/Sign In Up/SignIn/signInModel.js');
const ResponseHandler = require("../../utils/responseHandler");

const resetPassword = async (req, res) => {
  const { token, email, newPassword } = req.body;

  try {
    // Check if email is provided
    if (!email) {
      return res.status(200).json(ResponseHandler(400, "Email is required", "Email is required"));
    }

    // Check if token is provided
    if (!token) {
      return res.status(200).json(ResponseHandler(400, "Token is required", "Token is required"));
    }

    // Check if newPassword is provided
    if (!newPassword) {
      return res.status(200).json(ResponseHandler(400, "New password is required", "New password is required"));
    }

    // Find the user by email
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(200).json(ResponseHandler(404, null, "User not found"));
    }

    // Check if reset token exists
    const resetTokenData = user.resetPasswordLink;
    if (!resetTokenData || !resetTokenData.token) {
      return res.status(200).json(ResponseHandler(400, "Reset token is missing or invalid", "Reset token is missing or invalid"));
    }

    // Validate token and expiry
    if (resetTokenData.token !== token) {
      return res.status(200).json(ResponseHandler(400, "Invalid reset token", "Invalid reset token"));
    }

    const currentTime = new Date();
    if (new Date(resetTokenData.expiresAt) < currentTime) {
      return res.status(200).json(ResponseHandler(400, "Reset token has expired", "Reset token has expired"));
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
    user.password = hashedPassword;

    // Clear the reset token data
    user.resetPasswordLink = undefined;
    await user.save();

    return res.status(200).json(ResponseHandler(200, null, "Password has been successfully reset"));
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json(ResponseHandler(500, null, "An error occurred while resetting the password"));
  }
};

module.exports = resetPassword;
