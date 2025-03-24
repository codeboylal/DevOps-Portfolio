import BASEURL from "../../const/const.js";
import ApiHandler from "../utils";

// export const LoginService = (data) => {
//     return ApiHandler(`${BASEURL}/auth/login`, 'POST', data);
// }


export const SignUpService = (data) => {
    return ApiHandler(`${BASEURL}/api/auth/signup`,'POST',data)
}