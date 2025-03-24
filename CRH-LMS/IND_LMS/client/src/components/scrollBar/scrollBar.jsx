// ScrollBar.jsx
import React from 'react';
import styles from './scrollBar.module.css';
import cx from "classnames";

const ScrollBar = ({ children , height, sidebarProp = false}) => {
    return (
        <div className={cx(styles.scrollContainer, sidebarProp && styles.appbarHeight)} style={{maxHeight: height}}>
            {children}
        </div>
    );
};

export default ScrollBar;
