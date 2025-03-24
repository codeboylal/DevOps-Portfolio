const { ResponseHandler } = require("../../utils/responseHandler.js");
const { User } = require("../../models/user.js");

const ChangeStatusForUserController = async (req, res) => {
    try {
        const { profileId, courseId } = req.params;

        const profile = await User.findById(profileId);

        if (!profile) {
            return res.status(200).json(ResponseHandler(false, null, "Profile Not Found"));
        }

        let courseUpdated = false;

        // Check if the course exists in the profile and update its status
        for (let course of profile.purchasedCourses) {
            if (course?.courseId?.toString() === courseId?.toString()) {
                course.courseStatus = "In Progress";
                courseUpdated = true;
            }
        }

        if (!courseUpdated) {
            return res.status(200).json(ResponseHandler(false, null, "Course Not Found in Profile"));
        }

        profile.markModified("purchasedCourses");
        await profile.save();

        return res.status(200).json(ResponseHandler(true, null, `Changed Status to "In Progress" for ${courseId} in User ${profileId}`));
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json(ResponseHandler(false, null, "Internal Server Error"));
    }
};

module.exports = {
    ChangeStatusForUserController
};
