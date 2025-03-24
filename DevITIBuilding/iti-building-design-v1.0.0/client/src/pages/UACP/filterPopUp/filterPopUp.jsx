import React, { useState, useRef, useEffect } from "react";

import styles from "./filterPopUp.module.css";
import UserFilters from "../../../components/Container/users/filters/filter";

function FilterPopUp({
  userAccessFilter = {},
  setUserAccessFilter,
  userAccessFilterActive,
  setUserAccessFilterActive,
  setFilterObject,
  filterObject,
  setFilterPopUpButton,
  setFilterEnable,
  setFilterPopUp,
}) {
  const boxRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      if (boxRef.current) {
        // console.log("BoxDiv width:", boxRef.current.offsetWidth);
        if (boxRef.current.offsetWidth > 1730) {
          setFilterPopUpButton(false);
          setFilterPopUp(false);
        } else {
          setFilterPopUpButton(false);
          setFilterPopUp(true);
        }
        setUserAccessFilterActive(false)
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setFilterPopUpButton]);


  return (
    <div
      className={styles.mainDiv}
      ref={boxRef}
      onClick={() => {
        setFilterEnable(false);
        setFilterPopUp(false);
      }}
    >
      <div
        className={styles.filterDiv}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <UserFilters
          userAccessFilter={userAccessFilter}
          setUserAccessFilter={setUserAccessFilter}
          setUserAccessFilterActive={setUserAccessFilterActive}
          userAccessFilterActive={userAccessFilterActive}
          setFilterObject={setFilterObject}
          filterObject={filterObject}
        />
      </div>
    </div>
  );
}

export default FilterPopUp;
