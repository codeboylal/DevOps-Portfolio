import Base_URL from "../../const/const";
import ApiHandler from "../utils";

export const deleteEducationProfile = (data) => {
    return ApiHandler(`${Base_URL}/api/deletetask/post/Education/profile`,  'POST', data, {
        'Content-Type': 'application/json' 
    });
};

export const deleteToDoCardProfile = (data) => {
    return ApiHandler(`${Base_URL}/api/deletetask/post/ToDoCard`,  'POST', data, {
        'Content-Type': 'application/json' 
    });
};

export const deleteToDoListItem = (data) => {
    return ApiHandler(`${Base_URL}/api/deletetask/post/ToDoList`,  'POST', data, {
        'Content-Type': 'application/json' 
    });
};