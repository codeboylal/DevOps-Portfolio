import React,{useEffect, useRef} from "react";

import styles from "./filterPopUp.module.css";

import Filter from "../displayCenter/filter/filter";

function FilterPopUp({setFilters, setFilterPopUpState, filters,landDepthOptions,  setFilterPopUp, setFilterEnable, buttonDis, setButtonDis, landWithOptions}){

    const boxRef = useRef(null);
    useEffect(() => {
        const handleResize = () => {
            if (boxRef.current) {
                // console.log("BoxDiv width:", boxRef.current.offsetWidth);
                if(boxRef.current.offsetWidth > 1600){
                    setFilterPopUp(false)
                    setFilterEnable(true)
                }else{
                    setFilterPopUp(true)
                    setFilterEnable(false)
                }
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setFilterPopUp, setFilterEnable]);


    return(
        <div 
            className={styles.filterPopUp}
            onClick={()=>{setFilterPopUp(false);
                setFilterEnable(true);
                setFilterPopUpState(false)
            }}
            ref={boxRef}
        >
            <div onClick={(e)=>{e.stopPropagation()}}
                style={{
                    // width:'388px',
                    position:'absolute',
                    right:'0px'
                }}
                className={styles.width}
            >
                <Filter 
                    landDepthOptions={landDepthOptions}
                    setFilters={setFilters}
                    buttonDis={buttonDis} 
                    setButtonDis={setButtonDis}
                    filters={filters}
                    landWithOptions={landWithOptions}
                />
            </div>
        </div>
    )
}

export default FilterPopUp;