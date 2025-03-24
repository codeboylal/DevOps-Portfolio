const { User } = require("../../models/user.js");
const { ResponseHandler } = require("../../utils/responseHandler.js");

const getNotificationController = async (req,res) =>{
    try{
        const {profileId} = req.params;
        if(!profileId){
            return res.status(200).json(ResponseHandler(false, null, "No Id found in params"));
        }
        const profile = await User.findById(profileId);
        if(!profile){
            return res.status(200).json(ResponseHandler(false, null, "No profile found"));
        }
        const notificationData = profile.notification;
        return res.status(200).json(ResponseHandler(true, notificationData, "Notification Data Fetched Successfully"))
    }catch{
        return res.status(500).json(ResponseHandler(true, null, "Internal Server Error"))
    }
}

module.exports = {
    getNotificationController
}