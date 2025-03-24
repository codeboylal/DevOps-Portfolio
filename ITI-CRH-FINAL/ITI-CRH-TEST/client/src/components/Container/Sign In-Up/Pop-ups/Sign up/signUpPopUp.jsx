import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToaster } from "../../../../../Toaster.js";

import styles from "./signUpPopUp.module.css";
import cx from "classnames";

import CommonButton from "../../../../button/button";
import CommonInputField from "../../../../textField/input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { SignUpService } from "../../../../../services/Auth/Auth";
import { sendOTP } from "../../../../../services/mail/sendOTP.js";

import BuildingLoader from "../../../../loader/loader.jsx";

const emailSend = async (email, setToast, navigate, setLoading) => {
  if (email) {
    setLoading(true)
    await sendOTP({ email })
      .then((response) => {
        // console.log(response.data);
        if (response?.data?.status === 400) {
          setToast("Please Enter Email", "error");
        } else if (response?.data?.status === 200) {
          setToast(`OTP sent to ${email}`, "success");
          navigate(`/verifyEmail`);
        } else if (response?.data?.status === 201) {
          setToast(`User Already exists`, "error");
        } else if (response?.data?.status === 500) {
          setToast(`Please try again`, "error");
        } else if (response?.data?.status === 404) {
          setToast(`Account does not exist`, "error");
        } else {
          setToast(`Internal Server Error`, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        setToast("Internal Server Error", "error");
      });
      setLoading(false)
  }
};

function SignUpPopUp() {
  const navigate = useNavigate();
  const setToast = useToaster();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [formError, setFormError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    otpError: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifyOTPField, setVerifyOTPField] = useState(false);

  const [loading, setLoading] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validatePassword = (value) => {
    if (value === "") {
      return "Password is required.";
    } else if (!/[A-Z]/.test(value)) {
      return "Password must include at least one uppercase letter.";
    } else if (!/[a-z]/.test(value)) {
      return "Password must include at least one lowercase letter.";
    } else if (!/[0-9]/.test(value)) {
      return "Password must include at least one number.";
    } else if (!/[!@#$%^&*]/.test(value)) {
      return "Password must include at least one special character.";
    } else if (value.length < 8 || value.length > 20) {
      return "Password must be between 8 and 20 characters long.";
    } else {
      return false;
    }
  };

  const validateField = (field, value) => {
    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          return `${
            field === "firstName" ? "First Name" : "Last Name"
          } is required.`;
        } else if (value.trim().length > 15) {
          return `${
            field === "firstName" ? "First Name" : "Last Name"
          } must not exceed 15 characters.`;
        } else if (!/^[A-Za-z]+$/.test(value.trim())) {
          return `${
            field === "firstName" ? "First Name" : "Last Name"
          } must contain only alphabets.`;
        }
        break;

      case "email":
        if (!value.trim()) {
          return "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Invalid email format.";
        }
        break;

      case "password":
        return validatePassword(value);

      case "confirmPassword":
        if (!value) {
          return "Confirm Password is required.";
        } else if (value !== formData.password) {
          return "Passwords do not match.";
        }
        break;

      default:
        return "";
    }
    return "";
  };

  const handleInputChange = (field, e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [field]: value.trim(),
    });

    const errorMessage = validateField(field, value);
    setFormError({
      ...formError,
      [`${field}Error`]: errorMessage,
    });
  };

  const validateAllFields = () => {
    const errors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const errorMessage = validateField(field, formData[field]);
      if (errorMessage) {
        errors[`${field}Error`] = errorMessage;
        isValid = false;
      }
    });

    setFormError(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateAllFields()) {
      sessionStorage.setItem("formData", JSON.stringify(formData));
      SignUpService(formData)
        .then((response) => {
          if (response?.data?.status === 202) {
            setToast("User Already Exists", "error");
          } else if (
            response?.data?.status === 200 ||
            response?.data?.status === 400
          ) {
            emailSend(formData?.email, setToast, navigate, setLoading)
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

  const [maxWidthClass, setMaxWidthClass] = useState("");

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

    // Call once to set the initial state
    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    loading ? 
      <BuildingLoader loaderValue={true} marginTop={0}/>
    :
    <div className={styles.popUp}>
      <span className={styles.heading}>Sign Up</span>
      <div className={styles.inputDiv}>
        <div className={styles.nameDiv}>
          <CommonInputField
            label={"First Name"}
            error={!!formError.firstNameError}
            errorText={formError?.firstNameError}
            value={formData?.firstName}
            onChange={(e) => handleInputChange("firstName", e)}
            height="54px"
          />
          <CommonInputField
            label={"Last Name"}
            error={!!formError.lastNameError}
            errorText={formError?.lastNameError}
            value={formData?.lastName}
            onChange={(e) => handleInputChange("lastName", e)}
            height="54px"
          />
        </div>
        <div
          className={styles.mailOTP}
          style={{ display: verifyOTPField ? "none" : "flex" }}
        >
          <CommonInputField
            label={"Email"}
            error={!!formError.emailError}
            errorText={formError?.emailError}
            value={formData?.email}
            onChange={(e) => handleInputChange("email", e)}
            height="54px"
          />
        </div>
        <CommonInputField
          label={"Password"}
          value={formData.password}
          onChange={(e) => handleInputChange("password", e)}
          error={!!formError.passwordError}
          errorText={formError.passwordError}
          type={showPassword ? "text" : "password"}
          height="54px"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <CommonInputField
          label={"Confirm Password"}
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e)}
          error={!!formError.confirmPasswordError}
          errorText={formError.confirmPasswordError}
          type={showConfirmPassword ? "text" : "password"}
          height="54px"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles.buttonDiv}>
        <CommonButton
          width={maxWidthClass}
          text={"Sign Up"}
          onClick={handleSubmit}
          borderRadius={"100px"}
          fontWeight={"bold"}
        />
        <div className={styles.signInNav}>
          <span className={styles.spanNav}>Already a member?</span>
          <label
            className={styles.labelNav}
            onClick={() => {
              navigate(`/signin`);
            }}
          >
            Sign In
          </label>
        </div>
      </div>
    </div>
  );
}

export default SignUpPopUp;
