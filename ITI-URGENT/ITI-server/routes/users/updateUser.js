const express = require ("express");

const updateLikedProject = require("../../controllers/user/updateLikedProject.controller");



const updateuserRouter = express.Router();


updateuserRouter.post('/post/update/likePlan', updateLikedProject)

module.exports = updateuserRouter;