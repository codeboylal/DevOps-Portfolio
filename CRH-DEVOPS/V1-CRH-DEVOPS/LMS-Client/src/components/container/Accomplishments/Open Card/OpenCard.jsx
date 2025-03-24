import React from "react";
import styles from './OpenCard.module.css';
import cx from 'classnames';
import Base_URL from "../../../../const/const";
import Tooltip from '@mui/material/Tooltip';


// Helper function to truncate text
const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
        return text?.slice(0, maxLength) + '...';
    }
    return text;
};

const OpenCard = ({setReRender,border , reRender, imag, courseName, company, name, completionDate, grade ,instructor, courseId, indexCourseID}) => {
    const maxLength = 8; // Adjust the maximum length as needed
    const secMaxLength = 10;
    const instructorName = 20;
    // window.scrollTo(0,0)
    const storeLocalID = () =>{
        localStorage.setItem("continueWatchingCourseID",indexCourseID)
        localStorage.setItem("AccomplishmentCourseID",courseId)
        setReRender(!reRender)
    }

    return (
        <div className={cx(styles.container, styles.pointer)} style={{border:border && '1px solid #FF702D'}} onClick={storeLocalID}>
            <div className={styles.disrow} style={{ alignItems: 'center' }}>
                <div className={styles.imgContainer}>
                    <img className={styles.imgDes} src={`${Base_URL}/uploads/Courses/${imag}.png`} alt="Course Img" />
                </div>
                <div className={cx(styles.disrow, styles.labelUpper)} style={{ flexDirection: 'column' }}>
                    <Tooltip 
                        title={courseName} 
                        arrow 
                        placement="top"
                        PopperProps={{
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -8],
                                    },
                                },
                            ],
                        }}
                    >
                        <label className={styles.pointer}>
                            {truncateText(courseName, maxLength)}
                        </label>
                    </Tooltip>
                    {/* <Tooltip title={company} arrow placement="top">
                        <label style={{ fontSize: '16px' }} className={styles.pointer}>
                            {truncateText(company, secMaxLength)}
                        </label>
                    </Tooltip> */}
                    {/* <label className={styles.pointer}>
                        {truncateText(courseName, maxLength)}
                    </label> */}
                    <label style={{ fontSize: '16px' }} className={styles.pointer}>
                        {truncateText(company, secMaxLength)}
                    </label>
                </div>
            </div>
            <div className={cx(styles.disrow, styles.labelLower)} style={{ flexDirection: 'column' }}>
                <label className={styles.pointer}>
                    Taught by: {truncateText(instructor, instructorName)}
                </label>
                <label className={styles.pointer}>
                    Completed by: {truncateText(name.toUpperCase(), maxLength)}
                </label>
                <div className={cx(styles.disrow, styles.pointer)} style={{ gap: '5px' }}>
                    <label>
                        {completionDate} |
                    </label>
                    <label className={styles.pointer} style={{fontWeight:'bold' , color: grade <= 50 ? '#DF0101' : grade === 100 ? '#00B934' : '#FFA100' }}>
                        {grade}%
                    </label>
                </div>
            </div>
        </div>
    );
}

export default OpenCard;
