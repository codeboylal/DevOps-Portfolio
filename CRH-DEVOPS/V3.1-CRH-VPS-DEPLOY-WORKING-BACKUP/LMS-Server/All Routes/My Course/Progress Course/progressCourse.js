const express = require('express');
const { getUserCoursesProgress } = require('../../../Controllers/My Course/Progress Course/progressCourseController');
const router = express.Router();

// Route to get user's progress courses by user ID
router.get('/:id/course', getUserCoursesProgress);


module.exports = router;
