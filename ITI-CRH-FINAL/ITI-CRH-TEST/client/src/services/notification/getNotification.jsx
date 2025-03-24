import BASEURL from "../../const/const.js";
import ApiHandler from "../../services/utils.js";

export const getNotification = () => {
    return ApiHandler(`${BASEURL}/api/users/get/notification`, 'GET', null , null)
} 

