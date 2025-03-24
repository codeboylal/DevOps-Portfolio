import Base_URL from "../../const/const";
import ApiHandler from "../utils";

export const getExploreCourses = () => {
    return ApiHandler(`${Base_URL}/api/courses/get/ExploreCourses/details`, 'GET', null, null);
};
