import React from "react";
import { useState, useEffect } from "react";
import styles from '../dashboard.module.css';


//Component
import Notifications from "../../../components/Notifications";
import InstructorComponent from "../../../components/container/Instructor/Instructor";

function NotificationSection({notificationListProp, instructorsListProp}){
    const [notificationData , setnotificationData]=useState(notificationListProp);
    useEffect(() => {
        setnotificationData(notificationListProp);
    }, [notificationListProp]);

    const [instructorsData , setinstructorsData]=useState(instructorsListProp);
    useEffect(() => {
        setinstructorsData(instructorsListProp);
    }, [instructorsListProp]);

    

    return(
    <div className={styles.notiInstructor}>
        <div className={styles.notificationInstructorDiv}>
          <label className={styles.notiInstructLabel} >
              Notification
          </label>
          <NotificationComponent showNotification={true} notificationData={notificationData} />
        </div>
        <div className={styles.notificationInstructorDiv}>
            <label className={styles.notiInstructLabel}>
              My Instructors
            </label>
            <InstructorComponent instructorsData={instructorsData} />
          </div>
        </div>
    )
}

export default NotificationSection;