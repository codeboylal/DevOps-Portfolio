import BASEURL from "../../const/const.js";
import ApiHandler from "../../services/utils.js";

export const manageuser = (data) => {
    return ApiHandler(`${BASEURL}/api/users/post/${data.action}/data`, 'POST', data , null)
} 


export const edituser = (data) => {
    return ApiHandler(`${BASEURL}/api/users/post/edit`, 'POST', data , null)
} 

