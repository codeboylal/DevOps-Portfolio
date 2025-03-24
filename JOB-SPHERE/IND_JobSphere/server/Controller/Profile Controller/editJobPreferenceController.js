// const Profile = require('../../Models/User Model/userModel');

// // Update Profile by ID
// exports.updateProfile = async (req, res) => {
//   try {
//     const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!profile) {
//       return res.status(404).json({ error: 'Profile not found' });
//     }
//     res.json(profile);
//   } catch (error) {
//     res.status(400).json({ error: 'Error updating profile' });
//   }
// };

// // Get Profile by ID
// exports.getProfileById = async (req, res) => {
//   try {
//     const profile = await Profile.findById(req.params.id);
//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }
//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };









// const Profile = require('../../Models/User Model/userModel'); // Import the Profile model

// // Get Profile by ID
// exports.getProfileById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const profile = await Profile.findById(id); // Get the profile by ID
//         if (!profile) {
//             return res.status(404).json({ message: 'Profile not found' });
//         }
//         res.json(profile);
//     } catch (error) {
//         console.error('Error fetching profile:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // const Profile = require('../models/profileModel');

// exports.updateProfile = async (req, res) => {
//     const { id } = req.params; // Get profile ID from request params
//     const updatedData = req.body; // Get the data from request body

//     console.log('Incoming data:', updatedData); // Log the incoming data to verify payload

//     try {
//         // Find profile by ID and update the fields using $set
//         const updatedProfile = await Profile.findByIdAndUpdate(
//             id,
//             {
//                 $set: {
//                     name: updatedData.name,
//                     'employmentType.fullTime': updatedData.employmentType.fullTime,
//                     'employmentType.partTime': updatedData.employmentType.partTime,
//                     'expectedSalary.currency': updatedData.expectedSalary.currency,
//                     'expectedSalary.amount': updatedData.expectedSalary.amount,
//                     preferredShift: updatedData.preferredShift,
//                     'remoteOptions.temporarilyRemote': updatedData.remoteOptions.temporarilyRemote,
//                     'remoteOptions.remote': updatedData.remoteOptions.remote,
//                     'remoteOptions.hybrid': updatedData.remoteOptions.hybrid,
//                     'remoteOptions.inPerson': updatedData.remoteOptions.inPerson,
//                     selectedLocations: updatedData.selectedLocations,
//                     currentIndustry: updatedData.currentIndustry,
//                     currentLocation: updatedData.currentLocation,
//                     department: updatedData.department,
//                     jobRole: updatedData.jobRole,
//                     joiningMonth: updatedData.joiningMonth,
//                     joiningYear: updatedData.joiningYear,
//                     mobileNumber: updatedData.mobileNumber,
//                     email: updatedData.email,
//                     skills: updatedData.skills,
//                     totalExperienceYears: updatedData.totalExperienceYears,
//                     totalExperienceMonths: updatedData.totalExperienceMonths,
//                     workExperiences: updatedData.workExperiences,
//                     education: updatedData.education
//                 },
//             },
//             { new: true } // Return the updated document
//         );

//         // If profile is not found
//         if (!updatedProfile) {
//             return res.status(404).json({ message: 'Profile not found' });
//         }

//         // Success response
//         res.json({ message: 'Profile updated successfully', profile: updatedProfile });
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
