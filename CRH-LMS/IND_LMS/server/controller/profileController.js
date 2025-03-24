const Profile = require("../models/profileSchema");
const {User} = require("../models/user");
const mongoose = require("mongoose");

// Create Profile
exports.createProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    const existingProfile = await Profile.findOne({ user: userId });

    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const {
      email,
      location,
      organizationName,
      languages,
      profilePicture,
      coverPhoto,
    } = req.body;

    const newProfile = new Profile({
      user: req.user.userId,
      email,
      location,
      organizationName,
      languages: languages.split(","), // Convert input string to an array
      profilePicture,
      coverPhoto,
    });

    await newProfile.save();
    res
      .status(201)
      .json({ message: "Profile created successfully", profile: newProfile });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating profile", error: error.message });
  }
};

// Get Profile by ID

exports.getProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res.status(400).json({ message: "Invalid profile ID" });
    }

    // Fetch profile by profile ID
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Extract the user ID from the profile
    const userId = profile.user;

    // Fetch user details
    const user = await User.findById(userId).select("firstName lastName phone");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Concatenate first name and last name to create full name
    const fullName = `${user.firstName} ${user.lastName}`.trim();

    // Send response with profile data and additional user info
    res.status(200).json({
      ...profile.toObject(), // Convert Mongoose document to plain object
      fullName,
      phone: user.phone,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};

// Update Profile

exports.updateProfile = async (req, res) => {
  try {
    const profileId = req.params.id; // Get profile ID from request params

    // Fetch the profile to get the associated userId
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const userId = profile.user; // Extract userId from the profile

    const { name, phone, email, location, languages } = req.body;

    // Split full name into first and last name
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // Update User schema (firstName, lastName, phone)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update Profile schema (email, location, languages)
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      { email, location, languages },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      profile: updatedProfile,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

// Delete Profile
exports.deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await Profile.findOneAndDelete({
      user: req.params.id,
    });

    if (!deletedProfile)
      return res.status(404).json({ message: "Profile not found" });

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting profile", error: error.message });
  }
};

exports.checkProfileExists = async (req, res) => {
  try {
    const userId = req.user.userId; // Getting user ID from authentication middleware

    const profile = await Profile.findOne({ user: userId });

    if (profile) {
      return res.status(200).json({ exists: true, profileId: profile._id });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking profile:", error);
    res
      .status(500)
      .json({ message: "Error checking profile", error: error.message });
  }
};
