import React from "react";

import styles from "./completionPercentage.module.css";
import cx from "classnames";

function CompletionPercentage({ data = {} }) {
  return (
    <div className={cx(styles.flex, styles.flexColumn, styles.gap12px)}>
      <div className={cx(styles.flex, styles.alignCenter, styles.spaceBetween)}>
        <label className={styles.label}>Completion</label>
        <label className={styles.label}>
          {(data?.completed / data?.total) * 100}%
        </label>
      </div>
      <div
        className={cx(
          styles.progressDiv,
          styles.br10px,
          styles.progressProperty
        )}
      >
        <div
          className={cx(
            styles.progress,
            styles.br10px,
            styles.progressProperty
          )}
          style={{ width: data?.completed ? `${(data?.completed / data?.total) * 100}%` : "0%" }}
        ></div>
      </div>
    </div>
  );
}

export default CompletionPercentage;
