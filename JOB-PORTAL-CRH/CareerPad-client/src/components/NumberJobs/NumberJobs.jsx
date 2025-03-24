import React from "react";
import styles from './NumberJobs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

const NumberJobs = ({ jobNumber, onSortClick  , sortOrder}) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div className={styles.jobNumberdes}>
                <span>Showing</span>
                <span style={{ color: '#FE4141', fontSize: '25px', margin: '0 5px' }}>{jobNumber}</span>
                <span>Jobs</span>
            </div>
            <div className={styles.recentJobButton} onClick={onSortClick}>
                {sortOrder}
                <FontAwesomeIcon icon={faSliders} size="2x" style={{ fontSize: '15px', marginLeft: '5px' }} />
            </div>
        </div>
    );
};

export default NumberJobs;