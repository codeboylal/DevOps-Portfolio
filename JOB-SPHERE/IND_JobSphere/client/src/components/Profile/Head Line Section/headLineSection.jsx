
// import React, { useState, useEffect } from 'react';
// import styles from './headLineSection.module.css';
// import EditHeadlineForm from './Edit Headline/editHeadLineForm';
// import axios from 'axios';
// import { FaPencilAlt } from 'react-icons/fa';
// import Toaster from '../../Toaster/toaster'; // Ensure this path is correct

// const HeadlineSection = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [headline, setHeadline] = useState('');
//   const [toast, setToast] = useState({ message: '', type: '' }); // State for toaster

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleCloseForm = () => {
//     setIsEditing(false);
//   };

//   const handleSaveHeadline = (newHeadline) => {
//     setHeadline(newHeadline);
//     setIsEditing(false);
//     // Set the success toaster message
//     setToast({ message: 'Successfully saved Headline', type: 'success' });
//     // Hide the toaster after a delay
//     setTimeout(() => {
//       setToast({ message: '', type: '' });
//     }, 3000);
//   };

//   // Fetch the headline from the profile table
//   useEffect(() => {
//     const fetchProfileHeadline = async () => {
//       try {
//         const id = localStorage.getItem('id'); // assuming 'profileId' is stored in local storage
//         const response = await axios.get(`${Base_URL}/api/profile/${id}`); // Replace with actual ID
//         setHeadline(response.data.headline);
//       } catch (error) {
//         console.error('Error fetching headline:', error);
//       }
//     };

//     fetchProfileHeadline();
//   }, []);

//   return (
//     <div className={styles.card}>
//       {!isEditing ? (
//         <>
//           <div className={styles.headline}>
//             Headline
//             <FaPencilAlt className={styles.editIcon} onClick={handleEditClick} />
//           </div>
//           <div className={styles.description}>
//             {headline || '-'}
//           </div>
//         </>
//       ) : (
//         <EditHeadlineForm
//           onClose={handleCloseForm}
//           onSave={handleSaveHeadline}
//           currentHeadline={headline}
//         />
//       )}

//       {/* Render Toaster */}
//       {toast.message && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast({ message: '', type: '' })}
//         />
//       )}
//     </div>
//   );
// };

// export default HeadlineSection;



















// import React, { useState, useEffect } from 'react';
// import styles from './headLineSection.module.css';
// import EditHeadlineForm from './Edit Headline/editHeadLineForm';
// import axios from 'axios';
// import { FaPencilAlt } from 'react-icons/fa';
// import Toaster from '../../Toaster/toaster'; // Ensure this path is correct

// const HeadlineSection = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [headline, setHeadline] = useState('');
//   const [toast, setToast] = useState({ message: '', type: '' });

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleCloseForm = () => {
//     setIsEditing(false);
//   };

//   const handleSaveHeadline = (newHeadline) => {
//     setHeadline(newHeadline);
//     setIsEditing(false);
//     setToast({ message: 'Successfully saved Headline', type: 'success' });
//     setTimeout(() => {
//       setToast({ message: '', type: '' });
//     }, 3000);
//   };

//   // Fetch the headline from the profile table
//   useEffect(() => {
//     const fetchProfileHeadline = async () => {
//       try {
//         const id = localStorage.getItem('id');
//         const response = await axios.get(`${Base_URL}/api/profile/${id}`);
//         setHeadline(response.data.headline);
//       } catch (error) {
//         console.error('Error fetching headline:', error);
//       }
//     };

//     fetchProfileHeadline();
//   }, []);

//   return (
//     <div className={styles.card}>
//       {!isEditing ? (
//         <>
//           <div className={styles.headline}>
//             Headline
//             <FaPencilAlt className={styles.editIcon} onClick={handleEditClick} />
//           </div>
//           <div className={styles.description} style={{ whiteSpace: 'pre-wrap' }}>
//             {headline || '-'}
//           </div> {/* Maintain formatting and spacing */}
//         </>
//       ) : (
//         <EditHeadlineForm
//           onClose={handleCloseForm}
//           onSave={handleSaveHeadline}
//           currentHeadline={headline}
//           onHeadlineChange={setHeadline} // Update headline in real-time
//         />
//       )}

//       {/* Render Toaster */}
//       {toast.message && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast({ message: '', type: '' })}
//         />
//       )}
//     </div>
//   );
// };

// export default HeadlineSection;






















// import React, { useState, useEffect } from 'react';
// import styles from './headLineSection.module.css';
// import EditHeadlineForm from './Edit Headline/editHeadLineForm';
// import axios from 'axios';
// // import { FaPencilAlt } from 'react-icons/fa';
// import Toaster from '../../Toaster/toaster'; // Ensure this path is correct
// import EditIcon from '@mui/icons-material/Edit';
// const HeadlineSection = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [headline, setHeadline] = useState('');
//   const [toast, setToast] = useState({ message: '', type: '' });

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleCloseForm = () => {
//     setIsEditing(false);
//   };

//   const handleSaveHeadline = (newHeadline) => {
//     setHeadline(newHeadline);
//     setIsEditing(false);
//     setToast({ message: 'Headline  updated successfully', type: 'success' });
//     setTimeout(() => {
//       setToast({ message: '', type: '' });
//     }, 3000);
//   };

//   // Fetch the headline from the profile table
//   useEffect(() => {
//     const fetchProfileHeadline = async () => {
//       try {
//         const id = localStorage.getItem('id');
//         const response = await axios.get(`${Base_URL}/api/profile/${id}`);
//         setHeadline(response.data.headline);
//       } catch (error) {
//         console.error('Error fetching headline:', error);
//       }
//     };

//     fetchProfileHeadline();
//   }, []);

//   // Add/remove 'no-scroll' class to disable background scroll when editing
//   useEffect(() => {
//     if (isEditing) {
//       document.body.classList.add('no-scroll');
//       document.documentElement.classList.add('no-scroll'); // Also apply to the <html> element
//     } else {
//       document.body.classList.remove('no-scroll');
//       document.documentElement.classList.remove('no-scroll'); // Also remove from <html> element
//     }

//     // Clean up on component unmount
//     return () => {
//       document.body.classList.remove('no-scroll');
//       document.documentElement.classList.remove('no-scroll');
//     };
//   }, [isEditing]);

//   return (
//     <div className={styles.card}>
//       {!isEditing ? (
//         <>
//           <div className={styles.headline}>
//             Headline
//             <EditIcon className={styles.editIcon} onClick={handleEditClick} />
//           </div>
//           <div className={styles.description} style={{ whiteSpace: 'pre-wrap' }}>
//             {headline || '-'}
//           </div> {/* Maintain formatting and spacing */}
//         </>
//       ) : (
//         <EditHeadlineForm
//           onClose={handleCloseForm}
//           onSave={handleSaveHeadline}
//           currentHeadline={headline}
//           onHeadlineChange={setHeadline} // Update headline in real-time
//         />
//       )}

//       {/* Render Toaster */}
//       {toast.message && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast({ message: '', type: '' })}
//         />
//       )}
//     </div>
//   );
// };

// export default HeadlineSection;





import { Base_URL } from '../../../const/const';




import React, { useState, useEffect } from 'react';
import styles from './headLineSection.module.css';
import EditHeadlineForm from './Edit Headline/editHeadLineForm';
import axios from 'axios';
// import { useToaster } from '../../Toaster';
import EditIcon from '@mui/icons-material/Edit';
import NoDataFound from '../Empty Screen/noDataFound'; 
const HeadlineSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState('');
  // const setToast = useToaster()
  // const [toast, setToast] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [popUpHeadline, setPopUpHeadline] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setPopUpHeadline(headline); // Reset popUpHeadline when closing the form without saving
  };

  const handleSaveHeadline = (newHeadline) => {
    setHeadline(newHeadline);
    setIsEditing(false);
    // setToast( 'Headline updated successfully', 'success' );
  };

  useEffect(() => {
    const fetchProfileHeadline = async () => {
      try {
        const id = localStorage.getItem('id');
        const response = await axios.get(`${Base_URL}/api/profile/${id}`);
        setHeadline(response.data?.headline);
        setPopUpHeadline(response?.data?.headline);
      } catch (error) {
        console.error('Error fetching headline:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileHeadline();
  }, []);

  useEffect(()=>{
    if(isEditing){
      document.body.style.overflowY = "hidden"
    }else{
      document.body.style.overflowY = "scroll"
    }
  },[isEditing])


  return (
    <div className={styles.card}>
      <div className={styles.headline}>
        Headline
        <EditIcon className={styles.editIcon} onClick={handleEditClick} />
      </div>
      <div className={styles.description} style={{ whiteSpace: 'pre-wrap' }}>
        {headline || '-'}
      </div>

      {isEditing && (
        <EditHeadlineForm
          onClose={handleCloseForm}
          onSave={handleSaveHeadline}
          currentHeadline={popUpHeadline}
          onHeadlineChange={setPopUpHeadline} // Update only the popUpHeadline state here
        />
      )}

      {(loading || error || !headline) && (
        <NoDataFound message={error ? "Error fetching data" : "No headline data found"} />
      )}

      {/* {toast.message && (
        <Toaster
          message={toast.message}
          type={toast.type}
          // onClose={() => setToast({ message: '', type: '' })}
        />
      )} */}
    </div>
  );
};

export default HeadlineSection;