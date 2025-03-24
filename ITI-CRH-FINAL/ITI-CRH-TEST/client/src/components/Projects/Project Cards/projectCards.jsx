

// import React, { useState, useEffect } from "react";
// import styles from "./projectCards.module.css";
// import clientIcon from "./Project Card Svgs/client.svg";
// import settingsIcon from "./Project Card Svgs/setting.svg";
// import frameIcon from "./Project Card Svgs/Frame.svg";
// import engineerIcon from "./Project Card Svgs/engineer.svg";
// import { useToaster } from "../../../Toaster";
// import { getUserData } from "../../../services/user/getUser";
// import { updateUserLikePreConstruction } from "../../../services/user/updateUser";

// const ProjectCard = ({ data, likePlansActive, setLikedData, onCardClick, sendOwnerEmail }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const showToaster = useToaster();
//   const [singleCardData, setSignleCardProjectData] = useState(null)
//   const [userEmail, setUserEmail] = useState(null);
//   const [custom_Fields, setCustom_Fields] = useState([])

//   useEffect(() => {
//     if (data) {
//       // console.log(data)
//       setSignleCardProjectData(data[0])
//       setCustom_Fields(data[0]?.custom_fields)
//       // console.log(data[0]?.custom_fields)
//     }
//   }, [data])



//   useEffect(() => {
//     if (data && data.length > 0) {
//       setSignleCardProjectData(prevData => ({
//         ...data[0],
//         status: {
//           ...data[0]?.status,
//           status: data[0]?.status?.status === "Complete" ? "Completed" : data[0]?.status?.status,

//         }
//       }));
//       setCustom_Fields(data[0]?.custom_fields || []);
//     }
//   }, [data]);



//   useEffect(() => {
//     if (data) {
//       setCustom_Fields(data[0]?.custom_fields);

//       // Extract OwnerEmail
//       const ownerEmail = custom_Fields?.find(field => field?.name === "Contact Email")?.value;
//       // console.log(ownerEmail) 

//       // Send OwnerEmail to parent component (Projects.jsx)
//       if (ownerEmail && sendOwnerEmail) {
//         sendOwnerEmail(ownerEmail);
//       }
//     }
//   }, [data, sendOwnerEmail]);



//   const stage =
//     custom_Fields?.find((field) => field?.name === "Stage")?.type_config
//       ?.options[custom_Fields?.find((field) => field?.name === "Stage")?.value]
//       ?.name || "N/A";

//   const handleCardClick = () => {
//     if (onCardClick) {
//       onCardClick(stage); // Pass stage when clicked
//     }
//   };









//   useEffect(() => {
//     const fetchLikedProjects = async () => {
//       const userId = await localStorage.getItem("id");
//       if (!userId) return;

//       try {
//         // Fetch liked projects from backend
//         const response = await getUserData({ userId });
//         const likedProjects = response?.data?.data?.likedProjects || [];
//         const isProjectLiked = likedProjects.includes(singleCardData?.id);
//         setIsLiked(isProjectLiked);
//         if (response?.data?.data?.likedProjects?.length === 0) {
//           setLikedData(true)
//         } else {
//           setLikedData(false)
//         }

//         // Sync backend liked projects with localStorage
//         localStorage.setItem("likedProjects", JSON.stringify(likedProjects));
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//       }
//     };

//     fetchLikedProjects();
//   }, [singleCardData?.id, isLiked]);

//   const handleFavoriteClick = async (e) => {
//     e.stopPropagation();

//     const userId = await localStorage.getItem("id");
//     if (!userId) {
//       showToaster("User not found", "error");
//       return;
//     }

//     const newLikedState = !isLiked;
//     setIsLiked(newLikedState);

//     try {
//       // Update like status in the backend
//       await updateUserLikePreConstruction({
//         taskId: singleCardData?.id,
//         like: newLikedState,
//         userId,
//       });

//       // Update localStorage to reflect changes
//       let likedProjects = JSON.parse(localStorage.getItem("likedProjects")) || [];
//       if (newLikedState) {
//         likedProjects.push(singleCardData?.id);
//       } else {
//         likedProjects = likedProjects.filter(id => id !== singleCardData?.id);
//       }

//       localStorage.setItem("likedProjects", JSON.stringify(likedProjects));

//       showToaster(newLikedState ? "Project Bookmarked" : "Project Unbookmarked", "success");
//     } catch (error) {
//       console.error("Error updating like state:", error);
//       setIsLiked(!newLikedState); // Rollback UI change on failure
//       showToaster("An error occurred. Please try again.", "error");
//     }
//   };

//   return (
//     <div
//       className={`${styles.card} ${singleCardData?.status?.status === "in progress"
//           ? styles.inProgressCard
//           : singleCardData?.status?.status === "OnHold"
//             ? styles.onHoldCard
//             : singleCardData?.status?.status === "Complete"
//               ? styles.completed
//               : singleCardData?.status?.status === "Not Started"
//                 ? styles.notStarted
//                 : ""
//         }`}
//       style={{
//         display: likePlansActive ? (isLiked ? "block" : "none") : "block",
//       }}

//       onClick={handleCardClick}
//     >
//       {/* Header Section */}
//       <div className={styles.header}>
//         <h3 className={styles.projectNumber}>
//           Project #{" "}
//           <span>
//             {singleCardData?.name?.match(/^\d+/)?.[0] || "N/A"}

//           </span>
//         </h3>
//         <div className={styles.statuslikeContainer}>
//           <span
//             className={`${styles.status} ${singleCardData?.status?.status === "in progress"
//                 ? styles.inProgressStatus
//                 : singleCardData?.status?.status === "on hold"
//                   ? styles.onHoldStatus
//                   : singleCardData?.status?.status === "complete"
//                     ? styles.completed
//                     : singleCardData?.status?.status === "not started"
//                       ? styles.notStarted
//                       : ""
//               }`}
//           >
//             {singleCardData?.status?.status?.trim().toLowerCase() === "complete"
//               ? "Completed"
//               : singleCardData?.status?.status}
            

//           </span>
//           <div
//             className={styles.favoriteButton}
//             onClick={handleFavoriteClick}
//             title={isLiked ? "Remove from Bookmarks" : "Add to Bookmarks"}
//           >
//             <svg
//               width="32"
//               height="32"
//               viewBox="0 0 32 32"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect x="0.5" y="0.5" width="31" height="31" rx="5.5" stroke="#DADADA" />
//               <path
//                 d="M22.75 13.1875C22.75 11.3238 21.1758 9.8125 19.234 9.8125C17.7828 9.8125 16.5362 10.657 16 11.8622C15.4638 10.657 14.2172 9.8125 12.7652 9.8125C10.825 9.8125 9.25 11.3238 9.25 13.1875C9.25 18.6025 16 22.1875 16 22.1875C16 22.1875 22.75 18.6025 22.75 13.1875Z"
//                 style={{ fill: isLiked ? "black" : "none" }}
//                 stroke="#1E293B"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Address Section */}
//       <div className={styles.addressContainer}>
//         <img src={frameIcon} alt="Location" className={styles.icon} />
//         <div>
//           <p className={styles.address}>
//             {/* {singleCardData?.name?.match(/_(.*)/)?.[1] || "N/A"} */}
//             {singleCardData?.name?.match(/^(?:[^_]*_){2}(.*)$/)?.[1] || "N/A"}

//           </p>
//         </div>
//       </div>

//       {/* Details Section */}
//       <div className={styles.details}>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={clientIcon} alt="Client Icon" className={styles.icon} /> Client
//           </span>
//           <span className={styles.value}>
//             {/* {singleCardData?.custom_fields?.[12]?.value?.[0]?.name || "N/A"} */}
//             {/* {project?.custom_fields?.find(field => field?.name === "Name")?.value} */}

//             {custom_Fields?.find(field => field?.name === "Owner Details")?.value[0]?.name}
//           </span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={settingsIcon} alt="Stage Icon" className={styles.icon} /> Stage
//           </span>
//           <span className={styles.value}>
//             {custom_Fields?.find(field => field?.name === "Stage")?.type_config?.options[custom_Fields?.find(field => field?.name === "Stage")?.value]?.name}

//             {/* {singleCardData?.custom_fields?.[15]?.value || "N/A"} */}
//           </span>
//         </div>
//         <div className={styles.developer}>
//           <span className={styles.label}>
//             <img src={engineerIcon} alt="Developer Icon" className={styles.icon} /> Developer
//           </span>
//           <span className={styles.value}>
//             {custom_Fields?.find(field => field?.name === "Estate")?.value[0]?.name}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;

























// import React, { useState, useEffect } from "react";
// import styles from "./projectCards.module.css";
// import clientIcon from "./Project Card Svgs/client.svg";
// import settingsIcon from "./Project Card Svgs/setting.svg";
// import frameIcon from "./Project Card Svgs/Frame.svg";
// import engineerIcon from "./Project Card Svgs/engineer.svg";
// import { useToaster } from "../../../Toaster";
// import { getUserData } from "../../../services/user/getUser";
// import { updateUserLikePreConstruction } from "../../../services/user/updateUser";
// import { Tooltip } from "@mui/material";


// function truncateText(text, maxLength) {
//   return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
// }

// // function Box({ contact }) {




// const ProjectCard = ({ data, likePlansActive, setLikedData, onCardClick, sendOwnerEmail }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const showToaster = useToaster();
//   const [singleCardData, setSignleCardProjectData] = useState(null)
//   const [userEmail, setUserEmail] = useState(null);
//   const [custom_Fields, setCustom_Fields] = useState([])
  
//   const renderWithTooltip = (text, maxLength) => {
//     const isTruncated = text && text.length > maxLength;
//     const displayText = isTruncated ? truncateText(text, maxLength) : text || "-";
//     return isTruncated ? (
//       <Tooltip title={text} placement="top" arrow>
//         <label className={styles.truncatedLabel}>{displayText}</label>
//       </Tooltip>
//     ) : (
//       <label className={styles.truncatedLabel}>{displayText}</label>
//     );
//   };
//   useEffect(() => {
//     if (data) {
//       // console.log(data)
//       setSignleCardProjectData(data[0])
//       setCustom_Fields(data[0]?.custom_fields)
//       // console.log(data[0]?.custom_fields)
//     }
//   }, [data])
 
 
 
//   useEffect(() => {
//     if (data && data.length > 0) {
//       setSignleCardProjectData(prevData => ({
//         ...data[0],
//         status: {
//           ...data[0]?.status,
//           status: data[0]?.status?.status === "Complete" ? "Completed" : data[0]?.status?.status,
 
//         }
//       }));
//       setCustom_Fields(data[0]?.custom_fields || []);
//     }
//   }, [data]);
 
 
 
//   useEffect(() => {
//     if (data) {
//       setCustom_Fields(data[0]?.custom_fields);
 
//       // Extract OwnerEmail
//       const ownerEmail = custom_Fields?.find(field => field?.name === "Contact Email")?.value;
//       // console.log(ownerEmail)
 
//       // Send OwnerEmail to parent component (Projects.jsx)
//       if (ownerEmail && sendOwnerEmail) {
//         sendOwnerEmail(ownerEmail);
//       }
//     }
//   }, [data, sendOwnerEmail]);
 
 
 
//   const stage =
//     custom_Fields?.find((field) => field?.name === "Stage")?.type_config
//       ?.options[custom_Fields?.find((field) => field?.name === "Stage")?.value]
//       ?.name || "N/A";
 
//   const handleCardClick = () => {
//     if (onCardClick) {
//       onCardClick(stage); // Pass stage when clicked
//     }
//   };
 
 
 
 
 
 
 
 
 
//   useEffect(() => {
//     const fetchLikedProjects = async () => {
//       const userId = await localStorage.getItem("id");
//       if (!userId) return;
 
//       try {
//         // Fetch liked projects from backend
//         const response = await getUserData({ userId });
//         const likedProjects = response?.data?.data?.likedProjects || [];
//         const isProjectLiked = likedProjects.includes(singleCardData?.id);
//         setIsLiked(isProjectLiked);
//         if (response?.data?.data?.likedProjects?.length === 0) {
//           setLikedData(true)
//         } else {
//           setLikedData(false)
//         }
 
//         // Sync backend liked projects with localStorage
//         localStorage.setItem("likedProjects", JSON.stringify(likedProjects));
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//       }
//     };
 
//     fetchLikedProjects();
//   }, [singleCardData?.id, isLiked]);
 
//   const handleFavoriteClick = async (e) => {
//     e.stopPropagation();
 
//     const userId = await localStorage.getItem("id");
//     if (!userId) {
//       showToaster("User not found", "error");
//       return;
//     }
 
//     const newLikedState = !isLiked;
//     setIsLiked(newLikedState);
 
//     try {
//       // Update like status in the backend
//       await updateUserLikePreConstruction({
//         taskId: singleCardData?.id,
//         like: newLikedState,
//         userId,
//       });
 
//       // Update localStorage to reflect changes
//       let likedProjects = JSON.parse(localStorage.getItem("likedProjects")) || [];
//       if (newLikedState) {
//         likedProjects.push(singleCardData?.id);
//       } else {
//         likedProjects = likedProjects.filter(id => id !== singleCardData?.id);
//       }
 
//       localStorage.setItem("likedProjects", JSON.stringify(likedProjects));
 
//       showToaster(newLikedState ? "Project Bookmarked" : "Project Unbookmarked", "success");
//     } catch (error) {
//       console.error("Error updating like state:", error);
//       setIsLiked(!newLikedState); // Rollback UI change on failure
//       showToaster("An error occurred. Please try again.", "error");
//     }
//   };
 
//   return (
//     <div
//       className={`${styles.card} ${singleCardData?.status?.status === "in progress"
//           ? styles.inProgressCard
//           : singleCardData?.status?.status === "OnHold"
//             ? styles.onHoldCard
//             : singleCardData?.status?.status === "Complete"
//               ? styles.completed
//               : singleCardData?.status?.status === "Not Started"
//                 ? styles.notStarted
//                 : ""
//         }`}
//       style={{
//         display: likePlansActive ? (isLiked ? "block" : "none") : "block",
//       }}
 
//       onClick={handleCardClick}
//     >
//       {/* Header Section */}
//       <div className={styles.header}>
//         <h3 className={styles.projectNumber}>
//           Project #{" "}
//           <span>
//             {/* {singleCardData?.name?.match(/^\d+/)?.[0] || "N/A"} */}
//             {renderWithTooltip(singleCardData?.name?.match(/^\d+/)?.[0] || "N/A")}

//           </span>
//         </h3>
//         <div className={styles.statuslikeContainer}>
//           <span
//             className={`${styles.status} ${singleCardData?.status?.status === "in progress"
//                 ? styles.inProgressStatus
//                 : singleCardData?.status?.status === "on hold"
//                   ? styles.onHoldStatus
//                   : singleCardData?.status?.status === "complete"
//                     ? styles.completed
//                     : singleCardData?.status?.status === "not started"
//                       ? styles.notStarted
//                       : ""
//               }`}
//           >
//             {singleCardData?.status?.status?.trim().toLowerCase() === "complete"
//               ? "Completed"
//               : singleCardData?.status?.status}
           
 
//           </span>
//           <div
//             className={styles.favoriteButton}
//             onClick={handleFavoriteClick}
//             title={isLiked ? "Remove from Bookmarks" : "Add to Bookmarks"}
//           >
//             <svg
//               width="32"
//               height="32"
//               viewBox="0 0 32 32"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect x="0.5" y="0.5" width="31" height="31" rx="5.5" stroke="#DADADA" />
//               <path
//                 d="M22.75 13.1875C22.75 11.3238 21.1758 9.8125 19.234 9.8125C17.7828 9.8125 16.5362 10.657 16 11.8622C15.4638 10.657 14.2172 9.8125 12.7652 9.8125C10.825 9.8125 9.25 11.3238 9.25 13.1875C9.25 18.6025 16 22.1875 16 22.1875C16 22.1875 22.75 18.6025 22.75 13.1875Z"
//                 style={{ fill: isLiked ? "black" : "none" }}
//                 stroke="#1E293B"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
 
//       {/* Address Section */}
//       <div className={styles.addressContainer}>
//         <img src={frameIcon} alt="Location" className={styles.icon} />
//         <div>
//           <p className={styles.address}>
//             {/* {singleCardData?.name?.match(/_(.*)/)?.[1] || "N/A"} */}
//             {singleCardData?.name?.match(/^(?:[^_]*_){2}(.*)$/)?.[1] || "N/A"}
 
//           </p>
//         </div>
//       </div>
 
//       {/* Details Section */}
//       <div className={styles.details}>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={clientIcon} alt="Client Icon" className={styles.icon} /> Client
//           </span>
//           <span className={styles.value}>
//             {/* {singleCardData?.custom_fields?.[12]?.value?.[0]?.name || "N/A"} */}
//             {/* {project?.custom_fields?.find(field => field?.name === "Name")?.value} */}

//             {/* {custom_Fields?.find(field => field?.name === "Owner Details")?.value[0]?.name} */}
//             {renderWithTooltip(custom_Fields?.find(field => field?.name === "Owner Details")?.value[0]?.name, 14)}
//           </span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={settingsIcon} alt="Stage Icon" className={styles.icon} /> Stage
//           </span>
//           <span className={styles.value}>
//             {/* {custom_Fields?.find(field => field?.name === "Stage")?.type_config?.options[custom_Fields?.find(field => field?.name === "Stage")?.value]?.name} */}
//             {renderWithTooltip(custom_Fields?.find(field => field?.name === "Stage")?.type_config?.options[custom_Fields?.find(field => field?.name === "Stage")?.value]?.name, 14)}
//             {/* {singleCardData?.custom_fields?.[15]?.value || "N/A"} */}
//           </span>
//         </div>
//         <div className={styles.developer}>
//           <span className={styles.label}>
//             <img src={engineerIcon} alt="Developer Icon" className={styles.icon} /> Developer
//           </span>
//           <span className={styles.value}>
//             {/* {custom_Fields?.find(field => field?.name === "Estate")?.value[0]?.name} */}
//             {renderWithTooltip(custom_Fields?.find(field => field?.name === "Estate")?.value[0]?.name, 15)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default ProjectCard;
















import React, { useState, useEffect } from "react";
import styles from "./projectCards.module.css";
import clientIcon from "./Project Card Svgs/client.svg";
import settingsIcon from "./Project Card Svgs/setting.svg";
import frameIcon from "./Project Card Svgs/Frame.svg";
import engineerIcon from "./Project Card Svgs/engineer.svg";
import { useToaster } from "../../../Toaster";
import { getUserData } from "../../../services/user/getUser";
import { updateUserLikePreConstruction } from "../../../services/user/updateUser";
import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";


function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

// function Box({ contact }) {

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





const ProjectCard = ({ data, likePlansActive, setLikedData, onCardClick, sendOwnerEmail }) => {
  const [isLiked, setIsLiked] = useState(false);
  const showToaster = useToaster();
  const [singleCardData, setSignleCardProjectData] = useState(null)
  const [userEmail, setUserEmail] = useState(null);
  const [custom_Fields, setCustom_Fields] = useState([])

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  
  const renderWithTooltip = (text, maxLength) => {
    const isTruncated = text && text.length > maxLength;
    const displayText = isTruncated ? truncateText(text, maxLength) : text || "-";
    return isTruncated ? (
      <Tooltip title={text} placement="top" arrow>
        <label className={styles.truncatedLabel}>{displayText}</label>
      </Tooltip>
    ) : (
      <label className={styles.truncatedLabel}>{displayText}</label>
    );
  };
  useEffect(() => {
    if (data) {
      // console.log(data)
      setSignleCardProjectData(data[0])
      setCustom_Fields(data[0]?.custom_fields)
      // console.log(data[0]?.custom_fields)
    }
  }, [data])
 
 
 
  useEffect(() => {
    if (data && data.length > 0) {
      setSignleCardProjectData(prevData => ({
        ...data[0],
        status: {
          ...data[0]?.status,
          status: data[0]?.status?.status === "Complete" ? "Completed" : data[0]?.status?.status,
 
        }
      }));
      setCustom_Fields(data[0]?.custom_fields || []);
    }
  }, [data]);
 
 
 
  useEffect(() => {
    if (data) {
      setCustom_Fields(data[0]?.custom_fields);
 
      // Extract OwnerEmail
      const ownerEmail = custom_Fields?.find(field => field?.name === "Contact Email")?.value;
      // console.log(ownerEmail)
 
      // Send OwnerEmail to parent component (Projects.jsx)
      if (ownerEmail && sendOwnerEmail) {
        sendOwnerEmail(ownerEmail);
      }
    }
  }, [data, sendOwnerEmail]);
 
 
 
  const stage =
    custom_Fields?.find((field) => field?.name === "Stage")?.type_config
      ?.options[custom_Fields?.find((field) => field?.name === "Stage")?.value]
      ?.name || "N/A";
 
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(stage); // Pass stage when clicked
    }
  };
 
 
 
 
 
 
 
 
 
  useEffect(() => {
    const fetchLikedProjects = async () => {
      const userId = await localStorage.getItem("id");
      if (!userId) return;
 
      try {
        // Fetch liked projects from backend
        const response = await getUserData({ userId });
        const likedProjects = response?.data?.data?.likedProjects || [];
        const isProjectLiked = likedProjects.includes(singleCardData?.id);
        setIsLiked(isProjectLiked);
        if (response?.data?.data?.likedProjects?.length === 0) {
          setLikedData(true)
        } else {
          setLikedData(false)
        }
 
        // Sync backend liked projects with localStorage
        localStorage.setItem("likedProjects", JSON.stringify(likedProjects));
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
 
    fetchLikedProjects();
  }, [singleCardData?.id, isLiked]);
 
  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
  
    const userId = await localStorage.getItem("id");
    if (!userId) {
      showToaster("User not found", "error");
      return;
    }
  
    const newLikedState = !isLiked;
  
    try {
      await updateUserLikePreConstruction({
        taskId: singleCardData?.id,
        like: newLikedState,
        userId,
      });
  
      setIsLiked(newLikedState); // Only update state after a successful API call
  
      let likedProjects = JSON.parse(localStorage.getItem("likedProjects")) || [];
      if (newLikedState) {
        likedProjects.push(singleCardData?.id);
      } else {
        likedProjects = likedProjects.filter(id => id !== singleCardData?.id);
      }
  
      localStorage.setItem("likedProjects", JSON.stringify(likedProjects));
  
      showToaster(newLikedState ? "Project Bookmarked" : "Project Unbookmarked", "success");
    } catch (error) {
      console.error("Error updating like state:", error);
      showToaster("An error occurred. Please try again.", "error");
    }
  };
  
 
  return (
    <div
      className={`${styles.card} ${singleCardData?.status?.status === "in progress"
          ? styles.inProgressCard
          : singleCardData?.status?.status === "OnHold"
            ? styles.onHoldCard
            : singleCardData?.status?.status === "Complete"
              ? styles.completed
              : singleCardData?.status?.status === "Not Started"
                ? styles.notStarted
                : ""
        }`}
      style={{
        display: likePlansActive ? (isLiked ? "block" : "none") : "block",
      }}
 
      onClick={handleCardClick}
    >
      {/* Header Section */}
      <div className={styles.header}>
        <h3 className={styles.projectNumber}>
          Project -{" "}
          <span>
            {/* {singleCardData?.name?.match(/^\d+/)?.[0] || "N/A"} */}
            {renderWithTooltip(singleCardData?.name?.match(/^\d+/)?.[0] || "N/A")}

            

          </span>
        </h3>
        <div className={styles.statuslikeContainer}>
          <span
            className={`${styles.status} ${singleCardData?.status?.status === "in progress"
                ? styles.inProgressStatus
                : singleCardData?.status?.status === "on hold"
                  ? styles.onHoldStatus
                  : singleCardData?.status?.status === "complete"
                    ? styles.completed
                    : singleCardData?.status?.status === "not started"
                      ? styles.notStarted
                      : ""
              }`}
          >
            {singleCardData?.status?.status?.trim().toLowerCase() === "complete"
              ? "Completed"
              : singleCardData?.status?.status}
           
 
          </span>
          <div
            className={styles.favoriteButton}
            onClick={handleFavoriteClick}
            title={isLiked ? "Remove from Bookmarks" : "Add to Bookmarks"}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" y="0.5" width="31" height="31" rx="5.5" stroke="#DADADA" />
              <path
                d="M22.75 13.1875C22.75 11.3238 21.1758 9.8125 19.234 9.8125C17.7828 9.8125 16.5362 10.657 16 11.8622C15.4638 10.657 14.2172 9.8125 12.7652 9.8125C10.825 9.8125 9.25 11.3238 9.25 13.1875C9.25 18.6025 16 22.1875 16 22.1875C16 22.1875 22.75 18.6025 22.75 13.1875Z"
                style={{ fill: isLiked ? "black" : "none" }}
                stroke="#1E293B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
 
      {/* Address Section */}
      <div className={styles.addressContainer}>
        <img src={frameIcon} alt="Location" className={styles.icon} />
        <div>
          <p className={styles.address}>
            {/* {singleCardData?.name?.match(/_(.*)/)?.[1] || "N/A"} */}
            {singleCardData?.name?.match(/^(?:[^_]*_){2}(.*)$/)?.[1] || "N/A"}
 
          </p>
        </div>
      </div>
 
      {/* Details Section */}
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>
            <img src={clientIcon} alt="Client Icon" className={styles.icon} /> Client
          </span>
          {/* <span className={styles.value}> */}
            {/* {singleCardData?.custom_fields?.[12]?.value?.[0]?.name || "N/A"} */}
            {/* {project?.custom_fields?.find(field => field?.name === "Name")?.value} */}

            {/* {custom_Fields?.find(field => field?.name === "Owner Details")?.value[0]?.name} */}
            {/* {renderWithTooltip(custom_Fields?.find(field => field?.name === "Owner Details")?.value[0]?.name,  isMobile ? 14 : 20)} */}

            <CustomTooltip
            title={
              custom_Fields?.find(field => field?.name === "Owner Details")?.value[0]?.name
            }
            arrow
          >
            <TruncatedText>
              {
                custom_Fields?.find(field => field?.name === "Owner Details")?.value[0]?.name
              }
            </TruncatedText>
          </CustomTooltip>
          {/* </span> */}
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>
            <img src={settingsIcon} alt="Stage Icon" className={styles.icon} /> Stage
          </span>
          {/* <span className={styles.value}> */}
            {/* {custom_Fields?.find(field => field?.name === "Stage")?.type_config?.options[custom_Fields?.find(field => field?.name === "Stage")?.value]?.name} */}
            {/* {renderWithTooltip(custom_Fields?.find(field => field?.name === "Stage")?.type_config?.options[custom_Fields?.find(field => field?.name === "Stage")?.value]?.name,  isMobile ? 14 : 20)} */}

            <CustomTooltip
            title={
              custom_Fields?.find(field => field?.name === "Stage")?.type_config?.options[custom_Fields?.find(field => field?.name === "Stage")?.value]?.name
            }
            arrow
          >
            <TruncatedText>
              {
                custom_Fields?.find(field => field?.name === "Stage")?.type_config?.options[custom_Fields?.find(field => field?.name === "Stage")?.value]?.name
              }
            </TruncatedText>
          </CustomTooltip>
            {/* {singleCardData?.custom_fields?.[15]?.value || "N/A"} */}
          {/* </span> */}
        </div>
        <div className={styles.developer}>
          <span className={styles.label}>
            <img src={engineerIcon} alt="Developer Icon" className={styles.icon} /> Developer
          </span>
          {/* <span className={styles.value}> */}
            {/* {custom_Fields?.find(field => field?.name === "Estate")?.value[0]?.name} */}

            {/* {renderWithTooltip(custom_Fields?.find(field => field?.name === "Estate")?.value[0]?.name,  isMobile ? 14 : 20)} */}

            <CustomTooltip
            title={
              custom_Fields?.find(field => field?.name === "Estate")?.value[0]?.name
            }
            arrow
          >
            <TruncatedText>
              {
                custom_Fields?.find(field => field?.name === "Estate")?.value[0]?.name
              }
            </TruncatedText>
          </CustomTooltip>
          {/* </span> */}
        </div>
      </div>
    </div>
  );
};
 
export default ProjectCard;