import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./myCourses.module.css";
import cx from "classnames";

import Scrollbar from "../../components/scrollBar/scrollBar.jsx";

import CoursesCard from "../../components/container/coursesCard/coursesCard.jsx";
import CoursesTopBar from "../../components/coursesTopBar/coursesTopBar.jsx";
import {
  changeCourseStatusForUser,
  getCourses,
} from "../../services/Courses/course.jsx";
import NewPagination from "../../components/newPagination/newPagination.jsx";

function MyCourses({courseFilter="All",searchQuery = ""}) {
  const navigate = useNavigate();

  const [userId] = useState(localStorage.getItem("profileId") || null);
  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState({})

  const [activePg, setactivePg] = useState(1);

  useEffect(() => {
    if (userId) {
      getCourses({ profileId: userId, purchased: true, page: activePg , filter : courseFilter, searchQuery: searchQuery})
        .then((res) => {
          // console.log(res.data.data);
          setCourses(res?.data?.data?.courses);
          setPagination(res?.data?.data?.pagination)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId, activePg, courseFilter, searchQuery]);

  const buttonCLick = (status, CourseId, moduleId) => {
    if (status === "In Review") {
      navigate(`/course/${CourseId}`);
    } else if (
      status === "Not Started" ||
      status === "In Progress" ||
      status === "Completed"
    ) {
      if (status === "Not Started") {
        changeCourseStatusForUser({ profileId: userId, courseId: CourseId })
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      navigate(`/courseDetails/${CourseId}/${moduleId}`);
    }
    return;
  };

  return (
    <div className={cx(styles.flex, styles.flexColumn, styles.gap24px)}>
      <CoursesTopBar  totalCourses={pagination?.totalCourses} currentPage={pagination?.currentPage} />
      <Scrollbar height={"calc(100vh - 14.25rem)"}>
        <div className={cx(styles.flex, styles.cardDiv, styles.gap16px)}>
          {courses &&
            courses.map((course, index) => {
              return (
                <CoursesCard
                  key={index}
                  data={course}
                  hideRateStats={true}
                  cardClick={() => {
                    navigate(`/course/${course._id}`);
                  }}
                  type={
                    course?.courseStatus === "In Review"
                      ? "review"
                      : course?.courseStatus === "Not Started"
                      ? "start"
                      : course?.courseStatus === "In Progress"
                      ? "progress"
                      : course?.courseStatus === "Completed"
                      ? "goTo"
                      : ""
                  }
                  buttonClick={() => {
                    buttonCLick(
                      course?.courseStatus,
                      course?._id,
                      course?.userModule
                    );
                  }}
                />
              );
            })}
        </div>
      </Scrollbar>
      <NewPagination
        activePg={pagination?.currentPage}
        totalCourses={pagination?.totalCourses}
        setactivePg={setactivePg}
        coursesPerPg={pagination?.limit}
      />
    </div>
  );
}

export default MyCourses;
