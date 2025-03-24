// import React, { useEffect, useRef, useState } from "react";
// import styles from "./imgPopUp.module.css";
// import cx from "classnames";

// function ImgPopUp({ setImgPopUp, imag, right, left, setImg, attachments, planImages, planPopUp, facadePopUp }) {
//     const [currentIndex, setCurrentIndex] = useState(0); // Start with the first image
//     const [displayLeft, setDisplayLeft] = useState(false); // Show left arrow when appropriate
//     const [displayRight, setDisplayRight] = useState(false); // Show right arrow when appropriate
//     const popupRef = useRef(null);
//     const startX = useRef(0); // Starting X position of the touch
//     const endX = useRef(0); // Ending X position of the touch

//     // Update the left and right arrows' visibility based on the images
//     useEffect(() => {
//         if (planPopUp && planImages && planImages.length > 0) {
//             setDisplayLeft(currentIndex > 0);
//             setDisplayRight(currentIndex < planImages.length - 1);
//         } else if (facadePopUp && attachments && attachments.length > 0) {
//             setDisplayLeft(currentIndex > 0);
//             setDisplayRight(currentIndex < attachments.length - 1);
//         } else {
//             setDisplayLeft(false);
//             setDisplayRight(false);
//         }
//     }, [planPopUp, facadePopUp, currentIndex, planImages, attachments]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (popupRef.current && !popupRef.current.contains(event.target)) {
//                 setImgPopUp(false); // Close popup if clicked outside
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [setImgPopUp]);

//     const handleContextMenu = (e) => {
//         e.preventDefault(); // Prevent the right-click context menu
//     };

//     const handleTouchStart = (e) => {
//         startX.current = e.touches[0].clientX; // Record the starting X position
//     };

//     const handleTouchMove = (e) => {
//         endX.current = e.touches[0].clientX; // Update the ending X position
//     };

//     const handleTouchEnd = () => {
//         const deltaX = endX.current - startX.current; // Calculate the swipe distance

//         if (deltaX > 50) {
//             // Swipe Right
//             handlePrevious();
//         } else if (deltaX < -50) {
//             // Swipe Left
//             handleNext();
//         }

//         // Reset swipe values
//         startX.current = 0;
//         endX.current = 0;
//     };

//     const handleNext = () => {
//         if (planPopUp && planImages) {
//             if (currentIndex < planImages.length - 1) {
//                 setCurrentIndex((prevIndex) => prevIndex + 1);
//             }
//         } else if (facadePopUp && attachments) {
//             if (currentIndex < attachments.length - 1) {
//                 setCurrentIndex((prevIndex) => prevIndex + 1);
//             }
//         }
//     };

//     const handlePrevious = () => {
//         if (planPopUp && planImages) {
//             if (currentIndex > 0) {
//                 setCurrentIndex((prevIndex) => prevIndex - 1);
//             }
//         } else if (facadePopUp && attachments) {
//             if (currentIndex > 0) {
//                 setCurrentIndex((prevIndex) => prevIndex - 1);
//             }
//         }
//     };

//     const getImageSource = () => {
//         if (planPopUp && planImages && planImages.length > 0) {
//             return planImages[currentIndex]?.base64;
//         } else if (facadePopUp && attachments && attachments.length > 0) {
//             return attachments[currentIndex]?.thumbnail_large;
//         }
//         return "";
//     };

//     return (
//         <div className={styles.imgPopUp}>
//             <div
//                 ref={popupRef}
//                 className={cx(styles.imgDiv, facadePopUp && styles.imgDiv__Facade, planPopUp && styles.imgDiv__Plan)}
//                 style={{
//                     width:  '90%',
//                     height:  'max-content',
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//                 onTouchStart={handleTouchStart}
//                 onTouchMove={handleTouchMove}
//                 onTouchEnd={handleTouchEnd}
//             >
//                 <div
//                     style={{
//                         width: "100%",
//                         height: "100%",
//                         position: "relative",
//                     }}
//                 >
//                     <img
//                         src={getImageSource()}
//                         alt="ITI Buildings Project"
//                         className={styles.image}
//                         onContextMenu={handleContextMenu} // Disable right-click
//                         draggable={false}
//                     />
//                     <svg
//                         className={styles.close}
//                             onClick={(e) => {
//                             e.stopPropagation();
//                             setImgPopUp(false);
//                         }}
//                         onContextMenu={handleContextMenu}
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             d="M1.72102 22.2791C1.79068 22.3488 1.8734 22.4041 1.96444 22.4419C2.05549 22.4796 2.15309 22.4991 2.25165 22.4991C2.35021 22.4991 2.44781 22.4796 2.53885 22.4419C2.6299 22.4041 2.71262 22.3488 2.78227 22.2791L11.9998 13.0616L21.221 22.2791C21.3618 22.4198 21.5526 22.4989 21.7516 22.4989C21.9507 22.4989 22.1415 22.4198 22.2823 22.2791C22.423 22.1384 22.5021 21.9475 22.5021 21.7485C22.5021 21.5494 22.423 21.3586 22.2823 21.2178L13.061 12.0003L22.2785 2.77909C22.4193 2.63836 22.4983 2.44749 22.4983 2.24846C22.4983 2.04944 22.4193 1.85857 22.2785 1.71784C22.1378 1.57711 21.9469 1.49805 21.7479 1.49805C21.5489 1.49805 21.358 1.57711 21.2173 1.71784L11.9998 10.9391L2.77852 1.72159C2.63505 1.59872 2.45049 1.53451 2.26173 1.54181C2.07298 1.5491 1.89392 1.62735 1.76035 1.76092C1.62678 1.89449 1.54853 2.07354 1.54124 2.2623C1.53395 2.45106 1.59815 2.63561 1.72102 2.77909L10.9385 12.0003L1.72102 21.2216C1.58134 21.3621 1.50293 21.5522 1.50293 21.7503C1.50293 21.9485 1.58134 22.1386 1.72102 22.2791Z"
//                             fill="black"
//                         />
//                     </svg>
//                     {/* Left Arrow */}
//                     <div
//                         style={{
//                             display: displayLeft ? "flex" : "none", // Show left arrow only when there are images to navigate to the left
//                         }}
//                         onClick={handlePrevious}
//                         className={cx(styles.arrow, styles.leftArrow)}
//                     >
//                         <svg
//                             width="30"
//                             height="30"
//                             viewBox="0 0 30 30"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 clipRule="evenodd"
//                                 d="M9.10001 20.3508C8.92422 20.5264 8.68594 20.625 8.43751 20.625C8.18907 20.625 7.95079 20.5264 7.77501 20.3508L3.0875 15.6633C2.91194 15.4875 2.81333 15.2493 2.81333 15.0008C2.81333 14.7524 2.91194 14.5141 3.0875 14.3383L7.775 9.65082C7.86083 9.55872 7.96433 9.48484 8.07933 9.4336C8.19433 9.38236 8.31847 9.35481 8.44435 9.35259C8.57023 9.35037 8.69527 9.37352 8.812 9.42067C8.92873 9.46782 9.03478 9.538 9.1238 9.62703C9.21282 9.71605 9.28301 9.82209 9.33016 9.93883C9.37731 10.0556 9.40046 10.1806 9.39824 10.3065C9.39602 10.4324 9.36847 10.5565 9.31723 10.6715C9.26599 10.7865 9.19211 10.89 9.10001 10.9758L6.0125 14.0633L26.25 14.0633C26.4986 14.0633 26.7371 14.1621 26.9129 14.3379C27.0887 14.5137 27.1875 14.7522 27.1875 15.0008C27.1875 15.2495 27.0887 15.4879 26.9129 15.6637C26.7371 15.8396 26.4986 15.9383 26.25 15.9383L6.0125 15.9383L9.10001 19.0258C9.27557 19.2016 9.37418 19.4399 9.37418 19.6883C9.37418 19.9368 9.27557 20.175 9.10001 20.3508Z"
//                                 fill="white"
//                             />
//                         </svg>
//                     </div>

//                     {/* Right Arrow */}
//                     <div
//                         style={{
//                             display: displayRight ? "flex" : "none", // Show right arrow only when there are images to navigate to the right
//                         }}
//                         onClick={handleNext}
//                         className={cx(styles.arrow, styles.rightArrow)}
//                     >
//                         <svg
//                             width="30"
//                             height="30"
//                             viewBox="0 0 30 30"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 clipRule="evenodd"
//                                 d="M20.9 20.3508C21.0758 20.5264 21.3141 20.625 21.5625 20.625C21.8109 20.625 22.0492 20.5264 22.225 20.3508L26.9125 15.6633C27.0881 15.4875 27.1867 15.2493 27.1867 15.0008C27.1867 14.7524 27.0881 14.5141 26.9125 14.3383L22.225 9.65082C22.1392 9.55872 22.0357 9.48484 21.9207 9.4336C21.8057 9.38236 21.6815 9.35481 21.5556 9.35259C21.4298 9.35037 21.3047 9.37352 21.188 9.42067C21.0713 9.46782 20.9652 9.538 20.8762 9.62703C20.7872 9.71605 20.717 9.82209 20.6698 9.93883C20.6227 10.0556 20.5995 10.1806 20.6018 10.3065C20.604 10.4324 20.6315 10.5565 20.6828 10.6715C20.734 10.7865 20.8079 10.89 20.9 10.9758L23.9875 14.0633L3.75 14.0633C3.50136 14.0633 3.2629 14.1621 3.08709 14.3379C2.91127 14.5137 2.8125 14.7522 2.8125 15.0008C2.8125 15.2495 2.91127 15.4879 3.08709 15.6637C3.2629 15.8396 3.50136 15.9383 3.75 15.9383L23.9875 15.9383L20.9 19.0258C20.7244 19.2016 20.6258 19.4399 20.6258 19.6883C20.6258 19.9368 20.7244 20.175 20.9 20.3508Z"
//                                 fill="white"
//                             />
//                         </svg>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ImgPopUp;








// import React, { useEffect, useRef, useState } from "react";
// import styles from "./imgPopUp.module.css";
// import cx from "classnames";

// function ImgPopUp({ setImgPopUp, imag, right, left, setImg, attachments, planImages, planPopUp, facadePopUp }) {
//     const [currentIndex, setCurrentIndex] = useState(0); // Start with the first image
//     const [displayLeft, setDisplayLeft] = useState(false); // Show left arrow when appropriate
//     const [displayRight, setDisplayRight] = useState(false); // Show right arrow when appropriate
//     const popupRef = useRef(null);
//     const startX = useRef(0); // Starting X position of the touch
//     const endX = useRef(0); // Ending X position of the touch
//     const [zoomLevel, setZoomLevel] = useState(1); // Zoom level state

//     // Update the left and right arrows' visibility based on the images
//     useEffect(() => {
//         if (planPopUp && planImages && planImages.length > 0) {
//             setDisplayLeft(currentIndex > 0);
//             setDisplayRight(currentIndex < planImages.length - 1);
//         } else if (facadePopUp && attachments && attachments.length > 0) {
//             setDisplayLeft(currentIndex > 0);
//             setDisplayRight(currentIndex < attachments.length - 1);
//         } else {
//             setDisplayLeft(false);
//             setDisplayRight(false);
//         }
//     }, [planPopUp, facadePopUp, currentIndex, planImages, attachments]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (popupRef.current && !popupRef.current.contains(event.target)) {
//                 setImgPopUp(false); // Close popup if clicked outside
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [setImgPopUp]);

    // const handleContextMenu = (e) => {
    //     e.preventDefault(); // Prevent the right-click context menu
    // };

//     const handleTouchStart = (e) => {
//         startX.current = e.touches[0].clientX; // Record the starting X position
//     };

//     const handleTouchMove = (e) => {
//         endX.current = e.touches[0].clientX; // Update the ending X position
//     };

//     const handleTouchEnd = () => {
//         const deltaX = endX.current - startX.current; // Calculate the swipe distance

//         if (deltaX > 50) {
//             // Swipe Right
//             handlePrevious();
//         } else if (deltaX < -50) {
//             // Swipe Left
//             handleNext();
//         }

//         // Reset swipe values
//         startX.current = 0;
//         endX.current = 0;
//     };

//     const handleNext = () => {
//         if (planPopUp && planImages) {
//             if (currentIndex < planImages.length - 1) {
//                 setCurrentIndex((prevIndex) => prevIndex + 1);
//             }
//         } else if (facadePopUp && attachments) {
//             if (currentIndex < attachments.length - 1) {
//                 setCurrentIndex((prevIndex) => prevIndex + 1);
//             }
//         }
//     };

//     const handlePrevious = () => {
//         if (planPopUp && planImages) {
//             if (currentIndex > 0) {
//                 setCurrentIndex((prevIndex) => prevIndex - 1);
//             }
//         } else if (facadePopUp && attachments) {
//             if (currentIndex > 0) {
//                 setCurrentIndex((prevIndex) => prevIndex - 1);
//             }
//         }
//     };

//     const handleZoomIn = () => {
//         setZoomLevel((prev) => Math.min(prev + 0.2, 5)); // Max zoom level: 5
//     };

//     const handleZoomOut = () => {
//         setZoomLevel((prev) => Math.max(prev - 0.2, 1)); // Min zoom level: 1
//     };

//     const getImageSource = () => {
//         if (planPopUp && planImages && planImages.length > 0) {
//             return planImages[currentIndex]?.base64;
//         } else if (facadePopUp && attachments && attachments.length > 0) {
//             return attachments[currentIndex]?.thumbnail_large;
//         }
//         return "";
//     };

//     return (
//         <div className={styles.imgPopUp}>
//             <div
//                 ref={popupRef}
//                 className={cx(styles.imgDiv, facadePopUp && styles.imgDiv__Facade, planPopUp && styles.imgDiv__Plan)}
//                 style={{
//                     width:  '90%',
//                     height:  'max-content',
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//                 onTouchStart={handleTouchStart}
//                 onTouchMove={handleTouchMove}
//                 onTouchEnd={handleTouchEnd}
//             >
//                 <div
//                     style={{
//                         width: "100%",
//                         height: "100%",
//                         position: "relative",
//                         overflow: "hidden",

//                     }}
//                 >
//                                         <div className={styles.zoomControls}>
//                         {/* Zoom In Button */}
//                         {zoomLevel < 5 && (
//                             <button onClick={handleZoomIn} className={styles.zoomButton}>
//                                 🔍+
//                             </button>
//                         )}
//                         {/* Zoom Out Button */}
//                         {zoomLevel > 1 && (
//                             <button onClick={handleZoomOut} className={styles.zoomButton}>
//                                 🔍-
//                             </button>
//                         )}
//                     </div>

//                     <img
//                         src={getImageSource()}
//                         alt="ITI Buildings Project"
//                         className={styles.image}
//                         style={{
//                             transform: `scale(${zoomLevel})`, // Apply zoom
//                             transition: "transform 0.3s ease",
//                         }}
//                         onContextMenu={handleContextMenu} // Disable right-click
//                         draggable={false}
//                     />
//                     <svg
//                         className={styles.close}
//                             onClick={(e) => {
//                             e.stopPropagation();
//                             setImgPopUp(false);
//                         }}
//                         onContextMenu={handleContextMenu}
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             d="M1.72102 22.2791C1.79068 22.3488 1.8734 22.4041 1.96444 22.4419C2.05549 22.4796 2.15309 22.4991 2.25165 22.4991C2.35021 22.4991 2.44781 22.4796 2.53885 22.4419C2.6299 22.4041 2.71262 22.3488 2.78227 22.2791L11.9998 13.0616L21.221 22.2791C21.3618 22.4198 21.5526 22.4989 21.7516 22.4989C21.9507 22.4989 22.1415 22.4198 22.2823 22.2791C22.423 22.1384 22.5021 21.9475 22.5021 21.7485C22.5021 21.5494 22.423 21.3586 22.2823 21.2178L13.061 12.0003L22.2785 2.77909C22.4193 2.63836 22.4983 2.44749 22.4983 2.24846C22.4983 2.04944 22.4193 1.85857 22.2785 1.71784C22.1378 1.57711 21.9469 1.49805 21.7479 1.49805C21.5489 1.49805 21.358 1.57711 21.2173 1.71784L11.9998 10.9391L2.77852 1.72159C2.63505 1.59872 2.45049 1.53451 2.26173 1.54181C2.07298 1.5491 1.89392 1.62735 1.76035 1.76092C1.62678 1.89449 1.54853 2.07354 1.54124 2.2623C1.53395 2.45106 1.59815 2.63561 1.72102 2.77909L10.9385 12.0003L1.72102 21.2216C1.58134 21.3621 1.50293 21.5522 1.50293 21.7503C1.50293 21.9485 1.58134 22.1386 1.72102 22.2791Z"
//                             fill="black"
//                         />
//                     </svg>
//                     {/* Left Arrow */}
//                     <div
//                         style={{
//                             display: displayLeft ? "flex" : "none", // Show left arrow only when there are images to navigate to the left
//                         }}
//                         onClick={handlePrevious}
//                         className={cx(styles.arrow, styles.leftArrow)}
//                     >
//                         <svg
//                             width="30"
//                             height="30"
//                             viewBox="0 0 30 30"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 clipRule="evenodd"
//                                 d="M9.10001 20.3508C8.92422 20.5264 8.68594 20.625 8.43751 20.625C8.18907 20.625 7.95079 20.5264 7.77501 20.3508L3.0875 15.6633C2.91194 15.4875 2.81333 15.2493 2.81333 15.0008C2.81333 14.7524 2.91194 14.5141 3.0875 14.3383L7.775 9.65082C7.86083 9.55872 7.96433 9.48484 8.07933 9.4336C8.19433 9.38236 8.31847 9.35481 8.44435 9.35259C8.57023 9.35037 8.69527 9.37352 8.812 9.42067C8.92873 9.46782 9.03478 9.538 9.1238 9.62703C9.21282 9.71605 9.28301 9.82209 9.33016 9.93883C9.37731 10.0556 9.40046 10.1806 9.39824 10.3065C9.39602 10.4324 9.36847 10.5565 9.31723 10.6715C9.26599 10.7865 9.19211 10.89 9.10001 10.9758L6.0125 14.0633L26.25 14.0633C26.4986 14.0633 26.7371 14.1621 26.9129 14.3379C27.0887 14.5137 27.1875 14.7522 27.1875 15.0008C27.1875 15.2495 27.0887 15.4879 26.9129 15.6637C26.7371 15.8396 26.4986 15.9383 26.25 15.9383L6.0125 15.9383L9.10001 19.0258C9.27557 19.2016 9.37418 19.4399 9.37418 19.6883C9.37418 19.9368 9.27557 20.175 9.10001 20.3508Z"
//                                 fill="white"
//                             />
//                         </svg>
//                     </div>

//                     {/* Right Arrow */}
//                     <div
//                         style={{
//                             display: displayRight ? "flex" : "none", // Show right arrow only when there are images to navigate to the right
//                         }}
//                         onClick={handleNext}
//                         className={cx(styles.arrow, styles.rightArrow)}
//                     >
//                         <svg
//                             width="30"
//                             height="30"
//                             viewBox="0 0 30 30"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 clipRule="evenodd"
//                                 d="M20.9 20.3508C21.0758 20.5264 21.3141 20.625 21.5625 20.625C21.8109 20.625 22.0492 20.5264 22.225 20.3508L26.9125 15.6633C27.0881 15.4875 27.1867 15.2493 27.1867 15.0008C27.1867 14.7524 27.0881 14.5141 26.9125 14.3383L22.225 9.65082C22.1392 9.55872 22.0357 9.48484 21.9207 9.4336C21.8057 9.38236 21.6815 9.35481 21.5556 9.35259C21.4298 9.35037 21.3047 9.37352 21.188 9.42067C21.0713 9.46782 20.9652 9.538 20.8762 9.62703C20.7872 9.71605 20.717 9.82209 20.6698 9.93883C20.6227 10.0556 20.5995 10.1806 20.6018 10.3065C20.604 10.4324 20.6315 10.5565 20.6828 10.6715C20.734 10.7865 20.8079 10.89 20.9 10.9758L23.9875 14.0633L3.75 14.0633C3.50136 14.0633 3.2629 14.1621 3.08709 14.3379C2.91127 14.5137 2.8125 14.7522 2.8125 15.0008C2.8125 15.2495 2.91127 15.4879 3.08709 15.6637C3.2629 15.8396 3.50136 15.9383 3.75 15.9383L23.9875 15.9383L20.9 19.0258C20.7244 19.2016 20.6258 19.4399 20.6258 19.6883C20.6258 19.9368 20.7244 20.175 20.9 20.3508Z"
//                                 fill="white"
//                             />
//                         </svg>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ImgPopUp;














// import React, { useEffect, useRef, useState } from "react";
// import styles from "./imgPopUp.module.css";
// import cx from "classnames";

// function ImgPopUp({ setImgPopUp, imag, right, left, setImg, attachments, planImages, planPopUp, facadePopUp }) {
//     const [currentIndex, setCurrentIndex] = useState(0); // Start with the first image
//     const [displayLeft, setDisplayLeft] = useState(false); // Show left arrow when appropriate
//     const [displayRight, setDisplayRight] = useState(false); // Show right arrow when appropriate
//     const [zoomLevel, setZoomLevel] = useState(1); // Zoom level state
//     const popupRef = useRef(null);
//     const startX = useRef(0); // Starting X position of the touch
//     const endX = useRef(0); // Ending X position of the touch
//     const [panPosition, setPanPosition] = useState({ x: 0, y: 0 }); // Track the panning position
//     const panStart = useRef({ x: 0, y: 0 }); // Store the start position of the pan
//     const isPanning = useRef(false); // Track if the user is currently panning
    
//     const handleMouseDown = (e) => {
//         isPanning.current = true;
//         panStart.current = { x: e.clientX - panPosition.x, y: e.clientY - panPosition.y };
//     };
    
//     const handleMouseMove = (e) => {
//         if (isPanning.current) {
//             setPanPosition({
//                 x: e.clientX - panStart.current.x,
//                 y: e.clientY - panStart.current.y,
//             });
//         }
//     };
    
//     const handleMouseUp = () => {
//         isPanning.current = false;
//     };
    
//     const handleTouchStartPan = (e) => {
//         isPanning.current = true;
//         panStart.current = {
//             x: e.touches[0].clientX - panPosition.x,
//             y: e.touches[0].clientY - panPosition.y,
//         };
//     };
    
//     const handleTouchMovePan = (e) => {
//         if (isPanning.current) {
//             setPanPosition({
//                 x: e.touches[0].clientX - panStart.current.x,
//                 y: e.touches[0].clientY - panStart.current.y,
//             });
//         }
//     };
    
//     const handleTouchEndPan = () => {
//         isPanning.current = false;
//     };
    
//     // Update the left and right arrows' visibility based on the images
//     useEffect(() => {
//         if (planPopUp && planImages && planImages.length > 0) {
//             setDisplayLeft(currentIndex > 0);
//             setDisplayRight(currentIndex < planImages.length - 1);
//         } else if (facadePopUp && attachments && attachments.length > 0) {
//             setDisplayLeft(currentIndex > 0);
//             setDisplayRight(currentIndex < attachments.length - 1);
//         } else {
//             setDisplayLeft(false);
//             setDisplayRight(false);
//         }
//     }, [planPopUp, facadePopUp, currentIndex, planImages, attachments]);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (popupRef.current && !popupRef.current.contains(event.target)) {
//                 setImgPopUp(false); // Close popup if clicked outside
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [setImgPopUp]);

    // const handleContextMenu = (e) => {
    //     e.preventDefault(); // Prevent the right-click context menu
    // };

//     const handleTouchStart = (e) => {
//         startX.current = e.touches[0].clientX; // Record the starting X position
//     };

//     const handleTouchMove = (e) => {
//         endX.current = e.touches[0].clientX; // Update the ending X position
//     };

//     const handleTouchEnd = () => {
//         const deltaX = endX.current - startX.current; // Calculate the swipe distance

//         if (deltaX > 50) {
//             // Swipe Right
//             handlePrevious();
//         } else if (deltaX < -50) {
//             // Swipe Left
//             handleNext();
//         }

//         // Reset swipe values
//         startX.current = 0;
//         endX.current = 0;
//     };

//     const handleNext = () => {
//         if (planPopUp && planImages) {
//             if (currentIndex < planImages.length - 1) {
//                 setCurrentIndex((prevIndex) => prevIndex + 1);
//             }
//         } else if (facadePopUp && attachments) {
//             if (currentIndex < attachments.length - 1) {
//                 setCurrentIndex((prevIndex) => prevIndex + 1);
//             }
//         }
//     };

//     const handlePrevious = () => {
//         if (planPopUp && planImages) {
//             if (currentIndex > 0) {
//                 setCurrentIndex((prevIndex) => prevIndex - 1);
//             }
//         } else if (facadePopUp && attachments) {
//             if (currentIndex > 0) {
//                 setCurrentIndex((prevIndex) => prevIndex - 1);
//             }
//         }
//     };

//     const handleZoomIn = () => {
//         setZoomLevel((prev) => Math.min(prev + 0.2, 5)); // Max zoom level: 5
//     };

//     const handleZoomOut = () => {
//         setZoomLevel((prev) => Math.max(prev - 0.2, 1)); // Min zoom level: 1
//     };

//     const getImageSource = () => {
//         if (planPopUp && planImages && planImages.length > 0) {
//             return planImages[currentIndex]?.base64;
//         } else if (facadePopUp && attachments && attachments.length > 0) {
//             return attachments[currentIndex]?.thumbnail_large;
//         }
//         return "";
//     };

//     return (
//         <div className={styles.imgPopUp}>
//             <div
//                 ref={popupRef}
//                 className={cx(styles.imgDiv, facadePopUp && styles.imgDiv__Facade, planPopUp && styles.imgDiv__Plan)}
//                 style={{
//                     width: "90%",
//                     height: "max-content",
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//                 onTouchStart={handleTouchStart}
//                 onTouchMove={handleTouchMove}
//                 onTouchEnd={handleTouchEnd}
//             >
//                 <div
//                     style={{
//                         width: "100%",
//                         height: "100%",
//                         position: "relative",
//                         overflow: "hidden",
//                         background:"white",
//                         borderRadius:"18px"
//                     }}
//                 >
//                     <div className={styles.zoomControls}>
//                         {/* Zoom In Button */}
//                         {zoomLevel < 5 && (
//                             <button onClick={handleZoomIn} className={styles.zoomButton}>
//                                 +
//                             </button>
//                         )}
//                         {/* Zoom Out Button */}
//                         {zoomLevel > 1 && (
//                             <button onClick={handleZoomOut} className={styles.zoomButton}>
//                                 -
//                             </button>
//                         )}
//                     </div>
//                     <img
//                         src={getImageSource()}
//                         alt="ITI Buildings Project"
//                         className={styles.image}
//                         style={{
//                             transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`, // Apply zoom and pan
//                             transition: isPanning.current ? "none" : "transform 0.3s ease", // Disable smooth transition during panning
//                             cursor: isPanning.current ? "grabbing" : "grab", // Change cursor during panning
//                             // position:fixed,
//                             // backgroundColor:"white",
//                         }}
                        // onContextMenu={handleContextMenu} // Disable right-click
//                         draggable={false}
//                         onMouseDown={handleMouseDown}
//                         onMouseMove={handleMouseMove}
//                         onMouseUp={handleMouseUp}
//                         onMouseLeave={handleMouseUp} // Stop panning if the mouse leaves the image
//                         onTouchStart={handleTouchStartPan}
//                         onTouchMove={handleTouchMovePan}
//                         onTouchEnd={handleTouchEndPan}
//                     />
                    //  <svg
                    //     className={styles.close}
                    //     onClick={(e) => {
                    //         e.stopPropagation();
                    //         setImgPopUp(false);
                    //     }}
                    //     onContextMenu={handleContextMenu}
                    //     width="24"
                    //     height="24"
                    //     viewBox="0 0 24 24"
                    //     fill="none"
                    //     xmlns="http://www.w3.org/2000/svg"
                    // >
                    //     <path
                    //         d="M1.72102 22.2791C1.79068 22.3488 1.8734 22.4041 1.96444 22.4419C2.05549 22.4796 2.15309 22.4991 2.25165 22.4991C2.35021 22.4991 2.44781 22.4796 2.53885 22.4419C2.6299 22.4041 2.71262 22.3488 2.78227 22.2791L11.9998 13.0616L21.221 22.2791C21.3618 22.4198 21.5526 22.4989 21.7516 22.4989C21.9507 22.4989 22.1415 22.4198 22.2823 22.2791C22.423 22.1384 22.5021 21.9475 22.5021 21.7485C22.5021 21.5494 22.423 21.3586 22.2823 21.2178L13.061 12.0003L22.2785 2.77909C22.4193 2.63836 22.4983 2.44749 22.4983 2.24846C22.4983 2.04944 22.4193 1.85857 22.2785 1.71784C22.1378 1.57711 21.9469 1.49805 21.7479 1.49805C21.5489 1.49805 21.358 1.57711 21.2173 1.71784L11.9998 10.9391L2.77852 1.72159C2.63505 1.59872 2.45049 1.53451 2.26173 1.54181C2.07298 1.5491 1.89392 1.62735 1.76035 1.76092C1.62678 1.89449 1.54853 2.07354 1.54124 2.2623C1.53395 2.45106 1.59815 2.63561 1.72102 2.77909L10.9385 12.0003L1.72102 21.2216C1.58134 21.3621 1.50293 21.5522 1.50293 21.7503C1.50293 21.9485 1.58134 22.1386 1.72102 22.2791Z"
                    //         fill="black"
                    //     />
                    // </svg>
//                     {/* Left Arrow */}
//                     <div
//                         style={{
//                             display: displayLeft ? "flex" : "none", // Show left arrow only when there are images to navigate to the left
//                         }}
//                         onClick={handlePrevious}
//                         className={cx(styles.arrow, styles.leftArrow)}
//                     >
//                         <svg
//                             width="30"
//                             height="30"
//                             viewBox="0 0 30 30"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 clipRule="evenodd"
//                                 d="M9.10001 20.3508C8.92422 20.5264 8.68594 20.625 8.43751 20.625C8.18907 20.625 7.95079 20.5264 7.77501 20.3508L3.0875 15.6633C2.91194 15.4875 2.81333 15.2493 2.81333 15.0008C2.81333 14.7524 2.91194 14.5141 3.0875 14.3383L7.775 9.65082C7.86083 9.55872 7.96433 9.48484 8.07933 9.4336C8.19433 9.38236 8.31847 9.35481 8.44435 9.35259C8.57023 9.35037 8.69527 9.37352 8.812 9.42067C8.92873 9.46782 9.03478 9.538 9.1238 9.62703C9.21282 9.71605 9.28301 9.82209 9.33016 9.93883C9.37731 10.0556 9.40046 10.1806 9.39824 10.3065C9.39602 10.4324 9.36847 10.5565 9.31723 10.6715C9.26599 10.7865 9.19211 10.89 9.10001 10.9758L6.0125 14.0633L26.25 14.0633C26.4986 14.0633 26.7371 14.1621 26.9129 14.3379C27.0887 14.5137 27.1875 14.7522 27.1875 15.0008C27.1875 15.2495 27.0887 15.4879 26.9129 15.6637C26.7371 15.8396 26.4986 15.9383 26.25 15.9383L6.0125 15.9383L9.10001 19.0258C9.27557 19.2016 9.37418 19.4399 9.37418 19.6883C9.37418 19.9368 9.27557 20.175 9.10001 20.3508Z"
//                                 fill="white"
//                             />
//                         </svg>
//                     </div>

//                     {/* Right Arrow */}
//                     <div
//                         style={{
//                             display: displayRight ? "flex" : "none", // Show right arrow only when there are images to navigate to the right
//                         }}
//                         onClick={handleNext}
//                         className={cx(styles.arrow, styles.rightArrow)}
//                     >
//                         <svg
//                             width="30"
//                             height="30"
//                             viewBox="0 0 30 30"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 clipRule="evenodd"
//                                 d="M20.9 20.3508C21.0758 20.5264 21.3141 20.625 21.5625 20.625C21.8109 20.625 22.0492 20.5264 22.225 20.3508L26.9125 15.6633C27.0881 15.4875 27.1867 15.2493 27.1867 15.0008C27.1867 14.7524 27.0881 14.5141 26.9125 14.3383L22.225 9.65082C22.1392 9.55872 22.0357 9.48484 21.9207 9.4336C21.8057 9.38236 21.6815 9.35481 21.5556 9.35259C21.4298 9.35037 21.3047 9.37352 21.188 9.42067C21.0713 9.46782 20.9652 9.538 20.8762 9.62703C20.7872 9.71605 20.717 9.82209 20.6698 9.93883C20.6227 10.0556 20.5995 10.1806 20.6018 10.3065C20.604 10.4324 20.6315 10.5565 20.6828 10.6715C20.734 10.7865 20.8079 10.89 20.9 10.9758L23.9875 14.0633L3.75 14.0633C3.50136 14.0633 3.2629 14.1621 3.08709 14.3379C2.91127 14.5137 2.8125 14.7522 2.8125 15.0008C2.8125 15.2495 2.91127 15.4879 3.08709 15.6637C3.2629 15.8396 3.50136 15.9383 3.75 15.9383L23.9875 15.9383L20.9 19.0258C20.7244 19.2016 20.6258 19.4399 20.6258 19.6883C20.6258 19.9368 20.7244 20.175 20.9 20.3508Z"
//                                 fill="white"
//                             />
//                         </svg>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ImgPopUp;


























import React, { useEffect, useRef, useState } from "react";
import styles from "./imgPopUp.module.css";
import cx from "classnames";

function ImgPopUp({
  setImgPopUp,
  imag,
  right,
  left,
  setImg,
  attachments,
  planImages,
  planPopUp,
  facadePopUp,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });

  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });

  // Mouse and touch handlers for panning
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      isPanning.current = true;
      panStart.current = {
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y,
      };
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning.current) {
      setPanPosition({
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    isPanning.current = false;
  };

  const handleTouchStartPan = (e) => {
    if (zoomLevel > 1) {
      isPanning.current = true;
      panStart.current = {
        x: e.touches[0].clientX - panPosition.x,
        y: e.touches[0].clientY - panPosition.y,
      };
    }
  };

  const handleTouchMovePan = (e) => {
    if (isPanning.current) {
      setPanPosition({
        x: e.touches[0].clientX - panStart.current.x,
        y: e.touches[0].clientY - panStart.current.y,
      });
    }
  };

  const handleTouchEndPan = () => {
    isPanning.current = false;
  };

  // Touch handlers for swipe detection
  const handleTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e) => {
    touchEnd.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    const distanceX = touchEnd.current.x - touchStart.current.x;
    const distanceY = Math.abs(touchEnd.current.y - touchStart.current.y);

    if (Math.abs(distanceX) > 50 && distanceY < 50) {
      if (distanceX > 0) {
        handlePrevious(); // Swipe right
      } else {
        handleNext(); // Swipe left
      }
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 1));
    if (zoomLevel <= 1.2) {
      setPanPosition({ x: 0, y: 0 });
    }
  };

  // Navigation arrows
  const handleNext = () => {
    if (planPopUp && planImages) {
      if (currentIndex < planImages.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    } else if (facadePopUp && attachments) {
      if (currentIndex < attachments.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (planPopUp && planImages) {
      if (currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    } else if (facadePopUp && attachments) {
      if (currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const getImageSource = () => {
    if (planPopUp && planImages) {
      return planImages[currentIndex]?.base64;
    } else if (facadePopUp && attachments) {
      return attachments[currentIndex]?.thumbnail_large;
    }
    return "";
  };

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setImgPopUp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setImgPopUp]);

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the right-click context menu
};

  return (
    <div className={styles.imgPopUp}>
      <div
        ref={popupRef}
        className={cx(
          styles.imgDiv,
          facadePopUp && styles.imgDiv__Facade,
          planPopUp && styles.imgDiv__Plan
        )}
        style={{
          width: "90%",
          height: "max-content",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            background: "white",
            borderRadius: "18px",
          }}
        >
          <div className={styles.zoomControls}>
            <button onClick={handleZoomIn} className={styles.zoomButton}>
              +
            </button>
            <button onClick={handleZoomOut} className={styles.zoomButton}>
              -
            </button>
          </div>
          <img
            src={getImageSource()}
            alt="Zoomable Content"
            className={styles.image}
            style={{
              transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
              transition: isPanning.current ? "none" : "transform 0.3s ease",
              cursor: zoomLevel > 1 ? (isPanning.current ? "grabbing" : "grab") : "default",
            }}
            draggable={false}
            onContextMenu={handleContextMenu} // Disable right-click

            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={(e) => {
              handleTouchStart(e);
              handleTouchStartPan(e);
            }}
            onTouchMove={(e) => {
              handleTouchMove(e);
              handleTouchMovePan(e);
            }}
            onTouchEnd={(e) => {
              handleTouchEnd();
              handleTouchEndPan(e);
            }}
          />


<svg
                        className={styles.close}
                        onClick={(e) => {
                            e.stopPropagation();
                            setImgPopUp(false);
                        }}
                        onContextMenu={handleContextMenu}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.72102 22.2791C1.79068 22.3488 1.8734 22.4041 1.96444 22.4419C2.05549 22.4796 2.15309 22.4991 2.25165 22.4991C2.35021 22.4991 2.44781 22.4796 2.53885 22.4419C2.6299 22.4041 2.71262 22.3488 2.78227 22.2791L11.9998 13.0616L21.221 22.2791C21.3618 22.4198 21.5526 22.4989 21.7516 22.4989C21.9507 22.4989 22.1415 22.4198 22.2823 22.2791C22.423 22.1384 22.5021 21.9475 22.5021 21.7485C22.5021 21.5494 22.423 21.3586 22.2823 21.2178L13.061 12.0003L22.2785 2.77909C22.4193 2.63836 22.4983 2.44749 22.4983 2.24846C22.4983 2.04944 22.4193 1.85857 22.2785 1.71784C22.1378 1.57711 21.9469 1.49805 21.7479 1.49805C21.5489 1.49805 21.358 1.57711 21.2173 1.71784L11.9998 10.9391L2.77852 1.72159C2.63505 1.59872 2.45049 1.53451 2.26173 1.54181C2.07298 1.5491 1.89392 1.62735 1.76035 1.76092C1.62678 1.89449 1.54853 2.07354 1.54124 2.2623C1.53395 2.45106 1.59815 2.63561 1.72102 2.77909L10.9385 12.0003L1.72102 21.2216C1.58134 21.3621 1.50293 21.5522 1.50293 21.7503C1.50293 21.9485 1.58134 22.1386 1.72102 22.2791Z"
                            fill="black"
                        />
                    </svg>
                    
          <div
            style={{
              display: currentIndex > 0 ? "flex" : "none",
            }}
            onClick={handlePrevious}
            className={cx(styles.arrow, styles.leftArrow)}
          >
            &#8592;
          </div>
          <div
            style={{
              display:
                (planPopUp && currentIndex < planImages.length - 1) ||
                (facadePopUp && currentIndex < attachments.length - 1)
                  ? "flex"
                  : "none",
            }}
            onClick={handleNext}
            className={cx(styles.arrow, styles.rightArrow)}
          >
            &#8594;
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImgPopUp;
