import BASEURL from "../../const/const.js";
import ApiHandler from "../utils.js";

export const sendResetPassLink = (data) => {
    return ApiHandler(`${BASEURL}/api/mail/POST/sendResetPassLink`, 'POST', data , null)
} 

