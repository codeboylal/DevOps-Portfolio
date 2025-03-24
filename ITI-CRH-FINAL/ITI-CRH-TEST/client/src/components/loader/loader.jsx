import React from 'react';
import styles from './loader.module.css';

const BuildingLoader = ({ loaderValue = false, progress = {},height='100%',width='100%', marginTop="45vh" }) => {
  // Filter out invalid or unknown types from the progress data
  const validProgress = Object.entries(progress).filter(
    ([type, data]) => type !== "Unknown Type" && data?.total > 0
  );

  // const totalTasks = validProgress.reduce((sum, [, { total }]) => sum + total, 0);
  // const fetchedTasks = validProgress.reduce((sum, [, { fetched }]) => sum + fetched, 0);

  return (
    <div className={styles.loaderContainer} style={{
      marginTop: marginTop,
      height: height,
      width: width
    }}>
      <div className={styles.animation}>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
        <div className={styles.block}></div>
      </div>

      {loaderValue && (
        <div className={styles.progressContainer}>
          {validProgress.map(([type, data]) => (
            <div key={type} className={styles.taskProgress}
              style={{
                display:  data.fetched === data.total && 'none'
              }}
            
            >
              <p>
                {type}: {data.fetched || 0} of {data.total || 0} tasks synced
              </p>
            </div>
          ))}
          {/* <p>
            Total: {fetchedTasks} of {totalTasks} tasks synced
          </p> */}
        </div>
      )}
    </div>
  );
};

export default BuildingLoader;
