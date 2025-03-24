import React, { useEffect, useState } from "react";

import styles from "./courseDetails.module.css";
import cx from "classnames";

// Sections
import TopBar from "./sections/topBar/topBar";
import CompletionPercentage from "./sections/completionPercentage/completionPercentage";
import UnderStanding from "./sections/understanding/understanding";
import LessonContent from "./sections/lessonContent/lessonContent";

// Component
import Scrollbar from "../../components/scrollBar/scrollBar.jsx";
import { getCourseCompletionData } from "../../services/user/getUser.jsx";
import { useParams } from "react-router-dom";
import { getCourseData } from "../../services/Courses/course.jsx";

function CourseDetails() {
  const [profileId] = useState(localStorage.getItem("profileId") || null);

  const {courseId, moduleId} = useParams();

  const [completionData, setCompletionData] = useState({})

  const [activeModule, setActiveModule] = useState(moduleId || 1);
  const [totalModule, setTotalModule] = useState(1)

  const [lessons, setLessons] = useState({})
  const [totalLessons, setTotalLessons] = useState(1)


  useEffect(() => {
    const fetchCompletionData = async () => {
      getCourseCompletionData({ profileId, courseId })
        .then((response) => {
          // console.log(response.data);
          setCompletionData(response?.data?.data)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (profileId && courseId) {
      fetchCompletionData();
    }else{
      console.log(profileId, courseId)
    }
  }, [profileId, courseId]);


  useEffect(()=>{
    getCourseData({profileId, courseId}).then((res)=>{
      // console.log(Object.keys(res.data.data).length, res.data.data, res.data.data[`Module${activeModule}`].lessons)
      setTotalModule(Object.keys(res?.data?.data)?.length)
      setLessons(res?.data?.data?.[`Module${activeModule}`]?.lessons);
      setTotalLessons(Object.keys(res?.data?.data[`Module${activeModule}`]?.lessons)?.length)
    }).catch((err)=>{
      console.log(err)
    })
  },[profileId, courseId, activeModule])


  return (
    <div className={cx(styles.flex, styles.flexColumn, styles.gap27px)} style={{height:'100%'}}>
      <TopBar activeModule={activeModule} setActiveModule={setActiveModule} courseId={courseId} totalModule={totalModule}/>
      <CompletionPercentage data={completionData}/>
      <UnderStanding />
      <Scrollbar>
        <div className={cx(styles.flex, styles.flexColumn, styles.gap27px)}>
          {Array.from({ length: totalLessons }, (_, index) => {
            return <LessonContent key={index} data={lessons[`Lesson${index + 1}`]}/>;
          })}
        </div>
      </Scrollbar>
    </div>
  );
}

export default CourseDetails;
