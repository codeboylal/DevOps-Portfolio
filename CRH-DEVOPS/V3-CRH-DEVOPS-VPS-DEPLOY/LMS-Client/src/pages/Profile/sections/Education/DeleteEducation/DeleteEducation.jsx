import React, { useState } from "react";
import styles from "./DeleteEducation.module.css";
import cx from "classnames";

import { useToaster } from "../../../../../Toaster";
import { deleteEducationProfile } from "../../../../../services/Tasks/deleteTasks";

import questionMark from "./questionMark.png";
import LoadingSpinner from "../../../../../Common Components/Loader/Loader";

const DeleteEducationPopUp = ({ID, deletePopup, setDeletePopup, index, setSaveState, setUserData, })=>{


    const [spiningState, setSpiningState] = useState(false)

    const showToaster = useToaster();

    const deleteEducationItem = () => {
        setSpiningState(true)
        deleteEducationProfile({ userID: ID, educationIndex: index })
            .then((response) => {
                setUserData(prevState => ({
                    ...prevState,
                    education: response?.data?.data?.education || []
                }));
                
                setSaveState(true)
                showToaster('Education Deleted Successfully', 'success')
            })
            .catch(err => {console.log("Error fetching Education Data after deletion"); showToaster('Education Deletion Failed', 'error')} ) ;
            setDeletePopup(false);
            setSpiningState(false)
        };


    return(
        deletePopup && 
        <div className={styles.outerDiv} style={{ zIndex: deletePopup ? "60" : "" }}>
            <div style={{display: spiningState ? 'block' : 'none'}}>
                <LoadingSpinner />
            </div>
            <div className={styles.deletePopUp} style={{display: spiningState ? 'none' : 'flex'}}>
                <div>
                    <img src={questionMark} alt="Question Mark" />
                </div>
                <div>
                    <label className={styles.labelDes}>
                        Are you sure you want to delete this Education?
                    </label>
                </div>
                <div className={styles.flexEnd}>
                    <button className={cx(styles.cancelButton,styles.pointer)} onClick={()=>{setDeletePopup(false)}}>
                        Cancel
                    </button>
                    <button className={cx(styles.confirmButton,styles.pointer)} onClick={deleteEducationItem}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteEducationPopUp;
