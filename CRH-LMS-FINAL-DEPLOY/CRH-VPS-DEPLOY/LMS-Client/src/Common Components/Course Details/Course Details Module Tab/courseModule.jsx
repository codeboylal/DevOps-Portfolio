// import React, {useEffect, useState } from 'react';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import Button from '@mui/material/Button';
// import styles from './courseModule.module.css';

// const CourseModuleTab = ({setModule,courses}) => {
//   const [activeTab, setActiveTab] = useState(1);
//   const [courseId, setCourseId] = useState('');
//   const [currentCourse, setCurrentCourse] = useState(null);

//   // Get courseId from localStorage
//   useEffect(() => {
//     const storedCourseId = localStorage.getItem('courseId');
//     if (storedCourseId) {
//       setCourseId(storedCourseId);
//     } else {
//       console.log('courseId not found');
//     }
//   }, []);

//   const handleTabClick = (tabIndex) => {
//     setActiveTab(tabIndex);
//   };

//     // Set currentCourse based on courseId
//     useEffect(() => {
//       if (courseId && courses.length > 0) {
//         const foundCourse = courses.find((course) => course._id === courseId);
//         // console.log(courses);
//         if (foundCourse) {
//           setCurrentCourse(foundCourse);
      
//         } else {
//           console.log('Course not found with the given courseId');
//         }
//       }
//     }, [courseId, courses]);

//     useEffect(()=>{
//       console.log(currentCourse.courseData)
//     })
//   return (
//     <div className={styles.container}>
//       <Button className={styles.backButton}>
//         <ArrowBackIosNewIcon 

//         sx={{
//           color:'#7E7E7E',
//         }}
        
//         />
//       </Button>
//       <div className={styles.moduleButtons}>
//         <Button 
//           onClick={() => {setModule("Module1"); setActiveTab(1);}}
//           sx={{
//             width: '113px',
//             height: '29px',
//             backgroundColor: activeTab === 1 ? '#ff6a00' : '#5f5f5f',
//             color: 'white',
//             borderRadius: '5px',
//             textTransform: 'none',
//             fontWeight: 'bold',
//             '&:hover': {
//               backgroundColor: activeTab === 1 ? '#e65a00' : '#484848',
//             }
//           }}
//         >
//           Module 1
//         </Button>
//         <Button 
//           onClick={() =>{setModule("Module2"); setActiveTab(2);}}

//           sx={{
//             width: '113px',
//             height: '29px',
//             backgroundColor: activeTab === 2 ? '#ff6a00' : '#5f5f5f',
//             color: 'white',
//             borderRadius: '5px',
//             textTransform: 'none',
//             fontWeight: 'bold',
//             '&:hover': {
//               backgroundColor: activeTab === 2 ? '#e65a00' : '#484848',
//             }
//           }}
//         >
//           Module 2
//         </Button>
//         <Button 
//           onClick={() => {setModule("Module3"); setActiveTab(3);}}
//           sx={{
//             width: '113px',
//             height: '29px',
//             backgroundColor: activeTab === 3 ? '#ff6a00' : '#5f5f5f',
//             color: 'white',
//             borderRadius: '5px',
//             textTransform: 'none',
//             fontWeight: 'bold',
//             '&:hover': {
//               backgroundColor: activeTab === 3 ? '#e65a00' : '#484848',
//             }
//           }}
//         >
//           Module 3
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CourseModuleTab;






















// import React, { useEffect, useState } from 'react';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import Button from '@mui/material/Button';
// import styles from './courseModule.module.css';

// const CourseModuleTab = ({ setModule, courses }) => {
//   const [activeTab, setActiveTab] = useState(1);
//   const [courseId, setCourseId] = useState('');
//   const [currentCourse, setCurrentCourse] = useState(null);

//   // Get courseId from localStorage
//   useEffect(() => {
//     const storedCourseId = localStorage.getItem('courseId');
//     if (storedCourseId) {
//       setCourseId(storedCourseId);
//     } else {
//       console.log('courseId not found');
//     }

//     // Retrieve selectedModule from localStorage
//     const storedModule = localStorage.getItem('selectedModule');
//     if (storedModule) {
//       // Set activeTab based on selectedModule
//       const moduleIndex = Object.keys(currentCourse?.courseData || {}).findIndex(module => module === storedModule);
//       if (moduleIndex !== -1) {
//         setActiveTab(moduleIndex + 1); // +1 because activeTab starts from 1
//       }
//     }
//   }, [currentCourse]);

//   const handleTabClick = (moduleName, tabIndex) => {
//     setModule(moduleName);
//     setActiveTab(tabIndex);
    
//     // Save selected module name to local storage
//     localStorage.setItem('selectedModule', moduleName);
//   };

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

//   // Check if currentCourse or courseData is valid
//   if (!currentCourse || typeof currentCourse.courseData !== 'object') {
//     return <div>Loading or No courseData available</div>;  // Handle the case when courseData is not an object
//   }

//   return (
//     <div className={styles.container}>
//       <Button className={styles.backButton}>
//         <ArrowBackIosNewIcon 
//           sx={{
//             color:'#7E7E7E',
//           }}
//         />
//       </Button>
//       <div className={styles.moduleButtons}>
//         {Object.entries(currentCourse.courseData).map(([moduleKey, module], index) => (
//           <Button 
//             key={moduleKey}  // Use moduleKey as the key for each button
//             onClick={() => handleTabClick(moduleKey, index + 1)}
//             sx={{
//               width: '113px',
//               height: '29px',
//               backgroundColor: activeTab === index + 1 ? '#ff6a00' : '#5f5f5f',
//               color: 'white',
//               borderRadius: '5px',
//               textTransform: 'none',
//               fontWeight: 'bold',
//               '&:hover': {
//                 backgroundColor: activeTab === index + 1 ? '#e65a00' : '#484848',
//               }
//             }}
//           >
//             {module.name || `Module ${index + 1}`}  {/* Use module name or default to 'Module X' */}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseModuleTab;




























// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import Button from '@mui/material/Button';
// import styles from './courseModule.module.css';

// const CourseModuleTab = ({ setModule, courses }) => {
//   const [activeTab, setActiveTab] = useState(0); // Default to the first tab (index 0)
//   const [courseId, setCourseId] = useState('');
//   const [currentCourse, setCurrentCourse] = useState(null);
  // const navigate = useNavigate();

  // const handleBackClick = () => {
  //   navigate('/allCourse');
  // };

//   useEffect(() => {
//     const storedCourseId = localStorage.getItem('courseId');
//     if (storedCourseId) {
//       setCourseId(storedCourseId);
//     } else {
//       console.log('courseId not found');
//     }
//   }, []);

//   useEffect(() => {
//     if (courseId && courses.length > 0) {
//       const foundCourse = courses.find((course) => course._id === courseId);
//       if (foundCourse) {
//         if (foundCourse.courseData && typeof foundCourse.courseData === 'object') {
//           const filteredCourseData = Object.fromEntries(
//             Object.entries(foundCourse.courseData).filter(
//               ([key, value]) => Array.isArray(value) && value.length > 0
//             )
//           );

//           if (Object.keys(filteredCourseData).length > 0) {
//             setCurrentCourse({ ...foundCourse, courseData: filteredCourseData });
//           } else {
//             console.log('No non-empty modules found in courseData');
//           }
//         }

//         const storedModule = localStorage.getItem('selectedModule');
//         const moduleKeys = Object.keys(foundCourse.courseData || {});

//         if (storedModule && moduleKeys.includes(storedModule)) {
//           const moduleIndex = moduleKeys.findIndex((module) => module === storedModule);
//           setActiveTab(moduleIndex !== -1 );
//         } else {
//           // Set "Module 1" as default active tab if no storedModule
//           const defaultIndex = moduleKeys.findIndex((key) => key === 'Module 1');
//           setActiveTab(defaultIndex !== -1 ? defaultIndex : 0);
//         }
//       } else {
//         console.log('Course not found with the given courseId');
//       }
//     }
//   }, [courseId, courses]);

//   const handleTabClick = (moduleKey, tabIndex) => {
//     setModule(moduleKey);
//     setActiveTab(tabIndex);
//     localStorage.setItem('selectedModule', moduleKey);
//   };

//   if (!currentCourse || typeof currentCourse.courseData !== 'object') {
//     return <div>Loading or No courseData available</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <Button className={styles.backButton} onClick={handleBackClick}>
//         <ArrowBackIosNewIcon
//           sx={{
//             color: '#7E7E7E',
//           }}
//         />
//       </Button>
//       <div className={styles.moduleButtons}>
//         {Object.entries(currentCourse.courseData).map(([moduleKey, module], index) => (
//           <Button
//             key={moduleKey}
//             onClick={() => handleTabClick(moduleKey, index)}
//             sx={{
//               width: '113px',
//               height: '29px',
//               backgroundColor: activeTab === index ? '#ff6a00' : '#5f5f5f',
//               color: 'white',
//               borderRadius: '5px',
//               textTransform: 'none',
//               fontWeight: 'bold',
//               '&:hover': {
//                 backgroundColor: activeTab === index ? '#e65a00' : '#484848',
//               },
//             }}
//           >
//             {module?.name || `Module ${index + 1}`}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseModuleTab;














import React, { useEffect, useState } from 'react';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import styles from './courseModule.module.css';
import { useNavigate } from 'react-router-dom';

const CourseModuleTab = ({ setModule, courses }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [courseId, setCourseId] = useState('');
  const [currentCourse, setCurrentCourse] = useState(null);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/myCourses');
  };
  // Retrieve courseId from localStorage
  useEffect(() => {
    const storedCourseId = localStorage.getItem('courseId');
    if (storedCourseId) {
      setCourseId(storedCourseId);
    } else {
      console.log('courseId not found');
    }
  }, []);

  // Set currentCourse based on courseId and initialize activeTab from localStorage
  useEffect(() => {
    if (courseId && courses.length > 0) {
      const foundCourse = courses.find((course) => course._id === courseId);
      if (foundCourse) {
        setCurrentCourse(foundCourse);

        // Retrieve selectedModule from localStorage only after setting currentCourse
        const storedModule = localStorage.getItem('selectedModule');
        if (storedModule) {
          const moduleIndex = Object.keys(foundCourse.courseData || {}).findIndex(
            (module) => module === storedModule
          );
          if (moduleIndex !== -1) {
            setActiveTab(moduleIndex + 1); // +1 because activeTab starts from 1
          }
        }
      } else {
        console.log('Course not found with the given courseId');
      }
    }
  }, [courseId, courses]);

  // Handle tab click and update selected module in localStorage
  const handleTabClick = (moduleKey, tabIndex) => {
    setModule(moduleKey);        // Set the current module
    setActiveTab(tabIndex);       // Update the active tab index

    // Save the selected module key directly to local storage
    localStorage.setItem('selectedModule', moduleKey);
  };

  // Check if currentCourse or courseData is valid
  if (!currentCourse || typeof currentCourse.courseData !== 'object') {
    return <div>Loading or No courseData available</div>;
  }

  return (
    <div className={styles.container}>
      {/* <Button className={styles.backButton} onClick={handleBackClick}> */}
        <div className={styles.circle}
        onClick={handleBackClick}>
      <FontAwesomeIcon icon={faChevronLeft} 
      style={{
        padding:'0px',
        // backgroundColor:'red'
      }}/>
      </div>
      {/* </Button> */}
      <div className={styles.moduleButtons}>
        {Object.entries(currentCourse.courseData).map(([moduleKey, module], index) => {
          // Skip the first module if it's an array
          // if (index === index-1 && Array.isArray(module)) {
          //   return null;
          // }

          if (index === Object.entries(currentCourse.courseData).length - 1 && Array.isArray(module)) {
            return null;
          }



          return (
            <Button
              key={moduleKey} // Use moduleKey as the key for each button
              onClick={() => handleTabClick(moduleKey, index + 1)}
              sx={{
                width: '113px',
                height: '29px',
                backgroundColor: activeTab === index + 1 ? '#ff6a00' : '#5f5f5f',
                color: 'white',
                borderRadius: '5px',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: activeTab === index + 1 ? '#e65a00' : '#484848',
                },
              }}
            >
              {module?.name || `Module ${index}`} {/* Display module name or default starting from "Module 0" */}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CourseModuleTab;
