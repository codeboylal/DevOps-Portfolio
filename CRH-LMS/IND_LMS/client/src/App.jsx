import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "./App.module.css";
import cx from "classnames";

import { ToasterProvider } from "./Toaster.jsx";

import RouterPath from "./routes/routerPath.jsx";

import Sidebar from "./components/sidebar/sidebar.jsx";
import Appbar from "./components/appbar/appbar.jsx";
import Loader from "./components/loader/loader.jsx";

function App() {
  // console.log("App rendered");
  const location = useLocation();
  const [active, setActive] = useState("");
  const [courseFilterDisable, setCourseFilterDisable] = useState(true)
  const [courseFilter, setCourseFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const path = pathSegments[0] || ""; // Get only the first segment if it exists
    if(path.toLowerCase() === "mycourses"){
      setCourseFilterDisable(false)
    }else{
      setCourseFilterDisable(true)
    }
    setActive(path);
  }, [location]);

  const [loading, setLoading] = useState(false);

  return (
    <ToasterProvider>
      {active === "" ? <RouterPath courseFilter={courseFilter} setCourseFilter={setCourseFilter}/> :
      <div className={styles.flex}>
      <div className={styles.sideBarDiv}>
        <Sidebar active={active} />
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
            <Appbar  active={active} searchDisable={(active?.toLowerCase() === "explorecourses" || active?.toLowerCase() === "mycourses") ? false : true} courseFilterDisable={courseFilterDisable} searchQuery={searchQuery} setSearchQuery={setSearchQuery} courseFilter={courseFilter} setCourseFilter={setCourseFilter}/>
          </div>
          <div className={styles.childrenDiv}>
            {loading ? <Loader /> : <RouterPath courseFilter={courseFilter} searchQuery={searchQuery}/>}
          </div>
        </div>
      </div>
    </div>}
    </ToasterProvider>
  );
}

export default React.memo(App);
