// const Profile = require('../../Models/User Model/userModel');  // Import Profile model

// // Controller function to save or update profile data
// const saveProfile = async (req, res) => {
//     const { profileId } = req.body;

//     console.log("Received data: ", req.body);  // Log incoming data for debugging

//     try {
//         let profile = await Profile.findOne({ profileId });

//         if (profile) {
//             // Update existing profile
//             profile.gender = req.body.gender;
//             profile.maritalStatus = req.body.maritalStatus;
//             profile.dateOfBirth = req.body.dateOfBirth;
//             profile.category = req.body.category;
//             profile.differentlyAbled = req.body.differentlyAbled;
//             profile.workPermitCountries = req.body.workPermitCountries;
//             profile.address = req.body.address;

//             await profile.save();
//             return res.status(200).json({ message: 'Profile updated successfully', profile });
//         } else {
//             // Create new profile
//             const newProfile = new Profile({
//                 profileId,
//                 gender: req.body.gender,
//                 maritalStatus: req.body.maritalStatus,
//                 dateOfBirth: req.body.dateOfBirth,
//                 category: req.body.category,
//                 differentlyAbled: req.body.differentlyAbled,
//                 workPermitCountries: req.body.workPermitCountries,
//                 address: req.body.address
//             });

//             await newProfile.save();
//             return res.status(201).json({ message: 'Profile created successfully', newProfile });
//         }
//     } catch (error) {
//         console.error("Error saving profile: ", error);  // Log any error for debugging
//         return res.status(500).json({ message: 'Error saving profile', error });
//     }
// };

// module.exports = { saveProfile };













const Profile = require("../../Models/User Model/userModel");

// Update personal details for a specific profile
const updatePersonalDetails = async (req, res) => {
  const { id } = req.params; // profileId from the route
  const updatedData = req.body;

  try {
    // Find the profile by ID and update the data
    const updatedProfile = await Profile.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Respond with the updated profile data
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findById(id); // Fetch profile data by id
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  updatePersonalDetails,getProfileById
};
