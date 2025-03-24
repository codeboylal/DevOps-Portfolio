import React from 'react';
import styles from './careerProfile.module.css';  // Importing the CSS module
import { FaPencilAlt } from 'react-icons/fa';

const CareerProfile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Career Profile</h2>
        {/* <button className={styles.editButton}>✏️</button> */}
        <FaPencilAlt className={styles.icon} />

      </div>
      <div className={styles.details}>
        <div className={styles.column}>
          <p><strong className={styles.careerHeading}>Current Industry</strong><br />IT Service and Consulting</p>
          <p><strong className={styles.careerHeading}>Role Category</strong><br />UI/UX</p>
          <p><strong className={styles.careerHeading}>Desired job type</strong><br />Contractual, permanent</p>
          <p><strong className={styles.careerHeading}>Preferred shift</strong><br />Flexible</p>
          <p><strong className={styles.careerHeading}>Expected Salary</strong><br />5,00,000</p>
        </div>
        <div className={styles.column}>
          <p><strong className={styles.careerHeading}>Department</strong><br />UX, Design & Architecture</p>
          <p><strong className={styles.careerHeading}>Job Role</strong><br />UI/UX Designer</p>
          <p><strong className={styles.careerHeading}>Desired Employment type</strong><br />Full Time, Part Time</p>
          <p><strong className={styles.careerHeading}>Preferred work location</strong><br />Punjab, Gurgaon/Gurugram, remote, Delhi/NCR, Chandigarh</p>
        </div>
      </div>
    </div>
  );
};

export default CareerProfile;
