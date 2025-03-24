import React , {useState, useEffect} from 'react';
import styles from './mainProfile.module.css'
import ProfileHeader from '../Profile Header Section/profileHeader';
import HeadLine from '../Head Line Section/headLineSection';
import CareerProfile from '../Career Profile/careerProfile';
import EducationSection from '../Education Section/educationSection';
import PersonalDetails from '../Personal Details/personalDetails';
import WorkExperience from '../Experience Section/experienceSection';
import Skills from '../Skill Section/skillSection';
import ResumeList from '../Resume Section/resumeSection';
import CurrentProfile from '../Current Profile/currentProfile';
import JobPreference from '../Job Preference Section/jobPreferenceSection';
import AppliedJobsCard from '../No of Applied Jobs/appliedJobs';
import Header from '../../Header/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../Footer/Footer';
function MainProfile() {
  const location = useLocation();
    const active = location.state?.active || '';
const navigate=useNavigate();
   // Handle user login check
   useEffect(() => {
    const localID = localStorage.getItem("id");
    if (!localID) {
        navigate("/login", { state: { active: "signup" } });
    }
}, [navigate]);



  return (
  <div className={styles.bodyDiv}>
         <div style={{width:'100%', position:'fixed',top:'0px',zIndex:'40'}}>
         <Header active={active}/>
         </div>
 <div className={styles.mainDiv}>
    
     <div  className={styles.mainContainer}>
      <div style={{ display: 'flex' , padding:'10px'  , marginLeft:'10px' }} >
          <ProfileHeader/>
      </div> 
      <div className={styles.profileContainer}>
        <div className={styles.profileRight}>
          <div style={{ display: 'flex', marginTop: '40px' }}> 
            <HeadLine/>
          </div>       
          <div style={{ display: 'flex',  marginTop: '40px' }}>
            <CurrentProfile/>
          </div>
          <div style={{ display: 'flex', marginTop: '40px' }}>
            <JobPreference/>
          </div>
          <div style={{ display: 'flex',  marginTop: '40px' }}>
            <PersonalDetails/>
          </div>
          <div style={{ display: 'flex',  marginTop: '40px' }}>
            <EducationSection/>
          </div>
        </div>
        <div className={styles.profileLeft}> 
          <div style={{ display: 'flex',  marginTop: '40px' }}>
            <AppliedJobsCard/>
          </div>
          <div style={{ display: 'flex',  marginTop: '40px' }}>
            <ResumeList/>
          </div>
          <div style={{ display: 'flex',  marginTop: '40px' }}>
            <Skills/>
          </div>
          <div style={{ display: 'flex',  marginTop: '40px' }}>
            <WorkExperience/>
          </div>
        </div>
      </div>
      
    </div>
 </div>
 <div style={{paddingTop:'120px',width:'100%'}}>
 <Footer />
 </div>
  </div>
  );
}

export default MainProfile;
