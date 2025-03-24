import ApiHandler from "../utils";
import BASEURL from "../../const/const";

export const getAssignedTo = (TaskID) => {
    return ApiHandler(`${BASEURL}/api/projects/GET/AssignedTO/${TaskID}`, 'GET', null,null)
} 


export const UpdateAssignedTo = (data) => {
    return ApiHandler(`${BASEURL}/api/projects/POST/assignedTo`, 'POST', data,null)
} 


