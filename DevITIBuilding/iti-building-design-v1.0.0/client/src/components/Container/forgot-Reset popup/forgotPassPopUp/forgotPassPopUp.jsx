import React, { useState, useEffect } from "react";
import { useToaster } from "../../../../Toaster.js";
import { useNavigate } from "react-router-dom";

import styles from "./forgotPassPopUp.module.css";
import cx from "classnames";

import CommonInputField from "../../../textField/input";
import CommonButton from "../../../button/button";
import { sendResetPassLink } from "../../../../services/mail/resetPass";
import BuildingLoader from "../../../loader/loader.jsx";

function ForgotPassPopUp() {
  const setToast = useToaster();
  const navigate = useNavigate();

  const [maxWidthClass, setMaxWidthClass] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 900) {
        setMaxWidthClass("380px");
      } else if (width > 500) {
        setMaxWidthClass("320px");
      } else {
        setMaxWidthClass("280px");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };



const [Client_URL, setClient_URL] = useState("");
 useEffect(()=>{
    setClient_URL(window.location.origin);
 },[])

  const handleButtonClick = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    // console.log("Valid email:", email);
    setLoading(true);
    // Add functionality to send the email here
    // console.log("Client_URL", Client_URL);
    await sendResetPassLink({ email, Client_URL})
      .then((response) => {
        console.log(response?.data);
        if (response?.data?.status === 400) {
          setToast("Email is required", "error");
        } else if (response?.data?.status === 404) {
          setToast("User not exists", "error");
        } else if (response?.data?.status === 200) {
          setToast("Reset Link sent", "success");
          navigate("/signin");
        } else {
          setToast("Please try again", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        setToast("Internal server error", "error");
      });
    setLoading(false);
  };

  if (loading) {
    return <BuildingLoader marginTop={""} />;
  }

  return (
    <div className={styles.mainDiv}>
      <span style={{ fontWeight: "700" }}>Forgot Password</span>
      <div className={styles.innerDiv}>
        <CommonInputField
          label={"Email"}
          error={!!emailError}
          errorText={emailError}
          value={email}
          onChange={handleInputChange}
          height="54px"
        />
        <CommonButton
          text={"Submit"}
          onClick={handleButtonClick}
          borderRadius={"100px"}
          height={"54px"}
          width={"100%"}
          fontWeight={"bold"}
        />
        <div className={styles.bottomDiv}>
          <span>Recall your password? Return to the</span>
          <a className={cx(styles.pointer, styles.label)} href="/signin">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassPopUp;
