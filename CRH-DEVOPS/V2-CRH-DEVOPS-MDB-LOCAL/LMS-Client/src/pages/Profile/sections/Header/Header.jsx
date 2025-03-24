import React, { useEffect, useState } from "react";
import styles from './Header.module.css';

import cx from "classnames";

import {useToaster} from "../../../../Toaster";

// pic import
import defaultBannerImport from '../../images/bgBanner.jpg';
import defaultPicImport from '../../images/demo.jpeg';

// icons
import {  Phone, Business } from '@mui/icons-material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BookIcon from '@mui/icons-material/MenuBookOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import Base_URL from "../../../../const/const";

import Tooltip from '@mui/material/Tooltip';

function Header({headerPopupState,profileCompletion, userData ,setheaderPopupState, setUserDataChange , userDataChange}){


    const showToaster = useToaster();


    const [ headerData, setHeaderData] = useState({});

    const [defaultBanner, setDefaultBanner] = useState()
    const [defaultPic, setDefaultPic] = useState()

    useEffect(()=>{
        setHeaderData(userData)
        // console.log(userData)
        setDefaultBanner(userData?.profileBanner?.length > 0 ?  `${Base_URL}${userData.profileBanner}` : defaultBannerImport)
        setDefaultPic(userData?.profileImg?.length > 0 ?  `${Base_URL}${userData.profileImg}` : defaultPicImport)
    },[userData, headerPopupState])
    
// Banner pic


const handleDivClick = () => {
  document.getElementById('bannerInput').click();
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file && file.type === 'image/png') {
    const reader = new FileReader();
    reader.onloadend = () => {
      setDefaultBanner(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('media', file); // Adjust field name if needed
    const userID = localStorage.getItem('id');

    fetch(`${Base_URL}/pic/${userID}/banner`, { // Use the correct endpoint for banners
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data);
        if (data.success) {
          console.log('Banner uploaded');
          showToaster("Banner Updated Successfully","success")
        } else {
          console.error('Upload failed:', data.message);
          showToaster("Banner Updation Failed","error")
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    alert('Please select a PNG file');
  }
};


    // pic input for change
  

  const handlePICDivClick = () => {
    document.getElementById('picInput').click();
  };

  const handlePICImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDefaultPic(reader.result);
      };
      reader.readAsDataURL(file);
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
              window.location.href=`/profile`
              console.log('File uploaded');
              showToaster("Profile Picture Updated Successfully","success")
            }
          })
          .catch(error => {
            console.error('Error:', error);
            showToaster("Profile Picture Updation Failed","error")
          });
    } else {
      alert('Please select a PNG file');
    }
  };

  

    return(
        <div className={styles.HeaderDiv}>
            <div className={styles.profileBanner} onClick={handleDivClick}  >
                <img src={defaultBanner} alt="Banner" />
                <div className={styles.BannerHover}>
                    <CameraAltIcon />
                </div>
            </div>
            <input
                    id="bannerInput"
                    type="file"
                    accept="image/png"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />

            <div className={styles.profilePicDiv}>
                <div className={styles.progressBar} style={{background: `conic-gradient(transparent 0% ${100 - profileCompletion}%, #FF702D ${100 - profileCompletion}% 100%)`}}>
                    <div className={styles.picDiv} onClick={handlePICDivClick}>
                        <img src={defaultPic} alt="Profile Pic" />
                        <div className={styles.PicHover}>
                            <CameraAltIcon />
                        </div>
                        <input
                            id="picInput"
                            type="file"
                            accept="image/png"
                            style={{ display: 'none' }}
                            onChange={handlePICImageChange}
                        />
                    </div>
                </div>
                <div className={styles.percentageDiv}>
                    <label>{profileCompletion} %</label>
                </div>
            </div>


            <div className={styles.footer} >
                {/* Profile Data */}
                <div className={styles.profileData}>
                    <div className={styles.namePostDes}>
                        <div className={styles.nameEditButton}>
                            <label className={styles.nameDes}>
                                {headerData.name || "-"}                            
                            </label>
                            <button
                                onClick={() => { setheaderPopupState(true); }}
                                className={cx(styles.editButtonDes, styles.pointer)}
                            >
                                Edit Profile
                            </button>
                        </div>
                        <div>
                            <label className={styles.postDes}>
                                {headerData.edu || "-"}
                            </label>
                        </div>
                    </div>
                    <div className={styles.bottomData}>
                        <div className={styles.bottomLeftData} style={{width: '850px'}}>
                            <div className={styles.iconDataDes}>
                                <EmailOutlinedIcon style={{ color: '#FF702D' }} />
                                <label>
                                    {headerData?.email || "-"} 
                                </label>
                            </div>
                            <div className={styles.iconDataDes}>
                                <LocationOnOutlinedIcon style={{ color: '#FF702D' }} />
                                <label>
                                    {headerData?.location || "-"}
                                </label>
                            </div>
                            <div className={styles.iconDataDes}>
                                <BookIcon style={{ color: '#FF702D' }} />
                                <div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'3px'}}>
                                    <label>
                                        {headerData?.continueWatching?.length > 0 ? headerData?.continueWatching?.length  : "0"} 
                                    </label>
                                    <label>
                                        Courses
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottomLeftData}>
                            <div className={styles.iconDataDes}>
                                <Business style={{ color: '#FF702D' }} />
                                <label>
                                    {headerData?.organizationName || "-"} 
                                </label>
                            </div>
                            <div className={styles.iconDataDes}>
                                <Phone style={{ color: '#FF702D' }} />
                                <label>
                                    {headerData?.mobileNo  || "-"} 
                                </label>
                            </div>
                            <div className={styles.iconDataDes}>
                                <LanguageOutlinedIcon style={{ color: '#FF702D' }} />
                                <Tooltip title={Array.isArray(headerData?.Languages) ? headerData.Languages.join(', ') : "-"} arrow>
                                    <label className={styles.elipsis}>
                                        {Array.isArray(headerData?.Languages) && headerData.Languages.length ? headerData.Languages.join(', ') : "-"}
                                    </label>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;