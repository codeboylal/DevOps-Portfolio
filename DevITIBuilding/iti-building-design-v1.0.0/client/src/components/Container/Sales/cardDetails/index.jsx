import React, { useState } from 'react'
import styles from './index.module.css'
import locationIcon from './icons/location.svg'
import copyBtn from './icons/copy.svg'
import client from './icons/client.svg'
import phone from './icons/phone.svg'
import calendar from './icons/calendar.svg'
import arrow from './icons/arrow.svg'
import { useToaster } from '../../../../Toaster'
import { Link } from 'react-router-dom'


const statusClassMap = {
  "in progress": styles.inProgressStatus,
  "on hold": styles.onHoldStatus,
  "complete": styles.completed,
  "not started": styles.notStarted,
};

const CardDetails = ({ title, address, userName, userContact, date, amount }) => {
  const [isLiked, setIsLiked] = useState(false);
  const showToaster = useToaster();
  const id = 1;

  const singleCardData = {
    status: 'in progress',
  }

  const handleFavoriteClick = () => {
    console.log("toggle like");
    setIsLiked(!isLiked);
  }

  const handleCopy = async (e) => {
    try {
      navigator.clipboard.writeText(address);
      showToaster("Address copied to clipboard", "success");
    } catch (error) {
      showToaster("An error occurred. Please try again.", "error");
    }
  }

  return (
    <div className={styles.cardDetails}>
      {/* Header Section */}
      <div className={styles.flexBetween}>
        <h3 className={styles.heading}>
          {title}
        </h3>
        <div className={styles.statuslikeContainer}>
          <span
            className={`${styles.status} ${statusClassMap[singleCardData?.status] || ""}`}
          >
            {singleCardData?.status}
          </span>
          <div
            className={styles.favoriteButton}
            onClick={handleFavoriteClick}
            title={isLiked ? "Remove from Bookmarks" : "Add to Bookmarks"}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" y="0.5" width="31" height="31" rx="5.5" stroke="#DADADA" />
              <path
                d="M22.75 13.1875C22.75 11.3238 21.1758 9.8125 19.234 9.8125C17.7828 9.8125 16.5362 10.657 16 11.8622C15.4638 10.657 14.2172 9.8125 12.7652 9.8125C10.825 9.8125 9.25 11.3238 9.25 13.1875C9.25 18.6025 16 22.1875 16 22.1875C16 22.1875 22.75 18.6025 22.75 13.1875Z"
                style={{ fill: isLiked ? "black" : "none" }}
                stroke="#1E293B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Details section */}
      <div className={styles.details}>
        <div className={styles.address + " " + styles.detailsCard}>
          <div className={styles.flex}>
            <img src={locationIcon} alt="" className={styles.icon} />
            <p className={styles.addressText}>
              {address}
            </p>
          </div>
          <div className={styles.copyBtn} title='Copy Address' onClick={handleCopy}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.584 3.14807H3.21623C2.43106 3.14807 1.79333 3.78579 1.79333 4.57097V16.5771C1.79333 17.3623 2.43106 18 3.21623 18H11.584C12.3692 18 13.0069 17.3623 13.0069 16.5771V4.57097C13.0032 3.78579 12.3655 3.14807 11.584 3.14807ZM12.008 16.5734C12.008 16.8093 11.8163 17.001 11.5804 17.001H3.21254C2.97662 17.001 2.78494 16.8093 2.78494 16.5734V4.57097C2.78494 4.33505 2.97662 4.14336 3.21254 4.14336H11.5804C11.8163 4.14336 12.008 4.33505 12.008 4.57097V16.5734Z"
                fill="currentColor" />
              <path
                d="M14.7837 0H6.41594C5.63076 0 4.99304 0.637723 4.99304 1.4229C4.99304 1.69937 5.21422 1.92054 5.49069 1.92054C5.76716 1.92054 5.98833 1.69937 5.98833 1.4229C5.98833 1.18698 6.18002 0.99529 6.41594 0.99529H14.7837C15.0197 0.99529 15.2114 1.18698 15.2114 1.4229V13.429C15.2114 13.665 15.0197 13.8566 14.7837 13.8566C14.5073 13.8566 14.2861 14.0778 14.2861 14.3543C14.2861 14.6308 14.5073 14.8519 14.7837 14.8519C15.5689 14.8519 16.2066 14.2142 16.2066 13.429V1.4229C16.2066 0.637723 15.5689 0 14.7837 0Z"
                fill="currentColor" />
            </svg>
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.detailsCard} style={{ flexGrow: 1 }}>
            <img src={client} alt="user" className={styles.icon} />
            <p className={styles.userName}>{userName}</p>
          </div>
          <div className={styles.detailsCard}>
            <img src={phone} alt="phone" className={styles.icon} />
            <p className={styles.userContact}>{userContact}</p>
          </div>
        </div>
      </div>

      {/* Footer section */}
      <div className={styles.footer}>
        <div className={styles.date}>
          <img src={calendar} alt="calendar" className={styles.icon} />
          <p className={styles.dateText}>{date}</p>
        </div>
        <Link to={`/sales-details/${id}`} className={styles.seeDetails}>
          <p>See Details</p>
          <img src={arrow} alt="See Details arrow" className={styles.arrow} />
        </Link>
        <p className={styles.amount}>{amount} USD</p>
      </div>

    </div>
  )
}

export default CardDetails