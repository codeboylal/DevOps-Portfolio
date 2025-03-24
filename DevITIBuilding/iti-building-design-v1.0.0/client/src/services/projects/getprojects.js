import ApiHandler from "../utils";
import BASEURL from "../../const/const";

export const getprojectsData = () => {
    return ApiHandler(`${BASEURL}/api/projects/get/displayCenter/plan`, 'GET', null,null)
} 

export const getFacadesData = () => {
    return ApiHandler(`${BASEURL}/api/projects/get/displayCenter/facade`, 'GET', null,null)
} 