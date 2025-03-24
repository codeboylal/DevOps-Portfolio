import Base_URL from "../../const/const";
import ApiHandler from "../utils";

export const courseReviewAdmin = (data) => {
    return ApiHandler(`${Base_URL}/api/courses/post/user/review`,  'POST', data, {
        'Content-Type': 'application/json' 
    });
};