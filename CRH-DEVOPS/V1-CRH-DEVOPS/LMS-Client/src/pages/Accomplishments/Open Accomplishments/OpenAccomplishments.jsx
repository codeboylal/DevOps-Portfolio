import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import styles from "./OpenAccomplishments.module.css";
import OpenCard from "../../../components/container/Accomplishments/Open Card/OpenCard";
import UpperContainer from "./Sections/UpperContainer/UpperContainer";
import MidContainer from "./Sections/MidContainer/MidContainer";
import LowerContainer from "./Sections/LowerContainer/LowerContainer";
import { GetUserDetails } from "../../../services/Tasks/getTasks";
import { getExploreCourses } from "../../../services/Courses/GetCourses";
import LoadingSpinner from "../../../Common Components/Loader/Loader";
import HeaderDashboardPage from "../../../Common Components/Header Dashboard Page/headerDashboardPage";
import SidebarDashboard from "../../../Common Components/SideBar Dashboard/sideBarDashboard";

// Back Button 
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
const OpenAccomplishments = () =>{
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [continueId, setContinueId] = useState();
  const [staticCourseId, setStaticCourseId] = useState();
  const [moduleName , setModuleName] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState(0);

  const [hide, setHide] = useState(false)

  const [reRender, setReRender] = useState(true);

  useEffect(()=>{
    // window.scroll(0,0)
    try{
      setId(localStorage.getItem("id"))
      setContinueId(localStorage.getItem("continueWatchingCourseID"))
      setStaticCourseId(localStorage.getItem("AccomplishmentCourseID"))
      // setReRender(!reRender)
      // console.log(localStorage.getItem("continueWatchingCourseID"), localStorage.getItem("AccomplishmentCourseID"))
    }catch{
      navigate("/")
      console.log("Id is not stored in Local Storage")
    }
  },[navigate,reRender])

  const [userData, setUserData] = useState([]);
  const [watchinCourses, setWatchingCourses] = useState([]);
  useEffect(()=>{
    if(id && staticCourseId){
      window.scrollTo(0,0)
      GetUserDetails(id).then(response=>{
        setUserData(response?.data?.data[0])
        if(response?.data?.data[0]?.continueWatching?.length === 0){
          navigate("/exploreCourses")
        }
        // console.log(response?.data?.data[0])
        setWatchingCourses(response?.data?.data[0]?.continueWatching)

        getExploreCourses().then(response => {
          const modules = response?.data?.data;
          // console.log(modules)
      
          if (modules && Array.isArray(modules)) {
              const matchedModule = modules.find(module => module._id === staticCourseId);
              if (matchedModule) {
                  setModuleName(matchedModule.moduleName);
                  setEnrolledStudents(matchedModule?.EnrolledStudents)
              }
          }
      });
      })
    }
  },[id, staticCourseId, navigate])

  const [staticCourse, setStaticCourse] = useState({});
  const [nonStaticCourses, setNonStaticCourses] = useState([]);
  useEffect(()=>{
    if(watchinCourses && staticCourseId){
      const foundCourse = watchinCourses.find(i => (i.courseID ? i.courseID : i?.courseId) === staticCourseId);
      if (foundCourse) {
        // console.log(foundCourse)
        setStaticCourse(foundCourse);
      }
      const filteredCourses = watchinCourses.filter(i => (i.courseID ? i.courseID : i?.courseId !== staticCourseId) && i.progress === 100);
      // console.log(filteredCourses)
      setNonStaticCourses(filteredCourses);
    }
  },[watchinCourses,staticCourseId])

  const [triggerDownload, setTriggerDownload] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("DownloadCertificate")){
      setTriggerDownload(true)
      localStorage.removeItem("DownloadCertificate")
    }
  },[])



  useEffect(() => {
    const checkZoomLevel = () => {
      const zoomLevel = window.devicePixelRatio * 100; // Convert ratio to percentage
      if (zoomLevel.toFixed(1) > 130) {
        setHide(true)
        // console.log(`Your screen is zoomed to more than 90%. Current zoom: ${zoomLevel.toFixed(1)}%`);
      }else{
        setHide(false)
      }
    };

    // Add event listener for zoom changes
    window.addEventListener("resize", checkZoomLevel);

    // Initial check when component mounts
    checkZoomLevel();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkZoomLevel);
      setHide(false)
    };
  }, []);


    return(
      <div className={styles.container} style={{ display: 'flex' }}>
      <SidebarDashboard page={"OpenAccomplishments"}/>
      <div className={styles.contentContainer}>
        <HeaderDashboardPage 
        pageText={"Accomplishments"}
        AppBarText={"Turning Asspirants into remarable achievements."}/>
        <div className={styles.mainDiv}>
          {watchinCourses?.length > 0 ?
            <div
              className={styles.midContainer}
          >
            <div className={styles.leftColumn} style={{display:hide && 'none' }}>

              <div style={{paddingTop:'10px' ,display:  'flex' ,flexDirection:'column' ,gap:'24px'}}>
                {/* 6 Cards max to show */}
                <OpenCard border={true} setReRender={setReRender} reRender={reRender} courseId={staticCourse?.courseID || staticCourse?.courseId} indexCourseID={staticCourse.id} imag={staticCourse?.image} courseName={staticCourse?.title} company={staticCourse?.company} name={userData?.name} completionDate={staticCourse?.completionDate} grade={staticCourse?.Grade} instructor={staticCourse?.courseInstructor?.[0]}/>
                {nonStaticCourses?.slice(0,5)?.map((item,index)=>{
                  return(
                    <div key={index}>
                      <OpenCard setReRender={setReRender} reRender={reRender} courseId={item?.courseID || item?.courseId} indexCourseID={item?.id} imag={item?.image} courseName={item?.title} company={item?.company} name={userData?.name} completionDate={item?.completionDate} grade={item?.Grade} instructor={item?.courseInstructor[0]}/>
                    </div>
                  )
                })}
                {watchinCourses?.length === 0 &&
                  <div>
                    You have only completed one course
                  </div>
                }
              </div>
            </div>
            <div className={styles.rightColumn} style={{width : hide && '100%'}}>
            <div>

                <FontAwesomeIcon icon={faChevronLeft}  onClick={() => window.history.back()} style={{ cursor: 'pointer', color:'#7E7E7E', width:'12.6px',height:'20.16px' }} />
              </div>
                <UpperContainer onTriggerDownload={() => setTriggerDownload(true)}  imag={staticCourse?.image} title={staticCourse?.title} EnrolledStudents={enrolledStudents}  company={staticCourse?.company} grade={staticCourse?.Grade}/>
                <MidContainer  triggerDownload={triggerDownload} resetTrigger={() => setTriggerDownload(false)} name={userData.name} title={staticCourse?.title}/>
                <LowerContainer name={userData?.name} startDate={userData?.continueWatching?.[continueId-1]?.startDate} completionDate={userData?.continueWatching?.[continueId-1]?.completionDate} moduleName={moduleName} />
            </div>
          </div>  
          :
          <div>
            <LoadingSpinner />
          </div>
        }
        </div>
      </div>
      </div>
    )
}
export default OpenAccomplishments;