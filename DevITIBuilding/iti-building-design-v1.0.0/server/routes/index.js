const express = require("express");

const isAuthenticated = require("../middleware/isAuthenticated.js");

const authRouter = require("./Auth/auth.js");
const getRouter = require("./projects/GET/getProjects.js");
const userRouter = require("./users/getUser.js");
const clickUpRouter = require("./clickUp/getAllData.js");
const updateuserRouter = require("./users/updateUser.js");
const mailRouter = require("./mail/sendMail.js");
const addOrganizationRouter = require("./organization/addOrganization.js");
const getOrganizationRouter = require("./organization/getOrganization.js");
const webhooksRouter = require("./webhooks/webhooks.js");

const routerPath = express.Router();

// router.use('/task', isAuthenticated, taskRouter);

routerPath.use("/auth", authRouter);

routerPath.use("/projects", getRouter);

routerPath.use("/users", userRouter);

routerPath.use("/users", updateuserRouter);

routerPath.use("/mail", mailRouter);

routerPath.use("/clickUp", clickUpRouter);

routerPath.use("/post/organization", addOrganizationRouter);

routerPath.use("/get/organization", getOrganizationRouter);

routerPath.use("/webhooks", webhooksRouter);

module.exports = routerPath;
