import React, { useEffect, useState } from "react";

import styles from "../inbox/inbox.module.css";

import PageSetup from "../../components/Container/pageSetup/pageSetup";
import ScrollBar from "../../components/scrollBar/scrollBar";
import TopBar from "../../components/topBar/topBar";
import InboxDiv from "../../components/Container/inboxContainer/inbox.jsx";

import { getInboxData } from "../../services/projects/inbox.js";
import BuildingLoader from "../../components/loader/loader.jsx";

const Inbox = () => {
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(localStorage?.getItem("id") || "");

  const [inboxData, setInboxData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [finalData, setFinalData] = useState([]);

  const [likeActive, setLikeActive] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    // setSearchQuery(e.target.value.trim());
    setSearchQuery(e.target.value);

    // console.log(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getInboxData({ userId })
        .then((response) => {
          setInboxData(response?.data?.data);
          setLoading(false);
          // setInboxData([]);
          // console.log(response?.data?.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    if (userId && loading) {
      fetchData();
    }
  }, [userId, loading]);

  useEffect(() => {
    if (inboxData) {
      const data = inboxData.filter((task) => {
        return likeActive ? task.likeStatus : true;
      });
      setFilteredData(data);
    }
  }, [inboxData, likeActive]);

  // useEffect(() => {
  //   if (filteredData) {
  //     if (searchQuery) {
  //       const data = filteredData.filter((task) => {
  //         return searchQuery
  //           ? task?.task.toLowerCase()?.includes(searchQuery)
  //           : true;
  //       });
  //       setFinalData(data);
  //     } else {
  //       setFinalData(filteredData);
  //     }
  //   }
  // }, [filteredData, searchQuery]);


  useEffect(() => {
    if (filteredData) {
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
  
        const data = filteredData.filter((task) => {
          const taskText = task?.task?.toLowerCase() || "";
          const projectNumber = task?.projectNumber?.toString().toLowerCase() || "";
          const address = task?.address?.toLowerCase() || "";
  
          return (
            taskText.includes(lowerCaseQuery) ||
            projectNumber.includes(lowerCaseQuery) ||
            address.includes(lowerCaseQuery)
          );
        });
  
        setFinalData(data);
      } else {
        setFinalData(filteredData);
      }
    }
  }, [filteredData, searchQuery]);
  

  const handleLikePlans = () => {
    setLikeActive(!likeActive);
  };

  return (
    <PageSetup
      loaderState={false}
      setLoading={setLoading}
      //   loaderState={loading}
      active={"inbox"}
      appBar={true}
      handleLikePlans={handleLikePlans}
      setLikePlansActive={setLikeActive}
      likePlansActive={likeActive}
      searchValue={searchQuery}
      handleSearchChange={handleSearchChange}
    >
      <div className={styles.mainDiv}>
        <div className={styles.marginBottom}>
          <TopBar text={"My Tasks"} filterEnable={false} />
        </div>
        {loading ? (
          <BuildingLoader loaderValue={true} marginTop={"20vh"} />
        ) : (
          <ScrollBar>
            <div className={styles.inboxContainer}>
              {finalData?.map((item, index) => {
                return (
                  <div key={index}>
                    <InboxDiv
                      inboxData={item}
                      userId={userId}
                      setLoading={setLoading}
                    />
                  </div>
                );
              })}
              {!loading && !finalData && (
                <div className={styles.warning}>No tasks assigned</div>
              )}
              {!loading &&
                finalData.length === 0 &&
                !likeActive &&
                !searchQuery && (
                  <div className={styles.warning}>All tasks are completed.</div>
                )}
              {!loading &&
                finalData.length === 0 &&
                likeActive &&
                !searchQuery && (
                  <div className={styles.warning}>
                    No tasks yet! Start bookmarking tasks to see them here.
                  </div>
                )}
              {!loading &&
                finalData.length === 0 &&
                likeActive &&
                searchQuery && (
                  <div className={styles.warning}>
                    No results match your search. Clear the search to try again.
                  </div>
                )}
              {!loading &&
                finalData.length === 0 &&
                !likeActive &&
                searchQuery && (
                  <div className={styles.warning}>
                    No results match your search. Clear the search to try again.
                  </div>
                )}
            </div>
          </ScrollBar>
        )}
      </div>
    </PageSetup>
  );
};

export default Inbox;
