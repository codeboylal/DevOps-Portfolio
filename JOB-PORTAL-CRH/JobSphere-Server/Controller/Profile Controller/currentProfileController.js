// controllers/profile.controller.js
const Profile = require('../../Models/User Model/userModel');

// Update profile data
const updateProfile = async (req, res) => {
    try {
        const profileId = req.params.id; // Assuming the profile ID is provided
        const updatedProfileData = req.body;
        
        // Find the profile by ID and update it
        const updatedProfile = await Profile.findByIdAndUpdate(profileId, updatedProfileData, { new: true });
        
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

const getProfileById = async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ message: 'Profile not found' });
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
module.exports = { updateProfile,getProfileById };
