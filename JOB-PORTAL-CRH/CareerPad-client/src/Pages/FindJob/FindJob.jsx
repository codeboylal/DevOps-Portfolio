import React, { useState, useEffect, act } from "react";
import styles from './FindJob.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocationArrow, faChevronDown , faTimes} from '@fortawesome/free-solid-svg-icons';
import cx from "classnames";
import Filter from "../../components/Filter/Filter";
import JobCard from "../../components/Container/FindJob/JobCard";
import ComboBox from "../../components/comboBox/comboBox";
import { FaMapMarkerAlt } from "react-icons/fa";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import NumberJobs from "../../components/NumberJobs/NumberJobs";
import { useToaster } from "../../components/Toaster";
import Loader from '../../components/Loader/Loader';

import { Base_URL } from "../../const/const";


const FindJob = () => {
    const showToaster = useToaster();
    localStorage.removeItem("ClickedJob");
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState(localStorage.getItem("sortOrder") || "Oldest");
    const [loading, setLoading] = useState(true); //loader
    const [experienceArray , setExperienceArray] = useState([3,5,2]);
    const [jobLocationArray, setJobLocationArray] = useState([3,7,2]);
    const [applicantsArray , setApplicantsArray] = useState([6,7,3])




    // Handle user login check
    useEffect(() => {
        const localID = localStorage.getItem("id");
        if (!localID) {
            navigate("/login", { state: { active: "signup" } });
        }
    }, [navigate]);

    const [jobData, setJobData] = useState([]);
    const [query, setQuery] = useState('');
    const [clearInput, setClearInput] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        jobType: [],
        experienceLevel: [],
        jobLocation: [],
        applicants: [],
    });
    const handleSearchChange = (event) => {
        setQuery(event.target.value);
      };

    //hanlde search onclick 
    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
        const jobs = filteredJobs.filter(job => 
            job.jobTitle.toLowerCase().includes(query.toLowerCase()) || 
            job.companyName.toLowerCase().includes(query.toLowerCase())
          );
        setJobData(jobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };


    // Fetch job data when filters or active tab change
    useEffect(() => {
        const fetchJobData = async () => {
            let loadingTimeout;
    
            try {
                // Start a timeout to set loading state after 1 second
                loadingTimeout = setTimeout(() => {
                    setLoading(true);
                }, 1000);
    
                const queryParams = new URLSearchParams();
                Object.keys(selectedFilters).forEach(category => {
                    if (selectedFilters[category].length > 0) {
                        queryParams.append(category, selectedFilters[category].join(','));
                    }
                });
    
                if (queryParams.size === 0) {
                    // showToaster('You are 2 steps away to complete the profile!', 'info');
                }
    
                // Make the API call
                const response = await fetch(`${Base_URL}/api/jobs?${queryParams.toString()}`);
    
                // If the response arrives before 1 second, clear the timeout and loading won't show
                clearTimeout(loadingTimeout);
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                window.scrollTo(0, 0);
    
                const storedSortOrder = localStorage.getItem("sortOrder") || "Oldest";
                const sortedData = storedSortOrder === "Oldest" ? data : data.reverse();
                setJobData(sortedData);
                setSortOrder(storedSortOrder);
                // console.log(data)
                setLoading(false); // Data is fetched, stop loading
            } catch (error) {
                clearTimeout(loadingTimeout); // Clear timeout in case of an error
                console.error('Error fetching job data:', error);
                setLoading(false); // Stop loading on error
            }
        };
    
        fetchJobData();
    }, [selectedFilters]);
    
    // query , toaster

    // Clear filters function
    const clearFilter = () => {
        setSelectedFilters({
            jobType: [],
            experienceLevel: [],
            jobLocation: [],
            applicants: [],
        });
        setClearInput(true); 
        setTimeout(() => setClearInput(false), 100);
        setQuery("")
    };

    // useEffect(()=>{
    //     setClearInput(true)
    // },[selectedFilters])

    // Handle filter change
    const handleFilterChange = (category, filter) => {
        setSelectedFilters((prevFilters) => {
            const isSelected = prevFilters[category].includes(filter);
            if (isSelected) {
                return {
                    ...prevFilters,
                    [category]: prevFilters[category].filter(item => item !== filter)
                };
            } else {
                return {
                    ...prevFilters,
                    [category]: [...prevFilters[category], filter]
                };
            }
        });
    };

    // Handle location selection
    const handleLocationSelect = (location) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            Country: location ? [location] : [],
        }));
    };

    // Sort button toggle (Oldest <--> Most Oldest)
    const handleSortClick = () => {
        if(filteredJobs?.length > 0 ){
            const newSortOrder = sortOrder === "Oldest" ? "Most Recent" : "Oldest";
            localStorage.setItem("sortOrder", newSortOrder); // Store the new order in localStorage
            setSortOrder(newSortOrder);

            // Reverse the job list based on sortOrder
            const reversedJobData = [...jobData].reverse();
            setJobData(reversedJobData);
        }
    };

    const renderToggleIcon = () => (
        <FontAwesomeIcon
            icon={faChevronDown}
            style={{ color: '#4B4B4B', backgroundColor: '#FFFFFF', position: 'absolute', right: '10px' }}
        />
    );

    const Location = ["India", "Nepal"];
    const location = useLocation();
    const active = location.state?.active || 'Find Jobs';

    // Saved jobs handling
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const savedJobsFromStorage = JSON.parse(localStorage.getItem('savedJobs')) || [];
        setSavedJobs(savedJobsFromStorage);
    }, []);

    const handleSavedJobsChange = (updatedJobs) => {
        localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
        setSavedJobs(updatedJobs);
    };

    // useEffect(()=>{
    //     setRefreshState(0)
    //     clearFilter()
    // },[active])

    // const [ filteredJobs, setFilteredJobs] = useState([])

    // useEffect(()=>{
    //     if(active){
    //         if(active === "Saved Jobs"){
    //             setFilteredJobs(jobData.filter(job => savedJobs.includes(job._id)))
    //         }else{
    //             setFilteredJobs(jobData)
    //         }
    //     }
    // },[active, selectedFilters])
    // Filtered jobs based on active tab (Find Jobs or Saved Jobs)
    
    const filteredJobs = active === "Saved Jobs"
        ? jobData.filter(job => savedJobs.includes(job._id))// Show only saved jobs
        : jobData; // Show all jobs

    const [refreshState, setRefreshState] = useState(0);
 

    

    useEffect(()=>{
        let [entryLevel, intermediate, expert] = [0,0,0];
        let [onSite, Remote, Hybrid] = [0,0,0];
        let [applicants1, applicants2, applicants3] = [0,0,0];
        if( jobData && jobData?.length > 0 && refreshState === 0){
            for (let i of jobData){
                if(i?.levels?.[1] === "Entry Level"){
                    entryLevel++;
                }else if(i?.levels?.[1] === "Intermedaite"){
                    intermediate++;
                }else if(i?.levels?.[1] === "Expert"){
                    expert++;
                }
                if(i?.levels?.[2] === "On Site"){
                    onSite++;
                }else if(i?.levels?.[2] === "Hybrid"){
                    Hybrid++;
                }else if(i?.levels?.[2] === "Remote"){
                    Remote++;
                }
                if(i?.applicants?.length >= 0 && i?.applicants?.length <= 2){
                    applicants1++;
                }else if(i?.applicants?.length >= 3 && i?.applicants?.length <= 5){
                    applicants2++;
                }else if(i?.applicants?.length >= 6 && i?.applicants?.length <= 10){
                    applicants3++;
                }
            }
            setExperienceArray([entryLevel,intermediate,expert])
            setJobLocationArray([onSite,Remote,Hybrid])
            setApplicantsArray([applicants1,applicants2,applicants3])
            setRefreshState(1)
        }
    },[jobData])



    return (
        <div className={styles.mainContainer}>
            <Header active={active} clearFilter={clearFilter}/>
            {loading ? (
                <Loader />
            ) : (
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div style={{width:'1280px' , height: '100%'}}>
                    <div className={styles.RecommendInput}>
                        <div>
                            <label 
                                className={styles.Recommend} 
                                style={active === "Saved Jobs" ? { paddingRight:'103px' } : {}}
                            >
                                {active === "Saved Jobs" ? "Saved Jobs" : "Recommended Jobs"}
                            </label>
                        </div>
                        <div className={styles.InputButtonDes}>
                            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <FontAwesomeIcon icon={faSearch} style={{ color: '#4B4B4B', backgroundColor: '#FFFFFF', position: 'absolute', left: '10px' }} />
                                <input onChange={handleSearchChange} value={query} placeholder="Search..." className={styles.InputDes}  />
                                <FontAwesomeIcon onClick={()=>{
                                    setQuery("")
                                }} icon={faTimes} style={{ color: '#4B4B4B', backgroundColor: '#FFFFFF', position: 'absolute', right: '15px' }}/>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <FaMapMarkerAlt style={{ color: '#4B4B4B', backgroundColor: '#FFFFFF', position: 'absolute', left: '10px' }} />
                                <ComboBox clearInput={clearInput} options={Location} toggleDropdown={renderToggleIcon} onSelect={handleLocationSelect} className={styles.InputDes}/>
                            </div>
                            {/* <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <FontAwesomeIcon icon={faLocationArrow} className={styles.hoverDisabled} style={{ color: '#4B4B4B', backgroundColor: '#FFFFFF', position: 'absolute', left: '10px' }} />
                                <input placeholder="All City" value={"All City"} className={cx(styles.InputDes, styles.hoverDisabled)} disabled />
                            </div> */}
                            <div>
                                <button onClick={handleSearchSubmit} className={cx(styles.ButtonDes, styles.pointer)}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                
                    <div className={styles.filterJobCard}>
                        <div className={styles.filterSection} style={{boxShadow: '0px 4px 4px #00000040'}}>
                            <div>
                                <label onClick={clearFilter} className={styles.clearFilter}>Clear All</label>
                                <Filter
                                    labelHeading={"Job Type"}
                                    filterParams={["Full Time", "Part Time", "Internship", "Project Work"]}
                                    selectedFilters={selectedFilters.jobType}
                                    onFilterChange={(filter) => handleFilterChange('jobType', filter)}
                                    active={active}
                                />
                            </div>
                            <div>
                                <Filter
                                    labelHeading={"Experience Level"}
                                    filterParams={["Entry Level", "Intermediate", "Expert"]}
                                    selectedFilters={selectedFilters.experienceLevel}
                                    onFilterChange={(filter) => handleFilterChange('experienceLevel', filter)}
                                    num={experienceArray}
                                    active={active}
                                />
                            </div>
                            <div>
                                <Filter
                                    labelHeading={"Job Location"}
                                    filterParams={["On Site", "Remote", "Hybrid"]}
                                    selectedFilters={selectedFilters.jobLocation}
                                    onFilterChange={(filter) => handleFilterChange('jobLocation', filter)}
                                    num={jobLocationArray}
                                    active={active}
                                />
                            </div>
                            <div>
                                <Filter
                                    labelHeading={"Applicants"}
                                    filterParams={["0-2", "3-5", "6-10"]}
                                    selectedFilters={selectedFilters.applicants}
                                    onFilterChange={(filter) => handleFilterChange('applicants', filter)}
                                    num={applicantsArray}
                                    active={active}
                                />
                            </div>
                        </div>
                            <div style={{ width: '100%' }}>
                                <div style={{ width: '100%' }}>
                                    <NumberJobs jobNumber={filteredJobs?.length || 0} onSortClick={handleSortClick} sortOrder={sortOrder} />
                                </div>
                                <div className={styles.JobCardDiv}>
                                    {
                                    filteredJobs?.map((job) => (
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
                                        /> ))}
                                </div>
                            </div>
                        
                    </div>
                </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default FindJob;
