import React, { useEffect, useState } from 'react';
import styles from './successModal.module.css';
import { ReactComponent as CompleteIcon } from './complete.svg';

const SuccessModal = ({successModal, onClose }) => {

  const[state, setState] = useState(false)

  useEffect(()=>{
    setState(successModal)
  },[successModal])

  useEffect(()=>{
    if(state){
      document.body.style.overflowY = "hidden"
    }else{
      document.body.style.overflowY = "scroll"
    }
  },[state])

  return (
    state &&
      <div className={styles.outerDiv} style={{zIndex:'999999'}}>
        <div className={styles.modal}>
          <CompleteIcon className={styles.icon} />
          <p className={styles.message}>
            Your request has been sent to admin, we’ll reach 
          <p>                 you shortly.</p>
          </p>
          <p className={styles.successText}>Success!</p>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
  );
};

export default SuccessModal;
