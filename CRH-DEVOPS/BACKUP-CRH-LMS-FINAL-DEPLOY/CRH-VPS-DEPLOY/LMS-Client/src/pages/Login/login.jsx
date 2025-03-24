import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, IconButton, Link, Divider } from '@mui/material';
import { Google, Visibility, VisibilityOff , Close } from '@mui/icons-material';
import axios from 'axios'; // Import Axios
import img from './new.png'; // Update this path if needed
import { useNavigate } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../Login/Google Icon.svg'; // Update the path
import { useToaster } from "../../Toaster";
import Base_URL from '../../const/const';
const Login = () => {
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

  const checkEmail = (email) => {
    if(validateEmail(email)){
      setEmailError("")
    }else{
      setEmailError("Email is not valid")
    }
    if(email.length === 0){
      setEmailError("")
    }
    setEmail(email)
  }

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
      setEmailError('Email is not valid');
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        padding: '1rem',
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
          onClick={() => navigate('/')} // Redirect to primary page (e.g., homepage)
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
          }}
        >
          <img
            src={img}
            alt="Security Illustration"
            style={{
              width: '80%',
              height: 'auto',
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
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: '500', mb: 1, fontSize: '48px' }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ color: '#FF702D', fontWeight: '500', fontSize: '20px', mb: 3 }}>
            Login to access your account
          </Typography>

          {/* Display general server-side error message */}
          {serverError && (
            <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
              {serverError}
            </Typography>
          )}

          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            // type="email"
            autoComplete="email"
            variant="outlined"
            value={email}
            onChange={(e) => {setEmail(e.target.value); checkEmail(e.target.value)}} // Update email state
            sx={{
              mt: 1.5,
              backgroundColor: '#f9f9f9',
              borderRadius: '15px',
              "& .MuiInputLabel-root": {
                color: emailError.length > 0  && "red",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: emailError.length > 0  ? 'red'  : "#FF702D",
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
            }}
          />

          {/* Display email error below TextField */}
          {emailError && (
            <Typography variant="body2" sx={{ color: 'red',mb:2}}>
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
              mt: 0.5,
              backgroundColor: '#f9f9f9',
              borderRadius: '18px',
              "& .MuiInputLabel-root": {
                color: passwordError.length > 0  && "red",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: passwordError.length > 0  ? 'red'  : "#FF702D",
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
            <Typography variant="body2" sx={{ color: 'red' }}>
              {passwordError}
            </Typography>
          )}
{/* 
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
            <Link onClick={() => window.location.href = "/forget"} underline="none" sx={{ color: '#888888', fontSize: '15px' }}>
              Forgot password?
            </Link>
          </Box> */}
{/* <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
  <Link
    onClick={() => (window.location.href = "/forget")}
    underline="none"
    sx={{ color: '#888888', fontSize: '15px', cursor: 'pointer' }}
  >
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
      }
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
            <Link href="/signup" underline="none" sx={{ color: '#FF702D', fontWeight: 'bold' }}>
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
                  minWidth: '388px',
                  minHeight: '45px',
                  borderRadius: '12px',
                  '&:hover': { borderColor: '#FF702D' , backgroundColor: 'rgba(255, 112, 45, 0.1)'},
                }}
                onClick={() => window.location.href = `${Base_URL}/auth/google`}
              >
                <GoogleIcon style={{ width: '20px', height: '20px', marginRight: '10px' }} /> {/* Custom Google SVG */}
                Login with Google 
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

