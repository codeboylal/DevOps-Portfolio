const Bio = require("../models/bioSchema");
const User = require("../models/user");
const mongoose = require("mongoose");

// Create or get user's bio
exports.getOrCreateBio = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Find bio or create if not exists
    let bio = await Bio.findOne({ user: userId }).populate("user");

    if (!bio) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      bio = new Bio({
        user: userId,
        bio: `My name is ${user.firstName} ${user.lastName}`,
      });

      await bio.save();
    }

    res.status(200).json(bio);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Bio
exports.updateBio = async (req, res) => { 
  try {
    console.log("Reached controller");

    const user = req.user.userId; // Ensure this is a valid ObjectId
    const { bio } = req.body;

    // Validate userId before using it in a query
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (!bio) {
      return res.status(400).json({ message: "Bio cannot be empty" });
    }

    const updatedBio = await Bio.findOneAndUpdate(
      { user: new mongoose.Types.ObjectId(user) }, // Convert to ObjectId
      { $set: { bio } }, // Update only the bio field
      { new: true, upsert: true, fields: { bio: 1 } } // Return only bio field
    );
console.log(updatedBio)
    res.status(200).json({ bio: updatedBio.bio });
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

