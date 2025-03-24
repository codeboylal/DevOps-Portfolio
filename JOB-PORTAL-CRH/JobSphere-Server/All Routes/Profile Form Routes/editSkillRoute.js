// const express = require('express');
// const router = express.Router();
// const Profile = require('../../Models/User Model/userModel'); // Use Profile model here

// // Route to add a skill to a specific profile
// router.put('/profile/skills/:id', async (req, res) => {
//   const { id } = req.params;
//   const { skillName } = req.body;

//   try {
//     // Use findOneAndUpdate to add the new skill to the skills array
//     const updatedProfile = await Profile.findOneAndUpdate(
//       { _id: id }, // Match the profile by ID
//       { $push: { skills: skillName } }, // Push the new skill into the skills array
//       { new: true, runValidators: true } // Return the updated document and run any validators
//     );

//     if (!updatedProfile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }

//     return res.status(200).json({ message: 'Skill added successfully', profile: updatedProfile });
//   } catch (error) {
//     console.error('Error adding skill:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });





// // Delete skill from profile
// router.delete('/api/profile/skills/:id', async (req, res) => {
//   const { id } = req.params;
//   const { skillName } = req.body;

//   try {
//     // Find profile by ID and remove the skill
//     const profile = await Profile.findById(id);
//     if (!profile) return res.status(404).json({ message: 'Profile not found' });

//     // Remove skill
//     profile.skills = profile.skills.filter(skill => skill !== skillName);
//     await profile.save();

//     // Send updated skills list
//     res.json({ skills: profile.skills });
//   } catch (error) {
//     console.error('Error removing skill:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// module.exports = router;














const express = require('express');
const router = express.Router();
const Profile = require('../../Models/User Model/userModel'); // Use Profile model here

// Route to add a skill to a specific profile
router.put('/profile/skills/:id', async (req, res) => {
  const { id } = req.params;
  const { skillName } = req.body;

  try {
    // Use findOneAndUpdate to add the new skill to the skills array
    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: id }, // Match the profile by ID
      { $push: { skills: skillName } }, // Push the new skill into the skills array
      { new: true, runValidators: true } // Return the updated document and run any validators
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({ message: 'Skill added successfully', profile: updatedProfile });
  } catch (error) {
    console.error('Error adding skill:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



router.delete('/profile/skills/:id', async (req, res) => {
  const { id } = req.params; // Extract profile ID from params
  const { skillName } = req.query; // Extract skillName from query

  console.log('ID:', id); // Debugging: Ensure ID is correct
  console.log('Skill to remove:', skillName); // Debugging: Ensure skillName is correct

  try {
    // Find profile by ID
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    // Remove the skill
    profile.skills = profile.skills.filter(skill => skill !== skillName);

    // Save without validation
    await profile.save({ validateBeforeSave: false });

    // Send the updated skills list
    res.json({ skills: profile.skills });
  } catch (error) {
    console.error('Error removing skill:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
