import React from "react";

import styles from "./signup.module.css";

import SignInUpAppBar from "../../components/Container/Sign In-Up/Common App Bar/SignInUpAppBar.jsx";
import SignUpPopUp from "../../components/Container/Sign In-Up/Pop-ups/Sign up/signUpPopUp";


function SignUp(){
    return(
        <div className={styles.mainDiv}>
            <div className={
                styles.appbar
            }>
                <SignInUpAppBar />
            </div>
            <SignUpPopUp />
        </div>
    )
}

export default SignUp;