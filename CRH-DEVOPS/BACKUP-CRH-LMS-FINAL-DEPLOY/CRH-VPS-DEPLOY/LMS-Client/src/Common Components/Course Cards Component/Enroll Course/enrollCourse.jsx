import React from 'react';
import styles from './enrollCourseCard.module.css';
import CustomButton from '../../Button Component/Coustom Button/customButton';
import { Box, Typography, Grid } from '@mui/material';
import { Star, BarChart, AccessTime } from '@mui/icons-material';
import ImportContactsTwoToneIcon from '@mui/icons-material/ImportContactsTwoTone';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Theme from '../../Font/theme';
import { ThemeProvider } from '@mui/material/styles';
import Base_URL from '../../../const/const';
import rupeeIcon from './rupeeSign.svg'
import FreeTag from '../Free-Paid Tags/Free Tag/freeTag';
import PaidTag from '../Free-Paid Tags/Paid Tag/paidTag';



const EnrollCourseCard = ({tag,onClick,courseImg,width, filterShow,courseTitle, courseDescription,courseLesson ,coursePrice, courseRating0, courseRating1 , courseApplied , courseDifficulty, courseDuration}) => {
  const formattedCourseRating = courseRating0.toString().includes('.') ? courseRating0.toString() : courseRating0 + '.0';
  window.scrollTo(0,0)
  return (
    <ThemeProvider theme={Theme}>

    <div className={styles.card} style={{width: filterShow ? '434px': width === "435" ? '435px' : '397px'}}>
      {/* Image Section */}
      <div className={styles.imageContainer}>
        <img src={`${Base_URL}/uploads/Courses/${courseImg}.png`} alt="Course Thumbnail" className={styles.image} style={{position:'relative'}}/>
        <div style={{position:'absolute',top:'24px',right:'24px', display:tag !== "Free" && 'none'}}>
          <FreeTag />
        </div>
        <div style={{position:'absolute',top:'24px',right:'24px', display:tag !== "Paid" && 'none'}}>
          <PaidTag />
        </div>
      </div>

      {/* Card Content Section */}
      <div className={styles.cardContent}>
        {/* Course Title */}
        <div className={styles.title}>{courseTitle}</div>

        {/* Course Description */}
        <Typography className={styles.description}>
          {courseDescription}
        </Typography>

        <div style={{position:'absolute', bottom:'20px',width:'88%'}}>
          {/* Rating and Price */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Star className={styles.starIcon} />
            <Star className={styles.starIcon} />
            <Star className={styles.starIcon} />
            <Star className={styles.starIcon} />
            <Star className={styles.starIcon} />
            <div > <p className={styles.ratingText}> {formattedCourseRating} ({courseRating1}+)</p></div>
          </Box>
          <div  style={{
            textDecorationLine: tag === "Free" && "line-through",
            textDecorationColor: tag === "Free" && "#FF702D", 
            textDecorationThickness: tag === "Free" && "2px", 
          }}
          > <p className={styles.price} >
        <img 
          src={rupeeIcon} 
          alt="Rupee Icon" 
          className={styles.rupeeIcon}
          
        />
        {coursePrice}
      </p></div>
        </Grid>

        {/* Enroll Button */}
        <div className={styles.startCourse} onClick={onClick} style={{cursor:'pointer'}}>
          <CustomButton customStyles={{width: '100%',cursor:'pointer'}} buttonType="EnrollCourse" buttonText="Enroll Course" />
        </div>
        <div className={styles.details}>
  <div className={styles.detailItem}>
    <ImportContactsTwoToneIcon className={styles.icon} sx={{ height: '20px', width: '20px' }} />
    <div className={styles.courseData}>{courseLesson} Lessons</div>
  </div>
  <div className={styles.detailItem}>
    <BarChart className={styles.icon} sx={{ height: '20px', width: '20px' }} />
    <div className={styles.courseData}>{courseApplied} {courseDifficulty}</div>
  </div>
  <div className={styles.detailItem}>
    <AccessTime className={styles.icon} sx={{ height: '20px', width: '20px' }} />
    <div className={styles.courseData} >{courseDuration}</div>
  </div>
</div>

        </div>

      </div>
    </div>

    </ThemeProvider>

  );
};

export default EnrollCourseCard;
