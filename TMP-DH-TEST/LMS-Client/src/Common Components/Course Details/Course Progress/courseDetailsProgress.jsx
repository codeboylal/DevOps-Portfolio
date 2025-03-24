import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import styles from './courseDetailsProgress.module.css';
import { Box, Typography } from '@mui/material';

const CourseProgressDetails = ({ value }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.completion}>
      <Typography className={styles.progressLabel}>Completion</Typography>
      <Typography  fontWeight={500} className={styles.progressPercentage}>{`${value}%`}</Typography>
      </div>
      <div >
      <Box className={styles.progressBar}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 8,
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#ff6d00',
            },
          }}
        />
      </Box>
      </div>
    </div>
  );
};

export default CourseProgressDetails;
