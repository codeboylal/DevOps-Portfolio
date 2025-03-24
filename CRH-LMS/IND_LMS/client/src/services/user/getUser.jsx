import Base_URL from "../../const/const";
import ApiHandler from "../utils";

export const getUserCourseData = ({profileId}) => {
    return ApiHandler(`${Base_URL}/api/v1/user/get/courseData/${profileId}`, 'GET', null, null);
};

export const getUserInstrutorData = ({profileId}) => {
    return ApiHandler(`${Base_URL}/api/v1/user/get/instructorData/${profileId}`, 'GET', null, null);
};

export const getUserNotificationData = ({profileId}) => {
    return ApiHandler(`${Base_URL}/api/v1/user/get/notificationData/${profileId}`, 'GET', null, null);
};

export const getCourseCompletionData = ({profileId, courseId}) => {
    return ApiHandler(`${Base_URL}/api/v1/user/get/${profileId}/${courseId}/completion`, 'GET', null, null);
};
