
// import React, { useState, useEffect } from "react";
// import styles from "./address.module.css";
// import frameIcon from '../../../Project Cards/Project Card Svgs/Frame.svg';
// import { updateUserLikePreConstruction } from "../../../../../services/user/updateUser"; // import the service

// const Address = ({ data }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   // const [projectData,setProjectData] = useState([])
//    const [projectData,setProjectData] = useState([])
    
//   const [custom_Fields, setCustom_Fields] = useState([])
//     useEffect(()=>{
//       if(data){
//         console.log(data)
//         setProjectData(data[0])
//         setCustom_Fields(data?.[0]?.data?.custom_fields)
//         console.log(data?.[0]?.data?.custom_fields)
//       }
//     },[data])



// // useEffect(()=>{
// //   if(data){
// //     setProjectData(data[0])
// //   }
// // },[data])





//   useEffect(() => {
//     // Fetch liked projects from local storage

   
//     const likedProjects = JSON.parse(localStorage.getItem("likedProjects")) || [];
//     setIsLiked(likedProjects.includes(projectData?.data?.id));
//   }, [projectData?.data?.id]);

//   const handleFavoriteClick = async (e) => {
//     e.stopPropagation();

//     const newLikedState = !isLiked;
//     setIsLiked(newLikedState);

//     // Update the liked state in the b
//     try {
//       const userId = localStorage.getItem("id");
//       if (!userId) {
//         alert("User not found.");
//         return;
//       }

//       await updateUserLikePreConstruction({
//         taskId: projectData?.data?.id,
//         like: newLikedState,
//         userId,
//       });

//       // Update localStorage to reflect changes
//       let likedProjects = JSON.parse(localStorage.getItem("likedProjects")) || [];
//       if (newLikedState) {
//         likedProjects.push(projectData?.data?.id);
//       } else {
//         likedProjects = likedProjects.filter(id => id !== projectData?.data?.id);
//       }

//       localStorage.setItem("likedProjects", JSON.stringify(likedProjects));

//     } catch (error) {
//       console.error("Error updating like state in backend:", error);
//       setIsLiked(!newLikedState); // Rollback UI change on failure
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
// <div
//   className={`${styles.card} ${
//     projectData?.data?.status?.status === "complete" 
//       ? styles.completed 
//       : projectData?.data?.status?.status === "in progress" 
//       ? styles.inprogressStatus
//       : projectData?.data?.status?.status === "OnHold" 
//       ? styles.onHoldCard 
//       : projectData?.data?.status?.status === "Not Started" 
//       ? styles.notStarted 
//       : ""
//   }`}
// >
//       <div className={styles.cardHeader}>
//         <div className={styles.projectTitle}>
//           Project Number - {projectData?.data?.name?.match(/^\d+/)?.[0] || "N/A"}
//         </div>
//         <div className={styles.status}>
//       <span
//         className={`
//           ${styles.status} 
//           ${
//             projectData?.data?.status?.status === "complete"
//               ? styles.completed 
//               : projectData?.data?.status?.status === "in progress" 
//               ? styles.inprogressStatus
//               : projectData?.data?.status?.status === "on hold" 
//               ? styles.onHoldStatus 
//               : projectData?.data?.status?.status === "not started" 
//               ? styles.notStarted 
//               : ""
//           }
//         `}
//       >
//         {projectData?.data?.status?.status}
//       </span>
//     </div>
//       </div>

//       <div className={styles.cardContent}>
//         <div className={styles.addressContainer}>
//           <img src={frameIcon} alt="Location" className={styles.icon} />
//           <div>
//             <p className={styles.address}>
//               {/* {projectData?.data?.name?.match(/[^_]+$/)?.[0] || "N/A"} */}
//               {projectData?.data?.name?.match(/[^_]+$/)?.[0] || "N/A"}
//             </p>
//           </div>
//         </div>

//         {/* Favorite Button */}
//         <div
//           className={styles.favoriteButton}
//           onClick={handleFavoriteClick}
//           title={isLiked ? "Remove from Favorites" : "Add to Favorites"}
//         >
//           <svg
//             width="32"
//             height="32"
//             viewBox="0 0 32 32"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <rect x="0.5" y="0.5" width="31" height="31" rx="5.5" stroke="#DADADA" />
//             <path
//               d="M22.75 13.1875C22.75 11.3238 21.1758 9.8125 19.234 9.8125C17.7828 9.8125 16.5362 10.657 16 11.8622C15.4638 10.657 14.2172 9.8125 12.7652 9.8125C10.825 9.8125 9.25 11.3238 9.25 13.1875C9.25 18.6025 16 22.1875 16 22.1875C16 22.1875 22.75 18.6025 22.75 13.1875Z"
//               style={{ fill: isLiked ? "black" : "none" }}
//               stroke="#1E293B"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Address;








































import React, { useState, useEffect } from "react";
import styles from "./address.module.css";
import frameIcon from '../../../Project Cards/Project Card Svgs/Frame.svg';
import { updateUserLikePreConstruction } from "../../../../../services/user/updateUser"; // Import the service
import { useToaster } from "../../../../../Toaster"; // Import the Toaster hook

const Address = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [custom_Fields, setCustom_Fields] = useState([]);
  const showToaster = useToaster(); // Initialize Toaster
  const projectNumber = projectData?.data?.name?.match(/^\d+/)?.[0] || null;

  useEffect(() => {
    if (data) {
      // console.log(data);
      setProjectData(data[0]);
      setCustom_Fields(data?.[0]?.data?.custom_fields);
      // console.log(data?.[0]?.data?.custom_fields);
    }
  }, [data]);

  useEffect(() => {
    const likedProjects = JSON.parse(localStorage.getItem("likedProjects")) || [];
    setIsLiked(likedProjects.some(id => id === projectData?.data?.id));
  }, [projectData]);
  

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();

    const userId = localStorage.getItem("id");
    if (!userId) {
      showToaster("User not found", "error");
      return;
    }

    const newLikedState = !isLiked;
    try {
      // Update like status in the backend
      await updateUserLikePreConstruction({
        taskId: projectData?.data?.id,
        like: newLikedState,
        userId,
      });

      setIsLiked(newLikedState); // Update state only after a successful response
      showToaster(newLikedState ? "Project Bookmarked" : "Project Unbookmarked", "success");

      // Update localStorage
      let likedProjects = JSON.parse(localStorage.getItem("likedProjects")) || [];
      if (newLikedState) {
        likedProjects.push(projectData?.data?.id);
      } else {
        likedProjects = likedProjects.filter((id) => id !== projectData?.data?.id);
      }
      localStorage.setItem("likedProjects", JSON.stringify(likedProjects));
    } catch (error) {
      console.error("Error updating like state in backend:", error);
      showToaster("An error occurred. Please try again.", "error");
    }
  };

  return (
    <div
      className={`${styles.card} ${
        projectData?.data?.status?.status === "complete"
          ? styles.completed
          : projectData?.data?.status?.status === "in progress"
          ? styles.inprogressStatus
          : projectData?.data?.status?.status === "OnHold"
          ? styles.onHoldCard
          : projectData?.data?.status?.status === "Not Started"
          ? styles.notStarted
          : ""
      }`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.projectTitle}>
          Project <p className={styles.numberNone}>   Number</p> - {projectData?.data?.name?.match(/^\d+/)?.[0] || "N/A"}
        </div>
        <div className={styles.status}>
          <span
            className={`
              ${styles.status} 
              ${
                projectData?.data?.status?.status === "complete"
                  ? styles.completed
                  : projectData?.data?.status?.status === "in progress"
                  ? styles.inprogressStatus
                  : projectData?.data?.status?.status === "on hold"
                  ? styles.onHoldStatus
                  : projectData?.data?.status?.status === "not started"
                  ? styles.notStarted
                  : ""
              }
            `}
          >
            {projectData?.data?.status?.status?.trim().toLowerCase() === "complete" ? "Completed" : projectData?.data?.status?.status}
          </span>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.addressContainer}>
          <img src={frameIcon} alt="Location" className={styles.icon} />
          <div>
            <p className={styles.address}>
              {projectData?.data?.name?.match(/^(?:[^_]*_){2}(.*)$/)?.[1] || "N/A"}
            </p>
          </div>
        </div>

        {/* Favorite Button */}
        <div
          className={styles.favoriteButton}
          onClick={handleFavoriteClick}
          title={isLiked ? "Remove from Bookmark" : "Add to Bookmark"}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
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
  );
};

export default Address;
