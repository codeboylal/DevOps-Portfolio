const express = require ("express");

const isAuthenticated = require("../middleware/isAuthenticated.js");


const authRouter = require("./Auth/auth.js");
const userRouter = require("./users/getUser.js");
const clickUpRouter = require("./clickUp/getAllData.js");
const updateuserRouter = require("./users/updateUser.js");
const getRouter = require("./projects/GET/getProjects.js");

const routerPath = express.Router();

// router.use('/task', isAuthenticated, taskRouter);

routerPath.use('/auth', authRouter);


routerPath.use('/users', userRouter)

routerPath.use('/users', updateuserRouter)

routerPath.use('/projects', getRouter)

routerPath.use('/clickUp', clickUpRouter)

module.exports = routerPath;