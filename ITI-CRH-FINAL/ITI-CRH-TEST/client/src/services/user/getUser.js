import BASEURL from "../../const/const.js";
import ApiHandler from "../../services/utils.js";

export const getUserData = (data) => {
    return ApiHandler(`${BASEURL}/api/users/get/data`, 'POST', data , null)  
} 

export const getAllUserData = (data) => {
    return ApiHandler(`${BASEURL}/api/users//all/get/data`, 'POST', data , null)  
} 

// getUserData({userId}).then(response=>{
//     console.log(response?.data?.data)
// }).catch(err=>{
//     console.log(err)
// })