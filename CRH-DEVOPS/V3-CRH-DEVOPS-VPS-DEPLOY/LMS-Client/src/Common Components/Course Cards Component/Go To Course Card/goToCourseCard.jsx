
import React from 'react';
import styles from './goToCourseCard.module.css';
import CustomButton from '../../Button Component/Coustom Button/customButton';

import Base_URL from '../../../const/const';
import { useNavigate } from 'react-router-dom';
import FreeTag from '../Free-Paid Tags/Free Tag/freeTag';
import PaidTag from '../Free-Paid Tags/Paid Tag/paidTag';



const GoToCourseCard = ({ course }) => {
  
  const navigate = useNavigate();
  const courseRedirection = (id) =>{
    localStorage.setItem("courseId",id);
    navigate("/courseDetails")
  }

  return (
    <div className={styles.card} onClick={()=>{courseRedirection(course?.courseID || course?.courseId)}}>
      <div className={styles.imageContainer}>
        <img src={`${Base_URL}/uploads/Courses/${course.image}.png`} alt="GoTo" className={styles.image} />
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
        <div className={styles.startCourseButton}>
          <CustomButton buttonType="goToCourse" buttonText="Go To Course" />
        </div>
      </div>
    </div>
  );
};

export default GoToCourseCard;
