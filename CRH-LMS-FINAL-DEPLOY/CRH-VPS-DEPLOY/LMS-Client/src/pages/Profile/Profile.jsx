import React, { useState, useEffect  } from "react";
import styles from './Profile.module.css';
import { useNavigate } from "react-router-dom";

// Sections Import
import { GetUserDetails } from "../../services/Tasks/getTasks";
import Header from "./sections/Header/Header";
import Bio from "./sections/Bio/Bio";
import Education from "./sections/Education/Education";
import Courses from "./sections/Courses/Courses";
import LoadingSpinner from "../../Common Components/Loader/Loader";
import EditProfilePopup from "./sections/Header/EditHeader/EditHeader";
import SidebarDashboard from "../../Common Components/SideBar Dashboard/sideBarDashboard";
import HeaderDashboardPage from "../../Common Components/Header Dashboard Page/headerDashboardPage";
// import CustomizedSnackbars from "../../components/Toaster/Toaster";
import EditBioPopUp from "./sections/Bio/EditBio/EditBio";
import EditEducationPopUp from "./sections/Education/EditEducation/EditEducation";


function ProfilePage() {
    const navigate = useNavigate();

    const [userID, setUserID] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [headerPopupState, setHeaderPopupState] = useState(false);
    const [cancelState, setCancelState] = useState(false);

    const [userDataChange , setUserDataChange] = useState(false);

    const[profileCompletion ,setProfileCompletion] = useState(0);

    const [showHidePopup, setShowHidePopup] = useState(false);

    const [deletePopup, setDeletePopup] = useState(false);

    const [showHideEduPopup, setShowHideEduPopup] = useState(false);

    const [userData, setUserData] = useState({
        name: '',
        edu: '',
        email: '',
        location: '',
        enrolledCourses: '',
        organizationName: '',
        mobileNo: '',
        Languages: '',
        bio: '',
        education: '',
    });

    

    useEffect(() => {
        const storedUserID = localStorage.getItem("id");
        if (storedUserID) {
            setUserID(storedUserID);
        }else{
            navigate("/login");
        }
    }, [navigate]);

    
    useEffect(() => {
        try {
            if ( !headerPopupState) {
                let completion = 0;
        
                if (userData?.bio?.length > 0) {
                    completion += 30;
                }
                if (userData?.education?.length > 0) {
                    completion += 30;
                }                
                if (userData?.name?.length > 0) {
                    completion += 5;
                }
                if (userData?.email?.length > 0) {
                    completion += 5;
                }
                if (userData?.location?.length > 0) {
                    completion += 10;
                }
                if (String(userData?.mobileNo).length > 0 && userData?.mobileNo!==null ) {
                    completion += 10;
                }                
                if (userData?.Languages?.length > 0) {
                    completion += 10;
                }
        
                setProfileCompletion(completion);
            }
        } catch (err) {
            console.error("Failed to compute Profile Completion", err);
        }
    }, [userData, headerPopupState]);

    const [saveState, setSaveState] = useState(true);

    // useEffect(() => {
    //     if (userID !== null && !cancelState && !headerPopupState && !showHidePopup && !showHideEduPopup) {
    //         setIsLoading(true);
    //         GetUserDetails(userID)
    //             .then(response => {
    //                 setUserData(response?.data?.data[0]);
    //                 setUserData(prevState => ({
    //                     ...prevState,
    //                     edu: response?.data?.data?.[0]?.education?.[0].courseNameValue || null
    //                 }));
    //                 setUserDataChange(true);
    //             })
    //             .catch(err => console.log("Error fetching Profile header data"))
    //             .finally(() => setIsLoading(false));
    //     }
    // }, [userID, cancelState , headerPopupState, showHidePopup, showHideEduPopup]);



    
    useEffect(() => {
        if (userID !== null && saveState) {
            window.scrollTo(0,0)
            setIsLoading(true);
            GetUserDetails(userID)
                .then(response => {
                    setUserData(response?.data?.data[0]);
                    setUserData(prevState => ({
                        ...prevState,
                        edu: response?.data?.data?.[0]?.education?.[0]?.courseNameValue || null
                    }));
                    setUserDataChange(true);
                    setSaveState(false);
                })
                .catch(err => console.log("Error fetching Profile header data"))
                .finally(() => setIsLoading(false));
        }
    }, [userID, saveState]);
    
    
        
    
    // Effect to handle body class for scrolling
    useEffect(() => {
        const body = document.body; 

        if (headerPopupState || showHidePopup || showHideEduPopup || deletePopup) {
            body.style.overflowY = "hidden";
            body.style.overflowX = "hidden";
        } else {
            body.style.overflowY = "auto"; 
            body.style.overflowX = "hidden";
        }
        return () => {
            body.style.overflowY = "auto";
            body.style.overflowX = "hidden"; 
        };
    }, [headerPopupState, showHidePopup, showHideEduPopup, deletePopup]);


    const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio * 100);
    useEffect(() => {
      const updateZoomLevel = () => {
        setZoomLevel(window.devicePixelRatio * 100);
      };
      window.addEventListener("resize", updateZoomLevel);
      return () => {
        window.removeEventListener("resize", updateZoomLevel);
      };
    }, []);
  
    // useEffect(() => {
    //   console.log("Zoom level updated:", zoomLevel);
    // }, [zoomLevel]);
    

    return (
        <div className={styles.container} style={{ display: 'flex' }}>
        <div style={{height:'100%'}}>
            <SidebarDashboard page={"profile"} />
        </div>
        <div className={styles.contentContainer}>
          <HeaderDashboardPage
          pageText={"My Profile"}
           AppBarText={"A glimpse of your greatness"}/>
            {isLoading ? <LoadingSpinner /> :
                <div style={{display:'flex',flexDirection:'column',gap: '24px', paddingTop:'74px',
                    width: zoomLevel > 125 && zoomLevel <= 145 ? '1075px' :
                    zoomLevel > 145 && zoomLevel <= 165 ? '950px' :
                    zoomLevel > 165 && zoomLevel <= 200 ? '800px' :
                    zoomLevel > 206 && zoomLevel <= 230 ? '640px' :
                    "1179px",
                }}>
                    <br />
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '1179px'
                        }}
                    >
                    <Header setUserDataChange={setUserDataChange} userDataChange={userDataChange} profileCompletion={profileCompletion} userData={userData} headerPopupState={headerPopupState} setheaderPopupState={setHeaderPopupState} />
                    </div>
                    <div className={styles.footer} >
                        <div className={styles.BioEdu}>
                            <Bio showHidePopup={showHidePopup} setShowHidePopup={setShowHidePopup} userData={userData} />
                            <Education deletePopup={deletePopup} setDeletePopup={setDeletePopup} setSaveState={setSaveState} showHideEduPopup={showHideEduPopup} setShowHideEduPopup={setShowHideEduPopup} userData={userData} setUserData={setUserData} />
                        </div>
                        <div style={{ width: '100%' }}>
                            <Courses userData={userData} />
                        </div>
                    </div>
                    <EditProfilePopup setSaveState={setSaveState} cancelState={cancelState} setCancelState={setCancelState} setUserData={setUserData} userData={userData} headerPopupState={headerPopupState} setheaderPopupState={setHeaderPopupState} />
                    <EditBioPopUp setSaveState={setSaveState} showHidePopup={showHidePopup} setShowHidePopup={setShowHidePopup} userData={userData}/>
                    <EditEducationPopUp setSaveState={setSaveState} showHideEduPopup={showHideEduPopup} setShowHideEduPopup={setShowHideEduPopup}/>
                </div>
            }
            <br />
        </div>
        </div>
    );
}

export default ProfilePage;
