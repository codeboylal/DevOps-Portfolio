const express = require("express");
const updateToDoDashboardController = require("../../Controllers/User/Tasks/updateToDoDashboardController");
const updateHeaderProfileController = require("../../Controllers/User/Tasks/updateHeaderProfile");
const updateBioProfileController = require("../../Controllers/User/Tasks/updateUserBio");
const updateEduProfileController = require("../../Controllers/User/Tasks/updateEducationController");
const updateToDoCardController = require("../../Controllers/User/Tasks/updateToDoCardController");
const updateToDoListController = require("../../Controllers/User/Tasks/updateToDoListController");


const updateRouter = express.Router();

updateRouter.post('/get/todo/dashboard', updateToDoDashboardController);

updateRouter.post('/get/header/profile',updateHeaderProfileController);

updateRouter.post('/get/bio/profile',updateBioProfileController);

updateRouter.post('/get/education/profile',updateEduProfileController)

updateRouter.post('/get/ToDo/Card', updateToDoCardController)

updateRouter.post('/get/ToDo/List', updateToDoListController)

// Independent to any client

module.exports = updateRouter;