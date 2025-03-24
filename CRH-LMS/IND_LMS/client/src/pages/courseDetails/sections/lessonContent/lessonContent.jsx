import React, { useState } from "react";

import styles from "./lessonContent.module.css";
import cx from "classnames";

import book from "../../../../assets/courseDetails/Reading.svg";
import arrow from "../../../../assets/courseDetails/collapse.svg";

function LessonContent({data = {}}) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentActive, setContentActive] = useState(1);
  return (
    <div
      className={cx(
        styles.mainDiv,
        styles.flex,
        styles.flexColumn,
        !isOpen ? styles.gap10px : styles.gap24px
      )}
    >
      <div className={cx(styles.flex, styles.gap10px, styles.alignCenter)}>
        <label
          className={cx(styles.closeHeading, isOpen && styles.openHeading)}
        >
          {data?.subTitle || "-"}
        </label>
        <img
          className={cx(
            styles.pointer,
            isOpen ? styles.close : styles.open,
            styles.rotate
          )}
          src={arrow}
          alt="LMS"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </div>
      <div className={cx(!isOpen && styles.none)}>
        {/* Course Video */}
        <iframe
          src={"https://drive.google.com/file/d/1OC2HR70iKKDcb8O94ernmRk_djNUjnzj/preview"}
          width="100%"
          height="400"
          allow="autoplay"
          frameBorder="0"
          sandbox="allow-same-origin allow-scripts"
          allowFullScreen
          title={`Title`}
        ></iframe>
      </div>
      <div
        className={cx(
          !isOpen && styles.none,
          styles.contentHeading,
          styles.flex,
          styles.alignCenter,
          styles.pointer
        )}
      >
        <div
          className={cx(
            styles.singleHeading,
            styles.flex,
            styles.alignCenter,
            styles.justifyCenter,
            contentActive === 1 && styles.headingActive
          )}
          onClick={() => setContentActive(1)}
        >
          Transcript
        </div>
        <div
          className={cx(
            styles.singleHeading,
            styles.flex,
            styles.alignCenter,
            styles.justifyCenter,
            contentActive === 2 && styles.headingActive
          )}
          onClick={() => setContentActive(2)}
        >
          Notes
        </div>
        <div
          className={cx(
            styles.singleHeading,
            styles.flex,
            styles.alignCenter,
            styles.justifyCenter,
            contentActive === 3 && styles.headingActive
          )}
          onClick={() => setContentActive(3)}
        >
          Summary
        </div>
      </div>
      <div className={cx(!isOpen && styles.none, styles.line)}></div>
      <div className={cx(!isOpen && styles.none)}>
        {contentActive === 1
          ? data?.transcript || "-"
          : contentActive === 2
          ? data?.notes || "-"
          : contentActive === 3
          ? data?.summary || "-"
          : ""}
      </div>
      <div
        className={cx(
          isOpen && styles.none,
          styles.flex,
          styles.alignCenter,
          styles.gap10px
        )}
      >
        <div
          className={cx(
            styles.labelDiv,
            styles.flex,
            styles.gap10px,
            styles.alignCenter
          )}
        >
          <img src={book} alt="LMS" />
          <label>Reading</label>
        </div>
        <div className={styles.labelDiv}>
          <label>{data?.timeRequired?.duration || "-"} {data?.timeRequired?.type || "-"}</label>
        </div>
      </div>
    </div>
  );
}

export default LessonContent;
