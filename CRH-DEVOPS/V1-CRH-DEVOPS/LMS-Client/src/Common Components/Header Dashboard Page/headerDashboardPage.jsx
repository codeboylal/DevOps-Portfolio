

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Notifications } from "@mui/icons-material";
import styles from "./headerDashboardPage.module.css";
import demo from "./demo.jpeg";
import CustomSearch from "../Input Component/Custom Search/customSearch";
import TabComponent from "../Tab Component/tabComponent";
import { GetUserDetails } from "../../services/Tasks/getTasks";
import Base_URL from "../../const/const";
import NotificationComponent from "../../components/container/Notification/Notification";

const HeaderDashboardPage = ({
  page,
  pageText = "",
  AppBarText = "Let's learn something new today!",
  headerPopupState,
  setActiveTab,
  activeTab,
  isCollapsed,
  userDataChange,
  searchValue,
  on_change,
}) => {
  const [pageLoc, setPageLoc] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [userData, setUserData] = useState({ name: "", profileImg: "" });
  const [profilePic, setProfilePic] = useState(demo);




  const location = useLocation();
  const navigate = useNavigate();
 
  // Toggle notification panel visibility
  const toggleNotification = () => {
    setShowNotification((prev) => !prev);
  };

  // Detect page location
  useEffect(() => {
    const pathname = location.pathname;
    setPageLoc(
      pathname.includes("myCourses") 
        ? "allCourse"
        : "other pages"
    );
  }, [location]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const UserID = localStorage.getItem("id");
      if (!UserID) {
        console.error("User ID not found in local storage.");
        navigate("/login");
        return;
      }

      try {
        const response = await GetUserDetails(UserID);
        setUserData(response?.data?.data[0] || {});
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserData();
  }, [userDataChange, navigate]);

  const [notificationData, setNotificationData] = useState([])

  // Set profile picture
  useEffect(() => {
    setProfilePic(
      userData?.profileImg?.length > 0 ? `${Base_URL}${userData.profileImg}` : demo
    );
    setNotificationData(userData?.notificationData)
  }, [userData]);

  return (
    <div
      className={`${styles.header} ${isCollapsed ? styles.expanded : ""}`}
      style={{ zIndex: headerPopupState ? "0" : "50" }}
    >
      {/* Greeting and Tabs */}
      <div className={styles.tabUserInfo}>
        <div className={styles.userInfo}>
          <div className={styles.greeting}>
            {pageText?.length !== 0 ? (
              <h1>{pageText}</h1>
            ) : (
              <h1>
                Hello {userData.name} <span role="img" aria-label="wave">👋</span>
              </h1>
            )}
            <p>{AppBarText}</p>
          </div>

          {/* Tabs */}
          {pageLoc === "allCourse" && (
            <div className={styles.tab} style={{ paddingBottom: "70px" }}>
              <TabComponent page={page} setActiveTab={setActiveTab} activeTab={activeTab} />
            </div>
          )}
        </div>
      </div>

      {/* Search and Icons */}
      <div className={styles.icons}>
        {
          pageLoc === "allCourse" &&
        <div className={styles.search}>
          <CustomSearch
            searchValue={searchValue}
            on_change={on_change}
            searchType="searchWithSearchIcon"
            placeholderText="Search..."
          />
        </div>
}

        <div
        className={styles.bellIcon}
        style={{ cursor: 'pointer',paddingTop:'10px' }}
        onClick={toggleNotification}
      >
        {/* Assuming this is the bell icon */}
        <Notifications />
      </div>

      {/* Notification Panel */}
        <div className={styles.notificationPanel} style={{display: !showNotification && 'none'}}>
          <NotificationComponent showNotification={showNotification} notificationData={notificationData} /> 
        </div> 

      {/* Profile Picture */}
      <img
        src={profilePic}
        onClick={() => navigate("/profile")}
        alt="Profile"
        className={styles.smallProfileImage}
      />




      </div>
    </div>
  );
};

export default HeaderDashboardPage;

