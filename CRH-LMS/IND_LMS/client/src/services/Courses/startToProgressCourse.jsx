import Base_URL from "../../const/const";
import ApiHandler from "../utils";

export const updateProgressOfCourse = (data) => {
    // console.log(data)
    return ApiHandler(`${Base_URL}/api/courses/post/update/progressOf/Course`, 'POST', data,  {
        'Content-Type': 'application/json' 
    });
};
