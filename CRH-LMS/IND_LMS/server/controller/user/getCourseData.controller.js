const { ResponseHandler } = require("../../utils/responseHandler.js");

const { User } = require("../../models/user.js");

const getCourseDataInUser = async (req, res) =>{
    try{

        const {profileId} = req.params;

        const profile = await User.findById(profileId);

        if(!profile){
            return res.status(200).json(ResponseHandler(false, null, "User not found"))
        }

        const courseData = profile.courseData || {};

        return res.status(200).json(ResponseHandler(true, courseData, "Fetched Course Data in user"))
    }catch{
        return res.status(500).json(ResponseHandler(false, null, "Internal Sever Error"))
    }
}

module.exports = {
    getCourseDataInUser
}