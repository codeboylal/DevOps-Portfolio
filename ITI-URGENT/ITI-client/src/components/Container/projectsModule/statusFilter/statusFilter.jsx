import React, { useState } from "react";

import cx from "classnames";
import styles from "./statusFilter.module.css";

function StatusFilter() {
    const initialStatusFilter = [
        {
            label: "All",
            value: true,
        },
        {
            label: "Not Started",
            value: false,
        },
        {
            label: "In Progress",
            value: false,
        },
        {
            label: "On Hold",
            value: false,
        },
        {
            label: "Completed",
            value: false,
        },
    ];

    const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
    const [subTaskStatus, setSubTaskStatus] = useState(initialStatusFilter[0].label);

    const handleCheckBox = (indexToUpdate) => {
        setStatusFilter((prevStatusFilter) =>
            prevStatusFilter.map((item, index) =>
                index === indexToUpdate
                    ? { ...item, value: true }
                    : { ...item, value: false }
            )
        );
        setSubTaskStatus(initialStatusFilter[indexToUpdate].label);
    };

    return (
        <div className={styles.poupDiv}>
            {statusFilter.map((item, index) => (
                <div className={styles.statusCheckBox} key={index}>
                    <div
                        className={styles.progressDiv}
                        style={{
                            backgroundColor:
                                item.label === "In Progress"
                                    ? "#F5D451"
                                    : item.label === "Completed"
                                    ? "#51CE60"
                                    : item.label === "Not Started"
                                    ? "#C8C8C8"
                                    : item.label === "On Hold"
                                    ? "#000000"
                                    : "White",
                            color:
                                item.label === "In Progress"
                                    ? "#000000"
                                    : item.label === "Completed"
                                    ? "#FFFFFF"
                                    : item.label === "Not Started"
                                    ? "#FFFFFF"
                                    : item.label === "On Hold"
                                    ? "#FFFFFF"
                                    : "#000000",
                            border:
                                item.label === "In Progress"
                                    ? "1px solid #F5D451"
                                    : item.label === "Completed"
                                    ? "1px solid #51CE60"
                                    : item.label === "Not Started"
                                    ? "1px solid #C8C8C8"
                                    : item.label === "On Hold"
                                    ? "1px solid #000000"
                                    : "1px solid #000000",
                        }}
                    >
                        {item.label}
                    </div>
                    <div
                        className={cx(styles.chechkBoxDes,styles.pointer)}
                        onClick={() => handleCheckBox(index)}
                    >
                        <svg
                            style={{
                                display: !item.value && "none",
                            }}
                            width="14"
                            height="10"
                            viewBox="0 0 14 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.3818 0.206202C13.7281 0.509269 13.7632 1.03574 13.4602 1.3821L6.16853 9.71542C5.86653 10.0605 5.34254 10.0968 4.99589 9.79667L0.620893 6.00884C0.272943 5.70759 0.235093 5.18125 0.536343 4.83334C0.837593 4.48542 1.36388 4.4475 1.71182 4.74875L5.46012 7.99409L12.2059 0.284594C12.509 -0.0617731 13.0355 -0.0968731 13.3818 0.206202Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatusFilter;
