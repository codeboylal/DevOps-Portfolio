import React from "react";

import styles from "./mobile.module.css";

function Mobile(){
    return(
        <div className={styles.mobileDiv}>
            <div className={styles.popup}>
                <label className={styles.labelDes}>
                    Please Continue in your Desktop
                </label>
            </div>
        </div>
    )
}

export default Mobile;