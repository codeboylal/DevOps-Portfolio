const express = require("express");

const { courseRouter } = require("./course/course.routes");
const { userRouter } = require("./user/user.routes");

const routerPath = express.Router();

// router.use('/task', isAuthenticated, taskRouter);

routerPath.use('/course', courseRouter)

routerPath.use('/user', userRouter)

module.exports = routerPath;
