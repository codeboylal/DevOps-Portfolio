import React, { useEffect, useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Radio, RadioGroup, FormControlLabel, FormLabel, Checkbox, Button, FormHelperText } from '@mui/material';
import styles from './editEducationDetails.module.css';
import { Base_URL } from '../../../../const/const';
const EditEducationDetails = ({ onClose, onSave , editItem , editEducationData}) => {
  const [formData, setFormData] = useState({
    education: '',
  universityName: '',
  courseName: '',
  specialization: '',
  courseType: '',
  startYear: '',
  endYear: '',
  marks: '',
  primary: false,
  });
  useEffect(() => {
    if (editEducationData) {
      setFormData({
        education: editEducationData?.education || '',
        universityName: editEducationData?.universityName || '',
        courseName: editEducationData?.courseName || '',
        specialization: editEducationData?.specialization || '',
        courseType: editEducationData?.courseType || '',
        startYear: editEducationData?.startYear || '',
        endYear: editEducationData?.endYear || '',
        marks: editEducationData?.marks || '',
        primary: false, 
      });
    }
  }, [editEducationData]);


  const [formErrors, setFormErrors] = useState({
    education: false,
    universityName: false,
    courseName: false,
    startYear: false,
    endYear: false,
    courseType: false,
  });

  const years = Array.from({ length: 51 }, (_, i) => 1990 + i); // Generate array for years 1990-2040
  const marks = Array.from({ length: 100 }, (_, i) => i + 1);   // Generate array for marks 1-100

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setFormErrors({ ...formErrors, [name]: false }); // Reset error when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const errors = {
      education: formData.education === '',
      universityName: formData.universityName === '',
      courseName: formData.courseName === '',
      startYear: formData.startYear === '',
      endYear: formData.endYear === '',
      courseType: formData.courseType === '',
    };

    if (Object.values(errors).some(error => error)) {
      setFormErrors(errors); // Set the error state for empty fields
      return; // Prevent form submission if there are validation errors
    }

    try {
      const id = localStorage.getItem('id');
      // console.log(editItem)
      const response = await fetch(`${Base_URL}/api/profile/education/${id}/${editItem}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      } else {
        console.error('Failed to save education details.');
      }
    } catch (error) {
      console.error('Error saving education details:', error);
    }
  };
  const [isFocused, setIsFocused] = useState(false);
  const [isCourseNameFocused, setIsCourseNameFocused] = useState(false);
  const [isCourseUniversityFocused, setIsCourseUniversityFocused] = useState(false);
  const [isStartYearFocused, setIsStartyearFocused] = useState(false);
  const [isEndYearFocused, setIsEndYearFocused] = useState(false);

  const focusInput = (e) =>{
    const fieldName = e?.target?.name; // Get the field name from the event
    // console.log(e?.target?.name)
    if (formErrors[fieldName]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "", // Clear only the specific field's error
      }));
    }
    if(e?.target?.name === undefined){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [e]: "", // Clear only the specific field's error
      }));
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.educationForm}>
        <h2 className={styles.headline}>Education</h2>

        <div className={styles.row}>
          <FormControl fullWidth variant="outlined" className={styles.inputClass} error={formErrors.education}>
            <InputLabel
               sx={{
                color: formErrors?.education ? 'red' : '#BDBDBD',
                position:'absolute',
                top: isFocused || formData?.education ? '0px' : '-8px',  // Label turns red on error
              }}
            >Education</InputLabel>
            <Select
              label="Education"
              name="education"
              onFocus={() => {setIsFocused(true); focusInput("education") } }
              onBlur={() => setIsFocused(false)}
              
              value={formData?.education}
              onChange={handleChange}
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
                    borderColor: formErrors?.education ? 'red' : '#BDBDBD',  // Border turns red on error
                  },
                  '&:hover fieldset': {
                    borderColor: formErrors?.education ? 'red' : '#BDBDBD',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: formErrors?.education ? 'red' : '#BDBDBD',
                    borderWidth: '1px',
                  },
                },
              }}
            >
              <MenuItem value="">Select education</MenuItem>
              <MenuItem value="Bachelor">Bachelor's</MenuItem>
              <MenuItem value="Master">Master's</MenuItem>
              <MenuItem value="Diploma">Diploma</MenuItem>
              <MenuItem value="PhD">PhD</MenuItem>
              <MenuItem value="School">School</MenuItem>
            </Select>
            {formErrors.education && <span className={styles.errorText}>Please fill out this field.</span>}
          </FormControl>

          <div style={{display:'flex',flexDirection:'column',width:'50%'}}>
            <TextField
              className={styles.inputClass}
              variant="outlined"
              label="University Name"
              name="universityName"
              onFocus={(e) => {setIsCourseUniversityFocused(true); focusInput(e) } }
              onBlur={() => setIsCourseUniversityFocused(false)}
              value={formData.universityName}
              onChange={handleChange}
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
                      top: isCourseUniversityFocused || formData.universityName? '0px' : '-8px',
                      color: formErrors?.universityName ? 'red' : '#BDBDBD',
                      padding: '0',
                    },
                  '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border:  '1px solid #D2D2D2',
                          borderColor:  formErrors?.universityName ? 'red' : '#BDBDBD',
                        },
                        '&:hover fieldset': {
                          border: '2px solid #2A85FE',
                          borderColor: formErrors?.universityName ? 'red' : '#2A85FE',
                        },
                        '&.Mui-focused fieldset': {
                          border: '2px solid #2A85FE',
                          borderColor: formErrors?.universityName ? 'red' : '#2A85FE',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: formErrors?.universityName ? 'red' : '#2A85FE',
                        top: '0px',
                      },
                      '&:hover .MuiInputLabel-root': {
                        color: formErrors?.universityName ? 'red' : '#2A85FE',
                      },'& .MuiInputLabel-root:hover + .MuiOutlinedInput-root fieldset': {
                        border: '2px solid #2A85FE',
                        borderColor: formErrors?.universityName ? 'red' : '#2A85FE',
                    },
                    '& .MuiOutlinedInput-input':{
                      height:'1px'
                    }
                }}
            />
            {formErrors.universityName && <span className={styles.errorText}>Please fill out this field.</span>}
          </div>
        </div>

        <div className={styles.row}>
          <div  style={{display:'flex',flexDirection:'column',width:'48.5%'}}>
          <TextField
            className={styles.inputClass}
            variant="outlined"
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            onFocus={(e) => {setIsCourseNameFocused(true); focusInput(e) } }
            onBlur={() => setIsCourseNameFocused(false)}
            // error={formErrors.courseName}
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
                    top: isCourseNameFocused || formData.courseName? '0px' : '-8px',
                    color: formErrors?.courseName ? 'red' : '#BDBDBD',
                    padding: '0',
                  },
                '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border:  '1px solid #D2D2D2',
                        borderColor:  formErrors?.courseName ? 'red' : '#BDBDBD',
                      },
                      '&:hover fieldset': {
                        border: '2px solid #2A85FE',
                        borderColor: formErrors?.courseName ? 'red' : '#2A85FE',
                      },
                      '&.Mui-focused fieldset': {
                        border: '2px solid #2A85FE',
                        borderColor: formErrors?.courseName ? 'red' : '#2A85FE',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: formErrors?.courseName ? 'red' : '#2A85FE',
                      top: '0px',
                    },
                    '&:hover .MuiInputLabel-root': {
                      color: formErrors?.courseName ? 'red' : '#2A85FE',
                    },'& .MuiInputLabel-root:hover + .MuiOutlinedInput-root fieldset': {
                      border: '2px solid #2A85FE',
                      borderColor: formErrors?.courseName ? 'red' : '#2A85FE',
                  },
                  '& .MuiOutlinedInput-input':{
                    height:'1px'
                  }
             
          }}
            // helperText={formErrors.courseName ? 'Please fill out this field.' : ''}
          />
          {formErrors.courseName && <span className={styles.errorText}>Please fill out this field.</span>}
          </div>

          <TextField
            className={styles.inputClass}
            variant="outlined"
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
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
                    top:  formData.specialization? '0px' : '-8px',
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
                  },
                  '& .MuiOutlinedInput-input':{
                    height:'1px'
                  }
             
          }}
          />
        </div>

        <FormLabel component="legend" className={styles.typeClass}>Course Type</FormLabel>
        <div className={styles.inlineOptions}>
          <RadioGroup
            className={styles.radioGroup}
            name="courseType"
            value={formData.courseType}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="Full Time" control={<Radio />} label="Full time" />
            <FormControlLabel value="Part Time" control={<Radio />} label="Part time" />
            <FormControlLabel value="Distance Learning" control={<Radio />} label="Distance learning" />
          </RadioGroup>
          {formErrors.courseType && <span className={styles.errorText}>Please fill out this field.</span>}
        </div>

        <div className={styles.row}>
          <FormControl fullWidth className={styles.inputClass} error={formErrors.startYear}>
            <InputLabel
            sx={{
              color: formErrors?.startYear ? 'red' : '#BDBDBD',
              position:'absolute',
              top: isStartYearFocused || formData?.startYear ? '0px' : '-8px',  // Label turns red on error
            }}
            >Starting Year</InputLabel>
            <Select
              label="Starting Year"
              name="startYear"
              onFocus={() => {setIsStartyearFocused(true); focusInput("startYear") } }
              onBlur={() => setIsStartyearFocused(false)}
              value={formData.startYear}
              onChange={handleChange}
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
                    borderColor: formErrors?.startYear ? 'red' : '#BDBDBD',  // Border turns red on error
                  },
                  '&:hover fieldset': {
                    borderColor: formErrors?.startYear ? 'red' : '#BDBDBD',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: formErrors?.startYear ? 'red' : '#BDBDBD',
                    borderWidth: '1px',
                  },
                },
              }}
            >
              <MenuItem value="">
                Start Year
              </MenuItem>
              {years.map((year, index) => (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
            {formErrors.startYear && <span className={styles.errorText}>Please fill out this field.</span>}
          </FormControl>

          <FormControl fullWidth className={styles.inputClass} error={formErrors.endYear}>
            <InputLabel
            sx={{
              color: formErrors?.endYear ? 'red' : '#BDBDBD',
              position:'absolute',
              top: isEndYearFocused || formData?.endYear ? '0px' : '-8px',  // Label turns red on error
            }}
            >Ending Year</InputLabel>
            <Select
              label="Ending Year"
              name="endYear"
              onFocus={() => {setIsEndYearFocused(true); focusInput("endYear") } }
              onBlur={() => setIsEndYearFocused(false)}
              value={formData.endYear}
              onChange={handleChange}
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
                    borderColor: formErrors?.endYear ? 'red' : '#BDBDBD',  // Border turns red on error
                  },
                  '&:hover fieldset': {
                    borderColor: formErrors?.endYear ? 'red' : '#BDBDBD',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: formErrors?.endYear ? 'red' : '#BDBDBD',
                    borderWidth: '1px',
                  },
                },
              }}
            >
              <MenuItem value="">
                End Year
              </MenuItem>
              {years.map((year, index) => (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
            {formErrors.endYear && <span className={styles.errorText}>Please fill out this field.</span>}
          </FormControl>
        </div>

        {/* <FormControl fullWidth className={styles.inputClass}>
          <InputLabel>Marks</InputLabel>
          <Select
            label="Marks"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }} // Limit dropdown height to show 10 items
          >
            {marks.map((mark, index) => (
              <MenuItem key={index} value={mark}>
                {mark}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
         */}
         <TextField
            className={styles.inputClass}
            variant="outlined"
            label="Marks"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
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
                    top:  formData.marks? '0px' : '-8px',
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
             
          }}
          />

        {/*<FormControlLabel
          control={
            <Checkbox
              name="primary"
              checked={formData.primary}
              onChange={handleChange}
            />
          }
          label="Make this as my primary graduation/diploma"
          className={styles.diplomaCheckbox}
        /> */}


        <div className={styles.buttons}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button type="submit" className={styles.saveButton}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditEducationDetails;
