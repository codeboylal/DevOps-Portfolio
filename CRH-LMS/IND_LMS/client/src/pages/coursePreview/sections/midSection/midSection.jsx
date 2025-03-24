import React from "react";
import { useNavigate } from "react-router-dom";


import styles from "./midSection.module.css";
import cx from "classnames";

import tick from "./assets/greenTick.svg";
import default_profile from "./assets/default_profile.png";
import coursePic from "../../../../assets/courseCard/img.png";
import redirect from "./assets/redirect.svg";

import ContainerComponent from "./containerComponent/containerComponent";

function MidSection({ courseData = {} }) {
  const navigate = useNavigate();
  return (
    <div className={cx(styles.flex, styles.gap24px, styles.mainDiv)}>
      <div
        className={cx(
          styles.flex,
          styles.alignCenter,
          styles.gap24px,
          styles.flexColumn,
          styles.width48,
          styles.leftDiv
        )}
      >
        <ContainerComponent heading={"About the Course"} width={"48.8125rem"}>
          <p className={cx(styles.container1p, styles.childrenPadding)}>
            {courseData?.description || "-"}
          </p>
        </ContainerComponent>
        <ContainerComponent heading={"What You'll Learn"} width={"48.8125rem"}>
          <div className={styles.childrenPadding}>
            {Array.isArray(courseData?.learningOutcome) &&
              courseData?.learningOutcome.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={cx(
                      styles.flex,
                      styles.gap14px,
                      styles.alignCenter,
                      index !== 0 && styles.paddingTopList
                    )}
                  >
                    <img src={tick} alt="LMS" />
                    <label
                      className={cx(styles.container1p, styles.learnLabels)}
                    >
                      {item?.value}
                    </label>
                  </div>
                );
              })}
          </div>
        </ContainerComponent>
      </div>
      <div
        className={cx(
          styles.flex,
          styles.alignCenter,
          styles.gap24px,
          styles.flexColumn,
          styles.width23,
          styles.rightDiv
        )}
      >
        <ContainerComponent heading={"Instructors"} width={"23.625rem"}>
          <div className={styles.childrenPadding}>
            {Array.isArray(courseData?.instructors) &&
              courseData?.instructors.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={cx(
                      styles.flex,
                      styles.gap12px,
                      styles.alignCenter,
                      index !== courseData?.instructors?.length - 1 &&
                        styles.instructor,
                      index === 1 && styles.paddingTop
                    )}
                  >
                    <img
                      src={default_profile}
                      alt="LMS"
                      className={styles.imgDes}
                    />
                    <div
                      className={cx(
                        styles.flex,
                        styles.flexColumn,
                        styles.gap12px
                      )}
                    >
                      <label
                        className={cx(styles.fw500, styles.instructorName)}
                      >
                        {item?.name || "-"}
                      </label>
                      <label
                        className={cx(styles.fw500, styles.instructorPost)}
                      >
                        {item?.post || "-"}
                      </label>
                    </div>
                  </div>
                );
              })}
          </div>
        </ContainerComponent>
        <ContainerComponent heading={"Modules"} width={"23.625rem"}>
          {courseData?.courseData &&
            Array.from(
              { length: Object.entries(courseData?.courseData).length },
              (_, index) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/courseDetails/${courseData?._id}/${index + 1}`);
                    }}
                    key={index}
                    className={cx(
                      styles.flex,
                      styles.gap12px,
                      styles.alignCenter,
                      index !==
                        Object.entries(courseData?.courseData).length - 1 &&
                        styles.instructor,
                      index ===
                        Object.entries(courseData?.courseData).length - 1 &&
                        styles.moduleBorderRadius,
                      styles.module,
                      styles.pointer
                    )}
                  >
                    <img
                      src={coursePic}
                      alt="LMS"
                      className={cx(styles.imgDes, styles.courseImg)}
                    />
                    <div
                      className={cx(
                        styles.flex,
                        styles.flexColumn,
                        styles.moduleData
                      )}
                    >
                      <div
                        className={cx(
                          styles.flex,
                          styles.alignCenter,
                          styles.spaceBetween
                        )}
                      >
                        <label
                          className={cx(
                            styles.fw500,
                            styles.moduleName,
                            styles.pointer
                          )}
                        >
                          {courseData?.courseData?.[`Module${index + 1}`]
                            ?.name || "-"}
                        </label>
                        <img
                          src={redirect}
                          alt="LMS"
                          className={cx(
                            styles.redirectShow,
                            styles.redirectNone
                          )}
                        />
                      </div>
                      <label
                        className={cx(
                          styles.fw500,
                          styles.moduleCount,
                          styles.pointer
                        )}
                      >
                        Module {index + 1}
                      </label>
                      <label
                        className={cx(
                          styles.fw500,
                          styles.moduleDuration,
                          styles.pointer
                        )}
                      >
                        {courseData?.courseData?.[`Module${index + 1}`]
                          ?.timeRequired?.duration || "-"}
                        {
                          courseData?.courseData?.[`Module${index + 1}`]
                            ?.timeRequired?.type
                        }
                      </label>
                    </div>
                  </div>
                );
              }
            )}
        </ContainerComponent>
      </div>
    </div>
  );
}

export default MidSection;
