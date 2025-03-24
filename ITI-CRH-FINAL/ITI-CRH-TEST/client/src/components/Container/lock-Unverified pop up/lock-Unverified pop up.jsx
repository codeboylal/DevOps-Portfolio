import React from "react";

import styles from "./lockUnverifiedpopup.module.css";
import cx from "classnames";

// assets
import lock from "../../../pages/UACP/popUps/confirmation/assets/lock.svg"

function LockUnverifiedPopUp({setLockUnverified, pos ='', lockPopUp=true, Module = ""}){
    const handleClose = () =>{
        setLockUnverified(false)
    }
    return(
        <div className={styles.mainDiv}
            style={{
                position: pos === "absolute" && "absolute",
                // top: pos === "absolute" && "0",
                // left: pos === "absolute" && "0",
            }}
        >
            <div className={styles.content}>
                <img
                    src={lock}
                    alt="ITI Buildings Design"
                    className={styles.imgDes}
                />
                <div className={styles.Content_Child}>
                    <span>
                        {lockPopUp ? "Your account has been locked." : `You do not have access${Module ? ` to the ${Module}.` : "."}`} 
                    </span>
                    <span>
                        {lockPopUp ? "Please contact support for assistance." : "Please contact ITI Building Design to request access."} 
                    </span>
                </div>
                <div className={styles.Content_Child}>
                    <span>
                        (03) 9933 4677 
                    </span>
                    <span>
                        admin@itibuildingdesign.com.au
                    </span>
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.button} onClick={handleClose}>
                        Cancel
                    </div>
                    {/* <div className={cx(styles.button, styles.confirm)} onClick={handleClose}>
                        Confirm
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default LockUnverifiedPopUp;