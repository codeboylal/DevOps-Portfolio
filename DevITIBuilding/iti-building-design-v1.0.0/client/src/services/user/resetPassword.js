import BASEURL from "../../const/const";
import ApiHandler from "../utils";

export const resetPass = (data) =>{
    return ApiHandler(`${BASEURL}/api/users/POST/resetPass`,'POST',data,null)
}