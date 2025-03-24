const User = require("../../../../Model/UserModel/model.js");
const ResponseHandler = require("../../../../utils/responseHandler.js");

const DeleteEducationController = async (req, res, next) => {
    const { userID, educationIndex } = req.body;
    // console.log(userID, educationIndex);

    try {
        const profile = await User.findOne({ _id: userID });

        if (profile) {
            if (educationIndex >= 0 && educationIndex < profile.education.length) {
                // console.log(profile.education[educationIndex]);

                profile.education.splice(educationIndex, 1);

                await profile.save();

                res.status(200).json(ResponseHandler(200, profile, 'Education deleted successfully!'));
            } else {
                res.status(400).json(ResponseHandler(400, null, 'Invalid education index'));
            }
        } else {
            console.log("Profile not found");
            res.status(404).json(ResponseHandler(404, null, 'Profile not found'));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
    }
};

module.exports = DeleteEducationController;
