import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./upperSection.module.css";
import cx from "classnames";

// Assets
import CardImage from "../../../../assets/courseCard/img.png";
import star from "../../../../assets/courseCard/star.svg";
import book from "../../../../assets/courseCard/book.svg";
import clock from "../../../../assets/courseCard/clock.svg";
import chart from "../../../../assets/courseCard/chart.svg";
import ruppee from "../../../../assets/courseCard/ruppee.svg";
import {
  changeCourseStatusForUser,
  purchaseCourses,
} from "../../../../services/Courses/course";

import SuccessPopUp from "../../../exploreCourses/popup/successPopUp";

function UpperSection({ courseData = {}, type = "", setRefresh }) {
  const navigate = useNavigate();

  const [userId] = useState(localStorage.getItem("profileId") || null);

  const [successPopupOpen, setSuccessPopUpOpen] = useState(false);

  const buttonClick = (status, courseId, moduleId) => {
    if (status === "review") {
      navigate(`/course/${courseId}`);
    } else if (
      status === "start" ||
      status === "progress" ||
      status === "goTo"
    ) {
      if (status === "start") {
        if (userId) {
          changeCourseStatusForUser({ profileId: userId, courseId: courseId })
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          navigate("/");
        }
      }
      navigate(`/courseDetails/${courseId}/${moduleId}`);
    } else if (status === "enroll") {
      setSuccessPopUpOpen(true);
      purchaseCourses({ profileId: userId, courseId: courseId })
        .then((res) => {
          setRefresh(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return;
  };

  return (
    <div
      className={cx(styles.mainDiv, styles.flex, styles.gap16px, styles.br25)}
    >
      <img
        src={CardImage}
        className={cx(styles.imgDes, styles.br25)}
        alt="LMS"
      />
      <div
        className={cx(
          styles.content,
          styles.flex,
          styles.flexColumn,
          styles.gap16px
        )}
      >
        <label className={cx(styles.heading)}>{courseData?.name || "-"}</label>
        <p className={cx(styles.p, styles.fontWeight500, styles.color4B4B4B)}>
          {courseData?.shortDesc || "-"}
        </p>
        <div
          className={cx(
            styles.flex,
            styles.flexColumn,
            styles.gap16px,
            styles.contentBottom
          )}
        >
          <div
            className={cx(
              type === "enroll" || type === "review" || type === "purchased"
                ? styles.flex
                : styles.none,
              styles.spaceBetween,
              styles.rating
            )}
          >
            <div className={cx(styles.flex, styles.alignItems, styles.gap6px)}>
              {[...Array(5)].map((_, index) => (
                <img key={index} src={star} alt="LMS" />
              ))}
              <label
                className={cx(
                  styles.label,
                  styles.fontWeight500,
                  styles.color4B4B4B
                )}
              >
                {courseData?.reviews?.rating || "-"}
              </label>
              <label
                className={cx(
                  styles.label,
                  styles.fontWeight500,
                  styles.color4B4B4B
                )}
              >
                (120+)
              </label>
            </div>
            <div className={cx(styles.flex, styles.alignItems, styles.gap6px)}>
              <img src={ruppee} alt="LMS" />
              <label className={cx(styles.ruppe)}>
                {courseData?.currency?.amount}
              </label>
            </div>
          </div>
          <div
            className={cx(
              type !== "progress" ? styles.none : styles.flex,
              styles.alignFlexEnd,
              styles.flexColumn,
              styles.gap6px,
              styles.pointer
            )}
            onClick={() => {
              buttonClick(
                "progress",
                courseData?._id,
                courseData?.purchasedData?.userModule
              );
            }}
          >
            <div className={cx(styles.flex, styles.alignItems, styles.gap6px)}>
              <label className={cx(styles.label, styles.fontWeight500)}>
                {courseData?.purchasedData?.lessons?.completed}/
                {courseData?.lessons || "-"}
              </label>
              <label className={cx(styles.label, styles.fontWeight700)}>
                Lessons
              </label>
            </div>
            <div
              className={cx(
                styles.progressLine,
                styles.borderRadius50px,
                styles.line
              )}
            >
              <div
                style={{
                  width:
                    courseData?.purchasedData?.lessons?.completed &&
                    courseData?.purchasedData?.lessons?.total
                      ? `${
                          (courseData.purchasedData.lessons.completed /
                            courseData.purchasedData.lessons.total) *
                          100
                        }%`
                      : "0%",
                }}
                className={cx(
                  styles.filledProgress,
                  styles.borderRadius50px,
                  styles.line
                )}
              ></div>
            </div>
          </div>
          <div
            onClick={() => {
              buttonClick(
                type,
                courseData?._id,
                courseData?.purchasedData?.userModule
              );
            }}
            className={cx(
              styles.pointer,
              type === "enroll"
                ? styles.orangeButton
                : type === "goTo"
                ? styles.goToButton
                : type === "start"
                ? styles.orangeButton
                : type === "review"
                ? styles.reviewButton
                : type === "purchased"
                ? styles.purchasedButton
                : styles.none,
              styles.button,
              styles.flex,
              styles.justifyCenter
            )}
          >
            {type === "enroll"
              ? "Enroll Course"
              : type === "goTo"
              ? "Go to Course"
              : type === "start"
              ? "Start Course"
              : type === "review"
              ? "Under Review"
              : type === "purchased"
              ? "Already Purchased"
              : ""}
          </div>
          <div
            className={cx(
              styles.spaceBetween,
              type === "enroll" || type === "review" || type === "purchased"
                ? styles.flex
                : styles.none,
              styles.color4B4B4B,
              styles.fontWeight400,
              styles.label
            )}
          >
            <div className={cx(styles.flex, styles.alignItems, styles.gap6px)}>
              <img src={book} alt="LMS" />
              <label>{courseData?.lessons || "-"} lesson</label>
            </div>
            <div
              className={cx(
                styles.flex,
                styles.alignItems,
                styles.gap6px,
                styles.difficulty
              )}
            >
              <img src={chart} alt="LMS" />
              <label>{courseData?.difficulty || "-"}</label>
            </div>
            <div className={cx(styles.flex, styles.alignItems, styles.gap6px)}>
              <img src={clock} alt="LMS" />
              <label>
                {courseData?.duration?.duration || "-"}{" "}
                {courseData?.duration?.type || "-"}
              </label>
            </div>
          </div>
        </div>
      </div>
      {successPopupOpen && (
        <SuccessPopUp setSuccessPopUp={setSuccessPopUpOpen} />
      )}
    </div>
  );
}

export default UpperSection;
