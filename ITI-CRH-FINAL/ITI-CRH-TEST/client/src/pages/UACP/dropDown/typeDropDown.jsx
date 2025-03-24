import React, { useEffect, useState } from "react";
// import { useToaster } from "../../../Toaster.js";

import styles from "./typeDropDown.module.css";
import cx from "classnames";

import chevronDown from "../popUps/edit/assets/chevronDown.svg";
// import add from "./assets/add.svg";
import { getOrganization } from "../../../services/organization/getOrganization";
// import { addOrganization } from "../../../services/organization/addOrganization";
import ScrollBar from "../../../components/scrollBar/scrollBar.jsx";

function TypeDropdown({
  typeShow = false,
  setTypeShow,
  setSelected,
  maxHeightDisable = false,
  setUserAccessFilterActive,
  usersPage = false,
  setAccessOption,
  setPaymentOption,
  setUserAccessFilter,
  setRoleOption,
  editPopup = false,
  setSelectedId
}) {
  // const setToast = useToaster();

  const [options, setOptions] = useState(["Individual"]);

  // const [userId, setUserId] = useState(localStorage.getItem("id") || null);

  // const [addOrg, setAddOrg] = useState(false);

  // const [orgName, setOrgName] = useState("");

  const [resfreshState, setRefreshState] = useState(true);

  // const handleAddOrg = () => {
  //   // console.log(` ${orgName} Added Successfully!`)
  //   setAddOrg(false);
  //   setOrgName("");
  //   addOrganization({
  //     userId,
  //     orgName,
  //   })
  //     .then((response) => {
  //       // console.log(response?.data)
  //       setRefreshState(true);
  //       setToast(
  //         response?.data?.message,
  //         response?.data?.status === 200 ? "success" : "error"
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setToast("Please Try Again", "error");
  //     });
  // };

  // const handleOrgChange = (value) => {
  //   setOrgName(value);
  // };

  useEffect(() => {
    if (resfreshState) {
      getOrganization()
        .then((response) => {
          // console.log(response?.data)
          setRefreshState(false);
          let orgArray = [];
          orgArray.push(["0","ITI"]);
          orgArray.push(["1","Individual"]);
          if (response?.data?.data) {
            for (let org of response.data.data) {
              orgArray.push(org);
            }
          }
          setOptions(orgArray);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [resfreshState]);

  const handleSelect = (id, item) => {
    setSelected(item);
    if (usersPage) {
      if (item === "Type") {
        setUserAccessFilterActive(false);
        setTypeShow(true);
      } else {
        setUserAccessFilterActive(true);
        setTypeShow(false);
      }
    }else{
      if (item === "Type") {
        setSelectedId("1");
      } else {
        setSelectedId(id);
      }
    }
  };

  const resetFilters = () => {
    setSelected("Type");
    if (editPopup) {
      return;
    }
    setUserAccessFilterActive(false);
    setUserAccessFilter({
      accountType: "",
      discount: "",
    });
    setRoleOption([
      {
        label: "Admin",
        value: false,
      },
      {
        label: "Staff",
        value: false,
      },
      {
        label: "Contractors",
        value: false,
      },
    ]);
    setAccessOption([
      {
        label: "Display Center",
        value: false,
      },
      {
        label: "Sales",
        value: false,
      },
      {
        label: "Chat",
        value: false,
      },
      {
        label: "Pre-Construction",
        value: false,
      },
      {
        label: "Construction",
        value: false,
      },
    ]);
    setPaymentOption([
      {
        label: "Company",
        value: false,
      },
      {
        label: "Individual",
        value: false,
      },
    ]);
  };

  return (
    <div
      className={styles.mainDiv}
      style={{ display: !typeShow && "none" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={cx(styles.spaceBetween, styles.pointer)}
        onClick={() => {
          resetFilters();
          setTypeShow(false);
        }}
      >
        <span>Type</span>
        <img
          className={styles.arrow}
          src={chevronDown}
          alt="ITI Building Design"
          onClick={(e) => {
            e.stopPropagation();
            setTypeShow(false);
          }}
        />
      </div>
      {/* <div
        className={cx(styles.spaceBetween, styles.pointer)}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          style={{
            display: addOrg && "none",
          }}
        >
          Add organization
        </span>
        <img
          onClick={() => setAddOrg(true)}
          style={{
            display: addOrg && "none",
          }}
          src={add}
          alt="ITI Building Design"
        />
        <input
          style={{
            display: !addOrg && "none",
          }}
          className={styles.inputOrg}
          value={orgName}
          onChange={(e) => {
            handleOrgChange(e?.target?.value);
          }}
        />
        <button
          style={{
            display: !addOrg && "none",
          }}
          className={cx(styles.orgCancel, styles.pointer)}
          onClick={() => {
            setAddOrg(false);
            setOrgName("");
          }}
        >
          {" "}
          Cancel{" "}
        </button>
        <button
          style={{
            display: !addOrg && "none",
          }}
          className={cx(styles.orgSave, styles.orgCancel, styles.pointer)}
          onClick={handleAddOrg}
        >
          {" "}
          Save{" "}
        </button>
      </div> */}
      <ScrollBar>
        <div
          className={styles.optionContainer}
          style={{ maxHeight: maxHeightDisable && "80vh" }}
        >
          {options?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  handleSelect(item?.[0] ,item?.[1]);
                  setTypeShow(false);
                }}
                className={styles.pointer}
              >
                {item?.[1]}
              </div>
            );
          })}
        </div>
      </ScrollBar>
    </div>
  );
}

export default TypeDropdown;
