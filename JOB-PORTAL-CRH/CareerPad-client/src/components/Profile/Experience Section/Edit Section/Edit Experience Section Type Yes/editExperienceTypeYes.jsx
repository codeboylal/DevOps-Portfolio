// import React, { useState } from "react";
// import {
//   Box, Button, FormControl, FormControlLabel, InputAdornment, InputLabel,
//   MenuItem, Radio, RadioGroup, Select, TextField, Chip, OutlinedInput
// } from "@mui/material";
// import styles from "./editExperienceTypeYes.module.css"; // Import the CSS module
// import ScrollBar from "../../../../Scroll Bar/scrollBar";

// const EditExperienceTypeYes = () => {
//   const [skills, setSkills] = useState(["CSS", "Design", "UI/UX"]);
//   const [currentSalary, setCurrentSalary] = useState(480000);
//   const [noticePeriod, setNoticePeriod] = useState("1 Month");

//   // Handler to add skill
//   const handleAddSkill = (event) => {
//     if (event.key === "Enter" && event.target.value !== "") {
//       setSkills([...skills, event.target.value]);
//       event.target.value = "";
//     }
//   };

//   // Handler to remove skill
//   const handleDeleteSkill = (skillToDelete) => () => {
//     setSkills((skills) => skills.filter((skill) => skill !== skillToDelete));
//   };

//   return (
//     <Box component="form" className={styles.formContainer}>
//       {/* Heading */}
//       <h2 className={styles.heading}>Work Experience</h2>
// <ScrollBar>
//       {/* Is this your current employment */}
//       <FormControl fullWidth className={styles.formItem}>
//       <label className={styles.labelEdit}>Is this your current employment?</label>

//         <RadioGroup row defaultValue="yes" name="currentEmployment">
//           <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//           <FormControlLabel value="no" control={<Radio />} label="No" />
//         </RadioGroup>
//       </FormControl>

//       {/* Employment type */}
//       <FormControl fullWidth className={styles.formItem}>
//       <label className={styles.labelEdit}>Employment Type</label>


//         <RadioGroup row defaultValue="full-time" name="employmentType">
//           <FormControlLabel value="full-time" control={<Radio />} label="Full-time" />
//           <FormControlLabel value="internship" control={<Radio />} label="Internship" />
//         </RadioGroup>
//       </FormControl>

//       {/* Company Logo */}
//       <Button variant="outlined" component="label" className={styles.uploadButton}>
//         Upload Company Logo
//         <input type="file" hidden />
//       </Button>

//       {/* Total Experience */}
//       <label className={styles.labelEdit}>Total Experience</label>

//       <Box className={styles.inputGroup}>

//         <FormControl fullWidth>

//           <TextField
//             label="Years"
//             variant="outlined"
//             type="number"
//           />
//         </FormControl>
//         <FormControl fullWidth>
//           <TextField
//             label="Months"
//             variant="outlined"
//             type="number"
//           />
//         </FormControl>
//       </Box>

//       {/* Current company name */}
//       <TextField fullWidth label="Current Company name" variant="outlined" className={styles.formItem} />

//       {/* Current job title */}
//       <TextField fullWidth label="Current job title" variant="outlined" className={styles.formItem} />

//       {/* Joining date */}
//       <label className={styles.labelEdit}>Joining Date</label>

//       <Box className={styles.inputGroup}>
//         <FormControl fullWidth>
//           <InputLabel>Years</InputLabel>
//           <Select label="Years">
//             {[...Array(50).keys()].map((year) => (
//               <MenuItem key={year} value={year + 1970}>{year + 1970}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth>
//           <InputLabel>Months</InputLabel>
//           <Select label="Months">
//             {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
//               (month, index) => (
//                 <MenuItem key={index} value={index + 1}>{month}</MenuItem>
//               )
//             )}
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Current salary */}
//       <label className={styles.labelEdit}>Current Salary</label>

//       <TextField
//         fullWidth
//         label="Current salary"
//         variant="outlined"
//         type="number"
//         InputProps={{
//           startAdornment: <InputAdornment position="start">INR</InputAdornment>,
//         }}
//         value={currentSalary}
//         onChange={(e) => setCurrentSalary(e.target.value)}
//         className={styles.formItem}
//       />

//       {/* Skills input */}
//       <FormControl fullWidth className={styles.formItem}>
//         <InputLabel htmlFor="skills">Add Skill</InputLabel>
//         <OutlinedInput
//           id="skills"
//           label="Add Skill"
//           onKeyPress={handleAddSkill}
//         />
//         <Box className={styles.chipContainer}>
//           {skills.map((skill, index) => (
//             <Chip key={index} label={skill} onDelete={handleDeleteSkill(skill)} sx={{ mr: 1, mb: 1 }} />
//           ))}
//         </Box>
//       </FormControl>

//       {/* Job profile */}
//       <TextField fullWidth label="Job profile" variant="outlined" className={styles.formItem} />

//       {/* Notice period */}
//       <FormControl fullWidth className={styles.formItem}>
//         <InputLabel>Notice period</InputLabel>
//         <Select
//           value={noticePeriod}
//           onChange={(e) => setNoticePeriod(e.target.value)}
//           label="Notice period"
//         >
//           <MenuItem value="15 Days or Less">15 Days or Less</MenuItem>
//           <MenuItem value="1 Month">1 Month</MenuItem>
//           <MenuItem value="2 Months">2 Months</MenuItem>
//           <MenuItem value="More than 3 Months">More than 3 Months</MenuItem>
//         </Select>
//       </FormControl>
//       </ScrollBar>
//       {/* Action buttons */}
//       <Box className={styles.buttonGroup}>
//         <Button variant="outlined" className={styles.cancelButton}>
//           Cancel
//         </Button>
//         <Button variant="contained" className={styles.saveButton}>
//           Save
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default EditExperienceTypeYes;


























// import React, { useState } from "react";
// import {
//   Box, Button, FormControl, FormControlLabel, InputAdornment, InputLabel,
//   MenuItem, Radio, RadioGroup, Select, TextField, Chip, OutlinedInput
// } from "@mui/material";
// import styles from "./editExperienceTypeYes.module.css"; // Import the CSS module
// import ScrollBar from "../../../../Scroll Bar/scrollBar";
// import EditExperienceTypeNo from "../Edit Experience Section Type N/editExperienceTypeNo"; // Import the No Experience Component

// const EditExperienceTypeYes = () => {
//   const [skills, setSkills] = useState(["CSS", "Design", "UI/UX"]);
//   const [currentSalary, setCurrentSalary] = useState(480000);
//   const [noticePeriod, setNoticePeriod] = useState("1 Month");
//   const [currentEmployment, setCurrentEmployment] = useState("No"); // State to track employment status

//   // Handler to add skill
//   const handleAddSkill = (event) => {
//     if (event.key === "Enter" && event.target.value !== "") {
//       setSkills([...skills, event.target.value]);
//       event.target.value = "";
//     }
//   };

//   // Handler to remove skill
//   const handleDeleteSkill = (skillToDelete) => () => {
//     setSkills((skills) => skills.filter((skill) => skill !== skillToDelete));
//   };

//   // Conditionally render the correct component based on employment status
//   if (currentEmployment === "no") {
//     return <EditExperienceTypeNo />; // Render the No experience component if "No" is selected
//   }

//   return (
//     <Box component="form" className={styles.formContainer}>
//       {/* Heading */}
//       <h2 className={styles.heading}>Work Experience</h2>
//       <ScrollBar>
//         {/* Is this your current employment */}
//         <FormControl fullWidth className={styles.formItem}>
//           <label className={styles.labelEdit}>Is this your current employment?</label>

//           <RadioGroup
//             row
//             value={currentEmployment}
//             onChange={(e) => setCurrentEmployment(e.target.value)} // Update the state when selection changes
//             name="currentEmployment"
//           >
//             <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//             <FormControlLabel value="no" control={<Radio />} label="No" />
//           </RadioGroup>
//         </FormControl>

//         {/* Employment type */}
//         <FormControl fullWidth className={styles.formItem}>
//           <label className={styles.labelEdit}>Employment Type</label>
//           <RadioGroup row defaultValue="full-time" name="employmentType">
//             <FormControlLabel value="full-time" control={<Radio />} label="Full-time" />
//             <FormControlLabel value="internship" control={<Radio />} label="Internship" />
//           </RadioGroup>
//         </FormControl>

//         {/* Company Logo */}
//         <Button variant="outlined" component="label" className={styles.uploadButton}>
//           Upload Company Logo
//           <input type="file" hidden />
//         </Button>

//         {/* Total Experience */}
//         <label className={styles.labelEdit}>Total Experience</label>
//         <Box className={styles.inputGroup}>
//           <FormControl fullWidth>
//             <TextField label="Years" variant="outlined" type="number" />
//           </FormControl>
//           <FormControl fullWidth>
//             <TextField label="Months" variant="outlined" type="number" />
//           </FormControl>
//         </Box>

//         {/* Current company name */}
//         <TextField fullWidth label="Current Company name" variant="outlined" className={styles.formItem} />

//         {/* Current job title */}
//         <TextField fullWidth label="Current job title" variant="outlined" className={styles.formItem} />

//         {/* Joining date */}
//         <label className={styles.labelEdit}>Joining Date</label>
//         <Box className={styles.inputGroup}>
//           <FormControl fullWidth>
//             <InputLabel>Years</InputLabel>
//             <Select label="Years">
//               {[...Array(50).keys()].map((year) => (
//                 <MenuItem key={year} value={year + 1970}>
//                   {year + 1970}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth>
//             <InputLabel>Months</InputLabel>
//             <Select label="Months">
//               {[
//                 "January",
//                 "February",
//                 "March",
//                 "April",
//                 "May",
//                 "June",
//                 "July",
//                 "August",
//                 "September",
//                 "October",
//                 "November",
//                 "December",
//               ].map((month, index) => (
//                 <MenuItem key={index} value={index + 1}>
//                   {month}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>

//         {/* Current salary */}
//         <label className={styles.labelEdit}>Current Salary</label>
//         <TextField
//           fullWidth
//           label="Current salary"
//           variant="outlined"
//           type="number"
//           InputProps={{
//             startAdornment: <InputAdornment position="start">INR</InputAdornment>,
//           }}
//           value={currentSalary}
//           onChange={(e) => setCurrentSalary(e.target.value)}
//           className={styles.formItem}
//         />

//         {/* Skills input */}
//         <FormControl fullWidth className={styles.formItem}>
//           <InputLabel htmlFor="skills">Add Skill</InputLabel>
//           <OutlinedInput id="skills" label="Add Skill" onKeyPress={handleAddSkill} />
//           <Box className={styles.chipContainer}>
//             {skills.map((skill, index) => (
//               <Chip key={index} label={skill} onDelete={handleDeleteSkill(skill)} sx={{ mr: 1, mb: 1 }} />
//             ))}
//           </Box>
//         </FormControl>

//         {/* Job profile */}
//         <TextField fullWidth label="Job profile" variant="outlined" className={styles.formItem} />

//         {/* Notice period */}
//         <FormControl fullWidth className={styles.formItem}>
//           <InputLabel>Notice period</InputLabel>
//           <Select value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)} label="Notice period">
//             <MenuItem value="15 Days or Less">15 Days or Less</MenuItem>
//             <MenuItem value="1 Month">1 Month</MenuItem>
//             <MenuItem value="2 Months">2 Months</MenuItem>
//             <MenuItem value="More than 3 Months">More than 3 Months</MenuItem>
//           </Select>
//         </FormControl>
//       </ScrollBar>

//       {/* Action buttons */}
//       <Box className={styles.buttonGroup}>
//         <Button variant="outlined" className={styles.cancelButton}>
//           Cancel
//         </Button>
//         <Button variant="contained" className={styles.saveButton}>
//           Save
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default EditExperienceTypeYes;






















// import React, { useState } from "react";
// import {
//   Box, Button, FormControl, FormControlLabel, InputAdornment, InputLabel,
//   MenuItem, Radio, RadioGroup, Select, TextField, Chip, OutlinedInput
// } from "@mui/material";
// import styles from "./editExperienceTypeYes.module.css"; // Import the CSS module
// import ScrollBar from "../../../../Scroll Bar/scrollBar";
// import EditExperienceTypeNo from "../Edit Experience Section Type N/editExperienceTypeNo"; // Import the No Experience Component

// const EditExperienceTypeYes = () => {
//   // State variables to hold the form data
//   const [skills, setSkills] = useState(["CSS", "Design", "UI/UX"]);
//   const [currentSalary, setCurrentSalary] = useState(480000);
//   const [noticePeriod, setNoticePeriod] = useState("1 Month");
//   const [currentEmployment, setCurrentEmployment] = useState("No");
//   const [employmentType, setEmploymentType] = useState("full-time");
//   const [totalExperienceYears, setTotalExperienceYears] = useState(0);
//   const [totalExperienceMonths, setTotalExperienceMonths] = useState(0);
//   const [companyName, setCompanyName] = useState("");
//   const [jobTitle, setJobTitle] = useState("");
//   const [joiningYear, setJoiningYear] = useState("");
//   const [joiningMonth, setJoiningMonth] = useState("");
//   const [workedUntilYear, setWorkedUntilYear] = useState("");
//   const [workedUntilMonth, setWorkedUntilMonth] = useState("");
//   const [jobProfile, setJobProfile] = useState("");

//   // Handler to add skill
//   const handleAddSkill = (event) => {
//     if (event.key === "Enter" && event.target.value !== "") {
//       setSkills([...skills, event.target.value]);
//       event.target.value = "";
//     }
//   };

//   // Handler to remove skill
//   const handleDeleteSkill = (skillToDelete) => () => {
//     setSkills((skills) => skills.filter((skill) => skill !== skillToDelete));
//   };

//   const handleSave = async () => {
//     const profileData = {
//       name: "User Name", // Include any other user-specific details if required
//       workExperience: [
//         {
//           currentEmployment,
//           employmentType,
//           companyName,
//           jobTitle,
//           joiningYear,
//           joiningMonth,
//           workedUntilYear,
//           workedUntilMonth,
//           totalExperienceYears,
//           totalExperienceMonths,
//           currentSalary,
//           jobProfile,
//           skills,
//           noticePeriod,
//         },
//       ],
//     };
  
//     try {
//       const response = await fetch("${Base_URL}/api/experienceYes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(profileData),
//       });
  
//       if (response.ok) {
//         const savedProfile = await response.json();
//         console.log("Profile saved successfully:", savedProfile);
//       } else {
//         console.error("Error saving profile");
//       }
//     } catch (error) {
//       console.error("Error during save operation:", error);
//     }
//   };
  

//   if (currentEmployment === "no") {
//     return <EditExperienceTypeNo />;
//   }

//   return (
//     <Box component="form" className={styles.formContainer}>
//       {/* Work Experience Form */}
//       <h2 className={styles.heading}>Work Experience</h2>
//       <ScrollBar>
//         {/* Current Employment */}
//         <FormControl fullWidth className={styles.formItem}>
//           <label className={styles.labelEdit}>Is this your current employment?</label>
//           <RadioGroup
//             row
//             value={currentEmployment}
//             onChange={(e) => setCurrentEmployment(e.target.value)}
//             name="currentEmployment"
//           >
//             <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//             <FormControlLabel value="no" control={<Radio />} label="No" />
//           </RadioGroup>
//         </FormControl>

//         {/* Employment Type */}
//         <FormControl fullWidth className={styles.formItem}>
//           <label className={styles.labelEdit}>Employment Type</label>
//           <RadioGroup
//             row
//             value={employmentType}
//             onChange={(e) => setEmploymentType(e.target.value)}
//             name="employmentType"
//           >
//             <FormControlLabel value="full-time" control={<Radio />} label="Full-time" />
//             <FormControlLabel value="internship" control={<Radio />} label="Internship" />
//           </RadioGroup>
//         </FormControl>

//         {/* Total Experience */}
//         <label className={styles.labelEdit}>Total Experience</label>
//         <Box className={styles.inputGroup}>
//           <FormControl fullWidth>
//             <TextField
//               label="Years"
//               variant="outlined"
//               type="number"
//               value={totalExperienceYears}
//               onChange={(e) => setTotalExperienceYears(e.target.value)}
//             />
//           </FormControl>
//           <FormControl fullWidth>
//             <TextField
//               label="Months"
//               variant="outlined"
//               type="number"
//               value={totalExperienceMonths}
//               onChange={(e) => setTotalExperienceMonths(e.target.value)}
//             />
//           </FormControl>
//         </Box>

//         {/* Company Name */}
//         <TextField
//           fullWidth
//           label="Current Company Name"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//           variant="outlined"
//           className={styles.formItem}
//         />

//         {/* Job Title */}
//         <TextField
//           fullWidth
//           label="Current Job Title"
//           value={jobTitle}
//           onChange={(e) => setJobTitle(e.target.value)}
//           variant="outlined"
//           className={styles.formItem}
//         />

//         {/* Joining Date */}
//         <label className={styles.labelEdit}>Joining Date</label>
//         <Box className={styles.inputGroup}>
//           <FormControl fullWidth>
//             <InputLabel>Years</InputLabel>
//             <Select value={joiningYear} onChange={(e) => setJoiningYear(e.target.value)}>
//               {[...Array(50).keys()].map((year) => (
//                 <MenuItem key={year} value={year + 1970}>
//                   {year + 1970}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth>
//             <InputLabel>Months</InputLabel>
//             <Select value={joiningMonth} onChange={(e) => setJoiningMonth(e.target.value)}>
//               {[
//                 "January", "February", "March", "April", "May", "June",
//                 "July", "August", "September", "October", "November", "December"
//               ].map((month, index) => (
//                 <MenuItem key={index} value={index + 1}>
//                   {month}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>

//         {/* Worked Until Date */}
//         <label className={styles.labelEdit}>Worked Until</label>
//         <Box className={styles.inputGroup}>
//           <FormControl fullWidth>
//             <InputLabel>Years</InputLabel>
//             <Select value={workedUntilYear} onChange={(e) => setWorkedUntilYear(e.target.value)}>
//               {[...Array(50).keys()].map((year) => (
//                 <MenuItem key={year} value={year + 1970}>
//                   {year + 1970}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth>
//             <InputLabel>Months</InputLabel>
//             <Select value={workedUntilMonth} onChange={(e) => setWorkedUntilMonth(e.target.value)}>
//               {[
//                 "January", "February", "March", "April", "May", "June",
//                 "July", "August", "September", "October", "November", "December"
//               ].map((month, index) => (
//                 <MenuItem key={index} value={index + 1}>
//                   {month}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>

//         {/* Job Profile */}
//         <TextField
//           fullWidth
//           label="Job Profile"
//           value={jobProfile}
//           onChange={(e) => setJobProfile(e.target.value)}
//           variant="outlined"
//           className={styles.formItem}
//         />

//         {/* Current Salary */}
//         <label className={styles.labelEdit}>Current Salary</label>
//         <TextField
//           fullWidth
//           label="Current Salary"
//           variant="outlined"
//           type="number"
//           value={currentSalary}
//           onChange={(e) => setCurrentSalary(e.target.value)}
//           InputProps={{
//             startAdornment: <InputAdornment position="start">INR</InputAdornment>,
//           }}
//           className={styles.formItem}
//         />

//         {/* Skills input */}
//         <FormControl fullWidth className={styles.formItem}>
//           <InputLabel htmlFor="skills">Add Skill</InputLabel>
//           <OutlinedInput id="skills" label="Add Skill" onKeyPress={handleAddSkill} />
//           <Box className={styles.chipContainer}>
//             {skills.map((skill, index) => (
//               <Chip key={index} label={skill} onDelete={handleDeleteSkill(skill)} sx={{ mr: 1 }} />
//             ))}
//           </Box>
//         </FormControl>

//         {/* Save Button */}
//         <Box className={styles.buttonGroup}>
//           <Button variant="outlined" className={styles.cancelButton}>
//             Cancel
//           </Button>
//           <Button variant="contained" className={styles.saveButton} onClick={handleSave}>
//             Save
//           </Button>
//         </Box>
//       </ScrollBar>
//     </Box>
//   );
// };

// export default EditExperienceTypeYes;
















import { Base_URL } from "../../../../../const/const";

import React, { useState } from "react";
import {
  Box, Button, FormControl, FormControlLabel, InputAdornment, InputLabel,
  MenuItem, Radio, RadioGroup, Select, TextField, Chip, OutlinedInput
} from "@mui/material";
import styles from "./editExperienceTypeYes.module.css"; // Import the CSS module
import ScrollBar from "../../../../Scroll Bar/scrollBar";
import EditExperienceTypeNo from "../Edit Experience Section Type N/editExperienceTypeNo"; // Import the No Experience Component

const EditExperienceTypeYes = ({ onClose }) => {  // Added onClose as a prop
  // State variables to hold the form data
  const [skills, setSkills] = useState(["CSS", "Design", "UI/UX"]);
  const [currentSalary, setCurrentSalary] = useState(480000);
  const [noticePeriod, setNoticePeriod] = useState("1 Month");
  const [currentEmployment, setCurrentEmployment] = useState("No");
  const [employmentType, setEmploymentType] = useState("full-time");
  const [totalExperienceYears, setTotalExperienceYears] = useState(0);
  const [totalExperienceMonths, setTotalExperienceMonths] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [joiningYear, setJoiningYear] = useState("");
  const [joiningMonth, setJoiningMonth] = useState("");
  const [workedUntilYear, setWorkedUntilYear] = useState("");
  const [workedUntilMonth, setWorkedUntilMonth] = useState("");
  const [jobProfile, setJobProfile] = useState("");

  // Handler to add skill
  const handleAddSkill = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setSkills([...skills, event.target.value]);
      event.target.value = "";
    }
  };

  // Handler to remove skill
  const handleDeleteSkill = (skillToDelete) => () => {
    setSkills((skills) => skills.filter((skill) => skill !== skillToDelete));
  };

  // Save handler
  const handleSave = async () => {
    const email = localStorage.getItem("email"); // Retrieve the email from localStorage

    const profileData = {
      email: email,
      workExperience: {
        currentEmployment,
        employmentType,
        companyName,
        jobTitle,
        joiningYear,
        joiningMonth,
        workedUntilYear,
        workedUntilMonth,
        totalExperienceYears,
        totalExperienceMonths,
        currentSalary,
        jobProfile,
        skills,
        noticePeriod,
      },
    };

    try {
      const response = await fetch(`${Base_URL}/api/experienceYes/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        console.log("Profile updated successfully:", updatedProfile);
        onClose();  // Close the form after a successful save
      } else {
        const errorResponse = await response.json();
        console.error("Error updating profile:", errorResponse.message);
      }
    } catch (error) {
      console.error("Error during update operation:", error);
    }
  };

  if (currentEmployment === "no") {
    return <EditExperienceTypeNo />;
  }

  return (
    <Box component="form" className={styles.formContainer}>
      {/* Work Experience Form */}
      <h2 className={styles.heading}>Work Experience</h2>
      <ScrollBar>
        {/* Current Employment */}
        <FormControl fullWidth className={styles.formItem}>
          <label className={styles.labelEdit}>Is this your current employment?</label>
          <RadioGroup
            row
            value={currentEmployment}
            onChange={(e) => setCurrentEmployment(e.target.value)}
            name="currentEmployment"
  sx={{ marginBottom: '10px' }} // Adding margin bottom of 10px

          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        {/* Employment Type */}
        <FormControl fullWidth className={styles.formItem}>
          <label className={styles.labelEdit}>Employment Type</label>
          <RadioGroup
            row
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            name="employmentType"
  sx={{ marginBottom: '10px' }} // Adding margin bottom of 10px

          >
            <FormControlLabel value="full-time" control={<Radio />} label="Full-time" />
            <FormControlLabel value="internship" control={<Radio />} label="Internship" />
          </RadioGroup>
        </FormControl>

        {/* Total Experience */}
        <label className={styles.labelEdit} >Total Experience</label>
        <Box className={styles.inputGroup}>
          <FormControl fullWidth>
            <TextField
              label="Years"
              variant="outlined"
              type="number"
              value={totalExperienceYears}
              onChange={(e) => setTotalExperienceYears(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Months"
              variant="outlined"
              type="number"
              value={totalExperienceMonths}
              onChange={(e) => setTotalExperienceMonths(e.target.value)}
              
            />
          </FormControl>
        </Box>

{/* Company Name */}
<TextField
  fullWidth
  label="Current Company Name"
  value={companyName}
  onChange={(e) => setCompanyName(e.target.value)}
  variant="outlined"
  className={styles.formItem}
  sx={{ marginBottom: '10px' }} // Adding margin bottom of 10px
/>


        {/* Job Title */}
        <TextField
          fullWidth
          label="Current Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          variant="outlined"
          className={styles.formItem}
  sx={{ marginBottom: '10px' }} // Adding margin bottom of 10px

        />

        {/* Joining Date */}
        <label className={styles.labelEdit}>Joining Date</label>
        <Box className={styles.inputGroup}>
          <FormControl fullWidth>
            <InputLabel>Years</InputLabel>
            <Select value={joiningYear} onChange={(e) => setJoiningYear(e.target.value)}>
              {[...Array(50).keys()].map((year) => (
                <MenuItem key={year} value={year + 1970}>
                  {year + 1970}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Months</InputLabel>
            <Select value={joiningMonth} onChange={(e) => setJoiningMonth(e.target.value)}>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((month, index) => (
                <MenuItem key={index} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Worked Until Date */}
        <label className={styles.labelEdit}>Worked Until</label>
        <Box className={styles.inputGroup}>
          <FormControl fullWidth>
            <InputLabel>Years</InputLabel>
            <Select value={workedUntilYear} onChange={(e) => setWorkedUntilYear(e.target.value)}>
              {[...Array(50).keys()].map((year) => (
                <MenuItem key={year} value={year + 1970}>
                  {year + 1970}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Months</InputLabel>
            <Select value={workedUntilMonth} onChange={(e) => setWorkedUntilMonth(e.target.value)}>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((month, index) => (
                <MenuItem key={index} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Job Profile */}
        <TextField
          fullWidth
          label="Job Profile"
          value={jobProfile}
          onChange={(e) => setJobProfile(e.target.value)}
          variant="outlined"
          className={styles.formItem}
  sx={{ marginBottom: '10px' }} // Adding margin bottom of 10px

        />

        {/* Current Salary */}
        <label className={styles.labelEdit}>Current Salary</label>
        <TextField
          fullWidth
          label="Current Salary"
          variant="outlined"
          type="number"
  sx={{ marginBottom: '10px',
    marginTop:'10px'

   }} // Adding margin bottom of 10px

          value={currentSalary}
          onChange={(e) => setCurrentSalary(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">INR</InputAdornment>,
          }}
          className={styles.formItem}
        />

        {/* Skills input */}
        <FormControl fullWidth className={styles.formItem}>
          <InputLabel htmlFor="skills">Add Skill</InputLabel>
          <OutlinedInput id="skills" label="Add Skill" onKeyPress={handleAddSkill} />
          <Box className={styles.chipContainer}>
            {skills.map((skill, index) => (
              <Chip key={index} label={skill} onDelete={handleDeleteSkill(skill)} sx={{ mr: 1 }} />
            ))}
          </Box>
        </FormControl>


      </ScrollBar>

              {/* Save Button */}
              <Box className={styles.buttonGroup}>
             
            <Button variant="outlined" className={styles.cancelButton} onClick={onClose} >
            Cancel

          </Button>
          <Button variant="contained" className={styles.saveButton} onClick={handleSave}>
            Save
          </Button>
        </Box>
    </Box>
  );
};

export default EditExperienceTypeYes;
