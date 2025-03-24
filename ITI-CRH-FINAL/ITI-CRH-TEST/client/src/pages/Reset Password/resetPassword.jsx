import React from "react";

import styles from "./resetPassword.module.css";


import SignInUpAppBar from "../../components/Container/Sign In-Up/Common App Bar/SignInUpAppBar";
import ResetPassPopUp from "../../components/Container/forgot-Reset popup/resetPassPopUp/resetPassPopUp";

function ResetPassword(){
    return(
        <div
            className={styles.mainDiv}
        >
            <div className={styles.appbar}>
                <SignInUpAppBar />
            </div>
            <div>
                <ResetPassPopUp />
            </div>
        </div>
    )
}

export default ResetPassword;