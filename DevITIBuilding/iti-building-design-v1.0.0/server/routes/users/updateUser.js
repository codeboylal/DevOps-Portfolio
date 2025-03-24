const express = require ("express");

const updateLikedProject = require("../../controllers/user/updateLikedProject.controller");
const updateLikedPreConstruction = require("../../controllers/user/likepreconstruction.controller");



const updateuserRouter = express.Router();


updateuserRouter.post('/post/update/likePlan', updateLikedProject)

updateuserRouter.post('/post/update/likePreConstruction', updateLikedPreConstruction)

module.exports = updateuserRouter;