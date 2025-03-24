import React,{useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


import styles from "./AddToDoCard.module.css";
import cx from "classnames";

import InputMaterialUI from "../../../../../components/Input/textField";

import {useToaster} from "../../../../../Toaster.js";
import { updateToDoCard } from "../../../../../services/Tasks/updateTasks.js";

function AddToDoCard({id, cardData, para, showAddEdit, setAddEdit, setToDo}){
    const setToast = useToaster()
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const [titleError, setTitleError] = useState('');
    const [descError, setDescError] = useState('');

    const [selectedColor, setSelectedColor] = useState('#FAF3FF');

    const [userId, setUserId] = useState('')

    useEffect(()=>{
        setUserId(localStorage.getItem("id"))
    },[])

    useEffect(()=>{
        if(showAddEdit){
            document.body.style.overflowY = "hidden"
        }else{
            document.body.style.overflowY = "scroll"
        }
    },[showAddEdit])


    const saveFunc = ()=>{
        if(title?.length === 0){
            setTitleError('Title is required')
        }
        if(desc?.length === 0){
            setDescError("Description is required")
        }
        if(title?.length > 0 && desc?.length > 0){
            if(userId){
                if(para === "Edit"){
                    if(id === null){
                        setToast("Please Try Again","error")
                    }
                }
                updateToDoCard({
                    id,
                    para,
                    userId,
                    title,
                    desc,
                    selectedColor
                }).then(response=>{
                    // console.log(id, para, userId, title, desc, selectedColor)
                    // console.log(response?.data?.data?.toDo)
                    setTitle('')
                    setDesc('')
                    setSelectedColor('#FAF3FF')
                    setToDo(response?.data?.data?.toDo)
                    setToast(`To Card ${para === "Edit" ? "Edited" : 'Added'} Successfully `,"success")
                    window.location.href=`/toDoList`
                }).catch(err=>{
                    setToast("Please Try Again","error")
                })
            }else{
                setToast("Please Login Again","error")
                navigate("/login")
            }
            setAddEdit(false)
        }
    }


    useEffect(()=>{
        if(para === "Edit" && cardData){
            setTitle(cardData?.title || '')
            setDesc(cardData?.description || '')
            setSelectedColor(cardData?.background || '')
        }
    },[para , cardData])


    const handleChange = (e, field) => {
        const { value } = e.target;
    
        if (field === 'title') {
          setTitle(value);
          if (!value) {
            setTitleError('Title is required');
          } else {
            setTitleError('');
          }
        } else if (field === 'desc') {
          setDesc(value);
          if (!value) {
            setDescError('Description is required');
          } else {
            setDescError('');
          }
        }
      };

    return(
        <div className={styles.outerDiv}>
            <div className={styles.popUpDiv}>
                <div>
                    <label className={styles.labelDes}>
                        {para} List
                    </label>
                </div>
                <div style={{ width: '100%', marginTop: '12px' }}>
                    <InputMaterialUI
                        title={"Title"}
                        customWidth={'624px'}
                        value={title}
                        errorState={titleError ? true : false}
                        onClick={()=>{setTitleError('')}}
                        onChange={(e) => handleChange(e, 'title')}
                    />
                    {titleError && (
                        <div style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
                            {titleError}
                        </div>
                    )}
                </div>
                <div style={{ width: '624px', marginTop: '12px' }}>
                    <textarea
                        className={`${styles.textArea} ${descError ? styles.error : ''}`}
                        placeholder="Description"
                        id="description"
                        value={desc}
                        onClick={() => setDescError('')}
                        onChange={(e) => handleChange(e, 'desc')}
                        rows={4}
                    />
                    {descError && (
                        <div style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>
                            {descError}
                        </div>
                    )}
                </div>
                <div className={styles.labelColorDiv}>
                    <label>
                        Select Card Color
                    </label>
                    <div className={styles.colorsDiv}>
                        {/* <div className={styles.colorDiv} onClick={()=>{setSelectedColor('#F4F3FF')}}>
                            <div className={styles.activeColor} style={{display: selectedColor !== '#F4F3FF' && 'none' }}>

                            </div>
                        </div>
                        <div className={styles.colorDiv} style={{backgroundColor:'#FFF9EF'}} onClick={()=>{setSelectedColor('#FFF9EF')}}>
                            <div className={styles.activeColor} style={{display: selectedColor !== '#FFF9EF' && 'none' }}>
                                
                            </div>
                        </div>
                        <div className={styles.colorDiv} style={{backgroundColor:'#FFE8E8'}} onClick={()=>{setSelectedColor('#FFE8E8')}}>
                            <div className={styles.activeColor} style={{display: selectedColor !== '#FFE8E8' && 'none' }}>
                                
                            </div>
                        </div>
                        <div className={styles.colorDiv} style={{backgroundColor:'#F0FFFB'}} onClick={()=>{setSelectedColor('#F0FFFB')}}>
                            <div className={styles.activeColor} style={{display: selectedColor !== '#F0FFFB' && 'none' }}>
                                
                            </div>
                        </div>
                        <div className={styles.colorDiv} style={{backgroundColor:'#F7FFE8'}} onClick={()=>{setSelectedColor('#F7FFE8')}}>
                            <div className={styles.activeColor} style={{display: selectedColor !== '#F7FFE8' && 'none' }}>
                                
                            </div> 
                        </div>
                        <div className={styles.colorDiv} style={{backgroundColor:'#EFEFEF'}} onClick={()=>{setSelectedColor('#EFEFEF')}}>
                            <div className={styles.activeColor} style={{display: selectedColor !== '#EFEFEF' && 'none' }}>
                                
                            </div>
                        </div> */}
                        <div className={styles.colorDiv} onClick={()=>{setSelectedColor('#FAF3FF')}}>
                            <div className={styles.activeColor} style={{display: selectedColor !== '#FAF3FF' && 'none' }}>

                            </div>
                        </div>
                        <div className={styles.colorDiv} style={{backgroundColor:'#E8F2FF'}} onClick={()=>{setSelectedColor('#E8F2FF')}}>
                            <div className={styles.activeColor} style={{display: selectedColor !== '#E8F2FF' && 'none' }}>
                                
                            </div>
                        </div>
                        <div className={styles.colorDiv} style={{backgroundColor:'#F1FFF5'}} onClick={()=>{setSelectedColor('#F1FFF5')}}>
                            <div className={styles.activeColor} style={{display: selectedColor !== '#F1FFF5' && 'none' }}>
                                
                            </div>
                        </div>
                        <div className={styles.colorDiv} style={{backgroundColor:'#FFECE3'}} onClick={()=>{setSelectedColor('#FFECE3')}}>
                            <div className={styles.activeColor} style={{display: selectedColor !== '#FFECE3' && 'none' }}>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonDiv}>
                    <button 
                        className={cx(styles.cancelButton,styles.pointer)}
                        onClick={()=>{setAddEdit(false)}}
                    >
                        Cancel
                    </button>
                    <button 
                        className={cx(styles.confirmButton,styles.pointer)}
                        onClick={saveFunc}
                    >
                        {para === "Edit" ? "Update" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddToDoCard;