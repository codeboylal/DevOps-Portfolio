// import React, { useState } from 'react';
// import styles from './editProfile.module.css';
// import ScrollBar from '../../../Scroll Bar/scrollBar';
// import Toaster from '../../../Toaster/toaster'; // Ensure this path is correct

// const EditProfile = ({ profile, onCancel, onSave }) => {
//   const [formData, setFormData] = useState(profile);
//   const [toast, setToast] = useState({ message: '', type: '' }); // State for toaster

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const id = localStorage.getItem('id'); // assuming 'id' is stored in local storage

//       const response = await fetch(`${Base_URL}/api/profile/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         // Set success toaster message
//         setToast({ message: 'Successfully edited your profile', type: 'success' });

//         // Pass the updated profile data to the parent component
//         onSave(formData);

//         // Close the form after showing the toaster
//         setTimeout(() => {
//           onCancel(); // Close the form
//           setToast({ message: '', type: '' }); // Clear toaster after delay
//         }, 1);
//       } else {
//         // Set error toaster message
//         setToast({ message: 'Failed to update profile', type: 'error' });
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       // Set error toaster message
//       setToast({ message: 'Error updating profile', type: 'error' });
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <h2 className={styles.heading}>Edit Profile</h2>
//         <ScrollBar>
//           <div className={styles.row}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className={styles.inputs}
//               value={formData.name || ''}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className={styles.heads}>
//             <label htmlFor="experience">Total Experience</label>
//             <div className={styles.row}>
//               <select
//                 name="totalExperienceYears"
//                 value={formData.totalExperienceYears || ''}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Years</option>
//                {[...Array(31)].map((_, i) => (
//                   <option key={i} value={i}>
//                     {i }
//                   </option>
//                 ))} 
//               </select>

//               <select
//                 name="totalExperienceMonths"
//                 value={formData.totalExperienceMonths || ''}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Months</option>
//                 {[...Array(12)].map((_, i) => (
//                   <option key={i} value={i}>
//                     {i}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className={styles.heads}>
//             <label htmlFor="experience">Joining Date</label>
//             <div className={styles.row}>
//               <select
//                 name="joiningYear"
//                 value={formData.joiningYear  || ''}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Year</option>
//                 {[...Array(50)].map((_, i) => (
//                   <option key={i} value={1999 + i}>
//                     {1999 + i}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 name="joiningMonth"
//                 value={formData.joiningMonth || ''}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Month</option>
//                 {[
//                   'January',
//                   'February',
//                   'March',
//                   'April',
//                   'May',
//                   'June',
//                   'July',
//                   'August',
//                   'September',
//                   'October',
//                   'November',
//                   'December',
//                 ].map((month, i) => (
//                   <option key={i} value={month}>
//                     {month}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className={styles.heads}>
//             <label htmlFor="currentSalary">Current Salary</label>
//             <div className={styles.row}>
//               <input
//                 className={styles.inputs}
//                 type="text"
//                 name="currentSalary"
//                 placeholder="Current Salary"
//                 value={formData.currentSalary || ''}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//           <div className={styles.heads}>
//             <label htmlFor="currentLocation">Current Location</label>
//             <div className={styles.row}>
//               <label>
//                 <input
//                   className={styles.inputs}
//                   type="radio"
//                   name="currentLocation"
//                   value="India"
//                   checked={formData.currentLocation === 'India'}
//                   onChange={handleChange}
//                 />
//                 India
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="currentLocation"
//                   value="Outside India"
//                   checked={formData.currentLocation === 'Outside India'}
//                   onChange={handleChange}
//                 />
//                 Outside India
//               </label>
//             </div>
//           </div>
//           <div className={styles.row}>
//             <input
//               className={styles.inputs}
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city || ''}
//               onChange={handleChange}
//               required={formData.currentLocation === 'India'}
//             />
//           </div>
//           <div className={styles.row}>
//             <input
//               className={styles.inputs}
//               type="text"
//               name="mobileNumber"
//               placeholder="Mobile Number"
//               value={formData.mobileNumber || ''}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className={styles.row}>
//             <input
//               className={styles.inputs}
//               type="email"
//               name="email"
//               placeholder="Email address"
//               value={formData.email || ''}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className={styles.row}>
//             <div className={styles.heads}>
//               <label htmlFor="availability">Availability to Join:</label>
//               <select
//                 name="availability"
//                 value={formData.availability || ''}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="Available to join in 15 Days or Less">15 Days or Less</option>
//                 <option value="Available to join in 1 Month">1 Month</option>
//                 <option value="Available to join in 2 Months">2 Months</option>
//                 <option value="Available to join in More than 3 Months">More than 3 Months</option>
//               </select>
//             </div>
//           </div>
//         </ScrollBar>

//         <div className={styles.buttons}>
//         <button type="submit" className={styles.saveButton}>
//             Save
//           </button>
//           <button type="button" className={styles.cancelButton} onClick={onCancel}>
//             Cancel
//           </button>
          
//         </div>
//       </form>

//       {/* Render Toaster */}
//       {toast.message && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast({ message: '', type: '' })}
//         />
//       )}
//     </div>
//   );
// };

// export default EditProfile;






































import React, { useState } from 'react';
import styles from './editProfile.module.css';
import ScrollBar from '../../../Scroll Bar/scrollBar';
import { useToaster } from '../../../Toaster.js';
import { TextField, MenuItem, Select, InputLabel, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import AmountSelect from '../../../Input/AmountCode/Amount.jsx';
// import { ButtonGroup, Button } from '@mui/material';

import { Base_URL } from '../../../../const/const.js';

const EditProfile = ({ profile, onCancel, onSave }) => {
  const [formData, setFormData] = useState(profile);
  // const [toast, setToast] = useState({ message: '', type: '' }); // State for toaster
  const setToast = useToaster();
  const [availabilityTemp, setAvailabilityTemp] = useState(profile.availability || ''); // Temporary state for availability
  const [errors, setErrors] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [isMonthFocused, setIsMonthFocused] = useState(false);
  const [isSelectMonthFocused, setIsSelectMonthFocused] = useState(false);
  const [isSelectYearFocused, setIsSelectYearFocused] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // validateField(name, value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Please fill out this field';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Please fill out this field';
    if (!formData.email) newErrors.email = 'Please fill out this field';
    // if (!formData.city && formData.currentLocation === 'India') newErrors.city = 'Please fill out this field';
    // if (!formData.currentSalary) newErrors.currentSalary = 'Please fill out this field';
    if (!formData.totalExperienceYears) newErrors.totalExperienceYears = 'Please fill out this field';
    if (!formData.totalExperienceMonths) newErrors.totalExperienceMonths = 'Please fill out this field';
    if (formData.name && formData.name.length > 20) newErrors.name='Name should not have more than 20 characters';
    if (formData.mobileNumber && (formData.mobileNumber.length !== 10)) {
      newErrors.mobileNumber = 'Mobile number should have 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
       // Validation
   

      if (!validateForm()) {
        // setToast({ message: 'Please fix the errors in the form', type: 'error' });
        return;
      }
      
    try {
      const id = localStorage.getItem('id'); // assuming 'id' is stored in local storage
      

      const updatedFormData = { ...formData, availability: availabilityTemp };

      const response = await fetch(`${Base_URL}/api/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        // Set success toaster message
        setToast( 'Successfully edited your profile',  'success' );

        // Pass the updated profile data to the parent component
        onSave(formData);

        // Close the form after showing the toaster
          // onCancel(); // Close the form
    // Clear toaster after delay
    
      } else {
        // Set error toaster message
        setToast( 'Failed to update profile', 'error' );
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Set error toaster message
      setToast( 'Error updating profile',  'error' );
    }
  };

  const focusInput = (e) =>{
    const fieldName = e?.target?.name; // Get the field name from the event
    // console.log(e?.target?.name)
    if (errors[fieldName]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "", // Clear only the specific field's error
      }));
    }
    if(e?.target?.name === undefined){
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e]: "", // Clear only the specific field's error
      }));
    }
  }

  return (
    <div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
      <ScrollBar>
      <h2 style={{paddingTop:'24px',paddingLeft:'24px',borderTopLeftRadius:'24px',position:'fixed', zIndex:'999999',width:'668px',backgroundColor:'white'}} className={styles.heading}>Edit Profile</h2>
       <div style={{padding:'24px'}}>
       
        
        <div className={styles.row} style={{paddingTop:'40px'}}>

          <div className='validation'>
<FormControl 
  fullWidth 
  error={!!errors.name} 
  sx={{ 
    // marginBottom: '15px', // Remove margins around the FormControl
    padding: '0px', // Remove padding
  }}
>
  <TextField
    name="name"
    label="Name"
    onFocus={(e) => focusInput(e)}
    className={styles.inputs}
    value={formData.name || ''}
    onChange={handleChange}
    error={!!errors.name}
    
    sx={{
      
      '& > :not(style)': { 
          
          height: '36px',
          width:'624px',
          // marginBottom:'10px'

      },
      '& .MuiOutlinedInput-input:-webkit-autofill':{
        height:'1px',
        // WebkitBoxShadow: '0 0 0 1000px #E4F1FF inset',
      },
      '& .MuiInputLabel-root': {
            fontSize: '15px',
            position: 'absolute',
            top:  formData.name? '0px' : '-8px',
            color: !errors?.name && '#BDBDBD',
            padding: '0',
          },
        '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: '1px solid #D2D2D2',
                borderColor: '#BDBDBD',
              },
              '&:hover fieldset': {
                border: !errors?.name && '2px solid #2A85FE',
                // borderColor: '#2A85FE',
              },
              '&.Mui-focused fieldset': {
                border: '2px solid #2A85FE',
                // borderColor: '#2A85FE',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#2A85FE',
              top: '0px',
            },
            '&:hover .MuiInputLabel-root': {
              color: !errors?.name && '#2A85FE',
            },'& .MuiInputLabel-root:hover + .MuiOutlinedInput-root fieldset': {
              border: '2px solid #2A85FE',
              borderColor: '#2A85FE',
          }
          ,'& .MuiOutlinedInput-input':{
            height:'1px'
          }
  }}
  />
  {errors.name && (
    <p style={{ color: 'red', fontSize: '12px',  }}> {/* Reduced margin */}
      {errors.name}
    </p>
  )}
</FormControl>
</div>



</div>
        <div className={styles.labelExperience}>
          <label htmlFor="experience" className={styles.experience} >Total Experience</label>
          <div className={styles.row}>

<FormControl 
variant="outlined" 
error={!!errors.totalExperienceYears}  // This will show the error if the field is invalid
className={styles.select}
>
<InputLabel
  sx={{
    color: !!errors.totalExperienceYears ? 'red' : '#BDBDBD',
    position:'absolute',
    top: isFocused || formData?.totalExperienceYears ? '0px' : '-8px',  // Label turns red on error
  }}
>
  Years
</InputLabel>
<Select
  name="totalExperienceYears"
  onFocus={() => {setIsFocused(true); focusInput("totalExperienceYears")} }
  onBlur={() => setIsFocused(false)}
  value={formData.totalExperienceYears || ''}  // Form data
  onChange={handleChange}  // Change handler
  label="Years"  // Required for outlined variant
  MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}
  sx={{
    '& .MuiSelect-select': {
      width: '260px',
      height: '36px', // Set the height to 36px
      paddingTop: 0, // Override padding
      paddingBottom: 0, // Override padding
      lineHeight: '36px', // Align text to the middle by controlling line-height
      display: 'flex',
      position:'relative',
      alignItems: 'center', // Align items vertically
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: !errors.totalExperienceYears ? 'red' : '#BDBDBD',  // Border turns red on error
      },
      '&:hover fieldset': {
        borderColor: !errors.totalExperienceYears ? 'red' : '#BDBDBD',
      },
      '&.Mui-focused fieldset': {
        borderColor: !errors.totalExperienceYears ? 'red' : '#BDBDBD',
        borderWidth: '1px',
      },
      '& .MuiOutlinedInput-input':{
        height:'1px'
      }
    },
  }}
>
  {/* <MenuItem value="">Years</MenuItem> */}
  {[...Array(31)].map((_, i) => (
    <MenuItem key={i} value={i}>{i}</MenuItem>
  ))}
</Select>
{errors.totalExperienceYears && (
  <p style={{ color: 'red', fontSize: '12px' }}>
    {errors.totalExperienceYears} 
  </p>
)}
</FormControl>







<FormControl
variant="outlined"
className={styles.select}
error={!!errors.totalExperienceMonths} // Check if there's an error
>
<InputLabel
   sx={{
    color: !!errors.totalExperienceMonths ? 'red' : '#BDBDBD',
    position:'absolute',
    top: isMonthFocused || formData?.totalExperienceMonths ? '0px' : '-8px',  // Label turns red on error
  }}
>
  Months
</InputLabel>
<Select
  name="totalExperienceMonths"
  onFocus={() => {setIsMonthFocused(true); focusInput("totalExperienceMonths")} }
  // onFocus={() => setIsMonthFocused(true)}
  onBlur={() => setIsMonthFocused(false)}
  value={formData.totalExperienceMonths || ''}
  onChange={handleChange}
  label="Months" // Required for outlined variant
  MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}
  sx={{
'& .MuiSelect-select': {
      width: '260px',
      height: '36px', // Set the height to 36px
      paddingTop: 0, // Override padding
      paddingBottom: 0, // Override padding
      lineHeight: '36px', // Align text to the middle by controlling line-height
      display: 'flex',
      alignItems: 'center', // Align items vertically
    },
    // '& .MuiInputLabel-root':{
    //   position:'relative',
    //   top: formData?.totalExperienceMonths?.length > 0 ? '5px' : '8px'
    // },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: !!errors.totalExperienceMonths ? 'red' : '#BDBDBD',  // Border turns red on error
      },
      '&:hover fieldset': {
        borderColor: !!errors.totalExperienceMonths ? 'red' : '#BDBDBD',
      },
      '&.Mui-focused fieldset': {
        borderColor: !!errors.totalExperienceMonths ? 'red' : '#BDBDBD',
        borderWidth: '1px',
      },
    },
  }}
>
  {/* <MenuItem value="">Months</MenuItem> */}
  {[...Array(12)].map((_, i) => (
    <MenuItem key={i} value={i}>
      {i}
    </MenuItem>
  ))}
</Select>

{/* Add FormHelperText for validation message */}
{errors.totalExperienceMonths && (
  <p style={{ color: 'red', fontSize: '12px' }}>
    {errors.totalExperienceMonths} 
  </p>
)}
</FormControl>




          </div>
        </div>
        <div className={styles.heads}>
          <label htmlFor="experience">Joining Date</label>
          <div className={styles.row}>
            
            <FormControl variant="outlined"  className={styles.select}>
<InputLabel
 sx={{
  // color: !!errors.totalExperienceYears ? 'red' : '#BDBDBD',
  position:'absolute',
  top: isSelectYearFocused || formData?.joiningYear ? '0px' : '-8px',  // Label turns red on error
}}
>Select Year</InputLabel>
<Select
  name="joiningYear"
  onFocus={() => {setIsSelectYearFocused(true); focusInput("joiningYear")} }
  // onFocus={() => setIsSelectYearFocused(true)}
  onBlur={() => setIsSelectYearFocused(false)}
  value={formData.joiningYear || ''}
  onChange={handleChange}
  label="Select Year"  // Required for outlined variant
  MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }} 
  sx={{
'& .MuiSelect-select': {
      width: '260px',
      height: '36px', // Set the height to 36px
      paddingTop: 0, // Override padding
      paddingBottom: 0, // Override padding
      lineHeight: '36px', // Align text to the middle by controlling line-height
      display: 'flex',
      alignItems: 'center', // Align items vertically
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: !!errors.joiningYear ? 'red' : '#BDBDBD',  // Border turns red on error
      },
      '&:hover fieldset': {
        borderColor: !!errors.joiningYear ? 'red' : '#BDBDBD',
      },
      '&.Mui-focused fieldset': {
        borderColor: !!errors.joiningYear ? 'red' : '#BDBDBD',
        borderWidth: '1px',
      },
    },
  }}
>
  <MenuItem value="">Select Year</MenuItem>
  {[...Array(50)].map((_, i) => (
    <MenuItem key={i} value={1999 + i}>{1999 + i}</MenuItem>
  ))}
</Select>
</FormControl>

<FormControl variant="outlined"  className={styles.select}>
<InputLabel
 sx={{
  // color: !!errors.totalExperienceYears ? 'red' : '#BDBDBD',
  position:'absolute',
  top: isSelectMonthFocused || formData?.joiningMonth ? '0px' : '-8px',  // Label turns red on error
}}>Select Month</InputLabel>
<Select
  name="joiningMonth"
  onFocus={() => {setIsSelectMonthFocused(true); focusInput("joiningMonth")} }
  // onFocus={() => setIsSelectMonthFocused(true)}
  onBlur={() => setIsSelectMonthFocused(false)}
  value={formData.joiningMonth || ''}
  onChange={handleChange}
  label="Select Month"  // Required for outlined variant
  MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }} 
  sx={{
'& .MuiSelect-select': {
      width: '260px',
      height: '36px', // Set the height to 36px
      paddingTop: 0, // Override padding
      paddingBottom: 0, // Override padding
      lineHeight: '36px', // Align text to the middle by controlling line-height
      display: 'flex',
      alignItems: 'center', // Align items vertically
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: !!errors.joiningMonth ? 'red' : '#BDBDBD',  // Border turns red on error
      },
      '&:hover fieldset': {
        borderColor: !!errors.joiningMonth ? 'red' : '#BDBDBD',
      },
      '&.Mui-focused fieldset': {
        borderColor: !!errors.joiningMonth ? 'red' : '#BDBDBD',
        borderWidth: '1px',
      },
    },
  }}
>
  <MenuItem value="">Select Month</MenuItem>
  {[
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ].map((month, i) => (
    <MenuItem key={i} value={month}>{month}</MenuItem>
  ))}
</Select>
</FormControl>

          </div>
        </div>
 
<div className={styles.heads}>
<div className={styles.salaryWrapper}>
  <div className='lpa'> 
  <label htmlFor="currentSalary">Current Salary</label>
  <label style={{color: "#767676" , fontSize:'10px'}} className={styles.bottomInputlabel}>
                (LPA)
              </label>
              </div>
  <div className={styles.currencySalary}>
  <AmountSelect height={"36px"}/>
    <input
      type="number"
      name="currentSalary"
      placeholder="Enter Salary"
      value={formData.currentSalary || ''}
      onChange={handleChange}
      className={styles.salaryInput}
    />
  </div>
</div>
</div>



 
<div className={styles.heads}>
<label htmlFor="currentLocation" className={styles.currentLocation}>Current Location</label>
<div className={styles.nation}>
  <FormControl component="fieldset" required>
    <RadioGroup
      name="currentLocation"
      value={formData?.currentLocation || ''}
      onChange={handleChange}
      row // This prop ensures the radio buttons are aligned in a row (horizontally)
      
    >
      <FormControlLabel value="India" control={<Radio />} label="India" />
      <FormControlLabel value="Outside India" control={<Radio />} label="Outside India" />
    </RadioGroup>
  </FormControl>
</div>
</div>




<div className={styles.Address}>
<FormControl 
  fullWidth 
  error={!!errors.city} 
  sx={{ 
    margin: '0px',  // Remove margins around the FormControl
    padding: '0px', // Remove padding
  }}
>
  <TextField
    name="city"
    label="City"
    onFocus={()=>{focusInput("city")}}
    className={styles.inputs}
    value={formData.city || ''}
    onChange={handleChange}
    error={!!errors.city}
    require={formData.currentLocation === 'India'} // Fixed 'require' to 'required'
    sx={{
      
      '& > :not(style)': { 
          
          height: '36px',
          width:'624px',
          // marginBottom:'10px'

      },
      '& .MuiOutlinedInput-input:-webkit-autofill':{
        height:'1px',
      },
      '& .MuiInputLabel-root': {
        fontSize: '15px',
        position: 'absolute',
        top:  formData.city? '0px' : '-8px',
        color:!errors?.city ? '#BDBDBD' : 'red',
        padding: '0',
      },
      '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: '1px solid #D2D2D2',
            borderColor: '#BDBDBD',
          },
          '&:hover fieldset': {
            border: !errors?.city && '2px solid #2A85FE',
            // borderColor: '#2A85FE',
          },
          '&.Mui-focused fieldset': {
            border: '2px solid #2A85FE',
            // borderColor: '#2A85FE',
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: !errors?.city && '#2A85FE',
          top: '0px',
        },
        '&:hover .MuiInputLabel-root': {
          color: !errors?.city &&  '#2A85FE',
        },
        '& .MuiInputLabel-root': {
        fontSize: '15px',
        position: 'absolute',
        top: formData?.city ? '0px' : '-8px',
        // color: '#BDBDBD',
        padding: '0',
      },'& .MuiInputLabel-root:hover + .MuiOutlinedInput-root fieldset': {
        border: '2px solid #2A85FE',
        borderColor: '#2A85FE',
    },'& .MuiOutlinedInput-input':{
        height:'1px'
      }
     
  }}
  />
  {errors.city && (
    <p style={{ color: 'red', fontSize: '12px',  }}> {/* Reduced margin */}
      {errors.city}
    </p>
  )}
</FormControl>
</div>

        <div className={styles.numberEmail}>
<FormControl 
  fullWidth 
  error={!!errors.mobileNumber} 
  sx={{ 
    marginTop: '20px',  // Remove margins around the FormControl
    padding: '0px', // Remove padding
  }}
>
  <TextField
    name="mobileNumber"
    label="Mobile Number"
    onFocus={()=>{focusInput("mobileNumber")}}
    type="number"
    className={styles.inputs}
    value={formData.mobileNumber || ''}
    onChange={handleChange}
    error={!!errors.mobileNumber}
    sx={{
      
      '& > :not(style)': { 
          
          height: '36px',
          width:'624px' 

      },
      '& .MuiOutlinedInput-input:-webkit-autofill':{
        height:'1px',
      },
      '& .MuiInputLabel-root': {
        fontSize: '15px',
        position: 'absolute',
        top:  formData.mobileNumber? '0px' : '-8px',
        color:!errors?.mobileNumber ? 'red' : '#BDBDBD',
        padding: '0',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          border: '1px solid #D2D2D2',
          borderColor: '#BDBDBD',
        },
        '&:hover fieldset': {
          border: !errors?.mobileNumber && '2px solid #2A85FE',
          // borderColor: '#2A85FE',
        },
        '&.Mui-focused fieldset': {
          border: '2px solid #2A85FE',
          // borderColor: '#2A85FE',
        },
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#2A85FE',
        top: '0px',
      },
      '&:hover .MuiInputLabel-root': {
        color: !errors?.mobileNumber && '#2A85FE',
      },
      '& .MuiInputLabel-root': {
        fontSize: '15px',
        position: 'absolute',
        top: formData?.mobileNumber ? '0px' : '-8px',
        // color: '#BDBDBD',
        padding: '0',
      },'& .MuiInputLabel-root:hover + .MuiOutlinedInput-root fieldset': {
        border: !errors?.mobileNumber && '2px solid #2A85FE',
        // borderColor: '#2A85FE',
    },'& .MuiOutlinedInput-input':{
        height:'1px'
      }
  }}
  />
  {errors.mobileNumber && (
    <p style={{ color: 'red', fontSize: '12px',  }}> {/* Reduced margin */}
      {errors.mobileNumber}
    </p>
  )}
</FormControl>
</div>
<div className={styles.numberEmail}>
<FormControl 
  fullWidth 
  error={!!errors.email} 
  sx={{ 
    marginTop: '15px',  // Remove margins around the FormControl
    padding: '0px', // Remove padding
  }}
>
  <TextField
    name="email"
    onFocus={()=>{focusInput("email")}}
    label="Email Address"
    type="email"
    className={styles.inputs}
    value={formData.email || ''}
    onChange={handleChange}
    error={!!errors.email}
    sx={{
      
      '& > :not(style)': { 
          
          height: '36px',
          width:'624px' 

      },
      '& .MuiOutlinedInput-input:-webkit-autofill':{
        height:'1px',
      }
      ,
      '& .MuiInputLabel-root': {
        fontSize: '15px',
        position: 'absolute',
        top:  formData.email? '0px' : '-8px',
        color: errors?.email ? 'red' : '#BDBDBD',
        padding: '0',
      },
     '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1px solid #D2D2D2',
        borderColor: '#BDBDBD',
      },
      '&:hover fieldset': {
        border: !errors?.email && '2px solid #2A85FE',
        // borderColor: '#2A85FE',
      },
      '&.Mui-focused fieldset': {
        border:!errors?.email && '2px solid #2A85FE',
        // borderColor: '#2A85FE',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: !errors?.email && '#2A85FE',
      top: '0px',
    },
    '&:hover .MuiInputLabel-root': {
      color: !errors?.email && '#2A85FE',
    },'& .MuiInputLabel-root': {
        fontSize: '15px',
        position: 'absolute',
        top: formData?.email ? '0px' : '-8px',
        // color: '#BDBDBD',
        padding: '0',
      },'& .MuiInputLabel-root:hover + .MuiOutlinedInput-root fieldset': {
        border: !errors?.email && '2px solid #2A85FE',
        // borderColor:  '#2A85FE',
    },'& .MuiOutlinedInput-input':{
        height:'1px'
      }
  }}
  />
  {errors.email && (
    <p style={{ color: 'red', fontSize: '12px',  }}> {/* Reduced margin */}
      {errors.email}
    </p>
  )}
</FormControl>
</div>


{/* <div className={styles.availability}>
<h3 className={styles.title}>Availability to Join</h3>

<div className={styles.buttonContainer}>
  <button
    type="button"  // Ensure it's a button, not triggering form submission
    className={`${styles.button} ${formData.availability === "Available to join in 15 Days or Less" ? styles.selected : ''}`}
    onClick={() => setFormData({ ...formData, availability: "Available to join in 15 Days or Less" })}
  >
    15 Days or Less
  </button>
  <button
    type="button"
    className={`${styles.button} ${formData.availability === "Available to join in 1 Month" ? styles.selected : ''}`}
    onClick={() => setFormData({ ...formData, availability: "Available to join in 1 Month" })}
  >
    1 Month
  </button>
  <button
    type="button"
    className={`${styles.button} ${formData.availability === "Available to join in 2 Months" ? styles.selected : ''}`}
    onClick={() => setFormData({ ...formData, availability: "Available to join in 2 Months" })}
  >
    2 Months
  </button>
  <button
    type="button"
    className={`${styles.button} ${formData.availability === "Available to join in More than 3 Months" ? styles.selected : ''}`}
    onClick={() => setFormData({ ...formData, availability: "Available to join in More than 3 Months" })}
  >
    More than 3 Months
  </button>
</div>
</div> */}

<div className={styles.availability}>
<label className={styles.title}>Availability to Join</label>

<div className={styles.buttonContainer}>
  <button
    type="button"
    className={`${styles.button} ${formData.availability === "Available to join in 15 Days or Less" ? styles.selected : ''}`}
    onClick={() => setFormData({ 
      ...formData, 
      availability: formData.availability === "Available to join in 15 Days or Less" ? "" : "Available to join in 15 Days or Less" 
    })}
  >
    15 Days or Less
  </button>
  
  <button
    type="button"
    className={`${styles.button} ${formData.availability === "Available to join in 1 Month" ? styles.selected : ''}`}
    onClick={() => setFormData({ 
      ...formData, 
      availability: formData.availability === "Available to join in 1 Month" ? "" : "Available to join in 1 Month" 
    })}
  >
    1 Month
  </button>
  
  <button
    type="button"
    className={`${styles.button} ${formData.availability === "Available to join in 2 Months" ? styles.selected : ''}`}
    onClick={() => setFormData({ 
      ...formData, 
      availability: formData.availability === "Available to join in 2 Months" ? "" : "Available to join in 2 Months" 
    })}
  >
    2 Months
  </button>
  
  <button
    type="button"
    className={`${styles.button} ${formData.availability === "Available to join in More than 3 Months" ? styles.selected : ''}`}
    onClick={() => setFormData({ 
      ...formData, 
      availability: formData.availability === "Available to join in More than 3 Months" ? "" : "Available to join in More than 3 Months" 
    })}
  >
    More than 3 Months
  </button>
</div>
</div>

      
</div>
      <div className={styles.buttons} style={{position:'sticky',borderBottomLeftRadius:'24px', bottom:'0px',paddingRight:'24px',paddingTop:'10px',paddingBottom:'24px', zIndex:'999999',width:'668px',backgroundColor:'white'}}>
        <button type="submit" className={styles.saveButton}>
          Save
        </button>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
       
        </ScrollBar>
      </form>
      
      {/* Render Toaster
      {toast.message && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: '' })}
        />
      )} */}
      
    </div>
  );
};

export default EditProfile;
