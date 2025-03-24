// import React from "react";
// import styles from "./installation.module.css";
// import SignInUpAppBar from "../../../components/Container/Sign In-Up/Common App Bar/SignInUpAppBar";
// import CommonButton from "../../../components/button/button";
// import iphone from "../Logo/Icon.svg"
// import android from "../Logo/android.svg"
// import PaginationComponent from "../../../components/Pagination Component/paginationComponent";

// function InstallationPage(){
//     return(
//         <div>
//             <SignInUpAppBar />

//             <div className={styles.appContainer}>
//         <div className={styles.mainContent}>
//           <h1 className={styles.title}>Install the App</h1>
//           <p className={styles.description}>
//             You can use ITI Buildings directly in your browser or on the go with our mobile app
//           </p>

//           {/* Buttons */}
//           <div className={styles.buttonsContainer}>
//             <div className={styles.buttonDiv}>
//               <img src={android} alt="Android Logo" className={styles.icon} />
//               <CommonButton text={"Android"} />
//             </div>

//             <div className={styles.buttonDiv}>
//               <img src={iphone} alt="iPhone Logo" className={styles.icon} />
//               <CommonButton text={"iPhone"} />
//             </div>
//           </div>
//         </div>
//       </div>
//         </div>
//     )
// }

// export default InstallationPage;







import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./installation.module.css";
import SignInUpAppBar from "../../../components/Container/Sign In-Up/Common App Bar/SignInUpAppBar";
import CommonButton from "../../../components/button/button";
import iphone from "./svgInstallation/iphone.svg";
import android from "./svgInstallation/android.svg";

import web from "./svgInstallation/web.svg"

import InstallPopup from "../../../components/iphone-popup/iphonepop";
import {useToaster} from "../../../Toaster.js";


function InstallationPage() {
  const setToast = useToaster()
  const navigate = useNavigate()
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const [modal, setModal] = useState(false)

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      navigate('/signin'); // Navigate to /signin if the app is installed
    }
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleAndroidClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    } else {
      setToast("App already installed","error");
      // navigate('/signin')
    }
  };
// useEffect(()=>{
//   if(!deferredPrompt){
//     navigate('/signin')
//   }
// })
  return (
    <div>
      <SignInUpAppBar />

      <div className={styles.appContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Install the App</h1>
          <p className={styles.description}>
            You can use ITI Buildings directly in your browser or on the go with our mobile app.
          </p>

          {/* Buttons */}
          <div className={styles.buttonsContainer}>
            <div className={styles.buttonDiv}>
              {/* <img src={android} alt="Android Logo" className={styles.icon} /> */}
              <CommonButton imageProp={android}   imageLeft={"36%"} imageTop={"33%"} text="Android" onClick={handleAndroidClick} />
            </div>

            <div className={styles.buttonDiv} onClick={()=>{setModal(true)}}>
              {/* <img src={iphone} alt="iPhone Logo" className={styles.icon} /> */}
              <CommonButton imageProp={iphone} imageLeft={"36%"} imageTop={"33%"}  text="iPhone" />
            </div>
            <div className={styles.buttonDiv} onClick={()=>{navigate("/signin")}}>
            <CommonButton imageProp={web} imageLeft={"25%"} imageTop={"33%"}  text="Continue with Web" />

              {/* <img src={iphone} alt="iPhone Logo" className={styles.icon} /> */}
              {/* <CommonButton text="Continue on website" /> */}
              {/* <p>Continue with Web </p> */}
              {/* <div className={styles.web}> */}
    {/* <img src={web} alt="web Logo" className={styles.webicon} /> */}
    {/* <p> Continue with Web </p> */}
{/* </div> */}


            </div>
          </div>
        </div>
      </div>
      {
        modal && <InstallPopup 
          setModal={setModal}
        />
      }
    </div>
  );
}

export default InstallationPage;

       