import React, { useEffect, useState } from "react";
import styles from "./Filter.module.css";

const Filter = ({ labelHeading, filterParams, selectedFilters, onFilterChange, num = [] , active}) => {

    const [checkedItems, setCheckedItems] = useState(
        new Array(filterParams.length).fill(false)
    );

    useEffect(() => {
        const updatedCheckedItems = filterParams.map(param => selectedFilters.includes(param));
        setCheckedItems(updatedCheckedItems);
    }, [selectedFilters, filterParams]);

    const handleCheckboxChange = (index) => {
        onFilterChange(filterParams[index]); 
    };

    return (
        <div className={styles.divDes}>
            <label className={styles.label}>
                {labelHeading}
            </label>
            {filterParams.map((param, index) => (
                <div key={index} className={styles.filterNumberDiv}>
                    <div className={styles.CheckBoxLabel}>
                        <input
                            type="checkbox"
                            checked={checkedItems[index]} 
                            onChange={() => handleCheckboxChange(index)}
                            className={styles.inputDes}
                        />
                        <label>{param}</label>
                    </div>
                    <div style={{display:num?.length === 0 ? 'none' : active !== "Find Jobs" && 'none'}}>
                        <label className={styles.labelNumberDes}>
                            {num?.[index] || 0}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Filter;
