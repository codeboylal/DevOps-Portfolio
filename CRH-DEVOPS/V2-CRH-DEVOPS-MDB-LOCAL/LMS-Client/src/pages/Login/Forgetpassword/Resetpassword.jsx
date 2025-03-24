import React, { useState , useEffect} from 'react';
import { TextField, Button, Grid, Typography, Box, Divider } from '@mui/material';
import img from './Rectangle 20.png';
import axios from 'axios'; // Import axios to make API requests
import Base_URL from '../../../const/const';
import { useToaster } from "../../../Toaster";
import {  Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {
  const [password, setPassword] = useState(''); // State for the new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming the password
  const [message, setMessage] = useState(''); // State to show success or error messages

  const [tokenValue, setTokenValue] = useState("")
  const showToaster = useToaster();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${Base_URL}/reset-password/${tokenValue}`, { password });
      setMessage(response.data.message); // Set the message received from the server
      showToaster("Password reset Successfully", "success")


      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setMessage('Error resetting password. Please try again.');
      showToaster("Error resetting password", "error")
    }
  };

  const navigate = useNavigate();


  // storing id from DB to local
  useEffect(() => {
    // This function extracts query parameters from the URL
    const getQueryParams = () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      // Store data in localStorage if available
      if (token) {
        // localStorage.setItem("id", id);
        setTokenValue(token)
      }
    };

    // Call the function when the component loads
    getQueryParams();
  }, []);

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
          Reset Password
        </Typography>
        <Typography variant="body2" sx={{ color: '#FF702D', fontWeight: '500', fontSize: '14px', mb: 3 }}>
          Enter your new password and confirm it below to reset your password.
        </Typography>

        <TextField
  margin="normal"
  fullWidth
  label="New Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  variant="outlined"
  sx={{
    mt: 1,
    borderRadius: '18px',
    backgroundColor: '#f9f9f9',
    '& .MuiOutlinedInput-root': {
      borderRadius: '18px',
      '& fieldset': {
        // border: 'none',
      },
      '&:hover fieldset': {
        // border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #FF702D',
      },
    },
    '& .MuiInputLabel-root': {
      // color: '#FF702D', // Default label color
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#FF702D', // Label color when focused
    },
  }}
/>

        {/* <TextField
          margin="normal"
          fullWidth
          label="Confirm Password"
          // type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="outlined"
          sx={{
            mt: 1,
            borderRadius: '18px',
            backgroundColor: '#f9f9f9',
            
            '& .MuiOutlinedInput-root': {
              borderRadius: '18px',
              '& fieldset': { 
                // border: 'none'
               },
              '&:hover fieldset': {
                //  border: 'none'
                 },
              '&.Mui-focused fieldset': {
                //  border: 'none'
        border: '2px solid #FF702D',
                
                },

            },
          }}
        /> */}


<TextField
  margin="normal"
  fullWidth
  label="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  variant="outlined"
  sx={{
    mt: 1,
    borderRadius: '18px',
    backgroundColor: '#f9f9f9',
    '& .MuiOutlinedInput-root': {
      borderRadius: '18px',
      '& fieldset': {
        // border: 'none',
      },
      '&:hover fieldset': {
        // border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #FF702D',
      },
    },
    '& .MuiFormLabel-root': {
      // color: '#FF702D', // Default label color
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#FF702D', // Label color when focused
    },
  }}
/>




        <Button
          onClick={handleResetPassword}
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: '#FF702D',
            color: '#fff',
            padding: '10px',
            fontWeight: 'bold',
            fontSize: '16px',
            borderRadius: '15px',
            boxShadow: 'none',
            '&:hover': { backgroundColor: '#FF702D', boxShadow: 'none' },
          }}
        >
          Reset Password
        </Button>

        {message && (
          <Typography variant="body2" sx={{ color: '#FF702D', mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  </Box>
  );
};

export default ResetPassword;






































// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Typography, Box } from '@mui/material';
// import axios from 'axios';
// import { useToaster } from "../../../Toaster";
// import { useNavigate } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton';
// import { Close } from '@mui/icons-material';
// import img from './Rectangle 20.png';
// import Base_URL from '../../../const/const';

// const ResetPassword = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [confirmPasswordError, setConfirmPasswordError] = useState('');
//   const [tokenValue, setTokenValue] = useState('');
//   const showToaster = useToaster();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getQueryParams = () => {
//       const params = new URLSearchParams(window.location.search);
//       const token = params.get("token");
//       if (token) setTokenValue(token);
//     };
//     getQueryParams();
//   }, []);

//   const validatePasswords = () => {
//     let isValid = true;
//     if (!password) {
//       setPasswordError('Password is required');
//       isValid = false;
//     } else if (password.length < 6) {
//       setPasswordError('Password must be at least 6 characters long');
//       isValid = false;
//     } else {
//       setPasswordError('');
//     }

//     if (!confirmPassword) {
//       setConfirmPasswordError('Confirm Password is required');
//       isValid = false;
//     } else if (confirmPassword !== password) {
//       setConfirmPasswordError('Passwords do not match');
//       isValid = false;
//     } else {
//       setConfirmPasswordError('');
//     }

//     return isValid;
//   };

//   const handleResetPassword = async () => {
//     if (!validatePasswords()) return;

//     try {
//       const response = await axios.post(`${Base_URL}/reset-password/${tokenValue}`, { password });
//       showToaster('Password reset successfully', 'success');
//       navigate('/'); // Redirect to homepage or login page after success
//     } catch (error) {
//       showToaster('Error resetting password', 'error');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         backgroundColor: '#f9f9f9',
//         padding: '1rem',
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           width: { xs: '100%', sm: '90%', md: '80%' },
//           maxWidth: '900px',
//           backgroundColor: '#fff',
//           borderRadius: '12px',
//           boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
//           overflow: 'hidden',
//           flexDirection: { xs: 'column', md: 'row' },
//           position: 'relative',
//         }}
//       >
//         <IconButton
//           sx={{ position: 'absolute', top: 8, right: 8, color: '#000' }}
//           onClick={() => navigate('/')}
//         >
//           <Close />
//         </IconButton>

//         <Box
//           sx={{
//             flex: 1,
//             backgroundColor: '#f0f0f0',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: '1rem',
//           }}
//         >
//           <img
//             src={img}
//             alt="Security Illustration"
//             style={{ width: '80%', height: 'auto' }}
//           />
//         </Box>

//         <Box
//           sx={{
//             flex: 1,
//             padding: { xs: '1.5rem', md: '2.5rem' },
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//           }}
//         >
//           <Typography variant="h5" sx={{ fontWeight: '500', mb: 1, fontSize: '33px' }}>
//             Reset Password
//           </Typography>
//           <Typography variant="body2" sx={{ color: '#FF702D', fontWeight: '500', fontSize: '14px', mb: 3 }}>
//             Enter your new password and confirm it below to reset your password.
//           </Typography>

//           <TextField
//             margin="normal"
//             fullWidth
//             label="New Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             error={!!passwordError}
//             helperText={passwordError}
//             variant="outlined"
//             sx={{
//               mt: 1,
//               borderRadius: '18px',
//               backgroundColor: '#f9f9f9',
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: '18px',
//                 '& fieldset': {
//                   // border: 'none',
//                 },
//                 '&:hover fieldset': {
//                   // border: 'none',
//                 },
//                 '&.Mui-focused fieldset': {
//                   border: '2px solid #FF702D',
//                 },
//               },
//               '& .MuiFormLabel-root': {
//                 // color: '#FF702D', // Default label color
//               },
//               '& .MuiFormLabel-root.Mui-focused': {
//                 color: '#FF702D', // Label color when focused
//               },
//             }}
//           />

//           <TextField
//             margin="normal"
//             fullWidth
//             label="Confirm Password"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             error={!!confirmPasswordError}
//             helperText={confirmPasswordError}
//             variant="outlined"
//             sx={{
//               mt: 1,
//               borderRadius: '18px',
//               backgroundColor: '#f9f9f9',
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: '18px',
//                 '& fieldset': {
//                   // border: 'none',
//                 },
//                 '&:hover fieldset': {
//                   // border: 'none',
//                 },
//                 '&.Mui-focused fieldset': {
//                   border: '2px solid #FF702D',
//                 },
//               },
//               '& .MuiFormLabel-root': {
//                 // color: '#FF702D', // Default label color
//               },
//               '& .MuiFormLabel-root.Mui-focused': {
//                 color: '#FF702D', // Label color when focused
//               },
//             }}
//           />

//           <Button
//             onClick={handleResetPassword}
//             fullWidth
//             variant="contained"
//             sx={{
//               mt: 3,
//               backgroundColor: '#FF702D',
//               color: '#fff',
//               padding: '10px',
//               fontWeight: 'bold',
//               fontSize: '16px',
//               borderRadius: '15px',
//               boxShadow: 'none',
//               '&:hover': { backgroundColor: '#FF702D', boxShadow: 'none' },
//             }}
//           >
//             Reset Password
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ResetPassword;












