// import React, { useState } from "react";


// import styles from "./settings.module.css";


// import contractorIcon from "../settings/SVGS/Vector.svg";
// import signatureIcon from "../settings/SVGS/email.svg";
// import quotationIcon from "../settings/SVGS/TEMPLATE.svg";
// import accountsIcon from "../settings/SVGS/Account.svg";
// import passwordIcon from "../settings/SVGS/key.svg";
// import usersIcon from "../settings/SVGS/user.svg";


// import PageSetup from "../../components/Container/pageSetup/pageSetup";
// import TopBar from "../../components/topBar/topBar";

// function Settings(){

//     const [loading, setLoading] = useState(false)

//     const cards = [
//         {
//             icon: contractorIcon,
//             title: "Contractor Contacts",
//             description: "Provide personal details and how we can reach you",
//         },
//         {
//             icon: signatureIcon,
//             title: "Signature Template",
//             description: "Manage your personal data, connected services, and data sharing settings",
//         },
//         {
//             icon: quotationIcon,
//             title: "Quotation Template",
//             description: "View and manage the apps connected to Metrix.",
//         },
//         {
//             icon: accountsIcon,
//             title: "Accounts",
//             description: "Manage billing, view invoices, and change your plan.",
//         },
//         {
//             icon: passwordIcon,
//             title: "Change Password",
//             description: "Update your password and secure your account",
//         },
//         {
//             icon: usersIcon,
//             title: "Users",
//             description: "Waves audius eCash hive polygon maker TRON harmony harmony eCash.",
//         },
//         {
//             icon: usersIcon,
//             title: "Help",
//             description: "Waves audius eCash hive polygon maker TRON harmony harmony eCash.",
//         },
//         {
//             icon: usersIcon,
//             title: "Terms & Condition",
//             description: "Waves audius eCash hive polygon maker TRON harmony harmony eCash.",
//         },
//     ];

//     return(
//         <PageSetup 
//             loaderState={loading}
//             active={"settings"}
//             appBar={true}
//             setLoading={setLoading}
//         >
//             <div className={styles.mainDiv}>
//                 <div>
//                     <TopBar 
//                         text={"Settings"}
//                         filterEnable={false}
//                     />
//                 </div>
//                 <div className={styles.cardContainer}>
//           {cards.map((card, index) => (
//             <div key={index} className={styles.card}>
//               <img src={card.icon} alt={card.title} className={styles.icon} />
//               <h3 className={styles.title}>{card.title}</h3>
//               <p className={styles.description}>{card.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
                        
//         </PageSetup>
//     )
// }

// export default Settings;



















import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./settings.module.css";

import contractorIcon from "../settings/SVGS/Vector.svg";
import signatureIcon from "../settings/SVGS/email.svg";
import quotationIcon from "../settings/SVGS/TEMPLATE.svg";
import accountsIcon from "../settings/SVGS/Account.svg";
import passwordIcon from "../settings/SVGS/key.svg";
import usersIcon from "../settings/SVGS/user.svg";
// import logOut from "../settings/SVGS/logOut.svg"
import sync from "./SVGS/sync.svg"
import terms from "./SVGS/Term.svg"
import help from "./SVGS/help.svg"
import logout from "./SVGS/lo2.svg"


import BuildingLoader from "../../components/loader/loader";

import ScrollBar from "../../components/scrollBar/scrollBar";
import PageSetup from "../../components/Container/pageSetup/pageSetup";
import TopBar from "../../components/topBar/topBar";

import {useToaster} from "../../Toaster.js";

// import { getClickUpData } from "../../services/syncData/getClickUpData";
import BASEURL from "../../const/const.js";

function Settings() {
  const navigate = useNavigate(); 

  const setToast = useToaster();

  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);
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
    {
      icon: usersIcon,
      title: "Users",
      description: "Full access to manage users, settings, data.",
    },
    {
      icon: passwordIcon,
      title: "Reset Password",
      description: "Update your password and secure your account",
    },
   
  
    {
      icon: terms,
      title: "Terms & Condition",
      description: "Read our terms and conditions.",
      onClick: () => navigate("/terms&Cond"), 
    },  {
      icon: help,
      title: "Help",
      description: "Find answers to your questions and get support.",
      onClick: () => navigate("/help"), 
    },
    // ,{
    //   icon: sync,
    //   title: "Sync",
    //   description: "Sync ClickUp Data into DB.",
    //   onClick: () => {setLoading(true); handleClickUpSync()}, 
    // },{
    //   icon: logout,
    //   title: "Log Out",
    //   description: "Logging out ends your session and secures your account.",
    //   onClick: () => {localStorage.clear(); navigate('/signin')}, 
    // }
  ];

  // const handleClickUpSync = () =>{
  //   setLoading(true)
  //   getClickUpData().then(response=>{
  //     // console.log(response?.data?.status)
  //     if(response?.data?.status === 200 ){
  //       setToast("Data Synced Successfully","success")
  //     }else{
  //       throw new Error ('Internal Server Error')
  //     }
  //   setLoading(false)

  //   }).catch(err=>{
  //   setLoading(false)

  //     console.log(err)
  //     setToast("Data Sync Failed","error")
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
      active={"settings"}
      appBar={true}
    >

      <div className={styles.mainDiv}>

        <div>
          <TopBar text={"Settings"} filterEnable={false} />
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

export default Settings;
