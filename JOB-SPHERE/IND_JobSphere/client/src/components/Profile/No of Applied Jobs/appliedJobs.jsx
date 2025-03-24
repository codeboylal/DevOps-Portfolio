// import React, { useState, useEffect } from 'react';
// import styles from './appliedJobs.module.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUsers, faClockFour } from "@fortawesome/free-solid-svg-icons";
// import Tooltip from '@mui/material/Tooltip';
// import NoDataFound from '../Empty Screen/noDataFound'; // Adjust path as necessary
// import {useNavigate} from "react-router-dom";
// import pic from "./CompanyDemoPic.png";

// const AppliedJobsCard = () => {
//   const navigate = useNavigate();
//   const [appliedJobs, setAppliedJobs] = useState([]); // Initialize state for applied jobs
//   const [currentPage, setCurrentPage] = useState(1); // Initialize state for current page
//   const jobsPerPage = 4; // Number of jobs to display per page

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       try {
//         const appliedJobsString = localStorage.getItem("appliedJobs"); // Assuming appliedJobs is stored as a string in localStorage

//         if (!appliedJobsString) {
//           console.error('Applied jobs not found in localStorage');
//           return;
//         }

//         const appliedJobsArray = JSON.parse(appliedJobsString);

//         if (!Array.isArray(appliedJobsArray)) {
//           console.error('Applied jobs is not an array');
//           return;
//         }

//         const response = await fetch(`${Base_URL}/api/findAppliedJobs`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ appliedJobs: appliedJobsArray }), 
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         // console.log(data.newJobs)
//         setAppliedJobs(data.newJobs); 
//       } catch (error) {
//         console.error('Failed to fetch applied jobs:', error);
//       }
//     };

//     fetchAppliedJobs();
//   }, []); 

//   const totalPages = Math.ceil(appliedJobs.length / jobsPerPage);
//   const currentJobs = appliedJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(prevPage => prevPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(prevPage => prevPage - 1);
//     }
//   };

//   return (
//     <div className={styles.card}>
//       <div className={styles.jobAndLength}>
//         <p className={styles.title}>Number of applied jobs</p>
//         <p className={styles.count}>{appliedJobs.length}</p>
//       </div>
//       <ul className={styles.jobList}>
//         {currentJobs.length === 0 ? (
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//             <NoDataFound message="No jobs applied yet." />
//           </div>
//         ) : (
//           currentJobs.map((job, index) => (
//             <li key={index} className={styles.jobItem} style={{borderColor: currentJobs?.length -1 === index && 'transparent'}}>
//               <div className={styles.titleContainer}>
//                 <div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'16px'}}>
//                   <img src={pic} alt='company' />
//                   <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:'4px'}}>
//                     <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px' }} className={styles.pointer}>
//                       <label className={styles.jobTitle}>{job.jobTitle}</label>
//                     </div>
//                     <div className={styles.companyInfo}>
//                       <Tooltip title={job.companyName} arrow placement='top'
//                       PopperProps={{
//                         modifiers: [
//                           {
//                             name: "offset",
//                             options: {
//                               offset: [0, -4], // Adjust the second value to control vertical gap
//                             },
//                           },
//                         ],
//                       }}
//                       >
//                         <label>{job.companyName.length > 6 
//                           ? job.companyName.substring(0, 6) + "..." 
//                           : job.companyName}
//                           </label>
//                       </Tooltip>
//                       <label className={styles.dot}>|</label>
//                       <FontAwesomeIcon icon={faUsers} className={styles.salaryIcon} style={{ margin: '0', fontSize: '15px', color:'#2A85FE',paddingRight:'10px' }} />
//                       <label>{`${job.applicants?.length || 0} Applicants`}</label>
//                       <label className={styles.dot}>|</label>
//                       <FontAwesomeIcon icon={faClockFour} className={styles.salaryIcon} style={{ fontSize: '15px', margin: '0',color:'#2A85FE',paddingRight:'10px' }} />
//                       <label>{`Posted ${job.postingDate} ago`}</label>
//                     </div>
//                   </div>
//                 </div>
//                 <div className={styles.titleContainer}>
//                   <div style={{ display: 'flex', alignItems: 'center' }} className={styles.actions}>
//                     <div className={styles.appliedToday}>
//                       <span>Applied Today</span>
//                     </div>
//                     <button className={styles.readMore} onClick={()=>{localStorage.setItem("ClickedJob", job._id); navigate("/jobDetails")}}>Read More</button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))
//         )}
//       </ul>
//       <div className={styles.pagination} style={{display:currentJobs?.length < 4 && 'none'}}>
//         <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
//         <span>{`Page ${currentPage} of ${totalPages}`}</span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default AppliedJobsCard;












import { Base_URL } from '../../../const/const';


import React, { useState, useEffect } from 'react';
import styles from './appliedJobs.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faClockFour } from "@fortawesome/free-solid-svg-icons";
import Tooltip from '@mui/material/Tooltip';
import NoDataFound from '../Empty Screen/noDataFound';
import { useNavigate } from "react-router-dom";
import pic from "./CompanyDemoPic.png";

const AppliedJobsCard = () => {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const appliedJobsString = localStorage.getItem("appliedJobs");
        if (!appliedJobsString) return;

        const appliedJobsArray = JSON.parse(appliedJobsString);
        if (!Array.isArray(appliedJobsArray)) return;

        const response = await fetch(`${Base_URL}/api/findAppliedJobs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ appliedJobs: appliedJobsArray }),
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setAppliedJobs(data.newJobs);
      } catch (error) {
        console.error('Failed to fetch applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, []);

  const totalPages = Math.ceil(appliedJobs.length / jobsPerPage);
  const currentJobs = appliedJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  return (
    <div className={styles.card}>
      <div className={styles.jobAndLength}>
        <p className={styles.title}>Number of applied jobs</p>
        <p className={styles.count}>{appliedJobs.length}</p>
      </div>
      <ul className={styles.jobList}>
        {currentJobs.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <NoDataFound message="No jobs applied yet." />
          </div>
        ) : (
          currentJobs.map((job, index) => (
            <li key={index} className={styles.jobItem} style={{ borderColor: currentJobs?.length - 1 === index && 'transparent' }}>
              <div className={styles.titleContainer}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px',marginBottom:'8px' }}>
                  <img src={pic} alt='company' style={{height:'100%',width:'35px'}} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px' }} className={styles.pointer}>
                      <label className={styles.jobTitle}>{job.jobTitle}</label>
                    </div>
                    <div className={styles.companyInfo}>
                      <Tooltip title={job.companyName} arrow placement='top'
                        PopperProps={{
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -4],
                              },
                            },
                          ],
                        }}
                      >
                        <label>{job.companyName.length > 6 ? job.companyName.substring(0, 6) + "..." : job.companyName}</label>
                      </Tooltip>
                      <label className={styles.dot}>|</label>
                      <FontAwesomeIcon icon={faUsers} className={styles.salaryIcon} style={{ margin: '0', fontSize: '15px', color: '#2A85FE', paddingRight: '10px' }} />
                      <label>{`${job.applicants?.length || 0} Applicants`}</label>
                      <label className={styles.dot}>|</label>
                      <FontAwesomeIcon icon={faClockFour} className={styles.salaryIcon} style={{ fontSize: '15px', margin: '0', color: '#2A85FE', paddingRight: '10px' }} />
                      <label>{`Posted ${job.postingDate} ago`}</label>
                    </div>
                  </div>
                </div>
                <div className={styles.titleContainer}>
                  <div style={{ display: 'flex', alignItems: 'center' }} className={styles.actions}>
                    <div className={styles.appliedToday}>
                      <span>Applied Today</span>
                    </div>
                    <button className={styles.readMore} onClick={() => { localStorage.setItem("ClickedJob", job._id); navigate("/jobDetails") }}>Read More</button>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className={styles.pagination} style={{display:appliedJobs?.length < 4 && 'none'}}>
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index}
            className={styles.pageDot}
            style={{ backgroundColor: currentPage === index + 1 ? '#2A85FE' : '#ddd' }}
            onClick={() => setCurrentPage(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobsCard;
