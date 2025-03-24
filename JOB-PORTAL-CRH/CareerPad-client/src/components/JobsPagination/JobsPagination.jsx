import React, { useEffect, useMemo, useState } from 'react';
import styles from './JobsPagination.module.css'; 

const PaginatedJobCards = ({ staticJobCard, dynamicJobCards }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 3;

  // Combine static and dynamic jobs
  const combinedJobs = useMemo(() => {
    const allJobs = [staticJobCard, ...dynamicJobCards];
    return allJobs.filter((job) => job !== null); 
  }, [staticJobCard, dynamicJobCards]);

  
  const totalPages = Math.ceil(combinedJobs.length / jobsPerPage);

  useEffect(() => {
    const savedPageNumber = localStorage?.getItem("pageNumber");
    if (savedPageNumber && !isNaN(savedPageNumber) && Number(savedPageNumber) < totalPages) {
      setCurrentPage(Number(savedPageNumber));
    } else {
      setCurrentPage(0);
      localStorage.setItem("pageNumber", 0);
    }
  }, [totalPages]);

  const currentJobs = useMemo(() => {
    const startIndex = currentPage * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    return combinedJobs.slice(startIndex, endIndex);
  }, [currentPage, jobsPerPage, combinedJobs]);


  const handleDotClick = (pageIndex) => {
    setCurrentPage(pageIndex);
    localStorage.setItem("pageNumber", pageIndex);
  };

  return (
    <div className={styles.JobSection}>
      <div className={styles.DisplayJobs}>
        {currentJobs}
      </div>

      <div className={styles.DotsContainer}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`${styles.Dot} ${index === currentPage ? styles.ActiveDot : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PaginatedJobCards;
