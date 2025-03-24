
// const express = require('express');
// const Profile = require('../../Models/User Model/userModel');
// const router = express.Router();

// // Update Profile Data
// router.put('/profile/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       preferredWorkLocation,
//       minBasePay,
//       jobTypes,
//       preferredShift,
//       remoteOptions
//     } = req.body;

//     // Construct jobPreferences object
//     const jobPreferences = {
//       preferredWorkLocation,
//       expectedSalary: {
//         currency: 'INR', // Assuming currency is fixed; adjust as needed
//         amount: minBasePay
//       },
//       jobType: jobTypes !== 'none' ? { [jobTypes]: true } : {},
//       preferredShift,
//       remoteOptions: remoteOptions !== 'none' ? { [remoteOptions]: true } : {},
//     };

//     // Find the profile by ID and update jobPreferences
//     const updatedProfile = await Profile.findByIdAndUpdate(
//       id,
//       { $set: { 'jobPreferences': jobPreferences } }, // Correctly path the field to update
//       { new: true, upsert: true }
//     );

//     res.status(200).json({
//       message: 'Job Preferences updated successfully',
//       data: updatedProfile,
//     });
//   } catch (error) {
//     console.error('Error updating job preferences:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// router.get('/profile/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const profile = await Profile.findById(id);
  
//       if (!profile) {
//         return res.status(404).json({ message: 'Profile not found' });
//       }
  
//       res.status(200).json(profile);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });
    
  

// module.exports = router;


































// const express = require('express');
// const Profile = require('../../Models/User Model/userModel');
// const router = express.Router();

// // Update Profile Data
// router.put('/profile/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       preferredWorkLocation,
//       minBasePay,
//       jobTypes,
//       preferredShift,
//       remoteOptions
//     } = req.body;

//     // Construct jobPreferences object
//     const jobPreferences = {
//       preferredWorkLocation,
//       expectedSalary: {
//         currency: 'INR', // Assuming currency is fixed; adjust as needed
//         amount: minBasePay
//       },
//       jobType: jobTypes !== 'none' ? { [jobTypes]: true } : {},
//       preferredShift,
//       remoteOptions: remoteOptions !== 'none' ? { [remoteOptions]: true } : {},
//     };

//     // Find the profile by ID and update jobPreferences
//     const updatedProfile = await Profile.findByIdAndUpdate(
//       id,
//       { $set: { 'jobPreferences': jobPreferences } }, // Correctly path the field to update
//       { new: true, upsert: true }
//     );

//     if (!updatedProfile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }

//     res.status(200).json({
//       message: 'Job Preferences updated successfully',
//       data: updatedProfile,
//     });
//   } catch (error) {
//     console.error('Error updating job preferences:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Fetch Profile by ID
// router.get('/profile/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const profile = await Profile.findById(id);

//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }

//     // Return only job preferences if needed
//     const jobPreferences = profile.jobPreferences;
//     res.status(200).json(jobPreferences || {});
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;

































const express = require('express');
const Profile = require('../../Models/User Model/userModel');
const router = express.Router();

// Update Job Preferences
router.put('/job-preferences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      preferredWorkLocation,
      minBasePay,
      jobTypes,
      preferredShift,
      remoteOptions
    } = req.body;

    // Construct jobPreferences object
    const jobPreferences = {
      preferredWorkLocation,
      expectedSalary: {
        currency: 'INR', // Assuming currency is fixed; adjust as needed
        amount: minBasePay
      },
      jobType: jobTypes !== 'none' ? { [jobTypes]: true } : {},
      preferredShift,
      remoteOptions: remoteOptions !== 'none' ? { [remoteOptions]: true } : {},
    };

    // Find the profile by ID and update jobPreferences
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { $set: { jobPreferences: jobPreferences } }, // Update jobPreferences field
      { new: true, upsert: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({
      message: 'Job Preferences updated successfully',
      data: updatedProfile,
    });
  } catch (error) {
    console.error('Error updating job preferences:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Fetch Job Preferences by User ID
router.get('/job-preferences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Return only job preferences
    res.status(200).json(profile.jobPreferences || {});
  } catch (error) {
    console.error('Error fetching job preferences:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
