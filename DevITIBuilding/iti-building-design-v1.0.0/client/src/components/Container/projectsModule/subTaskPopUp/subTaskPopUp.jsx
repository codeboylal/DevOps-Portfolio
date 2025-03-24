import React, { useEffect, useRef, useState } from "react";

import styles from "./subTaskPopUp.module.css";

import assigned from "./assigned.png";
import ScrollBar from "../../../scrollBar/scrollBar";
import { getAssignedTo } from "../../../../services/projects/assignedTo";

import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";



function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}

const CustomTooltip = styled(Tooltip)({
  "& .MuiTooltip-tooltip": {
    maxWidth: "max-content", // Set max width for tooltip
    whiteSpace: "normal", // Allow text to wrap
  },
});

const TruncatedText = styled(Typography)({
  maxWidth: "50%", // Set max width for truncation
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "inline-block",
  verticalAlign: "middle",
  fontWeight: "bold",
  color: "#333",
  fontSize: "16px"
});


function SubTaskPopUp({
  // {item?.status?.status?.toLowerCase()} = "In Progress" ,
  setPopupVisible,
  task = [],
  taskheading = "",
}) {

  const popupRef = useRef(null);

  
  const formatDate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString("default", { month: "long" });
    const year = new Date(date).getFullYear();

    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    }

    return `${month} ${day}${suffix}, ${year}`;
  };


  const renderWithTooltip = (text, maxLength) => {
      const isTruncated = text && text.length > maxLength;
      const displayText = isTruncated
        ? truncateText(text, maxLength)
        : text || "-";
      return isTruncated ? (
        <Tooltip title={text} placement="top" arrow>
          <label className={styles.truncatedLabel}>{displayText}</label>
        </Tooltip>
      ) : (
        <label className={styles.truncatedLabel}>{displayText}</label>
      );
    };


  // console.log(task)
    const [assignedUsers, setAssignedUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const prevTasksRef = useRef(null);

  useEffect(() => {
      if (!Array.isArray(task) || task.length === 0) {
        setAssignedUsers({});
        // setLoading(false);
        return;
      }
  
      if (JSON.stringify(prevTasksRef.current) === JSON.stringify(task)) {
        setLoading(false);
        return;
      }
      prevTasksRef.current = task;
  
      const fetchAssignedUsers = async () => {
        // setLoading(true);
        const usersMap = {};
        for (const tasks of task) {
          try {
            const response = await getAssignedTo(tasks.id);
            if (response.data.status === 200) {
              const fullData = response.data.data || "-";
              // usersMap[task.id] = fullData.includes("@") ? fullData.split("@")[0] : fullData;
              usersMap[tasks.id] = fullData;
            }
          } catch (err) {
            console.log(err);
            usersMap[tasks.id] = "-";
          }
        }
        setAssignedUsers(usersMap);
        // setLoading(false);
      // console.log(usersMap)

      };
  
      fetchAssignedUsers();
    }, [JSON.stringify(task)]);



    useEffect(() => {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setPopupVisible(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setPopupVisible]);
  

  return (
    <div className={styles.outerDiv}>
      <div className={styles.poupDiv}  ref={popupRef}>
        <div
          className={styles.headingCross}
        >
          <div>{taskheading}</div>
          <div
            className={styles.pointer}
            onClick={() => {
              setPopupVisible(false);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3255 9.99967L15.0364 6.28874C15.2125 6.11293 15.3116 5.87435 15.3118 5.6255C15.312 5.37665 15.2134 5.1379 15.0376 4.96178C14.8618 4.78566 14.6232 4.6866 14.3743 4.68638C14.1255 4.68616 13.8867 4.7848 13.7106 4.96061L9.99967 8.67155L6.28874 4.96061C6.11262 4.78449 5.87374 4.68555 5.62467 4.68555C5.3756 4.68555 5.13673 4.78449 4.96061 4.96061C4.78449 5.13673 4.68555 5.3756 4.68555 5.62467C4.68555 5.87374 4.78449 6.11262 4.96061 6.28874L8.67155 9.99967L4.96061 13.7106C4.78449 13.8867 4.68555 14.1256 4.68555 14.3747C4.68555 14.6237 4.78449 14.8626 4.96061 15.0387C5.13673 15.2149 5.3756 15.3138 5.62467 15.3138C5.87374 15.3138 6.11262 15.2149 6.28874 15.0387L9.99967 11.3278L13.7106 15.0387C13.8867 15.2149 14.1256 15.3138 14.3747 15.3138C14.6237 15.3138 14.8626 15.2149 15.0387 15.0387C15.2149 14.8626 15.3138 14.6237 15.3138 14.3747C15.3138 14.1256 15.2149 13.8867 15.0387 13.7106L11.3255 9.99967Z"
                fill="#020617"
              />
            </svg>
          </div>
        </div>
        <ScrollBar>
          {Array.isArray(task) &&
            task?.filter((item) => (item.custom_item_id !== 1004 || item.custom_item_id !== 1005))
            ?.map((item, index) => {
              return (
                <div className={styles.subTaskDiv} key={index}>
                  <div className={styles.taskNumProgress}>
                    <div>
                      {item?.name}
                      </div>
                    <div
                      className={styles.progressDiv}
                      style={{
                        backgroundColor:
                          item?.status?.status?.toLowerCase() === "in progress"
                            ? "#F5D451"
                            : item?.status?.status?.toLowerCase() === "complete"
                            ? "#51CE60"
                            : item?.status?.status?.toLowerCase() ===
                              "yet to start"
                            ? "#C8C8C8"
                            : item?.status?.status?.toLowerCase() === "on hold"
                            ? "#000000"
                            : "White",
                        color:
                          item?.status?.status?.toLowerCase() === "in progress"
                            ? "black"
                            : item?.status?.status?.toLowerCase() === "complete"
                            ? "white"
                            : item?.status?.status?.toLowerCase() ===
                              "yet to start"
                            ? "#FFFFFF"
                            : item?.satus?.status === "on hold"
                            ? "#FFFFFF"
                            : "#000000",
                        border:
                          item?.status?.status?.toLowerCase() === "in progress"
                            ? "1px solid #F5D451"
                            : item?.status?.status?.toLowerCase() === "complete"
                            ? "1px solid #51CE60"
                            : item?.status?.status?.toLowerCase() ===
                              "yet to start"
                            ? "1px solid #C8C8C8"
                            : item?.status?.status?.toLowerCase() === "on hold"
                            ? "1px solid #000000"
                            : "1px solid #000000",
                      }}
                    >
                      {item?.status?.status?.toLowerCase() === "in progress"
                        ? "In Progress"
                        : item?.status?.status?.toLowerCase() === "complete"
                        ? "Completed"
                        : item?.status?.status?.toLowerCase() === "yet to start"
                        ? "Not Started"
                        : item?.status?.status?.toLowerCase() === "on hold"
                        ? "On Hold"
                        : "On Hold"}
                    </div>
                  </div>
                  <div className={styles.assignedEstimated}>
                    <div className={styles.detailsDiv}>
                      <span>Assigned to:</span>
                      <div className={styles.imgName}>
                        <img src={assigned} alt="ITI Buildings Project" />
                        <span className={styles.spanStyle}>
                        {renderWithTooltip(assignedUsers[item.id] || "-", 20)}

                        </span>
                      </div>
                    </div>
                    <div className={styles.detailsDiv}>
                      <span>Estimated Completion:</span>
                      <span className={styles.spanStyle}>
                        {item?.due_date
                          ? formatDate(parseInt(item?.due_date, 10))
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </ScrollBar>
        {(!task || task?.length === 0) && (
          <div className={styles.noTasks}>There are no subtasks.</div>
        )}
      </div>
    </div>
  );
}
export default SubTaskPopUp;

// import React, { useEffect, useRef } from "react";
// import styles from "./subTaskPopUp.module.css";
// import ScrollBar from "../../../scrollBar/scrollBar";

// function SubTaskPopUp({ task, onClose }) {
//   const popupRef = useRef(null);

//   // Close the popup when clicking outside
//   const handleClickOutside = (event) => {
//     if (popupRef.current && !popupRef.current.contains(event.target)) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Function to get CSS class for status
//   const getStatusClass = (status) => {
//     switch (status.toLowerCase()) {
//       case "in progress":
//         return styles.inProgress;
//       case "not started":
//         return styles.notStarted;
//       case "on hold":
//         return styles.onHold;
//       case "complete":
//         return styles.completed;
//       default:
//         return styles.unknown; // Fallback class for unknown status
//     }
//   };

//   if (!task) {
//     return null; // Don't render the popup if no task is provided
//   }

//   return (
//     <div className={styles.overlay}>
//       <div ref={popupRef} className={styles.popup}>
//         <div className={styles.headingCross}>
//           <div className={styles.taskName}>{task.name || "Task Details"}</div>
//           <div className={styles.pointer} onClick={onClose}>
//             ✖
//           </div>
//         </div>
//         <ScrollBar>
//           <div className={styles.subTaskDiv}>
//             <div className={styles.taskNumProgress}>
//               <div>Subtask:</div>
//               <div className={`${styles.progressDiv} ${getStatusClass(task.status)}`}>
//                 {task.status || "Unknown"}
//               </div>
//             </div>
//             <div className={styles.assignedEstimated}>
//               <div className={styles.detailsDiv}>
//                 <span className={styles.span}>Assigned to:</span>
//                 <span className={styles.spanStyle}>{task.assignedTo || "Unassigned"}</span>
//               </div>
//               <div className={styles.detailsDiv}>
//                 <span className={styles.span}>Estimated Completion:</span>
//                 <span className={styles.spanStyle}>{task.completion || "No Due Date"}</span>
//               </div>
//             </div>
//           </div>
//         </ScrollBar>
//       </div>
//     </div>
//   );
// }

// export default SubTaskPopUp;
