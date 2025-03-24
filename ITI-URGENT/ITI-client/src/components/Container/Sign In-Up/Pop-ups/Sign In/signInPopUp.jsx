// import React, { useState } from "react";
// import styles from "./SignInPopUp.module.css";
// import CommonButton from "../../../../button/button";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { TextField, Button } from "@mui/material";


// const SignInPopup = ({ onClose }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const validate = () => {
//     const newErrors = {};

//     // Email validation
//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = "Invalid email address";
//     }

//     // Password validation
//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validate()) {
//       // Perform sign-in logic here
//       console.log("Sign-in successful", { email, password });
//     }
//   };

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.popup}>
//         <button className={styles.closeButton} onClick={onClose}>
//           &times;
//         </button>
//         <h1 className={styles.title}>Sign In</h1>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             error={!!errors.email}
//             helperText={errors.email}
//             fullWidth
//             margin="normal"
//           />
 
//           <a href="#" className={styles.forgotPassword}>
//             Forgot Password?
//           </a>
//           <div className={styles.buttonsContainer}>
//             <div className={styles.buttonDiv}>
//               <CommonButton text={"Sign In"} type="submit" />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInPopup;











// import React, { useState } from "react";
// import styles from "./SignInPopUp.module.css";
// import CommonButton from "../../../../button/button";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { TextField, InputAdornment, IconButton } from "@mui/material";
// import { useNavigate } from 'react-router-dom';
// import Toaster from '../../../../React Toaster/toaster'; // Import Toaster component

// import BaseURL from "../../../../../const/const.js";
 
// const SignInPopup = ({ onClose }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [toastMessage, setToastMessage] = useState(""); // State to store the toast message
//   const [toastType, setToastType] = useState(""); // State to store the toast type
//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const validate = () => {
//     const newErrors = {};

//     // Email validation
//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = "Invalid email address";
//     }

//     // Password validation
//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validate()) {
//       try {
//         const response = await fetch(`${BaseURL}/api/login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setToastMessage("Login successful!"); // Set success message
//           setToastType("success"); // Set toast type to success
//           // setTimeout(() => {
//             // console.log(data)
//             localStorage.setItem("token","nkjfwe")

//             localStorage.setItem("id",data?.id)
//             navigate('/'); // Navigate to the home page after 3 seconds
//           // }, 2000);// Navigate to the home page after successful login
//         } else {
//           setToastMessage(data.message || "Login failed");
//           setToastType("error"); // Set toast type to error
//         }
//       } catch (error) {
//         setToastMessage("An error occurred while logging in");
//         setToastType("error");
//         console.error("Error:", error);
//       }
//     }
//   };

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.popup}>
//         {/* <button className={styles.closeButton} onClick={onClose}>
//           &times;
//         </button> */}
//         <h1 className={styles.title}>Sign In</h1>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             helperText={errors.email || " "}
//             error={!!errors.email}
//             fullWidth
//             margin="normal"
//             FormHelperTextProps={{
//               className: styles.errorText,
//             }}
//             sx={{
//               '& .MuiOutlinedInput-input:-webkit-autofill': {
//                 height: '1.4375em', // Matches the default input height
//                 WebkitBoxShadow: '0 0 0 1000px rgb(236, 236, 236) inset', // Autofill background color
//                 WebkitTextFillColor: '#000', // Ensures visible text color
//               },
//             }}
//             InputProps={{
//               style: {
//                 padding: 0,
//               },
//             }}
//             style={{
//               margin: 0,
//             }}
//           />
//           <div className={styles.passwordContainer}>
//             <TextField
//               label="Password"
//               type={passwordVisible ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               helperText={errors.password || " "}
//               error={!!errors.password}
//               fullWidth
//               margin="normal"
//               FormHelperTextProps={{
//                 className: styles.errorText,
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-input:-webkit-autofill': {
//                   height: '1.4375em', // Matches the default input height
//                   WebkitBoxShadow: '0 0 0 1000px rgb(236, 236, 236) inset', // Autofill background color
//                   WebkitTextFillColor: '#000', // Ensures visible text color
//                 },
//               }}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={togglePasswordVisibility}
//                       edge="end"
//                       aria-label="toggle password visibility"
//                     >
                      
//                       {passwordVisible ? <Visibility /> : <VisibilityOff />}
//                     </IconButton> 
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </div>
//           <a href="/#" className={styles.forgotPassword}>
//             Forgot Password?
//           </a>
//           <div className={styles.buttonsContainer}>
//             <div className={styles.buttonDiv}>
//               <CommonButton text={"Sign In"} type="submit" />
//             </div>
//           </div>
//         </form>
//       </div>
//       {/* Display Toaster component */}
//       <Toaster message={toastMessage} type={toastType} />
//     </div>
//   );
// };

// export default SignInPopup;














import React, { useState } from "react";
import styles from "./SignInPopUp.module.css";
import CommonButton from "../../../../button/button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {useMediaQuery, TextField, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Toaster from '../../../../React Toaster/toaster'; // Import Toaster component

import BASEURL from "../../../../../const/const.js";
 
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validate()) {
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
          handleToast("Login successful!", "success");
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data?.id);
          navigate('/'); // Navigate to the home page
        } else {
          handleToast(data.message || "Login failed", "error");
        }
      } catch (error) {
        handleToast("An error occurred while logging in", "error");
        console.error("Error:", error);
      }
    } else {
      // Show validation error toast if needed
      if (errors.email) handleToast(errors.email, "error");
      if (errors.password) handleToast(errors.password, "error");
    }
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button> */}
        <h1 className={styles.title}>Sign In</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.passwordContainer}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={errors.email || " "}
            error={!!errors.email}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-input:-webkit-autofill': {
                height: '15px',
                WebkitBoxShadow: '0 0 0 1000px rgb(234, 234, 234) inset', // Autofill background color
              },
            }}
            FormHelperTextProps={{
              className: styles.errorText,
            }}
            InputProps={{
              style: {
                padding: 0,
              },
            }}
            style={{
              margin: 0,
            }}
          />
          </div>
          <div className={styles.passwordContainer}>
            <TextField
              className={styles.textField}

              label="Password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={errors.password || " "}
              error={!!errors.password}
              fullWidth
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-input:-webkit-autofill': {
                  height: '15px',
                  WebkitBoxShadow: '0 0 0 1000px rgb(234, 234, 234) inset', // Autofill background color
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
          <a href="/#" className={styles.forgotPassword}>
            Forgot Password?
          </a>
          <div className={styles.buttonsContainer}>
            <div className={styles.buttonDiv}>
              <CommonButton text={"Sign In"} type="submit" />
            </div>
          </div>
        </form>
      </div>
      {/* Display Toaster component */}
      <div className={styles.signInButton}>
      <Toaster message={toastMessage} type={toastType}  />
      </div>
    </div>
  );
};

export default SignInPopup;