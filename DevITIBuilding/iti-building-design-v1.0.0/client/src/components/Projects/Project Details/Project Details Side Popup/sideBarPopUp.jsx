import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./sideBarPopUp.module.css";
import download from "./Side Bar Image Svgs/download.svg";
import BASEURL from "../../../../const/const";
import ScrollBar from "../../../scrollBar/scrollBar";
import BuildingLoader from "../../../loader/loader";
import { Tooltip } from "@mui/material";


function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}



const SideBarPopUpProjectDetails = ({ projectNumber , isSticky}) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [custom_Fields, setCustom_Fields] = useState([])
  
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


  

  useEffect(() => {
    const fetchFiles = async () => {
      if (!projectNumber) return;
      setLoading(true);

      try {
        let response = await axios.get(`${BASEURL}/api/files`, {
          params: { jobType: "jobs_completed", projectFolder: projectNumber },
        });

        if (response.data.length > 0) {
          setFiles(response.data);
        } else {
          throw new Error("No files in jobs_completed. Trying jobs_running...");
        }
      } catch (error) {
        try {
          let response = await axios.get(`${BASEURL}/api/files`, {
            params: { jobType: "jobs_running", projectFolder: projectNumber },
          });

          if (response.data.length > 0) {
            setFiles(response.data);
          } else {
            console.log("No files found in either jobs_completed or jobs_running.");
          }
        } catch (error) {
          console.error("Error fetching files from AWS:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if(projectNumber && !isSticky){
      fetchFiles();
    }
  }, [projectNumber, isSticky]);

  const downloadFile = async (file) => {
    if (!file || !file.name || !file.folder) {
      console.error("Error: File data is missing");
      return;
    }
    setLoading(true);

    try {
      let s3Key = `${file.folder}${file.name}`.replace(/\/+/g, "/");
      const encodedKey = encodeURIComponent(decodeURIComponent(s3Key));
      const response = await axios.get(`${BASEURL}/api/download?key=${encodedKey}`);

      if (!response.data || !response.data.url) {
        console.error("Error: No URL returned from server");
        alert("Failed to generate a download link.");
        return;
      }

      const fileUrl = response.data.url;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const previewFile = async (file) => {
    if (!file || !file.name || !file.folder) {
      console.error("Error: File data is missing");
      return;
    }

    try {
      let s3Key = `${file.folder}${file.name}`.replace(/\/+/g, "/");
      const encodedKey = encodeURIComponent(decodeURIComponent(s3Key));
      const response = await axios.get(`${BASEURL}/api/preview?key=${encodedKey}`); // Use preview API

      if (!response.data || !response.data.url) {
        alert("Failed to generate a preview link.");
        return;
      }

      window.open(response.data.url, "_blank", "noopener,noreferrer"); // Opens in a new tab
    } catch (error) {
      console.error("Preview error:", error);
      alert("Preview failed. Please try again.");
    }
  };



  return (
    <div >
      {loading ? (
        <BuildingLoader loaderValue={true} height="100vh" width="100%" marginTop="0px" />
      ) : (
        <div className={styles.container}>
        <ScrollBar>
          {files.length === 0 ? (
            <p>No files found for this Project Number.</p>
          ) : (
            files.map((doc, index) => (
              // <div key={doc.name + index} className={styles.card} onClick={() => previewFile(doc)}>
              <div
                key={doc.name + index}
                className={styles.card}
                onClick={(e) => {
                  if (!e.target.closest(`.${styles.actions}`)) {
                    previewFile(doc);
                  }
                }}
              >

                <div className={styles.details}>
                  <h3 className={styles.title}>
                    {/* {doc.name} */}
            {renderWithTooltip(doc.name, 40)}

                    </h3>
                  <p className={styles.meta}>
                    {new Date(doc.lastModified).toLocaleDateString()} - {doc.size}
                  </p>
                </div>

                <div className={styles.titleActionContainer}>
                <div className={styles.titleContainer}>
                  {/* {doc.portalNaming} */}
            {renderWithTooltip(doc.portalNaming, 14)}

                </div>
                <div className={styles.actions} >
                  <button
                    className={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      // e.preventDefault();
                      downloadFile(doc);
                    }}
                    disabled={loading}
                  >
                    <img src={download} alt="Download" />
                  </button>
                </div>
                </div>
              </div>
            ))
          )}
        </ScrollBar>

          </div>
      )}
    </div>
  );
};

export default SideBarPopUpProjectDetails;
