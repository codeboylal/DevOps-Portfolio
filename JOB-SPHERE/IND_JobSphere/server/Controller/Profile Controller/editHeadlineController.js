// const Profile = require('../../Models/User Model/userModel');

// const updateHeadline = async (req, res) => {
//     const { headline } = req.body;

//     try {
//         const email = req.body.email;

//         let profile = await Profile.findById(email);

//         if (!profile) {
//             profile = new Profile({
//                 headline
              
//             });
//         } else {
//             profile.headline = headline;
//         }

//         const savedProfile = await profile.save();

//         res.status(200).json({
//             message: 'Profile updated successfully',
//             profile: savedProfile
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error updating profile',
//             error: error.message
//         });
//     }
// };

// module.exports = {
//     updateHeadline
// };













// const Profile = require('../../Models/User Model/userModel');

// const updateHeadline = async (req, res) => {
//     const { headline, email } = req.body;

//     try {
//         // Find profile by email
//         let profile = await Profile.findOne({ email });

//         if (!profile) {
//             // If profile doesn't exist, create a new one
//             profile = new Profile({
//                 headline,
//                 email
//             });
//         } else {
//             // Update existing profile
//             profile.headline = headline;
//         }

//         const savedProfile = await profile.save();

//         res.status(200).json({
//             message: 'Profile updated successfully',
//             profile: savedProfile
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error updating profile',
//             error: error.message
//         });
//     }
// };

// module.exports = {
//     updateHeadline
// };












const Profile = require('../../Models/User Model/userModel');

const updateHeadline = async (req, res) => {
    const { headline } = req.body;

    const profileId = req.params.id;

    try {
        // Find profile by _id
        // let profile = await Profile.findOne({_id:profileId});
        
        // if (!profile) {
        //     return res.status(404).json({ message: 'Profile not found' });
        // }
       
        // // Update headline
        // profile.headline = headline;


        // const savedProfile = await profile.save();
        let updatedProfile = await Profile.findByIdAndUpdate(
            profileId, // The ID of the profile
            { headline: headline }, // The update to apply
            { new: true } // Return the updated document
        );
        res.status(200).json({
            message: 'Profile updated successfully',
            profile: updatedProfile
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating profile',
            error: error.message
        });
    }
};

const getHeadline = async (req, res) => {
    const profileId = req.params.id;

    try {
        // Find profile by _id
        const profile = await Profile.findById(profileId);

        if (!profile) {
            return res.status(404).json({
                message: 'Profile not found'
            });
        }

        // Send the headline back in the response
        res.status(200).json({
            message: 'Headline fetched successfully',
            headline: profile.headline
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching headline',
            error: error.message
        });
    }
};

module.exports = {
    updateHeadline,
    getHeadline 
};
