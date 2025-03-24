const express = require('express');
const { getCoursesByUserId} = require('../../../Controllers/My Course/Go To Course/goToCourseController');
const router = express.Router();



router.get('/:id/courses', getCoursesByUserId);

module.exports = router;