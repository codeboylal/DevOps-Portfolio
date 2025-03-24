// ScrollBar.jsx
import React from 'react';
import styles from './scrollBar.module.css';

const ScrollBar = ({ children }) => {
    return (
        <div className={styles.scrollContainer}>
            {children}
        </div>
    );
};

export default ScrollBar;
