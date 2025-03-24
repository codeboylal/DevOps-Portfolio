const express = require("express");


const { getCourseDataInUser } = require("../../controller/user/getCourseData.controller");
const { getInstructorDataInUser } = require("../../controller/user/getInstructorData.controller");
const { getNotificationController } = require("../../controller/user/getNotificationData.controller");

const { getUserCourseCompletionController } = require("../../controller/user/getUserCourseCompletion.controller");

const userRouter = express.Router();


userRouter.get("/get/courseData/:profileId", getCourseDataInUser)

userRouter.get("/get/instructorData/:profileId", getInstructorDataInUser)

userRouter.get("/get/notificationData/:profileId", getNotificationController)

userRouter.get("/get/:profileId/:courseId/completion", getUserCourseCompletionController)


module.exports = {
    userRouter
}