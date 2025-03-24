import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import styles from "./adminPage.module.css";

import usersIcon from "./SVGS/user.svg";
import sync from "./SVGS/sync.svg";

import { useToaster } from "../../../Toaster.js";

import TopBar from "../../../components/topBar/topBar.jsx";
import ScrollBar from "../../../components/scrollBar/scrollBar.jsx";
import PageSetup from "../../../components/Container/pageSetup/pageSetup.jsx";
import BuildingLoader from "../../../components/loader/loader.jsx";
import BASEURL from "../../../const/const.js";
import { getClickUpProjectData } from "../../../services/syncData/getClickUpData.js";
import AnnouncementPopup from "../../../components/Admin Panel/Admin Announcements/announcements.jsx";
import { getUserData } from "../../../services/user/getUser.js";

function AdminPanel({  }) {
  const setToast = useToaster();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(localStorage.getItem("id") || null)
  const [role, setRole] = useState(null)

  getUserData({userId}).then(response=>{
    // console.log(response?.data?.data?.role)
    setRole(response?.data?.data?.role)
  }).catch(err=>{
    console.log(err)
  })
  
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({});
  const [loaderValue, setLoaderValue] = useState(false);
  
  // Persistent state for AnnouncementPopup
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(() => {
    return localStorage.getItem("isAnnouncementOpen") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isAnnouncementOpen", isAnnouncementOpen);
  }, [isAnnouncementOpen]);

  const handleOpenAnnouncement = () => {
    setIsAnnouncementOpen(true);
  };

  const handleCloseAnnouncement = () => {
    setIsAnnouncementOpen(false);
  };

  const cards = [
    {
      icon: usersIcon,
      title: "Users",
      description: "Full access to manage users, settings, data.",
      onClick: () => {navigate('/users')},
      role: "Both"
    },
    {
      icon: sync,
      title: "Display Center Data Sync",
      description: "Sync Now to Apply Latest Changes to Display Center",
      onClick: () => {
        setLoading(true);
        handleClickUpSync();
      },
      role: "ITI"
    },
    {
      icon: sync,
      title: "Pre-Construction Data Sync ",
      description: "Sync Now to Apply Latest Changes to Pre-Construction",
      onClick: () => {setLoading(true); handleProjectSync()}, 
      role: "ITI"
    },
    // {
    //   icon: usersIcon,
    //   title: "Announcements",
    //   description: "Full access to manage users, settings, data.",
    //   onClick: handleOpenAnnouncement,
    //   role: "ITI"
    // },
  ];

  const handleProjectSync = () => {
    setLoading(true)
    getClickUpProjectData().then(response =>{
      console.log(response?.data)
      setToast("Project Data Sync Successfull","success")
      setLoading(false)
    }).catch(err=>{
      console.log("Porject Data Sync Failed",err)
      setToast("Project Data Sync Failed","success")
      setLoading(false)
    })
    
  }

  const handleClickUpSync = () => {
    setLoading(true);
    setLoaderValue(true);

    const eventSource = new EventSource(`${BASEURL}/api/clickUp/get/data`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.error) {
        setToast("Data Sync Failed", "error");
        setLoading(false);
        setLoaderValue(false);
        eventSource.close();
      } else if (data.message) {
        setToast("Data Fetched Successfully", "success");
        setLoading(false);
        setLoaderValue(false);
        eventSource.close();
      } else {
        // Update progress dynamically
        const taskType = data?.type || "Unknown Type";
        const fetchedTasks = data?.fetchedTasks || 0;
        const totalTasks = data?.totalTasks || 0;

        setProgress((prevProgress) => ({
          ...prevProgress,
          [taskType]: { fetched: fetchedTasks, total: totalTasks },
        }));
      }
    };

    eventSource.onerror = (err) => {
      console.error("Error with SSE connection:", err);
      setToast("Data Sync Failed", "error");
      setLoading(false);
      setLoaderValue(false);
      setProgress({});
      eventSource.close();
    };
  };

  if (loading) {
    return <BuildingLoader loaderValue={loaderValue} progress={progress} />;
  }

  return (
    <PageSetup loaderState={loading} setLoading={setLoading} active={"admin"} appBar={true}>
      <div className={styles.mainDiv}>
        <div className={styles.adminHeading}>
          <TopBar text={"Admin"} filterEnable={false} />
        </div>
        <ScrollBar>
          <div className={styles.cardContainer}>
            {cards.map((card, index) => (
              <div
                key={index}
                className={styles.card}
                onClick={card.onClick}
                style={{ cursor: card.onClick ? "pointer" : "default" ,
                  display: card?.role === "ITI" ? role === "ITI" ? 'flex' : '' : 'flex' 
                }}
              >
                <img src={card.icon} alt={card.title} className={styles.icon} />
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.description}>{card.description}</p>
              </div>
            ))}
          </div>
        </ScrollBar>

        <AnnouncementPopup
          isOpen={isAnnouncementOpen}
          onClose={handleCloseAnnouncement}
          userId={userId}
        />
      </div>
    </PageSetup>
  );
}

export default AdminPanel;
