const express = require("express");
const PostConatctSendMailController = require("../../Controllers/ContactUs/mailSendController");
const mailRouter = express.Router();

mailRouter.post('/send-mail',PostConatctSendMailController)

module.exports = mailRouter;