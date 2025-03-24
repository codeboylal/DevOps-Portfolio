import React from "react";
import { Tooltip } from "@mui/material";
import styles from "./box.module.css";
import cx from "classnames";

// SVG imports
import client from "../../../assets/contractorContacts/client.svg";
import engineer from "../../../assets/contractorContacts/engineer.svg";
import setting from "../../../assets/contractorContacts/setting.svg";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

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


function Box({ contact }) {
  const renderWithTooltip = (text, maxLength) => {
    const isTruncated = text && text.length > maxLength;
    const displayText = isTruncated ? truncateText(text, maxLength) : text || "-";
    return isTruncated ? (
      <Tooltip title={text} placement="top" arrow>
        <label className={styles.truncatedLabel}>{displayText}</label>
      </Tooltip>
    ) : (
      <label className={styles.truncatedLabel}>{displayText}</label>
    );
  };

  return (
    <div className={styles.mainDiv}>
      <label className={styles.heading}>
        {/* {renderWithTooltip(contact?.taskName || "", 28)} */}
        <CustomTooltip
            title={
              contact?.taskName   
            }
            arrow
          >
            <TruncatedText>
              {
                contact?.taskName
              }
            </TruncatedText>
          </CustomTooltip>
      </label>
      <div className={styles.mainDiv_child2}>
        <div className={cx(styles.innerDiv, styles.borderBottom)}>
          <div className={styles.innerDiv__child1}>
            <img src={client} alt="ITI Buildings Design" />
            <div>
              <label>Contact Person</label>
            </div>
          </div>
          {/* {renderWithTooltip(contact?.taskDetails?.contactPerson || "", 12)} */}
          <CustomTooltip
            title={
              contact?.taskDetails?.contactPerson
            }
            arrow
          >
            <TruncatedText>
              {
                contact?.taskDetails?.contactPerson
              }
            </TruncatedText>
          </CustomTooltip>
        </div>
        <div className={cx(styles.innerDiv, styles.borderBottom)}>
          <div className={styles.innerDiv__child1}>
            <img src={setting} alt="ITI Buildings Design" />
            <div>
              <label>Phone number</label>
            </div>
          </div>
          <label>
            {contact?.taskDetails?.contactPhone || "-"}
            {/* <CustomTooltip
            title={
              contact?.taskDetails?.contactPhone
            }
            arrow
          >
            <TruncatedText>
              {
                contact?.taskDetails?.contactPhone
              }
            </TruncatedText>
          </CustomTooltip> */}

          </label>
        </div>
        <div className={styles.innerDiv}>
          <div className={styles.innerDiv__child1}>
            <img src={engineer} alt="ITI Buildings Design" />
            <div>
              <label>Email Address</label>
            </div>
          </div>
          {/* {renderWithTooltip(contact?.taskDetails?.contactEmail || "", 12)} */}
          <CustomTooltip
            title={
              contact?.taskDetails?.contactEmail
            }
            arrow
          >
            <TruncatedText>
              {
                contact?.taskDetails?.contactEmail
              }
            </TruncatedText>
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
}

export default Box;
