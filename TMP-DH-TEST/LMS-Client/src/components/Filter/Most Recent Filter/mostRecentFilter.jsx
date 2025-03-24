import react, { useEffect, useState } from "react";
import styles from "./mostRecentFilter.module.css";
import cx from "classnames";

import TuneIcon from '@mui/icons-material/Tune';


const MostRecentFilter = ({setFilterValue, filterValue}) =>{
   

    useEffect(()=>{
        try{
            setFilterValue(localStorage.getItem("FilterValue"))
            if(!filterValue){
                setFilterValue("Most Recent")
                localStorage.setItem("FilterValue","Most Recent" )
            }
        }catch{
            // console.log("Filter not defined")
        }
    },[])

    const changeFilterValue = () => {
        if (filterValue === "Most Recent") {
          setFilterValue("Oldest");
          localStorage.setItem("FilterValue", "Oldest");
        } else {
          setFilterValue("Most Recent");
          localStorage.setItem("FilterValue", "Most Recent");
        }
      };
      
    return(
        <div className={cx(styles.filterButton,styles.pointer)} onClick={changeFilterValue}>
            <label className={styles.pointer}>
                {filterValue}
            </label>
            <TuneIcon />
        </div>
    )
}

export default MostRecentFilter;
