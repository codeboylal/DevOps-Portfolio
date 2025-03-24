const express = require("express");
const taskRouter = require("./Tasks/task.js");
const updateRouter = require("./Tasks/updateTasks.js")
const courseRouter = require("./courses/getCoursesRoute.js");
const deleteRouter = require("./Tasks/deleteTask.js");
const mailRouter = require("./Tasks/mailSend.js");


const router = express.Router();

router.use('/task',  taskRouter);
router.use('/updatetask', updateRouter)
router.use('/deletetask', deleteRouter)
router.use('/courses', courseRouter)

router.use('/contact',mailRouter);

module.exports = router;