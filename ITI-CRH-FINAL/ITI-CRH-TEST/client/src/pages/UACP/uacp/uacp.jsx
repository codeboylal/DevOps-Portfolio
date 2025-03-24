import React, { useState, useEffect, use } from "react";
import { useToaster } from "../../../Toaster.js";
import { useNavigate } from "react-router-dom";

import styles from "./uacp.module.css";

import PageSetup from "../../../components/Container/pageSetup/pageSetup.jsx";

import ColumnName from "../../../components/Container/users/columnName/columnName.jsx";
import UsersContainer from "../../../components/Container/users/users.jsx";
import { getAllUserData, getUserData } from "../../../services/user/getUser.js";
import ScrollBar from "../../../components/scrollBar/scrollBar.jsx";
import BuildingLoader from "../../../components/loader/loader.jsx";
import SearchFilterBar from "../searchFilterBar/searchFilterBar.jsx";
import FilterPopUp from "../filterPopUp/filterPopUp.jsx";

// function UACP({userAccessFilter, setUserAccessFilter}) {
function UACP() {
  const setToast = useToaster();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const [userId, setUserId] = useState(localStorage.getItem("id") || null);

  const [userType, setUserType] = useState(null);

  const [majorType, setMajorType] = useState(null);

  const [refresh, setRefresh] = useState(true);

  const [userAccessFilter, setUserAccessFilter] = useState({
    accountType: "",
    discount: "",
  });

  const [userAccessFilterActive, setUserAccessFilterActive] = useState(false);
  const [filterObject, setFilterObject] = useState(false);
  const [filterPopUpButton, setFilterPopUpButton] = useState(false);
  const [filterPopUp, setFilterPopUp] = useState(false);

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
            if (
              data?.role === "ITI" ||
              data?.role === "companyAdmin" ||
              data?.role === "companyStaff" ||
              data?.role === "companyContractors" ||
              data?.role === "individual"
            ) {
              if (data?.role === "ITI") {
                setUserType("ITI");
                setMajorType("ITI");
              } else if (data?.role === "individual") {
                setUserType("user");
                setMajorType("user");
                setToast("Permission Denied", "error");
                navigate("/");
              } else {
                setUserType(data?.role);
                setMajorType(data?.role);
              }
            } else {
              setToast("Not a valid role", "error");
              navigate("/signin");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId, refresh]);

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (userId && refresh) {
      getAllUserData({ id: userId })
        .then((response) => {
          // console.log(response?.data)
          if (response?.data?.message === "Access Denied") {
            setToast("Permission Denied");
            navigate("/signin");
            return;
          }
          setAllUsers(response?.data?.data);
          setRefresh(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId, refresh]);

  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (userData && allUsers) {
      if (searchValue) {
        let arr = [];
        if (
          userData?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
        ) {
          arr.push(userData);
        }
        for (let user of allUsers) {
          if (user?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())) {
            arr.push(user);
          }
        }
        setFilteredUsers(arr);
      } else {
        setFilteredUsers([userData, ...allUsers]);
      }
    }
  }, [allUsers, userData, searchValue]);

  const [endUsers, setEndUsers] = useState([]);

  const checkFilter = (currentuser, value) => {
    const finalUsers = [];
    function checkLength(currentuser) {
      if (currentuser?.length === 0) {
        return filteredUsers;
      } else {
        return currentuser;
      }
    }
    currentuser = checkLength(currentuser);
    let field = "";
    for (let user of currentuser) {
      let push = true;
      field = "accountType";
      // console.log(value)
      if (field === "accountType") {
        if (value?.accountType !== "Type" && value?.accountType) {
          if (
            user?.[field]?.toLowerCase() === value?.accountType?.toLowerCase()
          ) {
            // console.log(user)
            // continue
          } else {
            push = false;
            // console.log("not matched user: ", user?.[field], value?.accountType)
          }
        }
      }
      field = "discount";
      if (field === "discount") {
        // console.log(value)
        if (value?.discount) {
          if (user?.[field].includes(value?.discount)) {
            // finalUsers.push(user);
          } else {
            push = false;
          }
        }
      }
      field = "role";
      if (field === "role" && value?.role) {
        if (user?.[field].includes(value?.role)) {
          // finalUsers.push(user);
        } else {
          push = false;
        }
      }

      field = "access";
      if (field === "access" && value?.access) {
        for (let val of value?.access) {
          if (val?.value) {
            for (let access of user?.access) {
              if (access?.label !== "_id" && access?.label === val?.label) {
                if (access?.value === val?.value) {
                } else {
                  push = false;
                  // console.log(access?.value, val?.value)
                }
              }
            }
          }
        }
      }

      field = "payment";
      if (field === "payment" && value?.[field]) {
        if (value?.[field]) {
          for (let pay of user?.[field]) {
            if (value?.[field] === pay?.label) {
              if (pay?.value) {
                if (
                  user?.role?.toLowerCase() === "iti" ||
                  user?.accountType?.toLowerCase() === "iti"
                ) {
                  push = false;
                }
              } else {
                push = false;
              }
            }
          }
        }
      }
      if (push) {
        finalUsers.push(user);
      }
    }
    return finalUsers;
  };

  useEffect(() => {
    async function func() {
      // console.log(filteredUsers)
      let users = [];
      // console.log(userAccessFilter)
      if (!userAccessFilterActive) {
        setEndUsers(filteredUsers);
        // console.log("Filter Button not activated")
        return;
      }
      // console.log("Filter Button activated")
      users = checkFilter(filteredUsers, userAccessFilter);
      setEndUsers(users);
    }
    if (filteredUsers) {
      func();
    }
  }, [filteredUsers, userAccessFilter, userAccessFilterActive]);

  return (
    <PageSetup
      active={"users"}
      appBar={true}
      userAccessFilter={userAccessFilter}
      setUserAccessFilter={setUserAccessFilter}
      userAccessFilterActive={userAccessFilterActive}
      setUserAccessFilterActive={setUserAccessFilterActive}
      setFilterObject={setFilterObject}
      filterObject={filterObject}
      ref={refresh}
      setRef={setRefresh}
    >
      {refresh ? (
        <BuildingLoader marginTop={"0px"} />
      ) : (
        <div className={styles.mainDiv}>
          <SearchFilterBar
            filterPopUp={filterPopUp}
            setFilterPopUp={setFilterPopUp}
            setFilterEnable={setFilterPopUpButton}
            filterEnable={filterPopUpButton}
            setSearchValue={setSearchValue}
            handleSearchChange={handleSearchChange}
            searchValue={searchValue}
            closeActive={!userAccessFilterActive}
            setCloseActive={setUserAccessFilterActive}
          />
          <ColumnName type={userType} userLength={endUsers.length || 0} />
          <ScrollBar>
            <div className={styles.usersContainer}>
              {/* <UsersContainer searchValue={searchValue} type={userType} majorType={majorType} data={userData} setRefresh={setRefresh} /> */}
              {endUsers?.map((item, index) => {
                return (
                  <div key={index}>
                    <UsersContainer
                      searchValue={searchValue}
                      majorType={majorType}
                      type={
                        item?.accountType === "individual" ? "user" : item?.role
                      }
                      data={item}
                      setRefresh={setRefresh}
                    />
                  </div>
                );
              })}
              {searchValue &&
                endUsers?.length === 0 &&
                !userAccessFilterActive && (
                  <div>No users found, Clear the Search Query.</div>
                )}
              {endUsers?.length === 0 && userAccessFilterActive && (
                <div>No users found, Clear the Filters.</div>
              )}
            </div>
          </ScrollBar>
          {filterPopUp && (
            <FilterPopUp
              userAccessFilter={userAccessFilter}
              setUserAccessFilter={setUserAccessFilter}
              setUserAccessFilterActive={setUserAccessFilterActive}
              userAccessFilterActive={userAccessFilterActive}
              setFilterObject={setFilterObject}
              filterObject={filterObject}
              setFilterPopUpButton={setFilterPopUpButton}
              setFilterEnable={setFilterPopUpButton}
              setFilterPopUp={setFilterPopUp}
            />
          )}
        </div>
      )}
      <div className={styles.waring}>
        Please Continue in desktop. Your screen resolution is less than
        required.
      </div>
    </PageSetup>
  );
}

export default UACP;
