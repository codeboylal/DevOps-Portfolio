
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './experienceSection.module.css';
// import {  FaPlus } from 'react-icons/fa'; 
// import EditIcon from '@mui/icons-material/Edit';

// import EditExperienceTypeNo from './Edit Section/Edit Experience Section Type N/editExperienceTypeNo'; 
// import Toaster from '../../Toaster/toaster';
// // import { formatDistanceStrict } from 'date-fns'; // For calculating duration

// const WorkExperience = () => {
//   const [isEditFormVisible, setEditFormVisible] = useState(false);
//   const [experiences, setExperiences] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [selectedExperience, setSelectedExperience] = useState(null);
//   const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);

//   useEffect(() => {
//     const fetchExperiences = async () => {
//       try {
//         const id = localStorage.getItem('id'); 
//         if (!id) throw new Error('Profile ID not found.');

//         const response = await axios.get(`${Base_URL}/api/profile/${id}`);
//         setExperiences(response.data.workExperience || []);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExperiences();
//   }, []);

//   // const calculateDuration = (startYear, startMonth, endYear, endMonth) => {
//   //   if (!startYear || !startMonth) return '-';

//   //   const startDate = new Date(startYear, startMonth - 1);
//   //   const endDate = endYear && endMonth ? new Date(endYear, endMonth - 1) : new Date(); // Till Date if no end date
//   //   return formatDistanceStrict(startDate, endDate);
//   // };

//   // Handle editing an existing experience
//   const handleEditExperience = (index) => {
//     setSelectedExperience([experiences[index]]); // Select the experience at the specified index
//     setSelectedExperienceIndex(index); // Track the index of the selected experience
//     setEditFormVisible(true); // Show the edit form
//   };

//   // Handle adding a new experience
//   const handleAddExperience = () => {
//     const newExperience = {
//       currentEmployment: '',
//       employmentType: 'Full-time',
//       companyName: '',
//       jobTitle: '',
//       joiningYear: '',
//       joiningMonth: '',
//       workedUntilYear: '',
//       workedUntilMonth: '',
//       jobProfile: '',
//     };
//     setSelectedExperience([newExperience]); // Pass a new empty experience
//     setSelectedExperienceIndex(null); // This is a new experience, so no index
//     setEditFormVisible(true); // Show the form to add the new experience
//   };

//   const handleSaveExperience = (updatedExperience) => {
//     let updatedExperiences = [...experiences];
  
//     if (selectedExperienceIndex !== null) {
//       // Update the selected experience if it's being edited
//       updatedExperiences[selectedExperienceIndex] = updatedExperience[selectedExperienceIndex];
//     } else {
//       // Add new experience
//       updatedExperiences = updatedExperience;
//     }
  
//     setExperiences(updatedExperiences); // Set the updated experiences array
//     setEditFormVisible(false); // Hide the form
//     setToast({
//       message: selectedExperienceIndex !== null ? 'Successfully Updated Work Experience' : 'Successfully Added Work Experience',
//       type: 'success',
//     });
//   };

//   const closeToaster = () => {
//     setToast({ message: '', type: '' });
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <span>Work Experience</span>
//         <FaPlus className={styles.addIcon} onClick={handleAddExperience} /> {/* Add icon */}
//       </div>

//       {experiences.length === 0 ? (
//         <div className={styles.experience}>-</div>
//       ) : (
//         experiences.map((exp, index) => (
//           <div key={index} className={styles.experience}>
//             <div className={styles.details}>
//               <div className={styles.titleRow}>
//                 <span className={styles.title}>{exp.jobTitle || '-'}</span>
//                 <EditIcon 
//                   className={styles.editIcon} 
//                   onClick={() => handleEditExperience(index)} // Trigger editing the selected experience
//                 />
//               </div>
//               <div className={styles.company}>{exp.companyName || '-'}</div>
//               <div className={styles.employmentDetails}>
//                 {exp.employmentType || 'Full-time'} | {exp.joiningMonth && exp.joiningYear 
//                   ? `${exp.joiningMonth} ${exp.joiningYear} to ${exp.workedUntilMonth} ${exp.workedUntilYear}` 
//                   : '-'}
//               </div>
//               <div className={styles.duration}>
//                 {exp.joiningYear && exp.joiningMonth && (
//                   <span>
//                     {/* {calculateDuration(exp.joiningYear, exp.joiningMonth, exp.workedUntilYear, exp.workedUntilMonth)} */}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       {isEditFormVisible && (
//         <div className={styles.overlay}>
//           <EditExperienceTypeNo 
//             onClose={() => setEditFormVisible(false)} 
//             onSave={handleSaveExperience} 
//             initialExperiences={selectedExperience} // Ensure this is the selected experience or new experience
//           />
//         </div>
//       )}

//       {toast.message && (
//         <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
//       )}
//     </div>
//   );
// };

// export default WorkExperience;
















































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './experienceSection.module.css';
// import { FaPlus } from 'react-icons/fa'; 
// import EditIcon from '@mui/icons-material/Edit';
// import { MdOutlineError } from 'react-icons/md'; // Import an icon for "No Data Found"
// import EditExperienceTypeNo from './Edit Section/Edit Experience Section Type N/editExperienceTypeNo'; 
// import Toaster from '../../Toaster/toaster';
// import NoDataFound from '../Empty Screen/noDataFound';

// const WorkExperience = () => {
//   const [isEditFormVisible, setEditFormVisible] = useState(false);
//   const [experiences, setExperiences] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [selectedExperience, setSelectedExperience] = useState(null);
//   const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);

//   useEffect(() => {
//     const fetchExperiences = async () => {
//       try {
//         const id = localStorage.getItem('id'); 
//         if (!id) throw new Error('Profile ID not found.');

//         const response = await axios.get(`${Base_URL}/api/profile/${id}`);
//         setExperiences(response.data.workExperience || []);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExperiences();
//   }, []);

//   // Handle editing an existing experience
//   const handleEditExperience = (index) => {
//     setSelectedExperience([experiences[index]]);
//     setSelectedExperienceIndex(index);
//     setEditFormVisible(true);
//   };

//   // Handle adding a new experience
//   const handleAddExperience = () => {
//     const newExperience = {
//       currentEmployment: '',
//       employmentType: 'Full-time',
//       companyName: '',
//       jobTitle: '',
//       joiningYear: '',
//       joiningMonth: '',
//       workedUntilYear: '',
//       workedUntilMonth: '',
//       jobProfile: '',
//     };
//     setSelectedExperience([newExperience]);
//     setSelectedExperienceIndex(null);
//     setEditFormVisible(true);
//   };

//   const handleSaveExperience = (updatedExperience) => {
//     let updatedExperiences = [...experiences];
  
//     if (selectedExperienceIndex !== null) {
//       updatedExperiences[selectedExperienceIndex] = updatedExperience[selectedExperienceIndex];
//     } else {
//       updatedExperiences = updatedExperience;
//     }
  
//     setExperiences(updatedExperiences);
//     setEditFormVisible(false);
//     setToast({
//       message: selectedExperienceIndex !== null ? 'Successfully Updated Work Experience' : 'Successfully Added Work Experience',
//       type: 'success',
//     });
//   };

//   const closeToaster = () => {
//     setToast({ message: '', type: '' });
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <span>Work Experience</span>
//         <FaPlus className={styles.addIcon} onClick={handleAddExperience} />
//       </div>

//       {experiences.length === 0 ? (
//             <NoDataFound message="No profile data found." />
               
//                // <NoDataFound message={error ? "Error fetching data" : "No headline data found"} />

//       ) : (
//         experiences.map((exp, index) => (
//           <div key={index} className={styles.experience}>
//             <div className={styles.details}>
//               <div className={styles.titleRow}>
//                 <span className={styles.title}>{exp.jobTitle || '-'}</span>
//                 <EditIcon 
//                   className={styles.editIcon} 
//                   onClick={() => handleEditExperience(index)}
//                 />
//               </div>
//               <div className={styles.company}>{exp.companyName || '-'}</div>
//               <div className={styles.employmentDetails}>
//                 {exp.employmentType || 'Full-time'} | {exp.joiningMonth && exp.joiningYear 
//                   ? `${exp.joiningMonth} ${exp.joiningYear} to ${exp.workedUntilMonth} ${exp.workedUntilYear}` 
//                   : '-'}
//               </div>
//               <div className={styles.duration}>
//                 {exp.joiningYear && exp.joiningMonth && (
//                   <span>
//                     {/* {calculateDuration(exp.joiningYear, exp.joiningMonth, exp.workedUntilYear, exp.workedUntilMonth)} */}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       {isEditFormVisible && (
//         <div className={styles.overlay}>
//           <EditExperienceTypeNo 
//             onClose={() => setEditFormVisible(false)} 
//             onSave={handleSaveExperience} 
//             initialExperiences={selectedExperience} 
//           />
//         </div>
//       )}

//       {toast.message && (
//         <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
//       )}
//     </div>
//   );
// };

// export default WorkExperience;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './experienceSection.module.css';
// import EditIcon from '@mui/icons-material/Edit';
// import { MdOutlineError } from 'react-icons/md'; // Import an icon for "No Data Found"
// import EditExperienceTypeNo from './Edit Section/Edit Experience Section Type N/editExperienceTypeNo'; 
// import Toaster from '../../Toaster/toaster';
// import NoDataFound from '../Empty Screen/noDataFound';

// const WorkExperience = () => {
//   const [isEditFormVisible, setEditFormVisible] = useState(false);
//   const [experiences, setExperiences] = useState([]); // Initialize experiences as an array
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [selectedExperience, setSelectedExperience] = useState(null); // Single object for selected experience
//   const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);

//   // Fetch experiences from the backend
//   useEffect(() => {
//     const fetchExperiences = async () => {
//       try {
//         const id = localStorage.getItem('id'); 
//         if (!id) throw new Error('Profile ID not found.');

//         const response = await axios.get(`${Base_URL}/api/profile/${id}`);

//         // Log the response to check the data structure
//         console.log('Fetched experiences:', response.data.workExperience);

//         // Safely set experiences or fallback to an empty array
//         setExperiences(Array.isArray(response.data.workExperience) ? response.data.workExperience : []);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         setExperiences([]); // Ensure experiences is always an array even on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExperiences();
//   }, []);

//   // Handle editing an existing experience
//   const handleEditExperience = (index) => {
//     setSelectedExperience(experiences[index]); // Pass single object, not array
//     setSelectedExperienceIndex(index);
//     setEditFormVisible(true);
//   };

//   // Handle saving the updated experience
//   const handleSaveExperience = (updatedExperience) => {
//     let updatedExperiences = [...experiences];
  
//     if (selectedExperienceIndex !== null) {
//       updatedExperiences[selectedExperienceIndex] = updatedExperience; // Update the specific experience
//       setExperiences(updatedExperiences); // Update state with modified experience
//       setEditFormVisible(false);

//       setToast({
//         message: 'Successfully Updated Work Experience',
//         type: 'success',
//       });
//     }
//   };


//   const handleDeleteClick = async (itemId) => {
//     // if (!window.confirm('Are you sure you want to delete this education item?')) return;

//     try {
//       const id = localStorage.getItem('id');
//       await axios.delete(`${Base_URL}/api/education/${id}/${itemId}`);
//       setToast({ message: 'Education deleted successfully', type: 'success' });
//       fetchExperiences();
//     } catch (error) {
//       console.error('Error deleting education data:', error);
//       setToast({ message: 'Failed to delete education', type: 'error' });
//     }
//   };

//   // Close the toaster
//   const closeToaster = () => {
//     setToast({ message: '', type: '' });
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <span>Work Experience</span>
//       </div>

//       {Array.isArray(experiences) && experiences.length === 0 ? (
//         <NoDataFound message="No profile data found." />
//       ) : (
//         Array.isArray(experiences) && experiences.map((exp, index) => (
//           <div key={index} className={styles.experience}>
//             <div className={styles.details}>
//               <div className={styles.titleRow}>
//                 <span className={styles.title}>{exp.jobTitle || '-'}</span>
//                 <EditIcon 
//                   className={styles.editIcon} 
//                   onClick={() => handleEditExperience(index)}
//                 />
//               </div>
//               <div className={styles.company}>{exp.companyName || '-'}</div>
//               <div className={styles.employmentDetails}>
//                 {exp.employmentType || 'Full-time'} | {exp.joiningMonth && exp.joiningYear 
//                   ? `${exp.joiningMonth} ${exp.joiningYear} to ${exp.workedUntilMonth} ${exp.workedUntilYear}` 
//                   : '-'}
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       {isEditFormVisible && (
//         <div className={styles.overlay}>
//           <EditExperienceTypeNo 
//             onClose={() => setEditFormVisible(false)} 
//             onSave={handleSaveExperience} 
//             initialExperience={selectedExperience} // Pass single experience
//           />
//         </div>
//       )}

//       {toast.message && (
//         <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
//       )}
//     </div>
//   );
// };

// export default WorkExperience;













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './experienceSection.module.css';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon
// import EditExperienceTypeNo from './Edit Section/Edit Experience Section Type N/editExperienceTypeNo'; 
// import Toaster from '../../Toaster/toaster';
// import NoDataFound from '../Empty Screen/noDataFound';

// const WorkExperience = () => {
//   const [isEditFormVisible, setEditFormVisible] = useState(false);
//   const [experiences, setExperiences] = useState([]); // Initialize experiences as an array
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [selectedExperience, setSelectedExperience] = useState(null); // Single object for selected experience
//   const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);

//   // Fetch experiences from the backend
//   useEffect(() => {
//     const fetchExperiences = async () => {
//       try {
//         const id = localStorage.getItem('id'); 
//         if (!id) throw new Error('Profile ID not found.');

//         const response = await axios.get(`${Base_URL}/api/profile/${id}`);

//         console.log('Fetched experiences:', response.data.workExperience);
//         setExperiences(Array.isArray(response.data.workExperience) ? response.data.workExperience : []);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         setExperiences([]); 
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExperiences();
//   }, []);

//   // Handle editing an existing experience
//   const handleEditExperience = (index) => {
//     setSelectedExperience(experiences[index]); 
//     setSelectedExperienceIndex(index);
//     setEditFormVisible(true);
//   };

//   // Handle saving the updated experience
//   const handleSaveExperience = (updatedExperience) => {
//     let updatedExperiences = [...experiences];

//     if (selectedExperienceIndex !== null) {
//       updatedExperiences[selectedExperienceIndex] = updatedExperience; 
//       setExperiences(updatedExperiences); 
//       setEditFormVisible(false);

//       setToast({
//         message: 'Successfully Updated Work Experience',
//         type: 'success',
//       });
//     }
//   };

//   const handleDeleteExperience = async (index) => {
//     try {
//       const id = localStorage.getItem('id'); // Get the user's profile ID
//       if (!id) {
//         setToast({ message: 'Profile ID not found', type: 'error' });
//         return;
//       }
  
//       // Send the DELETE request to the backend
//       await axios.delete(`${Base_URL}/api/profile/${id}/experience/${index}`);
  
//       // If successful, update the state to remove the deleted experience
//       const updatedExperiences = experiences.filter((_, i) => i !== index);
//       setExperiences(updatedExperiences);
  
//       setToast({ message: 'Experience deleted successfully', type: 'success' });
//     } catch (error) {
//       console.error('Error deleting experience:', error);
//       setToast({ message: 'Failed to delete experience', type: 'error' });
//     }
//   };
  

//   // Close the toaster
//   const closeToaster = () => {
//     setToast({ message: '', type: '' });
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <span>Work Experience</span>
//       </div>

//       {Array.isArray(experiences) && experiences.length === 0 ? (
//         <NoDataFound message="No profile data found." />
//       ) : (
//         Array.isArray(experiences) && experiences.map((exp, index) => (
//           <div key={index} className={styles.experience}>
//             <div className={styles.details}>
//               <div className={styles.titleRow}>
//                 <span className={styles.title}>{exp.jobTitle || '-'}</span>
//                 <EditIcon 
//                   className={styles.editIcon} 
//                   onClick={() => handleEditExperience(index)}
//                 />
//                 <DeleteIcon 
//                   className={styles.deleteIcon} // Add Delete icon
//                   onClick={() => handleDeleteExperience(index)} // Trigger delete on click
//                 />
//               </div>
//               <div className={styles.company}>{exp.companyName || '-'}</div>
//               <div className={styles.employmentDetails}>
//                 {exp.employmentType || 'Full-time'} | {exp.joiningMonth && exp.joiningYear 
//                   ? `${exp.joiningMonth} ${exp.joiningYear} to ${exp.workedUntilMonth} ${exp.workedUntilYear}` 
//                   : '-'}
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       {isEditFormVisible && (
//         <div className={styles.overlay}>
//           <EditExperienceTypeNo 
//             onClose={() => setEditFormVisible(false)} 
//             onSave={handleSaveExperience} 
//             initialExperience={selectedExperience} 
//           />
//         </div>
//       )}

//       {toast.message && (
//         <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
//       )}
//     </div>
//   );
// };

// export default WorkExperience;













import { Base_URL } from '../../../const/const';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './experienceSection.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon
import EditExperienceTypeNo from './Edit Section/Edit Experience Section Type N/editExperienceTypeNo'; 
import Toaster from '../../Toaster/toaster';
import NoDataFound from '../Empty Screen/noDataFound';
import { Add } from '@mui/icons-material'; 

const WorkExperience = () => {
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [experiences, setExperiences] = useState([]); // Initialize experiences as an array
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [selectedExperience, setSelectedExperience] = useState(null); // Single object for selected experience
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);

  useEffect(()=>{
    if(isEditFormVisible){
      document.body.style.overflowY = "hidden";
    }else{
      document.body.style.overflowY = "scroll";
    }
  },[isEditFormVisible])


  // Fetch experiences from the backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const id = localStorage.getItem('id'); 
        if (!id) throw new Error('Profile ID not found.');

        const response = await axios.get(`${Base_URL}/api/profile/${id}`);

        console.log('Fetched experiences:', response.data.workExperience);
        setExperiences(Array.isArray(response.data.workExperience) ? response.data.workExperience : []);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setExperiences([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Handle editing an existing experience
  const handleEditExperience = (index) => {
    setSelectedExperience(experiences[index]); 
    setSelectedExperienceIndex(index);
    setEditFormVisible(true);
  };

  // Handle saving the updated experience
  const handleSaveExperience = (updatedExperience) => {
    let updatedExperiences = [...experiences];

    if (selectedExperienceIndex !== null) {
      // If editing an existing experience, update it
      updatedExperiences[selectedExperienceIndex] = updatedExperience; 
    } else {
      // If adding a new experience, push it to the array
      updatedExperiences.push(updatedExperience);
    }

    setExperiences(updatedExperiences); 
    setEditFormVisible(false);

    setToast({
      message: selectedExperienceIndex !== null 
        ? 'Successfully Updated Work Experience' 
        : 'Successfully Added Work Experience',
      type: 'success',
    });
  };

  const handleDeleteExperience = async (index) => {
    try {
      const id = localStorage.getItem('id'); // Get the user's profile ID
      if (!id) {
        setToast({ message: 'Profile ID not found', type: 'error' });
        return;
      }
  
      // Send the DELETE request to the backend
      await axios.delete(`${Base_URL}/api/profile/${id}/experience/${index}`);
  
      // If successful, update the state to remove the deleted experience
      const updatedExperiences = experiences.filter((_, i) => i !== index);
      setExperiences(updatedExperiences);
  
      setToast({ message: 'Experience deleted successfully', type: 'success' });
    } catch (error) {
      console.error('Error deleting experience:', error);
      setToast({ message: 'Failed to delete experience', type: 'error' });
    }
  };

  // Close the toaster
  const closeToaster = () => {
    setToast({ message: '', type: '' });
  };

  // Handle adding a new experience
  const handleAddExperience = () => {
    setSelectedExperience(null); // Reset the selected experience to null for adding new
    setSelectedExperienceIndex(null); 
    setEditFormVisible(true); // Show the form
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Work Experience</span>
        {/* <button className={styles.addButton} onClick={handleAddExperience}>+ Add Experience</button> */}
        <  Add  className={styles.addButton} onClick={handleAddExperience} style={{cursor:'pointer'}}/>
      </div>

      {Array.isArray(experiences) && experiences.length === 0 ? (
        <NoDataFound message="No profile data found." />
      ) : (
        Array.isArray(experiences) && experiences.map((exp, index) => (
          <div key={index} className={styles.experience}>
            <div className={styles.details}>
              <div className={styles.titleRow}>
                <span className={styles.title}>{exp.jobTitle || '-'}</span>
                {/* <EditIcon 
                  className={styles.editIcon} 
                  onClick={() => handleEditExperience(index)}
                /> */}
                <DeleteIcon 
                  className={styles.deleteIcon} 
                  onClick={() => handleDeleteExperience(index)} 
                  style={{color:'#2A85FE',cursor:'pointer'}}
                />
              </div>
              <div className={styles.company}>{exp.companyName || '-'}</div>
              <div className={styles.employmentDetails}>
                {exp.employmentType || 'Full-time'} | {exp.joiningMonth && exp.joiningYear 
                  ? `${exp.joiningMonth} ${exp.joiningYear} to ${exp.workedUntilMonth} ${exp.workedUntilYear}` 
                  : '-'}
              </div>
            </div>
          </div>
        ))
      )}

      {isEditFormVisible && (
        <div className={styles.overlay}>
          <EditExperienceTypeNo 
            onClose={() => setEditFormVisible(false)} 
            onSave={handleSaveExperience} 
            initialExperience={selectedExperience} 
          />
        </div>
      )}

      {toast.message && (
        <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
      )}
    </div>
  );
};

export default WorkExperience;
