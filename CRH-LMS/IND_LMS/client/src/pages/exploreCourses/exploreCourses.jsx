import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./exploreCourses.module.css";
import cx from "classnames";

import Scrollbar from "../../components/scrollBar/scrollBar.jsx";

import CoursesCard from "../../components/container/coursesCard/coursesCard.jsx";
import CoursesTopBar from "../../components/coursesTopBar/coursesTopBar.jsx";

import { getCourses, purchaseCourses } from "../../services/Courses/course.jsx";
import SuccessPopUp from "./popup/successPopUp.jsx";
import NewPagination from "../../components/newPagination/newPagination.jsx";

function ExploreCourses({searchQuery=""}) {
  const navigate = useNavigate();

  const [userId] = useState(localStorage.getItem("profileId") || null);

  const [courses, setCourses] = useState([]);
  const [pagination, setPagination] = useState({})

  const [fetchCourses, setFetchCourses] = useState(true);

  const [successPopupOpen, setSuccessPopUpOpen] = useState(false);

  const [activePg, setactivePg] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      getCourses({ profileId: userId, purchased: false, page: activePg , searchQuery})
        .then((res) => {
          // console.log(res.data.data);
          setCourses(res?.data?.data?.courses);
          setPagination(res?.data?.data?.pagination)
          setFetchCourses(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (userId && fetchCourses) {
      fetchCourses();
    }
  }, [userId, fetchCourses, activePg, searchQuery]);

  const cardClick = (id) => {
    navigate(`/course/${id}`);
  };

  const buttonClick = (id, tag, review, purchased) => {
    if (review) {
      return navigate(`/course/${id}`);
    }
    if (purchased) {
      return navigate(`/courseDetails/${id}/${1}`);
    }

    purchaseCourses({ profileId: userId, courseId: id, page: activePg })
      .then((_response) => {
        if (tag === "paid") {
          setSuccessPopUpOpen(true);
        }
        // console.log(response.data);
        setFetchCourses(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cx(styles.flex, styles.flexColumn, styles.gap24px)}>
      <CoursesTopBar totalCourses={pagination?.totalCourses} currentPage={pagination?.currentPage}/>
      <Scrollbar height={"calc(100vh - 14.25rem)"}>
        <div className={cx(styles.flex, styles.cardDiv, styles.gap16px)}>
          {courses?.map((item, index) => (
            <CoursesCard
              data={item}
              type={
                item.inReview
                  ? "review"
                  : item.purchased
                  ? "purchased"
                  : "enroll"
              }
              cardClick={() => {
                cardClick(item._id);
              }}
              buttonClick={() => {
                buttonClick(item._id, item.tag, item.inReview, item.purchased);
              }}
              key={index}
            />
          ))}
        </div>
      </Scrollbar>
      <NewPagination
        activePg={pagination?.currentPage}
        totalCourses={pagination?.totalCourses}
        setactivePg={setactivePg}
        coursesPerPg={pagination?.limit}
      />
      {successPopupOpen && (
        <SuccessPopUp setSuccessPopUp={setSuccessPopUpOpen} />
      )}
    </div>
  );
}

export default ExploreCourses;

{
  /* <CoursesCard
        type={"progress"}
        buttonClick={() => {
          console.log("Progress card clicked");
        }}
      />
      <CoursesCard
        type={"goTo"}
        buttonClick={() => {
          console.log("Go to card clicked");
        }}
      />
      <CoursesCard
        type={"start"}
        buttonClick={() => {
          console.log("Start card clicked");
        }}
      /> */
}
