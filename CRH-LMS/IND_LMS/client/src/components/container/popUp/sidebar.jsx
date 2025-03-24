import React from "react";

import styles from "./sidebar.module.css";

import Sidebar from "../../sidebar/sidebar.jsx";

function SidebarPopup({ setSideBarPopUp ,active = ""}) {
  return (
    <div
      className={styles.popUpDiv}
      onClick={() => {
        setSideBarPopUp(false);
      }}
    >
      <div
        style={{ width: "15.5rem" }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Sidebar active={active} popUp={true} setSideBarPopUp={setSideBarPopUp} />
      </div>
    </div>
  );
}

export default SidebarPopup;
