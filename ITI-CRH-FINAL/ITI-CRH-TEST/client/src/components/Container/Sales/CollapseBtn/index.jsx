import React, { useEffect } from 'react'
import styles from './index.module.css'
import arrow from './img/arrow.svg'

const CollapseBtn = ({ className = '', collapsed, onClick }) => {
    return (
        <button className={styles.collapseBtn + " " + className} onClick={onClick}>
            <img src={arrow} alt={collapsed ? "Expand" : "Collapse"} className={`${styles.arrowIcon} ${collapsed && styles.expandedIcon}`} />
        </button>
    )
}

export default CollapseBtn