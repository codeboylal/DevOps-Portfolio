import Base_URL from "../../const/const";
import ApiHandler from "../utils";

export const getCourses = ({profileId, purchased, page, filter = "All", searchQuery = ""}) => {
    return ApiHandler(`${Base_URL}/api/v1/course/get/${profileId}/${purchased}/page/${page}?filter=${filter}&searchQuery=${searchQuery}`, 'GET', null, null);
};

export const purchaseCourses = ({profileId, courseId}) => {
    return ApiHandler(`${Base_URL}/api/v1/course/put/${profileId}/${courseId}/purchase`, 'PUT', null, null);
};


export const changeCourseStatusForUser = ({profileId, courseId}) => {
    return ApiHandler(`${Base_URL}/api/v1/course/put/${profileId}/${courseId}/changeStatus`, 'PUT', null, null);
};


export const getPopularCourses = ({profileId, courseId}) => {
    return ApiHandler(`${Base_URL}/api/v1/course/get/${profileId}/${courseId}/popularCourses`, 'GET', null, null);
};


export const getCoursePreviewDetails = ({profileId, courseId}) => {
    return ApiHandler(`${Base_URL}/api/v1/course/get/${profileId}/${courseId}/coursePreview`, 'GET', null, null);
};

export const getCourseData = ({profileId, courseId}) => {
    return ApiHandler(`${Base_URL}/api/v1/course/get/${profileId}/${courseId}/courseData`, 'GET', null, null);
};