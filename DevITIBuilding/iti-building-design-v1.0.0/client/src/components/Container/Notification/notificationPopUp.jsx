// import React, { useEffect, useState } from "react";
// import styles from "./notificationPopUp.module.css";
// import { useToaster } from "../../../Toaster";
// import { getNotification } from "../../../services/notification/getNotification";
// import ScrollBar from "../../scrollBar/scrollBar";
// import axios from "axios";
// import BASEURL from "../../../const/const";

// const NotificationList = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const setToast = useToaster();
//   const [projectRerender, setProjectsRerender] = useState(true);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       setLoading(true);
//       try {
//         const notiArray = [];

//         // Fetch facades and plans notifications
//         const notificationResponse = await getNotification();
//         console.log("Notifications API Response:", notificationResponse?.data?.data);

//         if (notificationResponse?.data?.data) {
//           const facadesNotifications = notificationResponse.data.data.facadesNotifications || [];
//           const plansNotifications = notificationResponse.data.data.plansNotifications || [];
//           // Merge notifications correctly
//           notiArray.push(...facadesNotifications, ...plansNotifications);
//         }

//         // Fetch announcements separately
//         const announcementResponse = await axios.get(`${BASEURL}/api/announcements/fetch`);
//         console.log("Announcements API Response:", announcementResponse?.data?.data);

//         const announcements = announcementResponse?.data?.data || [];

//         // Format announcements as notifications
//         const announcementNotifications = announcements.map(announcement => ({
//           message: announcement.text || "No message available",
//           date: announcement.createdAt || null
//         }));

//         // Combine all notifications properly and flatten any nested arrays
//         const finalNotifications = [...notiArray, ...announcementNotifications].flat();

//         console.log("Final Notifications Array:", finalNotifications);
//         setNotifications(finalNotifications);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//         setToast("Data Sync Failed", "error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId && projectRerender) {
//       fetchNotifications();
//       setProjectsRerender(false);
//     }
//   }, [userId, projectRerender]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={styles.notificationListContainer}>
//       <ScrollBar>
//         <h2 className={styles.heading}>Notifications</h2>
//         {notifications.length === 0 ? (
//           <div>No notifications available.</div>
//         ) : (
//           notifications.map((notification, index) => (
//             <div key={index} className={styles.notificationItem}>
//               <div className={styles.notificationTitle}>
//                 {/* Correct message access */}
//                 {notification?.message || "No message available"}
//               </div>
//               <div className={styles.notificationDetails}>
//                 {/* Correct date formatting */}
//                 {notification.date
//                   ? new Date(notification.date).toLocaleString()
//                   : "No date available"}
//               </div>
//             </div>
//           ))
//         )}
//       </ScrollBar>
//     </div>
//   );
// };

// export default NotificationList;
























import React, { useEffect, useState } from "react";
import styles from "./notificationPopUp.module.css";
import { useToaster } from "../../../Toaster";
import { getNotification } from "../../../services/notification/getNotification";
import ScrollBar from "../../scrollBar/scrollBar";
import axios from "axios";
import BASEURL from "../../../const/const";

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const setToast = useToaster();
  const [projectRerender, setProjectsRerender] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        let notiArray = [];

        // Fetch notifications
        // const notificationResponse = await getNotification();
        // if (notificationResponse?.data?.data) {
        //   const facadesNotifications = notificationResponse.data.data.facadesNotifications || [];
        //   const plansNotifications = notificationResponse.data.data.plansNotifications || [];
        //   notiArray = [...facadesNotifications, ...plansNotifications].map(notification => ({
        //     message: notification.message || "No message available",
        //     date: notification.date || notification.createdAt || null
        //   }));
        // }

        // Fetch announcements
        const announcementResponse = await axios.get(`${BASEURL}/api/announcements/fetch`);
        const announcements = announcementResponse?.data?.data || [];

        // Format announcements
        const announcementNotifications = announcements.map(announcement => ({
          message: announcement.text || "No message available",
          date: announcement.createdAt || null
        }));

        // Combine notifications and announcements, then sort by date (newest first)
        const finalNotifications = [...notiArray, ...announcementNotifications]
          .filter(noti => noti.date) // Ensure valid dates
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setNotifications(finalNotifications);
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
      <ScrollBar>
        <h2 className={styles.heading}>Notifications</h2>
        {notifications.length === 0 ? (
          <div>No notifications available.</div>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className={styles.notificationItem}>
              <div className={styles.notificationTitle}>
                {notification?.message || "No message available"}
              </div>
              <div className={styles.notificationDetails}>
                {notification.date ? new Date(notification.date).toLocaleString() : "No date available"}
              </div>
            </div>
          ))
        )}
      </ScrollBar>
    </div>
  );
};

export default NotificationList;
