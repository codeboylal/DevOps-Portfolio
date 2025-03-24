import React, { useState } from "react";
import SignInPopup from "../../../components/Container/Sign In-Up/Pop-ups/Sign In/signInPopUp";
import SignInUpAppBar from "../../../components/Container/Sign In-Up/Common App Bar/SignInUpAppBar";
import styles from "./signIn.module.css";

const SignIn = () => {
  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const openPopup = () => setIsPopupOpen(true);
  // const closePopup = () => setIsPopupOpen(false);

  return (
    <div style={{backgroundColor:"#FFFFFF"}}>
    
          <SignInUpAppBar />
      <SignInPopup />
    </div>
  );
};

export default SignIn;
