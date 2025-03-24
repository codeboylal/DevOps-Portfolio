import React, { useState } from "react";
import styles from "./DeletePopUp.module.css";
import cx from "classnames";

import { useToaster } from "../../../../Toaster";
import { deleteToDoListItem } from "../../../../services/Tasks/deleteTasks";

import questionMark from "./questionMark.png";
import LoadingSpinner from "../../../../Common Components/Loader/Loader";

const DeleteToDoPopUp = ({userId, itemId, listId, deletePopup, setDeletePopup, setActiveToDo})=>{


    const [spiningState, setSpiningState] = useState(false)

    const showToaster = useToaster();

    const deleteListItem = () =>{
        setSpiningState(true)
        deleteToDoListItem({
            userId,
            itemId,
            listId
        }).then(response=>{
            showToaster("To Do Task Deleted Successfully", "success")
            console.log(response?.data?.data)
            setActiveToDo(response?.data?.data)
            window.location.href=`/toDoList`
        }).catch(err=>{
            console.log(err)
            showToaster("To Do Task Deletion Failed", "error")
        })
        setSpiningState(false)
        setDeletePopup(false)
    }


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
                        Are you sure you want to delete this To Do Task?
                    </label>
                </div>
                <div className={styles.flexEnd}>
                    <button className={cx(styles.cancelButton,styles.pointer)} onClick={()=>{setDeletePopup(false)}}>
                        Cancel
                    </button>
                    <button className={cx(styles.confirmButton,styles.pointer)} onClick={deleteListItem}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteToDoPopUp;
