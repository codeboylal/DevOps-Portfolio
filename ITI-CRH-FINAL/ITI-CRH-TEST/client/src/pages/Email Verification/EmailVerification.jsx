import React from "react";

import styles from "./EmailVerification.module.css";

import SignInUpAppBar from "../../components/Container/Sign In-Up/Common App Bar/SignInUpAppBar.jsx";
import VerifyOTP from "../../components/Container/Sign In-Up/Pop-ups/verifyOTP/verifyOTP";

function EmailVerification(){
    return(
        <div className={styles.mainDiv}>
            <div className={
                styles.appbar
            }>
                <SignInUpAppBar />
            </div>
            <VerifyOTP />
        </div>
    )
}

export default EmailVerification;