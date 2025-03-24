import React from "react";
import styles from "./Error.module.css";

const ErrorComponent = ({error = "error"}) =>{
    return(
        <div className={styles.errorDiv} style={{display:error.length > 0 ? 'block' : 'none'}}>
            <label className={styles.labelDes}>
                {error}
            </label>
        </div>
    )
}

export default ErrorComponent;