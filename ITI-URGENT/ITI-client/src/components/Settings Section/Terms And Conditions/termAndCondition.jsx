// import React from 'react';
// import styles from './termAndCondition.module.css';
// import PageSetup from '../../Container/pageSetup/pageSetup';
// import TopBar from '../../topBar/topBar';
// import ScrollBar from '../../scrollBar/scrollBar';

// const TermsConditions = () => {
//   return (
//     <div className='theMainContainer'>
//         <PageSetup
//             // loaderState={loading}
//             active={"terms"}
//       appBar={true}
//         >


// <ScrollBar>

//       <h1 className={styles.title}>Terms & Conditions</h1>

//     <div className={styles.container}>

//       <div className={styles.section}>
//         <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
//         <p className={styles.description}>
//           By using the App, you agree to comply with these Terms and any other applicable laws or regulations. If you do not agree with any part of these Terms, you must stop using the App immediately.
//         </p>
//       </div>

//       <div className={styles.section}>
//         <h2 className={styles.sectionTitle}>2. Changes to Term</h2>
//         <p className={styles.description}>
//           We reserve the right to modify or update these Terms at any time. Any changes will be effective immediately upon posting the revised Terms within the App or on our website. You are responsible for reviewing these Terms periodically. Your continued use of the App after the posting of changes constitutes your acceptance of such changes.
//         </p>
//       </div>

//       <div className={styles.section}>
//         <h2 className={styles.sectionTitle}>3. User Accounts</h2>
//         <p className={styles.description}>
//           To access certain features of the App, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update your information as necessary. You are responsible for maintaining the confidentiality of your account and password, and for all activities that occur under your account.
//         </p>
//       </div>

//       <div className={styles.section}>
//         <h2 className={styles.sectionTitle}>4. Use of the App</h2>
//         <p className={styles.description}>
//           You agree to use the App in accordance with these Terms and for lawful purposes only. You may not use the App to:
//         </p>
//         <ul className={styles.list}>
//           <li>Violate any applicable local, state, national, or international law.</li>
//           <li>Engage in any unauthorized or harmful activities, including but not limited to hacking, spamming, or distributing malicious software.</li>
//           <li>Attempt to access, modify, or delete data without authorization.</li>
//         </ul>
//       </div>

//     </div>
// </ScrollBar>


//     </PageSetup>

//     </div>
//   );
// };

// export default TermsConditions;















import React from 'react';
import styles from './termAndCondition.module.css';
import PageSetup from '../../Container/pageSetup/pageSetup';
import TopBar from '../../topBar/topBar';
import ScrollBar from '../../scrollBar/scrollBar';

const TermsConditions = () => {
  return (
    <div className='theMainContainer'>
        <PageSetup
            active={"terms"}
            appBar={true}
        >
      <h1 className={styles.title}>Terms & Conditions</h1>

<ScrollBar>


    <div className={styles.container}>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
        <p className={styles.description}>
          By using the App, you agree to comply with these Terms and any other applicable laws or regulations. If you do not agree with any part of these Terms, you must stop using the App immediately.
        </p>

        <h2 className={styles.sectionTitle}>2. Changes to Terms</h2>
        <p className={styles.description}>
          We reserve the right to modify or update these Terms at any time. Any changes will be effective immediately upon posting the revised Terms within the App or on our website. You are responsible for reviewing these Terms periodically. Your continued use of the App after the posting of changes constitutes your acceptance of such changes.
        </p>

        <h2 className={styles.sectionTitle}>3. User Accounts</h2>
        <p className={styles.description}>
          To access certain features of the App, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update your information as necessary. You are responsible for maintaining the confidentiality of your account and password, and for all activities that occur under your account.
        </p>

        <h2 className={styles.sectionTitle}>4. Use of the App</h2>
        <p className={styles.description}>
          You agree to use the App in accordance with these Terms and for lawful purposes only. You may not use the App to:
        </p>
        <ul className={styles.list}>
          <li>Violate any applicable local, state, national, or international law.</li>
          <li>Engage in any unauthorized or harmful activities, including but not limited to hacking, spamming, or distributing malicious software.</li>
          <li >Attempt to access, modify, or delete data without authorization.</li>
        </ul>
        <br />
        
        
      </div>

    </div>
</ScrollBar>


    </PageSetup>

    </div>
  );
};

export default TermsConditions;
