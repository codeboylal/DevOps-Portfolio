
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

// import React, { useState } from "react";
// import styles from "./editPersonalDetails.module.css";
// import ScrollBar from "../../../Scroll Bar/scrollBar";
// import Toaster from "../../../Toaster/toaster"; // Ensure the correct path to your Toaster component
// import cx from "classnames";
// const EditPersonalDetails = ({ onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     gender: "",
//     maritalStatus: "",
//     dateOfBirth: {
//       day: "27",
//       month: "Jun",
//       year: "1999",
//     },
//     category: "",
//     differentlyAbled: "No",
//     workPermitCountries: [], // This will store selected countries
//     address: {
//       permanent: "",
//       hometown: "",
//       pincode: "",
//     },
//   });

//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [modalOpen, setModalOpen] = useState(true); // Manage modal visibility

//   // Handle change for form inputs
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith("dateOfBirth.")) {
//       const key = name.split(".")[1];
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         dateOfBirth: { ...prevFormData.dateOfBirth, [key]: value },
//       }));
//     } else if (name.startsWith("address.")) {
//       const key = name.split(".")[1];
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         address: { ...prevFormData.address, [key]: value },
//       }));
//     } else {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleCountryChange = (e) => {
//     const selectedCountries = Array.from(e.target.selectedOptions, (option) => option.value);
    
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       workPermitCountries: [...new Set([...prevFormData.workPermitCountries, ...selectedCountries])] // Ensure no duplicates
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const id = localStorage.getItem('id'); // assuming 'id' is stored in local storage

//       const response = await fetch(`${Base_URL}/api/profile/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData), // Send the updated profile data
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setToast({ message: 'Successfully added your Personal Details', type: 'success' });
//         onSave(data);  // Handle the response data (saved profile)
//       } else {
//         setToast({ message: 'Error saving profile: ' + data.message, type: 'error' });
//       }
//     } catch (error) {
//       console.error("Error in API call:", error);
//       setToast({ message: 'Error saving data. Please try again.', type: 'error' });
//     } finally {
//       // Do not close the modal immediately
//       // Use a timeout to allow the toaster to be visible
//       setTimeout(() => {
//         setModalOpen(false);
//         onClose(); // Ensure to call the onClose function to close the modal
//       }, 3000); // Adjust delay to match toaster display duration
//     }
//   };

//   // Close toaster handler
//   const closeToaster = () => {
//     setToast({ message: '', type: '' });
//   };

//   if (!modalOpen) {
//     return null; // Prevent rendering the component if modal is closed
//   }

//   return (
//     <div>
//       <div className={styles.modalOverlay}>
//         <div className={styles.modal}>
//           <div className={styles.formContainer}>
//             <p  className={styles.headline}>Personal Details</p>

//             <ScrollBar>
//               {/* Gender buttons */}
//               <div className={styles.formGroup}>
                // <label className={styles.labelClass}>Gender</label>
//                 <div className={styles.radioGroup}>
//                   <button
//                     className={`${styles.button} ${formData.gender === "Male" ? styles.active : ""}`}
//                     onClick={() => setFormData({ ...formData, gender: "Male" })}
//                   >
//                     Male
//                   </button>
//                   <button
//                     className={`${styles.button} ${formData.gender === "Female" ? styles.active : ""}`}
//                     onClick={() => setFormData({ ...formData, gender: "Female" })}
//                   >
//                     Female
//                   </button>
//                   <button
//                     className={`${styles.button} ${formData.gender === "Prefer not to say" ? styles.active : ""}`}
//                     onClick={() => setFormData({ ...formData, gender: "Prefer not to say" })}
//                   >
//                     Prefer not to say
//                   </button>
//                 </div>
//               </div>

//               {/* Marital Status */}
//               <div className={styles.formGroup}>
                // <label className={styles.labelClass}>Marital status</label>
//                 <div className={styles.radioGroup}>
//                   {["Single/unmarried", "Married","Other"].map((status) => (
//                     <button
//                       key={status}
//                       className={`${styles.button} ${formData.maritalStatus === status ? styles.active : ""}`}
//                       onClick={() => setFormData({ ...formData, maritalStatus: status })}
//                     >
//                       {status}
//                     </button>
//                   ))}
//                 </div>
//               </div>

              // {/* Date of Birth */}
              // <div className={styles.formGroup}>
              //   <label className={styles.labelClass}>Date of Birth</label>
              //   <div className={styles.dobGroup}>
              //     <select name="dateOfBirth.day" className={styles.dropdown} value={formData.dateOfBirth.day} onChange={handleInputChange}>
              //       {[...Array(31).keys()].map((day) => (
              //         <option key={day + 1} value={day + 1}>{day + 1}</option>
              //       ))}
              //     </select>
              //     <select name="dateOfBirth.month" className={styles.dropdown} value={formData.dateOfBirth.month} onChange={handleInputChange}>
              //       {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
              //         <option key={month} value={month}>{month}</option>
              //       ))}
              //     </select>
              //     <select name="dateOfBirth.year" className={styles.dropdown} value={formData.dateOfBirth.year} onChange={handleInputChange}>
              //       {[...Array(100).keys()].map((year) => (
              //         <option key={year + 1920} value={year + 1920}>{year + 1920}</option>
              //       ))}
              //     </select>
              //   </div>
              // </div>



//               {/* Differently Abled */}
//               <div className={styles.formGroup}>
                // <label className={styles.labelClass}>Are you differently abled?</label>
//                 <div className={styles.radioGroup}>
//                   <label className={styles.labelClass}>
//                     <input type="radio" name="differentlyAbled" value="Yes" checked={formData.differentlyAbled === "Yes"} onChange={handleInputChange} /> Yes
//                   </label >
//                   <label className={styles.labelClass}>
//                     <input type="radio" name="differentlyAbled" value="No" checked={formData.differentlyAbled === "No"} onChange={handleInputChange} /> No
//                   </label>
//                 </div>
//               </div>



//               {/* Address */}
//               <div className={styles.formGroup}>
//                 <input name="address.permanent" placeholder="Permanent address" type="text" className={styles.permanentAdd} value={formData.address.permanent} onChange={handleInputChange} />
//               </div>
//               <div className={styles.AddressAndPincode}>
//                 <div className={styles.formGroup}>
//                   <input name="address.hometown" placeholder="Hometown" type="text" className={styles.textInput} value={formData.address.hometown} onChange={handleInputChange} />
//                 </div>
//                 <div className={styles.formGroup}>
//                   <input name="address.pincode" placeholder="Pincode" type="text" className={styles.textInput} value={formData.address.pincode} onChange={handleInputChange} />
//                 </div>
//               </div>
//             </ScrollBar>

//             {/* Footer Buttons */}
            // <div className={styles.footer}>
            //   <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
            //   <button className={styles.saveButton} onClick={handleSave}>Save</button>
            // </div>
//           </div>
//         </div>
//       </div>

//       {/* Render Toaster */}
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

// export default EditPersonalDetails;





































































import { Base_URL } from "../../../../const/const.js";
import React, { useEffect, useState } from "react";
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import ScrollBar from "../../../Scroll Bar/scrollBar";
// import Toaster from "../../../Toaster/toaster"; // Ensure the correct path to your Toaster component
import {useToaster} from "../../../Toaster.js"
import styles from "./editPersonalDetails.module.css";
import CountryCitySelect from "../../../Input/Country/Country.jsx";


const EditPersonalDetails = ({ onClose, onSave , profile}) => {
  const [addressLine1Focus, setAddressLine1Focus] = useState(false)
  const [addressLine2Focus, setAddressLine2Focus] = useState(false)
  const [addressZipFocus, setAddressZipFocus] = useState(false)
  const setToast = useToaster();
  const [countryData , setCountryData] = useState('')
  const [cityData , setCityData] = useState('')
  const [profileProp, setProfileProp] = useState();
  const [formData, setFormData] = useState({
    gender: profile?.gender || "Male",
    maritalStatus: profile?.maritalStatus || "Single/unmarried",
    dateOfBirth: {
      day: profile?.dateOfBirth?.day || "27",
      month: profile?.dateOfBirth?.month ||  "Jun",
      year: profile?.dateOfBirth?.year || "1999",
    },
    category: profile?.category || "",
    differentlyAbled: profile?.differentlyAbled || "No",
    workPermitCountries: profile?.workPermitCountries || [], // This will store selected countries
    address: {
      line1: profile?.address?.permanent || "",
      line2: profile?.address?.hometown || "",
      zip: profile?.address?.pincode || "",
      // zip: profile?.address?.pincode || "",
    },
  });


  useEffect(()=>{
    if(profile){
      // console.log(profile)
      setProfileProp(profile)
    }
  },[profile])


  useEffect(()=>{
    if(profileProp){
      setFormData({
        gender: profileProp?.gender || "Male",
        maritalStatus: profileProp?.maritalStatus || "Single/unmarried",
        dateOfBirth: {
          day: profileProp?.dateOfBirth?.day || "27",
          month: profileProp?.dateOfBirth?.month ||  "Jun",
          year: profileProp?.dateOfBirth?.year || "1999",
        },
        category: profileProp?.category || "",
        differentlyAbled: profileProp?.differentlyAbled || "No",
        workPermitCountries: profileProp?.workPermitCountries || [], // This will store selected countries
        address: {
          line1: profileProp?.address?.permanent || "",
          line2: profileProp?.address?.hometown || "",
          zip: profileProp?.address?.pincode || "",
        }
      }
      )
      setCountryData(profileProp?.address?.country || "")
      setCityData(profileProp?.address?.city || "")
    }
  },[profileProp])

  // const [toast, setToast] = useState({ message: '', type: '' });
  const [modalOpen, setModalOpen] = useState(true); // Manage modal visibility

  // Handle change for form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("dateOfBirth.")) {
      const key = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        dateOfBirth: { ...prevFormData.dateOfBirth, [key]: value },
      }));
    } else if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: { ...prevFormData.address, [key]: value },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const id = localStorage.getItem('id'); // assuming 'id' is stored in local storage
  
      const profileData = {
        gender: formData.gender || "Male",
        maritalStatus: formData.maritalStatus || "Single/unmarried",
        dateOfBirth: formData.dateOfBirth || "",
        differentlyAbled: formData.differentlyAbled || "No",
        address: {
          permanent: formData.address.line1 || "",  // Address Line 1 as permanent address
          hometown: formData.address.line2 || "",   // Address Line 2 as hometown
          pincode: formData.address.zip || "",      // Zip code
          country: localStorage.getItem("Country")|| "",  // Country
          city: localStorage.getItem("City") || "",        // City
        },

        workPermitCountries: formData.workPermitCountries,
      };
  
      const response = await fetch(`${Base_URL}/api/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData), // Send the updated profile data
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setToast( 'Personal details added successfully','success' );
        onSave(data);  // Handle the response data (saved profile)
        localStorage.removeItem('Country');
        localStorage.removeItem('City');

      } else {
        setToast('Error saving profile: ' + data.message,'error' );
      }
    } catch (error) {
      console.error("Error in API call:", error);
      setToast('Error saving data. Please try again.', 'error' );
    } finally {
      // setTimeout(() => {
        setModalOpen(false);
        onClose(); // Ensure to call the onClose function to close the modal
      // }, 3000); // Adjust delay to match toaster display duration
    }
  };
  

  // Close toaster handler
  // const closeToaster = () => {
  //   setToast({ message: '', type: '' });
  // };

  if (!modalOpen) {
    return null; // Prevent rendering the component if modal is closed
  }


  return (
    <div>
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.formContainer}>
            <label style={{fontSize:'20px',color:'#2A85FE',fontWeight:'600'}}>Personal Details</label>

            {/* <ScrollBar> */}
              {/* Gender */}
              <div className={styles.formGroup}
              >
                <FormControl component="fieldset">
                  {/* <FormLabel component="legend">Gender</FormLabel> */}
                  <label className={styles.labelClass} style={{paddingBottom:'0px'}}>Gender</label>
                  <RadioGroup
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    row
                    sx={{

                      '& .MuiFormControlLabel-root':{
                        height:'15px',
                        paddingTop:'20px'
                      }
                    }}
                  >
                    <FormControlLabel value="Male" control={<Radio sx={{ color: '#767676', '&.Mui-checked': { color: 'black' } }} />} label="Male" sx={{ color: '#767676' }}/>
                    <FormControlLabel value="Female" control={<Radio sx={{ color: '#767676', '&.Mui-checked': { color: 'black' } }} />} label="Female" sx={{ color: '#767676' }}/>
                    <FormControlLabel value="Prefer not to say" control={<Radio sx={{ color: '#767676', '&.Mui-checked': { color: 'black' } }} />} label="Prefer not to say" sx={{ color: '#767676' }}/>
                  </RadioGroup>
                </FormControl>
              </div>

              {/* Marital Status */}
              <div className={styles.formGroup}>
                <FormControl component="fieldset"
                sx={{
                  '& .MuiFormGroup-root':{
                    height:'15px'
                  }
                }}
                >
                  {/* <FormLabel component="legend">Marital Status</FormLabel> */}
                  <label style={{paddingBottom:'0px'}} className={styles.labelClass}>Marital status</label>
                  <RadioGroup
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    row
                  >
                    <FormControlLabel value="Single/unmarried" control={<Radio sx={{ color: '#767676', '&.Mui-checked': { color: 'black' } }} />} label="Single/unmarried" sx={{ color: '#767676' }}/>
                    <FormControlLabel value="Married" control={<Radio sx={{ color: '#767676', '&.Mui-checked': { color: 'black' } }} />} label="Married" sx={{ color: '#767676' }}/>
                    <FormControlLabel value="Other" control={<Radio sx={{ color: '#767676', '&.Mui-checked': { color: 'black' } }} />} label="Other" sx={{ color: '#767676' }} />
                  </RadioGroup>
                </FormControl>
              </div>

  
              {/* <br /> */}

<div  style={{paddingTop:'15px',paddingBottom:'15px',width:'100%'}}>
  <label className={styles.labelClass}>Date of Birth</label>
  <div className={styles.dobGroup}>
  


<Select
  name="dateOfBirth.day"
  className={`${styles.dropdown} custom-select`}
  value={formData.dateOfBirth.day}
  onChange={handleInputChange}
  MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}

>
  {[...Array(31).keys()].map((day) => (
    <MenuItem key={day + 1} value={day + 1}>
      {day + 1}
    </MenuItem>
  ))}
</Select>


  

<Select
  name="dateOfBirth.month"
  className={styles.dropdown}
  value={formData.dateOfBirth.month}
  onChange={handleInputChange}
  // Optional: Add MenuProps here if you want to limit the dropdown height
  MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}

>
  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
    <MenuItem key={month} value={month}>
      {month}
    </MenuItem>
  ))}
</Select>

<Select
  name="dateOfBirth.year"
  className={styles.dropdown}
  value={formData.dateOfBirth.year}
  onChange={handleInputChange}
  MenuProps={{ PaperProps: { style: { maxHeight: 150 } } }}

>
  {[...Array(100).keys()].map((year) => (
    <MenuItem key={year + 1990} value={year + 1990}>
      {year + 1990}
    </MenuItem>
  ))}
</Select>
  </div>
</div>


              {/* Differently Abled */}
              <div >
                <FormControl component="fieldset">
                  {/* <FormLabel  sx={{ color: '#767676' }}>Are you differently abled?</FormLabel> */}
                  <label className={styles.labelClass} style={{paddingBottom:'0px'}}>Are you differently abled?</label>
                  <RadioGroup
                    name="differentlyAbled"
                    value={formData.differentlyAbled}
                    onChange={handleInputChange}
                    row
                  >
                    <FormControlLabel value="Yes" control={<Radio sx={{ color: '#767676', '&.Mui-checked': { color: 'black' } }} />} label="Yes" sx={{ color: '#767676' }}/>
                    <FormControlLabel value="No" control={<Radio sx={{ color: '#767676', '&.Mui-checked': { color: 'black' } }} />} label="No" sx={{ color: '#767676' }}/>
                  </RadioGroup>
                </FormControl>
              </div>


              {/* Address */}
<div className={styles.formGroup}>
  <TextField
    name="address.line1"
    label="Address Line 1"
    value={formData.address.line1}
    onChange={handleInputChange}
    variant="outlined"
    onFocus={()=>{setAddressLine1Focus(true) }}
    onBlur={()=>{setAddressLine1Focus(false)}}
    fullWidth
    sx={{
      
      '& > :not(style)': { 
          
          height: '36px',
          width:'645px',
          // marginBottom:'10px'
      },
      '& .MuiOutlinedInput-input:-webkit-autofill':{
        height:'1px',
        // WebkitBoxShadow: '0 0 0 1000px #E4F1FF inset',
      },
      '& .MuiInputLabel-root': {
            fontSize: '15px',
            position: 'absolute',
            top:  formData?.address.line1? '0px' : '-8px',
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
              color:  '#2A85FE',
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

<div className={styles.formGroup}>
  <TextField
    name="address.line2"
    label="Address Line 2 (Optional)"
    value={formData.address.line2}
    onFocus={()=>{setAddressLine2Focus(true) }}
    onBlur={()=>{setAddressLine2Focus(false)}}
    onChange={handleInputChange}
    variant="outlined"
    fullWidth
    sx={{
      
      '& > :not(style)': { 
          
          height: '36px',
          width:'645px',
          // marginBottom:'10px'

      },
      '& .MuiOutlinedInput-input:-webkit-autofill':{
        height:'1px',
        // WebkitBoxShadow: '0 0 0 1000px #E4F1FF inset',
      },
      '& .MuiInputLabel-root': {
            fontSize: '15px',
            position: 'absolute',
            top:  formData?.address.line2 ? '0px' : '-8px',
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
              color:  '#2A85FE',
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



<div style={{width:'100%'}}>
<CountryCitySelect page={"personalDetails"} countryData={countryData} cityData={cityData}/>
</div>

{/* ZIP/Postal Code */}
<div className={styles.formGroup}>
  <TextField
    name="address.zip"
    label="ZIP/Postal Code"
    value={formData.address.zip}
    onChange={handleInputChange}
    variant="outlined"
    onFocus={()=>{setAddressZipFocus(true) }}
    onBlur={()=>{setAddressZipFocus(false)}}
    type="number"
    fullWidth
    sx={{
      
      '& > :not(style)': { 
          
          height: '36px',
          width:'645px',
          // marginBottom:'10px'

      },
      '& .MuiOutlinedInput-input:-webkit-autofill':{
        height:'1px',
        // WebkitBoxShadow: '0 0 0 1000px #E4F1FF inset',
      },
      '& .MuiInputLabel-root': {
            fontSize: '15px',
            position: 'absolute',
            top:  formData?.address.zip ? '0px' : '-8px',
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
              color:  '#2A85FE',
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

            {/* </ScrollBar> */}

            {/* Footer Buttons */}
            <div className={styles.footer}>
              <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
              <button className={styles.saveButton} onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* Render Toaster */}
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

export default EditPersonalDetails;
