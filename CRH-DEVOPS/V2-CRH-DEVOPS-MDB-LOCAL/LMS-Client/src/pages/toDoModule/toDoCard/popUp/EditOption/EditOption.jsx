import React from "react";

import { Edit, Delete } from "@mui/icons-material";  

import styles from "./EditOption.module.css";
import cx from "classnames";

function EditOption({id, setContainer, setDeleteConfirm, setAddEdit}) {
  return (
    <div className={cx(styles.container,styles.pointer)}>
      <div className={styles.iconLabelDiv} onClick={()=>{setContainer(false); setAddEdit(true)}} style={{borderTopLeftRadius:'10px',borderTopRightRadius:'10px',paddingBottom:'9px'}}>
        <div style={{width:'18px', height:'18px', display:'flex',alignItems:'center'}}>
            <Edit className={styles.icon} />
        </div>
        <div>
            <label className={styles.pointer}>
                Edit
            </label>
        </div>
      </div>
      <div className={styles.iconLabelDiv} onClick={()=>{setContainer(false); setDeleteConfirm(true);}} style={{paddingBottom:'10px',paddingTop:'9px',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>
        <div style={{width:'18px', height:'18px', display:'flex',alignItems:'center'}}>
            <Delete 
              className={styles.icon} 
            />
        </div>
        <div>
            <label className={styles.pointer}>
                Delete
            </label>
        </div>
      </div>
    </div>
  );
}

export default EditOption;
