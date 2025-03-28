import React, { useState, useEffect } from "react";
import styles from "./sidebarButtons.module.css";
import SideBarPopUpProjectDetails from "../sideBarPopUp";
import ScrollBar from "../../../../scrollBar/scrollBar";

const SidebarButton = ({ label = "Files", onClick,onClose, icon , projectNumber }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1920) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // console.log("SidebarButton received projectNumber:", projectNumber); 

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`${styles.superContainer} ${isSticky ? styles.sticky : ""}`}
    >
      <div className={styles.sidebarButton}>
        <div className={styles.fileButton}>
          <div style={styles.btncontainer}>
            <button onClick={onClick} className={styles.button}>
              {icon && <span className={styles.icon}>{icon}</span>}
              {label}
            </button>
          </div>
          <div className={styles.cross} onClick={onClose}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.32545 5.99967L11.0364 2.28874C11.2125 2.11293 11.3116 1.87435 11.3118 1.6255C11.312 1.37665 11.2134 1.1379 11.0376 0.961783C10.8618 0.785662 10.6232 0.686595 10.3743 0.686376C10.1255 0.686156 9.88673 0.784801 9.71061 0.960611L5.99967 4.67155L2.28874 0.960611C2.11262 0.78449 1.87374 0.685547 1.62467 0.685547C1.3756 0.685547 1.13673 0.78449 0.960611 0.960611C0.78449 1.13673 0.685547 1.3756 0.685547 1.62467C0.685547 1.87374 0.78449 2.11262 0.960611 2.28874L4.67155 5.99967L0.960611 9.71061C0.78449 9.88673 0.685547 10.1256 0.685547 10.3747C0.685547 10.6237 0.78449 10.8626 0.960611 11.0387C1.13673 11.2149 1.3756 11.3138 1.62467 11.3138C1.87374 11.3138 2.11262 11.2149 2.28874 11.0387L5.99967 7.3278L9.71061 11.0387C9.88673 11.2149 10.1256 11.3138 10.3747 11.3138C10.6237 11.3138 10.8626 11.2149 11.0387 11.0387C11.2149 10.8626 11.3138 10.6237 11.3138 10.3747C11.3138 10.1256 11.2149 9.88673 11.0387 9.71061L7.32545 5.99967Z" fill="#020617"/>
</svg>

          </div>
        </div>
        <div className={styles.popup}>

          <ScrollBar>
        
          <SideBarPopUpProjectDetails isSticky={isSticky}   projectNumber={projectNumber}/>
          </ScrollBar>
        </div>

      </div>
    </div>
  );
};

export default SidebarButton;
