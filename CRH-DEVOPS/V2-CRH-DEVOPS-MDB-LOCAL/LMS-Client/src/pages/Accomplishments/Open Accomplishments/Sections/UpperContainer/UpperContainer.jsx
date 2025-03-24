import React from "react";
import styles from './UpperContainer.module.css';
import Base_URL from "../../../../../const/const";

const UpperContainer = ({imag , title , company, grade, onTriggerDownload, EnrolledStudents}) => {
    return(
        <div className={styles.container}>
            <div className={styles.leftContanier}>
                <div className={styles.imgContanier}>
                    <img style={{width:'100%', height:'100%',borderRadius:'12px'}} src={`${Base_URL}/uploads/Courses/${imag}.png`} alt="Img" />
                </div>
                <div className={styles.courseDetails}>
                    <div>
                        <label className={styles.courseNameDes}>
                            {title}
                        </label>
                    </div>
                    <div>
                        <label className={styles.label}>
                            {company}
                        </label>
                    </div>
                    <div style={{display:'flex' , flexDirection:'row', gap:'5px', alignItems:'center'}}>
                        <div>
                            Rating Stars
                        </div>
                        <label>
                            4.8 (107,470 ratings) | {EnrolledStudents?.length} Students Enrolled
                        </label>
                    </div>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <div>
                    <label className={styles.percentageDes} style={{color:grade <= 50 ? '#DF0101' : grade === 100 ? '#00B934' :'#FFA100'}}>
                        {grade?.toFixed(2)} %
                    </label>
                </div>
                <div className={styles.downloadButton} onClick={onTriggerDownload}>
                    Download Certificate
                </div>
            </div>
        </div>
    )
}

export default UpperContainer;