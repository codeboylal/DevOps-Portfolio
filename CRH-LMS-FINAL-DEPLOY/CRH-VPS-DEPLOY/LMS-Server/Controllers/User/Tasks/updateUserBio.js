const User = require("../../../Model/UserModel/model.js");
const ResponseHandler = require("../../../utils/responseHandler.js");

const updateBioProfileController = async(req, res, next) => {
  try {
    const {newBio , userId} = req.body;
    
    const profile = await User.findOne({_id:userId})

    if(profile){
        profile.bio = newBio;

        await profile.save()
        res.status(200).json(ResponseHandler(200, profile, 'Profile Bio Updated successfully!'));


    }else{
        console.log("Profile not found")
        res.status(404).json(ResponseHandler(404, null, 'Profile not found'));
    }

  } catch (err) {
    console.error(err);
    res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
  }
};

module.exports = updateBioProfileController;
