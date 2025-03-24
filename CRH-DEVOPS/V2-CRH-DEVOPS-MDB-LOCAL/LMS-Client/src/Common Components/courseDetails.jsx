// import React, {useEffect,useState}from 'react';
// import CourseProgressDetails from './Course Details/Course Progress/courseDetailsProgress';
// import CourseIntroductionArrow from './Course Details/Course Introduction arrow/courseIntroductionArrow';
// import CourseDetailsTab from './Course Details/Course Details Tabs/courseDetailsTab';
// import CourseModule from './Course Details/Course Details Module Tab/courseModule';
// import CourseModuleTab from './Course Details/Course Details Module Tab/courseModule';
// import PaginationComponent from './Pagination Component/paginationComponent';
// import SidebarDashboard from './SideBar Dashboard/sideBarDashboard';
// import ReadingVideoTime from './Course Details/Material/readOrVid';
// import { getExploreCourses } from '../services/Courses/GetCourses';


// import styles from './courseDetails.module.css'
// import HeaderDashboardPage from './Header Dashboard Page/headerDashboardPage';
// import { useNavigate } from 'react-router-dom';


// function CourseDetails() {
//   const [courses, setCourses] = useState([]);
//   const [module, setModule] = useState(() => localStorage.getItem("selectedModule") || "Module1");
//   const [activeTab, setActiveTab] = useState(0);
//  const navigate = useNavigate();


//   useEffect(()=>{
//     getExploreCourses().then(response=>{
//       // console.log(response?.data?.data)
//       setCourses(response?.data?.data)
//     })
//   },[])
  

//   // switch (activeTab) {
//   //   case 1:
//   //     // setCurrentPage(1)
//   //     navigate('/allCourse');
//   //     break; 
  
//   //   case 2:
//   //     // setCurrentPage(1)
//   //     navigate('/allCourse');
//   //     break; 
  
//   //   default:
//   //     navigate('/allCourse');
//   //     break; 
//   // }
  
//   useEffect(() => {
//     // Redirect to "All Courses" when the activeTab is set
//     if (activeTab === 'allCourses') {
//       navigate('/all-courses');
//     }
//   }, [activeTab, navigate]);




//   return (
//     <div style={{ display:'flex', gap:"50px"}}>
//     <div className={styles.firstdiv} style={{ zIndex: '2', display: 'flex', alignItems: 'left', gap: '24px', flexDirection: 'column' }}>
//       {/* <HeaderDashboardPage setActiveTab={setActiveTab} activeTab={activeTab}   /> */}
//       <HeaderDashboardPage setActiveTab={setActiveTab} activeTab={activeTab} />

//       <SidebarDashboard />
//       </div>


//       {/* <div className={styles.mainContainer} style={{ zIndex: '2', width: '1440px', display: 'flex', position: 'absolute', top: '70px', gap: '24px', flexDirection: 'row' }}> */}
//         <div className={styles.Container} style={{display:'flex', justifyContent:'center'}} >

//         <div style={{width:'1184px'}}>

//         <CourseModuleTab courses={courses} setModule={setModule}/>
//       <CourseProgressDetails value={40} />
//       <CourseIntroductionArrow courses={courses}  module={module} />
//       </div >
//         </div>
//       {/* </div> */}
//     </div>
//   );





// }

// export default CourseDetails;











import React, { useEffect, useState } from 'react';
import CourseProgressDetails from './Course Details/Course Progress/courseDetailsProgress';
import CourseIntroductionArrow from './Course Details/Course Introduction arrow/courseIntroductionArrow';
import CourseDetailsTab from './Course Details/Course Details Tabs/courseDetailsTab';
import CourseModuleTab from './Course Details/Course Details Module Tab/courseModule';
import SidebarDashboard from './SideBar Dashboard/sideBarDashboard';
import { getExploreCourses } from '../services/Courses/GetCourses';
import styles from './courseDetails.module.css';
import HeaderDashboardPage from './Header Dashboard Page/headerDashboardPage';
import { useNavigate } from 'react-router-dom';
import UpperContainer from '../pages/Accomplishments/Open Accomplishments/Sections/UpperContainer/UpperContainer';
import { GetUserDetails } from '../services/Tasks/getTasks';
import MidContainer from '../pages/Accomplishments/Open Accomplishments/Sections/MidContainer/MidContainer';
import LoadingSpinner from './Loader/Loader';

function CourseDetails() {
  const [courses, setCourses] = useState([]);
  const [module, setModule] = useState(() => localStorage.getItem('selectedModule') || 'Module1');
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const [loadingState, setLoadingState] = useState(false)

 
  
 

  const [triggerDownload, setTriggerDownload] = useState(false);
  const [courseID, setCourseID] = useState("");
  const [continueWatchingCourses, setContinueWatchingCourses] = useState({});
  const [staticCourse , setStaticCourse] = useState({})
 
  useEffect(()=>{
    try{
      const localID = localStorage.getItem("courseId")
      if(!localID || localID === "" || localID === null){
        throw new Error ("error")
      }else{
        // console.log(localID)
        setCourseID(localID)
      }
    }catch{
      console.log("Course ID is not here")
      navigate("/allCourse")
    }
  },[navigate])

  const [name, setName] = useState("");

  useEffect(()=>{
    if(courseID){
      try{
        setLoadingState(true)
        GetUserDetails(localStorage.getItem("id")).then(response=>{
          setName(response?.data?.data[0]?.name)
          // console.log(response?.data?.data[0]?.continueWatching)
          setContinueWatchingCourses(response?.data?.data[0]?.continueWatching)
          setLoadingState(false)
        })
      }catch{

        console.log("Local id is not there in local storage")
        // navigate("/allCourse")
      }
      
    }
  },[courseID])
  const [EnrolledStudents , setEnrolledStudents] = useState();

  useEffect(() => {
    // Fetch courses data
    setLoadingState(true)
    getExploreCourses().then((response) => {
      setCourses(response?.data?.data);
      const modules = response?.data?.data;
      // console.log(modules)
  
      if (modules && Array.isArray(modules)) {
          const matchedModule = modules.find(module => module._id === courseID);
          if (matchedModule) {
              // setModuleName(matchedModule.moduleName);
              setEnrolledStudents(matchedModule?.EnrolledStudents)
          }
      }
      setLoadingState(false)
    });
  }, [courseID]);

  // Navigate to 'All Courses' page when the active tab is clicked
  // useEffect(() => {
  //   if (activeTab === 0) {
  //     // navigate('/allCourse');
  //   }else if(activeTab === 1){
  //     navigate('/allCourse');
  //   }else if(activeTab === 2){
  //     navigate('/allCourse');
  //   }
  // }, [activeTab, navigate]);


  useEffect(()=>{
    if(continueWatchingCourses && courseID){
      // console.log(continueWatchingCourses)
      try{
        const foundCourse = continueWatchingCourses.find(
          (course) => course.courseID === courseID
        );
        if (foundCourse) {
          // console.log(foundCourse)
          setStaticCourse(foundCourse);
        } else {
          throw new Error("Course ID not found in Continue Watching Courses");
        }
      }catch{
        console.log("Course Id is not there in ContinueWatching Courses")
        // navigate("/allCourse")
      }
    }
  },[continueWatchingCourses,courseID])


  useEffect(()=>{
    const activeTAB = localStorage.getItem('activeTab');
    if((String(activeTAB).length) > 0){
      // console.log("activetab",activeTAB)
      setActiveTab(activeTab)
    }else{
      setActiveTab(0)
    }
  },[])


  return (
    loadingState ? 
    <div style={{zIndex:'30000'}}>
      <LoadingSpinner />
    </div>
    :
    <div style={{ display: 'flex', gap: '50px' }}>
      <div
        className={styles.firstdiv}
        style={{ zIndex: '2', display: 'flex', alignItems: 'left', gap: '24px', flexDirection: 'column' }}
      >
        {/* HeaderDashboardPage now controls the activeTab state */}
        <HeaderDashboardPage 
        pageText={"My Courses"}
        AppBarText={"Let's learn something new today!"}
        setActiveTab={setActiveTab} activeTab={activeTab} page={"courseDetails"} />
        <SidebarDashboard  page={"courseDetails"}/>
      </div>

      <div className={styles.Container} style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '1184px' }}>
          <div style={{display:staticCourse?.progress === 100 ? "block" : 'none' }}>
            <UpperContainer onTriggerDownload={() => setTriggerDownload(true)}   imag={staticCourse?.image} title={staticCourse?.title} EnrolledStudents={EnrolledStudents}  company={staticCourse?.company} grade={staticCourse?.Grade} />
            <MidContainer page={"courseDetails"} triggerDownload={triggerDownload} resetTrigger={() => setTriggerDownload(false)} name={name} title={staticCourse?.title} />
            <br />
            <br />
          </div>
          <CourseModuleTab courses={courses} setModule={setModule} />
          {/* <CourseProgressDetails value={courses?.progress} /> */}
          <CourseIntroductionArrow courses={courses} module={module} />
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;













// import React, { useEffect, useState } from 'react';
// import CourseProgressDetails from './Course Details/Course Progress/courseDetailsProgress';
// import CourseIntroductionArrow from './Course Details/Course Introduction arrow/courseIntroductionArrow';
// import CourseDetailsTab from './Course Details/Course Details Tabs/courseDetailsTab';
// import CourseModuleTab from './Course Details/Course Details Module Tab/courseModule';
// import SidebarDashboard from './SideBar Dashboard/sideBarDashboard';
// import { getExploreCourses } from '../services/Courses/GetCourses';
// import styles from './courseDetails.module.css';
// import HeaderDashboardPage from './Header Dashboard Page/headerDashboardPage';
// import { useNavigate } from 'react-router-dom';

// function CourseDetails() {
//   const [courses, setCourses] = useState([]);
//   const [module, setModule] = useState(() => localStorage.getItem('selectedModule') || 'Module1');

//   // Initialize activeTab from localStorage if it exists, otherwise default to 0
//   const [activeTab, setActiveTab] = useState(() => {
//     const savedTab = localStorage.getItem('coursesTab');
//     return savedTab !== null ? parseInt(savedTab, 10) : 0;
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch courses data
//     getExploreCourses().then((response) => {
//       setCourses(response?.data?.data);
//     });
//   }, []);

//   // Save activeTab to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('coursesTab', activeTab);
//   }, [activeTab]);

//   // Navigate to 'All Courses' page when specific tabs are clicked
//   // useEffect(() => {
//   //   if (activeTab === 1 || activeTab === 2) {
//   //     navigate('/allCourse');
//   //   }
//   // }, [activeTab, navigate]);

//   return (
//     <div style={{ display: 'flex', gap: '50px' }}>
//       <div
//         className={styles.firstdiv}
//         style={{ zIndex: '2', display: 'flex', alignItems: 'left', gap: '24px', flexDirection: 'column' }}
//       >
//         {/* HeaderDashboardPage now controls the activeTab state */}
//         <HeaderDashboardPage setActiveTab={setActiveTab} activeTab={activeTab} />
//         <SidebarDashboard />
//       </div>

//       <div className={styles.Container} style={{ display: 'flex', justifyContent: 'center' }}>
//         <div style={{ width: '1184px' }}>
//           <CourseModuleTab courses={courses} setModule={setModule} />
//           <CourseProgressDetails value={40} />
//           <CourseIntroductionArrow courses={courses} module={module} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseDetails;
























// import React, { useEffect, useState } from 'react';
// import CourseProgressDetails from './Course Details/Course Progress/courseDetailsProgress';
// import CourseIntroductionArrow from './Course Details/Course Introduction arrow/courseIntroductionArrow';
// import CourseDetailsTab from './Course Details/Course Details Tabs/courseDetailsTab';
// import CourseModuleTab from './Course Details/Course Details Module Tab/courseModule';
// import SidebarDashboard from './SideBar Dashboard/sideBarDashboard';
// import { getExploreCourses } from '../services/Courses/GetCourses';
// import styles from './courseDetails.module.css';
// import HeaderDashboardPage from './Header Dashboard Page/headerDashboardPage';
// import { useNavigate } from 'react-router-dom';

// function CourseDetails() {
//   const [courses, setCourses] = useState([]);
//   const [module, setModule] = useState(() => localStorage.getItem('selectedModule') || 'Module1');
//   const [activeTab, setActiveTab] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch courses data
//     getExploreCourses().then((response) => {
//       setCourses(response?.data?.data);
//     });
//   }, []);

//   // Navigate to 'All Courses' page when the active tab is clicked
//   useEffect(() => {
//     if (activeTab === 0) {
//       // navigate('/allCourse');
//     }else if(activeTab === 1){
//       navigate('/allCourse');
//     }else if(activeTab === 2){
//       navigate('/allCourse');
//     }
//   }, [activeTab, navigate]);

//   return (
//     <div style={{ display: 'flex', gap: '50px' }}>
//       <div
//         className={styles.firstdiv}
//         style={{ zIndex: '2', display: 'flex', alignItems: 'left', gap: '24px', flexDirection: 'column' }}
//       >
//         {/* HeaderDashboardPage now controls the activeTab state */}
//         <HeaderDashboardPage setActiveTab={setActiveTab} activeTab={activeTab} />
//         <SidebarDashboard />
//       </div>

//       <div className={styles.Container} style={{ display: 'flex', justifyContent: 'center' }}>
//         <div style={{ width: '1184px' }}>
//           <CourseModuleTab courses={courses} setModule={setModule} />
//           <CourseProgressDetails value={40} />
//           <CourseIntroductionArrow courses={courses} module={module} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseDetails;






