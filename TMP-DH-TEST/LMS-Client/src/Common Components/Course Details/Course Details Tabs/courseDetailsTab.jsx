import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import classNames from 'classnames';
import styles from './courseDetailsTab.module.css';
import { getExploreCourses } from '../../../services/Courses/GetCourses';

const CourseDetailsTab = ({module}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };



  return (
    <div className={styles.tabContainer} >
      <div className={styles.tabSubContainer}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          className={styles.tabs}
          TabIndicatorProps={{
            className: styles.tabIndicator,
          }}
          sx={{
            width:'100%',
            height: '30px',
            minHeight: '30px',
            
            '.MuiTabs-flexContainer': {
              justifyContent:'space-between',
              height: '30px',
              alignItems: 'center',
              
            },
          }}
        >
          <Tab
            label="Summary"
            sx={{
              height: '30px',
              width: '25%',
              fontSize: '14px',
              

              '&.Mui-selected': {
                backgroundColor: '#EFEFEF', // Change background color when selected
                color: 'black', // Change text color when selected
                border:'.5px solid #4B4B4B' ,
            

              },
             
            }}
            className={classNames(styles.tab, {
              [styles.activeTab]: activeTab === 0,
            })}
          />
          <Tab
            label="Notes"
            sx={{
              height: '30px',
              width: '25%',
              fontSize: '14px',
              '&.Mui-selected': {
                backgroundColor: '#EFEFEF', // Change background color when selected
                color: 'black', // Change text color when selected
                border:'.5px solid #4B4B4B' ,
                

              },
            }}
            className={classNames(styles.tab, {
              [styles.activeTab]: activeTab === 1,
            })}
          />
          <Tab
            label="Transcript"
            sx={{
              height: '30px',
              width: '25%',
              fontSize: '14px',
              '&.Mui-selected': {
                backgroundColor: '#EFEFEF', // Change background color when selected
                color: 'black', // Change text color when selected
                border:'.5px solid #4B4B4B' ,
               

              },
            }}
            className={classNames(styles.tab, {
              [styles.activeTab]: activeTab === 2,
            })}
          />
          <Tab
            label="Attachments"
            sx={{
              height: '30px',
              width: '25%',
              fontSize: '14px',
              '&.Mui-selected': {
                backgroundColor: '#EFEFEF', // Change background color when selected
                color: 'black', // Change text color when selected
                border:'.5px solid #4B4B4B' ,
      

              },
            }}
            className={classNames(styles.tab, {
              [styles.activeTab]: activeTab === 3,
            })}
          />
        </Tabs>
      </div>

      {/* Conditional content based on the active tab */}
      <div className={styles.tabContent}>
        {activeTab === 0 && <div>Summary Content {module.summary}</div>}
        {activeTab === 1 && <div>Notes Content {module.notes}</div>}
        {activeTab === 2 && <div>Transcript Content {module.transcript}</div>}
        {activeTab === 3 && <div>Attachments Content {module.attachments}</div>}
      </div>
    </div>
  );
};

export default CourseDetailsTab;
