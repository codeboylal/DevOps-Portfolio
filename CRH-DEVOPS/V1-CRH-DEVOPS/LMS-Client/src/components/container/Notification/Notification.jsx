// import React from "react";

// import styles from './Notification.module.css';

// //icons in notification
// import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircle';
// import FlagIcon from '@mui/icons-material/Flag';
// import { Box } from '@mui/material';

// function NotificationComponent({notificationData}){
//     return(
//         <div className={styles.notificationDiv}>
//             {notificationData.map((item, index) => {
//                 return index < 5 ? (
//                 <div className={styles.instructorItem} key={index}>
//                     <div style={{display:'flex',flexDirection:'row',alignItems:'center' ,gap:'10px'}}>
//                     {item[2] === 'FlagIcon' ? (
//                         // Flag Icon with orange circular background
//                         <Box
//                         sx={{
//                             display: 'inline-flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             width: 30,
//                             height: 30,
//                             borderRadius: '50%',
//                             backgroundColor: '#FF6E40',
//                         }}
//                         >
//                         <FlagIcon style={{ color: 'white' }} />
//                         </Box>
//                     ) : (
//                         // Check Circle Icon with green circular background
//                         <Box
//                         sx={{
//                             display: 'inline-flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             width: 30,
//                             height: 30,
//                             borderRadius: '50%',
                        
//                         }}
//                         >
//                         <CheckCircleTwoToneIcon sx={{ color: '#66BB6A', width:'35px',height:'35px' }} twotonecolor="#FFFFFF" />
//                         </Box>
//                     )}
//                     <div style={{display:'flex',flexDirection:'column',  gap:'8px'}}>
//                         <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
//                         <label style={{ color: '#41475E', fontWeight: '500', fontSize: '16px' }}>
//                             {item[0]}
//                         </label>
//                         <label style={{ color: '#41475E', fontWeight: '700', fontSize: '16px', display: item[3] ? 'block' : 'none' }}>
//                             {item[3]}
//                         </label>
//                         </div>
//                         <label style={{ color: '#7A7E86', fontWeight: '500', fontSize: '12px' }}>
//                         {item[1]}
//                         </label>
//                     </div>
//                     </div>
//                 </div>
//             ) : null
//             })}
//             {
//                 notificationData?.length === 0 &&
//                 <div>
//                     There are no notifications yet
//                 </div>
//             }
//         </div>
//     )
// }

// export default NotificationComponent;










import React from "react";

import styles from './Notification.module.css';

//icons in notification
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import { Box } from '@mui/material';


function NotificationComponent({ notificationData , showNotification}) {
    if (!Array.isArray(notificationData)) {
      notificationData = [];
    }
  
    return (
      showNotification &&
      <div className={styles.notificationDiv}>
        {notificationData.length === 0 ? (
          <div>There are no notifications yet</div>
        ) : (
          notificationData.slice(0, 5).map((item, index) => (
            <div className={styles.instructorItem} key={index}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                {item[2] === "FlagIcon" ? (
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      backgroundColor: "#FF6E40",
                    }}
                  >
                    <FlagIcon style={{ color: "white" }} />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                    }}
                  >
                    <CheckCircleTwoToneIcon sx={{ color: "#66BB6A", width: "35px", height: "35px" }} />
                  </Box>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <label style={{ color: "#41475E", fontWeight: "500", fontSize: "16px" }}>
                      {item[0]}
                    </label>
                    <label
                      style={{
                        color: "#41475E",
                        fontWeight: "700",
                        fontSize: "16px",
                        display: item[3] ? "block" : "none",
                      }}
                    >
                      {item[3]}
                    </label>
                  </div>
                  <label style={{ color: "#7A7E86", fontWeight: "500", fontSize: "12px" }}>{item[1]}</label>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
  
  export default NotificationComponent;
  