import Base_URL from "../../const/const";
import ApiHandler from "../utils";

export const GetUserDetails = (UserID) => {
    return ApiHandler(`${Base_URL}/api/task/get/dashboard/details?userID=${UserID}`, 'GET', null, {
        'Content-Type': 'application/json' 
    });
};


export const GetUserToDoDetails = (UserID) => {
    return ApiHandler(`${Base_URL}/api/task/get/toDoCard/details?userID=${UserID}`, 'GET', null, {
        'Content-Type': 'application/json' 
    });
};