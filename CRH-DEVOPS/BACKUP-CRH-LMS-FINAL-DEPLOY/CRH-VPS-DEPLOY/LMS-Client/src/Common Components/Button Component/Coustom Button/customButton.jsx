// CustomButtons.jsx
import React from 'react';
import styles from './customButton.module.css';
import { useNavigate } from 'react-router-dom';

  
  const CustomButton = ({ placeholderText,buttonType, buttonText, customStyles,onClick, disabled}) => {

  const navigate = useNavigate();



  // const handleLogin = () => {
  //   // Navigate to a different route
  //   navigate('/login');
  // };


  // const handleSignup = () => {
  //   // Navigate to a different route
  //   navigate('/signup');
  // };

  return (
    <div>
      {buttonType === 'largePrimary' && (
        <button
          className={styles.loginButton}
          style={customStyles} // Allow users to pass custom styles
          // onClick={handleLogin}
          onClick={onClick}
        >
          {buttonText}
          
        </button>
      )}
      {buttonType === 'largeSecondary' && (
        <button
        // onClick={handleSignup} 

          className={styles.signUpButton}
          style={customStyles}
          onClick={onClick}
          // onClick={handleSignup}

        >
          {buttonText}
        </button>
      )}


      {buttonType === 'largeSecondaryTwo' && (
        <button
        // onClick={handleSignup}

          className={styles.secondaryTwo}
          style={customStyles}
          onClick={onClick}

        >
          {buttonText}
        </button>
      )}

{buttonType === 'smallPopupList' && (
  <button
    className={styles.smallPopupList}
    style={customStyles}
    onClick={onClick}
  >
    <span>{buttonText}</span>
    <span     className={styles.span} >X</span>
  </button>
)}



{buttonType === 'save' && (
        <button
        // onClick={handleSignup}

          className={styles.save}
          style={customStyles}
          onClick={onClick}
          disabled={disabled}

        >
          {buttonText}
        </button>
      )}


{buttonType === 'cancel' && (
        <button
        // onClick={handleSignup}

          className={styles.cancel}
          style={customStyles}
          onClick={onClick}

        >
          {buttonText}
        </button>
      )}


        {buttonType === 'startCourse' && (
        <button
          className={styles.startCourseButton}
          style={customStyles}
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
              {buttonType === 'goToCourse' && (
        <button
          className={styles.goToCourseButton}
          style={customStyles}
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
            {buttonType === 'EnrollCourse' && (
        <button
          className={styles.enrollCourseButton}
          style={customStyles}
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}




      





    </div>
  );
};

export default CustomButton;




// use it like this on any jsx file  :  

// <CustomButton buttonType="login" buttonText="Logoin" />



// u can add styling like this :
// <div>
// {/* Login button with default styles */}
{/* <CustomButton buttonType="login" buttonText="Login" />  */}

// {/* Sign-up button with user-defined styles */}
{/* <CustomButton
  buttonType="signup"
  buttonText="Sign up"
  customStyles={{
    color: 'black',
    backgroundColor: 'red',
    borderRadius: '10px',
    borderRadius:'0px'
  }}
/> */}
// </div>