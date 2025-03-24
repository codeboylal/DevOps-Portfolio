import React from "react";

import styles from "./popup.module.css";
import cx from "classnames";

import question from "../imgs/question.svg";

import CommonButton from "../../../components/button/button.jsx";

function PopUp({
    setPopUp,
    handleCompleteStatus
}){

    const handleCancelButton = () =>{
        setPopUp(false)
    }

    const handleSubmitClick = () =>{
        console.log("Submit button clicked")
        handleCompleteStatus()
    }

    return(
        <div className={styles.outerDiv}>
            <div className={styles.mainDiv}>
                <div className={styles.justifyCenter}>
                    <img
                        src={
                            question
                        }
                        alt="ITI Building Design"
                    />
                </div>
                <div className={cx(styles.justifyCenter, styles.content)}>
                    <span>

                        Are you sure you want to mark this task as complete?
                    </span>
                    <span>
                        {
                            "Once completed, it will be removed from the list."
                        }
                    </span>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={cx(styles.cancelButton, styles.pointer)} onClick={handleCancelButton}>
                        Cancel
                    </button>
                    <CommonButton
                        onClick={handleSubmitClick}
                        text={"Confirm"}
                        height={"37px"}
                        width={"76px"}
                        divWidth={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default PopUp;