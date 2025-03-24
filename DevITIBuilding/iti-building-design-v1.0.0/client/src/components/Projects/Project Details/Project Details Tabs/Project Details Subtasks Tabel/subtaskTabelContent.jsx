


// import React, { useState, useEffect, useRef } from "react";
// import styles from "./subtaskTabelContent.module.css";
// import ScrollBar from "../../../../scrollBar/scrollBar";
// import SubTaskPopUp from "../../../../Container/projectsModule/subTaskPopUp/subTaskPopUp";
// import { getAssignedTo } from "../../../../../services/projects/assignedTo";
// import BuildingLoader from "../../../../loader/loader";
// import { Tooltip } from "@mui/material";

// function truncateText(text, maxLength) {
//   return text.length > maxLength ? text.slice(0, maxLength) : text;
// }

// const SubtaskTable = ({ subtask, email }) => {
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const [selectedSubtask, setSelectedSubtask] = useState(null);
//   const [isMobileView, setIsMobileView] = useState(false);
//   const [assignedUsers, setAssignedUsers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const prevTasksRef = useRef(null);

//   const renderWithTooltip = (text, maxLength) => {
//     const isTruncated = text && text.length > maxLength;
//     const displayText = isTruncated
//       ? truncateText(text, maxLength)
//       : text || "-";
//     return isTruncated ? (
//       <Tooltip title={text} placement="top" arrow>
//         <label className={styles.truncatedLabel}>{displayText}</label>
//       </Tooltip>
//     ) : (
//       <label className={styles.truncatedLabel}>{displayText}</label>
//     );
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth <= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const formatDate = (date) => {
//     const day = new Date(date).getDate();
//     const month = new Date(date).toLocaleString("default", { month: "long" });
//     const year = new Date(date).getFullYear();
//     let suffix = "th";
//     if ([1, 21, 31].includes(day)) suffix = "st";
//     else if ([2, 22].includes(day)) suffix = "nd";
//     else if ([3, 23].includes(day)) suffix = "rd";
//     return `${month} ${day}${suffix}, ${year}`;
//   };

//   const nestedTasks = subtask?.subtasks?.map((nestedSubtask) => ({
//     id: nestedSubtask.id || "N/A",
//     name: nestedSubtask.name || "Unnamed Task",
//     assignedTo: nestedSubtask.assignees?.[0]?.match(/^([^@]+)/)?.[1] || "-",
//     status: nestedSubtask.status?.status || "Unknown",
//     completion: nestedSubtask.due_date
//       ? formatDate(parseInt(nestedSubtask.due_date, 10))
//       : "No Due Date",
//     subtask:
//       nestedSubtask.custom_item_id === 1004 ? [] : nestedSubtask.subtasks,
//   }));

//   useEffect(() => {
//     if (!Array.isArray(nestedTasks) || nestedTasks.length === 0) {
//       setAssignedUsers({});
//       setLoading(false);
//       return;
//     }

//     if (JSON.stringify(prevTasksRef.current) === JSON.stringify(nestedTasks)) {
//       setLoading(false);
//       return;
//     }
//     prevTasksRef.current = nestedTasks;

//     const fetchAssignedUsers = async () => {
//       setLoading(true);
//       const usersMap = {};
//       for (const task of nestedTasks) {
//         try {
//           const response = await getAssignedTo(task.id);
//           if (response.data.status === 200) {
//             const fullData = response.data.data || "-";
//             // usersMap[task.id] = fullData.includes("@") ? fullData.split("@")[0] : fullData;
//             usersMap[task.id] = fullData;
//           }
//         } catch (err) {
//           console.log(err);
//           usersMap[task.id] = "-";
//         }
//       }
//       setAssignedUsers(usersMap);
//       setLoading(false);
//     };

//     fetchAssignedUsers();
//   }, [JSON.stringify(nestedTasks)]);

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
//         return styles.unknown;
//     }
//   };

//   const handleRowClick = (task) => {
//     setSelectedSubtask(task);
//     setPopupVisible(true);
//   };

//   const closePopup = () => {
//     setPopupVisible(false);
//     setSelectedSubtask(null);
//   };

//   return (
//     <div>
//       {loading ? (
//         <BuildingLoader height="40vh" width="100%" marginTop="0px" />
//       ) : (
//         <ScrollBar>
//           <table className={styles.tableContainer}>
//             <thead >
//               <tr className={styles.tableRow}>
  
//                 <th className={styles.tasks} style={{backgroundColor:"#F3F3F3", borderTopLeftRadius:"8px", }} >Tasks</th>
//                 <th style={{backgroundColor:"#F3F3F3", paddingLeft:"0px"}}>Assigned </th>
//                 <th style={{backgroundColor:"#F3F3F3"}}>Status</th>
//                 <th className={styles.taskCompletion} style={{backgroundColor:"#F3F3F3", borderTopRightRadius:"8px",}}>Estimated Completion</th>
//               </tr>
//             </thead>
//             <tbody className={styles.tableData}>
//               {nestedTasks.map((task, index) => (
//                 <tr
//                   key={index}
//                   onClick={() => handleRowClick(task)}
//                   className={styles.clickableRow}
//                 >
//                   <td className={styles.tasks}>{task.name}</td>
//                   <td
//                     className={`${styles.assign} ${styles.assigned}`}
//                     style={{ cursor: "pointer"}}
//                   >
//                     {/* {assignedUsers[task.id] || "-"} */}
//                     <div
//                       className={styles.assignData}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         e.preventDefault();
//                       }}
//                     >
//                       {renderWithTooltip(assignedUsers[task.id] || "-", 1)}
//                     </div>
//                   </td>
//                   {isMobileView ? (
//                     <div className={styles.two}>
//                       <td className={styles.centerAlign}>
//                         <span
//                           className={`${getStatusClass(task.status)} ${
//                             styles.status
//                           }`}
//                         >
//                           {task.status}
//                         </span>
//                       </td>
//                       <td
//                         className={`${styles.completion} ${styles.centerAlign}`}
//                       >
//                         {task.completion}
//                       </td>
//                     </div>
//                   ) : (
//                     <>

//                       <td className={styles.centerAlign}>
//                         <span
//                           className={`${getStatusClass(task.status)} ${
//                             styles.status
//                           } ${styles.button}`}
//                         >
//                           {task.status}
//                         </span>
//                       </td>
//                       <td
//                         className={`${styles.completion} ${styles.taskCompletion}`}
//                       >
//                         {task.completion}
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </ScrollBar>
//       )}
//       {isPopupVisible && (
//         <SubTaskPopUp
//           className={styles.subtaskPopup}
//           taskheading={selectedSubtask.name}
//           task={selectedSubtask?.subtask}
//           onClose={closePopup}
//           setPopupVisible={setPopupVisible}
//         />
//       )}
//     </div>
//   );
// };

// export default SubtaskTable;


































import React, { useState, useEffect, useRef } from "react";
import styles from "./subtaskTabelContent.module.css";
import ScrollBar from "../../../../scrollBar/scrollBar";
import SubTaskPopUp from "../../../../Container/projectsModule/subTaskPopUp/subTaskPopUp";
import { getAssignedTo } from "../../../../../services/projects/assignedTo";
import BuildingLoader from "../../../../loader/loader";
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
  maxWidth: "75%", // Set max width for truncation
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "inline-block",
  verticalAlign: "middle",
  fontWeight: "bold",
  color: "#333",
  fontSize: "16px"
});

function sometruncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
const SubtaskTable = ({ subtask, email }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedSubtask, setSelectedSubtask] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [assignedUsers, setAssignedUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const prevTasksRef = useRef(null);

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

  const renderWithsomeTooltip = (text, maxLength) => {
    const isTruncated = text && text.length > maxLength;
    const displayText = isTruncated
      ? sometruncateText(text, maxLength)
      : text || "-";
    return isTruncated ? (
      <Tooltip title={text} placement="top" arrow>
        <label className={styles.truncatedLabel}>{displayText}</label>
      </Tooltip>
    ) : (
      <label className={styles.truncatedLabel}>{displayText}</label>
    );
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString("default", { month: "long" });
    const year = new Date(date).getFullYear();
    let suffix = "th";
    if ([1, 21, 31].includes(day)) suffix = "st";
    else if ([2, 22].includes(day)) suffix = "nd";
    else if ([3, 23].includes(day)) suffix = "rd";
    return `${month} ${day}${suffix}, ${year}`;
  };

  const nestedTasks = subtask?.subtasks?.map((nestedSubtask) => ({
    id: nestedSubtask.id || "N/A",
    name: nestedSubtask.name || "Unnamed Task",
    assignedTo: nestedSubtask.assignees?.[0]?.match(/^([^@]+)/)?.[1] || "-",
    status: nestedSubtask.status?.status || "Unknown",
    completion: nestedSubtask.due_date
      ? formatDate(parseInt(nestedSubtask.due_date, 10))
      : "No Due Date",
    subtask:
      nestedSubtask.custom_item_id === 1004 ? [] : nestedSubtask.custom_item_id === 1005 ? [] : nestedSubtask.subtasks,
  }));

  useEffect(() => {
    if (!Array.isArray(nestedTasks) || nestedTasks.length === 0) {
      setAssignedUsers({});
      setLoading(false);
      return;
    }

    if (JSON.stringify(prevTasksRef.current) === JSON.stringify(nestedTasks)) {
      setLoading(false);
      return;
    }
    prevTasksRef.current = nestedTasks;

    const fetchAssignedUsers = async () => {
      setLoading(true);
      const usersMap = {};
      for (const task of nestedTasks) {
        try {
          const response = await getAssignedTo(task.id);
          if (response.data.status === 200) {
            const fullData = response.data.data || "-";
            usersMap[task.id] = fullData;
          }
        } catch (err) {
          console.log(err);
          usersMap[task.id] = "-";
        }
      }
      setAssignedUsers(usersMap);
      setLoading(false);
    };

    fetchAssignedUsers();
  }, [JSON.stringify(nestedTasks)]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return styles.inProgress;
      case "not started":
        return styles.notStarted;
      case "on hold":
        return styles.onHold;
      case "complete":
        return styles.completed;
      default:
        return styles.unknown;
    }
  };

  const handleRowClick = (task) => {
    setSelectedSubtask(task);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedSubtask(null);
  };

  return (
    <div>
      {loading ? (
        <BuildingLoader height="40vh" width="100%" marginTop="0px" />
      ) : (
        <ScrollBar>
          <table className={styles.tableContainer}>
            <thead>
              <tr className={styles.tableRow}>
                {isMobileView ? (
                  <>
                    <th
                      style={{
                        backgroundColor: "#F3F3F3",
                        borderTopLeftRadius: "8px",
                      }}
                    >
                      Assigned
                    </th>
                    <th
                      style={{
                        backgroundColor: "#F3F3F3",
                        paddingLeft: "0px",
                      }}
                    >
                      Tasks
                    </th>
                  </>
                ) : (
                  <>
                    <th
                      className={styles.tasks}
                      style={{
                        backgroundColor: "#F3F3F3",
                        borderTopLeftRadius: "8px",
                      }}
                    >
                      Tasks
                    </th>
                    <th
                      style={{
                        backgroundColor: "#F3F3F3",
                        paddingLeft: "0px",
                      }}
                    >
                      Assigned
                    </th>
                  </>
                )}
                <th style={{ backgroundColor: "#F3F3F3" }}>Status</th>
                <th
                  className={styles.taskCompletion}
                  style={{
                    backgroundColor: "#F3F3F3",
                    borderTopRightRadius: "8px",
                  }}
                >
                  Estimated Completion
                </th>
              </tr>
            </thead>
            <tbody className={styles.tableData}>
              {nestedTasks.map((task, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(task)}
                  className={styles.clickableRow}
                >
                  {isMobileView ? (
                    <>
                      {/* <td
                        className={`${styles.assign} ${styles.assigned}`}
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        <div className={styles.assignData}>
                          {renderWithTooltip(assignedUsers[task.id] || "-", 1)}
                        </div>
                      </td>
                      <td className={styles.tasks}>{task.name}</td> */}

<td
        style={{
          display: "flex",
          flexDirection: "row",
          // alignItems: "flex-start",
          gap: "8px", 
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {/* Assigned Data */}
        <div className={styles.assignData}>
          {renderWithTooltip(assignedUsers[task.id] || "-", 1)}
        </div>

        {/* Task Name */}
        <div className={styles.taskName}>
        {/* isMobile ? 14 : 20 */}
          {/* {task.name} */}
          {renderWithsomeTooltip(task.name || "-",isMobileView ? 13 : 50)}
        </div>
      </td>
                    </>
                  ) : (
                    <>
                      <td className={styles.tasks}>
                        {/* {task.name} */}
                        <CustomTooltip
            title={
              task.name
            }
            arrow
          >
            <TruncatedText>
              {
                task.name
              }
            </TruncatedText>
          </CustomTooltip>
                        </td>
                      <td
                        className={`${styles.assign} ${styles.assigned}`}
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        <div className={styles.assignData}>
                          {renderWithTooltip(assignedUsers[task.id] || "-", 1)}
                        </div>
                      </td>
                    </>
                  )}

                  {isMobileView ? (
                    <div className={styles.two}>
                      <td className={styles.centerAlign}>
                        <span
                          className={`${getStatusClass(task.status)} ${
                            styles.status
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td
                        className={`${styles.completion} ${styles.centerAlign}`}
                      >
                        {task.completion}
                      </td>
                    </div>
                  ) : (
                    <>
                      <td className={styles.centerAlign}>
                        <span
                          className={`${getStatusClass(task.status)} ${
                            styles.status
                          } ${styles.button}`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td
                        className={`${styles.completion} ${styles.taskCompletion}`}
                      >
                        {task.completion}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollBar>
      )}
      {isPopupVisible && (
        <SubTaskPopUp
          className={styles.subtaskPopup}
          taskheading={selectedSubtask.name}
          task={selectedSubtask?.subtask}
          onClose={closePopup}
          setPopupVisible={setPopupVisible}
        />
      )}
    </div>
  );
};

export default SubtaskTable;
