import React from "react";

import styles from "./newPagination.module.css";
import cx from "classnames";

function NewPagination({
  activePg = 1,
  setactivePg,
  totalCourses = 1,
  coursesPerPg = 1,
}) {
  return (
    <div
      className={cx(
        styles.flex,
        styles.alignCenter,
        styles.justifyCenter,
        Math.ceil(totalCourses / coursesPerPg) < 1 && styles.none
      )}
    >
      <div
        onClick={() => {
          activePg !== 1 && setactivePg(activePg - 1);
        }}
        className={cx(
          styles.padding,
          styles.text,
          styles.normalStyle,
          activePg !== 1 && styles.borderColor,
          styles.pointer
        )}
      >
        Previous
      </div>
      {Array.from(
        { length: Math.ceil(totalCourses / coursesPerPg) },
        (_, index) => {
          return (
            <div
              onClick={() => {
                setactivePg(index + 1);
              }}
              key={index}
              className={cx(
                styles.padding,
                styles.text,
                styles.normalStyle,
                styles.pointer,
                activePg === index + 1 && styles.bgOrange
              )}
            >
              {index + 1}
            </div>
          );
        }
      )}
      <div
        onClick={() => {
          const totalPages = Math.ceil(totalCourses / coursesPerPg);
          if (activePg < totalPages) {
            setactivePg(activePg + 1);
          }
        }}
        className={cx(
          styles.padding,
          styles.text,
          styles.normalStyle,
          activePg < Math.ceil(totalCourses / coursesPerPg) &&
            styles.borderColor,
          styles.pointer
        )}
      >
        Next
      </div>
    </div>
  );
}

export default NewPagination;
