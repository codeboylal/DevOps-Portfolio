import React from "react";

import styles from "./permissions.module.css";

function Permission({
    text=''
    }){
    return(
        text && 
            <div className={styles.mainDiv}>
                {text}
            </div>
    )
}

export default Permission;