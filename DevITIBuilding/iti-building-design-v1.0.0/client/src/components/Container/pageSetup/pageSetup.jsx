import React, {useEffect, useState} from "react";
import styles from "./pageSetup.module.css";

import BuildingLoader from "../../loader/loader";
import SideBar from "../../sideBar/sideBar";
import AppBar from "../../appBar/appBar";
import Filter from "../../Container/displayCenter/filter/filter.jsx";
import BottomBar from "../../bottomBar/bottomBar.jsx";
import BelowAppBarMobile from "../../belowAppBarMobile/belowAppBarMobile.jsx";

import SidebarButton from "../../Projects/Project Details/Project Details Side Popup/Side Bar Popup Buttons/sidebarButtons.jsx";
import UserFilters from "../users/filters/filter.jsx";

function PageSetup({ 
    children, 
    loaderState = false,
    active="displayCenter",
    appBar,
    searchValue = '',
    handleSearchChange,
    setFilters,
    buttonDis = false, 
    setButtonDis,
    filters= {
        driveWayValue: "Right"
    },
    setLoading,
    setLikePlansActive,
    likePlansActive= false,
    handleLikePlans,
    landDepthOptions=[],
    landWithOptions=[],
    setFilterEnable,
    setFilterPopUp,
    filterPopUpState,
    setFilterPopUpState,
    projectDetailsSidebar=false,
    ref=true, 
    setRef,
    userAccessFilter={},
    setUserAccessFilter,
    userAccessFilterActive,
    setUserAccessFilterActive,
    setFilterObject,
    filterObject,
    projectNumber

    }) {

    // const boxRef = useRef(null); 
    const [sideBarDisable, setSideBarDisable] = useState(false)

    const [refresh, setRefresh] = useState(ref)

    useEffect(()=>{
        if(ref && (active === "Profile" || active === "users")){
            setRefresh(ref)
            setRef(false)
        }
    },[ref, active])

    // const [userAccessFilterFormData,setUserAccessFilterFormData] = useState({
    //     accountType: '',
    //     discount: ''
    // })
    
    // useEffect(() => {
    //     const handleResize = () => {
    //         if (boxRef.current) {
    //             // console.log("BoxDiv width:", boxRef.current.offsetWidth);
    //             if(boxRef.current.offsetWidth < 800){
    //                 setSideBarDisable(true)
    //             }else{
    //                 setSideBarDisable(false)
    //             }
    //         }
    //     };
    //     window.addEventListener("resize", handleResize);
    //     handleResize();
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);



    // useEffect(() => {
    //     const mediaQuery = window.matchMedia('(max-width: 990px)');
    
    //     const handleMediaQueryChange = (event) => {
    //         if (event.matches) {
    //         // setSidePopUp(false);
    //             setSideBarDisable(true)
    //         }else{
    //             setSideBarDisable(false)
    //         }
    //     };
    //     mediaQuery.addEventListener('change', handleMediaQueryChange);
    //     if (mediaQuery.matches) {
    //         setSideBarDisable(true)
    //         // setSidePopUp(false);
    //     }else{
    //         setSideBarDisable(false)
    //     }
    //     return () => {
    //         mediaQuery.removeEventListener('change', handleMediaQueryChange);
    //     };
    //     }, []);





    if (loaderState) {
        return (
            <div className={styles.loaderWrapper}>
                <BuildingLoader />
            </div>
        );
    }


    if (!loaderState){
        return (
            <div className={styles.outerDiv} 
            // ref={boxRef}
            >
                <div
                    style={{
                        width:'260px',
                        display: sideBarDisable && 'none'
                    }}
                    className={styles.sideBarDiv}
                >
                    <SideBar 
                        active={active}
                        setLoading={setLoading}
                        setRefresh={setRefresh}
                        refresh={refresh}
                    />
                </div>
                <div className={
                    styles.content
                }>
                    <div 
                        className={styles.contentDiv}
                        style={{
                            maxWidth:  active=== "displayCenter" ? '1128px' : '1102px',
                        }}    
                    >
                        <div style={{
                            width:'100%',
                            // maxWidth:'1102px',
                            display: appBar ? "flex" : 'none',
                            flexDirection:'column',
                            // gap:'12px'
                        }}>
                            <AppBar 
                                sideBarEnable={!sideBarDisable}
                                active={active}
                                searchValue={searchValue}
                                handleSearchChange={handleSearchChange}
                                setLikePlansActive={setLikePlansActive}
                                likePlansActive={likePlansActive}
                                handleLikePlans={handleLikePlans}
                                setRefresh={setRefresh}
                                refresh={refresh}
                            />
                            <BelowAppBarMobile 
                                searchValue={searchValue}
                                handleSearchChange={handleSearchChange}
                                setLikePlansActive={setLikePlansActive}
                                likePlansActive={likePlansActive}
                                handleLikePlans={handleLikePlans}
                                active={active} 
                                setFilters={setFilters}
                                buttonDis={buttonDis} 
                                setButtonDis={setButtonDis}
                                filters={filters}
                                landDepthOptions={landDepthOptions}
                                landWithOptions={landWithOptions}
                                setFilterEnable={setFilterEnable}
                                setFilterPopUp={setFilterPopUp}
                                setFilterPopUpState={setFilterPopUpState}
                                filterPopUpState={filterPopUpState}
                            />
                        </div>
                        <div className={styles.paddingLeft12}>
                        {children}
                        </div>
                    </div>
                    <div className={styles.filterSection}
                        style={{
                            display: active!== "displayCenter" && 'none'
                        }}
                    >
                        <Filter 
                            setFilters={setFilters}
                            buttonDis={buttonDis} 
                            setButtonDis={setButtonDis}
                            filters={filters}
                            active={active}
                            landDepthOptions={landDepthOptions}
                            landWithOptions={landWithOptions}
                        />
                    </div>
                    <div className={styles.filesSection} style={{
                        display: !projectDetailsSidebar && 'none'
                    }}>
                        <SidebarButton projectNumber={projectNumber}/>
                    </div> 
                
                      <div className={styles.filterSection} style={{
                        display: active!== "users" && 'none'
                    }}>
                        <UserFilters 
                            userAccessFilter={userAccessFilter}
                            setUserAccessFilter={setUserAccessFilter}
                            setUserAccessFilterActive={setUserAccessFilterActive}
                            userAccessFilterActive={userAccessFilterActive}
                            setFilterObject={setFilterObject}
                            filterObject={filterObject}
                            active={active}
                        />
                    </div>
                    {/* <div className={styles.filterSection} style={{
                        display: !projectDetailsSidebar && 'none'
                    }}>
                        <SidebarButton />
                    </div> 
                    
                    
                    </div> */}
                </div>
                <div className={styles.BottomBarDiv}>
                    <BottomBar 
                        active={active}
                    />
                </div>
            </div>
        );
    }
}

export default PageSetup;
