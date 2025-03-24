import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToaster } from "../../../../Toaster.js";

import styles from "./resetPassPopUp.module.css";
import cx from "classnames";

import CommonInputField from "../../../textField/input";
import CommonButton from "../../../button/button";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { resetPass } from "../../../../services/user/resetPassword";

import BuildingLoader from "../../../loader/loader.jsx";

function ResetPassPopUp() {
  const navigate = useNavigate();
  const setToast = useToaster()

  const [loading, setLoading] = useState(false)

  const [maxWidthClass, setMaxWidthClass] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validatePassword = (password) => {
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one digit.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    if (password.length < 8 || password.length > 20) {
      return "Password must be between 8 and 20 characters long.";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const error = validatePassword(newPassword);
    setPasswordError(error);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async () => {
    const passwordValidationError = validatePassword(password);

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");
    setConfirmPasswordError("");
    console.log("Password reset successfully");
    // Add password reset functionality here
    setLoading(true)
    await resetPass({ newPassword: password , email, token}).then(response => {
      console.log(response?.data)
      if (response?.data?.status === 400) {
        setToast(`${response?.data?.data}`, "error")
      } else if (response?.data?.status === 404) {
        setToast('User not found', "error")
      } else if (response?.data?.status === 200) {
        setToast('Password reset successfully', "success")
        navigate("/signin")
      } else {
        setToast("Please try again", "error")
      }
    }).catch(err => {
      console.log(err)
      setToast("Internal server error", "error")
    })
    setLoading(false)
  };

  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Get query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    const emailParam = urlParams.get('email');

    // Decode email if it's encoded
    const decodedEmail = emailParam ? decodeURIComponent(emailParam) : null;

    // Store values in state
    setToken(tokenParam);
    setEmail(decodedEmail);
  }, []);

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


  if (loading) {
    <BuildingLoader />
  }

  return (
    <div className={styles.mainDiv}>
      <span style={{ fontWeight: "700" }}>Reset Password</span>
      <div className={styles.innerDiv}>
        <CommonInputField
          label={"Password"}
          error={!!passwordError}
          errorText={passwordError}
          value={password}
          onChange={handlePasswordChange}
          height="54px"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ?  <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <CommonInputField
          label={"Confirm Password"}
          error={!!confirmPasswordError}
          errorText={confirmPasswordError}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          height="54px"
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ?  <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div style={{
          height:"2px"
        }}>

        </div>
        <CommonButton
          text={"Confirm"}
          onClick={handleSubmit}
          borderRadius={"100px"}
          height={"54px"}
          width={'100%'}
          fontWeight={"bold"}
        />
        <div className={styles.bottomDiv}>
          <span>Recall your password? Return to the </span>
          <a className={cx(styles.pointer, styles.label)} href="/signin">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassPopUp;
