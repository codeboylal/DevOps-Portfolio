import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./appbar.module.css";
import cx from "classnames";

import { Menu as MenuIcon } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import waving_hand from "../../assets/appbar/waving_hand.svg";
import search from "../../assets/appbar/search.svg";
import notification_on from "../../assets/appbar/NotificationActive.svg";
import default_img from "../../assets/appbar/default_profile.png";
import SidebarPopup from "../container/popUp/sidebar";

const Appbar = React.memo(function Appbar({
  name = "",
  profilePicture,
  searchDisable = false,
  courseFilter = "All",
  setCourseFilter,
  courseFilterDisable = true,
  active = "",
  setSearchQuery,
  searchQuery="",
}) {
  const navigate = useNavigate();

  const [sideBarPopUp, setSideBarPopUp] = useState(false);

  const [profile] = useState(profilePicture || default_img);

  const [isEditing, setIsEditing] = useState(false);
  const [courseFilterPopUp, setCourseFilterPopUp] = useState(false);

  const handleDivClick = () => setIsEditing(true);

  const handleBlur = () => setIsEditing(false);

  const handleChange = (e) => setSearchQuery(e.target.value);

  return (
    <div className={cx("w-full flex bg-[#FFFFFF] p-4", styles.alignCenter, styles.height79px)}>
      <div className={cx(styles.sideBarMenu, styles.pointer)}>
        <MenuIcon
          onClick={() => {
            setSideBarPopUp(!sideBarPopUp);
          }}
        />
      </div>
      <div
        className={cx(
          styles.flex,
          styles.alignCenter,
          styles.justifySpaceBetween,
          styles.leftSection,
          styles.leftSectionCourses
        )}
      >
        <div
          className={cx(
            styles.content,
            styles.flex,
            styles.flexColumn,
            styles.contentNone
          )}
        >
          <label
            className={cx(
              styles.content__Child1,
              styles.flex,
              styles.alignCenter
            )}
          >
            <span>Hello {name || "-"}</span>
            <img className={styles.wavingHandDes} src={waving_hand} alt="LMS" />
          </label>
          <label className={styles.content__Child2}>
            Let's learn something new today!
          </label>
        </div>
        <div
          className={cx(
            styles.flex,
            styles.alignCenter,
            courseFilterDisable && styles.none
          )}
        >
          <div
            className={cx(
              styles.courseFilter,
              styles.pointer,
              courseFilter !== "All" && styles.courseFilterNone,
              courseFilter === "All" && styles.activeBorder
            )}
            onClick={() => {
              setCourseFilter("All");
            }}
          >
            All Courses
          </div>
          <div
            className={cx(
              styles.courseFilter,
              styles.pointer,
              courseFilter !== "Active" && styles.courseFilterNone,
              courseFilter === "Active" && styles.activeBorder
            )}
            onClick={() => {
              setCourseFilter("Active");
            }}
          >
            Active
          </div>
          <div
            className={cx(
              styles.courseFilter,
              styles.pointer,
              courseFilter !== "Completed" && styles.courseFilterNone,
              courseFilter === "Completed" && styles.activeBorder
            )}
            onClick={() => {
              setCourseFilter("Completed");
            }}
          >
            Completed
          </div>
          <div
            className={cx(
              styles.expandarrow,
              courseFilterPopUp && styles.rotateArrow,
              styles.pointer
            )}
            onClick={() => {
              setCourseFilterPopUp(!courseFilterPopUp);
            }}
          >
            <ExpandMoreIcon />
          </div>
          {courseFilterPopUp && (
            <div
              className={styles.filterPopUp}
              onClick={() => {
                setCourseFilterPopUp(false);
              }}
            >
              <div className={styles.optionsFilter}>
                <div
                  onClick={() => {
                    setCourseFilter("All");
                  }}
                  className={cx(
                    styles.option,
                    styles.pointer,
                    styles.topBorderRadius,
                    courseFilter === "All" && styles.none
                  )}
                >
                  All Courses
                </div>
                <div
                  onClick={() => {
                    setCourseFilter("Active");
                  }}
                  className={cx(
                    styles.option,
                    styles.pointer,
                    courseFilter === "All" && styles.topBorderRadius,
                    courseFilter === "Completed" && styles.bottomBorderRadius,
                    courseFilter === "Active" && styles.none
                  )}
                >
                  Active
                </div>
                <div
                  onClick={() => {
                    setCourseFilter("Completed");
                  }}
                  className={cx(
                    styles.option,
                    styles.pointer,
                    styles.bottomBorderRadius,
                    courseFilter === "Completed" && styles.none
                  )}
                >
                  Completed
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={cx(
            styles.searchDiv,
            styles.flex,
            styles.alignCenter,
            searchDisable && styles.none,
            styles.pointer
          )}
          onClick={handleDivClick}
        >
          <img src={search} alt="LMS" />
          {isEditing ? (
            <input
              type="text"
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <span className={cx(styles.searchSpan,styles.pointer)}>
              {searchQuery || "Search..."}
            </span>
          )}
        </div>
      </div>
      <div className={cx(styles.rightSection, styles.flex, styles.alignCenter)}>
        <div className={styles.pointer}>
          <img src={notification_on} alt="LMS" className={styles.notific} />
        </div>
        <div
          className={cx(styles.profileDiv, styles.pointer)}
          onClick={() => {
            navigate("/profile");
          }}
        >
          <img className={styles.profileImg} src={profile} alt="LMS" />
        </div>
      </div>
      {sideBarPopUp && (
        <SidebarPopup setSideBarPopUp={setSideBarPopUp} active={active} />
      )}
    </div>
  );
});

export default Appbar;
