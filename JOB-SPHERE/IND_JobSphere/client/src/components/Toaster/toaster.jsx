import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './toaster.module.css';

const Toaster = ({ message, type }) => {
  useEffect(() => {
    if (message) {
      if (type === 'success') {
        toast.success(message, {
          className: styles.successToast,
          progressClassName: styles.progressLine,
        });
      } else if (type === 'error') {
        toast.error(message, {
          className: styles.errorToast,
          progressClassName: styles.progressLine,
        });
      } else {
        toast.info(message, {
          className: styles.infoToast,
          progressClassName: styles.progressLine,
        });
      }
    }
  }, [message, type]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      className={styles.toastContainer}
    />
  );
};

export default Toaster;
