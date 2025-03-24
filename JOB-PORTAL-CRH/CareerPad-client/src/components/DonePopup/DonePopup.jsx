import React from "react";
import styles from './DonePopup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck , faTimes  } from '@fortawesome/free-solid-svg-icons'; 
import cx from "classnames";
import done from "./done.png";

const DonePopup = ({handleCurrentModal, label1, label2, label3, label4 , para}) => {
    return(
        <div className={styles.midCont} >
            <div className={styles.container} >
               <div className={styles.content}>
                    <div style={{position:'absolute', top:'15px', right:'25px'}}>
                        <FontAwesomeIcon icon={faTimes} onClick={handleCurrentModal} style={{ fontSize: '24px',color:'grey', cursor: 'pointer' }} />
                    </div>
                    <img src={done} alt="done png" />
                    {/* <FontAwesomeIcon icon={faCheck} style={{color:'#FFFFFF', height:'71.8px', width:'71.8px' , background:'#6CCD5C',borderRadius: '50%', fontWeight:'700' , fontSize: '30px', padding:'10px 20px 10px 20px'}} /> */}
                    <div >
                        <div>
                            <label className={styles.label}>
                                {label1}
                            </label>
                            <label
                            className={cx(styles.label, styles.link)} style={{cursor:"pointer",textDecoration:'underline' , fontWeight:'400' , display:'flex', justifyContent:'center'}}>
                                {label2}
                            </label>
                        </div>
                        <label className={cx(styles.label, styles.alignCenter)} >
                            {label3}
                        </label>
                    </div>
                    <label className={cx(styles.link, styles.alignCenter )} style={{ fontWeight:'500',lineHeight:'27.56px'}}>
                        {label4}
                    </label>
               </div>
            </div>
        </div>
    )
}

export default DonePopup;
