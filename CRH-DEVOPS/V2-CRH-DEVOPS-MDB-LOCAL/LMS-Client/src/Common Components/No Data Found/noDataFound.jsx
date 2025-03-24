
import React from 'react';
import styles from './noDataFound.module.css';
import noDataImage from './noData.svg'; // Make sure the image is placed in the correct path

const NoDataFound = ({ message , size}) => {
  return (
    <div className={styles.container} style={{width: size === "Full" && "500px"}}>
      <img style={{width: size === "Full" && "300px"}} src={noDataImage} alt="Oops! No Data Availabel" className={styles.image} />
      <h3 className={styles.noDataText}>Oops! No Data Availabel</h3>
      <p className={styles.message}>{message || "Let's complete your profile and get started"}</p>
   
    </div>
  );
};

export default NoDataFound;
