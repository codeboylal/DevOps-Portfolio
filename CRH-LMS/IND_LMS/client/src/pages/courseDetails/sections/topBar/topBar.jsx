import React from "react";
import {useNavigate} from "react-router-dom";

import styles from "./topBar.module.css";
import cx from "classnames";

// assets
import back from "../../../../assets/courseDetails/backButton.svg";

function TopBar({activeModule = 1, setActiveModule, courseId="", totalModule = 1}){
    const navigate = useNavigate();
    return(
        <div className={cx(styles.flex, styles.alignCenter, styles.gap24px)}>
            <div className={cx(styles.backDiv, styles.flex, styles.alignCenter, styles.justifyCenter, styles.pointer)} onClick={()=>{navigate('/myCourses')}}>
                <img src={back} alt="LMS" />
            </div>
            {Array.from({length : totalModule},((_, index)=>{
                return(
                    <div onClick={()=>{setActiveModule(index + 1); navigate(`/courseDetails/${courseId}/${index + 1}`)}} key={index} className={cx(styles.pointer, styles.moduleDiv, styles.flex, styles.alignCenter, styles.justifyCenter, index === (activeModule - 1) && styles.activeModule)}>
                        Module {index + 1}
                    </div>
                )
            }))}
        </div>
    )
}

export default TopBar;