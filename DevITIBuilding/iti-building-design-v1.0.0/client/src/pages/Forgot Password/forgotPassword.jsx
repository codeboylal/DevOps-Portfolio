import React from "react";

import styles from "./forgotPassword.module.css";


import SignInUpAppBar from "../../components/Container/Sign In-Up/Common App Bar/SignInUpAppBar";
import ForgotPassPopUp from "../../components/Container/forgot-Reset popup/forgotPassPopUp/forgotPassPopUp";

function ForgotPassword(){
    return(
        <div
            className={styles.mainDiv}
        >
            <div className={styles.appbar}>
                <SignInUpAppBar />
            </div>
            <div>
                <ForgotPassPopUp />
            </div>
        </div>
    )
}

export default ForgotPassword;