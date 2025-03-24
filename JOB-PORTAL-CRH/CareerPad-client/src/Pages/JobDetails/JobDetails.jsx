// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './JobDetails.module.css';
// import Header from '../../components/Header/Header';
// import JobCard from '../../components/Container/FindJob/JobCard';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// import DonePopup from '../../components/DonePopup/DonePopup.jsx';
// import Footer from '../../components/Footer/Footer.jsx';
// import PaginatedJobCards from '../../components/JobsPagination/JobsPagination.jsx';
// import Tooltip from "@mui/material/Tooltip";


// const JobDetails = () => {
//   const navigate = useNavigate();
//   const [jobDetails, setJobDetails] = useState(null);
//   const [jobDesc, setJobDesc] = useState(null);
//   const [dynamicJobDetails, setDynamicJobDetails] = useState([]);
//   const [selectedJobId, setSelectedJobId] = useState(localStorage.getItem('ClickedJob') || '');
//   const [isApplied, setIsApplied] = useState(false);
//   const [showDonePopup, setShowDonePopup] = useState(false);

//   // Fetch the initial job details and dynamic job details once on component mount
//   useEffect(() => {
//     const fetchInitialJobData = async () => {
//       try {
//         const [jobRes, dynamicJobRes] = await Promise.all([
//           fetch(`${Base_URL}/jobs/${selectedJobId}`),
//           fetch(`${Base_URL}/api/jobs/distinct?exclude=${selectedJobId}`)
//         ]);
//         const jobData = await jobRes.json();
//         const dynamicData = await dynamicJobRes.json();
//         setJobDetails(jobData);
//         setDynamicJobDetails(dynamicData);
//       } catch (error) {
//         console.error('Error fetching job data:', error);
//       }
//     };

//     if (selectedJobId) {
//       fetchInitialJobData();
//     }
//   }, [selectedJobId,isApplied]);

//   useEffect(() => {
//     const fetchjobDetails = async () => {
//       try {
//         const jobDetails = await (fetch(`${Base_URL}/jobs/${localStorage.getItem('ClickedJob')}`));
//         const jobDesc = await jobDetails.json();
//         setJobDesc(jobDesc);
//         window.scrollTo(0, 0);
//       } catch (error) {
//         console.error('Error fetching job data:', error);
//       }
//     };
//     if (localStorage.getItem('ClickedJob')) {
//       fetchjobDetails();
//     }
//   }, [localStorage.getItem('ClickedJob')]);

//   // Track if the job has already been applied
//   useEffect(() => {
//     const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
//     setIsApplied(appliedJobs.includes(localStorage.getItem('ClickedJob')));
//   }, [selectedJobId,localStorage.getItem('ClickedJob')]);

//   const handleJobClick = useCallback((jobId) => {
//     setSelectedJobId(jobId);
//     localStorage.setItem('ClickedJob', jobId); 
//   }, []);

//   // Handle Apply Job
//   const handleButtonClick = async (event) => {
//     event.stopPropagation();
//     if (!isApplied) {
//       try {
//         const userId = localStorage.getItem('id');
//         const response = await fetch('${Base_URL}/api/applyJob', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ jobId: localStorage.getItem('ClickedJob'), userId })
//         });

//         if (!response.ok) throw new Error('Failed to apply for job');

//         const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
//         appliedJobs.push(localStorage.getItem('ClickedJob'));
//         localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
//         setIsApplied(true);
//         handleEmployerModal();
//       } catch (error) {
//         console.error('Error applying for job:', error);
//       }
//     }
//   };

//   const handleEmployerModal = () => {
//     setShowDonePopup(true);
//   };

//   const navFindJob = () => {
//     navigate('/', { state: { active: 'Find Jobs' } });
//   };

//   const [savedJobs, setSavedJobs] = useState([]);
//   const handleSavedJobsChange = (updatedJobs) => {
//     localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
//     setSavedJobs(updatedJobs);
// };

//   const staticJobCard = jobDetails && (
//     <JobCard
//       key={jobDetails._id}
//       jobId={jobDetails._id}
//       jobTitle={jobDetails.jobTitle}
//       companyName={jobDetails.companyName}
//       applicants={jobDetails.applicants}
//       postingDate={jobDetails.postingDate}
//       levels={jobDetails.levels}
//       description={jobDetails.description}
//       salaryRange={jobDetails.salaryRange}
//       onSavedJobsChange={handleSavedJobsChange}
//     />
//   );

//   const dynamicJobCards = dynamicJobDetails.map((job) => (
//     <JobCard
//       key={job._id}
//       jobId={job._id}
//       jobTitle={job.jobTitle}
//       companyName={job.companyName}
//       applicants={job.applicants}
//       postingDate={job.postingDate}
//       levels={job.levels}
//       description={job.description}
//       salaryRange={job.salaryRange}
//       onSavedJobsChange={handleSavedJobsChange}
//     />
//   ));


//   const levelColors = ['#F1E3FF', '#E2FEEF', '#FFEBE0'];
//   const levelCol = ['#4F0E90', '#1D963F', '#A0652F'];

//   return (
//     <div>
//       <Header active="Find Jobs" />
//       <div className={styles.HeaderBottom}>
//         <div className={styles.DisplayJobs}>
//           <PaginatedJobCards staticJobCard = {staticJobCard}
//           dynamicJobCards = {dynamicJobCards} />
//         </div>
//         <div style={{ width: '80%', display: 'flex', gap: '10px', flexDirection: 'column' }}>
//           <div style={{ height: '5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <div onClick={navFindJob} style={{ background: '#FFFFFF', padding: '7px 14px', borderRadius: '50%' }} className={styles.pointer}>
//             <Tooltip
//               title="Back"
//               arrow
//               placement="top"
//               slotProps={{
//                 tooltip: {
//                   sx: {
//                     backgroundColor: '#9da0a6',
//                     color: 'white',
//                     fontSize: '14px',
//                     borderRadius: '10px',  
//                     padding: '8px',      
//                   },
//                 },
//                 arrow: {
//                   sx: {
//                     color: '#9da0a6', 
//                   },
//                 },
//               }}
//             >
//               <FontAwesomeIcon icon={faChevronLeft} style={{ color: '#7E7E7E' }} />
//             </Tooltip>
//             </div>
//             <button
//               className={`${isApplied ? styles.applyButtonApplied : ''} ${styles.buttonDes}`}
//               onClick={handleButtonClick}
//             >
//               {isApplied ? 'Already Applied' : 'Apply'}
//             </button>
//           </div>
//           <div className={styles.jobFullDesContainer}>
//             <div style={{ paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <label style={{ fontSize: '28px', fontWeight: '500', color: '#001220' }}>
//                 {jobDesc?.jobTitle}
//               </label>
//               <div>
//                 {jobDetails?.levels?.map((level, index) => (
//                   <span key={index} className={styles.levelBadge} style={{ backgroundColor: levelColors[index % levelColors.length], color: levelCol[index % levelCol.length] }}>
//                     {level}
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div style={{ paddingBottom: '20px' }}>
//               <label className={styles.paraHeading}>
//                 About
//               </label>
//               <div style={{ paddingTop: '5px' }}>
//                 <label className={styles.paraText}>
//                   {jobDesc?.about}
//                 </label>
//               </div>
//             </div>
//             <div style={{ paddingBottom: '20px' }}>
//               <label className={styles.paraHeading}>
//                 Skills
//               </label>
//               <div style={{ paddingTop: '5px' }}>
//                 <label className={`${styles.paraText} ${styles.flexColumn}`}>
//                   {jobDesc?.skills?.map((skill, index) => (
//                     <div key={index} className={styles.skillContainer}>
//                       <span className={styles.dot}></span>
//                       <span className={styles.skill}>{skill}</span>
//                     </div>
//                   ))}
//                 </label>
//               </div>
//             </div>
//             <div style={{ paddingBottom: '20px' }}>
//               <label className={styles.paraHeading}>
//                 Description
//               </label>
//               <div style={{ paddingTop: '5px' }}>
//                 <label className={styles.paraText}>
//                   {jobDesc?.description}
//                 </label>
//               </div>
//             </div>
//             <div style={{ paddingBottom: '20px' }}>
//               <label className={styles.paraHeading}>
//                 Experience
//               </label>
//               <div style={{ paddingTop: '5px' }}>
//                 <label className={styles.paraText}>
//                   {jobDesc?.experience}
//                 </label>
//               </div>
//             </div>
//             <div style={{ paddingBottom: '20px' }}>
//               <label className={styles.paraHeading}>
//                 Approach
//               </label>
//               <div style={{ paddingTop: '5px' }}>
//                 <label className={styles.paraText}>
//                   {jobDesc?.approach}
//                 </label>
//               </div>
//             </div>
//             <div style={{ paddingBottom: '20px' }}>
//               <label className={styles.paraHeading}>
//                 Services
//               </label>
//               <div style={{ paddingTop: '10px' }}>
//                 <label className={`${styles.paraText} ${styles.flexRow}`}>
//                   {jobDesc?.services?.map((service, index) => (
//                     <span className={styles.service} key={index}>{service}</span>
//                   ))}
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showDonePopup && (
//         <DonePopup
//           handleCurrentModal={() => setShowDonePopup(false)}
//           label1="Your application has been successfully submitted. You can see "
//           label3=" the number of jobs you’ve applied for by visiting your profile"
//           label4="Success!"
//         />
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default JobDetails;

//After loading

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JobDetails.module.css';
import Header from '../../components/Header/Header';
import JobCard from '../../components/Container/FindJob/JobCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import DonePopup from '../../components/DonePopup/DonePopup.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import PaginatedJobCards from '../../components/JobsPagination/JobsPagination.jsx';
import Tooltip from "@mui/material/Tooltip";
import Loader from '../../components/Loader/Loader'; // Import the Loader component

import { Base_URL } from '../../const/const.js';

const JobDetails = () => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [jobDesc, setJobDesc] = useState(null);
  const [dynamicJobDetails, setDynamicJobDetails] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(localStorage.getItem('ClickedJob') || '');
  const [isApplied, setIsApplied] = useState(false);
  const [showDonePopup, setShowDonePopup] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  // Fetch the initial job details and dynamic job details once on component mount
  useEffect(() => {
    const fetchInitialJobData = async () => {
      setLoading(true); // Start loading
      try {
        const [jobRes, dynamicJobRes] = await Promise.all([
          fetch(`${Base_URL}/jobs/${selectedJobId}`),
          fetch(`${Base_URL}/api/jobs/distinct?exclude=${selectedJobId}`)
        ]);
        const jobData = await jobRes.json();
        const dynamicData = await dynamicJobRes.json();
        setJobDetails(jobData);
        setDynamicJobDetails(dynamicData);
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error('Error fetching job data:', error);
        setLoading(false); // In case of an error, stop loading
      }
    };

    if (selectedJobId) {
      fetchInitialJobData();
    }
  }, [selectedJobId, isApplied]);

  useEffect(() => {
    const fetchjobDetails = async () => {
      setLoading(true); // Start loading
      try {
        const jobDetails = await (fetch(`${Base_URL}/jobs/${localStorage.getItem('ClickedJob')}`));
        const jobDesc = await jobDetails.json();
        setJobDesc(jobDesc);
        window.scrollTo(0, 0);
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error('Error fetching job data:', error);
        setLoading(false); // In case of an error, stop loading
      }
    };
    if (localStorage.getItem('ClickedJob')) {
      fetchjobDetails();
    }
  }, [localStorage.getItem('ClickedJob')]);

  // Track if the job has already been applied
  useEffect(() => {
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    setIsApplied(appliedJobs.includes(localStorage.getItem('ClickedJob')));
  }, [selectedJobId, localStorage.getItem('ClickedJob')]);

  const handleJobClick = useCallback((jobId) => {
    setSelectedJobId(jobId);
    localStorage.setItem('ClickedJob', jobId); 
  }, []);

  // Handle Apply Job
  const handleButtonClick = async (event) => {
    event.stopPropagation();
    if (!isApplied) {
      try {
        const userId = localStorage.getItem('id');
        const response = await fetch('${Base_URL}/api/applyJob', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobId: localStorage.getItem('ClickedJob'), userId })
        });

        if (!response.ok) throw new Error('Failed to apply for job');

        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
        appliedJobs.push(localStorage.getItem('ClickedJob'));
        localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
        setIsApplied(true);
        handleEmployerModal();
      } catch (error) {
        console.error('Error applying for job:', error);
      }
    }
  };

  const handleEmployerModal = () => {
    setShowDonePopup(true);
  };

  const navFindJob = () => {
    navigate('/', { state: { active: 'Find Jobs' } });
  };

  const [savedJobs, setSavedJobs] = useState([]);
  const handleSavedJobsChange = (updatedJobs) => {
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
    setSavedJobs(updatedJobs);
  };

  const staticJobCard = jobDetails && (
    <JobCard
      key={jobDetails._id}
      jobId={jobDetails._id}
      jobTitle={jobDetails.jobTitle}
      companyName={jobDetails.companyName}
      applicants={jobDetails.applicants}
      postingDate={jobDetails.postingDate}
      levels={jobDetails.levels}
      description={jobDetails.description}
      salaryRange={jobDetails.salaryRange}
      onSavedJobsChange={handleSavedJobsChange}
    />
  );

  const dynamicJobCards = dynamicJobDetails.map((job) => (
    <JobCard
      key={job._id}
      jobId={job._id}
      jobTitle={job.jobTitle}
      companyName={job.companyName}
      applicants={job.applicants}
      postingDate={job.postingDate}
      levels={job.levels}
      description={job.description}
      salaryRange={job.salaryRange}
      onSavedJobsChange={handleSavedJobsChange}
    />
  ));

  const levelColors = ['#F1E3FF', '#E2FEEF', '#FFEBE0'];
  const levelCol = ['#4F0E90', '#1D963F', '#A0652F'];

  useEffect(()=>{
    if(showDonePopup){
      document.body.style.overflowY="hidden"
    }else{
      document.body.style.overflowY="scroll"
    }
    return () => {
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden"; 
    };
  },[showDonePopup])

  return (
    <div>
      <Header active="Find Jobs" />
      {/* Show loader if data is still loading */}
      {loading ? (
        <Loader />
      ) : (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div className={styles.HeaderBottom}>
            <div className={styles.DisplayJobs}>
              <PaginatedJobCards staticJobCard={staticJobCard} dynamicJobCards={dynamicJobCards} />
            </div>
            <div style={{ width: '80%', display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <div style={{ height: '5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div onClick={navFindJob} style={{ background: '#FFFFFF', padding: '7px 14px', borderRadius: '50%' }} className={styles.pointer}>
                  <Tooltip
                    title="Back"
                    arrow
                    placement="top"
                    slotProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: '#9da0a6',
                          color: 'white',
                          fontSize: '14px',
                          borderRadius: '10px',
                          padding: '8px',
                        },
                      },
                      arrow: {
                        sx: {
                          color: '#9da0a6',
                        },
                      },
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} style={{ color: '#7E7E7E' }} />
                  </Tooltip>
                </div>
                <button
                  className={`${isApplied ? styles.applyButtonApplied : ''} ${styles.buttonDes}`}
                  onClick={handleButtonClick}
                >
                  {isApplied ? 'Already Applied' : 'Apply'}
                </button>
              </div>
              {/* Job description content */}
              {/* <div className={styles.descBox}>
                <p className={styles.desc}>{jobDesc?.description}</p>
              </div> */}
            <div className={styles.jobFullDesContainer} style={{paddingBottom: '20px',boxShadow: '0px 4px 4px #00000040',}}>
              <div style={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center',paddingBottom:'16px' }}>
                <label style={{ fontSize: '28px', fontWeight: '500', color: '#001220' }}>
                  {jobDesc?.jobTitle}
                </label>
                <div>
                  {jobDetails?.levels?.map((level, index) => (
                    <span key={index} className={styles.levelBadge} style={{ backgroundColor: levelColors[index % levelColors.length], color: levelCol[index % levelCol.length] }}>
                      {level}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ paddingBottom: '20px' }}>
                <label className={styles.paraHeading}>
                  About
                </label>
                <div style={{ paddingTop: '5px' }}>
                  <label className={styles.paraText}>
                    {jobDesc?.about}
                  </label>
                </div>
              </div>
              <div style={{ paddingBottom: '20px' }}>
                <label className={styles.paraHeading}>
                  Skills
                </label>
                <div style={{ paddingTop: '5px' }}>
                  <label className={`${styles.paraText} ${styles.flexColumn}`}>
                    {jobDesc?.skills?.map((skill, index) => (
                      <div key={index} className={styles.skillContainer}>
                        <span className={styles.dot}></span>
                        <span className={styles.skill}>{skill}</span>
                      </div>
                    ))}
                  </label>
                </div>
              </div>
              <div style={{ paddingBottom: '20px' }}>
                <label className={styles.paraHeading}>
                  Description
                </label>
                <div style={{ paddingTop: '5px' }}>
                  <label className={styles.paraText}>
                    {jobDesc?.description}
                  </label>
                </div>
              </div>
              <div style={{ paddingBottom: '20px' }}>
                <label className={styles.paraHeading}>
                  Experience
                </label>
                <div style={{ paddingTop: '5px' }}>
                  <label className={styles.paraText}>
                    {jobDesc?.experience}
                  </label>
                </div>
              </div>
              <div style={{ paddingBottom: '20px' }}>
                <label className={styles.paraHeading}>
                  Approach
                </label>
                <div style={{ paddingTop: '5px' }}>
                  <label className={styles.paraText}>
                    {jobDesc?.approach}
                  </label>
                </div>
              </div>
              <div style={{ paddingBottom: '20px' }}>
                <label className={styles.paraHeading}>
                  Services
                </label>
                <div style={{ paddingTop: '10px' }}>
                  <label className={`${styles.paraText} ${styles.flexRow}`}>
                    {jobDesc?.services?.map((service, index) => (
                      <span className={styles.service} key={index}>{service}</span>
                    ))}
                  </label>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
      {/* Show DonePopup on applying successfully */}
      {showDonePopup && (
        <DonePopup
          handleCurrentModal={() => setShowDonePopup(false)}
          label1="Your application has been successfully submitted. You can see "
          label3=" the number of jobs you’ve applied for by visiting your profile"
          label4="Success!"
        />
      )}
    </div>
  );
};

export default JobDetails;
