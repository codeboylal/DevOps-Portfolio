// import React, { useState } from 'react';
// import styles from './editSkills.module.css';
// import Toaster from '../../../Toaster/toaster'; // Ensure correct path
// import { TextField } from '@mui/material';

// const EditSkillForm = ({ onClose, onAddSkill, currentSkills, totalSkillsCount }) => {
//   const [skill, setSkill] = useState('');
//   const [selectedSkills, setSelectedSkills] = useState([]); // Temporary list of skills
//   const [toast, setToast] = useState({ message: '', type: '' });
//   const MAX_SKILLS = 10;

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault(); // Prevent form submission
//       addSkillToTemporaryList();
//     }
//   };

//   const addSkillToTemporaryList = () => {
//     if (!skill.trim()) {
//       setToast({ message: 'Skill cannot be empty!', type: 'error' });
//       return;
//     }

//     // Check if total skills exceed the limit
//     if (totalSkillsCount + selectedSkills.length >= MAX_SKILLS) {
//       setToast({ message: 'You have reached the maximum skill limit!', type: 'error' });
//       return;
//     }

//     if (selectedSkills.includes(skill) || currentSkills.includes(skill)) {
//       setToast({ message: 'Skill already selected or exists!', type: 'error' });
//       return;
//     }

//     setSelectedSkills([...selectedSkills, skill]);
//     setSkill(''); // Clear the input
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (selectedSkills.length === 0) {
//       setToast({ message: 'Please add at least one skill.', type: 'error' });
//       return;
//     }
  
//     try {
//       const id = localStorage.getItem('id'); // Ensure the ID is stored in local storage
  
//       // Add each skill individually
//       for (let skill of selectedSkills) {
//         const response = await fetch(`${Base_URL}/api/profile/skills/${id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ skillName: skill }), // Pass skillName here
//         });
  
//         if (!response.ok) {
//           setToast({ message: 'Failed to add some skills.', type: 'error' });
//           return;
//         }
//       }
  
//       // Update UI
//       selectedSkills.forEach(skill => onAddSkill(skill));
//       setToast({ message: ' Skills updated successfully!', type: 'success' });
//       setSelectedSkills([]); // Clear the temporary list
//       onClose(); // Close the form
//     } catch (error) {
//       console.error('Error adding skills:', error);
//       setToast({ message: 'An error occurred. Please try again.', type: 'error' });
//     }
//   };
  
//   // Remove a skill from the selected list
//   const removeSelectedSkill = (skillToRemove) => {
//     setSelectedSkills(selectedSkills.filter(s => s !== skillToRemove));
//   };

//   // Close toaster handler
//   const closeToaster = () => setToast({ message: '', type: '' });

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.formWrapper}>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <h2 className={styles.headLine}>Skills</h2>
//           <div className={styles.inputWrapper}>
//             <TextField
//             variant="outlined"
//             // className={styles.textArea}
//             // value={headline}
//             label="skill name"
//               className={styles.typetext}
//               type="text"
//               value={skill}
//               onChange={(e) => setSkill(e.target.value)}
//               onKeyDown={handleKeyDown} // Listen for Enter key
//               required
//             />
//           </div>

//           {/* Display selected skills below the input */}
//           {selectedSkills.length > 0 && (
//             <div className={styles.selectedSkillsContainer}>
//               {selectedSkills.map((s, index) => (
//                 <div key={index} className={styles.selectedSkill}>
//                   {s}
//                   <span className={styles.removeIcon} onClick={() => removeSelectedSkill(s)}>
//                     ✕
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className={styles.buttonWrapper}>
//             <button type="button" className={styles.cancelButton} onClick={onClose}>
//               Cancel
//             </button>
//             <button type="submit" className={styles.addButton}>
//               Add
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Render the toaster when there's a message */}
//       {toast.message && (
//         <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
//       )}
//     </div>
//   );
// };

// export default EditSkillForm;










import React, { useEffect, useState } from 'react';
import styles from './editSkills.module.css';
// import Toaster from '../../../Toaster/toaster'; // Ensure correct path
import {useToaster} from "../../../Toaster.js";
import { TextField } from '@mui/material';

import { Base_URL } from '../../../../const/const.js';

const EditSkillForm = ({ onClose, onAddSkill, currentSkills, totalSkillsCount }) => {

  const setToast = useToaster();
  const [skillCollection , setSkillCollection] = useState([]);
  const [skill, setSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]); // Temporary list of skills
  const [submittedSkills, setSubmittedSkills] = useState([]); // Track submitted skills
  // const [toast, setToast] = useState({ message: '', type: '' });
  const [error, setError] = useState(''); // Track error messages for the TextField
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if submission is in progress
  const MAX_SKILLS = 10;


  useEffect(()=>{
    if(currentSkills){
      setSkillCollection(currentSkills)
    }
  },[currentSkills])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      addSkillToTemporaryList();
    }
  };

  const addSkillToTemporaryList = () => {
    if (!skill.trim()) {
      setError('Skill cannot be empty!');
      return;
    }

    // Check if total skills exceed the limit
    if (totalSkillsCount + selectedSkills.length >= MAX_SKILLS) {
      setError('You have reached the maximum skill limit!');
      return;
    }

    if (selectedSkills.includes(skill) || skillCollection.includes(skill)) {
      setError('Skill already selected or exists!');
      return;
    }else{
      console.log(currentSkills,selectedSkills)
    }

    setSelectedSkills([...selectedSkills, skill.trim()]);
    setSkill(''); // Clear the input
    setError(''); // Clear the error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if already submitting
    if (isSubmitting) {
      return;
    }

    if (selectedSkills.length === 0) {
      setError('Please add at least one skill.');
      return;
    }

    // Prevent re-submission of already submitted skills
    const newSkillsToSubmit = selectedSkills.filter((s) => !submittedSkills.includes(s));

    if (newSkillsToSubmit.length === 0) {
      setToast( 'All selected skills have already been submitted!',  'error' );
      return;
    }

    try {
      setIsSubmitting(true); // Set submitting state to true
      const id = localStorage.getItem('id'); // Ensure the ID is stored in local storage

      // Add each skill individually
      for (let skill of newSkillsToSubmit) {
        const response = await fetch(`${Base_URL}/api/profile/skills/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ skillName: skill }), // Pass skillName here
        });

        if (!response.ok) {
          setToast( 'Failed to add some skills.',  'error' );
          setIsSubmitting(false); // Reset submitting state
          return;
        }
      }

      // Update UI
      newSkillsToSubmit.forEach((skill) => {
        onAddSkill(skill);
        setSubmittedSkills((prevSkills) => [...prevSkills, skill]); // Add to submitted skills
      });

      setToast('Skills updated successfully!', 'success' );
      setSelectedSkills([]); // Clear the temporary list
      onClose(); // Close the form
    } catch (error) {
      console.error('Error adding skills:', error);
      setToast('An error occurred. Please try again.',  'error' );
    } finally {
      setIsSubmitting(false); // Reset submitting state after completion
    }
  };

  // Remove a skill from the selected list
  const removeSelectedSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skillToRemove));
  };

  // Close toaster handler
  // const closeToaster = () => setToast({ message: '', type: '' });

  const [skillFocused, setIsSkillFocused] = useState(false);

  return (
    <div className={styles.overlay}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.headLine}>Skills</h2>
          <div className={styles.inputWrapper}>
            {/* <TextField
              variant="outlined"
              label="Skill name"
              className={styles.typetext}
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyDown={handleKeyDown} // Listen for Enter key
              // required
              error={!!error} // Set error state if there's a message
              helperText={error} // Display error message below the TextField
            /> */}
            <TextField
              className={styles.typetext}
              type="text"
              variant="outlined"
              label="Skill name"
              // name="universityName"
              onFocus={() => {setIsSkillFocused(true); setError('') } } 
              onBlur={() => setIsSkillFocused(false)}
              onKeyDown={handleKeyDown}
              value={skill}
              error={!!error} 
              helperText={error}
              onChange={(e) => 
              {
                if(e?.target?.value?.length <= 10){
                  setSkill(e.target.value)
                  setError("")
                }else{
                  setError("Skill length Can't be Greater than 10 characters")
                  return
                }
                if(/^[a-zA-Z\s]+$/.test(e?.target?.value)){
                  setSkill(e.target.value)
                  setError("")
                }else{
                  setError("Skill Can only include letters and space")
                  return
                }
              }
            }
              sx={{
      
                // '& > :not(style)': { 
                    
                //     height: '42px',
                //     // width:'624px',
                //     // marginBottom:'10px'
          
                // },
                '& .MuiOutlinedInput-input:-webkit-autofill':{
                  height:'3px',
                  // WebkitBoxShadow: '0 0 0 1000px #E4F1FF inset',
                },
                '& .MuiInputLabel-root': {
                      fontSize: '15px',
                      position: 'absolute',
                      top: skillFocused || skill ? '0px' : '-9px',
                      color: error ? 'red' : '#BDBDBD',
                      padding: '0',
                    },
                  '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border:  '1px solid #D2D2D2',
                          borderColor:  error ? 'red' : '#BDBDBD',
                        },
                        '&:hover fieldset': {
                          border: '2px solid #2A85FE',
                          borderColor: error ? 'red' : '#2A85FE',
                        },
                        '&.Mui-focused fieldset': {
                          border: '2px solid #2A85FE',
                          borderColor: error ? 'red' : '#2A85FE',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: error ? 'red' : '#2A85FE',
                        top: '0px',
                      },
                      '&:hover .MuiInputLabel-root': {
                        color: error ? 'red' : '#2A85FE',
                      },'& .MuiInputLabel-root:hover + .MuiOutlinedInput-root fieldset': {
                        border: '2px solid #2A85FE',
                        borderColor: error ? 'red' : '#2A85FE',
                    },
                    '& .MuiOutlinedInput-input':{
                      height:'1px'
                    },'& .Mui-error':{
                      color:'red',
                      marginLeft:'0px'
                    }
                }}
            />
          </div>

          {/* Display selected skills below the input */}
          {selectedSkills.length > 0 && (
            <div className={styles.selectedSkillsContainer}>
              {selectedSkills.map((s, index) => (
                <div key={index} className={styles.selectedSkill}>
                  {s}
                  <span className={styles.removeIcon} onClick={() => removeSelectedSkill(s)}>
                    ✕
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className={styles.buttonWrapper}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.addButton} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add'}
            </button>
          </div>
        </form>
      </div>

      {/* Render the toaster when there's a message */}
      {/* {toast.message && (
        <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
      )} */}
    </div>
  );
};

export default EditSkillForm;
