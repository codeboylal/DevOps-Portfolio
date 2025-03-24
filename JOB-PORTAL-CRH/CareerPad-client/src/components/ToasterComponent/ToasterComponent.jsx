import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from  './ToasterComponent.module.css'; 

const Toaster = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.toaster} ${styles[type]}`}>
      <span className={styles.toasterMessage}>{message}</span>
      <span className={styles.toasterClose} onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </div>
  );
};

export default Toaster;
