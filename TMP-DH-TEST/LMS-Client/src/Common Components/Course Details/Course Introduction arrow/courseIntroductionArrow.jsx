
// import React, { useEffect, useState } from 'react';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import styles from './courseIntroductionArrow.module.css';
// import CourseDetailsTab from '../Course Details Tabs/courseDetailsTab';
// import ReadingVideoTime from '../Material/readOrVid';

// const CourseIntroductionArrow = ({ courses, module }) => {
//   const [openTabIndex, setOpenTabIndex] = useState(null); // To track which tab is open
//   const [currentCourse, setCurrentCourse] = useState(null);
//   const [currentModule, setCurrentModule] = useState(module);
//   const [courseId, setCourseId] = useState('');

//   // Get courseId from localStorage
//   useEffect(() => {
//     const storedCourseId = localStorage.getItem('courseId');
//     if (storedCourseId) {
//       setCourseId(storedCourseId);
//     } else {
//       console.log('courseId not found');
//     }
//   }, []);

//   useEffect(() => {
//     setCurrentModule(module);
//   }, [module]);

//   // Set currentCourse based on courseId
//   useEffect(() => {
//     if (courseId && courses.length > 0) {
//       const foundCourse = courses.find((course) => course._id === courseId);
//       if (foundCourse) {
//         setCurrentCourse(foundCourse);
//       } else {
//         console.log('Course not found with the given courseId');
//       }
//     }
//   }, [courseId, courses]);

//   // Scroll to top when component is rendered
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const toggleOpen = (index) => {
//     setOpenTabIndex(openTabIndex === index ? null : index); // Toggle open state for each tab
//   };

//   return (
//     <div className={styles.tabContainer} >
//       {/* Title Section */}
//       <div className={styles.tabTitle}>
//         <div className={styles.tabDivider}></div>
//         <div className={styles.title}>Understanding the key components</div>
//         <div className={styles.tabDivider}></div>
//       </div>

//       {/* Mapping through Module1 array to create multiple tab headers */}
//       {currentCourse?.courseData?.[currentModule]?.map((module, index) => (
//         <div key={index} >
//           {/* Collapsible Header for each module */}
 
//             <div className={styles.tabHeader} onClick={() => toggleOpen(index)}>
//               <div className={styles.tabHeaderText}  style={{backgroundColor:'white',marginTop:'20px  '}}>
//                 <div className={styles.iconAndIntro}>
//                   {/* Display module subtitle or default message */}
//                   {module?.subTitle || 'No title available'}
//                   {/* Arrow Icon */}
//                   <ExpandMoreIcon
//                     className={`${styles.icon} ${openTabIndex === index ? styles.iconOpen : ''}`}
//                   />
//                 </div>

//                 <div className={styles.readOrVid}>
//                   {/* Render ReadingVideoTime only when the tab is collapsed */}
//                   {openTabIndex !== index && <ReadingVideoTime />}
//                 </div>
//               </div>
//             </div>
          

//           {/* Collapsible Content for each module */}
//           {openTabIndex === index && (
//             <div className={`${styles.tabContent} ${styles.tabContentOpen}`}>
//               {/* Video Container */}
//               <div className={styles.videoContainer}>
//                 <iframe
//                   src={module?.videoLink || 'No video available'}
//                   width="100%"
//                   height="400"
//                   allow="autoplay"
//                   frameBorder="0"
//                   sandbox="allow-same-origin allow-scripts"
//                   allowFullScreen
//                   title={`Module ${index + 1} Introduction`}
//                 ></iframe>
//               </div>

//               {/* Tab Content Below the Video */}
//               <div style={{ marginTop: '24px' }}>
//                 <CourseDetailsTab />
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseIntroductionArrow;








import React, { useEffect, useState, useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './courseIntroductionArrow.module.css';
import CourseDetailsTab from '../Course Details Tabs/courseDetailsTab';
import ReadingVideoTime from '../Material/readOrVid';

const CourseIntroductionArrow = ({ courses, module }) => {
  const [openTabIndex, setOpenTabIndex] = useState(null); // To track which tab is open
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentModule, setCurrentModule] = useState(module);
  const [courseId, setCourseId] = useState('');
  
  const videoContainerRef = useRef(null); // Reference for the video container

  // Get courseId from localStorage
  useEffect(() => {
    const storedCourseId = localStorage.getItem('courseId');
    if (storedCourseId) {
      setCourseId(storedCourseId);
    } else {
      console.log('courseId not found');
    }
  }, []);

  useEffect(() => {
    setCurrentModule(module);
  }, [module]);

  // Set currentCourse based on courseId
  useEffect(() => {
    if (courseId && courses.length > 0) {
      const foundCourse = courses.find((course) => course._id  === courseId);
      if (foundCourse) {
        setCurrentCourse(foundCourse);
      } else {
        console.log('Course not found with the given courseId');
      }
    }
  }, [courseId, courses]);

  // Scroll to top when component is rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleOpen = (index) => {
    const newIndex = openTabIndex === index ? null : index;
    setOpenTabIndex(newIndex);

    // Scroll to video container if a tab is being opened
    if (newIndex !== null && videoContainerRef.current) {
      setTimeout(() => {
        videoContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div className={styles.tabContainer} >
      {/* Title Section */}
      <div className={styles.tabTitle}>
        <div className={styles.tabDivider}></div>
        <div className={styles.title}>Understanding the key components</div>
        <div className={styles.tabDivider}></div>
      </div>

      {/* Mapping through Module1 array to create multiple tab headers */}
      {currentCourse?.courseData?.[currentModule]?.map((module, index) => (
        <div key={index}  className='mainContainer'>
          {/* Collapsible Header for each module */}
          <div className={styles.tabHeader} onClick={() => toggleOpen(index)}>
            <div className={styles.tabHeaderText} style={{ backgroundColor: 'white', marginTop: '20px' }}>
              <div className={styles.iconAndIntro}>
                {/* Display module subtitle or default message */}
                {module?.subTitle || 'No title available'}
                {/* Arrow Icon */}
                <ExpandMoreIcon
                  className={`${styles.icon} ${openTabIndex === index ? styles.iconOpen : ''}`}
                />
              </div>

              <div className={styles.readOrVid}>
                {/* Render ReadingVideoTime only when the tab is collapsed */}
                {openTabIndex !== index && <ReadingVideoTime />}
              </div>
            </div>
          </div>

          {/* Collapsible Content for each module */}
          {openTabIndex === index && (
            <div className={`${styles.tabContent} ${styles.tabContentOpen}`} ref={videoContainerRef}>
              {/* Video Container */}
              <div className={styles.videoContainer}>
                <iframe
                  src={module?.videoLink || 'No video available'}
                  width="100%"
                  height="400"
                  allow="autoplay"
                  frameBorder="0"
                  sandbox="allow-same-origin allow-scripts"
                  allowFullScreen
                  title={`Module ${index + 1} Introduction`}
                ></iframe>
              </div>

              {/* Tab Content Below the Video */}
              <div style={{ marginTop: '24px' }}>
                <CourseDetailsTab module={module}/>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseIntroductionArrow;
