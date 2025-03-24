import React from "react";

import styles from "./subTaskPopUp.module.css";

import assigned from "./assigned.png"
import ScrollBar from "../../../scrollBar/scrollBar";

function SubTaskPopUp({
    subTaskStatus="In Progress"
}){
    const subtasks = [
        {
          name: "Subtask 1",
          status: "Inprogress",
          assignedTo: "John Doe",
          estimatedCompletion: "January 8th, 2024",
        },
        {
          name: "Subtask 2",
          status: "Completed",
          assignedTo: "Jane Smith",
          estimatedCompletion: "January 5th, 2024",
        },
        {
          name: "Subtask 3",
          status: "Not Started",
          assignedTo: "Emily Davis",
          estimatedCompletion: "January 15th, 2024",
        },
        {
          name: "Subtask 4",
          status: "Delayed",
          assignedTo: "Michael Brown",
          estimatedCompletion: "January 20th, 2024",
        },
      ];
    return(
        <div
            className={
                styles.poupDiv
            }
        >
            <div
                className={
                    styles.headingCross
                }
            >
                <div>
                    Task name
                </div>
                <div
                    className={
                        styles.pointer
                    }
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3255 9.99967L15.0364 6.28874C15.2125 6.11293 15.3116 5.87435 15.3118 5.6255C15.312 5.37665 15.2134 5.1379 15.0376 4.96178C14.8618 4.78566 14.6232 4.6866 14.3743 4.68638C14.1255 4.68616 13.8867 4.7848 13.7106 4.96061L9.99967 8.67155L6.28874 4.96061C6.11262 4.78449 5.87374 4.68555 5.62467 4.68555C5.3756 4.68555 5.13673 4.78449 4.96061 4.96061C4.78449 5.13673 4.68555 5.3756 4.68555 5.62467C4.68555 5.87374 4.78449 6.11262 4.96061 6.28874L8.67155 9.99967L4.96061 13.7106C4.78449 13.8867 4.68555 14.1256 4.68555 14.3747C4.68555 14.6237 4.78449 14.8626 4.96061 15.0387C5.13673 15.2149 5.3756 15.3138 5.62467 15.3138C5.87374 15.3138 6.11262 15.2149 6.28874 15.0387L9.99967 11.3278L13.7106 15.0387C13.8867 15.2149 14.1256 15.3138 14.3747 15.3138C14.6237 15.3138 14.8626 15.2149 15.0387 15.0387C15.2149 14.8626 15.3138 14.6237 15.3138 14.3747C15.3138 14.1256 15.2149 13.8867 15.0387 13.7106L11.3255 9.99967Z" fill="#020617"/>
                    </svg>
                </div>
            </div>
            <ScrollBar>
                {subtasks.map((item,index)=>{
                    return(
                        <div
                            className={
                                styles.subTaskDiv
                            }
                            key={index}
                        >
                            <div
                                className={
                                    styles.taskNumProgress
                                }
                            > 
                                <div>
                                    Subtask 1
                                </div>
                                <div
                                    className={
                                        styles.progressDiv
                                    }
                                    style={{
                                        backgroundColor: subTaskStatus === "In Progress" ? "#F5D451" : 
                                                        subTaskStatus === "Completed" ? "#51CE60" :
                                                        subTaskStatus === "Not Started" ? "#C8C8C8" :
                                                        subTaskStatus === "On Hold" ? "#000000" :
                                                        "White",
                                        color: subTaskStatus === "In Progress" ? "#000000" : 
                                                subTaskStatus === "Completed" ? "#FFFFFF" :
                                                subTaskStatus === "Not Started" ? "#FFFFFF" :
                                                subTaskStatus === "On Hold" ? "#FFFFFF" :
                                                "#000000",
                                        border: subTaskStatus === "In Progress" ? "1px solid #F5D451" : 
                                                subTaskStatus === "Completed" ? "1px solid #51CE60" :
                                                subTaskStatus === "Not Started" ? "1px solid #C8C8C8" :
                                                subTaskStatus === "On Hold" ? "1px solid #000000" :
                                                "1px solid #000000",
                                    }}
                                >
                                    {subTaskStatus}
                                </div>
                            </div>
                            <div
                                className={
                                    styles.assignedEstimated
                                }
                            >
                                <div
                                    className={
                                        styles.detailsDiv
                                    }
                                >
                                    <span>
                                        Assigned to:
                                    </span>
                                    <div
                                        className={
                                            styles.imgName
                                        }
                                    >
                                        <img
                                            src={assigned}
                                            alt="ITI Buildings Project"
                                        />
                                        <span
                                            className={
                                                styles.spanStyle
                                            }
                                        >
                                            John Doe
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={
                                        styles.detailsDiv
                                    }
                                >
                                    <span>
                                        Estimated Completion:
                                    </span>
                                    <span
                                        className={
                                            styles.spanStyle
                                        }
                                    >
                                        January 8th,2024
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </ScrollBar>
        </div>
    )
}
export default SubTaskPopUp;