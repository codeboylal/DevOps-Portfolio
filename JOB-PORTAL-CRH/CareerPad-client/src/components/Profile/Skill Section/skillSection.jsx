
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './skillSection.module.css';
// import { FaPlus } from 'react-icons/fa';
// import EditSkillForm from './Edit skills/editSkills'; // Import the form component
// import Toaster from '../../Toaster/toaster'; // Ensure correct path

// const Skills = () => {
//   const [skills, setSkills] = useState([]);
//   const [isEditFormVisible, setEditFormVisible] = useState(false); // State to toggle form visibility
//   const [toast, setToast] = useState({ message: '', type: '' }); // State for toaster
//   const MAX_SKILLS = 10; // Define the maximum number of skills

//   // Fetch skills from the profile table on component mount
//   useEffect(() => {
//     const id = localStorage.getItem('id');

//     axios.get(`${Base_URL}/api/profile/${id}`)
//       .then(response => {
//         setSkills(response.data.skills || []); // Set skills or an empty array
//       })
//       .catch(error => console.error('Error fetching skills:', error));
//   }, []);

//   const handleRemoveSkill = (skillToRemove) => {
//     const id = localStorage.getItem('id');
  
//     axios.delete(`${Base_URL}/api/profile/skills/${id}`, {
//       params: { skillName: skillToRemove }
//     })
//     .then(response => {
//       setSkills(response.data.skills || []);
//       setToast({ message: 'Skill removed successfully.', type: 'success' });
//     })
//     .catch(error => {
//       console.error('Error removing skill:', error);
//       setToast({ message: 'Failed to remove skill. Please try again.', type: 'error' });
//     });
//   };
  
//   // Function to handle adding a new skill
//   const handleAddSkill = (newSkill) => {
//     if (skills.length >= MAX_SKILLS) {
//       setToast({ message: 'You can only add 10 skills.', type: 'error' });
//       return;
//     }
//     setSkills(prevSkills => [...prevSkills, newSkill]);
//     setToast({ message: 'Skill updated successfully!', type: 'success' });
//   };

//   // Close toaster handler
//   const closeToaster = () => setToast({ message: '', type: '' });

//   return (
//     <div className={styles.skillsContainer}>
//       <div className={styles.header}>
//         <h3>Skills</h3>
//         <FaPlus className={styles.addIcon} onClick={() => {
//           if (skills.length < MAX_SKILLS) setEditFormVisible(true);
//           else setToast({ message: 'Maximum skill limit reached!', type: 'error' });
//         }} />
//       </div>
//       <div className={styles.skillsList}>
//         {skills.length > 0 ? (
//           skills.map((skill, index) => (
//             <div key={`${skill}-${index}`} className={styles.skillItem}>
//               {skill}
//               <span className={styles.removeIcon} onClick={() => handleRemoveSkill(skill)}>
//                 ✕
//               </span>
//             </div>
//           ))
//         ) : (
//           <div>-</div> // Display "-" when no skills are available
//         )}
//       </div>

//       {/* Conditional rendering of EditSkillForm */}
//       {isEditFormVisible && (
//         <EditSkillForm 
//           onClose={() => setEditFormVisible(false)} 
//           onAddSkill={handleAddSkill} 
//           currentSkills={skills} 
//           totalSkillsCount={skills.length} // Pass the current count of skills to the form
//         />
//       )}

//       {/* Render the toaster when there's a message */}
//       {toast.message && (
//         <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
//       )}
//     </div>
//   );
// };

// export default Skills;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './skillSection.module.css';
// import { FaPlus } from 'react-icons/fa';
import { MdOutlineError } from 'react-icons/md'; // Import an icon for "No Data Found"
import EditSkillForm from './Edit skills/editSkills'; 
// import Toaster from '../../Toaster/toaster'; 
import {useToaster} from "../../Toaster.js";
import NoDataFound from '../Empty Screen/noDataFound';
import { Add } from '@mui/icons-material'; 

import { Base_URL } from '../../../const/const.js';


const Skills = () => {
  const setToast = useToaster();
  const [skills, setSkills] = useState([]);
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  // const [toast, setToast] = useState({ message: '', type: '' });
  const MAX_SKILLS = 10; 

  useEffect(() => {
    const id = localStorage.getItem('id');

    axios.get(`${Base_URL}/api/profile/${id}`)
      .then(response => {
        setSkills(response.data.skills || []);
      })
      .catch(error => console.error('Error fetching skills:', error));
  }, []);

  const handleRemoveSkill = (skillToRemove) => {
    const id = localStorage.getItem('id');
  
    axios.delete(`${Base_URL}/api/profile/skills/${id}`, {
      params: { skillName: skillToRemove }
    })
    .then(response => {
      setSkills(response.data.skills || []);
      setToast( 'Skill removed successfully.','success' );
    })
    .catch(error => {
      console.error('Error removing skill:', error);
      setToast( 'Failed to remove skill. Please try again.',  'error' );
    });
  };
  
  const handleAddSkill = (newSkill) => {
    if (skills.length >= MAX_SKILLS) {
      setToast('You can only add 10 skills.',  'error' );
      return;
    }
    setSkills(prevSkills => [...prevSkills, newSkill]);
    setToast('Skill updated successfully!', 'success' );
  };

  // const closeToaster = () => setToast({ message: '', type: '' });


  useEffect(()=>{
    if(isEditFormVisible){
      document.body.style.overflowY = "hidden";
    }else{
      document.body.style.overflowY = "scroll";
    }
  },[isEditFormVisible])

  return (
    <div className={styles.skillsContainer}>
      <div className={styles.header}>
        <h3>Skills</h3>
        <Add className={styles.addIcon} onClick={() => {
          if (skills.length < MAX_SKILLS) setEditFormVisible(true);
          else setToast( 'Maximum skill limit reached!',  'error' );
        }} />
      </div>
        {/* {skills.length > 0 ? (
      <div className={styles.skillsList}>
          
          skills.map((skill, index) => (
            <div key={`${skill}-${index}`} className={styles.skillItem}>
              {skill}
              <span className={styles.removeIcon} onClick={() => handleRemoveSkill(skill)}>
                ✕
              </span>
            </div>
          ))
      </div>

        ) : (
          
          <div style={{  justifyContent: 'center', alignItems: 'center', }}>
          <NoDataFound message="No profile data found." />
        </div>

        )} */}

{skills.length > 0 ? (
  <div className={styles.skillsList}>
    {skills.map((skill, index) => (
      <div key={`${skill}-${index}`} className={styles.skillItem}>
        {skill}
        <span className={styles.removeIcon} onClick={() => handleRemoveSkill(skill)}>
          ✕
        </span>
      </div>
    ))}
  </div>
) : (
  <div style={{ paddingBottom:"100px" }}>
    <NoDataFound message="No profile data found." />
  </div>
)}


      {isEditFormVisible && (
        <EditSkillForm 
          onClose={() => setEditFormVisible(false)} 
          onAddSkill={handleAddSkill} 
          currentSkills={skills} 
          totalSkillsCount={skills.length} 
        />
      )}

      {/* {toast.message && (
        <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
      )} */}
    </div>
  );
};

export default Skills;
