
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarDashboard from '../../../Common Components/SideBar Dashboard/sideBarDashboard';
import styles from './activeCourses.module.css';
import PaginationComponent from '../../../Common Components/Pagination Component/paginationComponent';
import GoToCourseCard from '../../../Common Components/Course Cards Component/Go To Course Card/goToCourseCard';
import StartCourseCard from '../../../Common Components/Course Cards Component/Start Course Card/startCourseCard';
import ProgressCourseCard from '../../../Common Components/Course Cards Component/Progress Course Card/progressCourseCard';
import FilterResultLayout from '../../FilterResultLayout/FilterResultLayout'
import Base_URL from '../../../const/const';
const ActiveCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6; // Display 6 cards at a time

  const [goToCourses, setGoToCourses] = useState([]);
  const [startCourses, setStartCourses] = useState([]);
  const [progressCourses, setProgressCourses] = useState([]);
  const [progressMap, setProgressMap] = useState({}); // To track progress for each course
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (id) {
    

      // Fetch courses in progress
      axios.get(`${Base_URL}/api/progressCourse/${id}/course`)
        .then((response) => {
          setProgressCourses(response.data);
        });
    }
  }, [id]);


  const [newCourses, setNewCourses] = useState([]);

  const handleStartCourse = async (courseId) => {
    const userId = localStorage.getItem('id'); // Assuming user ID is stored in localStorage
    if (userId && courseId) {
      try {
        // Make an API request to update the course status to "progress"
        const response = await axios.put(`http://localhost:5000/api/startCourses/user/${userId}/course/${courseId}/progress`);
        console.log(response.data.profile.continueWatching);

        // Set the new courses after the API call is successful
        const updatedCourses = response.data.profile.continueWatching; // Extract the updated courses
        setNewCourses(updatedCourses);

        // Remove the course from startCourses and add to progressCourses
        setStartCourses(prevCourses =>
          prevCourses.filter(course => course.id !== courseId) // Use `id` here instead of `_id`
        );

        const courseToAdd = updatedCourses.find(continueWatching => continueWatching.id === courseId); // Use `id` here
        setProgressCourses(prevCourses => [
          ...prevCourses,
          courseToAdd,
        ]);

        // Post new courses to the server
        const saveResponse = await axios.post(`http://localhost:5000/api/update/inprogresscourses/${userId}`, { newCourses: updatedCourses }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log("Data save API call success", saveResponse.data);

      } catch (error) {
        console.error('Error updating course status or updating DB', error);
      }
    } else {
      console.error("Course ID or User ID is missing.");
    }
  };




  
  // Pagination Logic
  const allCourses = [...goToCourses, ...startCourses, ...progressCourses];
  const totalCourses = allCourses.length;
  const totalPages = Math.ceil(totalCourses / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCourses = allCourses.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <>
      <SidebarDashboard />
      {/* <FilterResultLayout /> */}
      {/* <FilterResultLayout setCurrentPage={setCurrentPage}  setFilterShow={setFilterShow} filterShow={filterShow} coursesNumber={currentCourses.length} totalCourse={filteredCourses.length} /> */}

      <div className={styles.allCoursesContainer}>
        
        <div className={styles.courseGrid}>
          {currentCourses.map((course, index) => {
            if (goToCourses.includes(course)) {
              // return <GoToCourseCard key={index} course={course} />; // Use `id` instead of `_id`
            } else if (startCourses.includes(course)) {
              // return (
              //   <StartCourseCard
              //     key={index} // Use `id` here
              //     course={course}
              //     onStartCourse={handleStartCourse} // Pass the click handler
              //     progress={progressMap[course.id] || 0} // Use `id` here for progress tracking
              //   />
              // );
            } else {
              return <ProgressCourseCard key={index} course={course} />; // Use `id` here
            }
          })}
        </div>
      </div>

      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default ActiveCourses;
