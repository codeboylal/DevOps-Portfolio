import React from "react";

import styles from "./Notification.module.css";

//icons in notification
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircle";
import FlagIcon from "@mui/icons-material/Flag";
import { Box } from "@mui/material";

const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

function NotificationComponent({ notificationData, showNotification }) {
  if (!Array.isArray(notificationData)) {
    notificationData = [];
  }

  return (
    showNotification && (
      <div className={styles.notificationDiv}>
        {notificationData.length === 0 ? (
          <div>There are no notifications yet</div>
        ) : (
          notificationData.slice(0, 5).map((item, index) => (
            <div className={styles.instructorItem} key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {!item.success === "FlagIcon" ? (
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
                    <CheckCircleTwoToneIcon
                      sx={{ color: "#66BB6A", width: "35px", height: "35px" }}
                    />
                  </Box>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <label
                      style={{
                        color: "#41475E",
                        fontWeight: "500",
                        fontSize: "16px",
                      }}
                    >
                      {item.content}
                    </label>
                    {/* <label
                      style={{
                        color: "#41475E",
                        fontWeight: "700",
                        fontSize: "16px",
                        display: item[3] ? "block" : "none",
                      }}
                    >
                      {item[3]}
                    </label> */}
                  </div>
                  <label
                    style={{
                      color: "#7A7E86",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    {formattedDate(item.date)}
                  </label>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    )
  );
}

export default NotificationComponent;
