import React, { useEffect, useState } from "react";

import styles from "./users.module.css";

import Edit from "../../../pages/UACP/popUps/edit/edit";
import Conformation from "../../../pages/UACP/popUps/confirmation/confirmation";
import Permission from "./permissions/permissions";

import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const truncateText = (text, limit) =>
  text.length > limit ? `${text.slice(0, limit)}...` : text;

function UsersContainer({
  type = "",
  data,
  setRefresh,
  majorType,
  searchValue,
}) {
  //role: "individual", "companyAdmin", "companyStaff", "companyContractors", "ITI"
  //accountStatus: "not verified", "verified", "locked", "unlocked", "deleted"

  // console.log(majorType)

  const [editPopUp, setEditPopUp] = useState(false);
  const [userType, setUserType] = useState(null);

  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [confirmationType, setConfirmationType] = useState(null);

  const [payment, setPayment] = useState("");

  useEffect(() => {
    if (data && data?.payment) {
      // console.log(data)
      for (let i of data.payment) {
        if (i.value) {
          setPayment(i.label);
          return
        }else(setPayment(""))
      }
    }
  }, [data]);

  const [permission, setPermission] = useState([]);

  useEffect(() => {
    if (data && data?.access) {
      let per = [];
      for (let i of data.access) {
        if (i.value) {
          per.push(i.label);
        }
      }
      setPermission(per);
    }
  }, [data]);

  const nameLimit = 12;
  const emailLimit = 20;

  // console.log(data?.accountType)

  return (
    type && (
      <div
        className={styles.mainDiv}
        style={{
          display: searchValue
            ? data?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
              ? ""
              : "none"
            : "",
        }}
      >
        <div className={styles.userDiv}>
          <div className={styles.emailVerifyDiv}>
            <Tooltip
              title={data?.name?.length > nameLimit ? data.name : ""}
              placement="bottom"
              arrow
            >
              <span>{truncateText(data?.name || "-", nameLimit)}</span>
            </Tooltip>
            <svg
              style={{
                display: permission?.length === 0 && "none",
              }}
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4085 0.713932C15.207 0.128765 16.3411 0.606273 16.4805 1.58637L16.9151 4.64076C16.9965 5.21234 17.4423 5.66336 18.0129 5.75134L21.062 6.22146C22.0404 6.37231 22.5047 7.51188 21.9102 8.30352L20.0578 10.7706C19.7111 11.2323 19.7074 11.8664 20.0487 12.3321L21.8723 14.8206C22.4575 15.6191 21.98 16.7532 20.9999 16.8926L17.9455 17.3272C17.3739 17.4086 16.9229 17.8544 16.8349 18.425L16.3648 21.4741C16.2139 22.4525 15.0744 22.9168 14.2827 22.3224L11.8156 20.4699C11.354 20.1232 10.7198 20.1195 10.2541 20.4608L7.76564 22.2844C6.96714 22.8696 5.83305 22.3921 5.6936 21.412L5.259 18.3576C5.17767 17.786 4.73187 17.335 4.16127 17.247L1.11215 16.7769C0.133744 16.626 -0.33053 15.4865 0.263892 14.6948L2.11637 12.2277C2.46303 11.7661 2.46672 11.1319 2.12545 10.6662L0.301822 8.17775C-0.283345 7.37925 0.194163 6.24516 1.17426 6.10571L4.22865 5.67111C4.80023 5.58978 5.25125 5.14398 5.33923 4.57338L5.80935 1.52426C5.9602 0.545853 7.09977 0.0815791 7.89141 0.676001L10.3585 2.52847C10.8202 2.87514 11.4543 2.87883 11.92 2.53756L14.4085 0.713932Z"
                fill="#CFECD9"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.6152 8.92823C15.8559 9.141 15.8784 9.50908 15.6656 9.75136L11.2005 14.7989C11.1489 14.8572 11.0862 14.9046 11.016 14.9382C10.9458 14.9719 10.8696 14.9911 10.7919 14.9948C10.7141 14.9985 10.6364 14.9866 10.5634 14.9597C10.4903 14.9329 10.4234 14.8917 10.3665 14.8385L7.45445 12.1206C7.34243 12.015 7.27675 11.8694 7.27179 11.7155C7.26682 11.5617 7.32297 11.4121 7.42795 11.2995C7.53294 11.187 7.67822 11.1205 7.83205 11.1148C7.98587 11.109 8.13573 11.1643 8.24886 11.2687L10.726 13.5751L14.7951 8.97792C14.8459 8.92053 14.9074 8.87371 14.9763 8.84015C15.0451 8.80658 15.1199 8.78693 15.1964 8.78231C15.2729 8.77769 15.3495 8.7882 15.4219 8.81324C15.4943 8.83828 15.561 8.87736 15.6183 8.92823H15.6152Z"
                fill="#598D6D"
              />
            </svg>
            <svg
              style={{
                display: permission?.length > 0 && "none",
              }}
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10.5" cy="10.5" r="10.5" fill="#EDE3B9" />
              <path
                d="M10.2498 7.1872C9.53116 7.1872 8.94794 7.77042 8.94794 8.48903V8.60047C8.94794 8.80763 8.86565 9.00631 8.71916 9.15279C8.57268 9.29928 8.374 9.38157 8.16684 9.38157C7.95968 9.38157 7.76101 9.29928 7.61452 9.15279C7.46804 9.00631 7.38574 8.80763 7.38574 8.60047V8.48903C7.38574 7.72945 7.68749 7.00097 8.2246 6.46386C8.76171 5.92675 9.49019 5.625 10.2498 5.625H10.3706C10.9309 5.62526 11.4776 5.79707 11.9374 6.11733C12.3971 6.43758 12.7477 6.89093 12.9421 7.4164C13.1365 7.94188 13.1654 8.51427 13.0248 9.05663C12.8842 9.59898 12.5809 10.0853 12.1557 10.4501L11.3537 11.1375C11.2531 11.2248 11.1723 11.3326 11.1166 11.4536C11.0609 11.5747 11.0317 11.7062 11.0309 11.8394V12.3945C11.0309 12.6017 10.9486 12.8004 10.8021 12.9469C10.6556 13.0933 10.4569 13.1756 10.2498 13.1756C10.0426 13.1756 9.84394 13.0933 9.69746 12.9469C9.55097 12.8004 9.46868 12.6017 9.46868 12.3945V11.8394C9.46868 11.1135 9.78528 10.4241 10.3362 9.9523L11.1392 9.26493C11.3224 9.10788 11.4531 8.89848 11.5137 8.66491C11.5744 8.43133 11.562 8.1848 11.4783 7.95847C11.3945 7.73215 11.2435 7.5369 11.0455 7.39901C10.8474 7.26112 10.6119 7.1872 10.3706 7.1872H10.2498ZM10.2498 15.7793C10.526 15.7793 10.7909 15.6696 10.9862 15.4743C11.1815 15.279 11.2912 15.0141 11.2912 14.7378C11.2912 14.4616 11.1815 14.1967 10.9862 14.0014C10.7909 13.8061 10.526 13.6964 10.2498 13.6964C9.97356 13.6964 9.70866 13.8061 9.51335 14.0014C9.31804 14.1967 9.20831 14.4616 9.20831 14.7378C9.20831 15.0141 9.31804 15.279 9.51335 15.4743C9.70866 15.6696 9.97356 15.7793 10.2498 15.7793Z"
                fill="#A3774E"
              />
            </svg>
          </div>
          <Tooltip
            title={data?.email?.length > emailLimit ? data.email : ""}
            placement="bottom"
            arrow
          >
            <span className={styles.email}>
              {truncateText(data?.email || "-", emailLimit)}
            </span>
          </Tooltip>
        </div>
        <div className={styles.accountTypeDiv}>
          <span>
            {data?.accountType === "ITI"
              ? "ITI Building"
              : data?.accountType === "user"
              ? "Individual"
              : data?.accountType === "individual"
              ? "Individual"
              : data?.accountType || "Individual"}
          </span>
        </div>
        <div
          className={styles.roleDiv}
          style={{
            display: majorType === "user" && "none",
          }}
        >
          <span>
            {type === "ITI"
              ? "Super Admin"
              : type === "companyAdmin"
              ? "Admin"
              : type === "companyStaff"
              ? "Staff"
              : type === "companyContractors"
              ? "Contractor"
              : data?.role === "user"
              ? "-"
              : data?.role === "individual"
              ? "-"
              : data?.role === "Individual"
              ? "-"
              : data.role
              ? data?.role
              : "-"}
          </span>
        </div>
        <div
          className={styles.permissionDiv}
          style={{ justifyContent: permission?.length !== 0 && "flex-start" }}
        >
          {permission?.map((item, index) => {
            return (
              <div key={index}>
                <Permission text={item} />
              </div>
            );
          })}
        </div>
        <div className={styles.discountDiv}>
          <span>{data?.discount || "-"}</span>
        </div>
        <div
          className={styles.paymentDiv}
          style={{
            display: majorType === "user" && "none",
          }}
        >
          <span>{data?.role === "ITI" ? "-" : payment || "-"}</span>
        </div>
        <div className={styles.manageDiv}>
          {/* user, CompanyAdmin , ITI   */}
          <svg
            className={styles.pointer}
            onClick={() => {
              setEditPopUp(true);
              setUserType(type);
            }}
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.2718 1.63461C18.8054 1.16824 18.1728 0.90625 17.5132 0.90625C16.8536 0.90625 16.221 1.16824 15.7546 1.63461L14.6583 2.73091L18.1755 6.24816L19.2718 5.15186C19.7382 4.68542 20.0002 4.05283 20.0002 3.39324C20.0002 2.73364 19.7382 2.10105 19.2718 1.63461ZM17.1702 7.25349L13.653 3.73624L5.69366 11.6955C5.10889 12.28 4.67902 13.001 4.44292 13.7934L3.68489 16.3375C3.64829 16.4603 3.64556 16.5907 3.67699 16.7149C3.70842 16.8391 3.77283 16.9524 3.86342 17.043C3.95401 17.1336 4.0674 17.198 4.19159 17.2295C4.31579 17.2609 4.44617 17.2582 4.56894 17.2216L7.11307 16.4635C7.90542 16.2274 8.62644 15.7976 9.21091 15.2128L17.1702 7.25349Z"
              fill="black"
            />
            <path
              d="M3.65511 4.45898C2.9012 4.45898 2.17817 4.75847 1.64508 5.29156C1.11199 5.82466 0.8125 6.54768 0.8125 7.30159V17.2507C0.8125 18.0046 1.11199 18.7276 1.64508 19.2607C2.17817 19.7938 2.9012 20.0933 3.65511 20.0933H13.6042C14.3581 20.0933 15.0812 19.7938 15.6143 19.2607C16.1473 18.7276 16.4468 18.0046 16.4468 17.2507V12.2761C16.4468 12.0877 16.372 11.9069 16.2387 11.7736C16.1054 11.6404 15.9247 11.5655 15.7362 11.5655C15.5477 11.5655 15.3669 11.6404 15.2337 11.7736C15.1004 11.9069 15.0255 12.0877 15.0255 12.2761V17.2507C15.0255 17.6277 14.8758 17.9892 14.6092 18.2557C14.3427 18.5223 13.9812 18.672 13.6042 18.672H3.65511C3.27815 18.672 2.91664 18.5223 2.65009 18.2557C2.38355 17.9892 2.2338 17.6277 2.2338 17.2507V7.30159C2.2338 6.92464 2.38355 6.56312 2.65009 6.29658C2.91664 6.03003 3.27815 5.88029 3.65511 5.88029H8.62967C8.81814 5.88029 8.9989 5.80542 9.13217 5.67214C9.26544 5.53887 9.34032 5.35811 9.34032 5.16964C9.34032 4.98116 9.26544 4.8004 9.13217 4.66713C8.9989 4.53386 8.81814 4.45898 8.62967 4.45898H3.65511Z"
              fill="black"
            />
          </svg>
          <svg
            style={{
              display:
                majorType === "user"
                  ? "none"
                  : majorType === "companyStaff"
                  ? "none"
                  : majorType === "companyContractors"
                  ? "none"
                  : "",
            }}
            className={styles.pointer}
            onClick={() => {
              setConfirmationType("delete");
              setConfirmationPopUp(true);
            }}
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3.75H12C12 3.21957 11.7893 2.71086 11.4142 2.33579C11.0391 1.96071 10.5304 1.75 10 1.75C9.46957 1.75 8.96086 1.96071 8.58579 2.33579C8.21071 2.71086 8 3.21957 8 3.75ZM6.5 3.75C6.5 3.29037 6.59053 2.83525 6.76642 2.41061C6.94231 1.98597 7.20012 1.60013 7.52513 1.27513C7.85013 0.950121 8.23597 0.692313 8.66061 0.516422C9.08525 0.34053 9.54037 0.25 10 0.25C10.4596 0.25 10.9148 0.34053 11.3394 0.516422C11.764 0.692313 12.1499 0.950121 12.4749 1.27513C12.7999 1.60013 13.0577 1.98597 13.2336 2.41061C13.4095 2.83525 13.5 3.29037 13.5 3.75H19.25C19.4489 3.75 19.6397 3.82902 19.7803 3.96967C19.921 4.11032 20 4.30109 20 4.5C20 4.69891 19.921 4.88968 19.7803 5.03033C19.6397 5.17098 19.4489 5.25 19.25 5.25H17.93L16.76 17.361C16.6702 18.289 16.238 19.1502 15.5477 19.7768C14.8573 20.4034 13.9583 20.7504 13.026 20.75H6.974C6.04186 20.7501 5.1431 20.403 4.45295 19.7765C3.7628 19.1499 3.33073 18.2888 3.241 17.361L2.07 5.25H0.75C0.551088 5.25 0.360322 5.17098 0.21967 5.03033C0.0790175 4.88968 0 4.69891 0 4.5C0 4.30109 0.0790175 4.11032 0.21967 3.96967C0.360322 3.82902 0.551088 3.75 0.75 3.75H6.5ZM8.5 8.5C8.5 8.30109 8.42098 8.11032 8.28033 7.96967C8.13968 7.82902 7.94891 7.75 7.75 7.75C7.55109 7.75 7.36032 7.82902 7.21967 7.96967C7.07902 8.11032 7 8.30109 7 8.5V16C7 16.1989 7.07902 16.3897 7.21967 16.5303C7.36032 16.671 7.55109 16.75 7.75 16.75C7.94891 16.75 8.13968 16.671 8.28033 16.5303C8.42098 16.3897 8.5 16.1989 8.5 16V8.5ZM12.25 7.75C12.0511 7.75 11.8603 7.82902 11.7197 7.96967C11.579 8.11032 11.5 8.30109 11.5 8.5V16C11.5 16.1989 11.579 16.3897 11.7197 16.5303C11.8603 16.671 12.0511 16.75 12.25 16.75C12.4489 16.75 12.6397 16.671 12.7803 16.5303C12.921 16.3897 13 16.1989 13 16V8.5C13 8.30109 12.921 8.11032 12.7803 7.96967C12.6397 7.82902 12.4489 7.75 12.25 7.75Z"
              fill="black"
            />
          </svg>
          <svg
            style={{
              display:
                majorType === "user"
                  ? "none"
                  : majorType === "companyStaff"
                  ? "none"
                  : majorType === "companyContractors"
                  ? "none"
                  : majorType === "companyAdmin"
                  ? "none"
                  : data?.accountStatus !== "locked"
                  ? "none"
                  : "",
            }}
            className={styles.pointer}
            onClick={() => {
              setConfirmationType("unlock");
              setConfirmationPopUp(true);
            }}
            width="16"
            height="21"
            viewBox="0 0 16 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 21C1.45 21 0.979333 20.8043 0.588 20.413C0.196666 20.0217 0.000666667 19.5507 0 19V9C0 8.45 0.196 7.97933 0.588 7.588C0.98 7.19667 1.45067 7.00067 2 7H3V5C3 3.61667 3.48767 2.43767 4.463 1.463C5.43833 0.488334 6.61733 0.000667349 8 6.82594e-07C9.38267 -0.000665984 10.562 0.487001 11.538 1.463C12.514 2.439 13.0013 3.618 13 5V7H14C14.55 7 15.021 7.196 15.413 7.588C15.805 7.98 16.0007 8.45067 16 9V19C16 19.55 15.8043 20.021 15.413 20.413C15.0217 20.805 14.5507 21.0007 14 21H2ZM8 16C8.55 16 9.021 15.8043 9.413 15.413C9.805 15.0217 10.0007 14.5507 10 14C9.99933 13.4493 9.80367 12.9787 9.413 12.588C9.02233 12.1973 8.55133 12.0013 8 12C7.44867 11.9987 6.978 12.1947 6.588 12.588C6.198 12.9813 6.002 13.452 6 14C5.998 14.548 6.194 15.019 6.588 15.413C6.982 15.807 7.45267 16.0027 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7Z"
              fill="black"
            />
          </svg>
          <svg
            style={{
              display:
                majorType === "user"
                  ? "none"
                  : majorType === "companyStaff"
                  ? "none"
                  : majorType === "companyContractors"
                  ? "none"
                  : majorType === "companyAdmin"
                  ? "none"
                  : data?.accountStatus === "locked"
                  ? "none"
                  : "",
            }}
            className={styles.pointer}
            onClick={() => {
              setConfirmationType("lock");
              setConfirmationPopUp(true);
            }}
            width="16"
            height="21"
            viewBox="0 0 16 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.70981 1.87525C2.79019 2.88573 2.28379 4.18603 2.28571 5.53194V8.84652H1.82857C0.822857 8.84652 0 9.64203 0 10.6143V18.3483C0 19.8067 1.23429 21 2.74286 21H13.2571C14.7657 21 16 19.8067 16 18.3483V10.6143C16 9.64203 15.1771 8.84652 14.1714 8.84652H4.57143V5.53194C4.57006 4.72424 4.8738 3.94385 5.42559 3.33738C5.97738 2.7309 6.73925 2.34008 7.56807 2.23832C8.39689 2.13657 9.23562 2.3309 9.9267 2.78479C10.6178 3.23868 11.1136 3.9209 11.3211 4.70329C11.3969 4.98709 11.5862 5.23016 11.8474 5.37904C12.1085 5.52791 12.4202 5.57039 12.7137 5.49714C13.0073 5.42388 13.2587 5.24089 13.4127 4.98841C13.5667 4.73594 13.6106 4.43466 13.5349 4.15086C13.1887 2.84721 12.3622 1.71056 11.2105 0.954369C10.0588 0.198178 8.66121 -0.125533 7.2801 0.0440283C5.89899 0.213589 4.62942 0.864756 3.70981 1.87525ZM7.99997 16.7569C9.0309 16.7569 9.86663 15.9489 9.86663 14.9522C9.86663 13.9556 9.0309 13.1476 7.99997 13.1476C6.96904 13.1476 6.1333 13.9556 6.1333 14.9522C6.1333 15.9489 6.96904 16.7569 7.99997 16.7569Z"
              fill="black"
            />
          </svg>
        </div>

        {/* Edit Pop up */}
        {editPopUp && userType && (
          <Edit
            majorType={majorType}
            userType={userType}
            setEditPopUp={setEditPopUp}
            email={data?.email}
            id={data?.id}
            setRefresh={setRefresh}
          />
        )}
        {/* user, CompanyAdmin , ITI   */}

        {/* Conformation Pop up */}
        {confirmationPopUp && confirmationType && (
          <Conformation
            popUp={confirmationType}
            setPopUp={setConfirmationPopUp}
            email={data?.email}
            setRefresh={setRefresh}
          />
        )}
        {/* delete, lock , unlock */}
      </div>
    )
  );
}

export default UsersContainer;
