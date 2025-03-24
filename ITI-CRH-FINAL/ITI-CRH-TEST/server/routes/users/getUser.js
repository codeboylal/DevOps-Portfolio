const express = require ("express");


const {fetchUserData}  = require("../../controllers/user/getUser.controller");
const { fetchNotification } = require("../../controllers/user/getNotification.controller");
const resetPassword = require("../../controllers/user/resetPassword.controller");
const {manageUserController} = require("../../controllers/user/mangeUser.controller.js");
const { editUserController } = require("../../controllers/user/editUser.js");
const { fetchAllUsersData } = require("../../controllers/user/fetchallusers.controller.js");



const userRouter = express.Router();


userRouter.post('/get/data', fetchUserData)

userRouter.post('/all/get/data', fetchAllUsersData)

userRouter.get("/get/notification", fetchNotification);

userRouter.post("/POST/resetPass", resetPassword);

userRouter.post(`/post/:action/data`, manageUserController);

userRouter.post(`/post/edit`, editUserController);

module.exports = userRouter;