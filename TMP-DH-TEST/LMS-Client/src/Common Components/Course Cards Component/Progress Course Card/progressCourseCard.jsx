// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './progressCourseCard.module.css';
// import { LinearProgress } from '@mui/material';
// import localImg from './localImg.png';

// const ProgressCourseCard = () => {
//   const [courses, setCourses] = useState([]);
//   const id = localStorage.getItem('id'); // Get user ID from localStorage

//   useEffect(() => {
//     if (id) {
//       // Fetch progress courses for the specific user
//       axios
//         .get(`http://localhost:5000/api/progressCourse/${id}/course`)
//         .then((response) => {
//           setCourses(response.data); // Set the progress courses data
//         })
//         .catch((error) => {
//           console.error('Error fetching progress courses:', error);
//         });
//     }
//   }, [id]);

//   if (!courses.length) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       {courses.length ? (
//         courses.map((course, index) => {
//           const [completed, total] = course.lessons.split('/').map(Number);
//           const progress = (completed / total) * 100; // Calculate progress as percentage

//           return (
//             <div key={index} className={styles.card}>
//               <div className={styles.imageContainer}>
//               <img src={localImg} alt="Course Image" className={styles.image} />

//               </div>
//               <div className={styles.cardContent}>
//                 <div className={styles.title}>
//                   {course.title || 'Course Title'}
//                 </div>
//                 <div className={styles.description}>
                 
//                   {course.description || 'Course Description'}
//                 </div>
//                 <div className={styles.progressSection}>
//                   <div className={styles.progressText}>
//                     {completed}/{total} <span>Lessons</span>
//                   </div>
//                   <LinearProgress
//                     variant="determinate"
//                     value={progress}
//                     sx={{
//                       backgroundColor: 'lightgray',
//                       '& .MuiLinearProgress-bar': {
//                         backgroundColor: '#FF702D',
//                       },
//                       height: '8px',
//                       width: '328px',
//                       borderRadius: '4px',
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <div>No courses available.</div>
//       )}
//     </>
//   );
// };

// export default ProgressCourseCard;

















import React, { useEffect, useState } from 'react';
import styles from './progressCourseCard.module.css';
import { LinearProgress } from '@mui/material';


import Base_URL from "../../../const/const"
import { useNavigate } from 'react-router-dom';
import FreeTag from '../Free-Paid Tags/Free Tag/freeTag';
import PaidTag from '../Free-Paid Tags/Paid Tag/paidTag';

const ProgressCourseCard = ({ course }) => {
  const [completed, total] = course.lessons.split('/').map(Number);
  const progress = (completed / total) * 100; // Calculate progress as percentage


  const navigate = useNavigate();
  const courseRedirection = (id) =>{
    localStorage.setItem("courseId",id);
    // localStorage.setItem("activeTab","1")
    navigate("/courseDetails")
  }

  // const [courses, setCourses] = useState(course)

  // useEffect(()=>{
  //   console.log(courses)
  // },[courses])

  return (
    <div className={styles.card} onClick={()=>{courseRedirection(course?.courseID || course?.courseId)}}>
      <div className={styles.imageContainer}>
        <img src={`${Base_URL}/uploads/Courses/${course.image}.png`} alt="Progress" className={styles.image} />
        <div className={styles.freetag} style={{display: course?.Tag !== "Free" && 'none'}}>
          <FreeTag />
        </div>
        <div className={styles.freetag} style={{display: course?.Tag !== "Paid" && 'none'}}>
          <PaidTag />
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.title}>{course.title || 'Course Title'}</div>
        <div className={styles.description}>{course.description || 'Course Description'}</div>
        <div className={styles.progressSection}>
          <div className={styles.progressText}>{completed}/{total} <span>Lessons</span></div>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              backgroundColor: 'lightgray',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#FF702D',
              },
              height: '8px',
              width: '329px',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressCourseCard;
