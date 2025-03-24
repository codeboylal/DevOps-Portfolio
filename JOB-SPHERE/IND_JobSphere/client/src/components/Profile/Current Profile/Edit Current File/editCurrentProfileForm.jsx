
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './editCurrentProfileForm.module.css';
// import ScrollBar from '../../../Scroll Bar/scrollBar';
import { TextField, Paper,FormControl, Select, MenuItem, InputLabel, List, ListItem, ClickAwayListener, InputAdornment } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Import the dropdown arrow icon
import { industries, departments, categories } from '../../../Personalized Library/optionsLibrary'; // Import the options
import { Base_URL } from '../../../../const/const';
const EditProfileForm = ({ onClose, profileData: initialProfileData, updateProfileData }) => {
    const [profileData, setProfileData] = useState({
        currentIndustry: initialProfileData.currentIndustry || '',
        department: initialProfileData.department || '',
        roleCategory: initialProfileData.roleCategory || '',
        jobRole: initialProfileData.jobRole || '',
    });

    const [isIndustryOpen, setIsIndustryOpen] = useState(false);
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
    const [isRoleCategoryOpen, setIsRoleCategoryOpen] = useState(false); // State for role category dropdown
    const [jobRoleError, setJobRoleError] = useState(false); // State for Job Role error

    useEffect(() => {
        setProfileData({
            currentIndustry: initialProfileData.currentIndustry || '',
            department: initialProfileData.department || '',
            roleCategory: initialProfileData.roleCategory || '',
            jobRole: initialProfileData.jobRole || '',
        });
    }, [initialProfileData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'jobRole' && value.length > 20) {
            setJobRoleError(true); // Set error if length exceeds 20
        } else {
            setJobRoleError(false); // Reset error
        }
        setProfileData({ ...profileData, [name]: value });
        closeAllDropdowns(); // Close dropdowns when clicking any field
    };

    // Toggling dropdown open/close state
    const toggleDropdown = (dropdownSetter) => {
        closeAllDropdowns();
        dropdownSetter((prev) => !prev);
    };

    // Function to handle selection from the dropdown
    const handleDropdownSelect = (name, value) => {
        setProfileData({ ...profileData, [name]: value });
        closeAllDropdowns(); // Close all dropdowns after selection
    };

    // Close all dropdowns
    const closeAllDropdowns = () => {
        setIsIndustryOpen(false);
        setIsDepartmentOpen(false);
        setIsRoleCategoryOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (jobRoleError) {
            return; // Prevent submission if there's an error
        }
        try {
            const id = localStorage.getItem('id');
            const response = await axios.put(`${Base_URL}/api/profiles/${id}`, profileData);
            updateProfileData(response.data);
            if (onClose) onClose();
        } catch (error) {
            console.error('Error saving profile', error);
        }
    };

    const [jobRoleFocused, setJobRoleFocused] = useState(false);
    const [isIndustryFocused ,setIsIndustryFocused] = useState(false)
    const [isRoleCategoryFocused ,setIsRoleCategoryFocused] = useState(false)
    const [isDepartmentFocused ,setIsDepartmentFocused] = useState(false)


    const handleDropDownChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileData({
          ...profileData,
          [name]: type === 'checkbox' ? checked : value,
        });
        // setFormErrors({ ...formErrors, [name]: false }); // Reset error when input changes
      };

    return (
        <ClickAwayListener onClickAway={closeAllDropdowns}>
            <div>
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <h2>Current Profile</h2>
                    <div className={styles.inlineFields}>
                        {/* Container to hold both Current Industry and Role Category */}
                        <FormControl fullWidth variant="outlined" className={styles.inlineField}>
                            <InputLabel
                            sx={{
                                position:'absolute',
                                top: isIndustryFocused || profileData?.currentIndustry ? '0px' : '-8px',  // Label turns red on error
                                color: "#BDBDBD"
                            }}
                            >Current Industry</InputLabel>
                            <Select
                            label="Current Industry"
                            name="currentIndustry"
                            onFocus={() => {setIsIndustryFocused(true);  } }
                            onBlur={() => setIsIndustryFocused(false)}
                            value={profileData.currentIndustry}
                            onChange={handleDropDownChange}
                            // onClick={() => toggleDropdown(setIsIndustryOpen)}
                            MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}
                            sx={{
                                '& .MuiSelect-select': {
                                width: '270px',
                                height: '36px', 
                                paddingTop: 0, 
                                paddingBottom: 0,
                                lineHeight: '36px', 
                                display: 'flex',
                                position:'relative',
                                alignItems: 'center',
                                },
                            }}
                            >
                            <MenuItem value="">Select Industry</MenuItem>
                            <MenuItem value="Technology">Technology</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Health Care">Health Care</MenuItem>
                          </Select>
                        </FormControl>
                        
                         

                            <FormControl fullWidth variant="outlined" className={styles.inlineField}>
                                <InputLabel
                                sx={{
                                    position:'absolute',
                                    top: isRoleCategoryFocused || profileData?.roleCategory ? '0px' : '-8px',  // Label turns red on error
                                    color: "#BDBDBD"
                                }}
                                >Role Category</InputLabel>
                                <Select
                                label="Role Category"
                                name="roleCategory"
                                onFocus={() => {setIsRoleCategoryFocused(true);  } }
                                onBlur={() => setIsRoleCategoryFocused(false)}
                                value={profileData.roleCategory}
                                onChange={handleDropDownChange}
                                // onClick={() => toggleDropdown(setIsIndustryOpen)}
                                MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}
                                sx={{
                                    '& .MuiSelect-select': {
                                    width: '265px',
                                    height: '36px', 
                                    paddingTop: 0, 
                                    paddingBottom: 0,
                                    lineHeight: '36px', 
                                    display: 'flex',
                                    position:'relative',
                                    alignItems: 'center',
                                    },
                                }}
                                >
                                <MenuItem value="">Select Role</MenuItem>
                                <MenuItem value="Software-Development">Software-Development</MenuItem>
                                <MenuItem value="Project Management">Project Management</MenuItem>
                                <MenuItem value="Data Analytics">Data Analytics</MenuItem>
                            </Select>
                            </FormControl>

                            
                        </div>

                        {/* Container to hold both Department and Job Role */}
                        <div className={styles.inlineFields}>
                            <FormControl fullWidth variant="outlined" className={styles.inlineField}>
                                <InputLabel
                                sx={{
                                    position:'absolute',
                                    top: isDepartmentFocused || profileData?.department ? '0px' : '-8px',  // Label turns red on error
                                    color: "#BDBDBD"
                                }}
                                >Department</InputLabel>
                                <Select
                                label="Department"
                                name="department"
                                onFocus={() => {setIsDepartmentFocused(true);  } }
                                onBlur={() => setIsDepartmentFocused(false)}
                                value={profileData.department}
                                onChange={handleDropDownChange}
                                // onClick={() => toggleDropdown(setIsIndustryOpen)}
                                MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}
                                sx={{
                                    '& .MuiSelect-select': {
                                    width: '266px',
                                    height: '36px', 
                                    paddingTop: 0, 
                                    paddingBottom: 0,
                                    lineHeight: '36px', 
                                    display: 'flex',
                                    position:'relative',
                                    alignItems: 'center',
                                    }
                                }}
                                >
                                <MenuItem value="">Select Department</MenuItem>
                                <MenuItem value="Engineering">Engineering</MenuItem>
                                <MenuItem value="Marketing">Marketing</MenuItem>
                                <MenuItem value="Sales">Sales</MenuItem>
                            </Select>
                            </FormControl>
                           

                            <div className={styles.inputField}>
                            <TextField
                                variant="outlined"
                                name="jobRole"
                                label="Job Role"
                                value={profileData.jobRole}
                                onClick={closeAllDropdowns}
                                onFocus={() => {setJobRoleFocused(true); setJobRoleError("") } }
                                onBlur={() => setJobRoleFocused(false)}
                                onChange={handleChange}
                                error={jobRoleError}
                                // fullWidth
                                helperText={jobRoleError ? 'Job Role must be 20 characters or less.' : ''} 
                                sx={{
                        
                                    '& > :not(style)': { 
                                        
                                        height: '36px',
                                        width:'315px',
                                        // marginBottom:'10px'
                            
                                    },
                                    '& .MuiOutlinedInput-input:-webkit-autofill':{
                                    height:'1px',
                                    // WebkitBoxShadow: '0 0 0 1000px #E4F1FF inset',
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '15px',
                                        position: 'absolute',
                                        top: jobRoleFocused || profileData.jobRole  ? '0px' : '-8px',
                                        color: jobRoleError ? 'red' : '#BDBDBD',
                                        padding: '0',
                                        },
                                    '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                            border:  '1px solid #D2D2D2',
                                            borderColor:  jobRoleError ? 'red' : '#BDBDBD',
                                            },
                                            '&:hover fieldset': {
                                            border: '2px solid #2A85FE',
                                            borderColor: jobRoleError ? 'red' : '#2A85FE',
                                            },
                                            '&.Mui-focused fieldset': {
                                            border: '2px solid #2A85FE',
                                            borderColor: jobRoleError ? 'red' : '#2A85FE',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: jobRoleError ? 'red' : '#2A85FE',
                                            top: '0px',
                                        },
                                        '&:hover .MuiInputLabel-root': {
                                            color: jobRoleError ? 'red' : '#2A85FE',
                                        },'& .MuiInputLabel-root:hover + .MuiOutlinedInput-root fieldset': {
                                            border: '2px solid #2A85FE',
                                            borderColor: jobRoleError ? 'red' : '#2A85FE',
                                        },
                                        '& .MuiOutlinedInput-input':{
                                        height:'1px'
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    <div className={styles.buttonContainer}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
                        <button type="submit" className={styles.saveButton}>Save</button>
                    </div>
                </form>
            </div>
        </ClickAwayListener>
    );
};

export default EditProfileForm;
