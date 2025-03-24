const express = require("express");
const registerUser = require("../../controllers/Auth/signUp.controller");

const authRouter = express.Router();

// authRouter.post('/login', loginController);

authRouter.post('/signup', registerUser);


module.exports =  authRouter;