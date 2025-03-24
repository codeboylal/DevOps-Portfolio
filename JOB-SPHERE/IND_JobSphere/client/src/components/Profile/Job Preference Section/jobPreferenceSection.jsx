import React, { useState, useEffect } from 'react';
import styles from './jobPreferenceSection.module.css';
// import { FaPencilAlt } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import EditJobPreference from './Edit Job Form/editJobPrefrence';
// import Toaster from '../../Toaster/toaster'; // Assuming this is your toaster component
import {useToaster} from "../../Toaster.js";
import axios from 'axios';
import { Base_URL } from '../../../const/const.js';
const JobPreference = () => {
  const setToast = useToaster();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  // const [toast, setToast] = useState({ message: '', type: '' });

  const openEditForm = () => setIsEditing(true);
  const closeEditForm = () => setIsEditing(false); localStorage.removeItem("Country"); localStorage.removeItem("City"); localStorage.removeItem("Preferred Work Location");

  useEffect(()=>{
    if(isEditing){
      document.body.style.overflowY = "hidden"
    }else{
      document.body.style.overflowY = "scroll"
    }
  },[isEditing])

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const id = localStorage.getItem('id');
      const response = await axios.get(`${Base_URL}/api/profile/${id}`);
      // console.log(response.data.jobList)
      // console.log(typeof(response.data.jobList))
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  // Function to update profile data after form submission and show toaster
  const updateProfileData = (newData) => {
    setProfileData(newData);
    // Show toaster notification
    setToast('Job Preferences updated successfully', 'success' );
    // Close form
    closeEditForm();
  };

  // Render Remote Options: Convert boolean fields to readable labels
  const renderRemoteOptions = (remoteOptions) => {
    if (!remoteOptions) return '-';

    const options = [];
    if (remoteOptions.site) options.push('On site');
    if (remoteOptions.remote) options.push('Remote');
    if (remoteOptions.hybrid) options.push('Hybrid Work');
    // if (remoteOptions.inPerson) options.push('In-person');
    return options.length > 0 ? options.join(', ') : '-';
  };

  // Render Job Types: Convert boolean fields to readable labels
  const renderJobTypes = (jobType) => {
    if (!jobType) return '-';

    const types = [];
    if (jobType.permanent) types.push('Permanent');
    if (jobType.contractual) types.push('Contractual');
    if (jobType.fullTime) types.push('Full Time');
    if (jobType.partTime) types.push('Part Time');
    return types.length > 0 ? types.join(', ') : '-';
  };

  // const closeToaster = () => {
  //   setToast({ message: '', type: '' });
  // };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.headline}>Job Preference</h3>
        <EditIcon className={styles.editIcon} onClick={openEditForm} />
      </div>
      
      {/* Always display headings with data or '-' */}
      <div className={styles.details}>
        <div className={styles.leftColumn}>
          <div className={styles.row}>
            <p><strong className={styles.subHead}>Job roles</strong><br />{profileData?.jobList?.length > 0 ? profileData.jobList.join(', ') : '-'}</p>
          </div>
          <div className={styles.row}>
            <p><strong className={styles.subHead}>Job Types</strong><br />{renderJobTypes(profileData?.jobType)}</p>
          </div>
          <div className={styles.row}>
            <p><strong className={styles.subHead}>Remote Options</strong><br />{renderRemoteOptions(profileData?.remoteOptions)}</p>
          </div>
          
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.row}> 
            {/* ₹ */}
            <p><strong className={styles.subHead}>Minimum base pay</strong><br />
            <div style={{display:'flex', alignItems:'center',gap:'5px'}}>
              <label>
                {profileData?.expectedSalary?.currency || '-'}
              </label>
              <label>
                {profileData?.expectedSalary?.amount}
              </label>
            </div>
            </p>
          </div>
          <div className={styles.row}>
            <p><strong className={styles.subHead}>Work Shifts</strong><br />{profileData?.preferredShift || '-'}</p>
          </div>
          <div className={styles.row}>
            <p><strong className={styles.subHead}>Preferred work location</strong><br />{profileData?.preferredWorkLocation?.join(' | ') || '-'}</p>
          </div>
        </div>
      </div>

      {/* Modal for editing */}
      {isEditing && profileData && (
        <div className={styles.modalBackground}>
          <div className={styles.modalContent}>
            <EditJobPreference closeForm={closeEditForm} updateProfileData={updateProfileData} profileData={profileData} />
          </div>
        </div>
      )}

      {/* Toaster Notification */}
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

export default JobPreference;
