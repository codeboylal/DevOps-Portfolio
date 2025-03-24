import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import styles from "./coursePreview.module.css";
import cx from "classnames";

// Sections
import UpperSection from "./sections/upperSection/upperSection";
import MidSection from "./sections/midSection/midSection";
import LowerSection from "./sections/lowerSection/lowerSection";
import ScrollBar from "../../components/scrollBar/scrollBar";
import { getCoursePreviewDetails } from "../../services/Courses/course";

function CoursePreview() {

  const { id: courseId } = useParams();

  const [profileId, setProfileId] = useState(null);
  const [course, setCourse] = useState({});

  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    // Retrieve profileId once on mount
    setProfileId(localStorage.getItem("profileId") || null);

  }, []);

    useEffect(() => {
      const fetchCourses = async () => {
        if (!profileId || !courseId) return; // Ensure both are available
  
        try {
          const response = await getCoursePreviewDetails({ profileId, courseId });
          // console.log(response?.data)
          if (response?.data?.data) {
            setRefresh(false)
            setCourse(response.data.data);
          }
        } catch (err) {
          console.error("Error fetching courses:", err);
        }
      };
  
      if(refresh){
        fetchCourses();
      }
    }, [profileId, courseId, refresh]);


  return (
    <ScrollBar height={"calc(100vh - 105px)"}>
      <div className={cx(styles.flex, styles.flexColumn, styles.gap24px)}>
        <UpperSection
          type={course?.purchasedData ? course?.purchasedData?.courseStatus === "In Review" ? "review" : 
            course?.purchasedData?.courseStatus === "In Progress" ? "progress" :
            course?.purchasedData?.courseStatus === "Completed" ? "goTo" :
            course?.purchasedData?.courseStatus === "Not Started" ? "start" :
            "" : "enroll"}
          courseData = {course}
          setRefresh={setRefresh}
        />
        <MidSection courseData={course}/>
        <LowerSection />
      </div>
    </ScrollBar>
  );
}

export default CoursePreview;
