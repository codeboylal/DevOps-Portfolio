// import ApiHandler from "../utils";
// // import NotificationHandler from "../utils";
// import BASEURL from "../../const/const";

// export const getClickUpData = () => {
//     return ApiHandler(`${BASEURL}/api/clickUp`,'GET',null, null)
   


// }










import ApiHandler from "../utils";
import NotificationHandler from "../utils";
import BASEURL from "../../const/const";

export const getClickUpData = () => {
    return ApiHandler(`${BASEURL}/api/clickUp/get/data`,'GET',null, null)
}

export const getClickUpProjectData = () => {
    return ApiHandler(`${BASEURL}/api/clickUp/get/projectData`,'GET',null, null)
}