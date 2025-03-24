
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SidebarDashboard from '../../../Common Components/SideBar Dashboard/sideBarDashboard';
// import styles from './allCourse.module.css';
// import PaginationComponent from '../../../Common Components/Pagination Component/paginationComponent';
// import GoToCourseCard from '../../../Common Components/Course Cards Component/Go To Course Card/goToCourseCard';
// import StartCourseCard from '../../../Common Components/Course Cards Component/Start Course Card/startCourseCard';
// import ProgressCourseCard from '../../../Common Components/Course Cards Component/Progress Course Card/progressCourseCard';
// import HeaderDashboardPage from '../../../Common Components/Header Dashboard Page/headerDashboardPage';
// import FilterResultLayout from '../../FilterResultLayout/FilterResultLayout';
// import Base_URL from '../../../const/const';
// import LoadingSpinner from '../../../Common Components/Loader/Loader';

// const AllCourse = () => {
//   const [loadingState, setLoadingState] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 6;
//   // const [activeTab, setActiveTab] = useState(0);
//   const [activeTab, setActiveTab] = useState(() => {
//     const savedTab = localStorage.getItem('activeTab');
//     return savedTab !== null ? parseInt(savedTab, 10) : 0;
//   });
//   const [goToCourses, setGoToCourses] = useState([]);
//   const [startCourses, setStartCourses] = useState([]);
//   const [progressCourses, setProgressCourses] = useState([]);
//   const [progressMap, setProgressMap] = useState({});
  // const [mostRecentFilter, setMostRecentFilter] = useState(true);
  // const [filterValue, setFilterValue] = useState(localStorage.getItem('FilterValue'));

//   const id = localStorage.getItem('id');


//   useEffect(() => {
//     localStorage.setItem('activeTab', activeTab);
//   }, [activeTab]);
  
//   // Reset current page whenever the active tab changes
// useEffect(() => {
//   setCurrentPage(1);
// }, [activeTab]);

// useEffect(() => {
//   if (id) {
//     setLoadingState(true)
//     axios.get(`${Base_URL}/api/goToCourses/${id}/courses`)
//       .then((response) => {
//         const filteredCourses = response.data.filter(course => {
//           const [completed, total] = course.lessons.split('/').map(Number);
//           return completed === total;
//         });
//         setGoToCourses(filteredCourses);

//         const goToCourseIds = filteredCourses.map(course => course.id);
//         localStorage.setItem('goToCourseIds', JSON.stringify(goToCourseIds));
//       });

//     axios.get(`${Base_URL}/api/startCourses/user/${id}/courses`)
//       .then((response) => {
//         const filteredCourses = response.data.filter(
//           course => course.lessons.startsWith('0/') && course.status !== 'progress'
//         );
//         setStartCourses(filteredCourses);

//         const startCourseIds = filteredCourses.map(course => course.id);
//         localStorage.setItem('startCourseIds', JSON.stringify(startCourseIds));
//       });

//     axios.get(`${Base_URL}/api/progressCourse/${id}/course`)
//       .then((response) => {
//         setProgressCourses(response.data);
//         setLoadingState(false)
//         const progressCourseIds = response.data.map(course => course.id);
//         localStorage.setItem('progressCourseIds', JSON.stringify(progressCourseIds));
//       });
//   }
// }, [id]);

//   // Sort courses based on FilterValue
//   const filterCourses = () => {
//     let allCourses = [...goToCourses, ...startCourses, ...progressCourses];

//     if (filterValue === "Most Recent") {
//       // Sort by course.id in ascending order
//       allCourses = allCourses.sort((a, b) => a.id - b.id);
//     } else if (filterValue === "Oldest") {
//       // Sort by course.id in descending order
//       allCourses = allCourses.sort((a, b) => b.id - a.id);
//     }

//     switch (activeTab) {
//       case 1:
//         // setCurrentPage(1)
//         return progressCourses;
//       case 2:
//         // setCurrentPage(1)
//         return goToCourses;
//       default:
//         // setCurrentPage(1)
//         return allCourses;
//     }
//   };

//   const allCourses = filterCourses();
//   const totalCourses = allCourses.length;
//   const totalPages = Math.ceil(totalCourses / cardsPerPage);
//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCourses = allCourses.slice(indexOfFirstCard, indexOfLastCard);

//   const displayedCourses = currentCourses;

//   const handleStartCourse = async (courseId) => {
//     const userId = localStorage.getItem('id');
//     if (userId && courseId) {
//       try {
//         const response = await axios.put(`${Base_URL}/api/startCourses/user/${userId}/course/${courseId}/progress`);
//         const updatedCourses = response.data.profile.continueWatching;
//         setStartCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
//         const courseToAdd = updatedCourses.find(continueWatching => continueWatching.id === courseId);
//         setProgressCourses(prevCourses => [...prevCourses, courseToAdd]);
//         await axios.post(`${Base_URL}/api/update/inprogresscourses/${userId}`, { newCourses: updatedCourses }, {
//           headers: { 'Content-Type': 'application/json' }
//         });
//       } catch (error) {
//         console.error('Error updating course status', error);
//       }
//     }
//   };

//   return (
//     loadingState ?  
//       <div style={{zIndex:'300000'}}>
//         <LoadingSpinner />
//       </div>
//     :
//     <div className={styles.container} style={{ display: 'flex' }}>
//       <SidebarDashboard page={"MyCourses"}/>
  
//       <div className={styles.contentContainer}>
//         <HeaderDashboardPage setActiveTab={setActiveTab} activeTab={activeTab} />
  
//         <div className={styles.mainContainer}>
          // <div className={styles.allCoursesContainer}>
            // <FilterResultLayout
            //   filterValue={filterValue}
            //   setFilterValue={setFilterValue}
            //   mostRecentFilter={mostRecentFilter}
            //   setMostRecentFilter={setMostRecentFilter}
            //   setCurrentPage={setCurrentPage}
            //   coursesNumber={displayedCourses.length}
            //   totalCourse={totalCourses}
            // />
  
//             <div className={styles.courseGrid}>
//               {totalCourses === 0 ? (
//                 <div className={styles.noCoursesMessage}>
//                 Enroll now and start learning today! 
//                 </div>
//               ) : (
//                 displayedCourses.map((course, index) => {
//                   if (goToCourses.includes(course)) {
//                     return <GoToCourseCard key={index} course={course} />;
//                   } else if (startCourses.includes(course)) {
//                     return (
//                       <StartCourseCard
//                         key={index}
//                         course={course}
//                         onStartCourse={handleStartCourse}
//                         progress={progressMap[course.id] || 0}
//                       />
//                     );
//                   } else {
//                     return <ProgressCourseCard key={index} course={course} />;
//                   }
//                 })
//               )}
//             </div>
  
//             {totalPages > 1 && (
//               <div className={styles.pagination}>
//                 <PaginationComponent
//                   currentPage={currentPage}
//                   setCurrentPage={setCurrentPage}
//                   totalPages={totalPages}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
//   }    

// export default AllCourse;




























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SidebarDashboard from '../../../Common Components/SideBar Dashboard/sideBarDashboard';
// import styles from './allCourse.module.css';
// import PaginationComponent from '../../../Common Components/Pagination Component/paginationComponent';
// import GoToCourseCard from '../../../Common Components/Course Cards Component/Go To Course Card/goToCourseCard';
// import StartCourseCard from '../../../Common Components/Course Cards Component/Start Course Card/startCourseCard';
// import ProgressCourseCard from '../../../Common Components/Course Cards Component/Progress Course Card/progressCourseCard';
// import HeaderDashboardPage from '../../../Common Components/Header Dashboard Page/headerDashboardPage';
// import FilterResultLayout from '../../FilterResultLayout/FilterResultLayout';
// import Base_URL from '../../../const/const';
// import LoadingSpinner from '../../../Common Components/Loader/Loader';
// import NoDataFound from '../../../Common Components/No Data Found/noDataFound';

// const AllCourse = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [loadingState, setLoadingState] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 6;
//   const [activeTab, setActiveTab] = useState(() => {
//     const savedTab = localStorage.getItem('activeTab');
//     return savedTab !== null ? parseInt(savedTab, 10) : 0;
//   });
//   const [goToCourses, setGoToCourses] = useState([]);
//   const [startCourses, setStartCourses] = useState([]);
//   const [progressCourses, setProgressCourses] = useState([]);
//   const [filterValue, setFilterValue] = useState(localStorage.getItem('FilterValue') || '');
//   const [displayedCourses, setDisplayedCourses] = useState([]);
//   const [mostRecentFilter, setMostRecentFilter] = useState(true);

//   const id = localStorage.getItem('id');

//   // Save the active tab in localStorage
//   useEffect(() => {
//     localStorage.setItem('activeTab', activeTab);
//   }, [activeTab]);

//   // Fetch courses data
//   useEffect(() => {
//     if (id) {
//       setLoadingState(true);
//       const fetchCourses = async () => {
//         try {
//           const [goToRes, startRes, progressRes] = await Promise.all([
//             axios.get(`${Base_URL}/api/goToCourses/${id}/courses`),
//             axios.get(`${Base_URL}/api/startCourses/user/${id}/courses`),
//             axios.get(`${Base_URL}/api/progressCourse/${id}/course`)
//           ]);
//           console.log(goToRes)
//           setGoToCourses(goToRes.data.filter(course => {
//             const [completed, total] = course.lessons.split('/').map(Number);
//             return completed === total;
//           }));
//           setStartCourses(startRes.data.filter(
//             course => course.lessons.startsWith('0/') && course.status !== 'progress'
//           ));
//           setProgressCourses(progressRes.data);
//         } catch (error) {
//           console.error('Error fetching courses:', error);
//         } finally {
//           setLoadingState(false);
//         }
//       };
//       fetchCourses();
//     }
//   }, [id]);

//   useEffect(() => {
//     setCurrentPage(1); // Reset to the first page whenever the active tab changes
//   }, [activeTab]);
  

//   // Filter and sort courses
//   useEffect(() => {
//     const filterCourses = () => {
//       let filteredCourses = [];
//       switch (activeTab) {
//         case 1:
//           filteredCourses = [...progressCourses];
//           break;
//         case 2:
//           filteredCourses = [...goToCourses];
//           break;
//         default:
//           filteredCourses = [...goToCourses, ...startCourses, ...progressCourses];
//           break;
//       }

//       if (filterValue === 'Most Recent') {
//         filteredCourses.sort((a, b) => b.id - a.id);
//       } else if (filterValue === 'Oldest') {
//         filteredCourses.sort((a, b) => a.id - b.id);
//       }

//       return filteredCourses.filter(course =>
//         course.title.toLowerCase().includes(searchValue.toLowerCase())
//       );
//     };

//     setDisplayedCourses(filterCourses());
//   }, [activeTab, filterValue, goToCourses, startCourses, progressCourses, searchValue]);

//   const totalCourses = displayedCourses.length;
//   const totalPages = Math.ceil(totalCourses / cardsPerPage);
//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCourses = displayedCourses.slice(indexOfFirstCard, indexOfLastCard);

//   // // Handle course actions
//   // const handleStartCourse = async (courseId) => {
//   //   const userId = localStorage.getItem('id');
//   //   if (userId && courseId) {
//   //     try {
//   //       const response = await axios.put(
//   //         `${Base_URL}/api/startCourses/user/${userId}/course/${courseId}/progress`
//   //       );
//   //       setStartCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
//   //       setProgressCourses(prevCourses => [...prevCourses, response.data]);
//   //     } catch (error) {
//   //       console.error('Error updating course status:', error);
//   //     }
//   //   }
//   // };




//   const handleStartCourse = async (courseId) => {
//     const userId = localStorage.getItem('id');
//     if (userId && courseId) {
//       try {
//         // Send a request to start the course
//         const response = await axios.put(
//           `${Base_URL}/api/startCourses/user/${userId}/course/${courseId}/progress`
//         );
  
//         const updatedCourse = response.data; // The updated course data
//         // Update the state: remove from startCourses and add to progressCourses
//         setStartCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
//         setProgressCourses(prevCourses => [...prevCourses, updatedCourse]);
  
//         // Optional: Automatically switch to the "Active Courses" tab after starting
//         setActiveTab(1);
//       } catch (error) {
//         console.error('Error starting the course:', error);
//       }
//     }
//   };

  






//   return loadingState ? (
//     <div style={{ zIndex: '300000' }}>
//       <LoadingSpinner />
//     </div>
//   ) : (
//     <div className={styles.container} style={{ display: 'flex' }}>
//       <SidebarDashboard page="MyCourses" />
//       <div className={styles.contentContainer}>
//         <HeaderDashboardPage
//           pageText={"My Courses"}
//           on_change={e => setSearchValue(e.target.value)}
//           setActiveTab={setActiveTab}
//           activeTab={activeTab}
//           searchValue={searchValue}
//           AppBarText={"Your Success Path Begins Here."}
//         />
//         <div className={styles.mainContainer}>
//         <div className={styles.allCoursesContainer}>
          
//         <FilterResultLayout
//               filterValue={filterValue}
//               setFilterValue={setFilterValue}
//               mostRecentFilter={mostRecentFilter}
//               setMostRecentFilter={setMostRecentFilter}
//               setCurrentPage={setCurrentPage}
//               coursesNumber={displayedCourses.length}
//               totalCourse={totalCourses}
//             />
//  <div className={styles.courseGrid}>
//   {currentCourses.length === 0 ? (
//     <div className={styles.noDataContainer}>
//       <NoDataFound size="Full" message="No courses found! Please enroll in a course." />
//     </div>
//   ) : (
//     currentCourses.map(course =>
//       goToCourses.includes(course) ? (
//         <GoToCourseCard key={course.id} course={course} />
//       ) : startCourses.includes(course) ? (
//         <StartCourseCard
//           key={course.id}
//           course={course}
//           onStartCourse={handleStartCourse}
//         />
//       ) : (
//         <ProgressCourseCard key={course.id} course={course} />
//       )
//     )
//   )}
// </div>

//           {totalPages > 1 && (
//             <div className={styles.pagination}>
//               <PaginationComponent
//                 currentPage={currentPage}
//                 setCurrentPage={setCurrentPage}
//                 totalPages={totalPages}
//               />
//             </div>
//           )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllCourse















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarDashboard from '../../../Common Components/SideBar Dashboard/sideBarDashboard';
import styles from './allCourse.module.css';
import PaginationComponent from '../../../Common Components/Pagination Component/paginationComponent';
import GoToCourseCard from '../../../Common Components/Course Cards Component/Go To Course Card/goToCourseCard';
import StartCourseCard from '../../../Common Components/Course Cards Component/Start Course Card/startCourseCard';
import ProgressCourseCard from '../../../Common Components/Course Cards Component/Progress Course Card/progressCourseCard';
import HeaderDashboardPage from '../../../Common Components/Header Dashboard Page/headerDashboardPage';
import FilterResultLayout from '../../FilterResultLayout/FilterResultLayout';
import Base_URL from '../../../const/const';
import LoadingSpinner from '../../../Common Components/Loader/Loader';
import NoDataFound from '../../../Common Components/No Data Found/noDataFound';

const AllCourse = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab !== null ? parseInt(savedTab, 10) : 0;
  });
  const [goToCourses, setGoToCourses] = useState([]);
  const [startCourses, setStartCourses] = useState([]);
  const [progressCourses, setProgressCourses] = useState([]);
  const [filterValue, setFilterValue] = useState(localStorage.getItem('FilterValue') || '');
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [mostRecentFilter, setMostRecentFilter] = useState(true);

  const id = localStorage.getItem('id');

  // Save the active tab in localStorage
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  // Fetch courses data
  useEffect(() => {
    if (id) {
      setLoadingState(true);
      const fetchCourses = async () => {
        try {
          const [goToRes, startRes, progressRes] = await Promise.all([
            axios.get(`${Base_URL}/api/goToCourses/${id}/courses`),
            axios.get(`${Base_URL}/api/startCourses/user/${id}/courses`),
            axios.get(`${Base_URL}/api/progressCourse/${id}/course`)
          ]);

          setGoToCourses(
            goToRes.data.filter(course => {
              const [completed, total] = course.lessons.split('/').map(Number);
              return completed === total;
            })
          );
          setStartCourses(
            startRes.data.filter(
              course => course.lessons.startsWith('0/') && course.status !== 'progress'
            )
          );
          setProgressCourses(progressRes.data);
        } catch (error) {
          console.error('Error fetching courses:', error);
        } finally {
          setLoadingState(false);
        }
      };
      fetchCourses();
    }
  }, [id]);

  // Reset the page when activeTab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Filter and sort courses
  useEffect(() => {
    const filterCourses = () => {
      let filteredCourses = [];
      switch (activeTab) {
        case 1:
          filteredCourses = [...progressCourses];
          break;
        case 2:
          filteredCourses = [...goToCourses];
          break;
        default:
          filteredCourses = [...goToCourses, ...startCourses, ...progressCourses];
          break;
      }

      if (filterValue === 'Most Recent') {
        filteredCourses.sort((a, b) => b.id - a.id);
      } else if (filterValue === 'Oldest') {
        filteredCourses.sort((a, b) => a.id - b.id);
      }

      return filteredCourses.filter(course =>
        course.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    };

    setDisplayedCourses(filterCourses());
  }, [activeTab, filterValue, goToCourses, startCourses, progressCourses, searchValue]);

  const totalCourses = displayedCourses.length;
  const totalPages = Math.ceil(totalCourses / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCourses = displayedCourses.slice(indexOfFirstCard, indexOfLastCard);

  // Handle course actions
  const handleStartCourse = async (courseId) => {
    const userId = localStorage.getItem('id');
    if (userId && courseId) {
      try {
        const response = await axios.put(
          `${Base_URL}/api/startCourses/user/${userId}/course/${courseId}/progress`
        );

        const updatedCourse = response.data;
        setStartCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
        setProgressCourses(prevCourses => [...prevCourses, updatedCourse]);

        setActiveTab(1); // Optional: Switch to the Active Courses tab
      } catch (error) {
        console.error('Error starting the course:', error);
      }
    }
  };

  return loadingState ? (
    <div style={{ zIndex: '300000' }}>
      <LoadingSpinner />
    </div>
  ) : (
    <div className={styles.container} style={{ display: 'flex' }}>
      <SidebarDashboard page="MyCourses" />
      <div className={styles.contentContainer}>
        <HeaderDashboardPage
          pageText="My Courses"
          on_change={e => setSearchValue(e.target.value)}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          searchValue={searchValue}
          AppBarText="Your Success Path Begins Here."
        />
        <div className={styles.mainContainer}>
          <div className={styles.allCoursesContainer}>
            <FilterResultLayout
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              mostRecentFilter={mostRecentFilter}
              setMostRecentFilter={setMostRecentFilter}
              setCurrentPage={setCurrentPage}
              coursesNumber={displayedCourses.length}
              totalCourse={totalCourses}
            />
            <div className={styles.courseGrid}>
              {currentCourses.length === 0 ? (
                <div className={styles.noDataContainer}>
                  <NoDataFound size="Full" message="No courses found! Please enroll in a course." />
                </div>
              ) : (
                currentCourses.map(course =>
                  goToCourses.includes(course) ? (
                    <GoToCourseCard key={course.id} course={course} />
                  ) : startCourses.includes(course) ? (
                    <StartCourseCard
                      key={course.id}
                      course={course}
                      onStartCourse={handleStartCourse}
                    />
                  ) : (
                    <ProgressCourseCard key={course.id} course={course} />
                  )
                )
              )}
            </div>
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <PaginationComponent
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourse;
