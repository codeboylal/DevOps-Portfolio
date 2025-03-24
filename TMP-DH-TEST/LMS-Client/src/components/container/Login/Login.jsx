import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, IconButton, Link, Divider } from '@mui/material';
import { Google, Visibility, VisibilityOff, Close } from '@mui/icons-material';
import axios from 'axios'; // Import Axios
import img from './new.png'; // Update this path if needed
import { useNavigate } from 'react-router-dom';
import styles from '../Login/Login.model.css';
import { ReactComponent as GoogleIcon } from './Google Icon.svg'; // Update the path
import { useToaster } from '../../../Toaster';
import Signup from '../Signup/Signup';
import Base_URL from '../../../const/const';
import { useTheme } from '@mui/material/styles';

import Theme from '../../../Common Components/Font/theme';
const LoginPopUP = ({ signUpModel, setSignUpModel, loginModel, setLoginModel, openSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For general error handling
  const [emailError, setEmailError] = useState(''); // Error state for email field
  const [passwordError, setPasswordError] = useState(''); // Error state for password field
  const [serverError, setServerError] = useState(''); // Error from server-side response
  const navigate = useNavigate();
  const showToaster = useToaster();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format pattern
    return emailPattern.test(email);
  };
  const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Reset errors before validation
    setEmailError('');
    setPasswordError('');
    setError('');
    setServerError('');

    let valid = true;

    // Email field validation
    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    }

    // Password field validation
    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    }
    //  else if (password.length < 6) {
    //   setPasswordError('Password must be at least 8 characters.');
    //   valid = false;
    // }

    if (!valid) return; // Stop the form submission if validation fails

    try {
      const response = await axios.post(`${Base_URL}/login`, {
        email,
        password
      });

      // Assuming the backend sends a JWT token on successful login
      const token = response.data?.token;

      // Store the JWT token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('id', response?.data?.id);

      // Redirect to homepage or dashboard on successful login
      showToaster("Login Successfully", "success")

      navigate('/dashboard');
      console.log('Login successful, token:', token);
    } catch (error) {
      showToaster("Login Failed", "error")
      // Handle server-side errors (e.g., invalid credentials, server down)
      if (error.response) {
        setServerError('Invalid email or password.');
      } else if (error.request) {
        setServerError('Network error. Please try again later.');
      } else {
        setServerError('An unexpected error occurred.');
      }
    }
  };

  return (
    loginModel &&

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'black 0.2',
        padding: '1rem',
        position: 'fixed',
        backgroundColor: '#000000B2',
        // top:'0',
        width: '100%',
        height: '100%',
        zIndex: '3000',


      }}
    >

      {/* Main container for the form and image */}

      <Box
        sx={{
          display: 'flex',
          width: { xs: '100%', sm: '90%', md: '80%' },
          maxWidth: '900px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          flexDirection: { xs: 'column', md: 'row' },
          position: 'relative',
          [theme.breakpoints.down('1500')]: {
            maxWidth: '800px', // Width for screens <= 1500px
          },

          [theme.breakpoints.down('1400')]: {
            maxWidth: '800px',  // Width for screens <= 1400px
            height: '550px',
          },

          [theme.breakpoints.down('1300')]: {
            maxWidth: '700px',  // Width for screens <= 1300px
            height: '480px',
          },


        }}
      >
        {/* Close Icon */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#',

          }}
          onClick={() => { setLoginModel(false); document.body.style.overflowY = "scroll" }}
        >
          <Close />
        </IconButton>

        {/* Left Section - Image */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            [theme.breakpoints.down('1500')]: {
              width: '1150px', // Width for screens <= 1500px
            },
            [theme.breakpoints.down('1400')]: {
              width: '1050px', // Width for screens <= 1500px
            },
            [theme.breakpoints.down('1300')]: {
              width: '1000px', // Width for screens <= 1500px
            },
          }}
        >
          <img
            src={img}
            alt="Security Illustration"
            style={{
              width: '80%',
              height: 'auto',
              [theme.breakpoints.down('1500')]: {
                width: '40%', // Width for screens <= 1500px
              },
              [theme.breakpoints.down('1400')]: {
                width: '30%', // Width for screens <= 1500px
              },
              [theme.breakpoints.down('1300')]: {
                width: '20%', // Width for screens <= 1500px
              },
            }}
          />
        </Box>

        {/* Right Section - Login Form */}
        <Box
          sx={{
            flex: 1,
            padding: { xs: '1.5rem', md: '2.5rem' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            [theme.breakpoints.down('1500')]: {
              width: '1150px', // Width for screens <= 1500px
            },
            [theme.breakpoints.down('1400')]: {
              width: '1050px', // Width for screens <= 1500px
            },
            [theme.breakpoints.down('1300')]: {
              width: '800px', // Width for screens <= 1500px
            },


          }}
        >
          <Typography variant="h5" sx={{
            fontWeight: '500', mb: 1, fontSize: '48px',
            [theme.breakpoints.down('1500')]: {

              fontSize: '50px',
              marginTop: '10px',
              

            },
            [theme.breakpoints.down('1400')]: {

              fontSize: '40px',
            },
              
            [theme.breakpoints.down('1300')]: {

              fontSize: '30px',
              marginTop: '25px',


            },

          }}>
            Login
          </Typography>

          <Typography variant="body2" sx={{
            color: '#FF702D', fontWeight: '500', fontSize: '20px', mb: 3,
            [theme.breakpoints.down('1500')]: {

              fontSize: '18px',

            },
            [theme.breakpoints.down('1300')]: {

              fontSize: '15px',

            },
          }}>
            Login to access your account
          </Typography>

          {/* Display general server-side error message */}

          {serverError && (
            <Typography variant="body2" sx={{ color: '#FF702D', mb: 2 }}>
              {serverError}
            </Typography>
          )}

          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            sx={{
              mt: 1.5,
              backgroundColor: '#f9f9f9',
              borderRadius: 'px',
              "& .MuiInputLabel-root": {
                color: emailError.length > 0 && "red",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: emailError.length > 0 ? 'red' : "#FF702D",
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  // border: 'none', 
                },
                '&:hover fieldset': {
                  // border: 'none',
                },
                '&.Mui-focused fieldset': {
                  // border: 'none',
                  border: '2px solid #FF702D',

                },
                '& .MuiOutlinedInput-input:-webkit-autofill': {
                  height: '15px',
                  WebkitBoxShadow: '0 0 0 1000px #FFF7F3 inset', // Autofill background color
                },
              },
              [theme.breakpoints.down('1500')]: {
                mt: 1.0,
                height: '60px',

                width: '400px',


              },
              [theme.breakpoints.down('1400')]: {
                mt: 1.0,
                height: '60px',

                width: '350px',


              },
              [theme.breakpoints.down('1300')]: {
                mt: 0.8,
                height: '60px',
                width: '300px',



              },
            }}
          />

          {emailError && (
            <Typography variant="body2" sx={{
              color: 'red', mt: 1,
              '& .MuiTypography-root': {


              }
            }}>
              {emailError}
            </Typography>
          )}

          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            sx={{
              mt: 1.5,
              backgroundColor: '#f9f9f9',
              borderRadius: 'px',
              "& .MuiInputLabel-root": {
                color: emailError.length > 0 && "red",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: emailError.length > 0 ? 'red' : "#FF702D",
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  // border: 'none',
                },
                '&:hover fieldset': {
                  // border: 'none',
                },
                '&.Mui-focused fieldset': {
                  // border: 'none',
                  border: '2px solid #FF702D',

                },
                '& .MuiOutlinedInput-input:-webkit-autofill': {
                  height: '15px',
                  WebkitBoxShadow: '0 0 0 1000px #FFF7F3 inset', // Autofill background color
                },
              },
              [theme.breakpoints.down('1500')]: {
                mt: 1.0,
                width: '400px',


              },
              [theme.breakpoints.down('1400')]: {
                mt: 1.0,
                width: '350px',

              },
              [theme.breakpoints.down('1300')]: {
                mt: 0.8,
                height: '70px',
                width: '300px',



              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          {/* Display password error below TextField */}
          {passwordError && (
            <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>
              {passwordError}
            </Typography>
          )}

          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
            <Link onClick={() => window.location.href = "/forget"} underline="none" sx={{ color: '#888888', fontSize: '15px' }}>
              Forgot password?
            </Link>
          </Box> */}

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
            <Link
              onClick={() => (window.location.href = "/forget")}
              underline="none"
              sx={{
                color: '#888888',
                fontSize: '15px',
                cursor: 'pointer',
                '&:hover': {
                  color: '#FF702D'
                  
                },
                [theme.breakpoints.down('1500')]: {
                  fontSize:'13px',  
                                },
                  [theme.breakpoints.down('1400')]: {
                    fontSize:'12px',  

                    },
                    [theme.breakpoints.down('1300')]: {
                      fontSize:'11px',  

                      },
                
              }}
            >
              Forgot password?
            </Link>
          </Box>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#FF702D',
              color: '#fff',
              padding: '10px',
              fontWeight: 'bold',
              fontSize: '14px',
              borderRadius: '12px',
              boxShadow: 'none', // No shadow here
              '&:hover': { backgroundColor: '#FF702D', boxShadow: 'none' },
              [theme.breakpoints.down('1500')]: {
               
                width: '400px',},
                [theme.breakpoints.down('1400')]: {
               
                  width: '350px',},
                  [theme.breakpoints.down('1300')]: {
               
                    width: '300px',},
              
            }}
            onClick={handleSubmit} // Handle form submission
          >
            Login
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, fontSize: '14px', color: '#888888' }}
          >
            Don't have an account?{' '}
            <Link onClick={() => { setLoginModel(false); setSignUpModel(true); }} underline="none" sx={{ color: '#FF702D', fontWeight: 'bold', cursor: 'pointer', }}>
              Sign Up
            </Link>
          </Typography>

          {/* Horizontal line with "Or login with" */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 4,
              mb: 3,
            }}
          >
            <Divider sx={{ flex: 1, bgcolor: 'lightgray' }} />
            <Typography
              variant="body2"
              sx={{
                mx: 2,
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              Or Login with
            </Typography>
            <Divider sx={{ flex: 1, bgcolor: 'lightgray' }} />
          </Box>

          {/* Social login buttons */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#FF702D',
                  color: '#FF702D',
                  minWidth: '450px',
                  minHeight: '42px',
                  borderRadius: '12px',
                  '&:hover': { borderColor: '#FF702D', backgroundColor: 'rgba(255, 112, 45, 0.1)' },
                  [theme.breakpoints.down('1500')]: {
                    minWidth: '400px',
                    marginLeft:'-5px',
                    marginBottom: '30px'
                  },
                  [theme.breakpoints.down('1400')]: {
                    minWidth: '350px',


                  },
                  [theme.breakpoints.down('1300')]: {
                    minWidth: '300px',


                  },
                }}
                onClick={() => window.location.href = `${Base_URL}/auth/google`}

              >
                <GoogleIcon style={{ width: '20px', height: '20px', marginRight: '10px',
                  
                 }} /> {/* Custom Google SVG */}
                Login with Google
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {

      }

    </Box>
  );
};

export default LoginPopUP;
