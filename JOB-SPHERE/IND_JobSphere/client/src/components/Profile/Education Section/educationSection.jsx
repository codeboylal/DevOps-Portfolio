// import React, { useState, useEffect } from 'react';
// import styles from './educationSection.module.css';
// import EditEducationDetails from './Edit Education Form/editEducationDetails';
// import axios from 'axios';
// import Toaster from '../../Toaster/toaster'; // Adjust path as necessary
// import { IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const EducationSection = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [educationData, setEducationData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [editItem, setEditItem] = useState(null); // To track the item being edited

//   const fetchEducationData = async () => {
//     try {
//       const id = localStorage.getItem('id');
//       if (!id) {
//         throw new Error('Profile ID not found.');
//       }
//       const response = await axios.get(`${Base_URL}/api/education/${id}`);
//       setEducationData(response.data);
//     } catch (error) {
//       console.error('Error fetching education data:', error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEducationData();
//   }, []);

//   // Function to handle edit click
//   const handleEditClick = (item) => {
//     setEditItem(item); // Set the item to be edited
//     setIsModalOpen(true);
//   };

//   // Function to handle delete click
//   const handleDeleteClick = async (itemId) => {
//     try {
//       const id = localStorage.getItem('id');
//       await axios.delete(`${Base_URL}/api/education/${id}/${itemId}`);
//       setToast({ message: 'Education deleted successfully', type: 'success' });
//       fetchEducationData(); // Refresh data after deletion
//     } catch (error) {
//       console.error('Error deleting education data:', error);
//       setToast({ message: 'Failed to delete education', type: 'error' });
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditItem(null); // Clear the item being edited when modal closes
//   };

//   const handleDataUpdated = () => {
//     fetchEducationData(); // Re-fetch the data after saving
//     setIsModalOpen(false); // Close the modal
//     setToast({ message: 'Education updated successfully', type: 'success' });
//   };

//   const closeToaster = () => {
//     setToast({ message: '', type: '' });
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <span className={styles.headline}>Education</span>
//       </div>
//       <div className={styles.details}>
//         {error ? (
//           <div>-</div>
//         ) : educationData.length > 0 ? (
//           educationData.map((item, index) => (
//             <div key={index} className={styles.item}>
//               <div className={styles.title}>{item.education}</div>
//               <div className={styles.institution}>{item.universityName}</div>
//               <div className={styles.info}>{`${item.startYear} - ${item.endYear} | ${item.courseType}`}</div>
//               <div className={styles.actions}>
//                 {/* Edit and Delete buttons */}
//                 <IconButton
//                   color="primary"
//                   onClick={() => handleEditClick(item)}
//                   className={styles.editButton}
//                 >
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton
//                   color="secondary"
//                   onClick={() => handleDeleteClick(item._id)}
//                   className={styles.deleteButton}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div>-</div>
//         )}
//       </div>

//       {isModalOpen && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <EditEducationDetails
//               onClose={handleCloseModal}
//               onSave={handleDataUpdated}
//               editItem={editItem} // Pass the item being edited to the form
//             />
//           </div>
//         </div>
//       )}

//       {/* Render Toaster after form is closed and data is saved */}
//       {toast.message && (
//         <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
//       )}
//     </div>
//   );
// };

// export default EducationSection;














// import React, { useState, useEffect } from 'react';
// import styles from './educationSection.module.css';
// import EditEducationDetails from './Edit Education Form/editEducationDetails';
// import axios from 'axios';
// import Toaster from '../../Toaster/toaster'; // Adjust path as necessary
// import { IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// const EducationSection = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [educationData, setEducationData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [toast, setToast] = useState({ message: '', type: '' });
//   const [editItem, setEditItem] = useState(null); // To track the item being edited

//   const fetchEducationData = async () => {
//     try {
//       const id = localStorage.getItem('id');
//       if (!id) {
//         throw new Error('Profile ID not found.');
//       }
//       const response = await axios.get(`${Base_URL}/api/education/${id}`);
//       setEducationData(response.data);
//     } catch (error) {
//       console.error('Error fetching education data:', error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEducationData();
//   }, []);

//   // Function to handle edit click
//   const handleEditClick = (item) => {
//     setEditItem(item); // Set the item to be edited
//     setIsModalOpen(true);
//   };

//   // Function to handle delete click
//   const handleDeleteClick = async (itemId) => {
//     try {
//       const id = localStorage.getItem('id');
//       await axios.delete(`${Base_URL}/api/education/${id}/${itemId}`);
//       setToast({ message: 'Education deleted successfully', type: 'success' });
//       fetchEducationData(); // Refresh data after deletion
//     } catch (error) {
//       console.error('Error deleting education data:', error);
//       setToast({ message: 'Failed to delete education', type: 'error' });
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditItem(null); // Clear the item being edited when modal closes
//   };

//   const handleDataUpdated = () => {
//     fetchEducationData(); // Re-fetch the data after saving
//     setIsModalOpen(false); // Close the modal
//     setToast({ message: 'Education updated successfully', type: 'success' });
//   };

//   const closeToaster = () => {
//     setToast({ message: '', type: '' });
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <span className={styles.headline}>Education</span>
//         <FontAwesomeIcon icon={faPlus} className={styles.icon} onClick={handleEditClick} />
//       </div>
//       <div className={styles.details}>
//         {error ? (
//           <div>-</div>
//         ) : educationData.length > 0 ? (
//           educationData.map((item, index) => (
//             <div key={index} className={styles.item}>
//               <div className={styles.title}>{item.education}</div>
//               <div className={styles.institution}>{item.universityName}</div>
//               <div className={styles.info}>{`${item.startYear} - ${item.endYear} | ${item.courseType}`}</div>
//               <div className={styles.actions}>
//                 {/* Edit and Delete buttons */}
//                 <IconButton
//                   color="primary"
//                   onClick={() => handleEditClick(item)}
//                   className={styles.editButton}
//                 >
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton
//                   color="secondary"
//                   onClick={() => handleDeleteClick(item._id)}
//                   className={styles.deleteButton}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div>-</div>
//         )}
//       </div>

//       {isModalOpen && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <EditEducationDetails
//               onClose={handleCloseModal}
//               onSave={handleDataUpdated}
//               editItem={editItem} // Pass the item being edited to the form
//             />
//           </div>
//         </div>
//       )}

//       {/* Render Toaster after form is closed and data is saved */}
//       {toast.message && (
//         <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
//       )}
//     </div>
//   );
// };

// export default EducationSection;






























////////////////////////////////////////////////////




























import { Base_URL } from '../../../const/const';

import React, { useState, useEffect } from 'react';
import styles from './educationSection.module.css';
import EditEducationDetails from './Edit Education Form/editEducationDetails';
import axios from 'axios';
import {useToaster} from "../../../components/Toaster"
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NoDataFound from '../Empty Screen/noDataFound'; // Ensure the correct import path
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EducationSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const  setToast = useToaster()
  const [editItem, setEditItem] = useState(null);

  const fetchEducationData = async () => {
    try {
      const id = localStorage.getItem('id');
      if (!id) {
        throw new Error('Profile ID not found.');
      }
      const response = await axios.get(`${Base_URL}/api/education/${id}`);
      setEducationData(response.data);
    } catch (error) {
      console.error('Error fetching education data:', error);
      setEducationData([]); // Set educationData to empty array to trigger NoDataFound
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducationData();
  }, []);
  const [ editEducationData , setEditEducationData] = useState([]);
  useEffect(() => {
    if(editItem !== null){
      setEditEducationData(educationData[editItem])
    }else{
      setEditEducationData([])  
    }
  }, [editItem , educationData]);

  const handleEditEducationModal = async (index) => {
    setEditItem(index);
    setIsModalOpen(true);
  }

  const handleEditClick = (item) => {
    setIsModalOpen(true);
  };


  const handleDeleteClick = async (itemId) => {
    // if (!window.confirm('Are you sure you want to delete this education item?')) return;

    try {
      const id = localStorage.getItem('id');
      await axios.delete(`${Base_URL}/api/education/${id}/${itemId}`);
      setToast('Education deleted successfully', 'success' );
      fetchEducationData();
    } catch (error) {
      console.error('Error deleting education data:', error);
      setToast('Failed to delete education',  'error' );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  const handleDataUpdated = () => {
    fetchEducationData();
    setIsModalOpen(false);
    if(editItem !== null){
      setToast('Education updated successfully', 'success' );
    }else{
      setToast('Education Added successfully', 'success' );
    }
    setEditItem(null)

  };

  useEffect(()=>{
    if(isModalOpen){
      document.body.style.overflowY = "hidden";
    }else{
      document.body.style.overflowY = "scroll";
    }
  },[isModalOpen])

  // const closeToaster = () => {
  //   setToast({ message: '', type: '' });
  // };

  if (loading) return <div>Loading...</div>;


  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.headline}>Education</span>
        <FontAwesomeIcon icon={faPlus} className={styles.icon} onClick={handleEditClick} />
      </div>
      <div className={styles.details}>
        {educationData.length > 0 ? (
          educationData.map((item, index) => (
            <div key={index} className={styles.item}>
              <div>
                <div className={styles.title}>{item.education}</div>
                <div className={styles.institution}>{item.universityName}</div>
                <div className={styles.info}>{`${item.startYear} - ${item.endYear} | ${item.courseType}`}</div>
              </div>
              <div className={styles.actions}>
                <IconButton
                  color="primary"
                  onClick={() => handleEditEducationModal(index)}
                  className={styles.editButton}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => handleDeleteClick(index)}
                  className={styles.deleteButton}
                  // style={{cursor:'pointer'}}
                >
                  <DeleteIcon   style={{ cursor:'pointer' }} />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <NoDataFound message="No education data found." /> // Display NoDataFound component
        )}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <EditEducationDetails
              onClose={handleCloseModal}
              onSave={handleDataUpdated}
              editItem={editItem}
              editEducationData = {editEducationData}
            />
          </div>
        </div>
      )}

      {/* {toast.message && (
        <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
      )} */}
    </div>
  );
};

export default EducationSection;
