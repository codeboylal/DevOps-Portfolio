// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import styles from "../Project Details Page/projectDetails.module.css";
// import PageSetup from "../../../components/Container/pageSetup/pageSetup";
// import Address from "../../../components/Projects/Project Details/Project Details Popups/Project Address Popup/address";
// import Contractors from "../../../components/Projects/Project Details/Project Details Popups/Project Contractors Popup/contractors";
// import OwnerDetails from "../../../components/Projects/Project Details/Project Details Popups/Project Owner Details Popup/ownerDetails";
// import CommonSubTasks from "../../../components/Projects/Project Details/Project Details Tabs/Project Details SubTask Heading/commonSubTask";
// import ScrollBar from "../../../components/scrollBar/scrollBar";
// import SidebarButton from "../../../components/Projects/Project Details/Project Details Side Popup/Side Bar Popup Buttons/sidebarButtons";
// import arrow from "../imgs/arrow.svg";
// import file from "../imgs/file.svg";
// const ProjectDetails = ({  likePlansActive,handleLikePlans,onCardClick}) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const projectData = location.state?.projectData?.[0];
//   // console.log(location.state?.projectData?.[0])
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const handleFavoriteToggle = location.state?.handleFavoriteToggle;
//   const [isLiked, setIsLiked] = useState(location.state?.isFavorite || false); // Get initial state
//   const handleFavoriteClick = () => {
//     setIsLiked((prev) => !prev);

//     // Retrieve existing favorites from localStorage
//     const storedFavorites = JSON.parse(localStorage.getItem("favoriteProjects")) || [];

//     let updatedFavorites;
//     if (!isLiked) {
//       // Add to favorites
//       updatedFavorites = [...storedFavorites, projectData];
//     } else {
//       // Remove from favorites
//       updatedFavorites = storedFavorites.filter((item) => item.id !== projectData.id);
//     }

//     // Save updated favorites back to localStorage
//     localStorage.setItem("favoriteProjects", JSON.stringify(updatedFavorites));

//     // Save flag in sessionStorage to inform Projects page
//     sessionStorage.setItem("likedProjectsUpdated", "true");
//   };

//   useEffect(() => {
//     // Remove 'likedProjects' after navigating
//     // sessionStorage.removeItem("likedProjects");
//   }, []);

//   if (!projectData) return <div>No project selected</div>;
//   // const handleFavoriteClick = () => {
//   //   setIsLiked((prev) => !prev);
//   // };
//   const toggleSidebar = () => {
//     setIsSidebarVisible((prev) => !prev);
//   };

//   const projectNumber = projectData?.data?.name?.match(/\d+/)?.[0] || null;

//   // console.log("Project Number:", projectNumber); // Debugging log

//   const OwnerEmail = projectData?.data?.custom_fields?.find(field => field?.name === "Contact Email")?.value;
//   // console.log(OwnerEmail); // Debugging log

//   const handleCardClick = () => {
//     if (onCardClick) {
//       onCardClick(OwnerEmail);
//     }
//   };

//   return (
//     <div className={styles.mainContainer}>
//       {/* Flex container for PageSetup and SidebarButton */}
//       <div className={styles.layoutContainer}>
//         {/* Toggle Button for Sidebar */}

//          {/* <button */}
//           {/* className={styles.filesToggleButton} */}
//           {/* onClick={toggleSidebar} */}
//         {/* >  */}
//           {/* Files */}

//           {/* <img src={arrow} alt="file arrow button" /> */}
//         {/* </button> */}

//         {!isSidebarVisible && (
//   <button className={styles.filesToggleButton} onClick={toggleSidebar}>
//     <img src={arrow} alt="file arrow button" />
//   </button>
// )}

//         {/* Main content with PageSetup */}
//         <PageSetup active={"Pre-Construction"} appBar={true} projectDetailsSidebar={true}  projectNumber={projectNumber}>

//         <div className={styles.fileButtonContainer}>
//             <div className={styles.fileButton} onClick={toggleSidebar}>
//               <img src={file} alt="file" />
//             </div>

//                             <div
//                               className={styles.favoriteButton}
//                               onClick={()=>{sessionStorage.setItem("likedProjects",true); navigate('/projects')}}
//                               // onClick={()=>{handleLikePlans()}}
//                               // onClick={handleFavoriteClick}
//                               // title={isLiked ? "Remove from Favorites" : "Add to Favorites"}
//                             >
//                               <svg
//                                 width="48"
//                                 height="48"
//                                 viewBox="0 0 32 32"
//                                 fill="#F8F8F8"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 // enableBackground={""}

//                               >
//                                 <rect
//                                   x="0.5"
//                                   y="0.5"
//                                   width="31"
//                                   height="31"
//                                   rx="5.5"
//                                   stroke="#F8F8F8"
//                                 />
//                                 <path
//                                   d="M22.75 13.1875C22.75 11.3238 21.1758 9.8125 19.234 9.8125C17.7828 9.8125 16.5362 10.657 16 11.8622C15.4638 10.657 14.2172 9.8125 12.7652 9.8125C10.825 9.8125 9.25 11.3238 9.25 13.1875C9.25 18.6025 16 22.1875 16 22.1875C16 22.1875 22.75 18.6025 22.75 13.1875Z"
//                                   style={{fill: likePlansActive && 'black'}}
//                                   stroke="#1E293B"
//                                   strokeWidth="1.5"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             </div>
//           </div>

//           <ScrollBar>
//             <div className={styles.superContainer} onClick={handleCardClick}>
//               <div className={styles.newDiv}>
//                 <div className={styles.contentContainer}>
//                   {/* Left Column */}
//                   <div className={styles.leftColumn}>
//                     <Address data={[projectData]} />
//                     {/* <OwnerDetails data={[projectData]} /> */}
//                     <OwnerDetails data={[projectData?.data]}/>
//                   </div>

//                   {/* Right Column */}
//                   <div className={styles.rightColumn}>
//                     <Contractors data={[projectData]} />
//                   </div>
//                 </div>

//                 <div className={styles.subTaskContainer}>
//                   <CommonSubTasks data={[projectData]}  stage={location.state?.stage} />
//                 </div>
//               </div>
//             </div>
//           </ScrollBar>
//         </PageSetup>

//         {/* Sidebar Button */}
//         {isSidebarVisible && (
//           <div className={styles.sidebarButtonContainerLeft}>
//             <SidebarButton onClose={() => setIsSidebarVisible(false)}  projectNumber={projectNumber}  />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails;



import { useToaster } from "../../../Toaster";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../Project Details Page/projectDetails.module.css";
import PageSetup from "../../../components/Container/pageSetup/pageSetup";
import Address from "../../../components/Projects/Project Details/Project Details Popups/Project Address Popup/address";
import Contractors from "../../../components/Projects/Project Details/Project Details Popups/Project Contractors Popup/contractors";
import OwnerDetails from "../../../components/Projects/Project Details/Project Details Popups/Project Owner Details Popup/ownerDetails";
import CommonSubTasks from "../../../components/Projects/Project Details/Project Details Tabs/Project Details SubTask Heading/commonSubTask";
import ScrollBar from "../../../components/scrollBar/scrollBar";
import SidebarButton from "../../../components/Projects/Project Details/Project Details Side Popup/Side Bar Popup Buttons/sidebarButtons";
import arrow from "../imgs/arrow.svg";
import file from "../imgs/file.svg";
import { updateUserLikePreConstruction } from "../../../services/user/updateUser";
import { getUserData } from "../../../services/user/getUser";

const ProjectDetails = ({ handleLikePlans, onCardClick }) => {
  const showToaster = useToaster();
  const navigate = useNavigate();
  const location = useLocation();
  const projectData = location.state?.projectData?.[0];

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Fixed missing state
  const sidebarRef = useRef(null);

  const handleFavoriteToggle = location.state?.handleFavoriteToggle;
  const [isLiked, setIsLiked] = useState(location.state?.isFavorite || false);

  useEffect(() => {
    // Cleanup session storage
    sessionStorage.removeItem("likedProjects");
  }, []);

  const handleFavoriteClick = () => {
    setIsLiked((prev) => !prev);
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteProjects")) || [];
    let updatedFavorites = isLiked
      ? storedFavorites.filter((item) => item.id !== projectData.id)
      : [...storedFavorites, projectData];

    localStorage.setItem("favoriteProjects", JSON.stringify(updatedFavorites));
    sessionStorage.setItem("likedProjectsUpdated", "true");
  };

  const [likePlansActive, setLikePlansActive] = useState(false);
  const handleLikeProject = async (projectId) => {
    // e.stopPropagation();

    const userId = await localStorage.getItem("id");
    if (!userId) {
      showToaster("User not found", "error");
      return;
    }

    console.log(projectId);
    const newLikedState = !isLiked;
    setLikePlansActive(newLikedState);

    try {
      await updateUserLikePreConstruction({
        taskId: projectId,
        like: newLikedState,
        userId,
      });

      setIsLiked(newLikedState); // Only update state after a successful API call

      // let likedProjects = JSON.parse(localStorage.getItem("likedProjects")) || [];
      // if (newLikedState) {
      //   likedProjects.push(projectId);
      // } else {
      //   likedProjects = likedProjects.filter(id => id !== projectId);
      // }

      // localStorage.setItem("likedProjects", JSON.stringify(likedProjects));

      showToaster(
        newLikedState ? "Project Bookmarked" : "Project Unbookmarked",
        "success"
      );
    } catch (error) {
      console.error("Error updating like state:", error);
      showToaster("An error occurred. Please try again.", "error");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const projectNumber = projectData?.data?.name?.match(/\d+/)?.[0] || null;
  const OwnerEmail = projectData?.data?.custom_fields?.find(
    (field) => field?.name === "Contact Email"
  )?.value;

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(OwnerEmail);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarVisible(false);
        setIsPopupVisible(false);
      }
    };

    if (isSidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarVisible]);

  useEffect(() => {
    if (!isSidebarVisible) {
      setIsPopupVisible(false);
    }
  }, [isSidebarVisible]);

  const [userId] = useState(localStorage.getItem("id") || null);
  useEffect(() => {
    if (userId) {
      getUserData({ userId })
        .then((response) => {
          // console.log(response.data.data.likedProjects);
          if (
            response.data.data.likedProjects.includes(projectData?.data?.id)
          ) {
            setIsLiked(true);
            setLikePlansActive(true);
          } else {
            setIsLiked(false);
            setLikePlansActive(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (!projectData) {
      navigate("/projects", { replace: true });
    }
  }, [projectData, navigate]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.layoutContainer}>
        {!isSidebarVisible && (
          <button className={styles.filesToggleButton} onClick={toggleSidebar}>
            {/* <img src={arrow} alt="file arrow button" /> */}
            <svg
              width="51"
              height="67"
              viewBox="0 0 51 67"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="67" height="67" rx="12" fill="black" />
              <path
                d="M30.7804 46.1528L17.7181 34.9594C17.5077 34.779 17.3387 34.5552 17.2229 34.3034C17.1071 34.0515 17.0472 33.7776 17.0472 33.5004C17.0472 33.2232 17.1071 32.9493 17.2229 32.6975C17.3387 32.4456 17.5077 32.2218 17.7181 32.0414L30.7804 20.8481C32.0272 19.7798 33.9531 20.6655 33.9531 22.3071L33.9531 44.6969C33.9531 46.3385 32.0272 47.2242 30.7804 46.1528Z"
                fill="white"
              />
            </svg>
          </button>
        )}

        <PageSetup
          likePlansActive={likePlansActive}
          active={"Pre-Construction"}
          appBar={true}
          projectDetailsSidebar={true}
          handleLikePlans={() => {
            handleLikeProject(projectData?.data?.id);
          }}
          projectNumber={projectNumber}
        >
          <div className={styles.fileButtonContainer}>
            <div className={styles.fileButton} onClick={toggleSidebar}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9452 4.15109L13.1787 0.587734C12.7781 0.208711 12.2537 0 11.7022 0H4.53125C3.3466 0 2.38281 0.963789 2.38281 2.14844V17.8516C2.38281 19.0362 3.3466 20 4.53125 20H15.4688C16.6534 20 17.6172 19.0362 17.6172 17.8516V5.7118C17.6172 5.12395 17.3723 4.55508 16.9452 4.15109ZM15.8071 4.6875H12.8906C12.7829 4.6875 12.6953 4.59988 12.6953 4.49219V1.74359L15.8071 4.6875ZM15.4688 18.8281H4.53125C3.99277 18.8281 3.55469 18.39 3.55469 17.8516V2.14844C3.55469 1.60996 3.99277 1.17188 4.53125 1.17188H11.5234V4.49219C11.5234 5.24605 12.1368 5.85938 12.8906 5.85938H16.4453V17.8516C16.4453 18.39 16.0072 18.8281 15.4688 18.8281Z" fill="black"/>
<path d="M14.1797 7.8125H5.58594C5.26234 7.8125 5 8.07484 5 8.39844C5 8.72203 5.26234 8.98438 5.58594 8.98438H14.1797C14.5033 8.98438 14.7656 8.72203 14.7656 8.39844C14.7656 8.07484 14.5033 7.8125 14.1797 7.8125Z" fill="black"/>
<path d="M14.1797 10.9375H5.58594C5.26234 10.9375 5 11.1998 5 11.5234C5 11.847 5.26234 12.1094 5.58594 12.1094H14.1797C14.5033 12.1094 14.7656 11.847 14.7656 11.5234C14.7656 11.1998 14.5033 10.9375 14.1797 10.9375Z" fill="black"/>
<path d="M8.42656 14.0625H5.58594C5.26234 14.0625 5 14.3248 5 14.6484C5 14.972 5.26234 15.2344 5.58594 15.2344H8.42656C8.75016 15.2344 9.0125 14.972 9.0125 14.6484C9.0125 14.3248 8.75016 14.0625 8.42656 14.0625Z" fill="black"/>
</svg>

            </div>

            <div
              className={styles.fileButton}
              onClick={() => {
                handleLikeProject(projectData?.data?.id);
                // sessionStorage.setItem("likedProjects", true);
                // navigate("/projects");
              }}
            >
              
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path style={{ fill: likePlansActive && "black" }} d="M15.75 6.1875C15.75 4.32375 14.1758 2.8125 12.234 2.8125C10.7828 2.8125 9.53625 3.657 9 4.86225C8.46375 3.657 7.21725 2.8125 5.76525 2.8125C3.825 2.8125 2.25 4.32375 2.25 6.1875C2.25 11.6025 9 15.1875 9 15.1875C9 15.1875 15.75 11.6025 15.75 6.1875Z" stroke="#1E293B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
          </div>

          <ScrollBar>
            <div className={styles.superContainer} onClick={handleCardClick}>
              <div className={styles.newDiv}>
                <div className={styles.contentContainer}>
                  <div className={styles.leftColumn}>
                    <Address data={[projectData]} />
                    <OwnerDetails data={[projectData?.data]} />
                  </div>

                  <div className={styles.rightColumn}>
                    <Contractors data={[projectData]} />
                  </div>
                </div>

                <div className={styles.subTaskContainer}>
                  <CommonSubTasks
                    data={[projectData]}
                    stage={location.state?.stage}
                  />
                </div>
              </div>
            </div>
          </ScrollBar>
        </PageSetup>

        {isSidebarVisible && (
          <div className={styles.dimOverlay} onClick={toggleSidebar}>
            <div
              className={styles.sidebarButtonContainerLeft}
              ref={sidebarRef}
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarButton
                onClose={() => setIsSidebarVisible(false)}
                projectNumber={projectNumber}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
