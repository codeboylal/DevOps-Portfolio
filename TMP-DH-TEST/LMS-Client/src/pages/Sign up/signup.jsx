import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, IconButton, Link, Divider, } from '@mui/material';
import { Facebook, Google, Apple } from '@mui/icons-material';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import img from './signup.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../Login/Google Icon.svg';
import Base_URL from '../../const/const';
import { useToaster } from "../../Toaster";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const showToaster = useToaster();
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const changeFirstName = (e) => {
    if (e.length > 0) {
      if (!(/^[A-Za-z]+$/).test(e)) {
        validationErrors.firstName = "First name is not valid"
      } else {
        if (e.length > 10) {
          validationErrors.firstName = "Character limit is upto 10"
        } else {
          validationErrors.firstName = ""
        }
      }
    } else {
      validationErrors.firstName = ""
    }
    setFormData.firstName = (e)
  }


  const changeLastName = (e) => {
    if (e.length > 0) {
      if (!(/^[A-Za-z]+$/).test(e)) {
        validationErrors.lastName = "Last name is not valid"
      } else {
        if (e.length > 10) {
          validationErrors.lastName = "Character limit is upto 10"
        } else {
          validationErrors.lastName = ""
        }
      }
    } else {
      validationErrors.lastName = ""
    }
    setFormData.lastName = (e)
  }

  const changePhoneNumberName = (e) => {
    if (e.length > 0) {
      if (!(/^[0-9]+$/).test(e)) {
        validationErrors.phone = "Phone number is not valid"
      } else {
        if (e.length > 10 || e.length < 10) {
          validationErrors.phone = "Phone number should be of 10 digits"
        } else {
          validationErrors.phone = ""
        }
      }
    } else {
      validationErrors.phone = ""
    }
    setFormData.phone = (e)
  }

  const changePassName = (e) => {
    if (e.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long.";
    } else {
      if (!/[A-Z]/.test(e)) {
        validationErrors.password = "Password must contain at least one uppercase letter.";
      } else {
        if (!/[a-z]/.test(e)) {
          validationErrors.password = "Password must contain at least one lowercase letter.";
        } else {
          if (!/\d/.test(e)) {
            validationErrors.password = "Password must contain at least one number.";
          } else {
            if (!/[@$!%*?&]/.test(e)) {
              validationErrors.password = "Password must contain at least one special character.";
            } else {
              validationErrors.password = "";
            }
          }
        }
      }
    }
    setFormData.password = e;
  };


  const changeConfPassName = (e) => {
    if (e.length < 8) {
      validationErrors.confirmPassword = "Password must be at least 8 characters long.";
    } else {
      if (!/[A-Z]/.test(e)) {
        validationErrors.confirmPassword = "Password must contain at least one uppercase letter.";
      } else {
        if (!/[a-z]/.test(e)) {
          validationErrors.confirmPassword = "Password must contain at least one lowercase letter.";
        } else {
          if (!/\d/.test(e)) {
            validationErrors.confirmPassword = "Password must contain at least one number.";
          } else {
            if (!/[@$!%*?&]/.test(e)) {
              validationErrors.confirmPassword = "Password must contain at least one special character.";
            } else {
              if (formData.password !== e) {
                validationErrors.confirmPassword = "Passwords are not matching";
              } else {
                validationErrors.confirmPassword = "";
              }
            }
          }
        }
      }
    }
    setFormData.confirmPassword = e;
  };


  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Assuming 10-digit phone number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/; // At least 8 chars, uppercase, lowercase, number, special char

    if (!formData.firstName) errors.firstName = 'First name is required';
    // if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) errors.email = 'Enter a valid email';
    if (!formData.phone) errors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone)) errors.phone = 'Enter a valid 10-digit phone number';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
    else if (!passwordRegex.test(formData.password)) errors.password = 'Password: 8+ characters, uppercase, lowercase, number, symbol.';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { confirmPassword, ...data } = formData;

    try {
      const response = await axios.post(`${Base_URL}/signup`, data);
      if (response.data.success) {
        navigate('/login');
        showToaster("Account Created Successfully", "success")

      } else {
        setError(response.data.message || 'Signup failed');
        showToaster("Signup Failed", "success")

      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        const { status, data } = err.response;
        if (status === 409) setError('Email is already registered');
        else if (status === 400) setError('Invalid signup details');
        else setError('Error signing up. Please try again.');
      } else {
        setError('Network error. Please check your connection.');
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
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '1050px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#',
          }}
          onClick={() => navigate('/')} // Redirect to homepage
        >
          <Close />
        </IconButton>

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
            style={{ width: '80%', height: 'auto' }}
          />
        </Box>

        <Box
          sx={{
            // width:'100%',
            // maxWidth:'474px',
            flex: 1,
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: '500',
              mb: 1,
              textAlign: 'left',
              fontSize: '48px'
            }}
          >
            Sign Up
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#FF702D',
              // width: '460px',
              mb: 3,
              textAlign: 'left',
              fontSize: '18px',
            }}
          >
            Let’s get you all set up so you can access your personal account.
          </Typography>

          {/* <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#FF702D',
            }}
            onClick={() => navigate('/')} // Redirect to primary page (e.g., homepage)
          >
            <Close />
          </IconButton> */}

          {error && (
            <Typography
              variant="body2"
              sx={{ color: '#FF702D', mb: 2 }}
            >
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  value={formData.firstName}
                  onChange={(e) => { handleInputChange(e); changeFirstName(e.target.value) }}
                  error={!!validationErrors.firstName}
                  helperText={validationErrors.firstName}
                  FormHelperTextProps={{
                    sx: { marginTop: '4px' }, // Adjust the margin here if you need more spacing
                  }}
                  sx={{
                    mt: "12px", mb: "12px",
                    height: '56px',
                    "& .MuiInputLabel-root": {
                      color: validationErrors?.firstName?.length > 0 && "red",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: validationErrors?.firstName?.length > 0 ? 'red' : "#FF702D",
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                      color: 'red',
                    },
                    backgroundColor: '#f9f9f9',
                    borderRadius: '18px',
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

              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  value={formData.lastName}
                  onChange={(e) => { handleInputChange(e); changeLastName(e.target.value) }}
                  error={!!validationErrors.lastName}
                  helperText={validationErrors.lastName}
                  sx={{
                    mt: "12px", mb: "12px",
                    height: '56px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '18px',
                    "& .MuiInputLabel-root": {
                      color: validationErrors?.lastName?.length > 0 && "red",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: validationErrors?.lastName?.length > 0 ? 'red' : "#FF702D",
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                      color: 'red',
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  // type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                  sx={{
                    mt: "12px", mb: "12px",
                    height: '56px',

                    backgroundColor: '#f9f9f9',
                    "& .MuiInputLabel-root": {
                      color: validationErrors?.email?.length > 0 && "red",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: validationErrors?.email?.length > 0 ? 'red' : "#FF702D",
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                      color: 'red',
                    },
                    borderRadius: '18px',
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  variant="outlined"
                  value={formData.phone}
                  onChange={(e) => { handleInputChange(e); changePhoneNumberName(e.target.value) }}
                  error={!!validationErrors.phone}
                  helperText={validationErrors.phone}
                  sx={{
                    mt: "12px", mb: "12px",
                    height: '56px',

                    backgroundColor: '#f9f9f9',
                    borderRadius: '18px',
                    "& .MuiInputLabel-root": {
                      color: validationErrors?.phone?.length > 0 && "red",
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                      color: 'red',
                      fontSize: '11px'
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: validationErrors?.phone?.length > 0 ? 'red' : "#FF702D",
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={formData.password}
                  onChange={(e) => { handleInputChange(e); changePassName(e.target.value) }}
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                  sx={{
                    mt: "12px", mb: "12px",
                    height: '56px',
                    "& .MuiInputLabel-root": {
                      color: validationErrors?.password?.length > 0 && "red",
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                      color: 'red',
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: validationErrors?.password?.length > 0 ? 'red' : "#FF702D",
                    },
                    backgroundColor: '#f9f9f9',
                    borderRadius: '18px',
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={formData.confirmPassword}
                  onChange={(e) => { handleInputChange(e); changeConfPassName(e.target.value) }}
                  error={!!validationErrors.confirmPassword}
                  helperText={validationErrors.confirmPassword}
                  sx={{
                    mt: "12px", mb: "12px",
                    height: '56px',
                    "& .MuiInputLabel-root": {
                      color: validationErrors?.confirmPassword?.length > 0 && "red",
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                      color: 'red',
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: validationErrors?.confirmPassword?.length > 0 ? 'red' : "#FF702D",
                    },
                    backgroundColor: '#f9f9f9',
                    borderRadius: '18px',
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
                      <IconButton onClick={handleClickShowConfirmPassword}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: '48px',

                backgroundColor: '#FF702D',
                color: '#fff',
                padding: '10px',
                fontWeight: 'bold',
                fontSize: '13px',
                borderRadius: '14px',
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#FF702D', boxShadow: 'none' },
              }}
            >
              Create Account
            </Button>
          </form>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 3,
              mb: 3,
            }}
          >
            <Divider sx={{ flex: 1, bgcolor: 'lightgray' }} />
            <Typography
              variant="body2"
              sx={{
                mx: 1.5,
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              Or Login with
            </Typography>
            <Divider sx={{ flex: 1, bgcolor: 'lightgray' }} />
          </Box>

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
                }}
                onClick={() => window.location.href = `${Base_URL}/auth/google`}

              >
                <GoogleIcon style={{ width: '20px', height: '20px', marginRight: '10px' }} /> {/* Custom Google SVG */}
                Login with Google
              </Button>
            </Grid>
          </Grid>

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 4,
              fontSize: '15px',
              color: '#888888',
            }}
          >
            Already a member?{' '}
            <Link href="/login" underline="none" sx={{ color: '#FF702D', fontWeight: 'bold' }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
