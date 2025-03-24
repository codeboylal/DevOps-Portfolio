import ApiHandler from "../utils";
import BASEURL from "../../const/const";

export const getInboxData = (data) => {
    return ApiHandler(`${BASEURL}/api/projects/POST/inboxData`, 'POST', data,null)
} 


export const completeInboxTask = (data) => {
    return ApiHandler(`${BASEURL}/api/projects/POST/inbox/completeTask`, 'POST', data,null)
} 



export const likeInboxTask = (data) => {
    return ApiHandler(`${BASEURL}/api/projects/POST/inbox/likeTask`, 'POST', data,null)
} 

