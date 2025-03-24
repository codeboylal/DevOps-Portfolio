import React from "react";

import styles from "./signup.module.css";


import SignUpPopUp from "../../components/Container/Sign In-Up/Pop-ups/Sign up/signUpPopUp";


function SignUp(){
    return(
        <div className={styles.mainDiv}>
            <SignUpPopUp />
        </div>
    )
}

export default SignUp;