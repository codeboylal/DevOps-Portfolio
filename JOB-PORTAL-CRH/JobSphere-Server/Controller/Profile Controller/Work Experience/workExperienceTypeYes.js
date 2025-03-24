// // controllers/profileController.js

// const Profile = require('../../../Models/User Model/userModel');

// exports.saveWorkExperience = async (req, res) => {
//     try {
    //   const { , workExperience } = req.body;
  
    //   // Find the user's profile by name or any other identifier like user ID
    //   let profile = await Profile.findOne({ name });
  
//       if (!profile) {
//         // If profile does not exist, create a new one
//         profile = new Profile({
//           name,
//           workExperience,  // Initialize with the first work experience
//         });
//       } else {
//         // Push the new work experience into the existing profile's workExperience array
//         profile.workExperience.push(...workExperience);
//       }
  
//       // Save the profile
//       await profile.save();
//       res.status(200).json({ message: "Work experience saved successfully", profile });
//     } catch (error) {
//       console.error("Error saving work experience:", error);
//       res.status(500).json({ message: "Error saving work experience" });
//     }
//   };






const Profile = require('../../../Models/User Model/userModel');

exports.saveWorkExperience = async (req, res) => {
    // try {
        // const { email, workExperience } = req.body; // Correctly destructure email and workExperience

        // // Find the user's profile by email
        // let profile = await Profile.findOne({ email });

    //     if (!profile) {
    //         // If profile does not exist, create a new one
    //         profile = new Profile({
    //             email, // Ensure the email is saved
    //             workExperience: [workExperience], // Initialize with the first work experience
    //         });
    //     } else {
    //         // Push the new work experience into the existing profile's workExperience array
    //         profile.workExperience.push(workExperience);
    //     }

    //     // Save the profile
    //     await profile.save();
    //     res.status(200).json({ message: "Work experience saved successfully", profile });
    // } catch (error) {
    //     console.error("Error saving work experience:", error);
    //     res.status(500).json({ message: "Error saving work experience" });
    // }



    try {
        // Find the profile by ID and push the new work experience into the array
         // Correctly destructure email and workExperience
         const { email, workExperience } = req.body; // Correctly destructure email and workExperience


        const profile = await Profile.findOneAndUpdate(
          { email:email }, 
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
