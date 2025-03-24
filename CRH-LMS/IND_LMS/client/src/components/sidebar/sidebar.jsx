import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Scrollbar from "../scrollBar/scrollBar.jsx";

import styles from "./sidebar.module.css";
import cx from "classnames";

import default_profile from "../../assets/appbar/default_profile.png";
import LMS from "../../assets/LMS.svg";

import CloseIcon from "@mui/icons-material/Close";

const Sidebar = React.memo(function Sidebar({
  active = "",
  profilePicture,
  popUp = false,
  setSideBarPopUp,
  name = "",
  education = "",
}) {
  const navigate = useNavigate();

  const [profile] = useState(profilePicture || default_profile);

  return (
    <div
      className={cx(
        styles.mainDiv,
        !popUp && styles.mediaMainDiv,
        popUp && styles.posRelative,
        styles.flex,
        styles.flexColumn,
        styles.alignCenter
      )}
    >
      <CloseIcon
        onClick={() => {
          popUp && setSideBarPopUp(false);
        }}
        className={cx(
          styles.closeIcon,
          !popUp && styles.closeNone,
          styles.pointer
        )}
      />
      <div
        className={cx(
          styles.flex,
          styles.flexColumn,
          styles.alignCenter,
          styles.justifyCenter,
          styles.profile,
          styles.pointer,
          styles.marginBottom
        )}
        onClick={() => {
          navigate("/profile");
        }}
      >
        <div
          className={cx(
            styles.profileImgDiv,
            !popUp && styles.mediaProfileImgDiv
          )}
        >
          <img className={styles.profileImg} src={profile} alt="LMS" />
        </div>
        <label
          className={cx(styles.pointer, styles.nameDes, !popUp && styles.none)}
        >
          {name || "-"}
        </label>
        <label
          className={cx(
            styles.pointer,
            styles.education,
            !popUp && styles.none
          )}
        >
          {education || "-"}
        </label>
      </div>
      <div className={styles.marginBottom}>
        <img
          src={LMS}
          alt="LMS"
          className={cx(styles.pointer, !popUp && styles.medaiLMSImg)}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <Scrollbar height={"calc(100vh - 400px"} sidebarProp={true} smallHeightAppbar={"calc(100vh - 250px"}>
        <div
          className={cx(styles.NavigationDiv, styles.flex, styles.flexColumn)}
        >
          {/* My Profile */}
          <div
            className={cx(styles.NavigationItem, styles.paddingItems)}
            onClick={() => {
              navigate("/profile");
            }}
          >
            <div
              className={cx(
                styles.Item,
                styles.flex,
                styles.alignCenter,
                active.toLowerCase() === "profile" && styles.active,
                active.toLowerCase() === "profile" && styles.ActiveSvgStroke
              )}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 18C4 16.9391 4.42143 15.9217 5.17157 15.1716C5.92172 14.4214 6.93913 14 8 14H16C17.0609 14 18.0783 14.4214 18.8284 15.1716C19.5786 15.9217 20 16.9391 20 18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18Z"
                  stroke="black"
                  strokeWidth="1.52"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10Z"
                  stroke="black"
                  strokeWidth="1.52"
                />
              </svg>
              <label className={cx(styles.pointer, !popUp && styles.none)}>
                My Profile
              </label>
            </div>
          </div>
          {/* Dashboard */}
          <div
            className={cx(styles.NavigationItem, styles.paddingItems)}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <div
              className={cx(
                styles.Item,
                styles.flex,
                styles.alignCenter,
                active.toLowerCase() === "dashboard" && styles.active,
                active.toLowerCase() === "dashboard" && styles.ActiveSvgStroke
              )}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.9316 6.44334C5.96656 5.40838 6.48404 4.8909 6.99997 4.54617C9.11865 3.13051 11.8815 3.13051 14.0002 4.54617C14.5161 4.8909 15.0336 5.40838 16.0685 6.44334V6.44334C16.522 6.89678 16.7487 7.1235 16.945 7.36275C17.7355 8.32593 18.2226 9.50189 18.3447 10.7419C18.3751 11.0499 18.3751 11.3706 18.3751 12.0118V15.7499C18.3751 17.1996 17.1998 18.3749 15.7501 18.3749V18.3749C14.3003 18.3749 13.1251 17.1996 13.1251 15.7499V14.8749C13.1251 13.4251 11.9498 12.2499 10.5001 12.2499V12.2499C9.05032 12.2499 7.87506 13.4251 7.87506 14.8749V15.7499C7.87506 17.1996 6.69981 18.3749 5.25006 18.3749V18.3749C3.80031 18.3749 2.62506 17.1996 2.62506 15.7499V12.0118C2.62506 11.3706 2.62506 11.0499 2.6554 10.7419C2.77753 9.50189 3.26463 8.32593 4.0551 7.36275C4.25144 7.1235 4.47816 6.89678 4.9316 6.44334V6.44334Z"
                  stroke="#1C1D1D"
                  strokeWidth="1.89"
                  strokeLinejoin="round"
                />
              </svg>
              <label className={cx(styles.pointer, !popUp && styles.none)}>
                Dashboard
              </label>
            </div>
          </div>
          {/* Explore Courses */}
          <div
            className={cx(styles.NavigationItem, styles.paddingItems)}
            onClick={() => {
              navigate("/exploreCourses");
            }}
          >
            <div
              className={cx(
                styles.Item,
                styles.flex,
                styles.alignCenter,
                (active.toLowerCase() === "explorecourses" || active.toLowerCase() === "course")  && styles.active,
                (active.toLowerCase() === "explorecourses" || active.toLowerCase() === "course") && styles.ActiveSvgStroke
              )}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.754 5.54479V5.54479C7.90365 5.54479 7.47847 5.54479 7.12271 5.60114C5.16437 5.91131 3.62848 7.4472 3.31831 9.40554C3.26196 9.7613 3.26196 10.1865 3.26196 11.0368V12.8675C3.26196 15.4307 3.26196 16.7123 3.76079 17.6913C4.19958 18.5525 4.89972 19.2526 5.76088 19.6914C6.73989 20.1902 8.02149 20.1902 10.5847 20.1902H12.4154C14.9786 20.1902 16.2601 20.1902 17.2392 19.6914C18.1003 19.2526 18.8005 18.5525 19.2392 17.6913C19.7381 16.7123 19.7381 15.4307 19.7381 12.8675V11.0368C19.7381 10.1865 19.7381 9.7613 19.6817 9.40554C19.3716 7.4472 17.8357 5.91131 15.8773 5.60114C15.5216 5.54479 15.0964 5.54479 14.246 5.54479V5.54479M8.754 5.54479V6.9178M8.754 5.54479V3.71411M8.754 5.54479H14.246M14.246 5.54479V3.71411M14.246 5.54479V6.9178M11.5 16.5289V10.1215M7.38099 16.5289V10.1215M15.619 16.5289V10.1215"
                  stroke="#1C1D1D"
                  strokeWidth="1.37301"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label className={cx(styles.pointer, !popUp && styles.none)}>
                Explore Courses
              </label>
            </div>
          </div>
          {/* My Courses */}
          <div
            className={cx(styles.NavigationItem, styles.paddingItems)}
            onClick={() => {
              navigate("/myCourses");
            }}
          >
            <div
              className={cx(
                styles.Item,
                styles.flex,
                styles.alignCenter,
                (active.toLowerCase() === "mycourses" || active.toLowerCase() === "coursedetails") && styles.active,
                (active.toLowerCase() === "mycourses" || active.toLowerCase() === "coursedetails") && styles.ActiveSvgStroke
              )}
            >
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.898 15H5.898C4.968 15 4.503 15 4.121 15.102C3.61231 15.2384 3.14849 15.5063 2.77618 15.8788C2.40386 16.2513 2.13616 16.7152 2 17.224"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M6 6H14M6 9.5H11M17.5 18H6M8 21C5.172 21 3.757 21 2.879 20.121C2 19.243 2 17.828 2 15V7C2 4.172 2 2.757 2.879 1.879C3.757 1 5.172 1 8 1H12C14.828 1 16.243 1 17.121 1.879C18 2.757 18 4.172 18 7M12 21C14.828 21 16.243 21 17.121 20.121C18 19.243 18 17.828 18 15V11"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <label className={cx(styles.pointer, !popUp && styles.none)}>
                My Courses
              </label>
            </div>
          </div>
          {/* Assignment */}
          {/* <div className={cx(styles.NavigationItem, styles.paddingItems)}>
            <div className={cx(styles.Item, styles.flex, styles.alignCenter, active === "assignment" && styles.active, active === "assignment" && styles.ActiveSvgStroke)}>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.83866 17.4123V14.6663M11.5 12.8356V17.4123M15.1614 17.4123V11.005M6.46565 11.4626L7.80626 9.8986C8.67662 8.88317 10.0206 8.40602 11.3364 8.64526V8.64526C13.1587 8.97658 15.0275 8.39279 16.3372 7.08312L16.5344 6.88594M9.85241 20.1584H13.1476C15.8935 20.1584 17.2664 20.1584 18.2288 19.4591C18.5396 19.2333 18.813 18.9599 19.0388 18.6491C19.7381 17.6867 19.7381 16.3137 19.7381 13.5679V10.2727C19.7381 7.52687 19.7381 6.15396 19.0388 5.19152C18.813 4.88069 18.5396 4.60734 18.2288 4.38151C17.2664 3.68225 15.8935 3.68225 13.1476 3.68225H9.85241C7.10659 3.68225 5.73367 3.68225 4.77123 4.38151C4.4604 4.60734 4.18705 4.88069 3.96122 5.19152C3.26196 6.15396 3.26196 7.52687 3.26196 10.2727V13.5679C3.26196 16.3137 3.26196 17.6867 3.96122 18.6491C4.18705 18.9599 4.4604 19.2333 4.77123 19.4591C5.73367 20.1584 7.10659 20.1584 9.85241 20.1584Z"
                  stroke="#1C1D1D"
                  strokeWidth="1.37301"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label className={cx(styles.pointer, !popUp && styles.none)}>Assignment</label>
            </div>
          </div> */}
          {/* Accomplishments */}
          <div
            className={cx(styles.NavigationItem, styles.paddingItems)}
            onClick={() => {
              navigate("/accomplishments");
            }}
          >
            <div
              className={cx(
                styles.Item,
                styles.flex,
                styles.alignCenter,
                active.toLowerCase() === "accomplishments" && styles.active,
                active.toLowerCase() === "accomplishments" && styles.ActiveSvgStroke
              )}
            >
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.178 6.52612V12.5995C16.178 13.2415 16.178 13.5625 16.059 13.8434C16.0198 13.9358 15.9715 14.0241 15.9147 14.1069C15.7422 14.3585 15.4717 14.5314 14.9309 14.8773L11.4684 17.0913C10.8415 17.4921 10.528 17.6926 10.1825 17.732C10.0692 17.745 9.95474 17.745 9.84142 17.732C9.49585 17.6926 9.1824 17.4921 8.55551 17.0913L5.09302 14.8773C4.55215 14.5314 4.28172 14.3585 4.10918 14.1069C4.0524 14.0241 4.00406 13.9358 3.96489 13.8434C3.84588 13.5625 3.84588 13.2415 3.84588 12.5995V6.52612M19.0239 5.14835L11.1424 1.52038C10.6489 1.29322 10.4022 1.17964 10.1414 1.15708C10.0552 1.14963 9.96864 1.14963 9.88251 1.15708C9.6217 1.17964 9.37495 1.29322 8.88146 1.52038L1 5.14835L8.83387 8.94094C9.34726 9.18948 9.60395 9.31376 9.87669 9.33842C9.96668 9.34655 10.0572 9.34655 10.1472 9.33842C10.4199 9.31375 10.6766 9.18948 11.19 8.94094L19.0239 5.14835ZM19.0239 5.14835V14.4178C19.0239 15.0062 19.0239 15.3004 18.9217 15.563C18.8881 15.6496 18.8464 15.7329 18.7973 15.8118C18.6485 16.0511 18.4132 16.2276 17.9425 16.5806L16.7709 17.4593"
                  stroke="black"
                  strokeWidth="1.50199"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label className={cx(styles.pointer, !popUp && styles.none)}>
                Accomplishments
              </label>
            </div>
          </div>
          {/* Projects */}
          {/* <div className={cx(styles.NavigationItem, styles.paddingItems)}>
            <div className={cx(styles.Item, styles.flex, styles.alignCenter, active === "projects" && styles.active, active === "projects" && styles.ActiveSvgStroke)}>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.26196 11.8566V8.56137C3.26196 6.502 3.26196 5.47231 3.78641 4.75048C3.95578 4.51736 4.16079 4.31235 4.39391 4.14297C5.11575 3.61853 6.14543 3.61853 8.2048 3.61853H9.11942C9.61545 3.61853 9.86346 3.61853 10.1018 3.66087C10.3936 3.71271 10.6751 3.81145 10.9353 3.95327C11.1479 4.06907 11.3415 4.22401 11.7289 4.53387V4.53387C12.1162 4.84373 12.3099 4.99867 12.5224 5.11447C12.7826 5.25629 13.0641 5.35503 13.3559 5.40687C13.5942 5.44921 13.8423 5.44921 14.3383 5.44921H14.7952C16.8546 5.44921 17.8843 5.44921 18.6061 5.97365C18.8393 6.14303 19.0443 6.34804 19.2136 6.58116C19.7381 7.30299 19.7381 8.33268 19.7381 10.392V11.8566M9.11942 7.27989H8.2048C6.14543 7.27989 5.11575 7.27989 4.39391 7.80433C4.16079 7.97371 3.95578 8.17872 3.78641 8.41184C3.26196 9.13367 3.26196 10.1634 3.26196 12.2227V15.1518C3.26196 17.2112 3.26196 18.2409 3.78641 18.9627C3.95578 19.1958 4.16079 19.4008 4.39391 19.5702C5.11575 20.0946 6.14543 20.0946 8.2048 20.0946H14.7952C16.8546 20.0946 17.8843 20.0946 18.6061 19.5702C18.8393 19.4008 19.0443 19.1958 19.2136 18.9627C19.7381 18.2409 19.7381 17.2112 19.7381 15.1518V14.0534C19.7381 11.994 19.7381 10.9644 19.2136 10.2425C19.0443 10.0094 18.8393 9.80438 18.6061 9.63501C17.8843 9.11057 16.8546 9.11057 14.7952 9.11057H14.3383C13.8423 9.11057 13.5942 9.11057 13.3559 9.06823C13.0641 9.01639 12.7826 8.91764 12.5224 8.77583C12.3099 8.66003 12.1162 8.50509 11.7289 8.19523V8.19523C11.3415 7.88536 11.1479 7.73043 10.9353 7.61463C10.6751 7.47281 10.3936 7.37407 10.1018 7.32223C9.86346 7.27989 9.61545 7.27989 9.11942 7.27989Z"
                  stroke="#1C1D1D"
                  strokeWidth="1.37301"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label className={cx(styles.pointer, !popUp && styles.none)}>Projects</label>
            </div>
          </div> */}
          {/* Download */}
          {/* <div className={cx(styles.NavigationItem, styles.paddingItems)}>
            <div className={cx(styles.Item, styles.flex, styles.alignCenter, active === "download" && styles.active, active === "download" && styles.ActiveSvgStroke)}>
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1476 3.58679H9.85241C7.10659 3.58679 5.73367 3.58679 4.77123 4.28605C4.4604 4.51188 4.18705 4.78523 3.96122 5.09606C3.26196 6.0585 3.26196 7.43142 3.26196 10.1772V13.4725C3.26196 16.2183 3.26196 17.5912 3.96122 18.5536C4.18705 18.8645 4.4604 19.1378 4.77123 19.3636C5.73367 20.0629 7.10659 20.0629 9.85241 20.0629H13.1476C15.8935 20.0629 17.2664 20.0629 18.2288 19.3636C18.5396 19.1378 18.813 18.8645 19.0388 18.5536C19.7381 17.5912 19.7381 16.2183 19.7381 13.4725V10.1772C19.7381 7.43141 19.7381 6.0585 19.0388 5.09606C18.813 4.78523 18.5396 4.51188 18.2288 4.28605C17.2664 3.58679 15.8935 3.58679 13.1476 3.58679Z"
                  stroke="#1C1D1D"
                  strokeWidth="1.37301"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.92328 17.3174H16.0767M9.97441 11.1509H9.153C8.40825 11.1509 8.03588 11.1509 7.89881 11.3396C7.85636 11.398 7.82833 11.4657 7.81704 11.537C7.78056 11.7673 8.04387 12.0306 8.57048 12.5572L10.9175 14.9042C11.1602 15.1469 11.2815 15.2683 11.4284 15.2915C11.4758 15.299 11.5241 15.299 11.5716 15.2915C11.7184 15.2683 11.8398 15.1469 12.0825 14.9042L14.4295 12.5572C14.9561 12.0306 15.2194 11.7673 15.1829 11.537C15.1716 11.4657 15.1436 11.398 15.1011 11.3396C14.9641 11.1509 14.5917 11.1509 13.847 11.1509H13.0255L12.5303 7.24097C12.4646 6.72198 12.0231 6.33289 11.5 6.33289V6.33289C10.9768 6.33289 10.5354 6.72198 10.4696 7.24097L9.97441 11.1509Z"
                  stroke="#1C1D1D"
                  strokeWidth="1.37301"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label className={cx(styles.pointer, !popUp && styles.none)}>Downloaded</label>
            </div>
          </div> */}
          {/* Settings */}
          {/* <div className={cx(styles.NavigationItem, styles.paddingItems)}>
            <div
              className={cx(
                styles.Item,
                styles.ItemFill,
                styles.flex,
                styles.alignCenter,
                active === "settings" && styles.active, active === "settings" && styles.ActiveSvgStroke, active === "settings" && styles.ActiveSvgFill
              )}
            >
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.1951 15.0475C13.1611 15.0475 14.7547 13.4538 14.7547 11.4879C14.7547 9.52193 13.1611 7.92822 11.1951 7.92822C9.22915 7.92822 7.63544 9.52193 7.63544 11.4879C7.63544 13.4538 9.22915 15.0475 11.1951 15.0475ZM11.1951 13.7127C12.4238 13.7127 13.4198 12.7166 13.4198 11.4879C13.4198 10.2592 12.4238 9.26309 11.1951 9.26309C9.96636 9.26309 8.97031 10.2592 8.97031 11.4879C8.97031 12.7166 9.96636 13.7127 11.1951 13.7127Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.9698 2.46841L14.3276 5.09291C14.6188 5.23581 14.8987 5.39801 15.1659 5.57784L17.6187 4.57513C18.0306 4.40674 18.5036 4.56852 18.7262 4.95392L20.6191 8.23259C20.8416 8.61799 20.7452 9.1085 20.3934 9.38105L18.2982 11.0042C18.3089 11.164 18.3143 11.3253 18.3143 11.4878C18.3143 11.6503 18.3089 11.8115 18.2982 11.9714L20.3934 13.5945C20.7452 13.867 20.8416 14.3576 20.6191 14.743L18.7262 18.0216C18.5036 18.407 18.0306 18.5688 17.6187 18.4004L15.1659 17.3977C14.8987 17.5775 14.6188 17.7398 14.3276 17.8826L13.9698 20.5071C13.9096 20.9481 13.533 21.2768 13.0879 21.2768H9.3021C8.85708 21.2768 8.48048 20.9481 8.42035 20.5071L8.06246 17.8826C7.7713 17.7398 7.49133 17.5775 7.2242 17.3977L4.7714 18.4004C4.35947 18.5688 3.88648 18.407 3.66396 18.0216L1.77103 14.743C1.54851 14.3576 1.6449 13.867 1.9967 13.5945L4.09191 11.9714C4.08119 11.8115 4.07575 11.6503 4.07575 11.4878C4.07575 11.3253 4.08119 11.164 4.09191 11.0042L1.9967 9.38105C1.6449 9.1085 1.54851 8.61799 1.77102 8.23259L3.66396 4.95392C3.88647 4.56852 4.35946 4.40674 4.7714 4.57513L7.2242 5.57784C7.49133 5.39801 7.7713 5.23581 8.06246 5.09291L8.42035 2.46841C8.48048 2.02746 8.85708 1.69873 9.3021 1.69873H13.0879C13.533 1.69873 13.9096 2.02746 13.9698 2.46841ZM13.1011 5.97791L13.7395 6.29124C13.9759 6.40724 14.2033 6.53898 14.4204 6.68516L15.0115 7.08308L17.7643 5.95771L19.2688 8.56366L16.9188 10.3843L16.9663 11.0935C16.975 11.2236 16.9794 11.3551 16.9794 11.4878C16.9794 11.6205 16.975 11.7519 16.9663 11.882L16.9188 12.5913L19.2688 14.4118L17.7643 17.0179L15.0115 15.8925L14.4204 16.2904C14.2033 16.4366 13.9759 16.5683 13.7395 16.6843L13.1011 16.9977L12.6996 19.9419H9.69052L9.289 16.9977L8.65058 16.6843C8.41424 16.5683 8.18681 16.4366 7.96967 16.2904L7.37862 15.8925L4.6258 17.0179L3.12126 14.4118L5.47136 12.5913L5.42379 11.882C5.41506 11.7519 5.41061 11.6205 5.41061 11.4878C5.41061 11.3551 5.41506 11.2236 5.42379 11.0935L5.47136 10.3843L3.12125 8.56366L4.6258 5.95771L7.37862 7.08308L7.96967 6.68516C8.1868 6.53898 8.41424 6.40724 8.65059 6.29124L9.289 5.97791L9.69052 3.0336H12.6996L13.1011 5.97791Z"
                  fill="black"
                />
              </svg>
              <label className={cx(styles.pointer, !popUp && styles.none)}>Settings</label>
            </div>
          </div> */}
          {/* To Dos */}
          {/* <div className={cx(styles.NavigationItem, styles.paddingItems)}  onClick={()=>{navigate('/ToDo')}}>
            <div
              className={cx(
                styles.Item,
                styles.ItemFill,
                styles.flex,
                styles.alignCenter,
                active === "toDo" && styles.active, active === "toDo" && styles.ActiveSvgStroke
              )}
            >
              <svg
                width="21"
                height="19"
                viewBox="0 0 21 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4074 5.56742H13.6111M7.20369 9.22878H13.6111M7.20369 12.8901H13.6111M8.94283 17.4668H11.8719C13.9313 17.4668 14.961 17.4668 15.6828 16.9424C15.9159 16.773 16.1209 16.568 16.2903 16.3349C16.8148 15.6131 16.8148 14.5834 16.8148 12.524V5.93356C16.8148 3.87419 16.8148 2.84451 16.2903 2.12267C16.1209 1.88955 15.9159 1.68454 15.6828 1.51517C14.961 0.990723 13.9313 0.990723 11.8719 0.990723H8.94283C6.88347 0.990723 5.85378 0.990723 5.13195 1.51517C4.89883 1.68454 4.69382 1.88955 4.52444 2.12267C4 2.84451 4 3.87419 4 5.93356V12.524C4 14.5834 4 15.6131 4.52444 16.3349C4.69382 16.568 4.89883 16.773 5.13195 16.9424C5.85378 17.4668 6.88347 17.4668 8.94283 17.4668Z"
                  stroke="#1C1D1D"
                  strokeWidth="1.37301"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label className={cx(styles.pointer, !popUp && styles.none)}>To Dos</label>
            </div>
          </div> */}
          {/* Support */}
          <div
            className={cx(styles.NavigationItem, styles.paddingItems)}
            onClick={() => {
              navigate("/support");
            }}
          >
            <div
              className={cx(
                styles.Item,
                styles.ItemFill,
                styles.flex,
                styles.alignCenter,
                active.toLowerCase() === "support" && styles.active,
                active.toLowerCase() === "support" && styles.ActiveSvgStroke,
                active.toLowerCase() === "support" && styles.ActiveSvgFill
              )}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5159 0.166748C5.00193 0.166748 0.51593 4.65275 0.51593 10.1667V14.3097C0.51593 15.3337 1.41293 16.1667 2.51593 16.1667H3.51593C3.78115 16.1667 4.0355 16.0614 4.22304 15.8739C4.41057 15.6863 4.51593 15.432 4.51593 15.1667V10.0237C4.51593 9.75853 4.41057 9.50418 4.22304 9.31664C4.0355 9.1291 3.78115 9.02375 3.51593 9.02375H2.60793C3.16393 5.15375 6.49393 2.16675 10.5159 2.16675C14.5379 2.16675 17.8679 5.15375 18.4239 9.02375H17.5159C17.2507 9.02375 16.9964 9.1291 16.8088 9.31664C16.6213 9.50418 16.5159 9.75853 16.5159 10.0237V16.1667C16.5159 17.2697 15.6189 18.1667 14.5159 18.1667H12.5159V17.1667H8.51593V20.1667H14.5159C16.7219 20.1667 18.5159 18.3727 18.5159 16.1667C19.6189 16.1667 20.5159 15.3337 20.5159 14.3097V10.1667C20.5159 4.65275 16.0299 0.166748 10.5159 0.166748Z"
                  fill="#1C1D1D"
                />
              </svg>
              <label className={cx(styles.pointer, !popUp && styles.none)}>
                Support
              </label>
            </div>
          </div>
        </div>
      </Scrollbar>
      <div
        className={cx(styles.NavigationItem, styles.paddingItems, styles.abs)}
        onClick={() => {
          navigate("/signin");
        }}
      >
        <div
          className={cx(
            styles.Item,
            styles.ItemFill,
            styles.flex,
            styles.alignCenter
          )}
        >
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_100_2191)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.9116 15.6615C12.9116 15.8259 12.8463 15.9835 12.7301 16.0997C12.6139 16.216 12.4562 16.2813 12.2919 16.2813H2.37529C2.21091 16.2813 2.05326 16.216 1.93703 16.0997C1.8208 15.9835 1.7555 15.8259 1.7555 15.6615V4.50535C1.7555 4.34097 1.8208 4.18333 1.93703 4.0671C2.05326 3.95087 2.21091 3.88557 2.37529 3.88557H12.2919C12.4562 3.88557 12.6139 3.95087 12.7301 4.0671C12.8463 4.18333 12.9116 4.34097 12.9116 4.50535V6.98449C12.9116 7.14887 12.9769 7.30652 13.0932 7.42275C13.2094 7.53898 13.367 7.60428 13.5314 7.60428C13.6958 7.60428 13.8534 7.53898 13.9697 7.42275C14.0859 7.30652 14.1512 7.14887 14.1512 6.98449V4.50535C14.1512 4.01222 13.9553 3.53929 13.6066 3.19059C13.2579 2.84189 12.785 2.646 12.2919 2.646H2.37529C1.88215 2.646 1.40922 2.84189 1.06052 3.19059C0.711826 3.53929 0.51593 4.01222 0.51593 4.50535L0.51593 15.6615C0.51593 16.1546 0.711826 16.6276 1.06052 16.9763C1.40922 17.3249 1.88215 17.5208 2.37529 17.5208H12.2919C12.785 17.5208 13.2579 17.3249 13.6066 16.9763C13.9553 16.6276 14.1512 16.1546 14.1512 15.6615V13.1823C14.1512 13.018 14.0859 12.8603 13.9697 12.7441C13.8534 12.6279 13.6958 12.5626 13.5314 12.5626C13.367 12.5626 13.2094 12.6279 13.0932 12.7441C12.9769 12.8603 12.9116 13.018 12.9116 13.1823V15.6615Z"
                fill="#FF702D"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.1681 10.5222C20.2258 10.4647 20.2716 10.3963 20.3029 10.321C20.3341 10.2457 20.3502 10.1649 20.3502 10.0834C20.3502 10.0019 20.3341 9.92118 20.3029 9.84588C20.2716 9.77058 20.2258 9.70219 20.1681 9.64461L16.4494 5.9259C16.333 5.80952 16.1752 5.74414 16.0106 5.74414C15.846 5.74414 15.6882 5.80952 15.5718 5.9259C15.4554 6.04228 15.39 6.20012 15.39 6.36471C15.39 6.52929 15.4554 6.68714 15.5718 6.80352L18.2331 9.46364H7.33359C7.16921 9.46364 7.01157 9.52894 6.89534 9.64517C6.7791 9.7614 6.71381 9.91904 6.71381 10.0834C6.71381 10.2478 6.7791 10.4054 6.89534 10.5217C7.01157 10.6379 7.16921 10.7032 7.33359 10.7032H18.2331L15.5718 13.3633C15.4554 13.4797 15.39 13.6376 15.39 13.8021C15.39 13.9667 15.4554 14.1246 15.5718 14.2409C15.6882 14.3573 15.846 14.4227 16.0106 14.4227C16.1752 14.4227 16.333 14.3573 16.4494 14.2409L20.1681 10.5222Z"
                fill="#FF702D"
              />
            </g>
            <defs>
              <clipPath id="clip0_100_2191">
                <rect
                  width="19.8331"
                  height="19.8331"
                  fill="white"
                  transform="translate(0.51593 0.16687)"
                />
              </clipPath>
            </defs>
          </svg>
          <label
            className={cx(styles.pointer, styles.logout, !popUp && styles.none)}
          >
            Logout
          </label>
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
