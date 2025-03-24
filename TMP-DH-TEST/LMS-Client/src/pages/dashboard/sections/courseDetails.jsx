import React, { useEffect, useState } from "react";
import OrangeCards from "../../../components/container/OrangeCards/OrangeCards";


function CourseDetails({courseDetailsProp}){
    const [courseData , setcourseData]=useState(courseDetailsProp);
    useEffect(() => {
        setcourseData(courseDetailsProp);
    }, [courseDetailsProp]);
    return(
        <OrangeCards courseData={courseData} />
    )
}


export default CourseDetails;