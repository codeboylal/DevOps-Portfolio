const express = require("express");
const fetchAllPlans = require("../../../controllers/displayCenter/getProjects.controller.js");
const fetchAllfacade = require("../../../controllers/displayCenter/getFacade.controller.js");

const getRouter = express.Router();


getRouter.get("/get/displayCenter/plan", fetchAllPlans);

getRouter.get("/get/displayCenter/facade", fetchAllfacade);

module.exports = getRouter;
