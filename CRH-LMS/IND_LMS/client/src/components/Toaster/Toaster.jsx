import React, { useEffect, useState } from 'react';
import styles from './Toaster.module.css';

import tick from "./assets/tick.svg";
import close from "./assets/cross.svg";


const Toaster = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  return (
    <div className={`${styles.toastContainer} ${type === 'success' ? styles.successToast : type === 'error' ? styles.errorToast : styles.infoToast}`} style={{ position: 'fixed', top: '20px', right: '10px', zIndex: 1000 }}>
      <img alt='' src={type === "success" ? tick : close}/> 
      <span>
        {message}
      </span>
    </div>
  );
};

export default Toaster;
