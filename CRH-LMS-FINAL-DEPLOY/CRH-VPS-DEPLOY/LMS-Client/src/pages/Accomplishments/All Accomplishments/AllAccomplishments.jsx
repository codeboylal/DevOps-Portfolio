// import React, { useEffect, useState } from "react";
// import styles from "./AllAccomplishments.module.css";
// import ClosedCard from "../../../components/container/Accomplishments/Closed Card/ClosedCard";
// import FilterResultLayout from "../../../components/FilterResultLayout/FilterResultLayout";
// import { GetUserDetails } from "../../../services/Tasks/getTasks";
// import PaginationComponent from "../../../Common Components/Pagination Component/paginationComponent";
// import {useNavigate} from "react-router-dom";
// import LoadingSpinner from "../../../Common Components/Loader/Loader";
// import SidebarDashboard from "../../../Common Components/SideBar Dashboard/sideBarDashboard";
// import HeaderDashboardPage from "../../../Common Components/Header Dashboard Page/headerDashboardPage";

// const AllAccomplishments = () => {
//   const navigate = useNavigate();

//   const [UserId, setUserId] = useState(null);
//   const [continueWatchingCourses, setContinueWatchingCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [currentCourses, setCurrentCourses] = useState([]);
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const coursesPerPage = 8;
//   const [totalPages, setTotalPages] = useState(1);

  
//   useEffect(() => {
//     try {
//       const userId = localStorage.getItem("id");
//       setUserId(userId);
//     } catch {
//       console.log("No user found in local storage");
//     }
//   }, []);

  
//   useEffect(() => {
//     if (UserId) {
//       GetUserDetails(UserId).then((response) => {
//         setContinueWatchingCourses(response?.data?.data[0]?.continueWatching || []);
//       });
//     }
//   }, [UserId]);


//   useEffect(() => {
//     const completedCourses = continueWatchingCourses.filter((course) => course.progress === 100);
//     setFilteredCourses(completedCourses);
//     setTotalPages(Math.ceil(completedCourses.length / coursesPerPage));
//     setCurrentPage(1); 
//   }, [continueWatchingCourses]);


//   useEffect(() => {
//     const lastCourseIndex = currentPage * coursesPerPage;
//     const firstCourseIndex = lastCourseIndex - coursesPerPage;
//     setCurrentCourses(filteredCourses.slice(firstCourseIndex, lastCourseIndex));
//   }, [filteredCourses, currentPage]);


//   const OpenAccomplishment = (courseId, continueWatchingID) =>{
//     localStorage.setItem("AccomplishmentCourseID",courseId)
//     localStorage.setItem("continueWatchingCourseID",continueWatchingID)

//     navigate("/OpenAccomplishments")
//     // console.log(id)
//   }

//   return (
//     <div className={styles.container} style={{ display: 'flex' }}>
//       <SidebarDashboard />
//       <div className={styles.contentContainer}>
//         <HeaderDashboardPage />
//         <div className={styles.mainDiv}>
//         {continueWatchingCourses?.length > 0 ?
//           <div
//             style={{
//               width: "1240px",
//               padding: "24px",
//               flexDirection: "column",
//               display: currentCourses?.length === 0 ? 'none' : 'flex',
//               alignItems: currentCourses?.length === 0 ? 'flex-start' :"center",
//               gap: "24px",
              
//             }}
//           >
//             <br />
//             <FilterResultLayout page={"accomplishments"} coursesNumber={currentCourses.length} totalCourse={filteredCourses.length} />
//             {currentCourses.map((item, index) => (
//               <div key={index} style={{ width: "100%"}} onClick={()=> OpenAccomplishment(item.courseID, item.id)}>
//                 <ClosedCard title={item?.title} image={item?.image} grade={item?.Grade} company={item?.company} onclick={()=>{localStorage.setItem("DownloadCertificate",true)}} />
//               </div>
//             ))}
//             <div>
//               <PaginationComponent 
//                 currentPage={currentPage}
//                 setCurrentPage={setCurrentPage}
//                 totalPages={totalPages}
//               />
//             </div>
//             <br />
//           </div>
//           :
//             <div>
//               <LoadingSpinner />
//             </div>
//           }
//       </div>
//       </div>
//     </div>
//   );
// };

// export default AllAccomplishments;


import React, { useEffect, useState } from "react";
import styles from "./AllAccomplishments.module.css";
import ClosedCard from "../../../components/container/Accomplishments/Closed Card/ClosedCard";
import FilterResultLayout from "../../../components/FilterResultLayout/FilterResultLayout";
import { GetUserDetails } from "../../../services/Tasks/getTasks";
import PaginationComponent from "../../../Common Components/Pagination Component/paginationComponent";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../../../Common Components/Loader/Loader";
import SidebarDashboard from "../../../Common Components/SideBar Dashboard/sideBarDashboard";
import HeaderDashboardPage from "../../../Common Components/Header Dashboard Page/headerDashboardPage";

const AllAccomplishments = () => {
  const navigate = useNavigate();

  const [UserId, setUserId] = useState(null);
  const [continueWatchingCourses, setContinueWatchingCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state added

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    try {
      const userId = localStorage.getItem("id");
      setUserId(userId);
    } catch {
      console.log("No user found in local storage");
    }
  }, []);

  useEffect(() => {
    if (UserId) {
      GetUserDetails(UserId).then((response) => {
        const courses = response?.data?.data[0]?.continueWatching || [];
        // console.log(courses?.length)
        setContinueWatchingCourses(courses);
        setLoading(false); // Stop loading once data is received
      });
    }
  }, [UserId]);

  useEffect(() => {
    const completedCourses = continueWatchingCourses.filter((course) => course.progress === 100);
    setFilteredCourses(completedCourses);
    setTotalPages(Math.ceil(completedCourses.length / coursesPerPage));
    setCurrentPage(1); 
  }, [continueWatchingCourses]);

  useEffect(() => {
    const lastCourseIndex = currentPage * coursesPerPage;
    const firstCourseIndex = lastCourseIndex - coursesPerPage;
    setCurrentCourses(filteredCourses.slice(firstCourseIndex, lastCourseIndex));
  }, [filteredCourses, currentPage]);

  const OpenAccomplishment = (courseId, continueWatchingID) => {
    localStorage.setItem("AccomplishmentCourseID", courseId);
    localStorage.setItem("continueWatchingCourseID", continueWatchingID);
    navigate("/OpenAccomplishments");
  };

  return (
    <div className={styles.container}>
      <SidebarDashboard page={"AllAccomplishments"} />
      <div className={styles.contentContainer}>
        <HeaderDashboardPage 
        pageText={"Accomplishments"}
        AppBarText={"Turning Asspirants into remarable achievements."}/>
        <div className={styles.mainDiv}>
          {loading ? (
            <LoadingSpinner />
          ) : continueWatchingCourses.length > 0 ? (
            <div className={`${styles.coursesContainer} ${currentCourses.length === 0 ? styles.hidden : ''}`}>
              <br />
              <FilterResultLayout page="accomplishments" coursesNumber={currentCourses.length} totalCourse={filteredCourses.length} />
              {currentCourses.map((item, index) => (
                <div key={index} className={styles.courseCard} onClick={() => OpenAccomplishment(item?.courseID || item?.courseId, item.id)}>
                  <ClosedCard title={item?.title} image={item?.image} grade={item?.Grade} company={item?.company} onclick={() => { localStorage.setItem("DownloadCertificate", true); }} />
                </div>
              ))}
              
              <div style={{display: currentCourses.length < 9 && "none"}}>
                <PaginationComponent 
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
              <br />

            </div>
            
          ) : (
            <div className={styles.noEnrollments} style={{zIndex:'9999999'}}>
              You have not enrolled in any course
            </div>
          )}
          {continueWatchingCourses.length > 0  && (
              <div className={styles.noCourses} style={{zIndex:'9999999', display: currentCourses.length > 0 && "none"}}>You have not completed any course</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AllAccomplishments;
