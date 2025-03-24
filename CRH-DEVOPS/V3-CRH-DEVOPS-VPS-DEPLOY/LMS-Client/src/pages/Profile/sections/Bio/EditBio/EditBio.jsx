import React,{useEffect, useState} from "react";
import styles from "./EditBio.module.css";
import cx from "classnames";
import { updateBioProfile } from "../../../../../services/Tasks/updateTasks";
import { useToaster } from "../../../../../Toaster";
import LoadingSpinner from "../../../../../Common Components/Loader/Loader";


const EditBioPopUp = ({ setSaveState, showHidePopup, setShowHidePopup, userData}) => {

    const showToaster = useToaster();


    const [textAreaValue, setTextAreaValue] = useState("");

    const [errorValue, SetErrorValue] = useState("");

    useEffect(()=>{
        if(userData){
            setTextAreaValue(userData?.bio)
        }
    },[userData, showHidePopup])

    const [loadingState, setLoadingState] = useState(false)

    const saveBio = (newBio)=>{
        setLoadingState(true)
        // console.log(newBio)
        try{
            const userId = localStorage.getItem("id")
            updateBioProfile({userId, newBio}).then(response=>{
                showToaster("Bio Updated Successfully", "success")
                console.log("Profile Bio Updated Successfully")
                setSaveState(true)
                setShowHidePopup(false)
            }).catch(err=>{
                showToaster("Bio Updation Failed", "error")
            })
        }catch{
            console.log("User Id not Found.")
        }   
        setLoadingState(false)
    }


    const onChangeBio = (bio)=>{
        setTextAreaValue(bio);
        if(bio.length > 400){
            SetErrorValue("Bio can't be longer than 400 Characters")
        }else{
            if(errorValue){
                SetErrorValue("")
            }
        }
    }

    return (
        showHidePopup && 
        <div className={styles.outerDiv} style={{ zIndex: showHidePopup ? '60' : '' }}>
            <div style={{display:loadingState ? 'block' : 'none'}}>
                <LoadingSpinner />
            </div>
            <div className={styles.EditBioContainer} style={{display:loadingState ? 'none' : 'flex'}}>
                <div>
                    <label className={styles.BioLabel}>
                        Bio
                    </label>
                </div>
                <div>
                    <textarea 
                        className={styles.textAreaDes} 
                        value={textAreaValue} 
                        onChange={(e) =>{onChangeBio(e.target.value)}}
                        placeholder="Type Your Bio here..."
                    />
                    <div className={styles.ErrorDes} style={{display: errorValue.length > 0 ? "block" : 'none'}}>
                        <label>
                            {errorValue}
                        </label>
                    </div>
                </div>
                <div className={styles.buttonDiv}>
                    <button className={cx(styles.cancelDes, styles.pointer)} onClick={() => { setShowHidePopup(false) }}>
                        Cancel
                    </button>
                    <button
                    style={{
                        backgroundColor:errorValue.length !==0 ? '#FFEDDE': '',
                        border:errorValue.length !==0 ? '1px solid #FFEDDE': '',
                        color:errorValue.length !==0 ? '#FF702D': '',
                        cursor:errorValue.length !==0 ? 'default': '',
                    }}
                    className={cx(styles.saveDes, styles.pointer)} onClick={ ()=>{errorValue.length === 0 && saveBio(textAreaValue)}}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditBioPopUp;
