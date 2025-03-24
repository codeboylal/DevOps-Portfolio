import ApiHandler from "../utils";
import BASEURL from "../../const/const";

export const getOwnerDetails = (OwnerID) =>{
    return ApiHandler(`${BASEURL}/api/projects/GET/Owner/${OwnerID}`,'GET',null,null)
}