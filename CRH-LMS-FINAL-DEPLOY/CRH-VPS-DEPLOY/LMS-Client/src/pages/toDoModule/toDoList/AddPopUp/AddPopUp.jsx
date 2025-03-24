import React, { useState } from "react";
import { useToaster } from "../../../../Toaster";

import styles from "./AddPopUp.module.css";
import cx from "classnames";


import InputMaterialUI from "../../../../components/Input/textField";
import { updateToDoList } from "../../../../services/Tasks/updateTasks";

function AddPopUp({para='Add', setAppPopUp , setEditPopUp, titleValue = '', itemId, taskId, userId, setActiveToDo}){
    const setToast = useToaster();
    const [titleError, setTitleError] = useState('')
    const [title, setTitle] = useState(titleValue)

    const handleChange = (value) =>{
        if(value?.length === 0){
            setTitleError("Title can't be Empty")
        }else if(value?.length > 70){
            setTitleError("Title can't be greater more than 70 characters")
        }else{
            setTitleError('')
        }
        setTitle(value)
    }

    const handleSave = () =>{
        if(title?.length !== 0){
            if(para==="Update"){
                updateToDoList({
                    userId,
                    taskId,
                    itemId,
                    title,
                    para
                }).then(response =>{
                    console.log(response?.data?.data)
                    setActiveToDo(response?.data?.data)
                    setEditPopUp(false)
                    setToast("To-Do List Updated Successfully","success")
                }).catch(err=>{
                    console.log(err)
                    setEditPopUp(false)
                    setToast("To-Do List Updation Failed","error")
                })
            }else if(para === "Add"){
                updateToDoList({
                    userId,
                    taskId,
                    itemId,
                    title,
                    para
                }).then(response =>{
                    console.log(response?.data?.data)
                    setActiveToDo(response?.data?.data)
                    setAppPopUp(false)
                    setToast("To-Do Task Added Successfully","success")
                    window.location.href=`/toDoList`
                }).catch(err=>{
                    console.log(err)
                    setAppPopUp(false)
                    setToast("To-Do Task Addition Failed","error")
                })
            }
        }
    }

    return(
        <div className={styles.outerDiv}>
            <div className={styles.EditContainer}>
                <div>
                    <label className={styles.labelDes}>
                        {para} To Do
                    </label>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                    <div>
                        <InputMaterialUI
                            title={"Title"}
                            customWidth={'624px'}
                            value={title}
                            errorState={titleError ? true : false}
                            onClick={()=>{setTitleError('')}}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {titleError && (
                            <div style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
                                {titleError}
                            </div>
                        )}
                    </div>
                    <div className={styles.buttonDiv}>
                        <button className={cx(styles.cancelButton,styles.pointer)} onClick={()=>{setAppPopUp(false); setEditPopUp(false); setTitle('')}}>
                            Cancel
                        </button>
                        <button 
                            className={cx(styles.confirmButton,styles.pointer)} 
                            onClick={handleSave}
                            style={{
                                backgroundColor: title?.length === 0 && '#FFEDDE',
                                color: title?.length === 0 && '#FF702D',
                                cursor: title?.length === 0 && 'default'
                            }}
                        >
                            {para}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPopUp;