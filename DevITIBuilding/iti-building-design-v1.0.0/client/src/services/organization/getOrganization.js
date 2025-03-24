import BASEURL from "../../const/const.js";
import ApiHandler from "../../services/utils.js";

export const getOrganization = () => {
    return ApiHandler(`${BASEURL}/api/get/organization/data`, 'get', null , null)  
} 