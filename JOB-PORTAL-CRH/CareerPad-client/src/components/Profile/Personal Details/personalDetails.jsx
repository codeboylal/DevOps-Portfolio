// import React, { useState, useEffect } from 'react';
// import styles from './personalDetails.module.css';  // Importing the CSS module
// // import { EditIcon } from 'react-icons/fa';
// import EditIcon from '@mui/icons-material/Edit';

// import EditPersonalDetails from './Edit Personal details/editPersonalDetails';
// import axios from 'axios';
// import Toaster from '../../Toaster/toaster'; // Ensure this path is correct

// const PersonalDetails = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);  // Track loading state
//   const [toast, setToast] = useState({ message: '', type: '' }); // State for toaster

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const id = localStorage.getItem('id'); // assuming 'id' is stored in local storage
//         if (!id) {
//           console.error('No ID found in localStorage');
//           return;
//         }

//         // Fetch data from the backend
//         const response = await axios.get(`${Base_URL}/api/${id}`);
        
      
        
//         if (response.data && response.data.length > 0) {
//           setProfile(response.data[0]); // Assuming you want to display the first profile
//         } else if (response.data) {
//           setProfile(response.data); // If it's a single object
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       } finally {
//         setLoading(false); // Stop loading after the fetch is done
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleClose = () => {
//     setIsEditing(false);
//   };

//   const handleSave = (updatedData) => {
//     console.log('Saved data:', updatedData); // Replace this with actual save logic

//     // Update the profile state with the new data
//     setProfile(updatedData);

//     // Set the success toaster message
//     setToast({ message: 'Personal updated successfully', type: 'success' });

//     // Hide the toaster after a delay
//     setTimeout(() => {
//       setToast({ message: '', type: '' });
//     }, 3000);

//     setIsEditing(false);
//   };

//   // Display loading state or placeholder if profile data is not available
//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <p className={styles.headline}>Personal Details</p>
//         <EditIcon className={styles.icon} onClick={handleEditClick} />
//       </div>
//       <div className={styles.details}>
//         <div className={styles.column}>
//           <p><strong className={styles.personalHeading}>Personal</strong><br />{profile ? `${profile.gender}, ${profile.maritalStatus}` : '-'}</p>
//           <br />
//           <p><strong className={styles.personalHeading}>Date of Birth</strong><br />{profile ? `${profile.dateOfBirth?.day} ${profile.dateOfBirth?.month} ${profile.dateOfBirth?.year}` : '-'}</p>
//           <br />
//           <p><strong className={styles.personalHeading}>Category</strong><br />{profile ? profile.category : '-'}</p>
//           <br />
//           <p><strong className={styles.personalHeading}>Differently abled</strong><br />{profile ? profile.differentlyAbled : '-'}</p>
//         </div>
//         <div className={styles.column}>
//           {/* <p><strong className={styles.personalHeading}>Career Break</strong><br />{profile ? 'Add Career Break' : '-'}</p>
//           <br /> */}
//           {/* <p><strong className={styles.personalHeading}>Work Permit</strong><br />{profile ? profile.workPermitCountries?.join(', ') : '-'}</p>
//           <br /> */}
//           <div className={styles.column}>
//           <p>
//     <strong className={styles.personalHeading}>Address</strong><br />
//     {profile && profile.address ? (
//       <>
//         {`${profile.address?.permanent}, ${profile.address?.hometown}, ${profile.address?.country}, ${profile.address?.city}, ${profile.address?.pincode}`}<br />
        
      

//       </>
//     ) : '-'}
//   </p>
//   <br />
 
// </div>

//         </div>
//       </div>

//       {isEditing && (
//         <EditPersonalDetails
//           onClose={handleClose}
//           onSave={handleSave}
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

// export default PersonalDetails;
































































import { Base_URL } from '../../../const/const';


import React, { useState, useEffect } from 'react';
import styles from './personalDetails.module.css'; 
import EditIcon from '@mui/icons-material/Edit';
// import NoDataFound from './NoDataFound'; // Ensure the correct import path
import EditPersonalDetails from './Edit Personal details/editPersonalDetails';
import axios from 'axios';
import Toaster from '../../Toaster/toaster'; 
import NoDataFound from '../Empty Screen/noDataFound';

const PersonalDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [toast, setToast] = useState({ message: '', type: '' }); 

  useEffect(()=>{
    if(isEditing){
      document.body.style.overflowY = "hidden"
    }else{
      document.body.style.overflowY = "scroll"
    }
  },[isEditing])


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem('id'); 
        if (!id) {
          console.error('No ID found in localStorage');
          return;
        }

        const response = await axios.get(`${Base_URL}/api/${id}`);
        
        if (response.data && response.data.length > 0) {
          setProfile(response.data[0]); 
        } else if (response.data) {
          setProfile(response.data); 
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSave = (updatedData) => {
    console.log('Saved data:', updatedData); 

    setProfile(updatedData);
    setToast({ message: 'Personal details updated successfully', type: 'success' });

    setTimeout(() => {
      setToast({ message: '', type: '' });
    }, 3000);

    setIsEditing(false);
  };

  // Display loading state or No Data Found if profile data is not available
  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.headline}>Personal Details</p>
        <EditIcon className={styles.icon} onClick={handleEditClick} />
      </div>
      
      {profile ? (
        <div className={styles.details}>
          <div className={styles.column}>
            <p ><strong className={styles.personalHeading}>Personal</strong><br />{profile?.gender ? profile?.gender : "-"} , {profile?.maritalStatus ? profile?.maritalStatus : "-"}</p>
            <br />
            <br />
            <p><strong className={styles.personalHeading}>Date of Birth</strong><br />{`${profile?.dateOfBirth?.day ? profile?.dateOfBirth?.day : "-"} ${profile?.dateOfBirth?.month ? profile?.dateOfBirth?.month : "-"} ${profile?.dateOfBirth?.year ? profile?.dateOfBirth?.year : "-"}`}</p>
            <br />
            {/* <p><strong className={styles.personalHeading}>Category</strong><br />{profile.category}</p> */}
            
            
          </div>
          <div className={styles.column}>
            <p>
              <strong className={styles.personalHeading}>Address</strong><br />
              {profile.address ? (
                `${profile?.address?.permanent ? profile?.address?.permanent : "-"} , ${profile?.address?.hometown ? profile?.address?.hometown : "-"} , ${profile?.address?.city ? profile?.address?.city  : "-"} , ${profile?.address?.country ? profile?.address?.country  : "-"} , ${profile?.address?.pincode ? profile?.address?.pincode : "-"}`
              ) : '-'}
            </p>
            <br/>
            <p><strong className={styles.personalHeading}>Differently abled</strong><br />{profile?.differentlyAbled ? profile?.differentlyAbled : "No"}</p>
          </div>
        </div>
      ) : (
        <NoDataFound message="No profile data found." /> // Display NoDataFound component
      )}

      {isEditing && (
        <EditPersonalDetails
          onClose={handleClose}
          onSave={handleSave}
          profile={profile}
        />
      )}

      {toast.message && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default PersonalDetails;
