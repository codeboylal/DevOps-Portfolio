import React,{useEffect} from "react";

import styles from "./SidebarPopUp.module.css";
import SideBar from "../../sideBar/sideBar";

function SidebarPopUp({setSidePopUp, active}){
    useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1150px)');

    const handleMediaQueryChange = (event) => {
        if (event.matches) {
        setSidePopUp(false);
        }
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    if (mediaQuery.matches) {
        setSidePopUp(false);
    }
    return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
    }, []);
    return(
        <div 
            className={styles.sidePopUp}
            onClick={()=>{setSidePopUp(false)}}
        >
            <div onClick={(e)=>{e.stopPropagation()}} >
                <SideBar 
                    name={""}
                    active= {active}
                    setSidePopUp={setSidePopUp}
                />
            </div>
        </div>
    )
}

export default SidebarPopUp;