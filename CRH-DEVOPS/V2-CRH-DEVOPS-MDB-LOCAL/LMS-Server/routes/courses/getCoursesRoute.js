const express = require("express");
const getExploreCourseDetails = require("../../Controllers/Courses/getCoursesController");
const coursePurchase = require("../../Controllers/Courses/coursePurcahse");
const updateProgressOfCourse = require("../../Controllers/Courses/changeCourseProgress");


const courseRouter = express.Router();

courseRouter.get('/get/ExploreCourses/details', getExploreCourseDetails);

courseRouter.post('/post/update/progressOf/Course', updateProgressOfCourse);

courseRouter.post('/post/user/review', coursePurchase)


// Independent to any client

module.exports = courseRouter;