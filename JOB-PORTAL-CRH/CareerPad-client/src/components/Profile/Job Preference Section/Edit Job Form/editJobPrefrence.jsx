
// import React, { useState, useEffect } from 'react';
// import styles from './editJobPrefrence.module.css';
// import axios from 'axios';
// import Toaster from '../../../Toaster/toaster'; 

// const EditJobPreference = ({ closeForm, updateProfileData }) => {
//   const [formData, setFormData] = useState({
//     preferredWorkLocation: '',
//     minBasePay: '',
//     jobTypes: [], // Changed to array for multiple selections
//     preferredShift: 'Flexible',
//     remoteOptions: [], // Changed to array for multiple selections
//     selectedLocations: [],
//   });

//   const [toast, setToast] = useState({ message: '', type: '' });

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const id = localStorage.getItem('id');
//         const response = await axios.get(`${Base_URL}/api/profile/${id}`);
//         const profile = response.data;

//         setFormData({
//           preferredWorkLocation: '',
//           selectedLocations: profile.preferredWorkLocation || [],
//           minBasePay: profile.expectedSalary?.amount || '',
//           jobTypes: Object.keys(profile.jobType).filter(type => profile.jobType[type]), // Filter active job types
//           preferredShift: profile.preferredShift || 'Flexible',
//           remoteOptions: Object.keys(profile.remoteOptions).filter(option => profile.remoteOptions[option]), // Filter active remote options
//         });
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         setToast({ message: 'Error fetching data', type: 'error' });
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const handleAddLocation = (e) => {
//     e.preventDefault();
//     const newLocation = formData.preferredWorkLocation.trim();
//     if (newLocation && formData.selectedLocations.length < 10) {
//       setFormData((prevData) => ({
//         ...prevData,
//         selectedLocations: [...prevData.selectedLocations, newLocation],
//         preferredWorkLocation: '',
//       }));
//     }
//   };

//   const handleRemoveLocation = (location) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       selectedLocations: prevData.selectedLocations.filter((loc) => loc !== location),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const profileData = {
//       preferredWorkLocation: formData.selectedLocations,
//       expectedSalary: {
//         currency: 'INR',
//         amount: formData.minBasePay,
//       },
//       jobType: formData.jobTypes.reduce((acc, type) => {
//         acc[type] = true;
//         return acc;
//       }, {}),
//       preferredShift: formData.preferredShift,
//       remoteOptions: formData.remoteOptions.reduce((acc, option) => {
//         acc[option] = true;
//         return acc;
//       }, {}),
//     };

//     try {
//       const id = localStorage.getItem('id');
//       const response = await axios.put(`${Base_URL}/api/profile/${id}`, profileData);

//       setToast({ message: 'Successfully Saved Job Preference', type: 'success' });

//       updateProfileData(response.data);
//       closeForm();
//     } catch (error) {
//       console.error('Error saving data:', error);
//       setToast({ message: 'Error saving job preference', type: 'error' });
//     }
//   };

//   const handleJobTypeChange = (e) => {
//     const { value, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       jobTypes: checked
//         ? [...prevData.jobTypes, value] // Add if checked
//         : prevData.jobTypes.filter((type) => type !== value), // Remove if unchecked
//     }));
//   };

//   const handleRemoteOptionChange = (e) => {
//     const { value, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       remoteOptions: checked
//         ? [...prevData.remoteOptions, value] // Add if checked
//         : prevData.remoteOptions.filter((option) => option !== value), // Remove if unchecked
//     }));
//   };

//   const closeToaster = () => {
//     setToast({ message: '', type: '' });
//   };

//   return (
//     <div>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <h2 className={styles.heading}>Job Preference</h2>

//         {/* Preferred Work Location Section */}
//         <label className={styles.label}>Preferred work location (Max 10)</label>
//         <div className={styles.locationInputWrapper}>
//           <input
//             type="text"
//             className={styles.preinput}
//             value={formData.preferredWorkLocation}
//             onChange={(e) => setFormData({ ...formData, preferredWorkLocation: e.target.value })}
//             placeholder="Preferred work location"
//           />
//           <button onClick={handleAddLocation} className={styles.addLocationButton}>Add</button>
//         </div>
//         <div className={styles.selectedLocations}>
//           {formData.selectedLocations.map((location, index) => (
//             <span key={index} className={styles.locationTag}>
//               {location}
//               <button onClick={() => handleRemoveLocation(location)} className={styles.removeLocationButton}>
//                 &times;
//               </button>
//             </span>
//           ))}
//         </div>

//         {/* Minimum Base Pay Section */}
//         <label className={styles.lablePay}> Minimum base pay</label>
//         <div className={styles.basePayWrapper}>
//           <span className={styles.currency}>₹</span>
//           <input
//             type="number"
//             className={styles.payInput}
//             value={formData.minBasePay}
//             onChange={(e) => setFormData({ ...formData, minBasePay: e.target.value })}
//           />
//         </div>

//         {/* Job Types Section */}
//         <label className={styles.JobTypes}>Desired job types</label>
//         <div className={styles.checkboxGroup}>
//           {['permanent', 'contractual', 'fullTime', 'partTime'].map((type) => (
//             <div key={type}>
//               <input
//                 type="checkbox"
//                 name="jobType"
//                 value={type}
//                 checked={formData.jobTypes.includes(type)}
//                 onChange={handleJobTypeChange}
//               />
//               <label>{type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}</label>
//             </div>
//           ))}
//         </div>

//         {/* Preferred Shift Section */}
//         <label className={styles.shift}>Preferred shift</label>
//         <div className={styles.radioGroup}>
//           {['Day', 'Night', 'Flexible'].map((shift) => (
//             <div key={shift}>
//               <input
//                 type="radio"
//                 value={shift}
//                 checked={formData.preferredShift === shift}
//                 onChange={(e) => setFormData({ ...formData, preferredShift: e.target.value })}
//               />
//               <label>{shift}</label>
//             </div>
//           ))}
//         </div>

//         {/* Remote Options Section */}
//         <label className={styles.remoteLabel}>Remote Options</label>
//         <div className={styles.checkboxGroup}>
//           {['temporarilyRemote', 'remote', 'hybrid', 'inPerson'].map((option) => (
//             <div key={option}>
//               <input
//                 type="checkbox"
//                 value={option}
//                 checked={formData.remoteOptions.includes(option)}
//                 onChange={handleRemoteOptionChange}
//               />
//               <label>
//                 {option === 'temporarilyRemote'
//                   ? 'Temporarily Remote'
//                   : option === 'inPerson'
//                   ? 'In Person'
//                   : option.charAt(0).toUpperCase() + option.slice(1)}
//               </label>
//             </div>
//           ))}
//         </div>

//         {/* Submit and Cancel Buttons */}
//         <div className={styles.buttons}>
//           <button type="submit" className={styles.saveButton}>Save</button>
//           <button type="button" className={styles.cancelButton} onClick={closeForm}>Cancel</button>
//         </div>
//       </form>

//       {/* Toaster Component for Notifications */}
//       {toast.message && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={closeToaster}
//         />
//       )}
//     </div>
//   );
// };

// export default EditJobPreference;
































































import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Toaster from '../../../Toaster/toaster';
import { useToaster } from '../../../Toaster.js';
import { MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText, Button, TextField, FormGroup, FormControlLabel, Radio, RadioGroup, OutlinedInput, InputAdornment } from '@mui/material';
import styles from './editJobPrefrence.module.css'; // Adjust styles for better label and form control visibility
// import ScrollBar from '../../../Scroll Bar/scrollBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faTimes} from '@fortawesome/free-solid-svg-icons';
import CountrySelect from '../../../Input/Country/Country.jsx';

import { Base_URL } from '../../../../const/const.js';
// const jobRolesOptions = ['Developer', 'Designer', 'Manager', 'Engineer', 'Consultant'];

const EditJobPreference = ({ closeForm, updateProfileData }) => {
  const setToast = useToaster();
  const [isFocused, setIsFocused] = useState(true)
  const [formData, setFormData] = useState({
    desiredJobRoles: [], // For the dropdown
    currency:'',
    minBasePay: '',
    jobTypes: [],
    preferredShift: '',
    remoteOptions: [],
    preferredWorkLocation: []


//     preferredWorkLocation: '',
//     minBasePay: '',
//     jobTypes: [], // Changed to array for multiple selections
//     preferredShift: 'Flexible',
//     remoteOptions: [], // Changed to array for multiple selections
//     selectedLocations: [],

  });

  // const [toast, setToast] = useState({ message: '', type: '' });
  // code for job roles
  const [selectedValue, setSelectedValue] = useState('');
  const [entries, setEntries] = useState([]);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setError("")
    // setIsFocused(false)
    setSelectedValue("Select"); 
    handleKeyPress(value);
  };

  const [error, setError] = useState("")

  const handleKeyPress = (value) => {
    if (entries.length < 3) {
      if (value !== "" && !entries.includes(value)) {  
        setEntries([...entries, value]);
      } else if (entries.includes(value)) {
        setError( 'This job title is already added' );
      }
    } else {
       setError('Delete a job title to add more'  );
    }
  };

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index); 
    setEntries(newEntries); 
  };

  const [setData, setSetData] = useState(false)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const id = localStorage.getItem('id');
        const response = await axios.get(`${Base_URL}/api/profile/${id}`);
        const profile = response.data;
        // console.log(profile)
        setFormData({
          desiredJobRoles: profile.jobList || [], // Load previous job roles
          currency:profile?.expectedSalary?.currency || '',
          minBasePay: profile?.expectedSalary?.amount || '',
          jobTypes: Object.keys(profile.jobType).filter(type => profile.jobType[type]),
          preferredShift: profile.preferredShift || '',
          remoteOptions: Object.keys(profile.remoteOptions).filter(option => profile.remoteOptions[option]),
          preferredWorkLocation:profile?.preferredWorkLocation,
        });
        setEntries(profile.jobList || []);
        // console.log(typeof(formData.desiredJobRoles),formData.desiredJobRoles)
        console.log(profile.preferredWorkLocation)
        localStorage.setItem("Preferred Work Location",JSON.stringify(profile?.preferredWorkLocation))
        setSetData(true)
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setToast( 'Error fetching data', 'error' );
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      jobList: entries,
      expectedSalary: {
        currency: formData.currency,
        amount: formData.minBasePay,
      },
      preferredWorkLocation:JSON.parse(localStorage.getItem("Preferred Work Location"))||'',
      jobType: formData.jobTypes.reduce((acc, type) => {
        acc[type] = true;
        return acc;
      }, {}),
      preferredShift: formData.preferredShift,
      remoteOptions: formData.remoteOptions.reduce((acc, option) => {
        acc[option] = true;
        return acc;
      }, {}),
    };
    // console.log(preferredWorkLocation)
    try {
      const id = localStorage.getItem('id');
      const response = await axios.put(`${Base_URL}/api/profile/${id}`, profileData);

      setToast('Job Preferences updated successfully', 'success');
      updateProfileData(response.data);
      closeForm();
    } catch (error) {
      console.error('Error saving data:', error);
      setToast('Error saving job preference','error');
    }
  };

  const handleJobRolesChange = (event) => {
    const { value } = event.target;
    if (value.length <= 3) { // Max 3 job roles allowed
      setFormData({ ...formData, desiredJobRoles: value });
    }
  };

  // const closeToaster = () => {
  //   setToast({ message: '', type: '' });
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };



  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.heading}>Edit Job Preferences</label>

        {/* <ScrollBar> */}
        {/* Desired Job Roles (Dropdown) */}
        <FormControl fullWidth margin="normal" variant="outlined">
  <div style={{display:'flex',flexDirection:'row',alignItems:'center' , color:'#767676' ,gap:'5px', marginBottom:'5px'}}>
  <label id="job-roles-label" style={{color:'black'}}>Desired Job Roles </label>
  <label>
  (Max 3)
  </label>
  </div>
  {/* <Select
    labelId="job-roles-label"
    multiple
    value={formData.desiredJobRoles}
    onChange={handleJobRolesChange}
    label="Desired Job Roles (Max 3)" 
    renderValue={(selected) => selected.join(', ')}
  >
    {jobRolesOptions.map((role) => (
      <MenuItem key={role} value={role}>
        <Checkbox checked={formData.desiredJobRoles.includes(role)} />
        <ListItemText primary={role} />
      </MenuItem>
    ))}
  </Select> */}
  <select 
  style={{ fontSize:'15px', borderColor: error && 'red',color: isFocused ? '' : error && 'red',}}
    className={styles.inputDES}
    id="dropdown"
    value={selectedValue}
    onFocus={()=>{setIsFocused(true)}}
    onBlur={()=>{setIsFocused(false)}}
    onChange={handleOptionChange}
  >
    <option value="">job roles </option>
    <option value="Developer">Developer</option>
    <option value="Designer">Designer</option>
    <option value="Manager">Manager</option>
    <option value="Engineer">Engineer</option>
    <option value="Consultant">Consultant</option>
  </select>
  {error.length > 0 &&
    <div>
      <label style={{color:'red',fontSize:'12px',fontWeight:'400'}}>
        {error}
      </label>
    </div>
  }
  <div style={{ width: '100%' , display: 'flex',
          flexDirection:'row', gap:'20px' }}>
    {entries.map((entry, index) => (
      <div
        key={index}
        style={{
          display: 'flex',
          flexDirection:'row',
          width: 'max-content',
          alignItems: 'center',
          marginTop:'10px',
          padding: '5px 10px 5px 10px',
          gap:'10px',
          color:'#2A85FE',
          border:'1px solid #2A85FE',
          borderRadius:'5px',
          backgroundColor:'#E4F1FF'
        }}
      >
        <label>{entry}</label>
        <FontAwesomeIcon
          style={{ color: '#2A85FE', cursor: 'pointer' }}
          icon={faTimes}
          onClick={() => handleDelete(index)}
        />
      </div>
    ))}
</div>
</FormControl>





        {/* Job Types Section */}
        <FormControl fullWidth component="fieldset">
  <FormGroup>
    {/* Job Type heading on one line */}
    <p className={styles.headings}>Desired job types</p>
    
    {/* Checkboxes on the next line in one row */}
    <div style={{ display: 'flex', gap:'10px' }}>
      {['permanent', 'contractual', 'fullTime', 'partTime'].map((type) => (
        <FormControlLabel
          control={
            <Checkbox
              name="jobType"
              value={type}
              checked={formData.jobTypes.includes(type)}
              onChange={(e) => {
                const { value, checked } = e.target;
                setFormData((prevData) => ({
                  ...prevData,
                  jobTypes: checked
                    ? [...prevData.jobTypes, value]
                    : prevData.jobTypes.filter((t) => t !== value),
                }));
              }}
              sx={{
                color: 'black', // Unchecked checkbox color
                '&.Mui-checked': {
                  color: 'black', // Checked checkbox color
                },
              }}
            />
          }
          label={type.charAt(0).toUpperCase() + type.slice(1)}
          key={type}
        />
      ))}
    </div>
  </FormGroup>
</FormControl>


{/* Preferred Shift Section */}
<FormControl fullWidth component="fieldset">
  {/* Preferred Shift heading on one line */}
  <p  className={styles.headings}>Preferred shift</p>

  {/* Radio buttons on the next line in one row */}
  <div style={{ display: 'flex', gap:'10px' }}>
    <RadioGroup
      value={formData.preferredShift}
      onChange={(e) => setFormData({ ...formData, preferredShift: e.target.value })}
      row // Ensures that the radio buttons are displayed in a row
    >
      {['Day', 'Night', 'Flexible'].map((shift) => (
        <FormControlLabel
          value={shift}
          control={
            <Radio
              sx={{
                color: 'black', // Unselected radio color
                '&.Mui-checked': {
                  color: 'black', // Selected radio color
                },
              }}
            />
          }
          label={shift}
          key={shift}
          
        />
      ))}
    </RadioGroup>
  </div>
</FormControl>



<div className={styles.heads}>
  <div className={styles.salaryWrapper}>
    <label htmlFor="currentSalary" className={styles.headings}>Minimum base pay</label>
    <div className={styles.currencySalary}>
      <select
        name="currency"
        value={formData?.currency || ''}
        onChange={handleChange}
        style={{height:'36px'}}
        className={styles.currencySelect}
        // required
      >
        {/* <option value="">Select</option> */}
        <option value="INR">INR</option>
        <option value="NPR">NPR</option>
        <option value="USD">USD</option>
        {/* <option value="USD">USD</option> */}
        
        {/* Add more currency options as needed */}
      </select>

      {/* <input
        type="text"
        name="minBasePay"
        placeholder="Enter Salary"
        value={formData.minBasePay || ''}
        onChange={handleChange}
        className={styles.salaryInput}
        // required
      /> */}

<TextField
    name="minBasePay"
    label="Minimum Base Pay"
    // onFocus={(e) => focusInput(e)}
    // className={styles.salaryInput}
    value={formData.minBasePay || ''}
    onChange={handleChange}
    // error={!!errors.name}
    
    sx={{
      
      '& > :not(style)': { 
          
          height: '36px',
          width:'536px',
          // marginBottom:'10px'

      },
      '& .MuiOutlinedInput-input:-webkit-autofill':{
        height:'1px',
        // WebkitBoxShadow: '0 0 0 1000px #E4F1FF inset',
      },
      '& .MuiInputLabel-root': {
            fontSize: '15px',
            position: 'absolute',
            top:  formData.minBasePay? '0px' : '-8px',
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
  </div>
</div>



        {/* Remote Options Section */}
        <FormControl fullWidth margin="normal" component="fieldset">
  {/* Remote Options heading on one line */}
  <p className={styles.headings}>Preferred work location <label style={{color:'#767676',fontSize:'16px',fontWeight:'400'}}>
    (Max 5)
    </label></p>

  {/* Checkboxes on the next line in one row */}
  <div style={{ display: 'flex', gap:'10px' }}>
    {['site', 'remote', 'hybrid'].map((option) => (
      <FormControlLabel
        control={
          <Checkbox
            value={option}
            checked={formData.remoteOptions.includes(option)}
            onChange={(e) => {
              const { value, checked } = e.target;
              setFormData((prevData) => ({
                ...prevData,
                remoteOptions: checked
                  ? [...prevData.remoteOptions, value]
                  : prevData.remoteOptions.filter((o) => o !== value),
              }));
            }}
            sx={{
              color: 'black', // Unchecked checkbox color
              '&.Mui-checked': {
                color: 'black', // Checked checkbox color
              },
            }}
          />
        }
        // label={option}
        label = 
          {option === 'site'
            ? 'On site'
            : option.charAt(0).toUpperCase() + option.slice(1)}
        key={option}
      />
    ))}
  </div>
</FormControl>

<div style={{display: formData?.remoteOptions.includes("remote") && 'none'}}>
<CountrySelect setData={setData} inputStyle={"JobPrefrence"} />
</div>

        {/* </ScrollBar> */}

                 {/* Submit and Cancel Buttons */}
         <div className={styles.buttons}>
           <button type="submit" className={styles.saveButton}>Save</button>
           <button type="button" className={styles.cancelButton} onClick={closeForm}>Cancel</button>
         </div>
       </form>
      {/* Toaster Component for Notifications */}
      {/* {toast.message && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={closeToaster}
        />
      )} */}
    </div>
  );
};

export default EditJobPreference;
