import React from "react";
import styles from "./ClosedCard.module.css";
import cx from "classnames";
import DownloadIcon from '@mui/icons-material/Download';
import Base_URL from "../../../../const/const";

const ClosedCard = ({title, image, grade, company, onTriggerDownload, onclick}) => {
    return(
        <div className={cx(styles.pointer,styles.containerDes)}>
            <div className={styles.flexRow}>
                <div className={styles.imgContainer} >
                    <img className={styles.ImgDes} src={`${Base_URL}/uploads/Courses/${image}.png`} alt="Course Pic"/>
                </div>
                <div className={styles.nameCompany}>
                    <label className={cx(styles.pointer,styles.courseHeading)}>
                        {title}
                    </label>
                    <label className={cx(styles.pointer,styles.courseCompany)}>
                        {company}
                    </label>
                </div>
            </div>
            <div className={styles.flexRow} style={{gap:'24px'}}>
                <div className={styles.flexRow} style={{flexDirection:'column'}}>
                    <label className={cx(styles.pointer,styles.courseCompany)}>
                        Earned Grade
                    </label>
                    <label className={cx(styles.pointer,styles.percentage)} style={{color: grade === 100 ? '#00B934' : grade <= 50 ? '#DF0101' : '#FFA100' }}>
                        {grade} %
                    </label>
                </div>
                <div className={styles.iconDownload} onClick={onclick}>
                    <DownloadIcon style={{height:'35px', width:'35px'}} />
                </div>
            </div>
        </div>
    )
}

export default ClosedCard;