import BASEURL from "../../const/const.js";
import ApiHandler from "../../services/utils.js";

export const getUserData = (data) => {
    return ApiHandler(`${BASEURL}/api/users/get/data`, 'POST', data , null)
    

} 

