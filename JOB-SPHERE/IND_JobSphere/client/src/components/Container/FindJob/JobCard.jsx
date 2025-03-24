import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JobCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faClockFour, faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { useToaster } from '../../Toaster';
import Tooltip from "@mui/material/Tooltip";
import { Base_URL } from "../../../const/const";
import { ReactComponent as MySVG } from "./rupee.svg"; 


const JobCard = ({ 
  jobId,
  jobTitle,
  companyName,
  applicants,
  postingDate,
  levels,
  description,
  salaryRange,
  onSavedJobsChange
}) => {

const showToaster = useToaster();

const navigate = useNavigate();
const [isBookmarked, setIsBookmarked] = useState(false);
const levelColors = ["#F1E3FF", "#E2FEEF", "#FFEBE0"];
const levelCol = ["#4F0E90", "#1D963F", "#A0652F"];

useEffect(() => {
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  setIsBookmarked(savedJobs.includes(jobId));
}, [jobId]);

const updateSavedJobsInDB = async (updatedJobs) => {
  const ProfileId = localStorage.getItem('id');
  try {
    const response = await fetch(`${Base_URL}/api/Profiles/${ProfileId}/savedJobs`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ savedJobs: updatedJobs }),
    });

    if (!response.ok) {
      throw new Error('Failed to update saved jobs in the database');
    }
  } catch (error) {
    console.error(error);
  }
};

const handleBookmarkClick = async (event) => {
  event.stopPropagation();
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  let updatedJobs;

  if (isBookmarked) {
    updatedJobs = savedJobs.filter(id => id !== jobId);
    showToaster('Job removed from saved! ', 'info');
  } else {
    updatedJobs = [...savedJobs, jobId];
    showToaster('Job Saved!', 'info');
  }

  

  try {
    await updateSavedJobsInDB(updatedJobs);
    setIsBookmarked(!isBookmarked);
    onSavedJobsChange(updatedJobs); // Trigger parent re-render
  } catch (error) {
    console.error('Error updating saved jobs:', error);
  }
};

const navigateJobDetails = (event) => {
  event.stopPropagation();
  localStorage.setItem("ClickedJob", jobId);
  navigate(`/jobDetails`);
}

const isIdStored = localStorage.getItem('ClickedJob') === jobId;
let onJobDetails = false;

if(localStorage.getItem("ClickedJob")){
  onJobDetails = true;
}

const isApplied = localStorage.getItem("appliedJobs");


return (
  <div 
    className={styles.jobCard} 
    onClick={navigateJobDetails} 
    style={{
      ...(isIdStored ? { border: '2px solid #2A85FE' } : {}),
      ...(onJobDetails ? { width: '100%' } : {width:'49%'})
    }}
  >
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <div style={{display:'flex', flexDirection:'column', marginBottom: '5px'}} className={styles.pointer}>
          <label className={styles.jobTitle}>{jobTitle}</label>
          <label className={styles.pointer} style={!onJobDetails ? { display: 'none' } : {}}>{companyName}</label>
        </div>
        <div className={styles.companyInfo}>
          <span style={onJobDetails ? { display: 'none'} : {fontSize: '12px' }}>{companyName}</span>
          <span className={styles.dot} style={onJobDetails ? { display: 'none' } : {}}>|</span>
          <FontAwesomeIcon icon={faUsers} className={styles.salaryIcon} style={{padding:'5px', fontSize: '8px'}}/>
          <span style={{fontSize:'12px'}}>{`${applicants?.length || 0} Applicants`}</span>
          {/* <span className={styles.dot}>|</span> */}
          <FontAwesomeIcon icon={faClockFour} className={styles.salaryIcon} style={{ fontSize: '15px', backgroundColor:'white', color:'#2A85FE', margin: '0'}}/>
          <span style={{fontSize:'12px'}}>{`Posted ${postingDate} ago`}</span>
        </div>
      </div>
      <Tooltip
        title="Save Job"
        arrow
        placement="top"
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: '#9da0a6',
              color: 'white',
              fontSize: '14px',
              borderRadius: '10px',  
              padding: '8px',      
            },
          },
          arrow: {
            sx: {
              color: '#9da0a6', 
            },
          },
        }}
      >
        <FontAwesomeIcon 
          icon={solidBookmark} 
          className={styles.bookmark} 
          onClick={handleBookmarkClick}
          style={{ color: isBookmarked ? '#2A85FE' : '#ABABAB', cursor: 'pointer' }} 
        />
      </Tooltip>
    </div>

    <div className={styles.levels}>
      {levels.map((level, index) => (
        <span key={index} className={styles.levelBadge} style={{ backgroundColor: levelColors[index % levelColors.length], color: levelCol[index % levelCol.length] }}>
          {level}
        </span>
      ))}
    </div>

    <div className={styles.description}>
      <p>{description}</p>
    </div>

    <div className={styles.footer}>
      <div className={styles.salary} style={{display: onJobDetails && 'none'}}>
        <MySVG />
        <label style={{
          paddingLeft:'3px'
        }}>
          {salaryRange} /
        </label>
        <label style={{color:'#4B4B4B',fontSize:'12px',fontWeight:'400',paddingLeft:'3px'}}>
           Month
        </label>
      </div>
      <button
              className={`${isApplied.includes(jobId) ? styles.applyButtonApplied : ''} ${styles.applyButton}`}
              style={onJobDetails ? { display: 'none' } : {}}  

            >
              {isApplied.includes(jobId) ? 'Already Applied' : 'Read More'}
            </button>
    </div>
  </div>
);
};

export default JobCard;
