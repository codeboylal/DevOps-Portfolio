import React from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Import MUI Reading Icon
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'; // Import MUI Video Icon
import styles from './readOrVid.module.css'; // Importing module.css

const ReadingVideoTime = () => {
  return (
    <div className={styles.container}>
      {/* Reading Section */}
      <div className={styles.box}>
        <MenuBookIcon className={styles.icon} /> {/* MUI Reading Icon */}
        <span className={styles.text}>Reading</span>
      </div>

      {/* Video Section */}
      <div className={styles.box}>
        <OndemandVideoIcon className={styles.icon} /> {/* MUI Video Icon */}
        <span className={styles.text}>20 Min</span>
      </div>
    </div>
  );
};

export default ReadingVideoTime;
