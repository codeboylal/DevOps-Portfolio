import React from 'react';
import styles from './adminMainProfile.module.css'
import AdminProfileHeader from '../Admin Profile Header/adminProfileHeader';
import AdminHeadlineSection from '../Headline Section/headLineSection';
import AdminCompanyInfo from '../Admin Company info/adminCompanyInfo';

function AdminMainProfile() {
  return (
       
    <div  className={styles.mainContainer}>

      <div style={{ display: 'flex', marginTop: '20px' }}> 
      <AdminProfileHeader/>
      </div> 


<div className={styles.profileContainer}>


      <div className={styles.profileRight}>

      <div style={{ display: 'flex', marginTop: '40px' }}> 
      <AdminHeadlineSection/>
      </div> 


      <div style={{  marginTop: '40px' }}> 
      <AdminCompanyInfo/>
      </div> 


      

    </div>

<div className={styles.profileLeft}> 
   
    </div>


    </div>

  
    </div>
  );
}

export default AdminMainProfile;
