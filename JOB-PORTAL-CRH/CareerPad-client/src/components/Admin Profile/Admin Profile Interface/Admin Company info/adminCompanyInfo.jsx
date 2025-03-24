// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './adminCompanyInfo.module.css';

// const AdminCompanyInfo = () => {
//   const [companyInfo, setCompanyInfo] = useState({
//     organizationName: '',
//         industryType: '',
//         website: '',
//         phoneNumber: '',
//         address: '',
//         founded: '',
//         companySize: ''
//   });

//   useEffect(() => {
//     // Fetch the company info using the ObjectId
//     axios
//       .get('${Base_URL}/api/adminprofile/66dc21979af3024e9834914a')
//       .then((response) => {
//         setCompanyInfo(response.data);
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   return (
//     <div className={styles.card}>
//         <div className={styles.headline}>
//             Company's Headline
//             <span className={styles.editIcon} >✏️</span>
//           </div>
//       <div className={styles.infoRow}>
//         <div>
//           <p><strong>Organization Name</strong></p>
//           <p>{companyInfo.organizationName || 'Loading...'}</p>
//         </div>
//         <div>
//           <p><strong>Website</strong></p>
//           <p>{companyInfo.website || 'Loading...'}</p>
//         </div>
//       </div>

//       <div className={styles.infoRow}>
//         <div>
//           <p><strong>Phone Number</strong></p>
//           <p>{companyInfo.phoneNumber || 'Loading...'}</p>
//         </div>
//         <div>
//           <p><strong>Address</strong></p>
//           <p>{companyInfo.address || 'Loading...'}</p>
//         </div>
//       </div>

//       <div className={styles.infoRow}>
//         <div>
//           <p><strong>Founded</strong></p>
//           <p>{companyInfo.founded || 'Loading...'}</p>
//         </div>
//         <div>
//           <p><strong>Company Size</strong></p>
//           <p>{companyInfo.companySize || 'Loading...'}</p>
//         </div>
//       </div>

//       <div className={styles.infoRow}>
//         <div>
//           <p><strong>Industry Type</strong></p>
//           <p>{companyInfo.industryType || 'Loading...'}</p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default AdminCompanyInfo;





// AdminCompanyInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './adminCompanyInfo.module.css';

const AdminCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState({
    organizationName: '',
    industryType: '',
    website: '',
    phoneNumber: '',
    address: '',
    founded: '',
    companySize: ''
  });

  useEffect(() => {
    // Fetch the company info using the Admin ID
    axios
      .get('${Base_URL}/api/adminprofile/66dc21979af3024e9834914a') // Correct endpoint
      .then((response) => {
        console.log(response.data); // Debugging: Check the data received
        setCompanyInfo(response.data); // Set the data returned from the server
      })
      .catch((error) => console.log('Error fetching company profile:', error));
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.headline}>
        Company's Headline
        <span className={styles.editIcon}>✏️</span>
      </div>
      <div className={styles.infoRow}>
        <div>
          <p><strong>Organization Name</strong></p>
          <p>{companyInfo.organizationName || 'Loading...'}</p>
        </div>
        <div>
          <p><strong>Website</strong></p>
          <p>{companyInfo.website || 'Loading...'}</p>
        </div>
      </div>

      <div className={styles.infoRow}>
        <div>
          <p><strong>Phone Number</strong></p>
          <p>{companyInfo.phoneNumber || 'Loading...'}</p>
        </div>
        <div>
          <p><strong>Address</strong></p>
          <p>{companyInfo.address || 'Loading...'}</p>
        </div>
      </div>

      <div className={styles.infoRow}>
        <div>
          <p><strong>Founded</strong></p>
          <p>{companyInfo.founded || 'Loading...'}</p>
        </div>
        <div>
          <p><strong>Company Size</strong></p>
          <p>{companyInfo.companySize || 'Loading...'}</p>
        </div>
      </div>

      <div className={styles.infoRow}>
        <div>
          <p><strong>Industry Type</strong></p>
          <p>{companyInfo.industryType || 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminCompanyInfo;











// .card {
//   background-color: white;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//   max-width: 870px;
//   /* margin: 20px auto; */
// }

// .headline {
//   font-size: 18px;
//   font-weight: bold;
//   color: #2A85FE;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .header {
//   font-size: 1.2rem;
//   margin-bottom: 10px;
//   color: #6A89CC;
// }

// .infoRow {
//   display: flex;
//   /* justify-content: space-between; */
//   gap: 250px;
//   margin-bottom: 10px;
// }

// .infoRow div {
//   width: 48%;
// }

// strong {
//   color: #333;
//   font-size: 0.9rem;
// }

// p {
//   margin: 5px 0;
//   color: #555;
// }

// .editIcon {
//   float: right;
//   cursor: pointer;
//   color: #6A89CC;
//   font-size: 1.2rem;
// }
