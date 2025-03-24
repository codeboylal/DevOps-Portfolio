import React from 'react';
import styles from "./personalizeExperience.module.css";
import Employer from "./Employer.png";
import Job_Seeker from "./Job_Seeker.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function PersonalizeExperience({ handleCurrentModal, handleNextModal ,handleEmployerModal }) {
  function storeData(value){
    localStorage.setItem("personalize",value)
  }
  return (
    <div className={styles.responsiveContainer}>
      <div className={styles.modal}>
        <div className={styles.modalContent} >
          <div style={{position:'relative',left:'270px' , bottom:'15px'}}>
              <FontAwesomeIcon icon={faTimes} onClick={handleCurrentModal}  style={{cursor:'pointer'}}/>
          </div>
          <h2 style={{ color: "#4B4B4B", margin: '0', fontSize: '1.8rem' }}>
            Help Us Personalize Your Experience !!
          </h2>
          <label style={{ color: '#2A85FE', padding: '0', fontSize: '1rem' }}>
            To get started, we just need to know:
          </label>
          <div className={styles.ImageContainer}>
            <div className={styles.ImageContainerDes} onClick={() => {handleNextModal(); storeData("Job Seeker");}}>
              <img
                src={Job_Seeker}
                alt="Job Seeker"
                className={styles.imageStyling}
              />
              <label className={styles.labelDesContainer}>
                Job Seeker
              </label>
            </div>
            <div className={styles.ImageContainerDes} onClick={() => {handleCurrentModal() ; handleEmployerModal(); storeData("Employer");}}>
              <img
                src={Employer}
                alt="Employer"
                className={styles.imageStyling}
              />
              <label className={styles.labelDesContainer}>
                Employer
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalizeExperience;
