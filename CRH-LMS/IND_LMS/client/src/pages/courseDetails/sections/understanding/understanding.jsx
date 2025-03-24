import React from "react";

import styles from "./understanding.module.css";
import cx from "classnames";

function UnderStanding(){
    return(
        <div className={cx(styles.flex, styles.alignCenter, styles.mainDiv)}>
            <div className={styles.line}>

            </div>
            <div>
                Understanding the key components
            </div>
            <div className={styles.line}>
                
            </div>
        </div>
    )
}

export default UnderStanding;
