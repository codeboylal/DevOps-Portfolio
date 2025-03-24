




import React, { useEffect, useState } from "react";
import styles from "./notificationPopUp.module.css";
import { useToaster } from "../../../Toaster";
import { getNotification } from "../../../services/notification/getNotification";
import ScrollBar from "../../scrollBar/scrollBar";

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectRerender, setProjectsRerender] = useState(true);
  const setToast = useToaster();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        getNotification().then(response=>{
          // console.log(response?.data?.data)
          const notiArray = response?.data?.data?.facadesNotifications 
          for(let i of response?.data?.data?.plansNotifications){
            // console.log(i)
            notiArray.push(i)
          }
          // console.log(notiArray)
          setNotifications(notiArray)
        }).catch(err=>{
          console.log(err)
        })
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setToast("Data Sync Failed", "error");
      } finally {
        setLoading(false);
      }
    };

    if (userId && projectRerender) {
      fetchNotifications();
      setProjectsRerender(false);
    }

  }, [userId, projectRerender]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className={styles.notificationListContainer}>
    <ScrollBar >

      <h2 className={styles.heading}>Notifications</h2>
      {notifications.length === 0 ? (
        <div>No notifications available.</div>
      ) : (
        notifications.map((notification, index) => (
          <div key={index} className={styles.notificationItem}>
            <div className={styles.notificationTitle}>
              {notification?.[notification?.length-1]?.message}
            </div>
            {/* <div className={styles.notificationDetails}>
              {notification.date
                ? new Date(notification.date).toLocaleString()
                : "No date available"}
            </div> */}
          </div>
        ))
      )}
    </ScrollBar>

    </div>

  );
};

export default NotificationList;
