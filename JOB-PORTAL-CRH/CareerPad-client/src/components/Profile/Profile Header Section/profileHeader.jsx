import cx from "classnames";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './profileHeader.module.css';
import John from './John.png'; // Assuming John.png is a local image
import EditProfileForm from './Edit Profile/editProfile'; // Import the EditForm component
import { FiMail, FiMapPin, FiDollarSign } from 'react-icons/fi'; // Importing icons from react-icons
import { FiLock, FiPhone } from 'react-icons/fi'; // Importing icons from react-icons
import { FiCalendar } from 'react-icons/fi'; // Importing the calendar icon from react-icons
// import Toaster from '../../Toaster/toaster'; 
import { useToaster } from "../../Toaster";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import demo from './demo.jpeg';

import { Base_URL } from "../../../const/const";


const ProfileHeader = () => {
    const [profile, setProfile] = useState({
        name: '-',               // Default name
        role: '',               // Default role
        email: '-',      // Default email
        currentLocation: '-',      // Default location
        currentSalary: '-',  // Default salary
        experience: '-',                 // Default experience in years
        mobileNumber: '-',    // Default phone number
        availability: '-',     // Default availability
        profilePicture: John,            // Default profile picture
        completion: '-'                  // Default completion percentage
    });
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [error, setError] = useState(null);
    // const [toast, setToast] = useState({ message: '', type: '' }); // State for toaster
    const setToast = useToaster();
    const [bannerPic , setBannerPic] = useState(null)
    const [profilePic , setProfilePic] = useState(null)

    useEffect(()=>{
      if(isEditFormVisible){
        document.body.style.overflowY = "hidden"
      }else{
        document.body.style.overflowY = "scroll"
      }
    },[isEditFormVisible])

    useEffect(() => {
        const id = localStorage.getItem('id'); // assuming 'profileId' is stored in local storage
        
        if (id) {
          axios.get(`${Base_URL}/api/profile/${id}`)
            .then(response => {
              setProfile(response.data);
              localStorage.setItem('name',response.data.name)
              setProfilePic(response.data?.picImageURL 
                ? `${Base_URL}${response.data.picImageURL}` 
                // ? `${Base_URL}/uploads/673f4e5c90a2b587c4153b36/CHLogo.png`
                : demo);
              
              setBannerPic(response.data?.bannerImageURL 
                ? `${Base_URL}${response.data.bannerImageURL}` 
                : John);
            })
            .catch(err => {
              setError(err.response ? err.response.data.error : 'Error fetching profile');
            });
        } else {
          setError('Profile ID not found in local storage');
        }
    }, []);

    // Handler to open the Edit Form
    const handleEditClick = () => {
        setEditFormVisible(true);
    };

    // Handler to close the Edit Form
    const handleCancelClick = () => {
        setEditFormVisible(false);
    };

    // Handler to update profile after editing
    const handleProfileUpdate = (updatedProfile) => {
        setProfile(updatedProfile); // Update the profile with the new data
        setEditFormVisible(false);  // Close the form after update

        // setToast({ message: 'Profile Updated Successful ', type: 'success' });
  
    }

    //profile banner

    const handleProfilePicChange = (userID , para) => {
      setProfilePic(`${Base_URL}/uploads/${userID}/${para}`);      
      // setProfilePic(newProfilePic);
  };
  
  const handleBannerPicChange = (userID , para) => {
    setBannerPic(`${Base_URL}/uploads/${userID}/${para}`);
      // setBannerPic(newBannerPic);
  };

  const handleBannerClick = () => {
    document.getElementById('media').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['jfif', 'pjp', 'jpg', 'pjpeg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        const formData = new FormData();
        formData.append('media', file);
        const userID = localStorage.getItem('id');

        fetch(`${Base_URL}/pic/${userID}/${"banner"}`, {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            console.log('Response data:', data);
            if (data.success) {
              console.log('File uploaded');
              handleBannerPicChange(userID , file.name);
              setToast( 'Profile Banner Changed Successfully','success' );
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        alert(`Please select a file with one of the following extensions: ${allowedExtensions.join(', ')}`);
        document.getElementById('media').value = '';
      }
    }
  };

  //profile pic
  const handleProfilePicClick = () => {
    document.getElementById('mediaPic').click();
  };

  const handlePicFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['jfif', 'pjp', 'jpg', 'pjpeg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        const formData = new FormData();
        formData.append('mediaPic', file);
        const userID = localStorage.getItem('id');

        fetch(`${Base_URL}/pic/${userID}/${"profilePic"}`, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
          .then(data => {
            console.log('Response data:', data);
            if (data.success) {
              console.log('File uploaded');
              handleProfilePicChange(userID , file.name);
              setToast('Profile Picture Changed Successfully', 'success' );
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        alert(`Please select a file with one of the following extensions: ${allowedExtensions.join(', ')}`);
        document.getElementById('mediaPic').value = '';
      }
    }
  };
  
 

    return (
        <div className={styles.profileContainer}>
            {/* Cover Picture */}
            <input type="file" onChange={handleFileChange} id="media" style={{display:'none'}} accept=".jfif,.pjp,.jpg,.pjpeg,.jpeg,.png"></input>
            <div className={styles.coverPicture} id="banner" onClick={handleBannerClick}  style={{ backgroundImage: `url(${bannerPic})`, 
             backgroundSize: '100% 100%', 
             backgroundPosition: 'center !important',
              color:'white',  
              backgroundRepeat: 'no-repeat' }}>
               <div style={{height:'100%' ,width:'100%'}}> 
                    <div className={cx(styles.updateCoverButton, styles.bannerDes )}>
                        <FontAwesomeIcon icon={faCamera} style={{position:'absolute', top:'50%'}}/>
                    </div>
                </div>
            </div>

            {/* Profile Details */}
            <input type="file" onChange={handlePicFileChange} id="mediaPic" style={{display:'none'}} accept=".jfif,.pjp,.jpg,.pjpeg,.jpeg,.png"></input>
            <div className={styles.profileDetails}>
                <div className={styles.profilePicture}>
                    <div id="ProfilePic" onClick={handleProfilePicClick} style={{height:'100%' ,width:'100%' , backgroundImage: `url(${profilePic})`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center',
                      color:'white', 
                      backgroundRepeat: 'no-repeat'}}> 
                        <div className={cx(styles.profilePicDes )}>
                            <FontAwesomeIcon icon={faCamera} style={{position:'absolute', top:'35%' ,left:'46%'}}/>
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className={styles.profileInfo}>
                    <div className={styles.Headings}>
                   <div className={styles.difference}> 
                    <h2 className={styles.userName}>{profile.name || 'User Name'}</h2>
                    <button className={styles.editProfileButton} onClick={handleEditClick}>Edit Profile</button>
                   </div>
                    <h5>{profile.jobRole || 'Your Role'}</h5>
                    </div>
                    <div className={styles.profileSubInfo}>
                        <div className={styles.profileSubLeft}>
                            <div className={styles.profileminiSubLeft} >
                                <p >
                                    <FiMail style={{ color: '#007bff', marginRight: '8px' }} /> 
                                    {profile.email || '-'}
                                </p>
                                <p>
                                    <FiMapPin style={{ color: '#007bff', marginRight: '8px' }} /> 
                                    {profile.city || '-'},
                                    {profile.currentLocation || '-'}

                                </p>
                                {/* <p>
                                    <FiDollarSign style={{ color: '#007bff', marginRight: '8px' }} /> 
                                    {profile.currentSalary || '-'} <label style={{color: "#767676" , fontSize:'12px'}} className={styles.bottomInputlabel}>
                  (LPA)
                </label>
                                </p> */}

<p>
  {/* Retrieve the AmountCode from localStorage */}
  <span style={{ color: '#007bff', marginRight: '8px' }}>
    {localStorage.getItem('AmountCode') || '₹'} {/* Default to '₹' if AmountCode isn't available */}
  </span>
  
  {profile.currentSalary || '-'} 
  
  <label style={{color: "#767676", fontSize: '12px'}} className={styles.bottomInputlabel}>
    (LPA)
  </label>
</p>

                            </div>
                        </div>
                        <div className={styles.profileSubRight}>
                            <div>
                                <p>
                                    <FiLock style={{ color: '#007bff', marginRight: '8px' }} />
                                    {profile.totalExperienceYears || '-'} Years
                                </p>
                                <p>
                                    <FiPhone style={{ color: '#007bff', marginRight: '8px' }} />
                                    {profile.mobileNumber || '-'}
                                </p>
                                <p>
                                    <FiCalendar style={{ color: '#007bff', marginRight: '8px' }} />
                                    {profile.availability || '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Form Modal */}
            {isEditFormVisible && (
                <div className={styles.editFormOverlay}>
                    <div className={styles.editProfileForm}>
                        <EditProfileForm profile={profile} onCancel={handleCancelClick} onSave={handleProfileUpdate} />
                    </div>
                </div>
            )}

{/* {toast.message && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: '' })}
        />
      )} */}
        </div>
    );
}

export default ProfileHeader;
