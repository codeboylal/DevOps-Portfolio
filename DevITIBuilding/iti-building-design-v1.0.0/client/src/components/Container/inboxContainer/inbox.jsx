import React, { useState } from "react";
import { useToaster } from "../../../Toaster";

import styles from "./inbox.module.css";

import {
  completeInboxTask,
  likeInboxTask,
} from "../../../services/projects/inbox";
import PopUp from "../../../pages/inbox/popup/popup";

const formatDate = (timestamp) => {
  const d = new Date(timestamp);
  if (isNaN(d)) return "Invalid date";

  const day = d.getDate(); // Use local date
  const month = d.toLocaleString("default", { month: "long" });
  const year = d.getFullYear();

  const suffixes = ["th", "st", "nd", "rd"];
  const suffix = (day % 10 > 3 || [11, 12, 13].includes(day % 100)) ? "th" : suffixes[day % 10];

  return `${month} ${day}${suffix}, ${year}`;
};

const ago_date = (timestamp) => {
  const past = new Date(timestamp);
  if (isNaN(past)) return "Invalid date";

  const now = new Date();
  
  // Calculate the difference in full days, ignoring time differences
  const pastDate = new Date(past.getFullYear(), past.getMonth(), past.getDate());
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = nowDate - pastDate;
  const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed < 0) return `In ${Math.abs(daysPassed)} days`;

  return `${daysPassed} days ago`;
};

function InboxDiv({ inboxData, userId, setLoading }) {
  const setToast = useToaster();
  const [likeState, setLikeState] = useState(false);

  const [completeStatus, setCompleteStatus] = useState(inboxData?.completedStatus ? inboxData.completedStatus : false);

  const [popUp, setPopUp] = useState(false)

  const handleLikeChange = () => {
    setLikeState(!likeState);
    likeInboxTask({ taskId: inboxData?._id, userId })
      .then((response) => {
        // console.log(response?.data);
        if(response?.data?.status === 200){
          setToast(`Task ${!likeState ? 'Bookmarked' : 'Removed from Bookmark'}`, "success");
          setLoading(true)
        }else{
          setToast(`${response?.data?.message}`,"error")
          setLikeState(likeState);
        }
      })
      .catch((err) => {
        console.log(err);
        setToast("Please Try Again","error")
        setLikeState(likeState);
      });
  };

  // console.log(inboxData)

  const handleCompleteStatus = () => {
    setCompleteStatus(!completeStatus);
    completeInboxTask({ taskId: inboxData?._id, userId })
      .then((response) => {
        // console.log(response?.data);
        if(response?.data?.status === 200){
          setToast(`Task Completed`, "success");
          setLoading(true)
        }else{
          setToast(`${response?.data?.message}`,"error")
          setCompleteStatus(completeStatus);
        }
      })
      .catch((err) => {
        console.log(err);
        setToast("Please Try Again","error")
        setCompleteStatus(completeStatus);
      }).finally(
        setPopUp(false)
      );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.checkTaskName}>
        <div className={styles.completeDiv} onClick={()=>setPopUp(true)}>
          <div
            style={{
              display: completeStatus ? "block" : "none",
            }}
            className={styles.complete}
          ></div>
        </div>
        <div className={styles.taskName}>
          <div className={styles.heading}>{inboxData?.task}</div>
          <div className={styles.task}>
            <div className={styles.taskDetail}>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 10V8.25C13 7.65326 12.7629 7.08097 12.341 6.65901C11.919 6.23705 11.3467 6 10.75 6H9.75C9.55109 6 9.36032 5.92098 9.21967 5.78033C9.07902 5.63968 9 5.44891 9 5.25V4.25C9 3.65326 8.76295 3.08097 8.34099 2.65901C7.91903 2.23705 7.34674 2 6.75 2H5.5M5.5 10.5H10.5M5.5 12.5H8M7 2H3.75C3.336 2 3 2.336 3 2.75V14.25C3 14.664 3.336 15 3.75 15H12.25C12.664 15 13 14.664 13 14.25V8C13 6.4087 12.3679 4.88258 11.2426 3.75736C10.1174 2.63214 8.5913 2 7 2Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label>Project Number {inboxData?.projectNumber}</label>
            </div>
            <div className={styles.taskDetail}>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 7.5C10 8.03043 9.78929 8.53914 9.41421 8.91421C9.03914 9.28929 8.53043 9.5 8 9.5C7.46957 9.5 6.96086 9.28929 6.58579 8.91421C6.21071 8.53914 6 8.03043 6 7.5C6 6.96957 6.21071 6.46086 6.58579 6.08579C6.96086 5.71071 7.46957 5.5 8 5.5C8.53043 5.5 9.03914 5.71071 9.41421 6.08579C9.78929 6.46086 10 6.96957 10 7.5Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 7.5C13 12.2613 8 15 8 15C8 15 3 12.2613 3 7.5C3 6.17392 3.52678 4.90215 4.46447 3.96447C5.40215 3.02678 6.67392 2.5 8 2.5C9.32608 2.5 10.5979 3.02678 11.5355 3.96447C12.4732 4.90215 13 6.17392 13 7.5Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label>
                {inboxData?.address?.match(/^(?:[^_]*_){2}(.*)$/)?.[1] || "N/A"}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightDiv}>
        <div className={styles.dateDiv}>
          <span>
            {inboxData?.subtask?.due_date
              ? formatDate(parseInt(inboxData?.subtask?.due_date, 10))
              : "No Due Date"}
          </span>
          <span 
          style={{
            display: !inboxData?.subtask?.start_date && 'none'
          }}> ({ago_date(parseInt(inboxData?.subtask?.start_date, 10))})</span>
        </div>
        <div className={styles.likeDiv} onClick={handleLikeChange}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill={inboxData?.likeStatus ? "black" : "transparent"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.75 6.1875C15.75 4.32375 14.1758 2.8125 12.234 2.8125C10.7828 2.8125 9.53625 3.657 9 4.86225C8.46375 3.657 7.21725 2.8125 5.76525 2.8125C3.825 2.8125 2.25 4.32375 2.25 6.1875C2.25 11.6025 9 15.1875 9 15.1875C9 15.1875 15.75 11.6025 15.75 6.1875Z"
              stroke="#1E293B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {
        popUp && 
        <PopUp setPopUp={setPopUp} handleCompleteStatus={handleCompleteStatus}/>
      }
    </div>
  );
}

export default InboxDiv;
