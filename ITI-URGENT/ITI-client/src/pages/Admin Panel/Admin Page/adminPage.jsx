

import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
import styles from "./adminPage.module.css";

// import contractorIcon from "../settings/SVGS/Vector.svg";
// import signatureIcon from "../settings/SVGS/email.svg";
// import quotationIcon from "../settings/SVGS/TEMPLATE.svg";
// import accountsIcon from "../settings/SVGS/Account.svg";
// import passwordIcon from "../settings/SVGS/key.svg";
import usersIcon from "./SVGS/user.svg";
// import logOut from "../settings/SVGS/logOut.svg"
import sync from "./SVGS/sync.svg"
// import terms from "./SVGS/Term.svg"
// import help from "./SVGS/help.svg"
// import logout from "./SVGS/lo2.svg"


// import BuildingLoader from "../../components/loader/loader";

// import ScrollBar from "../../components/scrollBar/scrollBar";
// import PageSetup from "../../components/Container/pageSetup/pageSetup";
// import TopBar from "../../components/topBar/topBar";

import {useToaster} from "../../../Toaster.js";

import TopBar from "../../../components/topBar/topBar.jsx";
import ScrollBar from "../../../components/scrollBar/scrollBar.jsx";
import PageSetup from "../../../components/Container/pageSetup/pageSetup.jsx";
import BuildingLoader from "../../../components/loader/loader.jsx";
import BASEURL from "../../../const/const.js";
import { getClickUpProjectData } from "../../../services/syncData/getClickUpData.js";

function AdminPanel() {
  // const navigate = useNavigate(); 

  const setToast = useToaster();

  const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState({});
    const [loaderValue, setLoaderValue] = useState(false);
    
  

  const cards = [
    // {
    //   icon: contractorIcon,
    //   title: "Contractor Contacts",
    //   description: "Provide personal details and how we can reach you",
    // },
    // {
    //   icon: signatureIcon,
    //   title: "Signature Template",
    //   description: "Manage your personal data, connected services, and data sharing settings",
    // },
    // {
    //   icon: quotationIcon,
    //   title: "Quotation Template",
    //   description: "View and manage the apps connected to Metrix.",
    // },
    // {
    //   icon: accountsIcon,
    //   title: "Accounts",
    //   description: "Manage billing, view invoices, and change your plan.",
    // },
    // {
    //   icon: passwordIcon,
    //   title: "Change Password",
    //   description: "Update your password and secure your account",
    // },
    {
      icon: usersIcon,
      title: "Users",
      description: "Full access to manage users, settings, data.",
    },
    // {
    //   icon: help,
    //   title: "Help",
    //   description: "Find answers to your questions and get support.",
    //   onClick: () => navigate("/help"), 
    // },
    // {
    //   icon: terms,
    //   title: "Terms & Condition",
    //   description: "Read our terms and conditions.",
    //   onClick: () => navigate("/terms&Cond"), 
    // },
    {
      icon: sync,
      title: "Sync",
      description: "Sync Now to Apply Latest Changes to Display Center",
      onClick: () => {setLoading(true); handleClickUpSync()}, 
    },
    // {
    //   icon: sync,
    //   title: "Sync",
    //   description: "Sync Now to Apply Latest Changes to Projects",
    //   onClick: () => {setLoading(true); handleProjectSync()}, 
    // }
    // ,{
    //   icon: logout,
    //   title: "Log Out",
    //   description: "Logging out ends your session and secures your account.",
    //   onClick: () => {localStorage.clear(); navigate('/signin')}, 
    // }
  ];


  // const handleProjectSync = () => {
  //   setLoading(true)
  //   getClickUpProjectData().then(response =>{
  //     console.log(response?.data)
  //     setToast("Project Data Sync Successfull","success")
  //     setLoading(false)
  //   }).catch(err=>{
  //     console.log("Porject Data Sync Failed",err)
  //     setToast("Project Data Sync Failed","success")
  //     setLoading(false)
  //   })
    
  // }


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
        setToast(data.message, "success");
        setLoading(false);
        setLoaderValue(false);
        eventSource.close();
      } else {
        // Update progress dynamically
        const taskType = data?.type || "Unknown Type"; // Determine if it's Plan or Facade
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
  
  


  if(loading){
    return(
      <BuildingLoader 
        loaderValue={loaderValue}
        progress={progress}
      />
    )
  }



  return (
    // loading ? <BuildingLoader /> :
    <PageSetup
    loaderState={loading}
    setLoading={setLoading}
    //   loaderState={loading}
      active={"admin"}
      appBar={true}
    >

      <div className={styles.mainDiv}>

        <div>
          <TopBar text={"Admin"} filterEnable={false} />
        </div>
        <ScrollBar>


        <div className={styles.cardContainer}>
          {cards.map((card, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={card.onClick} 
              style={{ cursor: card.onClick ? "pointer" : "default" }} 
            >

              <img src={card.icon} alt={card.title} className={styles.icon} />
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.description}>{card.description}</p>
            </div>

          ))}
          <div>
  
          </div>

        </div>
        </ScrollBar>

      </div>

    </PageSetup>
  );
}

export default AdminPanel;
