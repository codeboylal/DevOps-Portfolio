// const Profile = require('../../Models/User Model/userModel');

// // Controller for adding/updating education details
// exports.updateEducation = async (req, res) => {
//   const { id } = req.params; // ObjectId from request parameter
//   const educationData = req.body; // Education data from the request body

//   try {
//     // Find profile by ObjectId
//     const profile = await Profile.findById(id);
//     if (!profile) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }

//     // Add education data to the profile
//     profile.education.push(educationData);
//     await profile.save();

//     res.status(200).json({ message: 'Education details updated successfully', profile });
//   } catch (error) {
//     console.error('Error updating education:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };















const Profile = require('../../Models/User Model/userModel');

// Controller for adding/updating education details
exports.updateEducation = async (req, res) => {
  const { id, editItem } = req.params; // `id` for Profile, `itemID` for education item
  const educationData = req.body; // The new or updated education data

  try {
    let updatedProfile;

    if (editItem !== 'null') {
//       const updateQuery = {};
// updateQuery[`education.${itemID}`] = educationData;
//       // Case 1: Update an existing education entry
//       updatedProfile = await Profile.findByIdAndUpdate(
//         id,
//         { $set:  updateQuery}, // Push new education data to the array
//         { new: true, runValidators: true }
//       );
      updatedProfile = await Profile.findOne({_id:id})
      updatedProfile.education[editItem] = educationData;
      await updatedProfile.save();
    } else {
      // Case 2: Add a new education entry
      updatedProfile = await Profile.findByIdAndUpdate(
        id,
        { $push: { education: educationData } }, // Push new education data to the array
        { new: true, runValidators: true }
      );
    }

    // If no profile is found, return a 404 error
    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Return success response
    res.status(200).json({
      message: editItem !== 'null' ? 'Education details updated successfully' : 'Education added successfully',
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('Error updating education:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};








exports.getEducationById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // Find the profile by user ID and populate the education field
    const profile = await Profile.findById(userId).select('education');

    if (!profile || !profile.education) {
      return res.status(404).json({ message: 'No education data found for this user.' });
    }

    res.status(200).json(profile.education);
  } catch (error) {
    console.error('Error fetching education data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
