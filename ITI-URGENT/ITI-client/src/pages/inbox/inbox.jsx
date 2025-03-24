
// import React from 'react';
// import styles from '../inbox/inbox.module.css'; // Ensure the correct path to your CSS file
// // import PageSetup from '../../Container/pageSetup/pageSetup';
// import PageSetup from '../../components/Container/pageSetup/pageSetup';
// import ScrollBar from "../../components/scrollBar/scrollBar";


// const EmptySection = () => {
//   return (
//     <div className={styles.mainContainer}>
//       <PageSetup active={"inbox"} appBar={true}>
//         <div className={styles.contentContainer}>
//         {/* <ScrollBar> */}

//           <div className={styles.imageContainer}>
//             <img
//               src={require('./imgs/cons.svg')} // Adjust based on your file structure
//               alt="Coming Soon"
//               className={styles.comingSoonImage}
//             />
//           </div>
//           <div className={styles.textContainer}>
//             <p className={styles.comingSoonSubtitle}>
//             </p>
//           </div>
//           {/* </ScrollBar> */}

//         </div>
//       </PageSetup>
//     </div>
//   );
// };

// export default EmptySection;


// import React from "react";
// import styles from "./EmptySection.module.css";
// import PageSetup from "../../components/Container/pageSetup/pageSetup";

// const EmptySection = () => {
//   return (
//     <div className={styles.mainContainer}>
//       <PageSetup active={"settings"} appBar={true}>
//         <div className={styles.contentContainer}>
//           <h1 className={styles.pageTitle}>inbox</h1>
//           <div className={styles.imageContainer}>
//             <img
//               src={require("./imgs/cons.svg")} // Ensure the image path is correct
//               alt="Coming Soon"
//               className={styles.comingSoonImage}
//             />
//           </div>
//           <div className={styles.textContainer}>
//             <h2 className={styles.comingSoonTitle}>Coming Soon!</h2>
//             <p className={styles.comingSoonSubtitle}>
//               This feature is under development. Stay tuned for updates!
//             </p>
//           </div>
//         </div>
//       </PageSetup>
//     </div>
//   );
// };

// export default EmptySection;


// import React from "react";
// import styles from "../inbox/inbox.module.css";
// import PageSetup from "../../components/Container/pageSetup/pageSetup";
// import consSvg from './imgs/cons.svg';
// const Inbox = () => {
//   return (
//     <div className={styles.mainContainer}>
//       <PageSetup active={"inbox"} appBar={true}>
//         <div className={styles.contentContainer}>
//           <h1 className={styles.pageTitle}></h1>
//           <div className={styles.imageContainer}>
//             <img
//                src={consSvg}// Ensure the correct path to your SVG
//               alt="Coming Soon"
//               className={styles.comingSoonImage}
//             />
//           </div>
//           <div className={styles.textContainer}>
//             <h2 className={styles.comingSoonTitle}>Coming Soon!</h2>
//             <p className={styles.comingSoonSubtitle}>
//               This feature is under development. Stay tuned for updates!
//             </p>
//           </div>
//         </div>
//       </PageSetup>
//     </div>
//   );
// };

// export default Inbox;



import React from "react";
import styles from "../inbox/inbox.module.css";
import PageSetup from "../../components/Container/pageSetup/pageSetup";
import consSvg from './imgs/cons.svg';
import ScrollBar from "../../components/scrollBar/scrollBar";


const Inbox = () => {
  return (
    <div className={styles.mainContainer}>
      <PageSetup active={"inbox"} appBar={true}>
        <div className={styles.contentContainer}>
        <ScrollBar>

          <div className={styles.centeredContent}>
            <div className={styles.imageContainer}>
              <img
                src={consSvg}
                alt="Coming Soon"
                className={styles.comingSoonImage}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={styles.comingSoonTitle}>Coming Soon!</h2>
              <p className={styles.comingSoonSubtitle}>
                This feature is under development. Stay tuned for updates!
              </p>
            </div>
          </div>
          </ScrollBar>

        </div>
      </PageSetup>
    </div>
  );
};

export default Inbox;

