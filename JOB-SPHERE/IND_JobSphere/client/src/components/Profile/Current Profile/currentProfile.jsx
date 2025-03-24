

import React, { useState, useEffect } from "react";
import styles from "./currentProfile.module.css";
import EditProfileForm from "./Edit Current File/editCurrentProfileForm"; // Import ProfileForm
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
// import Toaster from '../../Toaster/toaster'; 
import {useToaster} from "../../Toaster.js";
import NoDataFound from '../Empty Screen/noDataFound'; 
import { Base_URL } from "../../../const/const.js";

const CurrentProfile = () => {
  const setToast = useToaster();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  // const [toast, setToast] = useState({ message: '',  '' }); // State for toaster
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(false); // Add error state

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const id = localStorage.getItem('id'); // assuming 'id' is stored in local storage
        const response = await axios.get(`${Base_URL}/api/profiles/${id}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(true);
      } finally {
        setLoading(false); // Stop loading when fetch completes
      }
    };

    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  // Function to update profile data after form submission
  const updateProfileData = (newData) => {
    setProfileData(newData);
    setToast( 'Current Profile updated successfully',  'success' );
    
    // Hide the toaster after a delay
    // setTimeout(() => {
    //   setToast( '',  '');
    // }, 3000);
  };


  useEffect(()=>{
    if(isEditing){
      document.body.style.overflowY = "hidden"
    }else{
      document.body.style.overflowY = "scroll"
    }
  },[isEditing])


  return (
    <div style={{ width: '99%' }}>
      {/* Main Profile Details Section */}
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.heading}>Current Profile</p>
          <EditIcon className={styles.editButton} style={{ cursor: 'pointer' }} onClick={handleEditClick} />
        </div>
        {profileData ? (
        <div className={styles.details}>
          
            <>
              <div className={styles.column}>
                <p>
                  <strong className={styles.careerHeading}>Current Industry</strong><br />
                  {profileData?.currentIndustry || '-'}
                </p>
                <br />
                <p>
                  <strong className={styles.careerHeading}>Department</strong><br />
                  {profileData?.department || '-'}
                </p>
              </div>
              <div className={styles.column}>
                <p>
                  <strong className={styles.careerHeading}>Role Category</strong><br />
                  {profileData?.roleCategory || '-'}
                </p>
                <br />
                <p>
                  <strong className={styles.careerHeading}>Job Role</strong><br />
                  {profileData?.jobRole || '-'}
                </p>
              </div>
            </>
         
        </div>
      ) : (
        // Render NoDataFound if there's no profile data
        // <NoDataFound message="No profile data found."  />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',textAlign:'center', height: '100%' }}>
        <NoDataFound message="No profile data found." />
      </div>
      )}
      </div>

      {/* Modal for Profile Form */}
      {isEditing && (
        <div className={styles.modalOverlay} onClick={handleCloseForm}>
          <div onClick={(e) => e.stopPropagation()}>
            <EditProfileForm 
              onClose={handleCloseForm} 
              profileData={profileData} 
              updateProfileData={updateProfileData} 
            />
          </div>
        </div>
      )}

   
      {/* Render Toaster */}
      {/* {toast.message && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast( '',  '' )}
        />
      )} */}
    </div>
  );
};

export default CurrentProfile;
