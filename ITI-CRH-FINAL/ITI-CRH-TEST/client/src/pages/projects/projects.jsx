// import React, { useState, useEffect, useRef, useMemo } from "react";
// import styles from "../projects/projects.module.css";
// import PageSetup from "../../components/Container/pageSetup/pageSetup";
// import BASEURL from "../../const/const";
// import ProjectCard from "../../components/Projects/Project Cards/projectCards";
// import StatusFilter from "../../components/Container/projectsModule/statusFilter/statusFilter";
// import ScrollBar from "../../components/scrollBar/scrollBar";
// import { useNavigate } from "react-router-dom";
// import BelowAppBarMobile from "../../components/belowAppBarMobile/belowAppBarMobile";
// import statusArrow from "./imgs/statusArrow.svg";

// const Projects = () => {
//   const [cardData, setCardData] = useState([]);
//   const [completedProjects, setCompletedProjects] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showStatusFilter, setShowStatusFilter] = useState(false);
//   const dropdownRef = useRef(null);
//   const popupRef = useRef(null);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const navigate = useNavigate();
//   const [favorites, setFavorites] = useState(new Set());
//   const [likedProjects, setLikedProjects] = useState([]);

//   const [selectedStatus, setSelectedStatus] = useState(
//     () => localStorage.getItem("selectedStatus") || "In Progress"
//   );

//   const [likePlansActive, setLikePlansActive] = useState(
//     JSON.parse(localStorage.getItem("likedPlansActive")) || false
//   );

//   useEffect(() => {
//     setLikedProjects(JSON.parse(sessionStorage.getItem("likedProjects")) || []);
//     sessionStorage.removeItem("likedProjects");
//   }, []);

//   useEffect(() => {
//     setFavorites(JSON.parse(localStorage.getItem("favoriteProjects")) || []);
//   }, [likePlansActive]);

//   useEffect(() => {
//     localStorage.setItem("selectedStatus", selectedStatus);
//   }, [selectedStatus]);

//   const handleCardClick = (item) => {
//     setSelectedProject(item);
//     navigate("/projectDetails", {
//       state: {
//         projectData: [item],
//         likePlansActive: likePlansActive,
//       },
//     });
//   };

//   useEffect(() => {
//     const fetchAllProjects = async () => {
//       try {
//         const [projectsRes, completedRes] = await Promise.all([
//           fetch(`${BASEURL}/api/get/projects`),
//           fetch(`${BASEURL}/api/get/completed-tasks`),
//         ]);

//         if (!projectsRes.ok || !completedRes.ok) {
//           throw new Error("Error fetching data");
//         }

//         const [projects, completed] = await Promise.all([
//           projectsRes.json(),
//           completedRes.json(),
//         ]);

//         setCardData(projects);
//         setCompletedProjects(completed);
//       } catch (err) {
//         console.error("Error fetching projects:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllProjects();
//   }, []);

//   useEffect(() => {
//     if (loading) return; // Ensure data fetching is completed before filtering

//     let filtered = [];
//     if (selectedStatus === "All") {
//       filtered = [...cardData, ...completedProjects];
//     } else if (selectedStatus.toLowerCase() === "completed") {
//       filtered = completedProjects;
//     } else {
//       filtered = cardData.filter(
//         (item) =>
//           item?.data?.status?.status?.toLowerCase() ===
//           selectedStatus.toLowerCase()
//       );
//     }

//     // Ensure consistent structure
//     setFilteredData(filtered.map(item => ({ ...item, type: "project" })));
//   }, [selectedStatus, cardData, completedProjects, loading]);

// const filteredProjects = useMemo(() => {
//   return favorites.length > 0 ? favorites : filteredData;
// }, [favorites, filteredData]);

//   const [noLikedData, setLikedData] = useState(false)

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (popupRef.current && !popupRef.current.contains(event.target) &&
//           dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowStatusFilter(false);
//       }
//     }

//     if (showStatusFilter) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showStatusFilter]);

//   return (
//     <div className={styles.mainContainer}>
//       <PageSetup active={"projects"} appBar={true}>
//         <div className={styles.projectContainer}>
//           <div className={styles.projectHeader}>
//             <div className={styles.projectDiv}>Pre-Construction</div>

// <div
//   ref={dropdownRef}
//   className={styles.statusDropdown}
//   onClick={() => setShowStatusFilter((prev) => !prev)}
// >
//   Status
//   <span className={styles.dropdownArrow}>
//     <img
//       src={statusArrow}
//       alt="status arrow"
//       className={showStatusFilter ? styles.rotate : ""}
//     />
//   </span>
// </div>

//           </div>
//           <BelowAppBarMobile
//             setFilterPopUpState={setShowStatusFilter}
//             handleLikePlans={() => setLikePlansActive(!likePlansActive)}
//             likePlansActive={likePlansActive}
//           />
// <ScrollBar>
//   <div className={styles.mainCards}>
//     {loading ? null : filteredProjects.length === 0 ? (
//       <div className={styles.noCardsMessage}>These cards are not available.</div>
//     ) : (

//       (likePlansActive && noLikedData) ?
//       <div>
//         No Pre Construction yet! Start liking  Pre Construction to see them here
//       </div>
//       :
//       <div className={styles.cardsRow}>
//         {filteredProjects.map((item, index) => (
//           <div
//             key={index}
//             className={styles.projectCard}
//             onClick={() => handleCardClick(item)}
//           >
//             <ProjectCard likePlansActive={likePlansActive} setLikedData={setLikedData} data={[item?.data]} />
//           </div>
//         ))}
//       </div>

// //       <div className={styles.cardsRow}>
// //   {filteredProjects.map((item, index) => (

// //     <ProjectCard
// //       key={index}
// //       likePlansActive={likePlansActive}
// //       setLikedData={setLikedData}
// //       data={[item?.data]}
// //       onClick={() => handleCardClick(item)}
// //     />

// //   ))}
// // </div>

//     )}
//   </div>
// </ScrollBar>

//         </div>
//         {showStatusFilter && (
//           <>
//             <div className={styles.overlay}></div>
//             <div ref={popupRef} className={styles.statusFilterPopup}>
//               <StatusFilter
//                 setSelectedStatus={setSelectedStatus}
//                 closePopup={() => setShowStatusFilter(false)}
//               />
//             </div>
//           </>
//         )}
//       </PageSetup>
//     </div>
//   );
// };

// export default Projects;

// import React, { useState, useEffect, useRef, useMemo, use } from "react";
// import styles from "../projects/projects.module.css";
// import PageSetup from "../../components/Container/pageSetup/pageSetup";
// import BASEURL from "../../const/const";
// import ProjectCard from "../../components/Projects/Project Cards/projectCards";
// import StatusFilter from "../../components/Container/projectsModule/statusFilter/statusFilter";
// import ScrollBar from "../../components/scrollBar/scrollBar";
// import { useNavigate } from "react-router-dom";
// import BelowAppBarMobile from "../../components/belowAppBarMobile/belowAppBarMobile";
// import statusArrow from "./imgs/statusArrow.svg";
// import { getUserData } from "../../services/user/getUser";
// import BuildingLoader from "../../components/loader/loader";

// import { useToaster } from "../../Toaster";

// const Projects = () => {
//   const setToast = useToaster();
//   const [cardData, setCardData] = useState([]);
//   const [completedProjects, setCompletedProjects] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showStatusFilter, setShowStatusFilter] = useState(false);
//   const dropdownRef = useRef(null);
//   const popupRef = useRef(null);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const navigate = useNavigate();
//   const [favorites, setFavorites] = useState(new Set());
//   const [likedProjects, setLikedProjects] = useState([]);
//   const [filteredProjectCard, setFilteredProjectCard] = useState([]);
//   const [userEmail, setUserEmail] = useState(null);
//   const [projects, setProjects] = useState([]);

//   const [selectedStatus, setSelectedStatus] = useState(
//     () => localStorage.getItem("selectedStatus") || "In Progress"
//   );

//   const [likePlansActive, setLikePlansActive] = useState(
//     JSON.parse(sessionStorage.getItem("likedProjects")) || false
//   );

//   useEffect(() => {
//     setLikedProjects(JSON.parse(sessionStorage.getItem("likedProjects")) || []);
//     sessionStorage.removeItem("likedProjects");
//   }, []);

//   useEffect(() => {
//     setFavorites(JSON.parse(localStorage.getItem("favoriteProjects")) || []);
//   }, [likePlansActive]);

//   useEffect(() => {
//     localStorage.setItem("selectedStatus", selectedStatus);
//   }, [selectedStatus]);

//   const handleCardClick = (item, stage) => {
//     setSelectedProject(item);
//     // console.log("Selected Project Card Stage:", stage);
//     navigate("/projectDetails", {
//       state: {
//         projectData: [item],
//         likePlansActive: likePlansActive,
//         stage,
//       },
//     });
//   };

//   const handleOwnerEmail = (email) => {

//     setUserEmail(email);
//   };

// // console.log("data", data)
//   useEffect(() => {
//     const fetchUserEmail = async () => {
//       const userId = localStorage.getItem("id");

//       if (!userId) {
//         console.warn("User ID is missing in localStorage.");
//         return;
//       }

//       try {
//         const response = await getUserData({ userId }); // Fetch user data
//         const fetchedEmail = response?.data?.data?.email; // Extract email

//         if (fetchedEmail) {
//           // console.log("User Email Retrieved:", fetchedEmail);
//           setUserEmail(fetchedEmail); // Store in state
//         } else {
//           console.error("Email not found in API response:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching user email:", error);
//       }
//     };

//     fetchUserEmail(); // Fetch when component mounts
//   }, []);

//   useEffect(() => {
//     if (!userEmail) return;

//     const filtered = cardData.filter((project) => project?.OwnerEmail === userEmail);
//     setFilteredProjectCard(filtered);
//   }, [cardData, userEmail]);

//   const [userId, setUserId] = useState(localStorage.getItem("id") || null)

//   useEffect(() => {
//     const fetchAllProjects = async () => {
//       try {
//         const [projectsRes, completedRes] = await Promise.all([
//           fetch(`${BASEURL}/api/get/projects/${userId}`),
//           fetch(`${BASEURL}/api/get/completed-tasks/${userId}`),
//         ]);

//         if (!projectsRes.ok || !completedRes.ok) {
//           throw new Error("Error fetching data");
//         }

//         const [projects, completed] = await Promise.all([
//           projectsRes.json(),
//           completedRes.json(),
//         ]);

//         setCardData(projects);
//         setCompletedProjects(completed);
//       } catch (err) {
//         console.error("Error fetching projects:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if(userId){
//       fetchAllProjects();
//     }else{
//       setToast("Please Login Again","error")
//       navigate('/signin')
//       return
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (!userEmail) return;
//     const filtered = projects.filter((project) => project?.OwnerEmail === userEmail);
//     // console.log("Filtered Projects:", filtered);
//     setFilteredProjectCard(filtered);
//   }, [projects, userEmail]);

//   // console.log("Filtered Project Card:", filteredProjectCard);

//   useEffect(() => {
//     if (loading) return; // Ensure data fetching is completed before filtering

//     let filtered = [];
//     if (selectedStatus === "All") {
//       filtered = [...cardData, ...completedProjects];
//     } else if (selectedStatus.toLowerCase() === "completed") {
//       filtered = completedProjects;
//     } else {
//       filtered = cardData.filter(
//         (item) =>
//           item?.data?.status?.status?.toLowerCase() ===
//           selectedStatus.toLowerCase()
//       );
//     }

//     // Ensure consistent structure
//     setFilteredData(filtered.map(item => ({ ...item, type: "project" })));
//   }, [selectedStatus, cardData, completedProjects, loading]);

//   const filteredProjects = useMemo(() => {
//     return favorites.length > 0 ? favorites : filteredData;
//   }, [favorites, filteredData]);
//   // console.log("Filtered Projects:", filteredProjects);

//   const [noLikedData, setLikedData] = useState(false)

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (popupRef.current && !popupRef.current.contains(event.target) &&
//         dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowStatusFilter(false);
//       }
//     }

//     if (showStatusFilter) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showStatusFilter]);

// // console.log("Filtered Project Card:", filteredProjectCard);
// // console.log("projects:", projects);
// // console.log("Filtered Project:", filteredProjects);

//   return (
//     <div className={styles.mainContainer}>
//         <PageSetup active={"projects"} appBar={true} handleLikePlans={() => setLikePlansActive(!likePlansActive)}     likePlansActive={likePlansActive}>
//         <div className={styles.projectContainer}>
//           <div className={styles.projectHeader}>
//             <div className={styles.projectDiv}>Pre-Construction</div>

//             <div
//               ref={dropdownRef}
//               className={styles.statusDropdown}
//               onClick={() => setShowStatusFilter((prev) => !prev)}
//             >
//               Status
//               <span className={styles.dropdownArrow}>
//                 <img
//                   src={statusArrow}
//                   alt="status arrow"
//                   className={showStatusFilter ? styles.rotate : ""}
//                 />
//               </span>
//             </div>

//           </div>
//           <BelowAppBarMobile
//             setFilterPopUpState={setShowStatusFilter}
//             handleLikePlans={() => setLikePlansActive(!likePlansActive)}
//             likePlansActive={likePlansActive}
//           />

// {loading ? (
//             <BuildingLoader loaderValue={true} height="70vh" width="100%" marginTop="0px" />
//           ) : (
//           <ScrollBar>
//             <div className={styles.mainCards}>
//               {loading ? null :filteredProjects.length === 0 ? (
//                 <div className={styles.noCardsMessage}>These cards are not available.</div>
//               ) : (

//                 (likePlansActive && noLikedData) ?
//                   <div>
//                     No Pre Construction yet! Start liking  Pre Construction to see them here
//                   </div>
//                   :

//                   <div className={styles.cardsRow}>
//                     {filteredProjects.map((item, index) => (
//                       <div key={index} className={styles.projectCard}>
//                         <ProjectCard likePlansActive={likePlansActive} setLikedData={setLikedData} data={[item?.data]} sendOwnerEmail={handleOwnerEmail} onCardClick={(stage) => handleCardClick(item, stage)} />

//                       </div>
//                     ))}
//                   </div>

//               )}
//             </div>
//           </ScrollBar>
//      )}
//         </div>
//         {showStatusFilter && (
//           <>
//             <div className={styles.overlay}></div>
//             <div ref={popupRef} className={styles.statusFilterPopup}>
//               <StatusFilter
//                 setSelectedStatus={setSelectedStatus}
//                 closePopup={() => setShowStatusFilter(false)}
//               />
//             </div>
//           </>
//         )}
//       </PageSetup>
//     </div>
//   );
// };

// export default Projects;

// import React, { useState, useEffect, useRef, useMemo, use } from "react";
// import styles from "../projects/projects.module.css";
// import PageSetup from "../../components/Container/pageSetup/pageSetup";
// import BASEURL from "../../const/const";
// import ProjectCard from "../../components/Projects/Project Cards/projectCards";
// import StatusFilter from "../../components/Container/projectsModule/statusFilter/statusFilter";
// import ScrollBar from "../../components/scrollBar/scrollBar";
// import { useNavigate } from "react-router-dom";
// import BelowAppBarMobile from "../../components/belowAppBarMobile/belowAppBarMobile";
// import statusArrow from "./imgs/statusArrow.svg";
// import { getUserData } from "../../services/user/getUser";
// import BuildingLoader from "../../components/loader/loader";

// import { useToaster } from "../../Toaster";

// const Projects = () => {
//   const setToast = useToaster();
//   const [cardData, setCardData] = useState([]);
//   const [completedProjects, setCompletedProjects] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showStatusFilter, setShowStatusFilter] = useState(false);
//   const dropdownRef = useRef(null);
//   const popupRef = useRef(null);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const navigate = useNavigate();
//   const [favorites, setFavorites] = useState(new Set());
//   const [likedProjects, setLikedProjects] = useState([]);
//   const [filteredProjectCard, setFilteredProjectCard] = useState([]);
//   const [userEmail, setUserEmail] = useState(null);
//   const [projects, setProjects] = useState([]);

//   const [selectedStatus, setSelectedStatus] = useState(
//     () => localStorage.getItem("selectedStatus") || "In Progress"
//   );

//   const [likePlansActive, setLikePlansActive] = useState(
//     JSON.parse(sessionStorage.getItem("likedProjects")) || false
//   );

//   useEffect(() => {
//     setLikedProjects(JSON.parse(sessionStorage.getItem("likedProjects")) || []);
//     sessionStorage.removeItem("likedProjects");
//   }, []);

//   useEffect(() => {
//     setFavorites(JSON.parse(localStorage.getItem("favoriteProjects")) || []);
//   }, [likePlansActive]);

//   useEffect(() => {
//     localStorage.setItem("selectedStatus", selectedStatus);
//   }, [selectedStatus]);

//   const handleCardClick = (item, stage) => {
//     setSelectedProject(item);
//     // console.log("Selected Project Card Stage:", stage);
//     navigate("/projectDetails", {
//       state: {
//         projectData: [item],
//         likePlansActive: likePlansActive,
//         stage,
//       },
//     });
//   };

//   const handleOwnerEmail = (email) => {

//     setUserEmail(email);
//   };

// // console.log("data", data)
//   useEffect(() => {
//     const fetchUserAccountType = async () => {
//       const userId = localStorage.getItem("id");

//       if (!userId) {
//         console.warn("User ID is missing in localStorage.");
//         return;
//       }

//       try {
//         const response = await getUserData({ userId });
//         const fetchedAccountType = response?.data?.data?.accountType;

//         if (fetchedAccountType) {
//           console.log("User AccountType Retrieved:", fetchedAccountType);
//           setUserEmail(fetchedAccountType);
//         } else {
//           console.error("Email not found in API response:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching user email:", error);
//       }
//     };

//     fetchUserAccountType();
//   }, []);

//   useEffect(() => {
//     if (!userEmail) return;

//     const filtered = cardData.filter((project) => project?.OwnerEmail === userEmail);
//     setFilteredProjectCard(filtered);
//   }, [cardData, userEmail]);

//   // console.log("Filtered Project Card:", cardData);

//   const [userId, setUserId] = useState(localStorage.getItem("id") || null)

//   useEffect(() => {
//     const fetchAllProjects = async () => {
//       try {
//         const [projectsRes, completedRes] = await Promise.all([
//           fetch(`${BASEURL}/api/get/projects/${userId}`),
//           fetch(`${BASEURL}/api/get/completed-tasks/${userId}`),
//         ]);

//         if (!projectsRes.ok || !completedRes.ok) {
//           throw new Error("Error fetching data");
//         }

//         const [projects, completed] = await Promise.all([
//           projectsRes.json(),
//           completedRes.json(),
//         ]);

//         setCardData(projects);
//         setCompletedProjects(completed);
//       } catch (err) {
//         console.error("Error fetching projects:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if(userId){
//       fetchAllProjects();
//     }else{
//       setToast("Please Login Again","error")
//       navigate('/signin')
//       return
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (!userEmail) return;
//     const filtered = projects.filter((project) => project?.OwnerEmail === userEmail);
//     // console.log("Filtered Projects:", filtered);
//     setFilteredProjectCard(filtered);
//   }, [projects, userEmail]);

//   // console.log("Filtered Project Card:", filteredProjectCard);

//   // console.log("Completed Tasks Response:", completed);

//   useEffect(() => {
//     if (loading) return; // Ensure data fetching is completed before filtering

//     let filtered = [];
//     if (selectedStatus === "All") {
//       filtered = [...cardData, ...completedProjects];
//     } else if (selectedStatus.toLowerCase() === "completed") {
//       filtered = completedProjects;
//     } else {
//       filtered = cardData.filter(
//         (item) =>
//           item?.data?.status?.status?.toLowerCase() ===
//           selectedStatus.toLowerCase()
//       );
//     }

//     // Ensure consistent structure
//     setFilteredData(filtered.map(item => ({ ...item, type: "project" })));
//   }, [selectedStatus, cardData, completedProjects, loading]);

// // console.log("filteredData", filteredData);

//   // const filteredProjects = useMemo(() => {
//   //   return favorites.length > 0 ? favorites : filteredData;
//   // }, [favorites, filteredData]);
//   // console.log("Filtered Projects:", filteredProjects);

//   const filteredProjects = useMemo(() => {
//     if (!userEmail) return [];

//     return (favorites.length > 0 ? favorites : filteredData).filter(project => {
//       const projectAccountType = project?.data?.custom_fields?.[1]?.value?.[0]?.name;
//   console.log("Filtered Projects:", projectAccountType);

//       return projectAccountType === userEmail;
//     });
//   }, [favorites, filteredData, userEmail]);

//   // console.log("Filtered Project:", filteredProjects?.[0]?.data?.custom_fields?.[1]?.value?.[0]?.name);

//   const [noLikedData, setLikedData] = useState(false)

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (popupRef.current && !popupRef.current.contains(event.target) &&
//         dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowStatusFilter(false);
//       }
//     }

//     if (showStatusFilter) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showStatusFilter]);

// // console.log("Filtered Project Card:", filteredProjectCard);
// // console.log("projects:", projects);
// // console.log("Filtered Project:", filteredProjects);

// // console.log("Filtered Project:", filteredProjects?.[0]?.data?.custom_fields?.[1]?.value?.[0]?.name);

// // console.log("Projects Response:", projects);

//   return (
//     <div className={styles.mainContainer}>
//         <PageSetup active={"projects"} appBar={true} handleLikePlans={() => setLikePlansActive(!likePlansActive)}     likePlansActive={likePlansActive}>
//         <div className={styles.projectContainer}>
//           <div className={styles.projectHeader}>
//             <div className={styles.projectDiv}>Pre-Construction</div>

//             <div
//               ref={dropdownRef}
//               className={styles.statusDropdown}
//               onClick={() => setShowStatusFilter((prev) => !prev)}
//             >
//               Status
//               <span className={styles.dropdownArrow}>
//                 <img
//                   src={statusArrow}
//                   alt="status arrow"
//                   className={showStatusFilter ? styles.rotate : ""}
//                 />
//               </span>
//             </div>

//           </div>
//           <BelowAppBarMobile
//             setFilterPopUpState={setShowStatusFilter}
//             handleLikePlans={() => setLikePlansActive(!likePlansActive)}
//             likePlansActive={likePlansActive}
//           />

// {loading ? (
//             <BuildingLoader loaderValue={true} height="70vh" width="100%" marginTop="0px" />
//           ) : (
//           <ScrollBar>
//             <div className={styles.mainCards}>
//               {loading ? null :filteredProjects.length === 0 ? (
//                 <div className={styles.noCardsMessage}>These cards are not available.</div>
//               ) : (

//                 (likePlansActive && noLikedData) ?
//                   <div>
//                     No Pre Construction yet! Start liking  Pre Construction to see them here
//                   </div>
//                   :

//                   <div className={styles.cardsRow}>
//                     {filteredProjects.map((item, index) => (
//                       <div key={index} className={styles.projectCard}>
//                         <ProjectCard likePlansActive={likePlansActive} setLikedData={setLikedData} data={[item?.data]} sendOwnerEmail={handleOwnerEmail} onCardClick={(stage) => handleCardClick(item, stage)} />

//                       </div>
//                     ))}
//                   </div>

//               )}
//             </div>
//           </ScrollBar>
//      )}
//         </div>
//         {showStatusFilter && (
//           <>
//             <div className={styles.overlay}></div>
//             <div ref={popupRef} className={styles.statusFilterPopup}>
//               <StatusFilter
//                 setSelectedStatus={setSelectedStatus}
//                 closePopup={() => setShowStatusFilter(false)}
//               />
//             </div>
//           </>
//         )}
//       </PageSetup>
//     </div>
//   );
// };

// export default Projects;

// import React, { useState, useEffect, useRef, useMemo, use } from "react";
// import styles from "../projects/projects.module.css";
// import PageSetup from "../../components/Container/pageSetup/pageSetup";
// import BASEURL from "../../const/const";
// import ProjectCard from "../../components/Projects/Project Cards/projectCards";
// import StatusFilter from "../../components/Container/projectsModule/statusFilter/statusFilter";
// import ScrollBar from "../../components/scrollBar/scrollBar";
// import { useNavigate } from "react-router-dom";
// import BelowAppBarMobile from "../../components/belowAppBarMobile/belowAppBarMobile";
// import statusArrow from "./imgs/statusArrow.svg";
// import { getUserData } from "../../services/user/getUser";
// import BuildingLoader from "../../components/loader/loader";

// import { useToaster } from "../../Toaster";

// const Projects = () => {
//   const setToast = useToaster();
//   const [cardData, setCardData] = useState([]);
//   const [completedProjects, setCompletedProjects] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showStatusFilter, setShowStatusFilter] = useState(false);
//   const dropdownRef = useRef(null);
//   const popupRef = useRef(null);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const navigate = useNavigate();
//   const [favorites, setFavorites] = useState(new Set());
//   const [likedProjects, setLikedProjects] = useState([]);
//   const [filteredProjectCard, setFilteredProjectCard] = useState([]);
//   const [userEmail, setUserEmail] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [selectedStatus, setSelectedStatus] = useState(
//     () => localStorage.getItem("selectedStatus") || "In Progress"
//   );

//   const [likePlansActive, setLikePlansActive] = useState(
//     JSON.parse(sessionStorage.getItem("likedProjects")) || false
//   );

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredProjects = useMemo(() => {
//     let projectsToShow = favorites.length > 0 ? favorites : filteredData;

//     if (searchQuery.trim()) {
//       projectsToShow = projectsToShow.filter((project) =>
//         project?.data?.title?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     return projectsToShow;
//   }, [favorites, filteredData, searchQuery]);

//   useEffect(() => {
//     setLikedProjects(JSON.parse(sessionStorage.getItem("likedProjects")) || []);
//     sessionStorage.removeItem("likedProjects");
//   }, []);

//   useEffect(() => {
//     setFavorites(JSON.parse(localStorage.getItem("favoriteProjects")) || []);
//   }, [likePlansActive]);

//   useEffect(() => {
//     localStorage.setItem("selectedStatus", selectedStatus);
//   }, [selectedStatus]);

//   const handleCardClick = (item, stage) => {
//     setSelectedProject(item);
//     // console.log("Selected Project Card Stage:", stage);
//     navigate("/projectDetails", {
//       state: {
//         projectData: [item],
//         likePlansActive: likePlansActive,
//         stage,
//       },
//     });
//   };

//   const handleOwnerEmail = (email) => {

//     setUserEmail(email);
//   };

// // console.log("data", data)
//   useEffect(() => {
//     const fetchUserAccountType = async () => {
//       const userId = localStorage.getItem("id");

//       if (!userId) {
//         console.warn("User ID is missing in localStorage.");
//         return;
//       }

//       try {
//         const response = await getUserData({ userId });
//         const fetchedAccountType = response?.data?.data?.accountType;

//         if (fetchedAccountType) {
//           console.log("User AccountType Retrieved:", fetchedAccountType);
//           setUserEmail(fetchedAccountType);
//         } else {
//           console.error("Email not found in API response:", response);
//         }
//       } catch (error) {
//         console.error("Error fetching user email:", error);
//       }
//     };

//     fetchUserAccountType();
//   }, []);

//   useEffect(() => {
//     if (!userEmail) return;

//     const filtered = cardData.filter((project) => project?.OwnerEmail === userEmail);
//     setFilteredProjectCard(filtered);
//   }, [cardData, userEmail]);

//   // console.log("Filtered Project Card:", cardData);

//   const [userId, setUserId] = useState(localStorage.getItem("id") || null)

//   useEffect(() => {
//     const fetchAllProjects = async () => {
//       try {
//         const [projectsRes, completedRes] = await Promise.all([
//           fetch(`${BASEURL}/api/get/projects/${userId}`),
//           fetch(`${BASEURL}/api/get/completed-tasks/${userId}`),
//         ]);

//         if (!projectsRes.ok || !completedRes.ok) {
//           throw new Error("Error fetching data");
//         }

//         const [projects, completed] = await Promise.all([
//           projectsRes.json(),
//           completedRes.json(),
//         ]);

//         setCardData(projects);
//         setCompletedProjects(completed);
//       } catch (err) {
//         console.error("Error fetching projects:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if(userId){
//       fetchAllProjects();
//     }else{
//       setToast("Please Login Again","error")
//       navigate('/signin')
//       return
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (!userEmail) return;
//     const filtered = projects.filter((project) => project?.OwnerEmail === userEmail);
//     // console.log("Filtered Projects:", filtered);
//     setFilteredProjectCard(filtered);
//   }, [projects, userEmail]);

//   // console.log("Filtered Project Card:", filteredProjectCard);

//   // console.log("Completed Tasks Response:", completed);

//   useEffect(() => {
//     if (loading) return; // Ensure data fetching is completed before filtering

//     let filtered = [];
//     if (selectedStatus === "All") {
//       filtered = [...cardData, ...completedProjects];
//     } else if (selectedStatus.toLowerCase() === "completed") {
//       filtered = completedProjects;
//     } else {
//       filtered = cardData.filter(
//         (item) =>
//           item?.data?.status?.status?.toLowerCase() ===
//           selectedStatus.toLowerCase()
//       );
//     }

//     // Ensure consistent structure
//     setFilteredData(filtered.map(item => ({ ...item, type: "project" })));
//   }, [selectedStatus, cardData, completedProjects, loading]);

// // console.log("filteredData", filteredData);

//   // const filteredProjects = useMemo(() => {
//   //   return favorites.length > 0 ? favorites : filteredData;
//   // }, [favorites, filteredData]);
//   // console.log("Filtered Projects:", filteredProjects);

//   const [noLikedData, setLikedData] = useState(false)

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (popupRef.current && !popupRef.current.contains(event.target) &&
//         dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowStatusFilter(false);
//       }
//     }

//     if (showStatusFilter) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showStatusFilter]);

// // console.log("Filtered Project Card:", filteredProjectCard);
// // console.log("projects:", projects);
// // console.log("Filtered Project:", filteredProjects);

// console.log("Filtered Project:", filteredProjects?.[0]?.data?.custom_fields?.[1]?.value?.[0]?.name);

// // console.log("Projects Response:", projects);

//   return (
//     <div className={styles.mainContainer}>
//         <PageSetup active={"projects"} appBar={true} handleLikePlans={() => setLikePlansActive(!likePlansActive)}     likePlansActive={likePlansActive}>
//         <div className={styles.projectContainer}>
//           <div className={styles.projectHeader}>
//             <div className={styles.projectDiv}>Pre-Construction</div>

//             <div
//               ref={dropdownRef}
//               className={styles.statusDropdown}
//               onClick={() => setShowStatusFilter((prev) => !prev)}
//             >
//               Status
//               <span className={styles.dropdownArrow}>
//                 <img
//                   src={statusArrow}
//                   alt="status arrow"
//                   className={showStatusFilter ? styles.rotate : ""}
//                 />
//               </span>
//             </div>

//           </div>
//           <BelowAppBarMobile
//             setFilterPopUpState={setShowStatusFilter}
//             handleLikePlans={() => setLikePlansActive(!likePlansActive)}
//             likePlansActive={likePlansActive}
//             searchValue={searchQuery}
//             handleSearchChange={handleSearchChange}
//           />

// {loading ? (
//             <BuildingLoader loaderValue={true} height="70vh" width="100%" marginTop="0px" />
//           ) : (
//           <ScrollBar>
//             <div className={styles.mainCards}>
//               {loading ? null :filteredProjects.length === 0 ? (
//                 <div className={styles.noCardsMessage}>These cards are not available.</div>
//               ) : (

//                 (likePlansActive && noLikedData) ?
//                   <div>
//                     No Pre Construction yet! Start liking  Pre Construction to see them here
//                   </div>
//                   :

//                   <div className={styles.cardsRow}>
//                     {filteredProjects.map((item, index) => (
//                       <div key={index} className={styles.projectCard}>
//                         <ProjectCard likePlansActive={likePlansActive} setLikedData={setLikedData} data={[item?.data]} sendOwnerEmail={handleOwnerEmail} onCardClick={(stage) => handleCardClick(item, stage)} />

//                       </div>
//                     ))}
//                   </div>

//               )}
//             </div>
//           </ScrollBar>
//      )}
//         </div>
//         {showStatusFilter && (
//           <>
//             <div className={styles.overlay}></div>
//             <div ref={popupRef} className={styles.statusFilterPopup}>
//               <StatusFilter
//                 setSelectedStatus={setSelectedStatus}
//                 closePopup={() => setShowStatusFilter(false)}
//               />
//             </div>
//           </>
//         )}
//       </PageSetup>
//     </div>
//   );
// };

// export default Projects;












import React, { useState, useEffect, useRef, useMemo, use } from "react";
import styles from "../projects/projects.module.css";
import PageSetup from "../../components/Container/pageSetup/pageSetup";
import BASEURL from "../../const/const";
import ProjectCard from "../../components/Projects/Project Cards/projectCards";
import StatusFilter from "../../components/Container/projectsModule/statusFilter/statusFilter";
import ScrollBar from "../../components/scrollBar/scrollBar";
import { useNavigate } from "react-router-dom";
import BelowAppBarMobile from "../../components/belowAppBarMobile/belowAppBarMobile";
import statusArrow from "./imgs/statusArrow.svg";
import { getUserData } from "../../services/user/getUser";
import BuildingLoader from "../../components/loader/loader";

import { useToaster } from "../../Toaster";

const Projects = () => {
  const setToast = useToaster();
  const [cardData, setCardData] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const dropdownRef = useRef(null);
  const popupRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());
  const [likedProjects, setLikedProjects] = useState([]);
  const [filteredProjectCard, setFilteredProjectCard] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedStatus, setSelectedStatus] = useState(
    () => localStorage.getItem("selectedStatus") || "In Progress"
  );


  

  //   const [selectedStatus, setSelectedStatus] = useState("In Progress");

  // useEffect(() => {
  //   const storedStatus = localStorage.getItem("selectedStatus") || "In Progress";
  //   setSelectedStatus(storedStatus);
  // }, []);

  const [likePlansActive, setLikePlansActive] = useState(
    JSON.parse(sessionStorage.getItem("likedProjects")) || false
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProjects = useMemo(() => {
    let projectsToShow = favorites.length > 0 ? favorites : filteredData;

    // console.log(projectsToShow)
    if (searchQuery.trim()) {
      // console.log(projectsToShow?.[0]?.data?.name?.split("_")?.[2])
      projectsToShow = projectsToShow.filter((project) => 
      project?.data?.name?.split("_")?.[2]?.toLowerCase()?.includes(searchQuery.toLowerCase())
      );
    }

    return projectsToShow;
  }, [favorites, filteredData, searchQuery]);

  useEffect(() => {
    setLikedProjects(JSON.parse(sessionStorage.getItem("likedProjects")) || []);
    sessionStorage.removeItem("likedProjects");
  }, []);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favoriteProjects")) || []);
  }, [likePlansActive]);

  useEffect(() => {
    if (selectedStatus) {
      localStorage.setItem("selectedStatus", selectedStatus);
    }
  }, [selectedStatus]);

  const handleCardClick = (item, stage) => {
    setSelectedProject(item);
    // console.log("Selected Project Card Stage:", stage);
    navigate("/projectDetails", {
      state: {
        projectData: [item],
        likePlansActive: likePlansActive,
        stage,
      },
    });
  };

  const handleOwnerEmail = (email) => {
    setUserEmail(email);
  };

  // console.log("data", data)
  useEffect(() => {
    const fetchUserAccountType = async () => {
      const userId = localStorage.getItem("id");

      if (!userId) {
        console.warn("User ID is missing in localStorage.");
        return;
      }

      try {
        const response = await getUserData({ userId });
        const fetchedAccountType = response?.data?.data?.accountType;

        if (fetchedAccountType) {
          // console.log("User AccountType Retrieved:", fetchedAccountType);
          setUserEmail(fetchedAccountType);
        } else {
          console.error("Email not found in API response:", response);
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserAccountType();
  }, []);

  // useEffect(() => {
  //   if (!userEmail) return;
  //   console.log(cardData[0])
  //   const filtered = cardData.filter((project) => project?.OwnerEmail === userEmail);
  //   setFilteredProjectCard(filtered);
  // }, [cardData, userEmail]);

  // console.log("Filtered Project Card:", cardData);

  const [userId, setUserId] = useState(localStorage.getItem("id") || null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const [projectsRes, completedRes] = await Promise.all([
          fetch(`${BASEURL}/api/get/projects/${userId}`),
          fetch(`${BASEURL}/api/get/completed-tasks/${userId}`),
        ]);

        if (!projectsRes.ok || !completedRes.ok) {
          throw new Error("Error fetching data");
        }

        const [projects, completed] = await Promise.all([
          projectsRes.json(),
          completedRes.json(),
        ]);

        setCardData(projects);
        setCompletedProjects(completed);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAllProjects();
    } else {
      setToast("Please Login Again", "error");
      navigate("/signin");
      return;
    }
  }, [userId]);

  // useEffect(() => {
  //   if (loading) return; // Ensure data fetching is completed before filtering

  //   let filtered = [];
  //   if (selectedStatus === "All") {
  //     filtered = [...cardData, ...completedProjects];
  //   } else if (selectedStatus.toLowerCase() === "completed") {
  //     filtered = completedProjects;
  //   } else {
  //     filtered = cardData.filter(
  //       (item) =>
  // item?.data?.status?.status?.toLowerCase() ===
  // selectedStatus.toLowerCase()
  //     );
  //   }

  //   // Ensure consistent structure
  //   setFilteredData(filtered.map((item) => ({ ...item, type: "project" })));
  // }, [selectedStatus, cardData, completedProjects, loading]);

  useEffect(() => {
    if (loading) return;

    let filtered = [];

    if (selectedStatus === "All") {
      filtered = [...cardData, ...completedProjects];
    } else if (selectedStatus.toLowerCase() === "completed") {
      filtered = completedProjects;
    } else {
      filtered = cardData.filter(
        (item) =>
          item?.data?.status?.status?.toLowerCase() ===
          selectedStatus.toLowerCase()
      );
    }

    setFilteredData(filtered);
  }, [selectedStatus, cardData, completedProjects, loading]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status); // Ensure it's a string, not an array
  };


  
  // const filteredProjects = useMemo(() => {
  //   return favorites.length > 0 ? favorites : filteredData;
  // }, [favorites, filteredData]);

  const [noLikedData, setLikedData] = useState(false);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setShowStatusFilter(false);
      }
    };

    if (showStatusFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStatusFilter]);

  return (

    <div className={styles.mainContainer}>
      <PageSetup
        active={"projects"}
        appBar={true}
        handleLikePlans={() => setLikePlansActive(!likePlansActive)}
        likePlansActive={likePlansActive}
        searchValue={searchQuery}
        handleSearchChange={handleSearchChange}
      >
        <div className={styles.projectContainer}>
          <div className={styles.projectHeader}>
            <div className={styles.projectDiv}>Pre-Construction</div>

            <div
              ref={dropdownRef}
              className={styles.statusDropdown}
              onClick={() => setShowStatusFilter((prev) => !prev)}
            >
              Status
              <span className={styles.dropdownArrow}>
                <img
                  src={statusArrow}
                  alt="status arrow"
                  className={showStatusFilter ? styles.rotate : ""}
                />
              </span>
            </div>
          </div>

          <BelowAppBarMobile
            setFilterPopUpState={setShowStatusFilter}
            handleLikePlans={() => setLikePlansActive(!likePlansActive)}
            likePlansActive={likePlansActive}
            searchValue={searchQuery}
            handleSearchChange={handleSearchChange}
          />

          {loading ? (
            <BuildingLoader
              loaderValue={true}
              height="70vh"
              width="100%"
              marginTop="0px"
            />
          ) : (
            <ScrollBar>
              <div className={styles.mainCards}>
                {loading ? null : filteredProjects.length === 0 ? (
                  <div className={styles.noCardsMessage}>
                    These cards are not available.
                  </div>
                ) : (likePlansActive && noLikedData )? (
                  <div>
                    No Pre Construction yet! Start liking Pre Construction to
                    see them here
                  </div>
                ) : (
                  <div className={styles.cardsRow}>
                    {filteredProjects.map((item, index) => (
                      <div key={index} className={styles.projectCard}>
                        <ProjectCard
                          likePlansActive={likePlansActive}
                          setLikedData={setLikedData}
                          data={[item?.data]}
                          sendOwnerEmail={handleOwnerEmail}
                          onCardClick={(stage) => handleCardClick(item, stage)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollBar>
          )}
        </div>

        {showStatusFilter && (
          <div className={styles.overlay}>
            <div className={styles.statusFilterPopup} ref={popupRef}>
              <StatusFilter
                setSelectedStatus={setSelectedStatus}
                closePopup={() => setShowStatusFilter(false)}
              />
            </div>
          </div>
        )}
      </PageSetup>
    </div>
  );
};

export default Projects;
