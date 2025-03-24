import React from 'react';
import styles from "./allSet.module.css";
import allSet from "./allSet.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function AllSet({ handleCurrentModal }) {
  const navigate = useNavigate();
  return (
    <div className={styles.responsiveContainer}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
        <div style={{position:'relative',left:'270px' , bottom:'15px'}}>
              <FontAwesomeIcon icon={faTimes} onClick={handleCurrentModal}  style={{cursor:'pointer'}}/>
          </div>
          <div style={{position:'relative',bottom:'20px'}} >
            <p className={styles.topHeading}>
              You’re all set !
            </p>
            <p className={styles.bottomHeading}>
              Using the preferences you provided, we will match you with jobs. They're always up to date with you.
            </p>
          </div>
          <div style={{width:'100%', display:'flex',justifyContent:'center' , marginBottom:'30px'}}>
            <img src={allSet} alt="Great! All Set" style={{height: '300px' , width: '350px'}} />
          </div>
          <div className={styles.bottomFlex}>
            <button className={styles.button} onClick={() => navigate('/login', { state: { active: "signup" } })}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSet;