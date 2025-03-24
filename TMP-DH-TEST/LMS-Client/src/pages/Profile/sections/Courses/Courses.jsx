import React, { useState } from "react";
import styles from "./Courses.module.css";
import TabComponent from "../../../../Common Components/Tab Component/tabComponent";

import card1 from "../../../dashboard/images/card1.png";
import card2 from "../../../dashboard/images/card2.png";
import card3 from "../../../dashboard/images/card3.png";
import NoDataFound from '../../../../Common Components/No Data Found/noDataFound'; // Import the NoDataFound component


import {useNavigate} from "react-router-dom";

import { OpenInNew } from '@mui/icons-material';

function Courses({ userData }) {
    const [activeTab, setActiveTab] = useState(0);

    const navigate = useNavigate();
    // Function to filter courses based on the active tab
    const filterCourses = () => {
        switch (activeTab) {
            case 1:
                // Tab 2: Show courses in progress (progress between 0 and 100)
                return userData?.continueWatching?.filter(item => item.progress > 0 && item.progress < 100);
            case 2:
                // Tab 3: Show only completed courses (progress === 100)
                return userData?.continueWatching?.filter(item => item.progress === 100);
            default:
                // Tab 1: Show all courses
                return userData?.continueWatching;
        }
    };



    const courseRedirection = (id) => {
        localStorage.setItem("courseId","670cef514224edbae0c29d3b");
        navigate("/courseDetails")
    }

    return (
        <div className={styles.courseDiv}>
            <div style={{ paddingTop: '10px' }}>
                <TabComponent width={"80%"} setActiveTab={setActiveTab} activeTab={activeTab} />
            </div>
            <div className={styles.coursesDiv}>
                {filterCourses()?.length > 0 ? (
                    filterCourses().map((item, index) => {
                        const isLastItem = index === filterCourses().length - 1;
                        return (
                            <div
                                className={styles.courseItemDiv}
                                style={{
                                    borderBottom: isLastItem ? 'none' : '1px solid #EBEBEB',
                                    borderBottomLeftRadius: isLastItem ? '8px' : '0',
                                    borderBottomRightRadius: isLastItem ? '8px' : '0',
                                    width: '100%',
                                }}
                                key={index}
                                onClick={()=>{courseRedirection(item?.courseID)}}
                            >
                                <div className={styles.imgDiv}>
                                    <img
                                        style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                                        src={item?.image === "card1" ? card1 : item?.image === "card2" ? card2 : card3}
                                        alt={item?.title || "Course thumbnail"}
                                    />
                                </div>
                                <div style={{ width: '100%' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <label style={{ cursor: 'pointer' }}>{item?.title}</label>
                                        <OpenInNew
                                            className={styles.iconDisplay}
                                            style={{ height: '16px', color: '#FF702D' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ color: '#767676', fontSize: '12px', cursor: 'pointer' }}>
                                            {item?.company}
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                color:
                                                    item.progress === 0
                                                        ? '#FFA100' // Not Started
                                                        : item.progress === 100
                                                            ? '#1D963F' // Completed
                                                            : '#0091B5', // Active
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {item?.progress === 0
                                                ? 'Not Started'
                                                : item?.progress === 100
                                                    ? 'Completed'
                                                    : 'Active'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{padding:'0px 24px 10px 24px'}}>
                        <label style={{ display: userData?.continueWatching?.length > 0 ?  'none' :'block', color:'black',fontSize:'16px'}}>
                    <NoDataFound message="" />
                          
                            {/* No Courses found!! Please Enroll a course first. */}
                        </label>
                        <label style={{ display: userData?.continueWatching?.length > 0 ? filterCourses()?.length > 0 ? 'none' : 'block' :'none', color:'black',fontSize:'16px'}}>
                            {/* No Courses found!! Please Complete a course. */}
                    <NoDataFound message="" />

                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Courses;
