import React, { useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
import styles from './tabComponent.module.css';
import { useNavigate } from 'react-router-dom';

const TabComponent = ({ width, activeTab, setActiveTab ,page}) => {
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };  

  

  const handleAllCourse = () => {
    localStorage.setItem("activeTab",0)
    navigate('/myCourses');
  };

  const InprogressTab = () =>{
    localStorage.setItem("activeTab",1)
    navigate('/myCourses')
  }

  const CompletedTab = () =>{
    localStorage.setItem("activeTab",2)
    navigate('/myCourses')
  }

  return (
    <div className={styles.tabContainer} style={{ width: width ? width : '' }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        TabIndicatorProps={{
          style: { backgroundColor: '#FF6D00', height: '5px', borderRadius: '5px 5px 0px 0px' },
        }}
        textColor="inherit"
        variant="fullWidth"
        aria-label="course tabs"
      >
        {/* <Tab label="All Courses" className={activeTab === 0 ? styles.activeTab : styles.inactiveTab} onClick={page==="courseDetails" && handleAllCourse} />
        <Tab label="Active" className={activeTab === 1 ? styles.activeTab : styles.inactiveTab} onClick={page==="courseDetails" && InprogressTab}/>
        <Tab label="Completed" className={activeTab === 2 ? styles.activeTab : styles.inactiveTab} onClick={page==="courseDetails" && CompletedTab}/> */}
        <Tab 
          label="All Courses" 
          className={activeTab === 0 ? styles.activeTab : styles.inactiveTab} 
          onClick={page === "courseDetails" ? handleAllCourse : null} 
        />
        <Tab 
          label="Active" 
          className={activeTab === 1 ? styles.activeTab : styles.inactiveTab} 
          onClick={page === "courseDetails" ? InprogressTab : null} 
        />
        <Tab 
          label="Completed" 
          className={activeTab === 2 ? styles.activeTab : styles.inactiveTab} 
          onClick={page === "courseDetails" ? CompletedTab : null} 
        />
      </Tabs>
    </div>
  );
};

export default TabComponent;









// import React, { useEffect } from 'react';
// import { Tabs, Tab } from '@mui/material';
// import styles from './tabComponent.module.css';
// import { useNavigate } from 'react-router-dom';

// const TabComponent = ({ width, activeTab, setActiveTab }) => {
//   const navigate = useNavigate();

//   // Set activeTab based on localStorage when the component mounts
//   useEffect(() => {
//     const savedTab = localStorage.getItem('coursesTab');
//     const savedTabIndex = savedTab !== null ? parseInt(savedTab, 10) : 0;
    
//     // If coursesTab is different from activeTab, update activeTab
//     if (savedTabIndex !== activeTab) {
//       setActiveTab(savedTabIndex);
//     }
//   }, [activeTab, setActiveTab]);

//   const handleChange = (event, newValue) => {
//     setActiveTab(newValue);
//     localStorage.setItem('coursesTab', newValue); // Save to localStorage
//   };

//   const handleAllCourse = () => {
//     setActiveTab(0);
//     localStorage.setItem('coursesTab', 0); // Save to localStorage
//     // navigate('/allCourse');
//   };

//   return (
//     <div className={styles.tabContainer} style={{ width: width ? width : '' }}>
//       <Tabs
//         value={activeTab}
//         onChange={handleChange}
//         TabIndicatorProps={{
//           style: { backgroundColor: '#FF6D00', height: '5px', borderRadius: '5px 5px 0px 0px' },
//         }}
//         textColor="inherit"
//         variant="fullWidth"
//         aria-label="course tabs"
//       >
//         <Tab
//           label="All Courses"
//           className={activeTab === 0 ? styles.activeTab : styles.inactiveTab}
//           onClick={handleAllCourse}
//         />
//         <Tab
//           label="Active"
//           className={activeTab === 1 ? styles.activeTab : styles.inactiveTab}
//         />
//         <Tab
//           label="Completed"
//           className={activeTab === 2 ? styles.activeTab : styles.inactiveTab}
//         />
//       </Tabs>
//     </div>
//   );
// };

// export default TabComponent;
