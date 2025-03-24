// import { useState, useEffect } from 'react';

// import styles from './dashboard.module.css';

// //sections import
// import CourseDetails from './sections/courseDetails';
// import NotificationSection from './sections/notificationInstructor';
// import ContinueWatching from './sections/continueWatching';
// import AnalysisDownloads from './sections/analysisDownloads'

// //loader
// import LoadingSpinner from '../../Common Components/Loader/Loader';


// //Controller
// import { GetUserDetails} from '../../services/Tasks/getTasks';
// import SidebarDashboard from '../../Common Components/SideBar Dashboard/sideBarDashboard';
// import HeaderDashboardPage from '../../Common Components/Header Dashboard Page/headerDashboardPage';


// function Dashboard(){
//   const [state, setState] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);


//   // Get all details of use
//   const [courseDetailsProp, setcourseDetailsProp] = useState([]);
//   const [notificationListProp, setnotificationListProp] = useState([]);
//   const [instructorsListProp, setinstructorsListProp] = useState([]);
//   const [toDoListProp, setToDoListProp] = useState([]);
//   const [continueWatchingListProp, setcontinueWatchingListProp] = useState([]);




//   useEffect(() => {
//     try{
//       setIsLoading(true);
//       const UserID = localStorage.getItem("id");
//       if(UserID){
//         GetUserDetails(UserID).then((response) => {     
//           // Course details
//           const courseDetails = response?.data?.data[0]?.courseDetails;
//           setcourseDetailsProp(courseDetails || []);     
//           // Notification List
//           const notificationList = response?.data?.data[0]?.notificationData;
//           setnotificationListProp(notificationList || []); 
//           // Instructors List
//           const instructorsList = response?.data?.data[0]?.instructorsData;
//           setinstructorsListProp(instructorsList || []); 
//           // To Do List
//           const toDoList = response?.data?.data[0]?.toDoList;
//           setToDoListProp(toDoList || []);   
//           // Continue Watching List
//           const continueWatchingList = response?.data?.data[0]?.continueWatching;
//           setcontinueWatchingListProp(continueWatchingList || []); 
//           //Removing the loadig screen
//           setIsLoading(false);
//           setState(response?.data?.data); 
//         }); 
//       }else{
//         console.log("User does not exist!!")
//       }
//     }catch(err){
//       console.log("Error fetching Dashboard details!!")
//     }
//   }, []);

//   return(

//     <div className={styles.mainDiv}>
//         {
//           isLoading ? <LoadingSpinner /> : <div style={{zIndex:'2', display: 'flex',alignItems:'center',  gap: '24px', flexDirection: 'column' }}>
//             <HeaderDashboardPage />
//             {
//               state.length > 0 && state.map((item, index) => {
//                 return (
//                   <div key={index} style={{zIndex:'2', width: '1440px', display: 'flex',position:'absolute', top:'70px',  gap: '24px', flexDirection: 'row' }} >
//                     <div>
//                       <SidebarDashboard />
//                     </div>   
//                     <div style={{width:'1240px', display:'flex',position:'relative',top:'70px',alignItems:'center',gap:'24px', flexDirection:'column'}}>
//                       {/* <SidebarDashboard /> */}
//                       <CourseDetails  courseDetailsProp={courseDetailsProp}/>
//                       <NotificationSection notificationListProp={notificationListProp} instructorsListProp={instructorsListProp}/>
//                       <AnalysisDownloads toDoListProp={toDoListProp} />
//                       <ContinueWatching continueWatchingListProp={continueWatchingListProp}/>
//                       <br/>
//                     </div>
//                   </div>
//                 )
//               })
//             }
//           </div>
//         }
//     </div>
//   )
// }
// export default Dashboard;
import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';

import { Navigate, useNavigate } from 'react-router-dom';

// sections import
import CourseDetails from './sections/courseDetails';
import NotificationSection from './sections/notificationInstructor';
import ContinueWatching from './sections/continueWatching';
import AnalysisDownloads from './sections/analysisDownloads';

// loader
import LoadingSpinner from '../../Common Components/Loader/Loader';

// Controller
import { GetUserDetails } from '../../services/Tasks/getTasks';
import SidebarDashboard from '../../Common Components/SideBar Dashboard/sideBarDashboard';
import HeaderDashboardPage from '../../Common Components/Header Dashboard Page/headerDashboardPage';
import { useToaster } from "../../Toaster"

// Material UI for Snackbar
import { Snackbar, Alert } from '@mui/material';

function Dashboard() {

  const showToaster = useToaster()
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Get all details of user
  const [courseDetailsProp, setcourseDetailsProp] = useState([]);
  const [notificationListProp, setnotificationListProp] = useState([]);
  const [instructorsListProp, setinstructorsListProp] = useState([]);
  const [toDoListProp, setToDoListProp] = useState([]);
  const [continueWatchingListProp, setcontinueWatchingListProp] = useState([]);

  // State for managing the success notification
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [userId, setUserId] = useState("");

  // Function to fetch the user ID from the URL or localStorage
  const fetchUserId = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // If there's an id in the URL, store it in localStorage and set state
    if (id) {
      localStorage.setItem("id", id);
      setUserId(id);
    } else {
      // If no id in URL, try fetching from localStorage
      const storedId = localStorage.getItem("id");
      setUserId(storedId || "");
    }
  };

  // Run this on initial load to fetch the user ID
  useEffect(() => {
    fetchUserId();
  }, []); // This effect runs only once on initial load

  // API Call to fetch user details after userId is set
  useEffect(() => {
    if (userId && userId !== "") {
      async function apiCall() {
        try {
          setIsLoading(true);
          const response = await GetUserDetails(userId);
          
          const courseDetails = response?.data?.data[0]?.courseDetails || [];
          const notificationList = response?.data?.data[0]?.notificationData || [];
          const instructorsList = response?.data?.data[0]?.instructorsData || [];
          const toDoList = response?.data?.data[0]?.toDoList || [];
          const continueWatchingList = response?.data?.data[0]?.continueWatching || [];

          setcourseDetailsProp(courseDetails);
          setnotificationListProp(notificationList);
          setinstructorsListProp(instructorsList);
          setToDoListProp(toDoList);
          setcontinueWatchingListProp(continueWatchingList);

          setSnackbarOpen(true);  // Show success notification
          setIsLoading(false);    // Remove the loading spinner
          setState(response?.data?.data);
        } catch (err) {
          console.error("Error fetching Dashboard details!!");
          setIsLoading(false);  // Hide loading spinner on error
        }
      }

      apiCall();  // Only call API if userId exists
    }
  }, [userId]);  // This effect runs whenever `userId` changes

  window.scrollTo(0, 0);

  return (
    <div className={styles.container} style={{ display: 'flex' }}>
      <SidebarDashboard page={"dashboard"}/>
      <div className={styles.contentContainer}>
        <HeaderDashboardPage />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {state.length > 0 &&
              state.map((item, index) => (
                <div
                  key={index}
                  className='courseCard'
                  style={{
                    width: '1240px',
                    display: 'flex',
                    position: 'relative',
                    marginTop: '124px',
                    alignItems: 'center',
                    gap: '24px',
                    flexDirection: 'column'
                  }}
                >
                  <div className={styles.oranageCards}>
                  <CourseDetails courseDetailsProp={courseDetailsProp} />
                  </div>
                  <NotificationSection
                    notificationListProp={notificationListProp}
                    instructorsListProp={instructorsListProp}
                  />
                  <AnalysisDownloads toDoListProp={toDoListProp} />
                  <ContinueWatching continueWatchingListProp={continueWatchingListProp} />
                  <br />
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
