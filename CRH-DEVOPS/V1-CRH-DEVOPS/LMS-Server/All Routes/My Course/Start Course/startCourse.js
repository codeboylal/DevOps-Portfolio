const express = require('express');
const router = express.Router();
const { getCourses,updateCourseStatus } = require('../../../Controllers/My Course/Start Course/startCourse');

// Route to fetch all courses for a specific user
router.get('/user/:id/courses', getCourses);
router.put('/user/:userId/course/:courseId/progress', updateCourseStatus);


module.exports = router;
