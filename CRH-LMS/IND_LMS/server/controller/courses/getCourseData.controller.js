const { ResponseHandler } = require("../../utils/responseHandler.js");

const {Course} = require("../../models/course/course.model.js");

const {User} = require("../../models/user.js");

const getCourseDataController = async(req, res)=>{
    try{
        const {profileId, courseId} = req.params;

        if(profileId === "undefined" || courseId === "undefined" || !profileId || !courseId){
            return res.status(200).json(ResponseHandler(false, null, "Profile Id or Course Id not found."))
        } 

        const course = await Course.findById(courseId);

        const profile = await User.findById(profileId)

        if(!course || !profile){
            return res.status(200).json(ResponseHandler(false, null, "Course or  not found"))
        }

        const courseIndex = profile.purchasedCourses.findIndex((pCourse)=> pCourse?.courseId === courseId)

        if(courseIndex === -1 || !course?.enrolledUsers?.includes(profile._id)){
            return res.status(200).json(ResponseHandler(false, null, "Please Purchase the course"))
        }

        const courseData = course.courseData ? Object.fromEntries(course.courseData) : {};

        return res.status(200).json(ResponseHandler(true, courseData, "Course Data Fetched"))
    }catch{
        return res.status(500).json(ResponseHandler(false, null, "Internal Server Error"))
    }
}

module.exports ={
    getCourseDataController
}