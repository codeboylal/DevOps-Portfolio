import BASEURL from "../../const/const.js";
import ApiHandler from "../utils.js";

export const sendOTP = (data) => {
    return ApiHandler(`${BASEURL}/api/mail/POST/sendOTP`, 'POST', data , null)
} 

