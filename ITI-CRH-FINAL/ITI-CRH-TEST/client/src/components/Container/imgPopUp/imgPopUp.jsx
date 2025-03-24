// import React, { useEffect, useRef, useState } from "react";
// import styles from "./imgPopUp.module.css";
// import cx from "classnames";

// function ImgPopUp({
//   setImgPopUp,
//   attachments,
//   planImages,
//   planPopUp,
//   facadePopUp,
// }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });

//   const isPanning = useRef(false);
//   const panStart = useRef({ x: 0, y: 0 });
//   const pinchStartDistance = useRef(0);
//   const pinchStartZoom = useRef(1);
//   const popupRef = useRef(null);
//   const containerRef = useRef(null);

//   const MAX_ZOOM = 3.5;
//   const MIN_ZOOM = 1;

//   // Reset zoom and pan when switching images or closing popup
//   const resetZoomAndPan = () => {
//     setZoomLevel(1);
//     setPanPosition({ x: 0, y: 0 });
//   };

//   // Enforce boundaries for panning
//   const enforceBoundaries = (pan, zoom) => {
//     const container = containerRef.current;
//     if (container) {
//       const rect = container.getBoundingClientRect();
//       const maxPanX = ((rect.width * zoom) - rect.width) / 2;
//       const maxPanY = ((rect.height * zoom) - rect.height) / 2;

//       return {
//         x: Math.max(-maxPanX, Math.min(pan.x, maxPanX)),
//         y: Math.max(-maxPanY, Math.min(pan.y, maxPanY)),
//       };
//     }
//     return pan;
//   };

//   // Adjust zoom with cursor focus
//   const adjustZoom = (newZoom, origin) => {
//     const container = containerRef.current;

//     if (container && zoomLevel !== newZoom) {
//       const rect = container.getBoundingClientRect();
//       const offsetX = origin.clientX - rect.left;
//       const offsetY = origin.clientY - rect.top;

//       const dx = (offsetX - rect.width / 2) / zoomLevel;
//       const dy = (offsetY - rect.height / 2) / zoomLevel;

//       const adjustedPan = {
//         x: panPosition.x - dx * (newZoom - zoomLevel),
//         y: panPosition.y - dy * (newZoom - zoomLevel),
//       };

//       setZoomLevel(newZoom);
//       setPanPosition(enforceBoundaries(adjustedPan, newZoom));
//     }
//   };

//   // Calculate distance between two touch points
//   const getDistance = (touch1, touch2) => {
//     return Math.sqrt(
//       Math.pow(touch2.clientX - touch1.clientX, 2) +
//       Math.pow(touch2.clientY - touch1.clientY, 2)
//     );
//   };

//   // Handle two-finger pinch-to-zoom
//   const handleTouchStart = (e) => {
//     if (e.touches.length === 2) {
//       const distance = getDistance(e.touches[0], e.touches[1]);
//       pinchStartDistance.current = distance;
//       pinchStartZoom.current = zoomLevel;
//     } else if (e.touches.length === 1 && zoomLevel > 1) {
//       isPanning.current = true;
//       panStart.current = {
//         x: e.touches[0].clientX - panPosition.x,
//         y: e.touches[0].clientY - panPosition.y,
//       };
//     }
//   };

//   const handleTouchMove = (e) => {
//     if (e.touches.length === 2) {
//       const distance = getDistance(e.touches[0], e.touches[1]);
//       const newZoom =
//         pinchStartZoom.current * (distance / pinchStartDistance.current);

//       adjustZoom(Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM), {
//         clientX: (e.touches[0].clientX + e.touches[1].clientX) / 2,
//         clientY: (e.touches[0].clientY + e.touches[1].clientY) / 2,
//       });
//     } else if (e.touches.length === 1 && isPanning.current) {
//       const newPan = {
//         x: e.touches[0].clientX - panStart.current.x,
//         y: e.touches[0].clientY - panStart.current.y,
//       };
//       setPanPosition(enforceBoundaries(newPan, zoomLevel));
//     }
//   };

//   const handleTouchEnd = () => {
//     isPanning.current = false;
//   };

//   // Panning handlers
//   const handleMouseDown = (e) => {
//     if (zoomLevel > 1) {
//       isPanning.current = true;
//       panStart.current = {
//         x: e.clientX - panPosition.x,
//         y: e.clientY - panPosition.y,
//       };
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (isPanning.current) {
//       const newPan = {
//         x: e.clientX - panStart.current.x,
//         y: e.clientY - panStart.current.y,
//       };
//       setPanPosition(enforceBoundaries(newPan, zoomLevel));
//     }
//   };

//   const handleMouseUp = () => {
//     isPanning.current = false;
//   };

//   const handleScroll = (e) => {
//     const container = containerRef.current;
//     if (!container) return;

//     const rect = container.getBoundingClientRect();
//     const insideImage =
//       e.clientX >= rect.left &&
//       e.clientX <= rect.right &&
//       e.clientY >= rect.top &&
//       e.clientY <= rect.bottom;

//     if (insideImage) {
//       if (e.deltaY > 0) {
//         handleZoomOut(e);
//       } else {
//         handleZoomIn(e);
//       }
//     }
//   };

// const handleZoomIn = (e) => {
//   const newZoom = Math.min(zoomLevel + 0.3  , MAX_ZOOM);
//   adjustZoom(newZoom, e || { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
// };

// const handleZoomOut = (e) => {
//   const newZoom = Math.max(zoomLevel - 0.3, MIN_ZOOM);
//   adjustZoom(newZoom, e || { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
//   if (newZoom === MIN_ZOOM) resetZoomAndPan();
// };

//   // Navigation handlers
//   const handleNext = () => {
//     resetZoomAndPan();
//     if (planPopUp && planImages && currentIndex < planImages.length - 1) {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     } else if (facadePopUp && attachments && currentIndex < attachments.length - 1) {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     resetZoomAndPan();
//     if (planPopUp && planImages && currentIndex > 0) {
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//     } else if (facadePopUp && attachments && currentIndex > 0) {
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const getImageSource = () => {
//     if (planPopUp && planImages) {
//       return planImages[currentIndex]?.base64;
//     } else if (facadePopUp && attachments) {
//       return attachments[currentIndex]?.url;
//     }
//     return "";
//   };

// useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (popupRef.current && !popupRef.current.contains(event.target)) {
//       setImgPopUp(false);
//     }
//   };

//   document.addEventListener("mousedown", handleClickOutside);
//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, [setImgPopUp]);

//   return (
//     <div className={styles.imgPopUp} onWheel={handleScroll}>
//       <div
//         ref={popupRef}
//         className={cx(styles.imgDiv)}
//         style={{
//           cursor: zoomLevel > 1 ? (isPanning.current ? "grabbing" : "grab") : "default",
//         }}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div
//           ref={containerRef}
//           style={{
//             transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
//             transition: isPanning.current ? "none" : "transform 0.3s ease-out",
//             willChange: "transform",
//             transformOrigin: "center center",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <img
//             src={getImageSource()}
//             alt="Zoomable Content"
//             className={styles.image}
//             draggable={false}
//             style={{
//               imageRendering: "crisp-edges",
//               userSelect: "none",
//               pointerEvents: "none",
//             }}
//           />
//         </div>
//         <div className={styles.zoomControls}>
//           <button onClick={handleZoomIn} className={styles.zoomButton}>
//             +
//           </button>
//           <button onClick={handleZoomOut} className={styles.zoomButton}>
//             -
//           </button>
//         </div>
//         <svg
//           className={styles.close}
//           onClick={() => setImgPopUp(false)}
//           width="24"
//           height="24"
//           fill="none"
//         >
//           <path d="M1.72102..." fill="black" />
//         </svg>
//         {currentIndex > 0 && (
//           <div onClick={handlePrevious} className={cx(styles.arrow, styles.leftArrow)}>
//             &#8592;
//           </div>
//         )}
//         {((planPopUp && currentIndex < planImages.length - 1) ||
//           (facadePopUp && currentIndex < attachments.length - 1)) && (
//             <div onClick={handleNext} className={cx(styles.arrow, styles.rightArrow)}>
//               &#8594;
//             </div>
//           )}
//       </div>
//     </div>
//   );
// }

// export default ImgPopUp;

import React, { useEffect, useRef, useState } from "react";
import styles from "./imgPopUp.module.css";
import cx from "classnames";

import close from "./close.svg";
import leftArrow from "./Left.svg";
import rightArrow from "./Right.svg";
import minus from "./minus.svg";
import plus from "./plus.svg";

function ImgPopUp({
  setImgPopUp,
  attachments,
  planImages,
  planPopUp,
  facadePopUp,
}) {
  // console.log(planImages)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });

  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const pinchStartDistance = useRef(0);
  const pinchStartZoom = useRef(1);
  const popupRef = useRef(null);
  const containerRef = useRef(null);

  const MAX_ZOOM = 6;
  const MIN_ZOOM = 1;

  // Reset zoom and pan when switching images or closing popup
  const resetZoomAndPan = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const enforceBoundaries = (pan, zoom) => {
    const container = containerRef.current;
    const parent = container?.parentElement; // Parent of the div

    if (container && parent) {
      const parentRect = parent.getBoundingClientRect();
      const divWidth = parentRect.width * zoom; // Zoomed width of div
      const divHeight = parentRect.height * zoom; // Zoomed height of div

      // Prevent div from going outside its parent
      const maxPanX = Math.max(0, (divWidth - parentRect.width) / 3);
      const maxPanY = Math.max(0, (divHeight - parentRect.height) / 3);

      return {
        x: Math.min(maxPanX, Math.max(-maxPanX, pan.x)),
        y: Math.min(maxPanY, Math.max(-maxPanY, pan.y)),
      };
    }
    return pan;
  };

  // Adjust zoom with cursor focus
  const adjustZoom = (newZoom, origin) => {
    const container = containerRef.current;

    if (container && zoomLevel !== newZoom) {
      const rect = container.getBoundingClientRect();
      const offsetX = origin.clientX - rect.left;
      const offsetY = origin.clientY - rect.top;

      const dx = (offsetX - rect.width / 2) / zoomLevel;
      const dy = (offsetY - rect.height / 2) / zoomLevel;

      const adjustedPan = {
        x: panPosition.x - dx * (newZoom - zoomLevel),
        y: panPosition.y - dy * (newZoom - zoomLevel),
      };

      setZoomLevel(newZoom);
      setPanPosition(enforceBoundaries(adjustedPan, newZoom));
    }
  };

  // Calculate distance between two touch points
  const getDistance = (touch1, touch2) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  // Handle two-finger pinch-to-zoom
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      pinchStartDistance.current = distance;
      pinchStartZoom.current = zoomLevel;
    } else if (e.touches.length === 1 && zoomLevel > 1) {
      isPanning.current = true;
      panStart.current = {
        x: e.touches[0].clientX - panPosition.x,
        y: e.touches[0].clientY - panPosition.y,
      };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      const newZoom =
        pinchStartZoom.current * (distance / pinchStartDistance.current);

      adjustZoom(Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM), {
        clientX: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        clientY: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      });
    } else if (e.touches.length === 1 && isPanning.current) {
      const newPan = {
        x: e.touches[0].clientX - panStart.current.x,
        y: e.touches[0].clientY - panStart.current.y,
      };
      setPanPosition(enforceBoundaries(newPan, zoomLevel));
    }
  };

  const handleTouchEnd = () => {
    isPanning.current = false;
  };

  // Panning handlers
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
      const newPan = {
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y,
      };
      setPanPosition(enforceBoundaries(newPan, zoomLevel));
    }
  };

  const handleMouseUp = () => {
    isPanning.current = false;
  };

  const handleScroll = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const insideImage =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (insideImage) {
      if (e.deltaY > 0) {
        handleZoomOut(e);
      } else {
        handleZoomIn(e);
      }
    }
  };

  const handleZoomIn = (e) => {
    const newZoom = Math.min(zoomLevel + 0.3, MAX_ZOOM);
    adjustZoom(
      newZoom,
      e || { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }
    );
  };

  const handleZoomOut = (e) => {
    const newZoom = Math.max(zoomLevel - 0.3, MIN_ZOOM);
    adjustZoom(
      newZoom,
      e || { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }
    );
    if (newZoom === MIN_ZOOM) resetZoomAndPan();
  };

  // Navigation arrows
  const handleNext = () => {
    resetZoomAndPan();
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
    resetZoomAndPan();
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
      return attachments[currentIndex]?.url;
    }
    return "";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Always allow clicking the close button
      if (event.target.closest(`.${styles.close}`)) {
        setImgPopUp(false);
        return;
      }

      // If zoomed in, prevent closing on outside clicks

      // Close only if clicking outside the image container
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setImgPopUp(false);
      }
    };

    if (zoomLevel > 1) return;

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setImgPopUp, zoomLevel]); // Include zoomLevel in dependencies

  useEffect(() => {
    const closeButton = document.querySelector(`.${styles.close}`);
    if (closeButton) {
      closeButton.addEventListener("click", () => setImgPopUp(false));
    }
    return () => {
      if (closeButton) {
        closeButton.removeEventListener("click", () => setImgPopUp(false));
      }
    };
  }, []);

  useEffect(() => {
    document
      .getElementById("myDiv")
      .addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });
  }, []);

  return (
    <div
      className={styles.imgPopUp}
      id={"myDiv"}
      onWheel={handleScroll}
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{
        cursor:
          zoomLevel > 1 ? (isPanning.current ? "grabbing" : "grab") : "default",
        // marginTop: '60px'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.upperDiv}>
        <img
          src={close}
          alt="close"
          className={styles.close}
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            setImgPopUp(false); // Ensure it closes
          }}
          style={{ pointerEvents: "auto" }} // Allow clicks
        />
      </div>
      <div
        ref={popupRef}
        className={cx(styles.imgDiv)}
        style={{
          cursor:
            zoomLevel > 1
              ? isPanning.current
                ? "grabbing"
                : "grab"
              : "default",
          marginTop: "60px",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={containerRef}
          className={styles.imageContainer}
          style={{
            overflow: "hidden", // Prevents content from overflowing
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
            transition: isPanning.current ? "none" : "transform 0.3s ease-out",
            willChange: "transform",
            transformOrigin: "center center",
            imageRendering: "crisp-edges",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <img
            src={getImageSource()}
            alt="Zoomable Content"
            className={styles.image}
            style={{
              // width: "100%",
              // height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div className={styles.zoomControls}>
          <div className={styles.buttonAlingment}>
            <button onClick={handleZoomOut} className={styles.zoomButton}>
              <img src={minus} alt="" className={styles.minus} />
            </button>

            <button onClick={handleZoomIn} className={styles.zoomButton}>
              <img src={plus} alt="" className={styles.plus} />
            </button>
          </div>
        </div>
        <div
          style={{
            display: currentIndex > 0 ? "flex" : "none",
          }}
          onClick={handlePrevious}
          className={cx(styles.arrow, styles.leftArrow)}
        >
          {/* &#8592; */}
          <img src={rightArrow} alt="" />
        </div>
        <div
          style={{
            display:
              facadePopUp && currentIndex < attachments.length - 1
                ? "flex"
                : "none",
          }}
          onClick={handleNext}
          className={cx(styles.arrow, styles.rightArrow)}
        >
          {/* &#8594; */}
          <img src={leftArrow} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ImgPopUp;
