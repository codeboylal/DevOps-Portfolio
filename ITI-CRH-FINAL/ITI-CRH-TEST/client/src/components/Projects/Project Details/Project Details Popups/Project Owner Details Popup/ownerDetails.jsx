import React, { useState, useEffect } from "react";
import styles from "./ownerDetails.module.css";
import edit from "./Owner Popup Svgs/edit.svg";
import email from "./Owner Popup Svgs/email.svg";
import fullName from "./Owner Popup Svgs/fullName.svg";
import address from "./Owner Popup Svgs/address.svg";
import contact from "./Owner Popup Svgs/contact.svg";
import downArrow from "./Owner Popup Svgs/downArrow.svg";
import upArrow from "./Owner Popup Svgs/upArrow.svg";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { getOwnerDetails } from "../../../../../services/projects/getOwnerDetails.js";

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

const CustomTooltip = styled(Tooltip)({
  "& .MuiTooltip-tooltip": {
    maxWidth: "max-content", // Set max width for tooltip
    whiteSpace: "normal", // Allow text to wrap
  },
});

const TruncatedText = styled(Typography)({
  maxWidth: "45%", // Set max width for truncation
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "inline-block",
  verticalAlign: "middle",
  fontWeight: "bold",
  color: "#333",
  fontSize: "16px"
});

const OwnerDetails = ({ data }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [projectData, setProjectData] = useState([]);
  const [custom_Fields, setCustom_Fields] = useState([]);

  const renderWithTooltip = (text, maxLength) => {
    const isTruncated = text && text.length > maxLength;
    const displayText = isTruncated
      ? truncateText(text, maxLength)
      : text || "-";
    return isTruncated ? (
      <Tooltip title={text} placement="top" arrow>
        <label className={styles.truncatedLabel}>{displayText}</label>
      </Tooltip>
    ) : (
      <label className={styles.truncatedLabel}>{displayText}</label>
    );
  };

  const [ownerID, setOnwerID] = useState("");
  useEffect(() => {
    if (data) {
      // console.log(data?.[0]?.custom_fields.find(field=>(field?.name?.toLowerCase() === "owner details"))?.value?.[0]?.id)
      if (data[0].custom_fields) {
        setOnwerID(
          data?.[0]?.custom_fields.find(
            (field) => field?.name?.toLowerCase() === "owner details"
          )?.value?.[0]?.id
        );
      }
      // setOnwerID(1)
      setProjectData(data?.[0]);
      setCustom_Fields(data?.[0]?.custom_fields);
      // console.log(data?.[0]?.custom_fields)
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapse = () => {
    if (isMobile) {
      setCollapsed(!collapsed);
    }
  };

  // const OwnerEmail = custom_Fields?.find(field => field?.name === "Contact Email")?.value;
  // console.log(OwnerEmail);

  const [ownerData, setOwnerData] = useState({});

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      getOwnerDetails(ownerID)
        .then((response) => {
          // console.log(response.data.data)
          setOwnerData(response?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // console.log(ownerID)
    if (ownerID) {
      fetchOwnerDetails();
      // alert("onwer ID")
    }
  }, [ownerID]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Owner Details</h3>
        <button className={styles.editButton}>
          <img src={edit} alt="Edit" className={styles.icon} />
          <span className={styles.label}>Edit</span>
        </button>
      </div>

      {/* Always Visible Fields */}
      <div className={styles.detailRow}>
        {/* <img src={fullName} alt="Full Name" className={styles.icon} /> */}

        <div className={styles.icon}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4963 9.20782C11.1789 8.87021 11.7272 8.31166 12.0522 7.62295C12.3772 6.93424 12.4597 6.15586 12.2864 5.41432C12.113 4.67278 11.694 4.01166 11.0973 3.53841C10.5007 3.06517 9.76154 2.80762 9 2.80762C8.23846 2.80762 7.49931 3.06517 6.90267 3.53841C6.30602 4.01166 5.88697 4.67278 5.71361 5.41432C5.54025 6.15586 5.62278 6.93424 5.94778 7.62295C6.27277 8.31166 6.82114 8.87021 7.50375 9.20782C6.31792 9.53504 5.27204 10.242 4.52633 11.2203C3.78062 12.1987 3.3762 13.3945 3.375 14.6247V15.1872C3.375 15.3364 3.43426 15.4795 3.53975 15.5849C3.64524 15.6904 3.78832 15.7497 3.9375 15.7497H14.0625C14.2117 15.7497 14.3548 15.6904 14.4602 15.5849C14.5657 15.4795 14.625 15.3364 14.625 15.1872V14.6247C14.6238 13.3945 14.2194 12.1987 13.4737 11.2203C12.728 10.242 11.6821 9.53504 10.4963 9.20782ZM6.75 6.1872C6.75 5.74219 6.88196 5.30717 7.12919 4.93716C7.37643 4.56715 7.72783 4.27876 8.13896 4.10847C8.5501 3.93817 9.0025 3.89361 9.43895 3.98043C9.87541 4.06725 10.2763 4.28154 10.591 4.59621C10.9057 4.91087 11.12 5.31179 11.2068 5.74824C11.2936 6.1847 11.249 6.6371 11.0787 7.04823C10.9084 7.45937 10.62 7.81077 10.25 8.058C9.88002 8.30524 9.44501 8.4372 9 8.4372C8.40326 8.4372 7.83097 8.20014 7.40901 7.77819C6.98705 7.35623 6.75 6.78393 6.75 6.1872ZM4.5 14.6247C4.5 13.4312 4.97411 12.2866 5.81802 11.4427C6.66193 10.5988 7.80653 10.1247 9 10.1247C10.1935 10.1247 11.3381 10.5988 12.182 11.4427C13.0259 12.2866 13.5 13.4312 13.5 14.6247H4.5Z"
              fill="black"
            />
          </svg>
        </div>

        <span className={styles.label}>Full Name</span>
        {/* <span className={styles.value}> */}
          {/* {projectData?.custom_fields?.[13]?.value?.[0]?.name || "N/A"} */}
          {/* {custom_Fields?.find(field => field?.name === "Owner Details")?.value?.[0]?.name} */}
          {/* {renderWithTooltip(custom_Fields?.find(field => field?.name === "Owner Details")?.value?.[0]?.name, 18)} */}
          <CustomTooltip
            title={
              custom_Fields?.find((field) => field?.name === "Owner Details")
                ?.value?.[0]?.name
            }
            arrow
          >
            <TruncatedText>
              {
                custom_Fields?.find((field) => field?.name === "Owner Details")
                  ?.value?.[0]?.name
              }
            </TruncatedText>
          </CustomTooltip>
          {/* {renderWithTooltip(
            custom_Fields?.find((field) => field?.name === "Owner Details")
              ?.value?.[0]?.name,
            isMobile ? 18 : 40
          )} */}
        {/* </span> */}
      </div>

      <div className={styles.detailRow}>
        {/* <img src={address} alt="Address" className={styles.icon} /> */}
        <div className={styles.icon}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2741 16.8753H5.7266C4.98616 16.9028 4.26477 16.637 3.71919 16.1357C3.17361 15.6343 2.8479 14.938 2.81285 14.1978V10.6878C2.81285 10.5386 2.87211 10.3956 2.9776 10.2901C3.08309 10.1846 3.22616 10.1253 3.37535 10.1253C3.52453 10.1253 3.66761 10.1846 3.7731 10.2901C3.87859 10.3956 3.93785 10.5386 3.93785 10.6878V14.1978C3.97242 14.6396 4.17941 15.0501 4.5141 15.3406C4.84878 15.6311 5.28431 15.7783 5.7266 15.7503H12.2741C12.7164 15.7783 13.1519 15.6311 13.4866 15.3406C13.8213 15.0501 14.0283 14.6396 14.0628 14.1978V10.6878C14.0628 10.5386 14.1221 10.3956 14.2276 10.2901C14.3331 10.1846 14.4762 10.1253 14.6253 10.1253C14.7745 10.1253 14.9176 10.1846 15.0231 10.2901C15.1286 10.3956 15.1878 10.5386 15.1878 10.6878V14.1978C15.1528 14.938 14.8271 15.6343 14.2815 16.1357C13.7359 16.637 13.0145 16.9028 12.2741 16.8753ZM16.7122 9.39971C16.7649 9.34741 16.8068 9.2852 16.8354 9.21666C16.8639 9.14811 16.8786 9.07459 16.8786 9.00033C16.8786 8.92607 16.8639 8.85255 16.8354 8.78401C16.8068 8.71546 16.7649 8.65325 16.7122 8.60096L9.39972 1.28846C9.34743 1.23573 9.28522 1.19389 9.21667 1.16533C9.14813 1.13677 9.0746 1.12207 9.00035 1.12207C8.92609 1.12207 8.85257 1.13677 8.78402 1.16533C8.71548 1.19389 8.65326 1.23573 8.60097 1.28846L1.28847 8.60096C1.18255 8.70688 1.12305 8.85054 1.12305 9.00033C1.12305 9.15013 1.18255 9.29379 1.28847 9.39971C1.39439 9.50563 1.53805 9.56513 1.68785 9.56513C1.83764 9.56513 1.9813 9.50563 2.08722 9.39971L9.00035 2.48096L15.9135 9.39971C15.9658 9.45243 16.028 9.49428 16.0965 9.52283C16.1651 9.55139 16.2386 9.56609 16.3128 9.56609C16.3871 9.56609 16.4606 9.55139 16.5292 9.52283C16.5977 9.49428 16.6599 9.45243 16.7122 9.39971Z"
              fill="black"
            />
          </svg>
        </div>

        <span className={styles.label}>Address</span>   
        {/* <span className={styles.value}> */}
          {/* {data?.find(field => field?.name)?.name?.match(/^(?:[^_]*_){2}(.*)$/)?.[1] || "N/A"} */}
          <CustomTooltip title={ownerData?.address || "N/A"} arrow>
            <TruncatedText>{ownerData?.address || "N/A"}</TruncatedText>
          </CustomTooltip>
          {/* {renderWithTooltip(ownerData?.address || "N/A", isMobile ? 18 : 40)} */}
        {/* </span> */}
      </div>

      {/* Collapse Button (Only Show at `max-width: 768px`) */}
      {isMobile && collapsed && (
        <button className={styles.collapseButton} onClick={toggleCollapse}>
          <span className={styles.arrowIcon}>
            {/* <img src={downArrow} alt="Expand" /> */}
            <div>
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.00005 9.50005C8.80823 9.50005 8.61623 9.42673 8.4698 9.2803L0.969797 1.7803C0.676734 1.48723 0.676734 1.01267 0.969797 0.719797C1.26286 0.426922 1.73742 0.426734 2.0303 0.719797L9.00005 7.68955L15.9698 0.719797C16.2629 0.426734 16.7374 0.426734 17.0303 0.719797C17.3232 1.01286 17.3234 1.48742 17.0303 1.7803L9.5303 9.2803C9.38386 9.42673 9.19186 9.50005 9.00005 9.50005Z"
                  fill="black"
                />
              </svg>
            </div>
          </span>
        </button>
      )}

      {/* Show all fields when screen is above 768px */}
      {!isMobile || !collapsed ? (
        <>
          <div className={styles.detailRow}>
            {/* <img src={email} alt="Email" className={styles.icon} /> */}
            <div className={styles.icon}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1639_694)">
                  <path
                    d="M18 3.91623C18 3.00287 17.2569 2.25977 16.3435 2.25977H1.65646C0.743276 2.2598 0.000316407 3.00255 0 3.91651V3.91679V14.084C0 15.0088 0.750659 15.741 1.65703 15.741H16.3429C17.2677 15.741 18 14.9904 18 14.084V3.91679C18 3.91672 18 3.91665 18 3.91658C18 3.91648 18 3.91637 18 3.91623ZM1.65646 3.31449H16.3435C16.6753 3.31449 16.9453 3.58446 16.9453 3.91711C16.9453 4.09387 16.8575 4.25795 16.7101 4.35611L9.33416 9.27364C9.1312 9.40896 8.86887 9.40899 8.66587 9.27364C8.66587 9.27364 1.28971 4.356 1.28985 4.35611C1.28989 4.35614 1.28975 4.35604 1.28971 4.356C1.14255 4.25795 1.05469 4.09387 1.05469 3.91623C1.05469 3.58442 1.32466 3.31449 1.65646 3.31449ZM16.343 14.6863H1.65703C1.3287 14.6863 1.05469 14.4209 1.05469 14.084V5.46694L8.0808 10.1511C8.36001 10.3373 8.68001 10.4304 9 10.4304C9.32003 10.4304 9.64006 10.3373 9.91923 10.1511L16.9453 5.46694V14.084C16.9453 14.4123 16.6798 14.6863 16.343 14.6863Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1639_694">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <span className={styles.label}>Email</span>
            {/* <span className={styles.value}> */}
              {/* {projectData?.custom_fields?.[6]?.value || "N/A"} */}
              {/* {custom_Fields?.find(field => field?.name === "Contact Email")?.value} */}
              <CustomTooltip title={ownerData?.email || "N/A"} arrow>
                <TruncatedText>{ownerData?.email || "N/A"}</TruncatedText>
              </CustomTooltip>
              {/* {renderWithTooltip(ownerData?.email, isMobile ? 18 : 40)} */}
            {/* </span> */}
          </div>

          <div className={`${styles.detailRow} ${styles.brRemove}`}>
            {/* <img src={contact} alt="Contact" className={styles.icon} /> */}
            <div className={styles.icon}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6903 16.8752C12.3037 16.874 11.9212 16.7956 11.5653 16.6446C6.97258 14.6782 3.31415 11.0178 1.35033 6.42394C1.12829 5.90696 1.06642 5.33526 1.17271 4.78274C1.27901 4.23021 1.54858 3.72228 1.94658 3.32457L3.63408 1.63707C3.95049 1.32106 4.37939 1.14355 4.82658 1.14355C5.27377 1.14355 5.70267 1.32106 6.01908 1.63707L8.00471 3.62269C8.32072 3.9391 8.49822 4.36801 8.49822 4.81519C8.49822 5.26238 8.32072 5.69129 8.00471 6.00769L7.08783 6.93582C7.44252 7.83601 7.97861 8.6536 8.66277 9.33776C9.34693 10.0219 10.1645 10.558 11.0647 10.9127L12.0097 9.97332C12.3261 9.65731 12.755 9.4798 13.2022 9.4798C13.6494 9.4798 14.0783 9.65731 14.3947 9.97332L16.3803 11.9589C16.6963 12.2754 16.8738 12.7043 16.8738 13.1514C16.8738 13.5986 16.6963 14.0275 16.3803 14.3439L14.6928 16.0314C14.4317 16.2979 14.1202 16.5097 13.7764 16.6545C13.4326 16.7994 13.0634 16.8744 12.6903 16.8752ZM4.84908 2.25019C4.77505 2.24977 4.70167 2.26396 4.63313 2.29195C4.5646 2.31994 4.50227 2.36119 4.44971 2.41332L2.76221 4.10082C2.52257 4.33938 2.36013 4.64442 2.29594 4.97641C2.23174 5.30839 2.26877 5.652 2.40221 5.96269C4.24318 10.3006 7.68955 13.759 12.021 15.6152C12.3316 15.7486 12.6753 15.7857 13.0072 15.7215C13.3392 15.6573 13.6443 15.4948 13.8828 15.2552L15.5703 13.5677C15.6231 13.5154 15.6649 13.4532 15.6935 13.3846C15.722 13.3161 15.7367 13.2426 15.7367 13.1683C15.7367 13.0941 15.722 13.0205 15.6935 12.952C15.6649 12.8834 15.6231 12.8212 15.5703 12.7689L13.5791 10.7833C13.4737 10.6786 13.3311 10.6197 13.1825 10.6197C13.0339 10.6197 12.8913 10.6786 12.786 10.7833L11.5935 11.9758C11.5207 12.0472 11.43 12.0974 11.3309 12.1212C11.2318 12.1449 11.1282 12.1414 11.031 12.1108C9.83635 11.7126 8.75085 11.0417 7.86044 10.1513C6.97003 9.26092 6.29916 8.17543 5.90096 6.98082C5.87041 6.88362 5.86683 6.77996 5.89061 6.68089C5.91438 6.58182 5.96462 6.49106 6.03596 6.41832L7.22846 5.22582C7.28059 5.17326 7.32184 5.11093 7.34983 5.04239C7.37782 4.97386 7.39201 4.90047 7.39158 4.82644C7.39096 4.67888 7.33238 4.53747 7.22846 4.43269L5.24846 2.41332C5.1959 2.36119 5.13356 2.31994 5.06503 2.29195C4.99649 2.26396 4.92311 2.24977 4.84908 2.25019Z"
                  fill="black"
                />
              </svg>
            </div>

            <span className={`${styles.label} `}>Contact</span>
            {/* <span className={styles.value}>NA</span> */}
            {/* {custom_Fields?.find(field => field?.name === "Contact")?.value || "NA"} */}
            <CustomTooltip title={ownerData?.contact || "N/A"} arrow>
                <TruncatedText>{ownerData?.contact || "N/A"}</TruncatedText>
              </CustomTooltip>
            {/* {renderWithTooltip(ownerData?.contact || "NA", isMobile ? 18 : 40)} */}
          </div>

          {/* Collapse Button (Only at `max-width: 768px`) */}
          {isMobile && (
            <button className={styles.collapseButton} onClick={toggleCollapse}>
              <span className={styles.arrowIcon}>
                {/* <img src={upArrow} alt="Collapse" /> */}
                <div>
                  <svg
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      transform="rotate(180, 9, 5)"
                      d="M9.00005 9.50005C8.80823 9.50005 8.61623 9.42673 8.4698 9.2803L0.969797 1.7803C0.676734 1.48723 0.676734 1.01267 0.969797 0.719797C1.26286 0.426922 1.73742 0.426734 2.0303 0.719797L9.00005 7.68955L15.9698 0.719797C16.2629 0.426734 16.7374 0.426734 17.0303 0.719797C17.3232 1.01286 17.3234 1.48742 17.0303 1.7803L9.5303 9.2803C9.38386 9.42673 9.19186 9.50005 9.00005 9.50005Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </span>
            </button>
          )}
        </>
      ) : null}
    </div>
  );
};

export default OwnerDetails;
