import React from "react";

import styles from "./courseCard.module.css";
import cx from "classnames";

// Images
import img from "../../../assets/courseCard/img.png";
import star from "../../../assets/courseCard/star.svg";
import book from "../../../assets/courseCard/book.svg";
import clock from "../../../assets/courseCard/clock.svg";
import chart from "../../../assets/courseCard/chart.svg";
import ruppee from "../../../assets/courseCard/ruppee.svg";

function CoursesCard({
  data,
  type = "",
  buttonClick = () => console.log("button clicked"),
  // progressWidth = "0%",
  cardClick = () => console.log("card clicked"),
  hideRateStats = false,
}) {
  return (
    <div
      className={cx(
        styles.cardDiv,
        styles.flex,
        styles.flexColumn,
        styles.pointer,
        (type === "enroll" || type === "purchased" || type === "review") &&
          !hideRateStats &&
          styles.enrollMinHeight
      )}
      onClick={cardClick}
    >
      <div
        className={cx(
          styles.free,
          data?.tag !== "free" && styles.none,
          hideRateStats && styles.none
        )}
      >
        Free
      </div>
      <img className={styles.img} src={img} alt="LMS" />
      <div
        className={cx(
          styles.content,
          styles.flex,
          styles.flexColumn,
          styles.gap16px
        )}
      >
        <label className={cx(styles.pointer, styles.heading)}>
          {data?.name || "-"}
        </label>

        <div
          className={cx(
            styles.flex,
            styles.flexColumn,
            styles.gap16px,
            styles.contentBottom
          )}
        >
          <p className={cx(styles.p, styles.fontWeight500, styles.color4B4B4B)}>
            {data?.shortDesc || "-"}
          </p>
          <div
            className={cx(
              (type === "enroll" ||
                type === "review" ||
                type === "purchased") &&
                !hideRateStats
                ? styles.flex
                : styles.none,
              styles.spaceBetween
            )}
          >
            <div className={cx(styles.flex, styles.alignItems, styles.gap6px)}>
              {[...Array(5)].map((_, index) => (
                <img key={index} src={star} alt="LMS" />
              ))}
              <label
                className={cx(
                  styles.pointer,
                  styles.label,
                  styles.fontWeight500,
                  styles.color4B4B4B
                )}
              >
                5.0
              </label>
              <label
                className={cx(
                  styles.pointer,
                  styles.label,
                  styles.fontWeight500,
                  styles.color4B4B4B
                )}
              >
                (120+)
              </label>
            </div>
            <div
              className={cx(
                styles.flex,
                styles.alignItems,
                styles.gap6px,
                data?.tag === "free" && styles.cut
              )}
            >
              <img src={ruppee} alt="LMS" />
              <label className={cx(styles.pointer, styles.ruppe)}>
                {data?.currency?.amount || "-"}
              </label>
            </div>
          </div>
          <div
            className={cx(
              type !== "progress" ? styles.none : styles.flex,
              styles.alignFlexEnd,
              styles.flexColumn,
              styles.gap6px
            )}
            onClick={(e)=>{e.stopPropagation(); buttonClick()}}
          >
            <div className={cx(styles.flex, styles.alignItems, styles.gap6px)}>
              <label
                className={cx(
                  styles.pointer,
                  styles.label,
                  styles.fontWeight500
                )}
              >
                {data?.userlessons?.completed}/{data?.userlessons?.total}
              </label>
              <label
                className={cx(
                  styles.pointer,
                  styles.label,
                  styles.fontWeight700
                )}
              >
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
                style={{ width: data?.userlessons?.completed &&
                  data?.userlessons?.total
                    ? `${
                        (data?.userlessons?.completed /
                          data?.userlessons?.total) *
                        100
                      }%`
                    : "0%"}}
                className={cx(
                  styles.filledProgress,
                  styles.borderRadius50px,
                  styles.line
                )}
              ></div>
            </div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              buttonClick();
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
              (type === "enroll" ||
                type === "review" ||
                type === "purchased") &&
                !hideRateStats
                ? styles.flex
                : styles.none,
              styles.color4B4B4B,
              styles.fontWeight400,
              styles.label
            )}
          >
            <div className={cx(styles.flex, styles.alignItems, styles.gap6px)}>
              <img src={book} alt="LMS" />
              <label className={styles.pointer}>
                {data?.lessons || "-"} lesson
              </label>
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
              <label className={styles.pointer}>
                {data?.difficulty || "-"}
              </label>
            </div>
            <div className={cx(styles.flex, styles.alignItems, styles.gap6px)}>
              <img src={clock} alt="LMS" />
              <label className={styles.pointer}>
                {data?.duration?.duration || "-"} Weeks
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesCard;
