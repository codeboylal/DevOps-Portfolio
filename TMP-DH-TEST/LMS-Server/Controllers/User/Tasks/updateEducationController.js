// const User = require("../../../Model/UserModel/model.js");
// const ResponseHandler = require("../../../utils/responseHandler.js");

// const updateEduProfileController = async(req, res, next) => {
//   try {
//     const {eduData , id, eduIndex} = req.body;

    
//     const profile = await User.findOne({_id:id})

//     if(profile){
//         if(eduIndex >= 0){
//           profile.education[eduIndex] = eduData;
//         }
//         if(eduIndex === null){
//           profile.education.push(eduData);
//         }
//         profile.save()
//         res.status(200).json(ResponseHandler(200, profile, 'Profile Education Updated successfully!'));


//     }else{
//         console.log("Profile not found")
//         res.status(404).json(ResponseHandler(404, null, 'Profile not found'));
//     }

//   } catch (err) {
//     console.error(err);
//     res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
//   }
// };

// module.exports = updateEduProfileController;



const User = require("../../../Model/UserModel/model.js");
const ResponseHandler = require("../../../utils/responseHandler.js");

const updateEduProfileController = async(req, res, next) => {
  try {
    const {eduData, id, eduIndex} = req.body;

    const profile = await User.findOne({_id:id});

    if(profile) {
      // console.log(eduIndex)
      if(eduIndex !== null) {
        // profile.education.splice(eduIndex, 1);
        if (eduData.isPrimaryEducation) {
          profile.education.splice(eduIndex, 1);
          profile.education.unshift(eduData); // Add at the beginning
        } else {
          profile.education[eduIndex] = eduData;
        }
      } else {
        // If eduData.isPrimaryEducation is true, add it to the first index
        if (eduData.isPrimaryEducation) {
          profile.education.unshift(eduData); // Add at the beginning
        } else {
          profile.education.push(eduData); // Add at the end
        }
      }

      // Save the updated profile
      await profile.save();
      res.status(200).json(ResponseHandler(200, profile, 'Profile Education Updated successfully!'));

    } else {
      console.log("Profile not found");
      res.status(404).json(ResponseHandler(404, null, 'Profile not found'));
    }

  } catch (err) {
    console.error(err);
    res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
  }
};

module.exports = updateEduProfileController;
