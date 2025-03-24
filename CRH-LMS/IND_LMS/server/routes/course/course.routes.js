const express = require("express");

// Tasks
const { addCourseController } = require("../../controller/courses/Tasks/addCourse.controller");
const { getCourseController } = require("../../controller/courses/Tasks/getCourse.controller");
const { editCourseController } = require("../../controller/courses/Tasks/editCourse.controller");
const { deleteCourseController } = require("../../controller/courses/Tasks/deleteCourse.controller");


const { getUserCoursesController } = require("../../controller/courses/getUserCourses.controller");

// Purchase
const { purchaseCourseController } = require("../../controller/courses/purchase/purchaseCourse.Controller");
const { deletePurchase } = require("../../controller/courses/purchase/deletePurchase.controller");


// Change Status
const { ChangeStatusForUserController } = require("../../controller/courses/changeStatusForUser.controller");
const { getPopularCoursesController } = require("../../controller/courses/getPopularCourses.controller");
const { getFullCourseDetailsController } = require("../../controller/courses/getFullCourseDetails.controller");
const { getCourseDataController } = require("../../controller/courses/getCourseData.controller");



const courseRouter = express.Router()


// Tasks
courseRouter.get('/get', getCourseController)
courseRouter.get('/get/:courseId', getCourseController)

courseRouter.get('/get/:profileId/:purchased/page/:page', getUserCoursesController)
courseRouter.get('/get/:profileId/:courseId/popularCourses', getPopularCoursesController)
courseRouter.get('/get/:profileId/:courseId/coursePreview', getFullCourseDetailsController)

courseRouter.get('/get/:profileId/:courseId/courseData', getCourseDataController)



courseRouter.post('/add', addCourseController)

courseRouter.put('/edit/:courseId', editCourseController)

courseRouter.delete(`/delete/:courseId`, deleteCourseController)




// Purchase Course
courseRouter.put('/put/:profileId/:courseId/purchase', purchaseCourseController)

courseRouter.delete('/delete/purchase/all', deletePurchase)
courseRouter.delete(`/delete/purchase/:profileId`, deletePurchase)


// Change Status
courseRouter.put('/put/:profileId/:courseId/changeStatus', ChangeStatusForUserController)



module.exports = {
    courseRouter
} 