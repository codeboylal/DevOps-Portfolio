
// // import styles from "../iphone-popup/popup.module.css";

// import React from "react";
// import styles from "./popup.module.css";
// import UploadIcon from "./svgs/upload (1) 1.svg";
// import AddIcon from "./svgs/add (2) 1.svg";
// import HomeIcon from "./svgs/Isolation_Mode.svg";

// const InstallPopup = () => {
//   return (
//     <div className={styles.popup}>
//       <button className={styles.closeButton}>×</button>
//       <h2 className={styles.title}>Install the Web App in your <br/>iPhone / iPad</h2>
//       <ol className={styles.steps}>
//         <li>
//           Click on <img src={UploadIcon} alt="Upload icon" className={styles.icon} /> in the tab bar
//         </li>
//         <li>
//           Select <strong>Add to Home Screen</strong>{" "}
//           <img src={AddIcon} alt="Add icon" className={styles.icon} />
//         </li>
//         <li>
//           Look for <img src={HomeIcon} alt="Home icon" className={styles.icon} /> on your homescreen
//         </li>
//       </ol>
//     </div>
//   );
// };

// export default InstallPopup;
// Importing required assets and styles


import React from "react";
import styles from "./popup.module.css";
import UploadIcon from "./svgs/upload (1) 1.svg";
import AddIcon from "./svgs/add (2) 1.svg";
import HomeIcon from "./svgs/Isolation_Mode.svg";

const InstallPopup = ({setModal}) => {
  return (
    <div className={styles.div}>
      <div className={styles.popup}>
      <button className={styles.closeButton} onClick={()=>{setModal(false)}}>×</button>
      <h2 className={styles.title}>Install the Web App in your <br />iPhone / iPad</h2>
      <ol className={styles.steps}>
        <li>
          <strong>1.</strong> <strong>Click on </strong>{" "}
          <img src={UploadIcon} alt="Upload icon" className={styles.icon} />{" "}
         <strong> in the tab bar</strong>
        </li>
        <li>
          <strong>2.</strong> 
          <strong>Select  Add to Home Screen</strong>{" "}
          <img src={AddIcon} alt="Add icon" className={styles.icon} />
        </li>
        <li>
          <strong>3.</strong> <strong>Look for</strong>{" "}
          <img src={HomeIcon} alt="Home icon" className={styles.icon} /> <strong>on your
          homescreen</strong>
        </li>
      </ol>
    </div>
    </div>
  );
};

export default InstallPopup;

