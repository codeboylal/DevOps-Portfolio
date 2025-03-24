import React from "react";

import styles from "./filterTop.module.css";

function FilterTop({
    setUserAccessFilterActive, 
    userAccessFilterActive, 
    setSelected,
    setUserAccessFilter,
    setRoleOption,
    setAccessOption,
    setPaymentOption,
    }){

    const resetFilters = () =>{
        setUserAccessFilterActive(false)
        setSelected('Type')
        setUserAccessFilter({
            accountType: '',
            discount: ''
        })
        setRoleOption([
            {
                label: 'Admin',
                value: false
            }, {
                label: 'Staff',
                value: false
            }, {
                label: 'Contractors',
                value: false
            }
        ])
        setAccessOption([
            {
                label: 'Display Center',
                value: false
            }, {
                label: 'Sales',
                value: false
            }, {
                label: 'Chat',
                value: false
            }, {
                label: 'Pre-Construction',
                value: false
            }, {
                label: 'Construction',
                value: false
            },
        ])
        setPaymentOption([
            {
                label: 'Company',
                value: false
            }, {
                label: 'Individual',
                value: false
            }
        ])
    }

    return(
        <div className={styles.mainDiv}>
            <span className={styles.filterDes}>
                Filters
            </span>
            <div className={styles.buttonDes} onClick={resetFilters} style={{
                backgroundColor: userAccessFilterActive && 'black',
                color: userAccessFilterActive && 'white'
            }}>
                Reset
            </div>
        </div>
    )
}

export default FilterTop;