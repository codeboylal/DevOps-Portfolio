// import React from 'react';
// import styles from './noDataFound.module.css'; // Import the CSS module
// import noDataImage from './noDataImage.jpg'
// const NoDataFound = ({ message = "No data found" }) => {
//   return (
//     <div className={styles.noDataContainer}>
//       {/* Image section */}
//       <img 
//         src={noDataImage}
//         alt="No data found" 
//         className={styles.noDataImage} 
//       />
      
     
//     </div>
//   );
// };

// export default NoDataFound;






import React from 'react';
import styles from './noDataFound.module.css';
import noDataImage from './noDataFound.jpg';

const NoDataFound = () => {
  return (
    <div className={styles.noDataContainer}>
      {/* Image section */}
      <img 
        src={noDataImage}
        alt="No data found" 
        className={styles.noDataImage} 
      />
      
      {/* Message section */}
      <p className={styles.noDataText} style={{fontWeight:'700'}}>Oops! No data available.</p>
      <p className={styles.noDataSubText}>Let's complete your profile and get started.</p>
    </div>
  );
};

export default NoDataFound;
