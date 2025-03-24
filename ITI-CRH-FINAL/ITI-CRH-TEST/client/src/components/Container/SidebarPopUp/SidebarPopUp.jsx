// import React,{useEffect} from "react";

// import styles from "./SidebarPopUp.module.css";
// import SideBar from "../../sideBar/sideBar";

// function SidebarPopUp({setSidePopUp, active}){
//     useEffect(() => {
//     const mediaQuery = window.matchMedia('(min-width: 1150px)');

//     const handleMediaQueryChange = (event) => {
//         if (event.matches) {
//         setSidePopUp(false);
//         }
//     };
//     mediaQuery.addEventListener('change', handleMediaQueryChange);
//     if (mediaQuery.matches) {
//         setSidePopUp(false);
//     }
//     return () => {
//         mediaQuery.removeEventListener('change', handleMediaQueryChange);
//     };
//     }, []);
//     return(
//         <div
//             className={styles.sidePopUp}
//             onClick={()=>{setSidePopUp(false)}}
//         >
//             <div onClick={(e)=>{e.stopPropagation()}} >
//                 <SideBar
//                     name={""}
//                     active= {active}
//                     setSidePopUp={setSidePopUp}
//                 />
//             </div>
//         </div>
//     )
// }

// export default SidebarPopUp;

import React, { useEffect } from "react";
import styles from "./SidebarPopUp.module.css";
import SideBar from "../../sideBar/sideBar";

function SidebarPopUp({ setSidePopUp, active ,PopUp = false}) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1350px)");
    const handleMediaQueryChange = (event) => {
      if (event.matches) {
        setSidePopUp(false);
      }
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    if (mediaQuery.matches) {
      setSidePopUp(false);
    }
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const isPhone =
      /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isNotStandalone = window.matchMedia("(display-mode: standalone)")
      .matches;

    const setHeight = () => {
      const sidePopUp = document.querySelector(`.${styles.sidePopUp}`);
      if (sidePopUp) {
        if (isPhone) {
          sidePopUp.style.height = "calc(100vh - 55px)";
          if (isNotStandalone) {
            sidePopUp.style.height = "100vh";
          }
        } else {
          sidePopUp.style.height = "100vh";
        }
      }
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  return (
    PopUp &&  <div
      className={styles.sidePopUp}
      onClick={() => {
        setSidePopUp(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <SideBar name={""} active={active} setSidePopUp={setSidePopUp} />
      </div>
    </div>
  );
}

export default SidebarPopUp;
