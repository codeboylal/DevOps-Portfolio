import React, { useState, useEffect, useRef } from "react";

import styles from "./appBar.module.css";
import cx from "classnames";

import CommonInputField from "../textField/input";
import SidebarPopUp from "../Container/SidebarPopUp/SidebarPopUp";

import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import def from "../sideBar/assets/default.png";
import Tooltip from "@mui/material/Tooltip";

import { getUserData } from "../../services/user/getUser.js";
import NotificationList from "../Container/Notification/notificationPopUp.jsx";
import { useAccessStore } from "../../hooks/access.js";

function AppBar({
  name = "",
  sideBarEnable,
  active,
  searchValue,
  handleSearchChange,
  setLikePlansActive,
  likePlansActive = false,
  handleLikePlans,
  refresh,
  setRefresh,
}) {
  // const [value, setValue] = useState('')

  const navigate = useNavigate();

  const [sidePopUp, setSidePopUp] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State for notifications popup
  const notificationRef = useRef(null); // Ref for the notification popup

  const [userId, setUserId] = useState("");
  const [nameDB, setNameDB] = useState(
    name || sessionStorage.getItem("name") || ""
  );
  const { access, role, fetchAccess } = useAccessStore();

  const words = nameDB?.split(" ");
  const truncatedName =
    words?.slice(0, 9).join(" ") + (words?.length > 9 ? "..." : "");
  const isTruncated = nameDB?.length > 9;

  useEffect(() => {
    setUserId(localStorage.getItem("id"));
  }, []);

  const [userImg, setUserImg] = useState(
    sessionStorage.getItem("userImg") || ""
  );

  useEffect(() => {
    if (userId !== "" && refresh) {
      getUserData({ userId })
        .then((response) => {
          setNameDB(response?.data?.data?.name);
          setUserImg(response?.data?.data?.userImg);
          setRefresh(false);
          sessionStorage.setItem("name", response?.data?.data?.name);
          sessionStorage.setItem("userImg", response?.data?.data?.userImg);
        })
        .catch((err) => {
          console.log(err);
          navigate("/signIn");
        });
    }
  }, [navigate, userId, refresh]);

  useEffect(() => {
    if (userId && refresh) {
      fetchAccess(userId, navigate);
    }
  }, [userId, fetchAccess, navigate, refresh]);

  // const handleMobileBack = () =>{
  //     if(active==="users"){
  //         navigate("/adminPanel")
  //     else if(active==="Pre-Construction"){
  //         navigate("/projects")
  //     }else{
  //         navigate("/settings")
  //     }
  // }

  const handleMobileBack = () => {
    setSidePopUp(false);

    if (active === "users") {
      navigate("/adminPanel");
    } else if (active === "Pre-Construction") {
      navigate("/projects");
    } else {
      navigate("/settings");
    }
  };

  return (
    <div className={styles.appDiv}>
      <div className={styles.sidebarSearch}>
        <div className={styles.sideBarMenu}>
          <MenuIcon
            onClick={() => {
              setSidePopUp(!sidePopUp);
            }}
            style={{
              color: "black",
              cursor: "pointer",
              display:
                active === "terms"
                  ? "none"
                  : active === "help"
                  ? "none"
                  : active === "Contractor Contacts"
                  ? "none"
                  : active === "Profile"
                  ? "none"
                  : active === "users"
                  ? "none"
                  : active === "Pre-Construction"
                  ? "none"
                  : "",
            }}
          />
          <svg
            className={styles.backButton}
            style={{
              cursor: "pointer",
              display:
                !(
                  active === "help" ||
                  active === "terms" ||
                  active === "Contractor Contacts" ||
                  active === "Profile" ||
                  active === "users" ||
                  active === "Pre-Construction"
                ) && "none",
            }}
            onClick={handleMobileBack}
            width="16"
            height="20"
            viewBox="0 0 16 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.2499 27.75C14.5696 27.75 14.8896 27.6278 15.1337 27.3837C15.6221 26.8953 15.6221 26.1043 15.1337 25.6162L3.51742 14L15.1337 2.38371C15.6221 1.89527 15.6221 1.10434 15.1337 0.616211C14.6452 0.128086 13.8543 0.127773 13.3662 0.616211L0.866172 13.1162C0.377734 13.6046 0.377734 14.3956 0.866172 14.8837L13.3662 27.3837C13.6102 27.6278 13.9302 27.75 14.2499 27.75Z"
              fill="black"
            />
          </svg>
        </div>

        <div className={cx(styles.heading, styles.active)}>
          {active === "displayCenter"
            ? "Display Center"
            : active === "settings"
            ? "Settings"
            : active === "terms"
            ? "Terms & Conditions"
            : active === "help"
            ? "Help"
            : active === "admin"
            ? "Admin Panel"
            : active === "sales"
            ? "Sales"
            : active === "projects"
            ? "Pre-Construction"
            : active === "inbox"
            ? "Inbox"
            : active === "Constructor"
            ? "Construction"
            : active === "Contractor Contacts"
            ? "Contractor Contacts"
            : active === "Profile"
            ? "Profile"
            : active === "users"
            ? "Users"
            : active === "Pre-Construction"
            ? "Pre-Construction"
            : active}
        </div>
        <div
          className={cx(styles.searchDiv, styles.displayNone)}
          style={{
            display:
              active === "displayCenter"
                ? ""
                : active === "projects"
                ? ""
                : active === "inbox"
                ? ""
                : "none",
          }}
        >
          <svg
            className={styles.search}
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id={styles.search}
              d="M13.0005 13.4995L9.53585 10.0349M9.53585 10.0349C10.4736 9.09716 11.0004 7.82534 11.0004 6.49921C11.0004 5.17308 10.4736 3.90126 9.53585 2.96354C8.59814 2.02583 7.32632 1.49902 6.00019 1.49902C4.67406 1.49902 3.40224 2.02583 2.46452 2.96354C1.5268 3.90126 1 5.17308 1 6.49921C1 7.82534 1.5268 9.09716 2.46452 10.0349C3.40224 10.9726 4.67406 11.4994 6.00019 11.4994C7.32632 11.4994 8.59814 10.9726 9.53585 10.0349Z"
              stroke="#9999A0"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <CommonInputField
            label={"Search"}
            value={searchValue}
            onChange={handleSearchChange}
            height="42px"
          />
        </div>
        <div
          style={{
            display:
              active === "terms"
                ? "flex"
                : active === "help"
                ? "flex"
                : active === "Contractor Contacts"
                ? "flex"
                : active === "Profile"
                ? "flex"
                : active === "users"
                ? "flex"
                : active === "Pre-Construction"
                ? "flex"
                : "none",
          }}
          className={cx(styles.backSpan, styles.displayNone)}
        >
          <svg
            style={{ cursor: "pointer" }}
            onClick={handleMobileBack}
            width="16"
            height="20"
            viewBox="0 0 16 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.2499 27.75C14.5696 27.75 14.8896 27.6278 15.1337 27.3837C15.6221 26.8953 15.6221 26.1043 15.1337 25.6162L3.51742 14L15.1337 2.38371C15.6221 1.89527 15.6221 1.10434 15.1337 0.616211C14.6452 0.128086 13.8543 0.127773 13.3662 0.616211L0.866172 13.1162C0.377734 13.6046 0.377734 14.3956 0.866172 14.8837L13.3662 27.3837C13.6102 27.6278 13.9302 27.75 14.2499 27.75Z"
              fill="black"
            />
          </svg>
          <span
            style={{
              color: "#020617",
              fontWeight: "700",
              fontSize: "1.25rem",
            }}
          >
            {active === "users"
              ? "Admin Panel"
              : active === "Pre-Construction"
              ? "Pre-Construction"
              : "Settings"}
          </span>
        </div>
      </div>

      <div className={cx(styles.iconsDiv, styles.displayNone)}>
        {/* <div className={styles.pointer} id="BellIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.856 17.082C16.7192 16.8614 18.5499 16.4217 20.31 15.772C18.8194 14.1208 17.9958 11.9745 17.999 9.75V9C17.999 7.4087 17.3669 5.88258 16.2417 4.75736C15.1165 3.63214 13.5903 3 11.999 3C10.4077 3 8.88162 3.63214 7.75641 4.75736C6.63119 5.88258 5.99905 7.4087 5.99905 9V9.75C6.00206 11.9746 5.17803 14.121 3.68705 15.772C5.42005 16.412 7.24705 16.857 9.14205 17.082M14.856 17.082C12.958 17.3071 11.0401 17.3071 9.14205 17.082M14.856 17.082C15.0001 17.5319 15.036 18.0094 14.9606 18.4757C14.8853 18.942 14.7009 19.384 14.4224 19.7656C14.144 20.1472 13.7794 20.4576 13.3582 20.6716C12.9371 20.8856 12.4714 20.9972 11.999 20.9972C11.5267 20.9972 11.061 20.8856 10.6399 20.6716C10.2187 20.4576 9.85412 20.1472 9.57567 19.7656C9.29722 19.384 9.11281 18.942 9.03746 18.4757C8.96211 18.0094 8.99794 17.5319 9.14205 17.082M3.12305 7.5C3.40502 5.82497 4.15684 4.26444 5.29105 3M18.707 3C19.8413 4.26444 20.5931 5.82497 20.875 7.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div> */}

        {/* <div className={styles.pointer}>
          <div onClick={() => setShowNotifications(!showNotifications)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.856 17.082C16.7192 16.8614 18.5499 16.4217 20.31 15.772C18.8194 14.1208 17.9958 11.9745 17.999 9.75V9C17.999 7.4087 17.3669 5.88258 16.2417 4.75736C15.1165 3.63214 13.5903 3 11.999 3C10.4077 3 8.88162 3.63214 7.75641 4.75736C6.63119 5.88258 5.99905 7.4087 5.99905 9V9.75C6.00206 11.9746 5.17803 14.121 3.68705 15.772C5.42005 16.412 7.24705 16.857 9.14205 17.082M14.856 17.082C12.958 17.3071 11.0401 17.3071 9.14205 17.082M14.856 17.082C15.0001 17.5319 15.036 18.0094 14.9606 18.4757C14.8853 18.942 14.7009 19.384 14.4224 19.7656C14.144 20.1472 13.7794 20.4576 13.3582 20.6716C12.9371 20.8856 12.4714 20.9972 11.999 20.9972C11.5267 20.9972 11.061 20.8856 10.6399 20.6716C10.2187 20.4576 9.85412 20.1472 9.57567 19.7656C9.29722 19.384 9.11281 18.942 9.03746 18.4757C8.96211 18.0094 8.99794 17.5319 9.14205 17.082M3.12305 7.5C3.40502 5.82497 4.15684 4.26444 5.29105 3M18.707 3C19.8413 4.26444 20.5931 5.82497 20.875 7.5"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {showNotifications && (
            <div
              ref={notificationRef}
              className={styles.notificationPopup}
              // style={{ position: "absolute", top: "60px", right: "0px", width:"300px",height:"500px" }}
            >
              <NotificationList userId={userId} />
            </div>
          )}
        </div> */}

        <div
          className={styles.pointer}
          // style={{
          //   display: active !== "displayCenter" && "none",
          // }}
          style={{
            display:
              active !== "displayCenter" &&
              active !== "projects" &&
              // active !== "Pre-Construction" &&
              active !== "inbox"
              // active !== "inbox" &&
              // active !== "Contractor Contacts"
                ? "none"
                : "block",
          }}
          onClick={() => {
            handleLikePlans();
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              style={{
                fill: likePlansActive && "black",
              }}
              d="M17.5 6.875C17.5 4.80417 15.7508 3.125 13.5933 3.125C11.9808 3.125 10.5958 4.06333 10 5.4025C9.40417 4.06333 8.01917 3.125 6.40583 3.125C4.25 3.125 2.5 4.80417 2.5 6.875C2.5 12.8917 10 16.875 10 16.875C10 16.875 17.5 12.8917 17.5 6.875Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* <div className={styles.pointer}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.5298 16.2802C12.3892 16.4206 12.1986 16.4995 11.9998 16.4995C11.8011 16.4995 11.6105 16.4206 11.4698 16.2802L3.96985 8.78015C3.83737 8.63798 3.76524 8.44993 3.76867 8.25563C3.7721 8.06133 3.85081 7.87594 3.98822 7.73853C4.12564 7.60112 4.31102 7.52241 4.50532 7.51898C4.69963 7.51555 4.88767 7.58767 5.02985 7.72015L11.9998 14.6902L18.9698 7.72015C19.0385 7.64647 19.1213 7.58736 19.2133 7.54637C19.3053 7.50538 19.4046 7.48334 19.5053 7.48156C19.606 7.47979 19.7061 7.49831 19.7994 7.53603C19.8928 7.57375 19.9777 7.6299 20.0489 7.70112C20.1201 7.77233 20.1762 7.85717 20.214 7.95056C20.2517 8.04394 20.2702 8.14397 20.2684 8.24468C20.2667 8.34538 20.2446 8.44469 20.2036 8.53669C20.1626 8.62869 20.1035 8.71149 20.0298 8.78015L12.5298 16.2802Z" fill="black"/>
                    </svg>
                </div> */}
        <div
          className={styles.profile}
          onClick={() => {
            navigate("/profile");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <img
            src={userImg || def}
            alt="ITI Building Design"
            className={styles.imgDes}
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
                className={styles.truncatedLabel}
                style={{
                  cursor: "pointer",
                }}
              >
                {truncatedName}
              </label>
            </Tooltip>
          ) : (
            <label
              className={styles.truncatedLabel}
              style={{
                cursor: "pointer",
              }}
            >
              {truncatedName}
            </label>
          )}
        </div>
      </div>
      {sidePopUp && (
        <SidebarPopUp
          PopUp={sidePopUp}
          setSidePopUp={setSidePopUp}
          active={active}
        />
      )}
    </div>
  );
}

export default AppBar;
