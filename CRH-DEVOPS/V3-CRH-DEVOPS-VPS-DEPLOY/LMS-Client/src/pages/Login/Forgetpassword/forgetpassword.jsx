import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, IconButton, Divider } from '@mui/material';
import { Facebook, Google, Apple } from '@mui/icons-material';
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import img from './Rectangle 20.png';
import axios from 'axios'; // Import axios to make API requests
import { ReactComponent as GoogleIcon } from '../Google Icon.svg';
import Base_URL from '../../../const/const';
import { useToaster } from "../../../Toaster";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// import Link from '@mui/material/Link';
import { styled } from '@mui/system';
import { Link as MuiLink } from '@mui/material';
const ForgetPassword = () => {
  const [email, setEmail] = useState(''); // State to store email
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(''); // State to show success or error messages
  const showToaster = useToaster();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const NoUnderlineLink = styled(MuiLink)({
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  });

  const handleForgetPassword = async () => {
    try {
      const response = await axios.post(`${Base_URL}/forgot-password`, { email });
      setMessage(response.data.message); // Set the message received from the server
      showToaster("Link send sccessfully", "success")

    } catch (error) {
      setMessage('Error in sending reset link. Please try again.');
      showToaster("Failed to sent link", "error")
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
          top: 16,
          right: 16,
          color: '#',
        }}
        onClick={() => navigate('/')} // Redirect to primary page (e.g., homepage)
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
            style={{
              width: '80%',
              height: 'auto',
            }}
          />
        </Box>



        <Box
          sx={{
            flex: 1,
            padding: { xs: '1.5rem', md: '2.5rem' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: '500', mb: 1, fontSize: '33px' }}>
            Forget Password
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: '500', color: '#FF702D', mb: 3, fontsize: '20px' }}>
           Enter your email below to recover your password.
          </Typography>

          {/* Don’t worry, happens to all of us.  */}

          {/* <TextField
            margin="normal"
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email input
            variant="outlined"
            sx={{
              mt: 1,
              borderRadius: '18px',
              backgroundColor: '#f9f9f9',
              '& .MuiOutlinedInput-root': {
                borderRadius: '18px',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                  // color:'orange',
                },
                
              },
              '& .MuiOutlinedInput-input:-webkit-autofill': {
                height: '18px',
                WebkitBoxShadow: '0 0 0 1000px #FFF7F3 inset',
              },

            }}
          /> */}



<TextField
  margin="normal"
  fullWidth
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  variant="outlined"
  sx={{
    mt: 1,
    borderRadius: '18px',
    backgroundColor: '#f9f9f9',
    '& .MuiOutlinedInput-root': {
      borderRadius: '18px',
      '& fieldset': {
        // border: '2px solid #FF702D',
      },
      '&:hover fieldset': {
        // border: '2px solid #FF702D',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #FF702D',
      },
    },
    // Change label color for both normal and focused states
    '& .MuiFormLabel-root': {
      // color: '#FF702D', // Regular label color
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#FF702D', // Focused label color
    },
    '& .MuiOutlinedInput-input:-webkit-autofill': {
      height: '18px',
      WebkitBoxShadow: '0 0 0 1000px #FFF7F3 inset',
    },
  }}
/>


          <Button
            onClick={handleForgetPassword} // Handle forget password
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: '#FF702D',
              color: '#fff',
              padding: '10px',
              fontWeight: 'bold',
              fontSize: '13px',
              borderRadius: '15px',
              boxShadow: 'none', // No shadow here
              '&:hover': { backgroundColor: '#FF702D', boxShadow: 'none' },
            }}
          >
            Submit
          </Button>

          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
            <Link onClick={() => window.location.href = "/login"} underline="none" sx={{ color: '#FF702D', fontSize: '15px' }}>
              Go back to Login
            </Link>
          </Box> */}


          {/* <Typography variant="body2" align="center" sx={{ mt: 2, fontSize: '14px', color: '#888888' }}>
            Go Back to {' '}
            <Link component={RouterLink} to="/login" sx={{ color: '#FF702D', fontWeight: 'bold' , textDecoration: 'none' }}>
              Login
            </Link>
          </Typography> */}
          <Typography variant="body2" align="center" sx={{ mt: 2, fontSize: '14px', color: '#888888' }}>
  Go Back to {' '}
  <NoUnderlineLink component={RouterLink} to="/login" sx={{ color: '#FF702D', fontWeight: 'bold' }}>
    Login
  </NoUnderlineLink>
</Typography>

          {message && (
            <Typography variant="body2" sx={{ color: '#FF702D', mt: 2 }}>
              {message}
            </Typography>
          )}

          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
            <Link onClick={() => window.location.href = "/Login"} underline="none" sx={{ color: '#888888', fontSize: '15px' }}>
              Go Back to Login
            </Link>
          </Box> */}

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
                color: '#FF702D',
              }}
            >
              Or Login with
            </Typography>
            <Divider sx={{ flex: 1, bgcolor: 'lightgray' }} />
          </Box>

          {/* Social login buttons */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item>

            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#FF702D',
                  color: '#FF702D',
                  minWidth: '388px',
                  minHeight: '50px',
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
        </Box>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
