import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: '#FF702D', // Change background color
    color: 'black', // Change text color
    fontSize: '0.875rem', // Adjust font size
    borderRadius: '8px', // Add border radius for rounded edges
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add subtle shadow
    padding: '8px 16px', // Add padding
  },
  [`& .MuiTooltip-arrow`]: {
    color: '#FF702D', // Arrow should match the background color
  },
}));

const ToolTip = ({ title, placement = 'top', children }) => {
  return (
    <CustomTooltip title={title} placement={placement} arrow>
      {children}
    </CustomTooltip>
  );
};

export default ToolTip;




















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './goToCourseCard.module.css';
// import localImg from './localImg.png';
// import CustomButton from '../../Button Component/Coustom Button/customButton';
// import StartCourseCard from '../Start Course Card/startCourseCard';
// import ProgressCourseCard from '../Progress Course Card/progressCourseCard';
// import TabComponent from '../../Tab Component/tabComponent';
// import Footer from '../../Footer/footer';
// import PaginationComponent from '../../Pagination Component/paginationComponent';
// import CourseFilter from '../../Course Fillter/courseFilter';

// const GoToCourseCard = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     // Fetch courses from the backend
//     axios.get('/api/courses')
//       .then((response) => {
//         setCourses(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching courses:', error);
//       });
//   }, []);

//   return (
//     <>
//       <div className={styles.container}>
//         {courses.map((course) => (
//           <div key={course._id} className={styles.card}>
//             <div className={styles.imageContainer}>
//               <img src={localImg} alt="Course Logo" className={styles.image} />
//             </div>
//             <div className={styles.cardContent}>
//               <div className={styles.title}>{course.title}</div>
//               <div className={styles.description}>{course.description}</div>
//               <div className={styles.gotoCourse}>
//                 <CustomButton buttonType='goToCourse' buttonText='Go To Course' />
//               </div>
//             </div>
//           </div>
//         ))}
//         <StartCourseCard />
//         <ProgressCourseCard />
//         <TabComponent />
//       </div>
//       <PaginationComponent />
//       <Footer />
//       <CourseFilter />
//     </>
//   );
// };

// export default GoToCourseCard;
