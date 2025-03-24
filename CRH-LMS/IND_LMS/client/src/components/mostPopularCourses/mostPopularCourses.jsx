import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./mostPopularCourses.module.css";
import cx from "classnames";

import TopBar from "./topBar/topBar";
import CoursesCard from "../container/coursesCard/coursesCard";
import { getPopularCourses } from "../../services/Courses/course";

function MostPopularCourses() {
  const navigate = useNavigate();
  const { id: courseId} = useParams() || "";

  const [profileId, setProfileId] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Retrieve profileId once on mount
    setProfileId(localStorage.getItem("profileId") || null);

    // Load cached courses
    const cachedCourses = sessionStorage.getItem("popularCourses");
    if (cachedCourses) {
      setCourses(JSON.parse(cachedCourses));
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!profileId) return; // Ensure both are available

      try {
        const response = await getPopularCourses({ profileId, courseId });
        if (response?.data?.data) {
          sessionStorage.setItem("popularCourses", JSON.stringify(response.data.data));
          setCourses(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, [profileId, courseId]);

  const handleClick = (courseID) => {
    navigate(`/course/${courseID}`);
  };

  return (
    <div className={cx(styles.flex, styles.gap24px, styles.flexColumn)}>
      <TopBar />
      <div className={cx(styles.flex, styles.flexWrap, styles.gap16px)}>
        {courses.length > 0 ? (
          courses.map((item) => (
            <CoursesCard
              type="enroll"
              key={item._id}
              data={item}
              cardClick={() => handleClick(item._id)}
              buttonClick={() => handleClick(item._id)}
            />
          ))
        ) : (
          <p>No popular courses available.</p>
        )}
      </div>
    </div>
  );
}

export default MostPopularCourses;
