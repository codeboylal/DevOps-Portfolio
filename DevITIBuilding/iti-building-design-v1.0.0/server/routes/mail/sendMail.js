const express = require("express");


const sendOTP = require("../../controllers/mail/sendOTP");
const sendResLink = require("../../controllers/mail/resetPassword");

const mailRouter = express.Router();


mailRouter.post("/POST/sendOTP", sendOTP);

mailRouter.post("/POST/sendResetPassLink", sendResLink);


module.exports = mailRouter;
