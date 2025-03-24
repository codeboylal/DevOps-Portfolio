import React, { useEffect, useState } from "react";

import styles from "./profile.module.css";

import PageSetup from "../../../components/Container/pageSetup/pageSetup.jsx";
import TopBar from "../../../components/topBar/topBar.jsx";
import ColumnName from "../../../components/Container/users/columnName/columnName.jsx";
import UsersContainer from "../../../components/Container/users/users.jsx";
import { getUserData } from "../../../services/user/getUser.js";

function Profile({}) {
  const [userData, setUserData] = useState({});

  const [userId, setUserId] = useState(localStorage.getItem("id") || null);

  const [userType, setUserType] = useState(null);

  const [refresh, setRefresh] = useState(true);

  const [majorType, setMajorType] = useState(null);

  useEffect(() => {
    if (userId && refresh) {
      getUserData({ userId })
        .then((response) => {
          // console.log(response?.data?.data)
          setUserData(response?.data?.data);
          setRefresh(false);
          let data = response?.data?.data;
          if (data && data?.role) {
            // console.log(data?.role)
            if (data?.role === "ITI") {
              setUserType("ITI");
              setMajorType("ITI");
            } else if (data?.role === "individual") {
              setUserType("user");
              setMajorType("user");
            } else {
              setUserType(data?.role);
              setMajorType(data?.role);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId, refresh]);

  return (
    <PageSetup
      active={"Profile"}
      appBar={true}
      ref={refresh}
      setRef={setRefresh}
    >
      <div className={styles.mainDiv}>
        <div>
          <TopBar text={"Profile"} filterEnable={false} />
        </div>
        <ColumnName majorType={majorType} type={userType} />
        <UsersContainer
          majorType={majorType}
          type={userType}
          data={userData}
          setRefresh={setRefresh}
        />
      </div>
      <div className={styles.waring}>
        Please Continue in desktop. Your screen resolution is less than
        required.
      </div>
    </PageSetup>
  );
}

export default Profile;
