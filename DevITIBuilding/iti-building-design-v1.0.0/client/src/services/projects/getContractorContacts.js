import ApiHandler from "../utils";
import BASEURL from "../../const/const";

export const getContractorContacts = (data) =>{
    return ApiHandler(`${BASEURL}/api/projects/get/getContractorContacts`,'POST',data,null)
}