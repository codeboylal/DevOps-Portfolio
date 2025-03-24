const express = require("express");

const GetUserDetailsController = require ("../../Controllers/User/Tasks/getUserDetailsController"); 
const GetUserToDoController = require("../../Controllers/User/Tasks/getUserToDoController");


const taskRouter = express.Router();

taskRouter.get('/get/dashboard/details', GetUserDetailsController);

taskRouter.get('/get/toDoCard/details', GetUserToDoController);

// Independent to any client

module.exports = taskRouter;