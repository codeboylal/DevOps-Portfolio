// const Profile = require('../../Models/User Model/userModel');

// // Create a new profile
// const createProfile = async (req, res) => {
//     const profileData = req.body;
    
//     try {
//         const newProfile = new Profile(profileData);
//         await newProfile.save();
//         res.status(201).json(newProfile);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Get all profiles (optional)
// const getProfiles = async (req, res) => {
//     try {
//         const profiles = await Profile.find();
//         res.status(200).json(profiles);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get profile by ID (optional)
// const getProfileById = async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         const profile = await Profile.findById(id);
//         if (!profile) return res.status(404).json({ message: 'Profile not found' });
//         res.status(200).json(profile);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update profile (optional)
// const updateProfile = async (req, res) => {
//     const { id } = req.params;
//     const updateData = req.body;
    
//     try {
//         const updatedProfile = await Profile.findByIdAndUpdate(id, updateData, { new: true });
//         if (!updatedProfile) return res.status(404).json({ message: 'Profile not found' });
//         res.status(200).json(updatedProfile);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete profile (optional)
// const deleteProfile = async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         const deletedProfile = await Profile.findByIdAndDelete(id);
//         if (!deletedProfile) return res.status(404).json({ message: 'Profile not found' });
//         res.status(200).json({ message: 'Profile deleted' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     createProfile,
//     getProfiles,
//     getProfileById,
//     updateProfile,
//     deleteProfile
// };

















// const Profile = require('../../Models/User Model/userModel');

// // Controller for updating profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const updatedProfile = await Profile.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true } // returns the updated profile
//     );
    
//     if (!updatedProfile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }
    
//     res.status(200).json(updatedProfile);
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Controller for getting profile details (optional)
// exports.getProfile = async (req, res) => {
//   try {
//     const profile = await Profile.findById(req.params.id);
    
//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }

//     res.status(200).json(profile);
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };








const Profile = require('../../Models/User Model/userModel');

// Controller for updating profile
exports.updateProfile = async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns the updated profile
    );
    
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Controller for getting profile details
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
