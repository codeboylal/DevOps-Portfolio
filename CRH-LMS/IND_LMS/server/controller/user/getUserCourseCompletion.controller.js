const {ResponseHandler} = require("../../utils/responseHandler.js");

const {User} = require("../../models/user.js");

const {Course} = require("../../models/course/course.model.js");

const getUserCourseCompletionController = async (req, res) =>{
    try{
        const {profileId, courseId} = req.params;

        if(profileId === "undefined" || courseId === "undefined" || !profileId || !courseId){
            return res.status(200).json(ResponseHandler(false, null, "CourseId or ProfileId not found in params"))
        }

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(200).json(ResponseHandler(false, null, "Course not found")) 
        }

        const profile = await User.findById(profileId);

        if(!profile){
            return res.status(200).json(ResponseHandler(false, null, "Profile not found"))
        }

        const courseIndex = profile.purchasedCourses.findIndex((pCourse)=>pCourse.courseId === courseId)

        if(!course.enrolledUsers.includes(profileId) || (courseIndex === -1)){
            return res.status(200).json(ResponseHandler(false, null, "Please purchase the course"))
        }

        const data = profile?.purchasedCourses?.[courseIndex]?.lessons
        
        return res.status(200).json(ResponseHandler(true, data, "Course Completion Data Fetched"))
    }catch{
        return res.status(500).json(ResponseHandler(false, null, "Internal Server Error"))
    }
}

module.exports = {
    getUserCourseCompletionController
}