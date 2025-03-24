import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import cx from "classnames";
import styles from "./delete.module.css";

import del from "../../../../../pages/Profile/sections/Education/DeleteEducation/questionMark.png";
import { deleteToDoCardProfile } from "../../../../../services/Tasks/deleteTasks";

import {useToaster} from "../../../../../Toaster.js";

function Delete({id, showDeleteConfirm, setToDo, setDeleteConfirm, setCurrentPage}){

    const setToast = useToaster();
    const navigate = useNavigate();

    const [userId, setUserId] = useState('')

    useEffect(()=>{
        setUserId(localStorage.getItem("id"))
    },[])

    useEffect(()=>{
        if(showDeleteConfirm){
            document.body.style.overflowY = "hidden"
        }else{
            document.body.style.overflowY = "scroll"
        }
    },[showDeleteConfirm])

    const deleteConfirm = (id)=>{
        // console.log(id,userId)
        deleteToDoCardProfile({id, userId}).then(response=>{
            // console.log(response?.data?.data)
            setToDo(response?.data?.data?.toDo)
            setDeleteConfirm(false)
            navigate("/toDoModule")
            setToast("ToDo Card Deleted Successfully","success")
            if(response?.data?.data?.toDo?.length % 16 === 0){
                setCurrentPage(1)
            }
            // console.log("To Do Card Deleted Successfully")
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className={styles.outerDiv} style={{cursor:'default'}}>
            <div className={styles.popUpDiv}>
                <img className={styles.imgDes} src={del} alt="questionMark" />
                <div style={{display:'flex',flexDirection:'column'}} >
                    <label style={{lineHeight:'19px'}}>
                        Are you sure you want to delete this list? Clicking 'CONFIRM' will 
                    </label>
                    <label style={{paddingLeft:'65px',lineHeight:'19px'}}>
                                   permanently remove all To Dos in this list.
                    </label>
                </div>
                <div style={{display:'flex',flexDirection:'row',width:'100%',alignItems:'center',gap:'12px',justifyContent:'flex-end'}}>
                    <button onClick={()=>{setDeleteConfirm(false)}} className={cx(styles.pointer,styles.cancelButton)}>
                        Cancel
                    </button>
                    <button className={cx(styles.pointer,styles.confirmButton)} onClick={()=>{deleteConfirm(id)}}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Delete;