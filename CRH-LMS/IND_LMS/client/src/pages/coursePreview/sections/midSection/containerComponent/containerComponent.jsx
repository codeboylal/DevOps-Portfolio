import React from "react";

import styles from "./containerComponent.module.css";
import cx from "classnames";

function ContainerComponent({ heading = "", width = "", children }) {
  return (
    <div
      style={{ maxWidth: width }}
      className={cx(styles.mainDiv, styles.flex)}
      id={styles.fullWidth}
    >
      {/* <div className={cx(styles.heading, heading === "Modules" && styles.none)}> */}
      <div className={styles.heading}>{heading}</div>
      {/* <div className={cx(styles.modules, styles.flex, heading !== "Modules" && styles.none)}>
                {heading}
            </div> */}
      {children}
    </div>
  );
}

export default ContainerComponent;
