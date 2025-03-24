import React, { useState, useEffect } from "react";
import { useToaster } from "../../../../../Toaster.js";
import { useNavigate } from "react-router-dom";

import styles from "./verifyOTP.module.css";
import cx from "classnames";

import CommonButton from "../../../../button/button.jsx";
import CommonInputField from "../../../../textField/input.jsx";
import { SignUpService } from "../../../../../services/Auth/Auth.js";
import { sendOTP } from "../../../../../services/mail/sendOTP.js";

function VerifyOTP({}) {
  const setToast = useToaster();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [OTPValue, setOTPValue] = useState("");

  const [OTPError, setOTPError] = useState("");

  const emailSend = async (email) => {
    if (email) {
      let fail = false;
      await sendOTP({ email })
        .then((response) => {
          // console.log(response.data);
          if (response?.data?.status === 400) {
            setToast("Please Enter Email", "error");
            fail = true;
          } else if (response?.data?.status === 200) {
            setToast(`OTP sent to ${email}`, "success");
          } else if (response?.data?.status === 201) {
            fail = true;
            setToast(`User Already exists`, "error");
          } else if (response?.data?.status === 500) {
            fail = true;
            setToast(`Please try again`, "error");
          } else if (response?.data?.status === 404) {
            fail = true;
            setToast(`Account does not exist`, "error");
          } else {
            fail = true;
            setToast(`Internal Server Error`, "error");
          }
        })
        .catch((err) => {
          console.log(err);
          setToast("Internal Server Error", "error");
        });

      if (fail) {
        navigate('/signup');
      }
    }
  };

  
  const [formData, setFormData] = useState(JSON.parse(sessionStorage.getItem("formData")) || null)


  useEffect(() => {
    async function func(email) {
        setEmail(email);
        // await emailSend(email);
    }
      
      // let formData = sessionStorage.getItem("formData");
      // formData = JSON.parse(formData);
      if (formData?.email) {
        func(formData?.email);
      } else {
        navigate("/signup");
      }
  }, [formData]);

  const handleInputChange = (e) => {
    const value = e?.target?.value;

    

    // Validate input
    if (!/^\d*$/.test(value)) {
      setOTPError("OTP must contain digits only.");
    } else if (value.length > 6) {
      setOTPError("OTP cannot exceed 6 digits.");
    } else {
      // Update OTP value
      setOTPValue(value);
      setOTPError(""); // Clear any error message
    }
  };

  const verifyHandle = () => {
    if (OTPValue.length !== 6) {
      setOTPError("OTP must be exactly 6 digits long.");
    } else if (!/^\d{6}$/.test(OTPValue)) {
      setOTPError("OTP must contain digits only.");
    } else {
      setOTPError("");
      let formData = JSON.parse(sessionStorage.getItem("formData"));
      formData.otp = OTPValue;
      SignUpService(formData)
        .then((response) => {
          if (response?.data?.status === 201) {
            setToast("Registration Successful", "success");
            sessionStorage.removeItem("formData");
            navigate("/signin");
          } else if (response?.data?.status === 202) {
            setToast("User Already Exists", "error");
          } else if (response?.data?.status === 203) {
            setToast("OTP is expired", "error");
          } else if (response?.data?.status === 400) {
            setToast("Invalid OTP", "error");
          } else {
            setToast("Please try again", "error");
          }
        })
        .catch((err) => {
          console.error(err);
          setToast("Internal Server Error", "error");
        });
    }
  };

  return (
    <div className={styles.mainDiv}>
      <h2>Verify your E-mail</h2>
      <div className={styles.content}>
        <div className={styles.emailParentDiv}>
          <div className={styles.emailDiv}>
            <span className={styles.labelDes}>Please check your email</span>
            <span className={styles.emailDes}>({email})</span>
          </div>
          <span className={styles.labelDes}>
            for a 6-digit verification code
          </span>
        </div>
        {/* <span className={styles.labelDes}>
                    Enter OTP
                </span> */}
        <CommonInputField
          label={"Enter OTP"}
          error={!!OTPError}
          errorText={OTPError}
          value={OTPValue}
          onChange={(e) => handleInputChange(e)}
          height="54px"
        />
        <div className={styles.codeDiv}>
          <span className={styles.labelDes}>Didn't get the code ?</span>
          <span
            className={cx(styles.emailDes, styles.pointer)}
            onClick={() => {
              emailSend(email);
            }}
          >
            Re-send
          </span>
        </div>
        <div style={{
          height:'12px'
        }}>

        </div>
        <div className={styles.buttonDiv}>
          <CommonButton text={"Verify"} onClick={verifyHandle} width={"100%"} fontWeight={"bold"} borderRadius={"100px"}/>
          <div className={styles.emailDiv}>
            <span className={styles.labelDes}>
              Need to change your email? Return to
            </span>
            <a href="/signup" className={cx(styles.emailDes, styles.pointer)} style={{
              fontWeight: 'bold'
            }}>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
