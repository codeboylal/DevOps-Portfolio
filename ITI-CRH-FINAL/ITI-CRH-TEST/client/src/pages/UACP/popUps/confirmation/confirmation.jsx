import React, { useState } from "react";
import { useToaster } from "../../../../Toaster.js";

import styles from "./confirmation.module.css";
import cx from "classnames";

import question from "./assets/question.svg";
import lock from "./assets/lock.svg";
import unlock from "./assets/unlock.svg";
import CommonButton from "../../../../components/button/button";

import {manageuser} from "../../../../services/user/manageUser.js";


function Conformation({

    popUp = "",
    setPopUp,
    email,
    setRefresh

}) {

    const setToast = useToaster()

    const [userId, setUserId] = useState(localStorage.getItem("id") || null)

    const handleCancelButton = () => {
        // console.log(`${popUp}`,"Pop up Cancel Button CLicked")
        
        setPopUp(false)
    }

    const handleSubmitClick = () => {
        // if (popUp === "delete") {
        //     console.log("Delete Pop up submit cliked")
        // } else if (popUp === "lock") {
        //     console.log("Lock Pop up submit cliked")
        // } else if (popUp === "unlock") {
        //     console.log("unlock Pop up submit cliked")
        // }
        manageuser({
            id: userId,
            action:popUp,
            email
        }).then(response=>{
            // console.log(response?.data)
            setToast(response?.data?.message,response?.data?.status === 200 ? "success" : "error")
            setRefresh(true)
        }).catch(err=>{
            console.log(err)
            setToast("Please try again","error")
        })
        setPopUp(false)
    }

    return (
        <div className={styles.outerDiv}>
            <div className={styles.mainDiv} style={{
                padding: popUp === "lock" && '32px 16px'
            }}>
                <div className={styles.justifyCenter}>
                    <img
                        src={
                            popUp === "delete" ? question :
                                popUp === "lock" ? lock :
                                    popUp === "unlock" ? unlock :
                                        null
                        }
                        alt="ITI Building Design"
                    />
                </div>
                <div className={cx(styles.justifyCenter, styles.content)}>
                    <span>

                        Are you sure you want to {
                            popUp === "delete" ? "delete" :
                                popUp === "lock" ? "lock" :
                                    popUp === "unlock" ? "unlock" :
                                        '___'
                        } this user?
                    </span>
                    <span>
                        {
                            popUp === "delete" ? "This action can not be undone." :
                                popUp === "lock" ? "A locked user will not be able to access any module until unlocked." :
                                    popUp === "unlock" ? "The user will regain access to all permitted modules." :
                                        ''
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

export default Conformation;