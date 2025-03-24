

// const Skill = require('../../Models/edit Model/Edit Skill Model/editSkillModel'); // Adjust the path as needed

// // Controller to add a skill to a profile
// const addSkillToProfile = async (req, res) => {
//   const profileId = req.params.id;
//   const { skill } = req.body; // Assumes skill is sent in the request body

//   try {
//     // Find the profile by ID
//     const profile = await Skill.findById(profileId);
//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }

//     // Add the new skill to the skills array
//     profile.skills.push(skill);

//     // Save the updated profile
//     await profile.save();

//     res.status(200).json(profile);
//   } catch (error) {
//     console.error('Error adding skill:', error);
//     res.status(400).json({ message: 'Error adding skill', error });
//   }
// };




// module.exports = {
//   addSkillToProfile,
// };
