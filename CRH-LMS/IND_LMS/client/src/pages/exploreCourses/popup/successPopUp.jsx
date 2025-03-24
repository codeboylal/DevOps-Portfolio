import React from "react";

import styles from "./successPopUp.module.css";
import cx from "classnames";

import tick from "./assets/success.svg";

function SuccessPopUp({setSuccessPopUp}) {
  return (
    <div className={cx(styles.popupDiv, styles.flex, styles.alignCenter, styles.justifyCenter)}>
      <div
        className={cx(
          styles.mainDiv,
          styles.font,
          styles.flex,
          styles.flexColumn,
          styles.alignCenter,
          styles.gap12px
        )}
      >
        <img src={tick} alt="LMS" className={styles.imgDes} />
        <div
          className={cx(
            styles.flex,
            styles.flexColumn,
            styles.alignCenter,
            styles.gap12px,
            styles.maxWidth70
          )}
        >
          <label className={styles.font}>
            Your request has been sent to admin, we'll reach you shortly.
          </label>
          <label className={cx(styles.font, styles.success)}>Success</label>
        </div>
        <div className={cx(styles.flex, styles.alignEnd)}>
          <div className={cx(styles.button, styles.pointer)} onClick={()=>{setSuccessPopUp(false)}}>Close</div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPopUp;
