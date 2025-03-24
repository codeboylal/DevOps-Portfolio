const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      unique: true, // Secondary email (not from signup)
    },
    profilePicture: {
      type: String, // Image stored in MongoDB as Base64 or URL
    },
    coverPhoto: {
      type: String, // Image stored in MongoDB as Base64 or URL
    },
    location: {
      type: String,
    },
    organizationName: {
      type: String,
    },
    languages: {
      type: [String], // Convert comma-separated input to an array
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
