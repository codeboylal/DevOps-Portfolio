const jwt = require("jsonwebtoken");
// import { MY_SECRET_KEY } from "../const/const.js";
require('dotenv').config();
const { ResponseHandler } = require("../utils/responseHandler.js");
// import { dot } from "node:test/reporters";


function isAuthenticated(req, res, next) {

    const MY_SECRET_KEY = process.env.MY_SECRET_KEY
    const token = req.headers?.authorization?.split(" ")[1];
    // Verify the token
    if (token) {
        const decodedInfomation = jwt.verify(token, MY_SECRET_KEY);
        req.user = decodedInfomation;
        next();
    } else {
        res.status(200).json(ResponseHandler(200, {}, 'Token not valid!'));
    }
}

module.exports = isAuthenticated;