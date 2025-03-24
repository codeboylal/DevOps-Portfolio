import React from 'react';
import styles from './signInUpAppBar.module.css';
import logo from '../../../Images/logo Image/logo.svg'; // Adjust the path and filename as needed

const SignInUpAppBar = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.iconAndText}>
        <img
          src={logo}
          alt="Building Logo"
          className={styles.icon}
        />
      </div>
    </div>
  );
};

export default SignInUpAppBar;
