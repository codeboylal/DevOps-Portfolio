import Base_URL from "../../const/const";
import ApiHandler from "../utils";

export const updateToDoDashboard = (data) => {
    return ApiHandler(`${Base_URL}/api/updatetask/get/todo/dashboard`,  'POST', data, {
        'Content-Type': 'application/json' 
    });
};

export const updateHeaderProfile = (data) => {
    return ApiHandler(`${Base_URL}/api/updatetask/get/header/profile`,  'POST', data, {
        'Content-Type': 'application/json' 
    });
};

export const updateBioProfile = (data) =>{
    return ApiHandler(`${Base_URL}/api/updatetask/get/bio/profile`, 'POST', data, {
        'content-Type': 'application/json'
    });
};

export const updateEducationProfile = (data) =>{
    return ApiHandler(`${Base_URL}/api/updatetask/get/education/profile`, 'POST', data, {
        'content-Type': 'application/json'
    });
};

export const updateToDoCard = (data) =>{
    return ApiHandler(`${Base_URL}/api/updatetask/get/ToDo/Card`, 'POST', data, {
        'content-Type': 'application/json'
    });
};

export const updateToDoList = (data) =>{
    return ApiHandler(`${Base_URL}/api/updatetask/get/ToDo/List`, 'POST', data, {
        'content-Type': 'application/json'
    });
};