// import React from "react";
// import styles from "./projectCards.module.css";

// const ProjectCard = () => {
//   const cardData = {
//     projectNumber: "Project #2000",
//     status: "InProgress",
//     address: "Full address for easy identification\nFull address for easy identification",
//     client: "John Doe",
//     stage: "Concept Plan",
//     developer: "Mambourin",
//   };

//   return (
//     <div className={styles.card}>
//       <div className={styles.header}>
//         <h3 className={styles.projectNumber}>{cardData.projectNumber}</h3>
//         <span className={`${styles.status} ${styles[cardData.status.toLowerCase()]}`}>
//           {cardData.status === "InProgress" ? "In Progress" : "On Hold"}
//         </span>
//         <button className={styles.favoriteButton}>♡</button>
//       </div>
//       <div className={styles.addressContainer}>
//       <p className={styles.address}>{cardData.address}</p>
//       </div>
//       <div className={styles.details}>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>Client</span>
//           <span className={styles.value}>{cardData.client}</span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>Stage</span>
//           <span className={styles.value}>{cardData.stage}</span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>Developer</span>
//           <span className={styles.value}>{cardData.developer}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;















// import React from "react";
// import styles from "./projectCards.module.css";
// import client from './Project Card Svgs/client.svg';
// import settings from './Project Card Svgs/Frame.svg';
// import Frame from './Project Card Svgs/client.svg';
// import engineer from './Project Card Svgs/engineer.svg';

// const ProjectCard = () => {
//   const cardData = {
//     projectNumber: "Project #2000",
//     status: "InProgress",
//     address: "Full address for easy identification\nFull address for easy identification",
//     client: "John Doe",
//     stage: "Concept Plan",
//     developer: "Mambourin",
//   };

//   return (
//     <div
//       className={`${styles.card} ${
//         cardData.status === "InProgress" ? styles.inProgressCard : ""
//       }`}
//     >
//       <div className={styles.header}>
//         <h3 className={styles.projectNumber}>{cardData.projectNumber}</h3>
//         <span className={`${styles.status} ${styles[cardData.status.toLowerCase()]}`}>
//           {cardData.status === "InProgress" ? "In Progress" : "On Hold"}
//         </span>
//         <button className={styles.favoriteButton} title="Add to Favorites">
//           ♡
//         </button>
//       </div>
//       <div className={styles.addressContainer}>
//         <p className={styles.address}>{cardData.address}</p>
//       </div>
//       {/* <div className={styles.details}>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <i className={`${styles.icon} fas fa-user`}></i> Client
//           </span>
//           <span className={styles.value}>{cardData.client}</span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <i className={`${styles.icon} fas fa-tasks`}></i> Stage
//           </span>
//           <span className={styles.value}>{cardData.stage}</span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <i className={`${styles.icon} fas fa-building`}></i> Developer
//           </span>
//           <span className={styles.value}>{cardData.developer}</span>
//         </div>
//       </div> */}


// <div className={styles.details}>
//   <div className={styles.detailItem}>
//     <span className={styles.label}>
//       <i className={`${styles.icon} fas fa-user`}></i> Client
//     </span>
//     <span className={styles.value}>{cardData.client}</span>
//   </div>
//   <div className={styles.detailItem}>
//     <span className={styles.label}>
//       <i className={`${styles.icon} fas fa-tasks`}></i> Stage
//     </span>
//     <span className={styles.value}>{cardData.stage}</span>
//   </div>
//   <div className={styles.detailItem}>
//     <span className={styles.label}>
//       <i className={`${styles.icon} fas fa-building`}></i> Developer
//     </span>
//     <span className={styles.value}>{cardData.developer}</span>
//   </div>
// </div>

//     </div>
//   );
// };

// export default ProjectCard;










// import React from "react";
// import styles from "./projectCards.module.css";
// import clientIcon from './Project Card Svgs/client.svg';
// import settingsIcon from './Project Card Svgs/setting.svg';
// import frameIcon from './Project Card Svgs/Frame.svg';
// import engineerIcon from './Project Card Svgs/engineer.svg';

// const ProjectCard = () => {
//   const cardData = {
//     projectNumber: "Project #2000",
//     status: "InProgress",
//     address: "Full address for easy identification\nFull address for easy identification",
//     client: "John Doe",
//     stage: "Concept Plan",
//     developer: "Mambourin",
//   };

//   return (
//     <div
//       className={`${styles.card} ${
//         cardData.status === "InProgress" ? styles.inProgressCard : ""
//       }`}
//     >
//       <div className={styles.header}>
//         <h3 className={styles.projectNumber}>{cardData.projectNumber}</h3>
//         <span className={`${styles.status} ${styles[cardData.status.toLowerCase()]}`}>
//           {cardData.status === "InProgress" ? "In Progress" : "On Hold"}
//         </span>
//         <button className={styles.favoriteButton} title="Add to Favorites">
//           ♡
//         </button>
//       </div>
//       <div className={styles.addressContainer}>
//       <img src={frameIcon} alt=" Location" className={styles.icon} />
//       <div>
//         <p className={styles.address}>{cardData.address}</p>
//         </div>
//       </div>

//       <div className={styles.details}>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={clientIcon} alt="Client Icon" className={styles.icon} /> Client
//           </span>
//           <span className={styles.value}>{cardData.client}</span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={settingsIcon} alt="Stage Icon" className={styles.icon} /> Stage
//           </span>
//           <span className={styles.value}>{cardData.stage}</span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={engineerIcon} alt="Developer Icon" className={styles.icon} /> Developer
//           </span>
//           <span className={styles.value}>{cardData.developer}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;






// import React, { useEffect, useState } from "react";
// import styles from "./projectCards.module.css";
// import clientIcon from './Project Card Svgs/client.svg';
// import settingsIcon from './Project Card Svgs/setting.svg';
// import frameIcon from './Project Card Svgs/Frame.svg';
// import engineerIcon from './Project Card Svgs/engineer.svg';
// import BASEURL from '../../../const/const'
// const ProjectCard = () => {
//   const [cardData, setCardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch project data from the backend
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${BASEURL}/api/get/projects`); // Replace with your API URL
//         if (!response.ok) {
//           throw new Error(`Error: ${response?.statusText}`);
//         }
//         const data = await response.json();
//         setCardData(data[0]); // Assuming the first project is displayed
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div
//       className={`${styles.card} ${
//         cardData.status === "InProgress" ? styles.inProgressCard : ""
//       }`}
//     >
//       <div className={styles.header}>
//         <h3 className={styles.projectNumber}>{cardData.projectNumber}</h3>
//         <span className={`${styles.status} ${styles[cardData.status.toLowerCase()]}`}>
//           {cardData.status === "InProgress" ? "In Progress" : "On Hold"}
//         </span>
//         <button className={styles.favoriteButton} title="Add to Favorites">
//           ♡
//         </button>
//       </div>
//       <div className={styles.addressContainer}>
//         <img src={frameIcon} alt="Location" className={styles.icon} />
//         <div>
//           <p className={styles.address}>{cardData.address}</p>
//         </div>
//       </div>

//       <div className={styles.details}>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={clientIcon} alt="Client Icon" className={styles.icon} /> Client
//           </span>
//           <span className={styles.value}>{cardData.client}</span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={settingsIcon} alt="Stage Icon" className={styles.icon} /> Stage
//           </span>
//           <span className={styles.value}>{cardData.stage}</span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={engineerIcon} alt="Developer Icon" className={styles.icon} /> Developer
//           </span>
//           <span className={styles.value}>{cardData.developer}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;












// import React, { useEffect, useState } from "react";
// import styles from "./projectCards.module.css";
// import clientIcon from './Project Card Svgs/client.svg';
// import settingsIcon from './Project Card Svgs/setting.svg';
// import frameIcon from './Project Card Svgs/Frame.svg';
// import engineerIcon from './Project Card Svgs/engineer.svg';
// import BaseUrl from '../../../const/const'
// const ProjectCard = ({singleCardData}) => {
//   const [cardData, setCardData] = useState(singleCardData);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   return (
//     <div
//       className={`${styles.card} ${
//         cardData.status === "InProgress" ? styles.inProgressCard : ""
//       }`}
//     >
//       <div className={styles.header}>
//         <h3 className={styles.projectNumber}>{cardData?.data?.custom_fields?.[3]?.value?.[0]?.name}</h3>
//         <span className={`${styles.status}`}>
//           {cardData?.data?.status?.status}
//         </span>
//         <button className={styles.favoriteButton} title="Add to Favorites">
//           ♡
//         </button>
//       </div>
//       <div className={styles.addressContainer}>
//         <img src={frameIcon} alt="Location" className={styles.icon} />
//         <div>
//           <p className={styles.address}>{cardData?.data?.name}</p>
//         </div>
//       </div>

//       <div className={styles.details}>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={clientIcon} alt="Client Icon" className={styles.icon} /> Client
//           </span>
//           <span className={styles.value}>{cardData?.data?.custom_fields?.[12]?.value?.[0]?.name}</span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={settingsIcon} alt="Stage Icon" className={styles.icon} /> Stage
//           </span>
//           <span className={styles.value}>{cardData?.data?.custom_fields?.[15]?.value === 0 ? "Concept Drawing Stage" :
//           cardData?.data?.custom_fields?.[15]?.value === 1 ? "Preliminary Drawing Stage" :
//           cardData?.data?.custom_fields?.[15]?.value === 2 ? "Developer Approval Stage" :
//           cardData?.data?.custom_fields?.[15]?.value === 3 ? "Council Approval Stage" :
//           cardData?.data?.custom_fields?.[15]?.value === 4 ? "Construction Drawing Stage" :
//           "Building Permit Stage"}</span>
//         </div>
//         <div className={styles.detailItem}>
//           <span className={styles.label}>
//             <img src={engineerIcon} alt="Developer Icon" className={styles.icon} /> Developer
//           </span>
//           <span className={styles.value}>{cardData?.data?.creator?.username}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;


















import React, { useState } from "react";
import styles from "./projectCards.module.css";
import clientIcon from './Project Card Svgs/client.svg';
import settingsIcon from './Project Card Svgs/setting.svg';
import frameIcon from './Project Card Svgs/Frame.svg';
import engineerIcon from './Project Card Svgs/engineer.svg';

const ProjectCard = ({ singleCardData }) => {
  const [cardData] = useState(singleCardData);

  return (
    <div
      className={`${styles.card} ${
        cardData?.data?.status?.status === "InProgress" ? styles.inProgressCard : ""
      }`}
    >
      <div className={styles.header}>
        <h3 className={styles.projectNumber}>
          {cardData?.data?.custom_fields?.[3]?.value?.[0]?.name}
        </h3>
        <span
          className={`${styles.status} ${
            cardData?.data?.status?.status === "InProgress" ? styles.inProgressStatus : ""
          }`}
        >
          {cardData?.data?.status?.status}
        </span>
        <button className={styles.favoriteButton} title="Add to Favorites">
          ♡
        </button>
      </div>
      <div className={styles.addressContainer}>
        <img src={frameIcon} alt="Location" className={styles.icon} />
        <div>
          <p className={styles.address}>{cardData?.data?.name}</p>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>
            <img src={clientIcon} alt="Client Icon" className={styles.icon} /> Client
          </span>
          <span className={styles.value}>
            {cardData?.data?.custom_fields?.[12]?.value?.[0]?.name}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>
            <img src={settingsIcon} alt="Stage Icon" className={styles.icon} /> Stage
          </span>
          <span className={styles.value}>
            {cardData?.data?.custom_fields?.[15]?.value === 0
              ? "Concept Drawing Stage"
              : cardData?.data?.custom_fields?.[15]?.value === 1
              ? "Preliminary Drawing Stage"
              : cardData?.data?.custom_fields?.[15]?.value === 2
              ? "Developer Approval Stage"
              : cardData?.data?.custom_fields?.[15]?.value === 3
              ? "Council Approval Stage"
              : cardData?.data?.custom_fields?.[15]?.value === 4
              ? "Construction Drawing Stage"
              : "Building Permit Stage"}
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>
            <img src={engineerIcon} alt="Developer Icon" className={styles.icon} /> Developer
          </span>
          <span className={styles.value}>{cardData?.data?.creator?.username}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
