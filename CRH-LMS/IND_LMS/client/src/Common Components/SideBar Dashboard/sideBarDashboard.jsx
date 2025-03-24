// import React, { useEffect, useState } from 'react';
// import styles from './sideBarDashboard.module.css';
// import HeaderDashboardPage from '../Header Dashboard Page/headerDashboardPage';
// import Base_URL from '../../const/const';
// import { 
//   DashboardOutlined, 
//   MenuBookOutlined, 
//   AssignmentOutlined, 
//   EmojiEventsOutlined, 
//   WorkOutlined, 
//   CloudDownloadOutlined, 
//   SettingsOutlined, 
//   HelpOutlined,
//   ExitToAppOutlined
// } from '@mui/icons-material';
// import lmsLogo from './lmsLogo.jpg';
// import demo from './demo.jpeg';
// import { useNavigate } from 'react-router-dom';
// import { GetUserDetails } from '../../services/Tasks/getTasks';

// const SidebarDashboard = ({headerPopupState,userDataChange}) => {
//   const [collapsed, setCollapsed] = useState(false); // Manage collapsed state
//   const [Bgcolor, setBgColor] = useState(false);
//   const navigate = useNavigate();

//   const handleItemClick = () => {
//     setCollapsed(!collapsed);
    
//   };

//   const [userData, setUserData] = useState({
//     name: '',
//     education: [],
//     profileImg: ''
// });

//   useEffect(()=>{
//     try{
//       const UserID = localStorage.getItem("id");
//       GetUserDetails(UserID).then(response=>{
//         // Set data
//         setUserData(response?.data?.data[0])
//       })
//     }catch{
//       console.log("User id is found in local storage.")
//       navigate("/login")
//     }
    
//   },[userDataChange])
  
//   const [profilePic,setProfilePic] = useState('');
//   useEffect(()=>{
//     setProfilePic(userData?.profileImg?.length > 0 ? `${Base_URL}${userData.profileImg}` : demo)
//   },[userData])


//   return (
//     <div className={styles.dashboardContainer} style={{zIndex:headerPopupState ? '0' : '4' , position:'relative'}}>
//       {/* Sidebar */}
//       <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
//         <div className={styles.navMenuContainer}>
//           {/* Profile Section */}
//           <div className={styles.profile} onClick={() => navigate('/profile')}>
//             <img src={profilePic} alt="User" className={styles.profilePic} />
//             {!collapsed && (
//               <div className={styles.profileInfo}>
//                 <br />
//                 <h3>{userData?.name || '-'}</h3>
//                 <p>{userData?.education?.[0]?.courseNameValue || '-'}</p>
//               </div>
//             )}
//           </div>

//           {/* LMS Logo */}
//           <div className={styles.logo}>
//             <img src={lmsLogo} alt="LMS Logo" className={styles.logoImage} />
//           </div>

//           {/* Navigation Menu */}
//           <div className={styles.commonMenuList}>
//           <div className={styles.navMenu}>
//             <ul>
//               <li onClick={() => navigate('/dashboard')}>
//                 <div className={styles.menuItem}>
//                   <DashboardOutlined className={styles.icon} />
//                   {!collapsed && <div>Dashboard</div>}
//                 </div>
//               </li>
//               <li onClick={() => navigate('/exploreCourses')}>
//                 <div className={styles.menuItem}>
//                   <MenuBookOutlined className={styles.icon} />
//                   <div className={styles.span} id='exploreCourses'>Explore Courses</div>
//                 </div>
//               </li>
//               <li onClick={() => navigate('/allCourse')}>
//                 <div className={styles.menuItem}>
//                   <MenuBookOutlined className={styles.icon} />
//                   {!collapsed && <span>My Courses</span>}
//                 </div>
//               </li>
//               <li onClick={() => navigate('/allCourse')}>
//                 <div className={styles.menuItem}>
//                 <AssignmentOutlined className={styles.icon} />
//                 {!collapsed && <span>Assignment & Quizs</span>}
//                 </div>
//               </li>

              
//               <li onClick={() => navigate('/AllAccomplishments')}>
//                 <div className={styles.menuItem}>
//                 <EmojiEventsOutlined className={styles.icon} />
//                 {!collapsed && <span>Accomplishments</span>}
//                 </div>
//               </li>
//               <li onClick={() => navigate('/#')}>
//                 <div className={styles.menuItem}>
//                 <SettingsOutlined className={styles.icon} />
//                 {!collapsed && <span>Projects</span>}
//                 </div>
//               </li>
//               {/* <li onClick={() => navigate('/#')}>
//                 <div className={styles.menuItem}>
//                 <CloudDownloadOutlined className={styles.icon} />
//                 {!collapsed && <span>Downloaded</span>}
//                 </div>
//               </li> */}
//               <li onClick={handleItemClick}>
//                 <div className={styles.menuItem}>
//                   <SettingsOutlined className={styles.icon} />
//                   {!collapsed && <span>Settings</span>}
//                 </div>
//               </li>
//               <li onClick={() => navigate('/Contact')}>
//                 <div className={styles.menuItem}>
//                   <HelpOutlined className={styles.icon} />
//                   {!collapsed && <span>Support</span>}
//                 </div>
//               </li>
//             </ul>
//           </div>

//           {/* Logout Section */}
//           <div  className={styles.logout} onClick={() => {navigate('/login'); localStorage.removeItem("id")}}>
//             <ExitToAppOutlined className={styles.logoutIcon} />
//             {!collapsed && <span className={styles.logoutText}>Log Out</span>}
//           </div>
//           </div>
//         </div>
//       </div>

//       {/* Pass the collapsed state to HeaderDashboardPage */}
//       {/* <HeaderDashboardPage isCollapsed={collapsed} activeTab={activeTab} setActiveTab={setActiveTab} /> */}
//     </div>
//   );
// };



// export default SidebarDashboard;
import React, { useEffect, useState } from 'react';
import styles from './sideBarDashboard.module.css';
import {ExitToAppOutlined} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { GetUserDetails } from '../../services/Tasks/getTasks';
import lmsLogo from './lmsLogo.jpg';
import demo from './demo.jpeg';
import Base_URL from '../../const/const';
// import Accomplishments from './Images/Accomplishments.svg';
// import Dashboard from './Images/Dashboard.svg';
// import ExploreCourse from './Images/ExploreCourse.svg';
// import Logout from './Images/Logout.svg';
// import MyCourses from './Images/MyCourses.svg';
// import MyProfile from './Images/MyProfile.svg';
// import ToDos from './Images/ToDos.svg';
// import Support from './Images/Support.svg';

const SidebarDashboard = ({ headerPopupState, userDataChange, page }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [activeTab, setActiveTab] = useState(location.pathname); // Initialize with current path

  const handleItemClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  const [userData, setUserData] = useState({
    name: '',
    education: [],
    profileImg: ''
  });

  useEffect(() => {
    const UserID = localStorage.getItem("id");
  
    // Check if UserID exists in localStorage
    if (!UserID) {
      navigate("/login");
      return;
    }
  
    GetUserDetails(UserID)
      .then(response => {
        setUserData(response?.data?.data[0]);
      })
      .catch(error => {
        console.error("Error fetching user details:", error);
        navigate("/login");
      });
  }, [userDataChange, navigate]);
  

  const [profilePic, setProfilePic] = useState('');
  useEffect(() => {
    setProfilePic(userData?.profileImg?.length > 0 ? `${Base_URL}${userData.profileImg}` : demo);
  }, [userData]);

  // Update activeTab when location changes
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio * 100); // Initial zoom level

  useEffect(() => {
    const handleZoomChange = () => {
      const currentZoom = window.devicePixelRatio * 100;
      setZoomLevel(currentZoom);
      // console.log(`Zoom level: ${currentZoom}%`);
    };

    // Attach an event listener to detect zoom changes
    window.addEventListener('resize', handleZoomChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleZoomChange);
    };
  }, []);

  // useEffect(()=>{
  //   console.log(zoomLevel)
  // },[zoomLevel])

  return (
    <div className={styles.dashboardContainer} style={{ zIndex: headerPopupState ? '0' : '4', position: 'relative' }}>

  
    {/* Sidebar */}
      <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`} 
        style={{
          height: page === "profile" ? 
            zoomLevel > 60 && zoomLevel <= 95 ? '1575px' :
            zoomLevel > 95 && zoomLevel <= 125 ? '1500px' :
            zoomLevel > 125 && zoomLevel <= 140 ? '1600px' :
            zoomLevel > 140 && zoomLevel <= 155 ? '1650px' :
            zoomLevel > 155 && zoomLevel <= 175 ? '1700px' :
            "100vh" :
          page === "dashboard" ? 
            zoomLevel <= 40 ? '2500px' :
            zoomLevel > 40 && zoomLevel <= 108 ? '1920px' :
            zoomLevel > 108 && zoomLevel <= 125 ? '1950px' :
            zoomLevel > 125 && zoomLevel <= 140 ? '3300px' :
            zoomLevel > 140 && zoomLevel <= 155 ? '3300px' :
            zoomLevel > 155 && zoomLevel <= 175 ? '3720px' :
            "3750px" :
          page === "AllAccomplishments" ? 
            zoomLevel > 60 && zoomLevel <= 95 ? '1600px' :
            zoomLevel > 95 && zoomLevel <= 125 ? '1530px' :
            zoomLevel > 125 && zoomLevel <= 140 ? '1600px' :
            zoomLevel > 140 && zoomLevel <= 155 ? '1550px' :
            zoomLevel > 155 && zoomLevel <= 175 ? '1600px' :
            "100vh" :
          page === "OpenAccomplishments" ? 
            zoomLevel > 60 && zoomLevel <= 95 ? '1330px' :
            zoomLevel > 95 && zoomLevel <= 125 ? '1360px' :
            zoomLevel > 125 && zoomLevel <= 140 ? '1370px' :
            zoomLevel > 140 && zoomLevel <= 155 ? '1370px' :
            zoomLevel > 155 && zoomLevel <= 175 ? '1400px' :
            "100vh" :
          page === "Contact" ? 
            zoomLevel > 60 && zoomLevel <= 95 ? '1575px' :
            zoomLevel > 95 && zoomLevel <= 125 ? '1500px' :
            zoomLevel > 125 && zoomLevel <= 140 ? '1600px' :
            zoomLevel > 140 && zoomLevel <= 155 ? '1650px' :
            zoomLevel > 155 && zoomLevel <= 175 ? '1700px' :
            "100vh" :
          page === "Explore" ? 
            zoomLevel > 60 && zoomLevel <= 95 ? '1605px' :
            zoomLevel > 95 && zoomLevel <= 125 ? '1650px' :
            zoomLevel > 125 && zoomLevel <= 140 ? '3000px' :
            // zoomLevel > 140 && zoomLevel <= 155 ? '1650px' :
            // zoomLevel > 155 && zoomLevel <= 175 ? '1700px' :
            "3500px" :
          page === "MyCourses" ? 
            zoomLevel > 60 && zoomLevel <= 95 ? '1575px' :
            zoomLevel > 95 && zoomLevel <= 125 ? '1500px' :
            zoomLevel > 125 && zoomLevel <= 140 ? '1600px' :
            zoomLevel > 140 && zoomLevel <= 155 ? '1650px' :
            zoomLevel > 155 && zoomLevel <= 175 ? '1700px' :
            zoomLevel > 175 && zoomLevel <= 250 ? '3100px' :
            "100vh" :
            page === "courseDetails" ? 
            // zoomLevel > 60 && zoomLevel <= 95 ? '1275px' :
            // zoomLevel > 95 && zoomLevel <= 125 ? '1500px' :
            // zoomLevel > 125 && zoomLevel <= 140 ? '1600px' :
            // zoomLevel > 140 && zoomLevel <= 155 ? '1650px' :
            // zoomLevel > 155 && zoomLevel <= 175 ? '1700px' :
            // zoomLevel > 175 && zoomLevel <= 250 ? '3100px' :
            "100vh" :
          page === "toDoModule" ? 
            zoomLevel > 60 && zoomLevel <= 95 ? '1575px' :
            zoomLevel > 95 && zoomLevel <= 125 ? '1500px' :
            zoomLevel > 125 && zoomLevel <= 140 ? '1000px' :
            zoomLevel > 140 && zoomLevel <= 155 ? '1650px' :
            zoomLevel > 155 && zoomLevel <= 175 ? '1700px' :
            zoomLevel > 175 && zoomLevel <= 250 ? '3100px' :
            "100vh" :
          "1550px"
          }}
        >
        <div className={styles.navMenuContainer}>
          {/* Profile Section */}
          <div className={styles.profile} onClick={() => handleItemClick('/profile')}>
            <img src={profilePic} alt="User" className={styles.profilePic} />
            {!collapsed && (
              <div className={styles.profileInfo}>
                <h3>{userData?.name || '-'}</h3>
                <p>{userData?.education?.[0]?.courseNameValue || '-'}</p>
              </div>
            )}
          </div>

          {/* LMS Logo */}
          <div className={styles.logo}>
            <img src={lmsLogo} alt="LMS Logo" className={styles.logoImage} />
          </div>

          {/* Navigation Menu */}
          <div className={styles.commonMenuList}>
            <div className={styles.navMenu}>
              <ul>



              <li onClick={() => handleItemClick('/profile')}>
  <div className={`${styles.menuItem} ${activeTab === '/profile' ? styles.activeMenuItem : ''}`}>
      
    <svg
      className={styles.icon}
      style={{
        stroke: activeTab === '/profile' ? 'white' : 'black',
        fill: activeTab === '/profile' ? 'white' : 'none'  // Optional: sets fill to white when active
      }}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 18C4 16.9391 4.42143 15.9217 5.17157 15.1716C5.92172 14.4214 6.93913 14 8 14H16C17.0609 14 18.0783 14.4214 18.8284 15.1716C19.5786 15.9217 20 16.9391 20 18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18Z"
        strokeWidth="1.52"
        strokeLinejoin="round"
      />
      <path
        d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10Z"
        strokeWidth="1.52"
      />
    </svg>

    {!collapsed && <div>Profile</div>}
  </div>
</li>






              <li onClick={() => handleItemClick('/dashboard')}>
  <div className={`${styles.menuItem} ${activeTab === '/dashboard' ? styles.activeMenuItem : ''}`}>
    <svg
      className={styles.icon}
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ stroke: activeTab === '/dashboard' ? 'white' : 'black' }}
    >
      <path
        d="M4.12823 3.99851C5.73711 2.34366 6.54155 1.51624 7.52235 1.35406C7.83874 1.30703 8.16126 1.30703 8.47765 1.35406C9.45845 1.51624 10.2629 2.34366 11.8718 3.99851L13.4718 5.64422C14.1414 6.33295 14.4762 6.67732 14.6844 7.09474C14.4033 7.23284 14.8115 7.37606 14.8583 7.52311C15 7.96408 15 8.44787 15 9.40845V13.6828C15 14.9714 13.9553 16.0161 12.6667 16.0161V16.0161C11.378 16.0161 10.3333 14.9714 10.3333 13.6828V12.7494C10.3333 11.4608 9.28866 10.4161 8 10.4161V10.4161C6.71134 10.4161 5.66667 11.4608 5.66667 12.7494V13.6828C5.66667 14.9714 4.622 16.0161 3.33333 16.0161V16.0161C2.04467 16.0161 1 14.9714 1 13.6828V9.40845C1 8.44787 1 7.96408 1.14165 7.52311C1.18852 7.37606 1.24666 7.23284 1.31557 7.09474C1.52383 6.67732 1.85863 6.33295 2.52823 5.64422L4.12823 3.99851Z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>

    {!collapsed && <div>Dashboard</div>}
  </div>
</li>

<li onClick={() => handleItemClick('/exploreCourses')}>
  <div className={`${styles.menuItem} ${activeTab === '/exploreCourses' ? styles.activeMenuItem : ''}`}>
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ stroke: activeTab === '/exploreCourses' ? 'white' : 'black' }}
      className={styles.icon}
    >
      <path
        d="M8.23813 4.60851V4.60851C7.38778 4.60851 6.9626 4.60851 6.60684 4.66486C4.6485 4.94003 3.11261 6.51092 2.40244 8.46926C2.74609 8.82502 2.74609 9.25019 2.74609 10.1005V11.9312C2.74609 14.4944 2.74609 15.776 3.24492 16.405C3.68371 17.6162 4.38385 18.3163 5.24501 18.4051C6.22402 19.2539 7.50562 19.2539 10.0688 19.2539H11.8995C14.4627 19.2539 15.7443 19.2539 16.7233 18.4051C17.5844 18.3163 18.2846 17.6162 18.7234 16.405C19.2222 15.776 19.2222 14.4944 19.2222 11.9312V10.1005C19.2222 9.25019 19.2222 8.82502 19.1659 8.46926C18.8557 6.51092 17.3198 4.94003 15.3615 4.66486C15.0057 4.60851 14.5405 4.60851 13.7302 4.60851V4.60851M8.23813 4.60851V5.98152M8.23813 4.60851V2.77783M8.23813 4.60851H13.7302M13.7302 4.60851V2.77783M13.7302 4.60851V5.98152M10.9842 15.5926V9.18521M6.86512 15.5926V9.18521M15.1032 15.5926V9.18521"
        strokeWidth="1.37301"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {!collapsed && <div>Explore Courses</div>}
  </div>
</li>

<li onClick={() => handleItemClick('/myCourses')}>
  <div className={`${styles.menuItem} ${activeTab === '/myCourses' ? styles.activeMenuItem : ''}`}>
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.icon}
      style={{ stroke: activeTab === '/myCourses' ? 'white' : 'black' }}
    >
      <path
        d="M17.898 15H5.898C4.968 15 4.503 15 4.121 15.102C3.61231 15.2384 3.14849 15.5063 2.77618 15.8788C2.40386 16.2513 2.13616 16.7152 2 17.224"
        strokeWidth="1.5"
      />
      <path
        d="M6 6H14M6 9.5H11M17.5 18H6M8 21C5.172 21 3.407 21 2.879 20.121C2 19.243 2 17.828 2 15V7C2 4.172 2 2.407 2.879 1.879C3.407 1 5.172 1 8 1H12C14.828 1 16.243 1 17.121 1.879C18 2.407 18 4.172 18 7M12 21C14.828 21 16.243 21 17.121 20.121C18 19.243 18 17.828 18 15V11"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>

    {!collapsed && <div>My Courses</div>}
  </div>
</li>



<li onClick={() => handleItemClick('/AllAccomplishments')}>
  <div className={`${styles.menuItem} ${activeTab === '/AllAccomplishments' ? styles.activeMenuItem : ''}`}>
    <svg
      style={{ stroke: activeTab === '/AllAccomplishments' ? 'white' : 'black' }}
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.icon}

    >
      <path
        d="M16.178 6.52612V12.5995C16.178 13.2415 16.178 13.5625 16.059 13.8434C16.0198 13.9358 15.9715 14.0241 15.9147 14.1069C15.7422 14.3585 15.4717 14.5314 14.9309 14.8773L11.4684 17.0913C10.8415 17.4921 10.528 17.6926 10.1825 17.732C10.0692 17.745 9.95474 17.745 9.84142 17.732C9.49585 17.6926 9.1824 17.4921 8.55551 17.0913L5.09302 14.8773C4.55215 14.5314 4.28172 14.3585 4.10918 14.1069C4.0524 14.0241 4.00406 13.9358 3.96489 13.8434C3.84588 13.5625 3.84588 13.2415 3.84588 12.5995V6.52612M19.0239 5.14835L11.1424 1.52038C10.6489 1.29322 10.4022 1.17964 10.1414 1.15708C10.0552 1.14963 9.96864 1.14963 9.88251 1.15708C9.6217 1.17964 9.37495 1.29322 8.88146 1.52038L1 5.14835L8.83387 8.94094C9.34726 9.18948 9.60395 9.31376 9.87669 9.33842C9.96668 9.34655 10.0572 9.34655 10.1472 9.33842C10.4199 9.31340 10.6766 9.18948 11.19 8.94094L19.0239 5.14835ZM19.0239 5.14835V14.4178C19.0239 15.0062 19.0239 15.3004 18.9217 15.563C18.8881 15.6496 18.8464 15.7329 18.7973 15.8118C18.6485 16.0511 18.4132 16.2276 17.9425 16.5406L16.7709 17.4593"
        strokeWidth="1.50199"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    {!collapsed && <div>Accomplishments</div>}
  </div>
</li>

<li onClick={() => handleItemClick('/toDoModule')}>
{/* onClick={() => handleItemClick('/todo')} */}
  <div className={`${styles.menuItem} ${activeTab === '/toDoModule' ? styles.activeMenuItem : ''}`}>
    <svg
      style={{ stroke: activeTab === '/toDoModule' ? 'white' : 'black' }}
      className={styles.icon}
      width="21"
      height="19"
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.4074 5.56742H13.6111M7.20369 9.22878H13.6111M7.20369 12.8901H13.6111M8.94283 17.4668H11.8719C13.9313 17.4668 14.961 17.4668 15.6828 16.9424C15.9159 16.773 16.1209 16.568 16.2903 16.3349C16.8148 15.6131 16.8148 14.5834 16.8148 12.524V5.93356C16.8148 3.87419 16.8148 2.84451 16.2903 2.12267C16.1209 1.88955 15.9159 1.68454 15.6828 1.51517C14.961 0.990723 13.9313 0.990723 11.8719 0.990723H8.94283C6.88347 0.990723 5.85378 0.990723 5.13195 1.51517C4.89883 1.68454 4.69382 1.88955 4.52444 2.12267C4 2.84451 4 3.87419 4 5.93356V12.524C4 14.5834 4 15.6131 4.52444 16.3349C4.69382 16.568 4.89883 16.773 5.13195 16.9424C5.85378 17.4668 6.88347 17.4668 8.94283 17.4668Z"
        strokeWidth="1.37301"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    {!collapsed && <div>To Dos</div>}
  </div>
</li>

                {/* <li onClick={() => handleItemClick('/settings')}>
                  <div className={`${styles.menuItem} ${activeTab === '/settings' ? styles.activeMenuItem : ''}`}>
                    <SettingsOutlined className={styles.icon} />
                    {!collapsed && <div>Settings</div>}
                  </div>
                </li> */}
<li onClick={() => handleItemClick('/Contact')}>
  <div className={`${styles.menuItem} ${activeTab === '/Contact' ? styles.activeMenuItem : ''}`}>
    
    <svg
      style={{
        stroke: activeTab === '/Contact' ? 'white' : 'black',
        fill: activeTab === '/Contact' ? 'white' : 'black',
      }}
      className={`${styles.icon} ${styles.support}`}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0.466797C4.486 0.466797 0 4.9528 0 10.4668V14.6098C0 15.6338 0.897 16.4668 2 16.4668H3C3.26522 16.4668 3.51957 16.3614 3.70711 16.1739C3.89464 15.9864 4 15.732 4 15.4668V10.3238C4 10.0586 3.89464 9.40423 3.70711 9.61669C3.51957 9.42915 3.26522 9.3238 3 9.3238H2.092C2.648 5.4538 5.978 2.4668 10 2.4668C14.022 2.4668 17.352 5.4538 17.908 9.3238H17C16.7348 9.3238 16.4404 9.42915 16.2929 9.61669C16.1054 9.40423 16 10.0586 16 10.3238V16.4668C16 17.5698 15.103 18.4668 14 18.4668H12V17.4668H8V20.4668H14C16.206 20.4668 18 18.6728 18 16.4668C19.103 16.4668 20 15.6338 20 14.6098V10.4668C20 4.9528 15.514 0.466797 10 0.466797Z"
      />
    </svg>

    {!collapsed && <div>Support</div>}
  </div>
</li>

              </ul>
            </div>

           

            <div  className={styles.logout} onClick={() => {navigate('/login'); localStorage.clear()}}>
             <ExitToAppOutlined className={styles.logoutIcon} />
             {!collapsed && <span className={styles.logoutText}>Log Out</span>}
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;
