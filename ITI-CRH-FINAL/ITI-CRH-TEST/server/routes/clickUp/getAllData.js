const express = require ("express");


const {fetchAllData} = require("../../controllers/clickUp/getAllData.controller");
const { fetchProjectClickupData } = require("../../controllers/clickUp/getAllProjectClickupData.controller");


const clickUpRouter = express.Router();



clickUpRouter.get('/get/data', fetchAllData)

clickUpRouter.get('/get/projectData', fetchProjectClickupData)

module.exports = clickUpRouter;