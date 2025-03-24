import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./topBar.module.css";
import cx from "classnames";

function TopBar() {
  const navigate = useNavigate();
  return (
    <div
      className={cx(styles.flex, styles.alignCenter, styles.justifySpaceBetween)}
    >
      <div className={cx(styles.flex, styles.alignCenter, styles.gap6px)}>
        <label
          className={cx(
            styles.blackColor,
            styles.fontWeight500,
            styles.fontSize32px
          )}
        >
          Most Popular
        </label>{" "}
        <label
          className={cx(
            styles.orangeColor,
            styles.fontWeight700,
            styles.fontSize32px
          )}
        >
          Courses
        </label>
      </div>
      <label
        className={cx(
          styles.orangeColor,
          styles.fontWeight500,
          styles.fontSize24px,
          styles.pointer
        )}
        onClick={() => {
          navigate("/exploreCourses");
        }}
      >
        View all
      </label>
    </div>
  );
}

export default TopBar;
