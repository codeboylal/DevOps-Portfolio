const express = require ("express");


const {fetchUserData}  = require("../../controllers/user/getUser.controller");
const { fetchNotification } = require("../../controllers/user/getNotification.controller");



const userRouter = express.Router();


userRouter.post('/get/data', fetchUserData)


userRouter.get("/get/notification", fetchNotification);

module.exports = userRouter;