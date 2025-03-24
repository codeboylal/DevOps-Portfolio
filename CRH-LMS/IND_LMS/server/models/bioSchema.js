const mongoose = require("mongoose");

const BioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User schema
    required: true,
    unique: true, // Ensure one bio per user
  },
  bio: {
    type: String,
    default: function () {
      return `My name is ${this.user?.firstName || ""} ${this.user?.lastName || ""}`.trim();
    },
  },
});

module.exports = mongoose.model("Bio", BioSchema);
