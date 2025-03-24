// import React from 'react';
// import styles from './headerLandingPage.module.css';
// import lmsLogo from './lmsLogo.jpg';
// import CustomButton from '../Button Component/Coustom Button/customButton';
// import Theme from '../Font/theme';
// import { useNavigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';

// const HeaderLandingPage = () => {
//   const navigate = useNavigate();

//   const checkAuthAndNavigate = (path) => {
//     // Check if 'id' is in localStorage
//     const userId = localStorage.getItem('id');
//     if (!userId) {
//       // If 'id' is not found, redirect to login
//       navigate('/login');
//     } else {
//       // If 'id' is found, navigate to the specified path
//       navigate(path);
//     }
//   };

//   const handelCourses = () => {
//     checkAuthAndNavigate('/exploreCourses');
//   };

//   const handelHome = () => {
//     navigate('/');
//   };

//   const handelDashboard = () => {
//     checkAuthAndNavigate('/dashboard');
//   };

//   const handelContact = () => {
//     checkAuthAndNavigate('/Contact');
//   };

//   return (
//     <ThemeProvider theme={Theme}>
//       <div className={styles.navbar}>
//         <div className={styles.logo}>
//           <img src={lmsLogo} alt="LMS Logo" className={styles.logoImage} />
//         </div>
//         <ul className={styles.navLinks}>
//           <li className={styles.active} onClick={handelHome}><a>Home</a></li>
//           <li onClick={handelCourses}><a>Courses</a></li>
//           <li onClick={handelDashboard}><a>Dashboard</a></li>
//           <li onClick={handelContact}><a >Contact</a></li>
//         </ul>
//         <div className={styles.authButtons}>
//           <CustomButton buttonType="largePrimary" buttonText="Login" />
//           <CustomButton buttonType="largeSecondary" buttonText="Sign up" />
//         </div>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default HeaderLandingPage;















import React,{useState} from 'react';
import styles from './headerLandingPage.module.css';
import lmsLogo from './lmsLogo.jpg';
import CustomButton from '../Button Component/Coustom Button/customButton';
import Theme from '../Font/theme';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import LoginPopUP from '../../components/container/Login/Login';
import Signup from '../../components/container/Signup/Signup';


const HeaderLandingPage = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('token') && localStorage.getItem('id');

  const checkAuthAndNavigate = (path) => {
    // Check if 'id' is in localStorage
    const userId = localStorage.getItem('id');
    if (!userId) {
      // If 'id' is not found, redirect to login
      navigate('/login');
    } else {
      // If 'id' is found, navigate to the specified path
      navigate(path);
    }
  };

  const handelCourses = () => {
    checkAuthAndNavigate('/exploreCourses');
  };

  const handelHome = () => {
    navigate('/');
  };

  const handelDashboard = () => {
    checkAuthAndNavigate('/dashboard');
  };

  const handelContact = () => {
    checkAuthAndNavigate('/Contact');
  };



  
  const [isSignupVisible, setIsSignupVisible] = useState(false);

  const openSignup = () => setIsSignupVisible(true);
  const closeSignup = () => setIsSignupVisible(false);



  // const navigate = useNavigate()
  const [loginModel, setLoginModel] = useState(false)
  const [signUpModel, setSignUpModel] = useState(false);
  const dashboardLanding = () => {
    try {
      const localID = localStorage.getItem("id");
      if (!localID || localID === "" || localID === null) {
        setLoginModel(true)
        setIsSignupVisible(true)
        document.body.style.overflow = 'hidden';

      } else {
        // console.log(localID)


        // Clean up the overflow when the component is unmounted

        // navigate('/LoginPopUP')
        navigate("/")
      }
    } catch {
      setLoginModel(true)
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }


  const dashboardSignupLanding = () => {
    try {
      const localID = localStorage.getItem("id");
      if (!localID || localID === "" || localID === null) {
        setSignUpModel(true)
        // setIsSignupVisible(true)
        document.body.style.overflow = 'hidden';

      } else {
        // console.log(localID)


        // Clean up the overflow when the component is unmounted

        // navigate('/LoginPopUP')
        navigate("/")
      }
    } catch {
      setSignUpModel(true)
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }



  return (
    <ThemeProvider theme={Theme}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={lmsLogo} alt="LMS Logo" className={styles.logoImage} />
        </div>
        <ul className={styles.navLinks}>
          <li className={styles.active} onClick={handelHome}>
            <a>Home</a>
          </li>
          <li onClick={handelCourses}>
            <a>Courses</a>
          </li>
          <li onClick={handelDashboard}>
            <a>Dashboard</a>
          </li>
          <li onClick={handelContact}>
            <a>Contact</a>
          </li>
        </ul>
        {/* Conditionally render Login and Sign up buttons based on authentication */}
        {!isAuthenticated && (
          <div className={styles.authButtons}>
            <CustomButton buttonType="largePrimary" buttonText="Login" onClick={dashboardLanding}/>
            <CustomButton buttonType="largeSecondary" buttonText="Sign up"  onClick={dashboardSignupLanding}/>
          </div>
        )}
      </div>


      <LoginPopUP signUpModel={signUpModel} setSignUpModel={setSignUpModel} loginModel={loginModel} setLoginModel={setLoginModel} />
      <Signup  loginModel={loginModel} setLoginModel={setLoginModel}  setSignUpModel={setSignUpModel} signUpModel={signUpModel}/> 
      <div>
      <div className={isSignupVisible ? "dim-background" : ""}>
        {!isSignupVisible && <LoginPopUP openSignup={openSignup} />}
      </div>
      {isSignupVisible && <Signup closeSignup={closeSignup} />}
    </div>


    </ThemeProvider>
  );
};

export default HeaderLandingPage;




