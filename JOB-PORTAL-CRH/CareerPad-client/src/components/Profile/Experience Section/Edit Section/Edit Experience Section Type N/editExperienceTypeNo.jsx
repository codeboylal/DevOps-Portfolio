
// import React, { useState } from 'react';
// import { TextField, RadioGroup, FormControlLabel, Radio, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
// import styles from './editExperienceTypeNo.module.css';
// import Toaster from '../../../../Toaster/toaster'; 
// import ScrollBar from '../../../../Scroll Bar/scrollBar';
// import EditExperienceTypeYes from '../Edit Experience Section Type Yes/editExperienceTypeYes'; // Import the EditExperienceTypeYes component

// const EditExperienceTypeNo = ({ onClose, onSave, initialExperiences }) => {
//   const [experiences, setExperiences] = useState(initialExperiences || [{
//     currentEmployment: '',
//     employmentType: 'Full-time',
//     companyName: '',
//     jobTitle: '',
//     joiningYear: '',
//     joiningMonth: '',
//     workedUntilYear: '',
//     workedUntilMonth: '',
//     jobProfile: '',
//   }]);

//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [showExperienceTypeYes, setShowExperienceTypeYes] = useState(false); // State to toggle EditExperienceTypeYes component

//   const yearsOptions = Array.from({ length: 51 }, (_, i) => 1990 + i);
//   const monthsOptions = [
//     "January", "February", "March", "April", "May", "June", 
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     const newExperiences = [...experiences];
//     newExperiences[index][name] = value;
//     setExperiences(newExperiences);

//     // If the 'Yes' option is selected, show EditExperienceTypeYes component
//     if (name === 'currentEmployment' && value === 'Yes') {
//       setShowExperienceTypeYes(true);
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const id = localStorage.getItem('id');
//       const responseGet = await fetch(`${Base_URL}/api/profile/${id}`);
//       if (!responseGet.ok) {
//         setToast({ message: 'Failed to fetch profile data', type: 'error' });
//         return;
//       }
//       const profileData = await responseGet.json();
  
//       const updatedWorkExperience = [
//         ...profileData.workExperience,
//         ...experiences,
//       ];
  
//       const responseUpdate = await fetch(`${Base_URL}/api/profile/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ workExperience: updatedWorkExperience }),
//       });
  
//       if (responseUpdate.ok) {
//         onSave(updatedWorkExperience); // Send updated data to parent
//         setToast({ message: 'Profile Updated Successful', type: 'success' });
//       } else {
//         setToast({ message: 'Failed to save data', type: 'error' });
//       }
//     } catch (error) {
//       console.error('Error saving data:', error);
//       setToast({ message: 'Error saving data. Please try again.', type: 'error' });
//     }
//   };
  




//   const closeToaster = () => {
//     setToast({ message: '', type: '' });
//   };

//   // If 'Yes' is selected, render EditExperienceTypeYes component
//   if (showExperienceTypeYes) {
//     return <EditExperienceTypeYes onClose={() => setShowExperienceTypeYes(false)} />;
//   }

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.formWrapper}>
//         <div className={styles.container}>
//           <h2 className={styles.heading}>Work Experience</h2>
//           <form className={styles.form} onSubmit={handleSubmit}>
//             <ScrollBar>
//               {experiences.map((experience, index) => (
//                 <div key={index} className={styles.experienceSection}>
//                   {/* <div className={styles.group}>
//                     <FormControl component="fieldset">
//                       <label className={styles.labelEdit}>Is this your current employment?</label>
//                       <RadioGroup
//                         row
//                         name="currentEmployment"
//                         value={experience.currentEmployment}
//                         onChange={(e) => handleChange(index, e)}
//                         sx={{ marginBottom: '10px' }}
//                       >
//                         <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//                         <FormControlLabel value="No" control={<Radio />} label="No" />
//                       </RadioGroup>
//                     </FormControl>
//                   </div> */}

//                   <div className={styles.group}>
//                     <FormControl component="fieldset">
//                       <label className={styles.labelEdit}>Employment Type</label>
//                       <RadioGroup
//                         row
//                         name="employmentType"
//                         value={experience.employmentType}
//                         onChange={(e) => handleChange(index, e)}
//                         sx={{ marginBottom: '10px' }}
//                       >
//                         <FormControlLabel value="Full-time" control={<Radio />} label="Full-time" />
//                         <FormControlLabel value="Internship" control={<Radio />} label="Internship" />
//                       </RadioGroup>
//                     </FormControl>
//                   </div>

//                   {/* <div className={styles.group}>
//                     <Button
//                       variant="outlined"
//                       component="label"
//                       className={styles.uploadButton}
//                     >
//                       Upload Company Logo
//                       <input
//                         type="file"
//                         hidden
//                         name="companyLogo"
//                         onChange={(e) => handleChange(index, e)}
//                       />
//                     </Button>
//                   </div> */}

//                   <div className={styles.group}>
//                     <TextField
//                       name="companyName"
//                       label="Previous Company Name"
//                       variant="outlined"
//                       fullWidth
//                       value={experience.companyName}
//                       onChange={(e) => handleChange(index, e)}
//                       sx={{ marginBottom: '10px', marginTop: '10px' }}
//                     />
//                   </div>

//                   <div className={styles.group}>
//                     <TextField
//                       name="jobTitle"
//                       label="Previous Job Title"
//                       variant="outlined"
//                       fullWidth
//                       value={experience.jobTitle}
//                       onChange={(e) => handleChange(index, e)}
//                       sx={{ marginBottom: '15px' }}
//                     />
//                   </div>

//                   <div className={styles.group}>
//                     <label className={styles.labelEdit}>Joining Date</label>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '15px' }}>
//                       <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
//                         <InputLabel shrink>Year</InputLabel>
//                         <Select
//                           label="Year"
//                           name="joiningYear"
//                           value={experience.joiningYear}
//                           onChange={(e) => handleChange(index, e)}
//                         >
//                           {yearsOptions.map((year) => (
//                             <MenuItem key={year} value={year}>{year}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>

//                       <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
//                         <InputLabel shrink>Month</InputLabel>
//                         <Select
//                           label="Month"
//                           name="joiningMonth"
//                           value={experience.joiningMonth}
//                           onChange={(e) => handleChange(index, e)}
//                         >
//                           {monthsOptions.map((month, idx) => (
//                             <MenuItem key={idx} value={month}>{month}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </div>
//                   </div>


//                   <div className={styles.group}>
//   <label className={styles.labelEdit}>Worked Till</label>
  
//   <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
//     {/* Select Year */}
//     <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
//       <InputLabel shrink>Year</InputLabel>
//       <Select
//         label="Year"
//         name="workedUntilYear"
//         value={experience.workedUntilYear}
//         onChange={(e) => handleChange(index, e)}
//       >
//         {yearsOptions.map((year) => (
//           <MenuItem key={year} value={year}>{year}</MenuItem>
//         ))}
//       </Select>
//     </FormControl>
    
//     {/* Select Month */}
//     <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
//       <InputLabel shrink>Month</InputLabel>
//       <Select
//         label="Month"
//         name="workedUntilMonth"
//         value={experience.workedUntilMonth}
//         onChange={(e) => handleChange(index, e)}
//       >
//         {monthsOptions.map((month, idx) => (
//           <MenuItem key={idx} value={month}>{month}</MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   </div>
// </div>






//                   <div className={styles.group}>
//                     <TextField
//                       name="jobProfile"
//                       label="Job Profile"
//                       variant="outlined"
//                       fullWidth
//                       multiline
//                       rows={4}
//                       value={experience.jobProfile}
//                       onChange={(e) => handleChange(index, e)}
//                       sx={{ marginBottom: '10px', marginTop: '10px' }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </ScrollBar>

//             <div className={styles.actions}>
//               <button 
//                 type="button" 
//                 className={styles.cancelButton}
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//               <button type="submit" className={styles.saveButton}>Save</button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {toast.message && <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />}
//     </div>
//   );
// };

// export default EditExperienceTypeNo;















// import React, { useState } from 'react';
// import { TextField, RadioGroup, FormControlLabel, Radio, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
// import styles from './editExperienceTypeNo.module.css';
// import Toaster from '../../../../Toaster/toaster'; 
// import ScrollBar from '../../../../Scroll Bar/scrollBar';
// import EditExperienceTypeYes from '../Edit Experience Section Type Yes/editExperienceTypeYes'; // Import the EditExperienceTypeYes component

// const EditExperienceTypeNo = ({ onClose, onSave, initialExperiences }) => {
//   const [experiences, setExperiences] = useState(initialExperiences || [{
//     currentEmployment: '',
//     employmentType: 'Full-time',
//     companyName: '',
//     jobTitle: '',
//     joiningYear: '',
//     joiningMonth: '',
//     workedUntilYear: '',
//     workedUntilMonth: '',
//     jobProfile: '',
//   }]);

//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [showExperienceTypeYes, setShowExperienceTypeYes] = useState(false); // State to toggle EditExperienceTypeYes component
//   const [isFocused, setIsFocused] = useState(false);

//   const yearsOptions = Array.from({ length: 51 }, (_, i) => 1990 + i);
//   const monthsOptions = [
//     "January", "February", "March", "April", "May", "June", 
//     "July", "August", "September", "October", "November", "December"
//   ];

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     const newExperiences = [...experiences];
//     newExperiences[index][name] = value;
//     setExperiences(newExperiences);

//     // If the 'Yes' option is selected, show EditExperienceTypeYes component
//     if (name === 'currentEmployment' && value === 'Yes') {
//       setShowExperienceTypeYes(true);
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const id = localStorage.getItem('id');
//       const responseGet = await fetch(`${Base_URL}/api/profile/${id}`);
//       if (!responseGet.ok) {
//         setToast({ message: 'Failed to fetch profile data', type: 'error' });
//         return;
//       }
//       const profileData = await responseGet.json();
  
//       const updatedWorkExperience = [
//         ...profileData.workExperience,
//         ...experiences,
//       ];
  
//       const responseUpdate = await fetch(`${Base_URL}/api/profile/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ workExperience: updatedWorkExperience }),
//       });
  
//       if (responseUpdate.ok) {
//         onSave(updatedWorkExperience); // Send updated data to parent
//         setToast({ message: 'Profile Updated Successful', type: 'success' });
//       } else {
//         setToast({ message: 'Failed to save data', type: 'error' });
//       }
//     } catch (error) {
//       console.error('Error saving data:', error);
//       setToast({ message: 'Error saving data. Please try again.', type: 'error' });
//     }
//   };
  




//   const closeToaster = () => {
//     setToast({ message: '', type: '' });
//   };

//   // If 'Yes' is selected, render EditExperienceTypeYes component
//   if (showExperienceTypeYes) {
//     return <EditExperienceTypeYes onClose={() => setShowExperienceTypeYes(false)} />;
//   }

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.formWrapper}>
//         <div className={styles.container}>
//           <h2 className={styles.heading}>Work Experience</h2>
//           <form className={styles.form} onSubmit={handleSubmit}>
//             <ScrollBar>
//               {experiences.map((experience, index) => (
//                 <div key={index} className={styles.experienceSection}>


//                   {/* <div className={styles.group}>
//                     <FormControl component="fieldset">
//                       <label className={styles.labelEdit}>Employment Type</label>
//                       <RadioGroup
//                         row
//                         name="employmentType"
//                         value={experience.employmentType}
//                         onChange={(e) => handleChange(index, e)}
//                         sx={{ marginBottom: '10px' }}
//                       >
//                         <FormControlLabel value="Full-time" control={<Radio />} label="Full-time" />
//                         <FormControlLabel value="Internship" control={<Radio />} label="Internship" />
//                       </RadioGroup>
//                     </FormControl>
//                   </div> */}

// <div className={styles.group}>
//   <FormControl component="fieldset">
//     <label className={styles.labelEdit}>Employment Type</label>
//     <RadioGroup
//       row
//       name="employmentType"
//       value={experience.employmentType}
//       onChange={(e) => handleChange(index, e)}
//       sx={{ marginBottom: '6px' }}
//     >
//       <FormControlLabel
//         value="Full-time"
//         control={<Radio />}
//         label="Full-time"
//         sx={{
//           color: experience.employmentType === "Full-time" ? 'black' : '#767676',
//         }}
//       />
//       <FormControlLabel
//         value="Internship"
//         control={<Radio />}
//         label="Internship"
//         sx={{
//           color: experience.employmentType === "Internship" ? 'black' : '#767676',
//         }}
//       />
//     </RadioGroup>
//   </FormControl>
// </div>



//                   <div className={styles.group}>
//                     <TextField
//                       name="companyName"
//                       label="Previous Company Name"
//                       variant="outlined"
//                       fullWidth
//                       value={experience.companyName}
//                       onChange={(e) => handleChange(index, e)}
//                       // sx={{ marginBottom: '10px', marginTop: '10px' }}
//                       sx={{
//         marginBottom: '10px', marginTop: '10px',
//                         '& > :not(style)': { 
                            
//                             height: '36px',
//                             // width:'624px',
//                             // marginBottom:'10px'
                
//                         },
//                         '& .MuiInputLabel-root': {
//                               // fontSize: '15px',
//                               position: 'absolute',
//                               top:  experience.companyName? '0px' : '-8px',
//                               color: '#BDBDBD',
//                               padding: '0',
//                             },
//                             '& .MuiInputLabel-root.Mui-focused': {
//                               color: '#2A85FE',
//                               top: '0px',
//                             },
                       
//                     }}
//                     />
//                   </div>

//                   <div className={styles.group}>
//                     <TextField
//                       name="jobTitle"
//                       label="Previous Job Title"
//                       variant="outlined"
//                       fullWidth
//                       value={experience.jobTitle}
//                       onChange={(e) => handleChange(index, e)}
//                       // sx={{ marginBottom: '15px' }}
//                       sx={{
//                         marginBottom: '10px', marginTop: '10px',
//                                         '& > :not(style)': { 
                                            
//                                             height: '36px',
//                                             // width:'624px',
//                                             // marginBottom:'10px'
                                
//                                         },
//                                         '& .MuiInputLabel-root': {
//                                               // fontSize: '15px',
//                                               position: 'absolute',
//                                               top:  experience.jobTitle? '0px' : '-8px',
//                                               color: '#BDBDBD',
//                                               padding: '0',
//                                             },
//                                             '& .MuiInputLabel-root.Mui-focused': {
//                                               color: '#2A85FE',
//                                               top: '0px',
//                                             },
                                       
//                                     }}
//                     />
//                   </div>

//                   <div className={styles.group}>
//                     <label className={styles.labelEdit}>Joining Date</label>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '15px' }}>
//                       <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
//                         <InputLabel
//                           sx={{
//                             // color: !!errors.totalExperienceYears ? 'red' : '#BDBDBD',
//                             position:'absolute',
//                             top: isFocused || experience?.joiningYear ? '0px' : '-8px',  // Label turns red on error
//                           }}
//                            >Year</InputLabel>
//                         <Select
//                           label="Year"
//                           name="joiningYear"
//                           value={experience.joiningYear}
//                           onChange={(e) => handleChange(index, e)}
//     MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}

//                           sx={{
//                             '& .MuiSelect-select': {
//                               width: '260px',
//                               height: '36px', // Set the height to 36px
//                               paddingTop: 0, // Override padding
//                               paddingBottom: 0, // Override padding
//                               lineHeight: '36px', // Align text to the middle by controlling line-height
//                               display: 'flex',
//                               position:'relative',
//                               alignItems: 'center', // Align items vertically
//                             },
                           
//                           }}
//                         >
//                           {yearsOptions.map((year) => (
//                             <MenuItem key={year} value={year}>{year}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>

//                       <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
//                         <InputLabel     sx={{
//                             // color: !!errors.totalExperienceYears ? 'red' : '#BDBDBD',
//                             position:'absolute',
//                             top: isFocused || experience?.joiningMonth ? '0px' : '-8px',  // Label turns red on error
//                           }}>Month</InputLabel>
//                         <Select
//                           label="Month"
//                           name="joiningMonth"
//                           value={experience.joiningMonth}
//                           onChange={(e) => handleChange(index, e)}
//     MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}

//                           sx={{
//                             '& .MuiSelect-select': {
//                               width: '260px',
//                               height: '36px', // Set the height to 36px
//                               paddingTop: 0, // Override padding
//                               paddingBottom: 0, // Override padding
//                               lineHeight: '36px', // Align text to the middle by controlling line-height
//                               display: 'flex',
//                               position:'relative',
//                               alignItems: 'center', // Align items vertically
//                             },
                           
//                           }}
//                         >
//                           {monthsOptions.map((month, idx) => (
//                             <MenuItem key={idx} value={month}>{month}</MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </div>
//                   </div>


//                   <div className={styles.group} >
//   <label className={styles.labelEdit} >Worked Till</label>
  
//   <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop:'13px',marginBottom:'15px' }}>
//     {/* Select Year */}
//     <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
//       <InputLabel 
//           sx={{
//             // color: !!errors.totalExperienceYears ? 'red' : '#BDBDBD',
//             position:'absolute',
//             top: isFocused || experience?.workedUntilYear ? '0px' : '-8px',  // Label turns red on error
//           }}>Year</InputLabel>
//       <Select
//         label="Year"
//         name="workedUntilYear"
//         value={experience.workedUntilYear}
//         onChange={(e) => handleChange(index, e)}
//     MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}

//         sx={{
//           '& .MuiSelect-select': {
//             width: '260px',
//             height: '36px', // Set the height to 36px
//             paddingTop: 0, // Override padding
//             paddingBottom: 0, // Override padding
//             lineHeight: '36px', // Align text to the middle by controlling line-height
//             display: 'flex',
//             position:'relative',
//             alignItems: 'center', // Align items vertically
//           },
         
//         }}
//       >
//         {yearsOptions.map((year) => (
//           <MenuItem key={year} value={year}>{year}</MenuItem>
//         ))}
//       </Select>
//     </FormControl>
    
//     {/* Select Month */}
//     <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
//       <InputLabel  sx={{
//             // color: !!errors.totalExperienceYears ? 'red' : '#BDBDBD',
//             position:'absolute',
//             top: isFocused || experience?.workedUntilYear ? '0px' : '-8px',  // Label turns red on error
//           }}>Month</InputLabel>
//       <Select
//         label="Month"
//         name="workedUntilMonth"
//         value={experience.workedUntilMonth}
//         onChange={(e) => handleChange(index, e)}
//     MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}

//         sx={{
//           '& .MuiSelect-select': {
//             width: '260px',
//             height: '36px', // Set the height to 36px
//             paddingTop: 0, // Override padding
//             paddingBottom: 0, // Override padding
//             lineHeight: '36px', // Align text to the middle by controlling line-height
//             display: 'flex',
//             position:'relative',
//             alignItems: 'center', // Align items vertically
//           },
         
//         }}
//       >
//         {monthsOptions.map((month, idx) => (
//           <MenuItem key={idx} value={month}>{month}</MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   </div>
// </div>






//                   <div className={styles.group}>
//                     <TextField
//                       name="jobProfile"
//                       label="Job Profile"
//                       variant="outlined"
//                       fullWidth
//                       multiline
//                       rows={4}
//                       value={experience.jobProfile}
//                       onChange={(e) => handleChange(index, e)}
//                       sx={{ marginBottom: '10px', marginTop: '10px' }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </ScrollBar>

//             <div className={styles.actions}>
//               <button 
//                 type="button" 
//                 className={styles.cancelButton}
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//               <button type="submit" className={styles.saveButton}>Save</button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {toast.message && <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />}
//     </div>
//   );
// };

// export default EditExperienceTypeNo;




































import { Base_URL } from '../../../../../const/const';



import React, { useState } from 'react';
import { TextField, RadioGroup, FormControlLabel, Radio, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import styles from './editExperienceTypeNo.module.css';
import Toaster from '../../../../Toaster/toaster'; 
import ScrollBar from '../../../../Scroll Bar/scrollBar';
import EditExperienceTypeYes from '../Edit Experience Section Type Yes/editExperienceTypeYes'; // Import the EditExperienceTypeYes component

const EditExperienceTypeNo = ({ onClose, onSave, initialExperiences }) => {
  // const [companyNameFocused, setCompanyNameFocused] = useState(false)
  const [experiences, setExperiences] = useState(initialExperiences || [{
    currentEmployment: '',
    employmentType: 'Full-time',
    companyName: '',
    jobTitle: '',
    joiningYear: '',
    joiningMonth: '',
    workedUntilYear: '',
    workedUntilMonth: '',
    jobProfile: '',
  }]);

  const [toast, setToast] = useState({ message: '', type: '' });
  const [showExperienceTypeYes, setShowExperienceTypeYes] = useState(false); // State to toggle EditExperienceTypeYes component
  const [isJoinDateYearFocused, setIsJoinDateYearFocused] = useState(false);
  const [isJoinDateMonthFocused, setIsJoinDateMonthFocused] = useState(false);
  const [isWorkedTillYearFocused, setIsWorkedTillYearFocused] = useState(false);
  const [isWorkedTillMonthFocused, setIsWorkedTillMonthFocused] = useState(false);

  const yearsOptions = Array.from({ length: 51 }, (_, i) => 1990 + i);
  const monthsOptions = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newExperiences = [...experiences];
    newExperiences[index][name] = value;
    setExperiences(newExperiences);

    // If the 'Yes' option is selected, show EditExperienceTypeYes component
    if (name === 'currentEmployment' && value === 'Yes') {
      setShowExperienceTypeYes(true);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem('id');
      const responseGet = await fetch(`${Base_URL}/api/profile/${id}`);
      if (!responseGet.ok) {
        setToast({ message: 'Failed to fetch profile data', type: 'error' });
        return;
      }
      const profileData = await responseGet.json();
  
      const updatedWorkExperience = [
        ...profileData.workExperience,
        ...experiences,
      ];
  
      const responseUpdate = await fetch(`${Base_URL}/api/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workExperience: updatedWorkExperience }),
      });
  
      if (responseUpdate.ok) {
        onSave(updatedWorkExperience); // Send updated data to parent
        setToast({ message: 'Profile Updated Successful', type: 'success' });
      } else {
        setToast({ message: 'Failed to save data', type: 'error' });
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setToast({ message: 'Error saving data. Please try again.', type: 'error' });
    }
  };
  




  const closeToaster = () => {
    setToast({ message: '', type: '' });
  };

  // If 'Yes' is selected, render EditExperienceTypeYes component
  if (showExperienceTypeYes) {
    return <EditExperienceTypeYes onClose={() => setShowExperienceTypeYes(false)} />;
  }



  return (
    <div className={styles.overlay}>
      <div className={styles.formWrapper}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Work Experience</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* <ScrollBar> */}
              {experiences.map((experience, index) => (
                <div key={index} className={styles.experienceSection}>


                  {/* <div className={styles.group}>
                    <FormControl component="fieldset">
                      <label className={styles.labelEdit}>Employment Type</label>
                      <RadioGroup
                        row
                        name="employmentType"
                        value={experience.employmentType}
                        onChange={(e) => handleChange(index, e)}
                        sx={{ marginBottom: '10px' }}
                      >
                        <FormControlLabel value="Full-time" control={<Radio />} label="Full-time" />
                        <FormControlLabel value="Internship" control={<Radio />} label="Internship" />
                      </RadioGroup>
                    </FormControl>
                  </div> */}

<div className={styles.group}>
  <FormControl component="fieldset">
    <label className={styles.labelEdit}>Employment Type</label>
    <RadioGroup
      row
      name="employmentType"
      value={experience.employmentType}
      onChange={(e) => handleChange(index, e)}
      sx={{ marginBottom: '6px' }}
    >
      <FormControlLabel
        value="Full-time"
        control={<Radio />}
        label="Full-time"
        sx={{
          color: experience.employmentType === "Full-time" ? 'black' : '#767676',
        }}
      />
      <FormControlLabel
        value="Internship"
        control={<Radio />}
        label="Internship"
        sx={{
          color: experience.employmentType === "Internship" ? 'black' : '#767676',
        }}
      />
    </RadioGroup>
  </FormControl>
</div>



                  <div className={styles.group} >
                    <TextField
                      name="companyName"
                      label="Previous Company Name"
                      variant="outlined"
                      fullWidth
                      // onFocus={()=>{setCompanyNameFocused(true)}}
                      // onBlur={()=>{setCompanyNameFocused(false)}}
                      value={experience.companyName}
                      onChange={(e) => handleChange(index, e)}
                      // sx={{ marginBottom: '10px', marginTop: '10px' }}
                      sx={{
      
                        '& > :not(style)': { 
                            
                            height: '36px',
                            // width:'624px',
                            // marginBottom:'10px'
                  
                        },
                        '& .MuiOutlinedInput-input:-webkit-autofill':{
                          height:'1px',
                          // WebkitBoxShadow: '0 0 0 1000px #E4F1FF inset',
                        },
                        '& .MuiInputLabel-root': {
                              fontSize: '15px',
                              position: 'absolute',
                              top:  experience?.companyName ? '0px' : '-7px',
                              color: '#BDBDBD',
                              padding: '0',
                            },
                          '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  border: '1px solid #D2D2D2',
                                  borderColor: '#BDBDBD',
                                },
                                '&:hover fieldset': {
                                  border: '2px solid #2A85FE',
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
                                color: '#2A85FE',
                              },'& .MuiInputLabel-root:hover + .MuiOutlinedInput-root fieldset': {
                                border: '2px solid #2A85FE',
                                borderColor: '#2A85FE',
                            }
                            ,'& .MuiOutlinedInput-input':{
                              height:'1px'
                            }
                    }}
                    />
                  </div>

                  <div className={styles.group} style={{marginTop:'16px',
                            marginBottom:'4px',}}>
                    <TextField
                      name="jobTitle"
                      label="Previous Job Title"
                      variant="outlined"
                      fullWidth
                      value={experience.jobTitle}
                      onChange={(e) => handleChange(index, e)}
                      // sx={{ marginBottom: '15px' }}
                      sx={{
      
                        '& > :not(style)': { 
                            
                            height: '36px',
                            // width:'624px',
                            // marginBottom:'10px'
                  
                        },
                        '& .MuiOutlinedInput-input:-webkit-autofill':{
                          height:'1px',
                          // WebkitBoxShadow: '0 0 0 1000px #E4F1FF inset',
                        },
                        '& .MuiInputLabel-root': {
                              fontSize: '15px',
                              position: 'absolute',
                              top:  experience?.jobTitle ? '0px' : '-7px',
                              color: '#BDBDBD',
                              padding: '0',
                            },
                          '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  border: '1px solid #D2D2D2',
                                  borderColor: '#BDBDBD',
                                },
                                '&:hover fieldset': {
                                  border: '2px solid #2A85FE',
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
                                color: '#2A85FE',
                              },'& .MuiInputLabel-root:hover + .MuiOutlinedInput-root fieldset': {
                                border: '2px solid #2A85FE',
                                borderColor: '#2A85FE',
                            }
                            ,'& .MuiOutlinedInput-input':{
                              height:'1px'
                            }
                    }} />
                  </div>

                  <div className={styles.group} >
                    <label className={styles.labelEdit}>Joining Date</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '15px' }}>
                      <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
                        <InputLabel
                          sx={{
                            // color: !!errors.totalExperienceYears ? 'red' : '#BDBDBD',
                            position:'absolute',
                            top: isJoinDateYearFocused || experience?.joiningYear ? '0px' : '-9px',  // Label turns red on error
                          }}
                           >Year</InputLabel>
                        <Select
                          label="Year"
                          onFocus={() => {setIsJoinDateYearFocused(true);} }
                          onBlur={() => setIsJoinDateYearFocused(false)}
                          name="joiningYear"
                          value={experience.joiningYear}
                          onChange={(e) => handleChange(index, e)}
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
                          }}
                        >
                          {yearsOptions.map((year) => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
                        <InputLabel     sx={{
                            // color: !!errors.totalExperienceYears ? 'red' : '#BDBDBD',
                            position:'absolute',
                            top: isJoinDateMonthFocused || experience?.joiningMonth ? '0px' : '-9px',   // Label turns red on error
                          }}>Month</InputLabel>
                        <Select
                          label="Month"
                          name="joiningMonth"
                          value={experience.joiningMonth}
                          onFocus={() => {setIsJoinDateMonthFocused(true);} }
                          onBlur={() => setIsJoinDateMonthFocused(false)}
                          onChange={(e) => handleChange(index, e)}
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
                          }}
                        >
                          {monthsOptions.map((month, idx) => (
                            <MenuItem key={idx} value={month}>{month}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>


                  <div className={styles.group} style={{marginTop:'5px'}} >
  <label className={styles.labelEdit} >Worked Till</label>
  
  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop:'13px',marginBottom:'15px' }}>
    {/* Select Year */}
    <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
      <InputLabel 
          sx={{
            // color: !!errors.totalExperienceYears ? 'red' : '#BDBDBD',
            position:'absolute',
            top: isWorkedTillYearFocused || experience?.workedUntilYear ? '0px' : '-9px',  // Label turns red on error
          }}>Year</InputLabel>
      <Select
        label="Year"
        onFocus={() => {setIsWorkedTillYearFocused(true);} }
        onBlur={() => setIsWorkedTillYearFocused(false)}
        name="workedUntilYear"
        value={experience.workedUntilYear}
        onChange={(e) => handleChange(index, e)}
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
        }}
      >
        {yearsOptions.map((year) => (
          <MenuItem key={year} value={year}>{year}</MenuItem>
        ))}
      </Select>
    </FormControl>
    
    {/* Select Month */}
    <FormControl variant="outlined" style={{ flex: 1 }} className={styles.selectWrapper}>
      <InputLabel  sx={{
            // color: !!errors.totalExperienceYears ? 'red' : '#BDBDBD',
            position:'absolute',
            top: isWorkedTillMonthFocused || experience?.workedUntilMonth ? '0px' : '-9px',  // Label turns red on error
          }}>Month</InputLabel>
      <Select
        label="Month"
        name="workedUntilMonth"
        value={experience.workedUntilMonth}
        onFocus={() => {setIsWorkedTillMonthFocused(true);} }
        onBlur={() => setIsWorkedTillMonthFocused(false)}
        onChange={(e) => handleChange(index, e)}
        MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}
        sx={{
          '& .MuiSelect-select': {
            width: '260px',
            height: '36px', // Set the height to 36px
            paddingTop: 0, // Override padding
            paddingBottom: 0, // Override padding
            lineHeight: '36px', // Align text to the middle by controlling line-height
            display: 'flex',
            // position:'relative',
            alignItems: 'center', // Align items vertically
          },
          //   '& .MuiInputLabel-root':{
          //     color:'red',
          //     position:'absolute',
          //     // top:'0px'
          //     top: true ? '-4px' : '-11px',
          // }
        }}
        
      >
        {monthsOptions.map((month, idx) => (
          <MenuItem key={idx} value={month}>{month}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
</div>






                  <div className={styles.group}>
                  <TextField
  name="jobProfile"
  label="Job Profile"
  variant="outlined"
  fullWidth
  multiline
  rows={4}
  value={experience.jobProfile}
  onChange={(e) => handleChange(index, e)}
  sx={{
    marginBottom: '10px',
    marginTop: '10px',
    '& .MuiOutlinedInput-root': {
      padding: '15px',
      '& fieldset': {
        border: '1px solid #D2D2D2',
      },
      '&:hover fieldset': {
        border: '2px solid #2A85FE',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #2A85FE',
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '15px',
      color: '#BDBDBD',
      '&.Mui-focused': {
        color: '#2A85FE',
      },
    },
    '& textarea': {
      height: '100px',
      
      overflow: 'auto', // Ensure overflow is enabled
      resize: 'none',   // Prevent resizing of textarea
      scrollbarWidth: 'thin', // For Firefox
      '&::-webkit-scrollbar': {
        position:'relative',
        right:'-20px',
        width: '6px', // Width of the scrollbar
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#2A85FE', // Scrollbar thumb color
        borderRadius: '3px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1', // Scrollbar track color
      },
    },
  }}
/>

                  </div>
                </div>
              ))}
            {/* </ScrollBar> */}

            <div className={styles.actions}>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className={styles.saveButton}>Save</button>
            </div>
          </form>
        </div>
      </div>

      {toast.message && <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />}
    </div>
  );
};

export default EditExperienceTypeNo;
