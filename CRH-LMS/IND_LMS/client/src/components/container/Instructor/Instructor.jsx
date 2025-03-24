import React from "react";
import styles from "./Instructor.module.css";

import Base_URL from "../../../const/const";
import Ellipse from "../../../pages/dashboard/images/Ellipse.svg";

function InstructorComponent({ instructorsData }) {
  return (
    <div className={styles.instructorDiv}>
      {instructorsData?.length === 0 ? (
        <div>
          There are no courses Enrolled. Enroll a course to see instructor list.
        </div>
      ) : (
        <div>
          {instructorsData.map((item, index) => {
            return index < 4 ? (
              <div
                className={`${
                  index !== instructorsData.length - 1 ? "border-b" : ""
                } ${styles.instructorItem} flex flex-col gap-2`}
                key={index}
              >
                <div
                  className="p-2"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img
                    className={styles.imgDesInstructor}
                    src={Ellipse}
                    alt={``}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        color: "#4B4B4B",
                        fontWeight: "500",
                        fontSize: "18px",
                      }}
                    >
                      {item.name}
                    </label>
                    <label
                      style={{
                        color: "#7A7E86",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
                      {item.post}
                    </label>
                  </div>
                </div>
                <div />
              </div>
            ) : null;
          })}
          {/* <button className={styles.instructorSeeAll}>See All</button> */}
        </div>
      )}
    </div>
  );
}
export default InstructorComponent;
