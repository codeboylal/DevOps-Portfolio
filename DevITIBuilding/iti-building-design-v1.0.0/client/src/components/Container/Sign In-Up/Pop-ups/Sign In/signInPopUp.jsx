import React, { useState } from "react";
import styles from "./SignInPopUp.module.css";
import CommonButton from "../../../../button/button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMediaQuery, TextField, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Toaster from '../../../../React Toaster/toaster'; // Import Toaster component
 
import BASEURL from "../../../../../const/const.js";
import LockUnverifiedPopUp from "../../../lock-Unverified pop up/lock-Unverified pop up.jsx";
 
const SignInPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); // State to store the toast message
  const [toastType, setToastType] = useState(""); // State to store the toast type
  const navigate = useNavigate();
 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
 
  const validate = () => {
    const newErrors = {};
 
    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }
 
    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
 
    setErrors(newErrors);
 
    return Object.keys(newErrors).length === 0;
  };
 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
 
  //   if (validate()) {
  //     try {
  //       const response = await fetch(`${BASEURL}/api/login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ email, password }),
  //       });
 
  //       const data = await response.json();
 
  //       if (response.ok) {
  //         setToastMessage("Login successful!"); // Set success message
  //         setToastType("success"); // Set toast type to success
  //         // setTimeout(() => {
  //           // console.log(data)
  //           localStorage.setItem("token",data.token)
  //           localStorage.setItem("id",data?.id)
  //           navigate('/'); // Navigate to the home page after 3 seconds
  //         // }, 2000);// Navigate to the home page after successful login
  //       } else {
  //         setToastMessage(data.message || "Login failed");
  //         setToastType("error"); // Set toast type to error
  //       }
  //     } catch (error) {
  //       setToastMessage("An error occurred while logging in");
  //       setToastType("error");
  //       console.error("Error:", error);
  //     }
  //   }
  // };
 
  const handleToast = (message, type) => {
    setToastMessage(""); // Reset message to trigger re-render
    setToastType("");
    setTimeout(() => {
      setToastMessage(message);
      setToastType(type);
    }, 1); // Short delay to reset state
  };
 
 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
 
  //   if (validate()) {
  //     console.log("Sending payload to backend:", { email, password }); // Debug payload
 
  //     try {
  //       const response = await fetch(`${BASEURL}/api/login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ email, password }),
  //       });
 
  //       const data = await response.json();
 
  //       if (response.ok) {
  //         handleToast("Login successful!", "success");
  //         localStorage.setItem("token", data.token);
  //         localStorage.setItem("id", data.id);
  //         navigate("/"); // Navigate to the home page
  //       } else {
  //         console.error("Error response:", data); // Log backend response
  //         handleToast(data.message || "Login failed", "error");
  //       }
  //     } catch (error) {
  //       console.error("Error while logging in:", error); // Debug fetch error
  //       handleToast("An error occurred while logging in", "error");
  //     }
  //   } else {
  //     if (errors.email) handleToast(errors.email, "error");
  //     if (errors.password) handleToast(errors.password, "error");
  //   }
  // };
 
 
 
  const [lockUnverified, setLockUnverified] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (validate()) {
      // console.log("Sending payload to backend:", { email, password });
 
      try {
        const response = await fetch(`${BASEURL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
 
        const data = await response.json();
 
        if (response.ok) {
          if(data?.accountStatus === "locked" || data?.accountStatus === "not verified" ){
            setLockUnverified(true)
            return;
          }
          // If the user is verified, show a green toaster message
          // console.log(data?.accountStatus)
          if (data.accountStatus === "mail not verified") {
            handleToast("Account not verified", "error"); // Green toaster for verified users
            return
          }
          if(data.accountStatus === "deleted"){
            handleToast("Account not Found", "error");
            return
          }
          if(data?.accountStatus === "locked" ){
            setLockUnverified(true)
            return;
          }
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id);
          // handleToast("Verified User", "success"); 
          // console.log(data)  
          if(data?.access?.[0]?.label && data?.access?.[0]?.value){
            return navigate('/')
          }else if(data?.access?.[1]?.label && data?.access?.[1]?.value){
            return navigate('/salespage')
          }else if(data?.access?.[3]?.label && data?.access?.[3]?.value){
            return navigate('/projects')
          }else if(data?.access?.[4]?.label && data?.access?.[4]?.value){
            return navigate('/constructor')
          }else{
            setLockUnverified(true)
            navigate("/signin"); // Navigate to the home page
            return
          }
        } else {
          // If user is not verified, show red toaster message
          if (data.message === "Not a verified user") {
            handleToast("No user found", "error"); // Red toaster for non-verified users
            // navigate('/verifyEmail')
          } else {
            console.error("Error response:", data); // Log backend response
            handleToast(data.message || "Login failed", "error");
          }
        }
      } catch (error) {
        console.error("Error while logging in:", error); // Debug fetch error
        handleToast("An error occurred while logging in", "error");
      }
    }
  };
 
 
 
  return (
    <div className={styles.overlay}>
      <div className={styles.popup} >
        {/* <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button> */}
        <h1 className={styles.title}>Sign In</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.passwordContainer}>
<TextField
  label="Email"
  inputMode="email" // Allows email-like input without browser validation
  value={email}
  onChange={(e) => setEmail(e.target.value.trim())}
  helperText={errors.email || " "}
  error={!!errors.email}
  fullWidth
  margin="normal"
  sx={{
    '& .MuiOutlinedInput-input:-webkit-autofill': {
      height: '15px',
      WebkitBoxShadow: '0 0 0 1000px rgb(234, 234, 234) inset',
    },
  }}
  FormHelperTextProps={{
    className: styles.errorText,
  }}
  InputProps={{
    style: { padding: 0 },
  }}
  style={{ margin: 0 }}
/>

          </div>
          <div className={styles.passwordContainer}>
            <TextField
              className={styles.textField}
 
              label="Password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              helperText={errors.password || " "}
              error={!!errors.password}
              fullWidth
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-input:-webkit-autofill': {
                  height: '15px',
                  WebkitBoxShadow: '0 0 0 1000px rgb(234, 234, 234) inset', 
                },
              }}
              FormHelperTextProps={{
                className: styles.errorText,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <a href="/forgotPass" className={styles.forgotPassword}>
            Forgot Password?
          </a>
          <div className={styles.buttonsContainer} style={{ width: "100%" }}>
            <div className={styles.buttonDiv} style={{ width: "100%" }}>
              {/* <CommonButton text={"Sign In"} type="submit" width={"100%"} styles{{fontWeight:bold}}/> */}
              {/* <CommonButton text="Sign In" type="submit" width="100%" fontWeight="bold" fontSize:"16px" /> */}
              <CommonButton text="Sign In" type="submit" width="100%" fontWeight="bold" fontSize="16px" />


            </div>
          </div>
          <div className={styles.signInNav}>
            <span className={styles.spanNav}>Not a member?</span>
            <label
              className={styles.labelNav}
              onClick={() => {
                navigate(`/signup`);
              }}
            >
              Sign Up
            </label>
          </div>
        </form>
      </div>
      {/* Display Toaster component */}
      <div className={styles.signInButton}>
        <Toaster message={toastMessage} type={toastType} />
      </div>
    {
      lockUnverified &&
      <LockUnverifiedPopUp setLockUnverified={setLockUnverified} lockPopUp={true} Module={""}/>
    }
 
    </div>
  );
};
 
export default SignInPopup;