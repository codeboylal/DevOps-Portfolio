import React from "react";

import styles from "./pageSetup.module.css";
import cx from "classnames";

import Sidebar from "../../sidebar/sidebar.jsx";
import Appbar from "../../appbar/appbar.jsx";
import Loader from "../../loader/loader.jsx";

function PageSetup({ active = "", children, loading = false, searchDisable=false }) {

  const name = localStorage.getItem("name").split(" ")[0];
  const picture = localStorage.getItem("picture");
  const college = localStorage.getItem("college")
  return (
    <div className={styles.flex}>
      <div className={styles.sideBarDiv}>
        <Sidebar profilePicture={picture} education={college} name={name} active={active}/>
      </div>
      <div className={cx(styles.widthFull, styles.justifyCenter)}>
        <div
          className={cx(
            styles.contentDiv,
            styles.flex,
            styles.flexColumn,
            styles.alignCenter,
            styles.gap16px
          )}
        >
          <div className={cx(styles.widthFull)}>
            <Appbar name={name} profilePicture={picture}  searchDisable={searchDisable}/>
          </div>
          <div className={styles.childrenDiv}>
            {loading ? <Loader /> : children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSetup;
