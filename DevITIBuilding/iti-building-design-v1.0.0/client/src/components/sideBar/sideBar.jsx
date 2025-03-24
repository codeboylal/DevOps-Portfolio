import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useToaster } from "../../Toaster.js";
import { useAccessStore } from "../../hooks/access.js";

import cx from "classnames";
import styles from "./sideBar.module.css";

import Tooltip from "@mui/material/Tooltip";

// assets import
import def from "./assets/default.png";
import Scrollbar from "../scrollBar/scrollBar";

import LockUnverifiedPopUp from "../Container/lock-Unverified pop up/lock-Unverified pop up.jsx";

function SideBar({ active = "", setLoading, name = "", setSidePopUp }) {
  const navigate = useNavigate();
  // const setToast = useToaster();

  const [userId, setUserId] = useState("");
 
  const { access, nameDB, userImg, role, ITI_logo, fetchAccess } = useAccessStore();

  const words = nameDB?.split(" ");
  const truncatedName =
    words?.slice(0, 7).join(" ") + (words?.length > 7 ? "..." : "");
  const isTruncated = nameDB?.length > 7;

  useEffect(() => {
    setUserId(localStorage.getItem("id"));
  }, []);


  useEffect(() => {
    if (userId) {
      fetchAccess(userId, navigate);
    }
  }, [userId, fetchAccess, navigate]);

  const [module, setModule] = useState("");

  const [lockPopUp, setLockPopUp] = useState(false);
  const handleCheckAccess = (ind, nav, Module) => {
    if (access?.length !== 0) {
      if (access?.[ind]?.value) {
        // console.log("True", access, access?.[ind], access?.[ind]?.value);
        navigate(nav);
      } else {
        // console.log("False", access, access?.[ind], access?.[ind]?.value);
        setModule(Module);
        setLockPopUp(true);
        return;
      }
    } else {
      // console.log("no access");
      // setToast(`Verifying your access to ${Module}`, "success");
    }
  };

  return (
    <div className={styles.mainDiv}>
      <Scrollbar>
        <div
          className={cx(styles.imgDiv, styles.pointer)}
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={ITI_logo}
            alt="ITI Building Design"
            className={styles.logoDes}
          />
          <svg
            className={styles.closeSVG}
            onClick={(e) => {
              e.stopPropagation();
              setSidePopUp(false);
            }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.72102 22.2787C1.79068 22.3485 1.8734 22.4038 1.96444 22.4415C2.05549 22.4793 2.15309 22.4987 2.25165 22.4987C2.35021 22.4987 2.44781 22.4793 2.53885 22.4415C2.6299 22.4038 2.71262 22.3485 2.78227 22.2787L11.9998 13.0612L21.221 22.2787C21.3618 22.4195 21.5526 22.4985 21.7516 22.4985C21.9507 22.4985 22.1415 22.4195 22.2823 22.2787C22.423 22.138 22.5021 21.9471 22.5021 21.7481C22.5021 21.5491 22.423 21.3582 22.2823 21.2175L13.061 12L22.2785 2.77872C22.4193 2.63799 22.4983 2.44712 22.4983 2.2481C22.4983 2.04907 22.4193 1.8582 22.2785 1.71747C22.1378 1.57674 21.9469 1.49768 21.7479 1.49768C21.5489 1.49768 21.358 1.57674 21.2173 1.71747L11.9998 10.9387L2.77852 1.72122C2.63505 1.59835 2.45049 1.53415 2.26173 1.54144C2.07298 1.54873 1.89392 1.62698 1.76035 1.76055C1.62678 1.89412 1.54853 2.07318 1.54124 2.26193C1.53395 2.45069 1.59815 2.63525 1.72102 2.77872L10.9385 12L1.72102 21.2212C1.58134 21.3617 1.50293 21.5518 1.50293 21.75C1.50293 21.9481 1.58134 22.1382 1.72102 22.2787Z"
              fill="black"
            />
          </svg>
        </div>
        <div>
          <div className={styles.navPage__items}>
            <div
            // style={{
            //     display: access?.[0]?.value ? 'flex' : 'none'
            // }} className={styles.none}
            >
              <div
                onClick={() => {
                  handleCheckAccess(0, "/", "Display Center");
                }}
                className={cx(styles.navPage__item, styles.displayCenter, {
                  [styles.displayCenterActive]: active === "displayCenter",
                })}
              >
                <svg
                  className={styles.svgDimension}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id={styles.displayCenter}
                    d="M12.4987 13C11.5782 13 10.832 13.7462 10.832 14.6667V17.1667C10.832 18.0872 11.5782 18.8333 12.4987 18.8333H12.5187C13.5629 18.8333 14.459 18.7785 15.2077 18.6121C15.9659 18.4436 16.6232 18.1498 17.1359 17.6372C17.6485 17.1245 17.9423 16.4672 18.1108 15.709C18.1872 15.3652 18.2376 15.0162 18.2707 14.6649C18.3571 13.7485 17.5859 13 16.6654 13H12.4987Z"
                    fill="#0E0E0F"
                  />
                  <path
                    id={styles.displayCenter}
                    d="M1.66602 13.0203V11.3337C1.66602 10.4132 2.41221 9.66699 3.33268 9.66699H7.49935C8.41985 9.66699 9.16602 10.4132 9.16602 11.3337V17.167C9.16602 18.0875 8.41985 18.8337 7.49935 18.8337H7.47935C6.43507 18.8337 5.53903 18.7788 4.79031 18.6124C4.03212 18.4439 3.37489 18.1502 2.86221 17.6375C2.34952 17.1248 2.05578 16.4676 1.88728 15.7093C1.72088 14.9607 1.66602 14.0646 1.66602 13.0203Z"
                    fill="#0E0E0F"
                  />
                  <path
                    id={styles.displayCenter}
                    d="M18.332 9.66699C18.332 10.5875 17.5859 11.3337 16.6654 11.3337H12.4987C11.5782 11.3337 10.832 10.5875 10.832 9.66699V3.83366C10.832 2.91318 11.5782 2.16699 12.4987 2.16699H12.5187C13.5629 2.16699 14.459 2.22186 15.2077 2.38826C15.9659 2.55676 16.6232 2.8505 17.1359 3.36318C17.6485 3.87587 17.9423 4.5331 18.1108 5.29128C18.2772 6.04001 18.332 6.93605 18.332 7.98033V9.66699Z"
                    fill="#0E0E0F"
                  />
                  <path
                    id={styles.displayCenter}
                    d="M9.16602 3.83366C9.16602 2.91318 8.41985 2.16699 7.49935 2.16699H7.47935C6.43508 2.16699 5.53904 2.22186 4.79031 2.38826C4.03213 2.55676 3.3749 2.8505 2.86221 3.36318C2.34953 3.87587 2.05579 4.5331 1.88729 5.29128C1.81086 5.63516 1.76043 5.98418 1.72732 6.33541C1.64095 7.25183 2.41221 8.00033 3.33269 8.00033H7.49935C8.41985 8.00033 9.16602 7.25413 9.16602 6.33366V3.83366Z"
                    fill="#0E0E0F"
                  />
                </svg>
                <label className={styles.pointer}>Display Center</label>
              </div>
            </div>

            <div
            // style={{
            //     display: access?.[1]?.value ? 'flex' : 'none'
            // }} className={styles.none}
            >
              <div
                className={cx(styles.navPage__item, styles.sales, {
                  [styles.salesActive]: active === "sales",
                })}
                onClick={() => {
                  handleCheckAccess(1, "/salespage", "Sales");
                }}
              >
                <svg
                  className={styles.svgDimension}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id={styles.sales}
                    d="M9.99935 11.6836C8.50768 11.6836 7.29102 12.9003 7.29102 14.3919V19.1836H12.7077V14.3919C12.7077 12.9003 11.491 11.6836 9.99935 11.6836Z"
                    fill="#0E0E0F"
                  />
                  <path
                    id={styles.sales}
                    d="M17.6243 6.46712L11.791 2.38379C10.716 1.63379 9.27435 1.63379 8.20768 2.38379L2.37435 6.46712C1.54102 7.05046 1.04102 8.00879 1.04102 9.02546V16.0588C1.04102 17.7838 2.44102 19.1838 4.16602 19.1838H6.04102V14.3921C6.04102 12.2088 7.81602 10.4338 9.99935 10.4338C12.1827 10.4338 13.9577 12.2088 13.9577 14.3921V19.1838H15.8327C17.5577 19.1838 18.9577 17.7838 18.9577 16.0588V9.02546C18.9577 8.00879 18.4577 7.05046 17.6243 6.46712Z"
                    fill="#0E0E0F"
                  />
                </svg>
                <label className={styles.pointer}>Sales</label>
              </div>
            </div>
            <div
            // style={{
            //     display: access?.[2]?.value ? 'flex' : 'none'
            // }} className={styles.none}
            >
              <div
                onClick={() => {
                  handleCheckAccess(3, "/projects", "Pre-Construction");
                }}
                className={cx(styles.navPage__item, styles.projects, {
                  [styles.projectsActive]: [
                    "projects",
                    "Pre-Construction",
                  ].includes(active),
                })}
              >
                <svg
                  className={styles.svgDimension}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id={styles.projects}
                    d="M1.25062 4.63037C1.25062 3.99724 1.51938 3.38974 1.9875 2.96349C2.46313 2.53162 3.0825 2.32599 3.72438 2.38912C4.86188 2.49787 5.7525 3.53662 5.7525 4.75287V13.751C5.12938 13.2179 4.3275 12.9179 3.48813 12.9179C3.22563 12.9179 2.96063 12.9472 2.69563 13.0079C2.15375 13.131 1.66 13.386 1.25 13.7366L1.25062 4.63037Z"
                    fill="#0E0E0F"
                  />
                  <path
                    id={styles.projects}
                    d="M17.94 5.08984H6.95563V15.0167C6.95563 15.3717 6.71375 15.6767 6.36688 15.7592C6.0275 15.8423 5.675 15.6786 5.51688 15.3648C5.0425 14.4161 4.01938 13.9411 2.96375 14.1811C2.15875 14.3636 1.495 15.0267 1.3125 15.8311C1.27375 15.9967 1.25375 16.1623 1.25062 16.3248V16.3692C1.25062 16.3773 1.25 16.3848 1.25 16.3936C1.25375 16.8961 1.42063 17.3711 1.74063 17.7723C2.17063 18.3117 2.81313 18.6211 3.50188 18.6211L17.9406 18.6217C18.3875 18.6217 18.7506 18.2592 18.7506 17.8123V5.89984C18.75 5.45297 18.3869 5.08984 17.94 5.08984ZM9.12188 6.80609H12.0963C12.4281 6.80609 12.6975 7.07547 12.6975 7.40734C12.6975 7.73922 12.4281 8.00859 12.0963 8.00859H9.12188C8.79 8.00859 8.52063 7.73922 8.52063 7.40734C8.52063 7.07547 8.78938 6.80609 9.12188 6.80609ZM8.52 9.48672C8.52 9.15484 8.78938 8.88547 9.12125 8.88547H10.3344C10.6663 8.88547 10.9356 9.15484 10.9356 9.48672C10.9356 9.81859 10.6663 10.088 10.3344 10.088H9.12125C8.78938 10.088 8.52 9.81859 8.52 9.48672ZM16.0356 15.3617C16.0356 15.8817 15.6138 16.3036 15.0938 16.3036H10.6081C10.0881 16.3036 9.66625 15.8817 9.66625 15.3617V12.6223C9.66625 12.3111 9.82 12.0198 10.0775 11.8442L12.32 10.3155C12.64 10.0973 13.0606 10.0973 13.3806 10.3155L15.6231 11.8442C15.8806 12.0198 16.0344 12.3111 16.0344 12.6223V15.3617H16.0356Z"
                    fill="#0E0E0F"
                  />
                </svg>
                <label className={styles.pointer}>Pre-Construction</label>
              </div>
            </div>
            <div
            // style={{
            //     display: access?.[4]?.value ? 'flex' : 'none'
            // }} className={styles.none}
            >
              <div
                onClick={() => {
                  handleCheckAccess(4, "/constructor", "Construction");
                }}
                className={cx(styles.navPage__item, styles.displayCenter, {
                  [styles.constructorActive]: active === "Constructor",
                })}
              >
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id={styles.constructor}
                    d="M15.3667 16.975L10.9417 12.55L13.0417 10.45L17.4667 14.875C17.75 15.1583 17.8917 15.5083 17.8917 15.925C17.8917 16.3417 17.75 16.6917 17.4667 16.975C17.1833 17.2583 16.8333 17.4 16.4167 17.4C16 17.4 15.65 17.2583 15.3667 16.975ZM1.56667 16.975C1.28333 16.6917 1.14167 16.3417 1.14167 15.925C1.14167 15.5083 1.28333 15.1583 1.56667 14.875L7.41667 9.025L5.71667 7.325C5.53333 7.50833 5.3 7.6 5.01667 7.6C4.73333 7.6 4.5 7.50833 4.31667 7.325L3.74167 6.75V9C3.74167 9.23334 3.64167 9.39167 3.44167 9.475C3.24167 9.55833 3.05833 9.51667 2.89167 9.35L0.166667 6.625C0 6.45833 -0.0416667 6.275 0.0416667 6.075C0.125 5.875 0.283333 5.775 0.516667 5.775H2.76667L2.21667 5.225C2.01667 5.025 1.91667 4.79167 1.91667 4.525C1.91667 4.25833 2.01667 4.025 2.21667 3.825L5.06667 0.975001C5.4 0.641668 5.75833 0.400001 6.14167 0.250001C6.525 0.100001 6.91667 0.0250011 7.31667 0.0250011C7.65 0.0250011 7.96267 0.0750012 8.25467 0.175001C8.54667 0.275001 8.834 0.425001 9.11667 0.625001C9.25 0.708334 9.321 0.825001 9.32967 0.975001C9.33833 1.125 9.284 1.25833 9.16667 1.375L7.26667 3.275L7.81667 3.825C8 4.00833 8.09167 4.24167 8.09167 4.525C8.09167 4.80833 8 5.04167 7.81667 5.225L9.51667 6.925L11.7667 4.675C11.7 4.49167 11.646 4.3 11.6047 4.1C11.5633 3.9 11.5423 3.7 11.5417 3.5C11.5417 2.51667 11.8793 1.68733 12.5547 1.012C13.23 0.336668 14.059 -0.00066568 15.0417 9.86193e-07C15.175 9.86193e-07 15.3 0.00433433 15.4167 0.013001C15.5333 0.0216677 15.65 0.0423344 15.7667 0.075001C15.9167 0.125001 16.0127 0.229334 16.0547 0.388001C16.0967 0.546668 16.059 0.684001 15.9417 0.800001L14.3167 2.425C14.2167 2.525 14.1667 2.64167 14.1667 2.775C14.1667 2.90833 14.2167 3.025 14.3167 3.125L15.4167 4.225C15.5167 4.325 15.6333 4.375 15.7667 4.375C15.9 4.375 16.0167 4.325 16.1167 4.225L17.7417 2.6C17.8583 2.48333 17.996 2.44167 18.1547 2.475C18.3133 2.50833 18.4173 2.60833 18.4667 2.775C18.5 2.89167 18.521 3.00833 18.5297 3.125C18.5383 3.24167 18.5423 3.36667 18.5417 3.5C18.5417 4.48333 18.2043 5.31233 17.5297 5.987C16.855 6.66167 16.0257 6.99933 15.0417 7C14.8417 7 14.6417 6.98333 14.4417 6.95C14.2417 6.91667 14.05 6.85833 13.8667 6.775L3.66667 16.975C3.38333 17.2583 3.03333 17.4 2.61667 17.4C2.2 17.4 1.85 17.2583 1.56667 16.975Z"
                    fill="black"
                  />
                </svg>

                <label className={styles.pointer}>Construction</label>
              </div>
            </div>
            <div>
              <div
                className={cx(styles.navPage__item, styles.inbox, {
                  [styles.inboxActive]: active === "inbox",
                })}
                onClick={() => {
                  navigate("/inbox");
                }}
              >
                <svg
                  className={styles.svgDimension}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2125_331)">
                    <mask
                      id="mask0_2125_331"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="21"
                    >
                      <path
                        id={styles.inbox}
                        d="M0 0.5H20V20.5H0V0.5Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_2125_331)">
                      <path
                        id={styles.inbox}
                        d="M17.5703 4.66992L12.4864 8.86668C11.0427 10.0584 8.95655 10.0584 7.51284 8.86668L2.42898 4.66992C2.34104 4.5973 1.82149 4.18357 1.22656 3.71209C1.92596 3.05263 2.8687 2.64844 3.90585 2.64844H16.0933C17.1081 2.64844 18.0324 3.03536 18.7269 3.66971C18.6445 3.74116 18.5645 3.81054 18.4876 3.87725C17.9971 4.30242 17.6319 4.61898 17.5703 4.66992Z"
                        fill="#0E0E0F"
                      />
                      <path
                        id={styles.inbox}
                        d="M19.3619 4.41406L13.1831 9.70992C11.3352 11.2354 8.66489 11.2354 6.81696 9.70992L0.557597 4.54199C0.306817 4.9584 0 5.2702 0 5.79836V14.4466C0 16.604 1.74889 18.3529 3.90626 18.3529H16.0938C18.1163 18.3529 19.7798 16.8158 19.9799 14.8461C19.9932 14.7147 20 14.5815 20 14.4466V5.79836C20 5.24113 19.6491 4.8516 19.3619 4.41406Z"
                        fill="#0E0E0F"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_2125_331">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <label className={styles.pointer}>Inbox</label>
              </div>
            </div>
            <div>
              <div
                className={cx(styles.navPage__item, styles.settings, {
                  [styles.settingsActive]: [
                    "settings",
                    "help",
                    "terms",
                    "Contractor Contacts",
                    "Profile",
                  ].includes(active),
                })}
                onClick={() => {
                  navigate("/settings");
                }}
              >
                <svg
                  className={styles.svgDimension}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id={styles.settings}
                    d="M15.3063 3.15645C15.1422 2.8772 14.9086 2.64523 14.6282 2.48312C14.3478 2.32101 14.0302 2.23431 13.7063 2.23145H6.29378C5.96991 2.23431 5.6523 2.32101 5.3719 2.48312C5.0915 2.64523 4.85787 2.8772 4.69378 3.15645L0.98753 9.57519C0.822965 9.86023 0.736328 10.1836 0.736328 10.5127C0.736328 10.8418 0.822965 11.1652 0.98753 11.4502L4.69378 17.8439C4.85787 18.1232 5.0915 18.3552 5.3719 18.5173C5.6523 18.6794 5.96991 18.7661 6.29378 18.7689H13.7063C14.0302 18.7661 14.3478 18.6794 14.6282 18.5173C14.9086 18.3552 15.1422 18.1232 15.3063 17.8439L19.0125 11.4252C19.1771 11.1402 19.2637 10.8168 19.2637 10.4877C19.2637 10.1586 19.1771 9.83523 19.0125 9.55019L15.3063 3.15645ZM13.125 10.5002C13.125 11.1183 12.9418 11.7224 12.5984 12.2364C12.255 12.7503 11.7669 13.1508 11.1959 13.3873C10.6249 13.6238 9.99656 13.6857 9.39037 13.5651C8.78418 13.4446 8.22736 13.1469 7.79032 12.7099C7.35328 12.2729 7.05566 11.716 6.93508 11.1099C6.8145 10.5037 6.87638 9.87533 7.11291 9.30431C7.34943 8.73329 7.74997 8.24523 8.26387 7.90185C8.77778 7.55847 9.38196 7.37519 10 7.37519C10.8288 7.37519 11.6237 7.70443 12.2097 8.29049C12.7958 8.87654 13.125 9.67139 13.125 10.5002Z"
                    fill="#0E0E0F"
                  />
                </svg>
                <label className={styles.pointer}>Settings</label>
              </div>
            </div>
            <div
              style={{
                display:
                  role === "ITI"
                    ? "flex"
                    : role === "companyAdmin"
                    ? "flex"
                    : "none",
              }}
              className={styles.none}
            >
              <div
                className={cx(styles.navPage__item, styles.admin, styles.none, {
                  [styles.adminActive]: ["users", "admin"].includes(active),
                })}
                onClick={() => {
                  navigate("/adminPanel");
                }}
                style={{
                  display:
                    role === "ITI"
                      ? "flex"
                      : role === "companyAdmin"
                      ? "flex"
                      : "none",
                }}
              >
                <svg
                  className={styles.svgDimension}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id={styles.admin}
                    d="M14.0662 18.75H1.85138C0.792791 18.75 0.0388844 17.7188 0.363103 16.7109L1.64826 12.6953C2.06232 11.4063 3.47248 10.7383 4.73029 11.2266C5.56623 11.5508 6.64045 11.8047 7.95685 11.8047C9.27326 11.8047 10.3475 11.5508 11.1834 11.2266C11.449 11.125 11.7264 11.0703 11.9959 11.0664L12.0506 11.0977C12.0467 11.1562 12.0467 11.2109 12.0467 11.2695C12.0467 11.3281 12.0467 11.3867 12.0506 11.4414L11.9881 11.4766C11.3592 11.8398 11.1404 12.6484 11.5037 13.2773L11.9647 14.0742C12.199 14.4805 12.6365 14.7344 13.1092 14.7344C13.3397 14.7344 13.5701 14.6719 13.7694 14.5586L13.8319 14.5234C13.9295 14.5859 14.0272 14.6406 14.1287 14.6953V14.7656C14.1287 15.4609 14.6717 16.0352 15.3553 16.082L15.5545 16.7031C15.8787 17.7187 15.1287 18.75 14.0662 18.75Z"
                    fill="#0E0E0F"
                  />
                  <path
                    id={styles.admin}
                    d="M7.96094 10.3047C10.1852 10.3047 11.9883 8.50158 11.9883 6.27734C11.9883 4.0531 10.1852 2.25 7.96094 2.25C5.7367 2.25 3.93359 4.0531 3.93359 6.27734C3.93359 8.50158 5.7367 10.3047 7.96094 10.3047Z"
                    fill="#0E0E0F"
                  />
                  <path
                    id={styles.admin}
                    d="M19.4416 12.1562L18.9337 11.8633C18.9728 11.6719 18.9923 11.4727 18.9923 11.2695C18.9923 11.0664 18.9728 10.8672 18.9337 10.6758L19.4416 10.3828C19.6994 10.2344 19.7892 9.90625 19.6369 9.64844L19.1798 8.85156C19.0314 8.59375 18.7033 8.50391 18.4455 8.65625L17.9376 8.94922C17.6408 8.69141 17.2931 8.48828 16.9103 8.35547V7.77344C16.9103 7.47656 16.6681 7.23438 16.3712 7.23438H15.4494C15.1525 7.23438 14.9103 7.47656 14.9103 7.77344V8.35547C14.5275 8.48438 14.1798 8.6875 13.883 8.94922L13.3751 8.65625C13.1173 8.50781 12.7892 8.59375 12.6408 8.85156L12.1798 9.64844C12.0314 9.90625 12.1212 10.2344 12.3751 10.3828L12.8791 10.6758C12.84 10.8672 12.8205 11.0664 12.8205 11.2695C12.8205 11.4727 12.84 11.6719 12.8791 11.8633L12.3751 12.1562C12.1173 12.3047 12.0275 12.6328 12.1798 12.8906L12.6408 13.6875C12.7892 13.9453 13.1173 14.0352 13.3751 13.8828L13.883 13.5898C14.1798 13.8477 14.5275 14.0508 14.9103 14.1836V14.7695C14.9103 15.0664 15.1525 15.3086 15.4494 15.3086H16.3712C16.6681 15.3086 16.9103 15.0664 16.9103 14.7695V14.1836C17.2931 14.0547 17.6408 13.8516 17.9376 13.5898L18.4455 13.8828C18.7033 14.0312 19.0314 13.9414 19.1798 13.6875L19.6408 12.8906C19.7892 12.6328 19.6994 12.3047 19.4416 12.1562ZM15.9103 12.6133C15.1681 12.6133 14.5705 12.0117 14.5705 11.2734C14.5705 10.5352 15.172 9.93359 15.9103 9.93359C16.6486 9.93359 17.2501 10.5352 17.2501 11.2734C17.2501 12.0117 16.6525 12.6133 15.9103 12.6133Z"
                    fill="#0E0E0F"
                  />
                </svg>
                <label className={styles.pointer}>Admin Panel</label>
              </div>
            </div>
          </div>
          <div className={cx(styles.profile, styles.pointer)}>
            <svg
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                navigate("/signin");
              }}
              className={cx(styles.displayActive, styles.svgDimension)}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p
              className={styles.displayActive}
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                navigate("/signin");
              }}
            >
              Logout
            </p>
            <img
              src={userImg || def}
              alt="ITI Building Design"
              className={cx(styles.imgDes, styles.displayNone)}
            />
            {isTruncated ? (
              <Tooltip
                title={nameDB}
                arrow
                placement="top"
                PopperProps={{
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -8], // Adjust this value to make the tooltip closer or further
                      },
                    },
                  ],
                }}
              >
                <label
                  className={cx(styles.truncatedLabel, styles.displayNone)}
                >
                  {truncatedName}
                </label>
              </Tooltip>
            ) : (
              <label className={cx(styles.truncatedLabel, styles.displayNone)}>
                {truncatedName}
              </label>
            )}
            <svg
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                navigate("/signin");
              }}
              className={cx(
                styles.displayNone,
                styles.absright,
                styles.svgDimension
              )}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </Scrollbar>
      {lockPopUp && (
        <LockUnverifiedPopUp
          pos={"absolute"}
          setLockUnverified={setLockPopUp}
          lockPopUp={false}
          Module={module}
        />
      )}
    </div>
  );
}

export default SideBar;
