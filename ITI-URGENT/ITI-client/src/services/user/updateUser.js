import BASEURL from "../../const/const.js";
import ApiHandler from "../../services/utils.js";

export const updateUserLike = (data) => {
    return ApiHandler(`${BASEURL}/api/users/post/update/likePlan`, 'POST', data , null)
} 

