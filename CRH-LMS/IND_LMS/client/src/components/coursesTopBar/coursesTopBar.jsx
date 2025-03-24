import React from "react";

import styles from "./coursesTopBar.module.css";
import cx from "classnames";

import filter from "./assets/filter.svg";

function CoursesTopBar({ totalCourses = 0, currentPage = 0 }) {
  return (
    <div className={cx(styles.flex, styles.gap24px, styles.alignFlexEnd)}>
      {/* <div className={cx(styles.flex, styles.alignCenter, styles.justifyCenter, styles.filter, styles.gap14px, styles.pointer)}>
                <label className={cx(styles.fontWeight500, styles.fontSize16px, styles.pointer)}>
                    Filter
                </label>
                <img src={filter} alt="LMS" />
            </div> */}
      <div className={cx(styles.flex, styles.alignFlexEnd, styles.gap5px)}>
        <label className={cx(styles.fontWeight500, styles.label)}>
          Showing
        </label>
        <label className={styles.result}>
          {Math.ceil(totalCourses/6) != currentPage ? currentPage === 1 && totalCourses : totalCourses - (6 * (currentPage - 1) )}
        </label>
        <label className={cx(styles.fontWeight500, styles.label)}>
          Courses
        </label>
        <label className={cx(styles.total, styles.fontWeight500)}>
          (Total {totalCourses})
        </label>
      </div>
    </div>
  );
}
export default CoursesTopBar;
