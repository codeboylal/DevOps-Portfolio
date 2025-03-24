import React, { useEffect, useState } from "react";

import styles from "./filter.module.css";
import cx from "classnames";

import chevronDown from "../../../../pages/UACP/popUps/edit/assets/chevronDown.svg";
import radioDot from "../../../../pages/UACP/popUps/edit/assets/radioDot.svg";
import check from "../../../../pages/UACP/popUps/edit/assets/check.svg";


import Scrollbar from "../../../scrollBar/scrollBar.jsx";
import FilterTop from "./filterTop/filterTop";
import TypeDropdown from "../../../../pages/UACP/dropDown/typeDropDown.jsx";
import CommonInputField from "../../../textField/input.jsx";


function UserFilters({
    userAccessFilter, 
    setUserAccessFilter, 
    userAccessFilterActive,
    setUserAccessFilterActive, 
    setFilterObject, 
    filterObject,
    active = ''
    }) {


        const [typeShow, setTypeShow] = useState(false);
        const [selectedId, setSelectedId] = useState("1")
        const [selected, setSelected] = useState("Type");

        const handleChange = (field, value) => {
            setUserAccessFilter((prevData) => ({ ...prevData, [field]: value }));
        };
    
        const handleInputChange = (field, value) => {
            for (let i of value){
                if(i.value){
                    setUserAccessFilter((prevData) => ({ ...prevData, [field]: i.label }));
                }
            }
        };
    
        useEffect(() => {
            if (selected && selected !== "Type") {
                handleChange("accountType", selected);
            }
        }, [selected]);
    
        const [roleOption, setRoleOption] = useState([
            { label: "Admin", value: false },
            { label: "Staff", value: false },
            { label: "Contractors", value: false }
        ]);
    
        const handleRoleClick = (index) => {
            setRoleOption((prevOption) =>
                prevOption.map((option, i) => ({ ...option, value: i === index }))
            );
        };
    
        useEffect(() => {
            if(roleOption){
                handleInputChange("role", roleOption);
            }
        }, [roleOption]);
    
        const [accessOption, setAccessOption] = useState([
            { label: "Display Center", value: false },
            { label: "Sales", value: false },
            { label: "Chat", value: false },
            { label: "Pre-Construction", value: false },
            { label: "Construction", value: false }
        ]);

        const [accessChanged, setAccessChanged] = useState(false)
    
        const handleCheckClick = (index) => {
            setAccessOption((prevOption) =>
                prevOption.map((option, i) =>
                    i === index ? { ...option, value: !option.value } : option
                )
            );
            setAccessChanged(true)
        };
    
        useEffect(() => {
            if(accessOption && accessChanged){
                handleChange("access", accessOption);
                setAccessChanged(false)
            }
        }, [accessOption, accessChanged]);
    
        const [paymentOption, setPaymentOption] = useState([
            { label: "Company", value: false },
            { label: "Individual", value: false }
        ]);
    
        const handlePaymentClick = (index) => {
            setPaymentOption((prevOption) =>
                prevOption.map((option, i) => ({ ...option, value: i === index }))
            );
        };
    
        useEffect(() => {
            if(paymentOption){
                handleInputChange("payment", paymentOption);
            }
        }, [paymentOption]);


    useEffect(()=>{
        if(!userAccessFilterActive && active === "user"){
            setUserAccessFilter({
                accountType: "",
                discount: "",
            })
            setRoleOption([
                { label: "Admin", value: false },
                { label: "Staff", value: false },
                { label: "Contractors", value: false }
            ])
            setPaymentOption([
                { label: "Company", value: false },
                { label: "Individual", value: false }
            ])
            setAccessOption([
                { label: "Display Center", value: false },
                { label: "Sales", value: false },
                { label: "Chat", value: false },
                { label: "Pre-Construction", value: false },
                { label: "Construction", value: false }
            ])
        }
    },[userAccessFilterActive , active])

    return (
        <div className={styles.filtersMainDiv} onClick={() => { (setTypeShow(false)) }}>
            <FilterTop 
                setUserAccessFilterActive={setUserAccessFilterActive} 
                userAccessFilterActive={userAccessFilterActive}
                setSelected={setSelected}
                setUserAccessFilter={setUserAccessFilter}
                setRoleOption={setRoleOption}
                setAccessOption={setAccessOption}
                setPaymentOption={setPaymentOption}
            />
            <Scrollbar>
                <div className={styles.bottomDiv} >
                    <div>
                        <div style={{ position: typeShow && 'relative', width: '100%'}}>
                            <div style={{ display: typeShow && '', borderColor: typeShow && 'transparent' }} className={styles.select} onClick={(e) => { e.stopPropagation(); setTypeShow(true) }}>
                                <span>
                                    {selected}
                                </span>
                                <img
                                    src={chevronDown}
                                    alt="ITI Building Design"
                                />
                            </div>
                            <TypeDropdown 
                                setSelectedId={setSelectedId}
                                usersPage={true} 
                                maxHeightDisable={true} 
                                typeShow={typeShow} 
                                setTypeShow={setTypeShow} 
                                setSelected={setSelected} 
                                setUserAccessFilterActive={setUserAccessFilterActive}
                                setAccessOption={setAccessOption}
                                setRoleOption={setRoleOption}
                                setPaymentOption={setPaymentOption}
                                setUserAccessFilter={setUserAccessFilter}
                            />
                        </div>
                    </div>
                    <div style={{ display: typeShow && 'none' }}>
                        <CommonInputField
                            label={"Discount"}
                            height={"70px"}
                            value={userAccessFilter?.discount}
                            onChange={(e) => { handleChange("discount", e.target.value); setUserAccessFilterActive(true); }}
                        />
                    </div>
                    <div className={styles.col16} style={{ paddingTop:typeShow && '94px' }}>
                        <span className={styles.subHeading}>
                            Role
                        </span>
                        <div className={styles.optionsDiv}>
                            {
                                roleOption?.map((item, index) => {
                                    return (
                                        <div key={index} className={styles.valueLabelDiv}>
                                            <div className={cx(styles.checkBox, styles.pointer, styles.center, styles.radius50)}
                                                onClick={() => {
                                                    handleRoleClick(index);
                                                    setFilterObject(true);
                                                    setUserAccessFilterActive(true);
                                                }}
                                            >
                                                {
                                                    item?.value && <img
                                                        src={radioDot}
                                                        alt="ITI Building Design"
                                                    />
                                                }
                                            </div>
                                            <span>
                                                {item?.label}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.col16}>
                        <span className={styles.subHeading}>
                            Access
                        </span>
                        <div className={styles.optionsDiv} style={{
                            flexDirection:'column',
                            alignItems:'flex-start'
                        }}>
                            {
                                accessOption?.map((item, index) => {
                                    return (
                                        <div key={index} className={styles.valueLabelDiv}>
                                            <div className={cx(styles.checkBox, styles.pointer)} style={{
                                                borderColor: item?.value && 'transparent'
                                            }}
                                                onClick={() => {
                                                    handleCheckClick(index);
                                                    setFilterObject(true);
                                                    setUserAccessFilterActive(true);
                                                    
                                                }}
                                            >
                                                {
                                                    item?.value && <img
                                                        src={check}
                                                        alt="ITI Building Design"
                                                    />
                                                }
                                            </div>
                                            <span>
                                                {item?.label}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.col16}>
                        <span className={styles.subHeading}>
                            Payment
                        </span>
                        <div className={styles.optionsDiv}>
                            {
                                paymentOption?.map((item, index) => {
                                    return (
                                        <div key={index} className={styles.valueLabelDiv}>
                                            <div className={cx(styles.checkBox, styles.pointer, styles.center, styles.radius50)}
                                                onClick={() => {
                                                    handlePaymentClick(index);
                                                    setFilterObject(true);
                                                    setUserAccessFilterActive(true);
                                                }}
                                            >
                                                {
                                                    item?.value && <img
                                                        src={radioDot}
                                                        alt="ITI Building Design"
                                                    />
                                                }
                                            </div>
                                            <span>
                                                {item?.label}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Scrollbar>
        </div>
    )
}

export default UserFilters;