import BASEURL from "../../const/const.js";
import ApiHandler from "../../services/utils.js";

export const addOrganization = (data) => {
    return ApiHandler(`${BASEURL}/api/post/organization/data`, 'POST', data , null)  
} 