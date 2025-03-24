// // controllers/profileController.js

// const Profile = require('../../../Models/User Model/userModel');

// // Update Work Experience in Profile
// exports.updateWorkExperience = async (req, res) => {
//   try {
//     const { profileId, ...workExperienceData } = req.body;

//     // Find the profile by ID and update its work experience
//     const profile = await Profile.findByIdAndUpdate(
//       profileId,
//       { $push: { workExperiences: workExperienceData } },  // Using $push to add new experience
//       { new: true }  // Return the updated profile
//     );

//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }

//     res.status(200).json({ message: 'Work experience updated successfully', profile });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };














// const Profile = require('../../../Models/User Model/userModel');

// // Controller to update profile by ID (Work Experience)
// exports.updateWorkExperience = async (req, res) => {
//   const { id } = req.params; // User ID from params
//   const { workExperience } = req.body; // Work experience data from request body

//   try {
//     // Find the user by ID and push the new work experience into the array
//     const profile = await Profile.findOneAndUpdate(
//       { _id: id }, 
//       { $push: { workExperience: workExperience } }, // Push new work experience into the array
//       { new: true, runValidators: true } // Return the updated document
//     );

//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }

//     return res.status(200).json({ message: 'Work experience updated successfully', profile });
//   } catch (error) {
//     console.error('Error updating work experience:', error);
//     return res.status(500).json({ message: 'Failed to update work experience' });
//   }
// };

// // Get profile by ID
// exports.getProfileById = async (req, res) => {
//   try {
//     const profile = await Profile.findById(req.params.id);
//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }
//     res.json(profile);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
























// const Profile = require('../../../Models/User Model/userModel');

const Profile = require('../../../Models/User Model/userModel');

// Controller to add (push) new work experience for a profile
exports.updateWorkExperience = async (req, res) => {
  const { id } = req.params; // User ID from params
  const { workExperience } = req.body; // New work experience data from request body

  try {
    // Find the profile by ID and push the new work experience into the array
    const profile = await Profile.findOneAndUpdate(
      { _id: id }, 
      { $push: { workExperience: workExperience } }, // Append the new work experience to the array
      { new: true, runValidators: true } // Return the updated document
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({ message: 'Work experience added successfully', profile });
  } catch (error) {
    console.error('Error adding work experience:', error);
    return res.status(500).json({ message: 'Failed to add work experience' });
  }
};




// // Controller to update specific work experience at a given index
// exports.updateSpecificWorkExperience = async (req, res) => {
//   const { id, index } = req.params;
//   const { workExperience } = req.body; // Contains the updated experience for this index

//   try {
//     // Find the profile by ID
//     const profile = await Profile.findById(id);

//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }

//     // Ensure that the work experience array exists and the index is valid
//     if (profile.workExperience && profile.workExperience[index]) {
//       profile.workExperience[index] = workExperience[index]; // Update the specific experience at index
//       await profile.save(); // Save the updated profile

//       return res.status(200).json({ message: 'Work experience updated successfully', profile });
//     } else {
//       return res.status(400).json({ message: 'Invalid work experience index' });
//     }
//   } catch (error) {
//     console.error('Error updating work experience:', error);
//     return res.status(500).json({ message: 'Failed to update work experience' });
//   }
// };




// Define the controller function to update a specific experience
exports.updateSpecificWorkExperience = async (req, res) => {
  const { id, index } = req.params;
  const { workExperience } = req.body;

  try {
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (profile.workExperience && profile.workExperience[index]) {
      profile.workExperience[index] = workExperience[index]; // Update specific index
      await profile.save();

      return res.status(200).json({ message: 'Work experience updated successfully', profile });
    } else {
      return res.status(400).json({ message: 'Invalid work experience index' });
    }
  } catch (error) {
    console.error('Error updating work experience:', error);
    return res.status(500).json({ message: 'Failed to update work experience' });
  }
};





// Get profile by ID (optional)
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
