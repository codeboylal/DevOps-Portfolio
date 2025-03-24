import { useEffect } from 'react';
// import { useState } from 'react';
import React from "react";
import styles from './MidContainer.module.css';


import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const MidContainer = ({name, triggerDownload, resetTrigger , title, page}) => {
    // const [namet, setName] = useState(name);

  // Function to generate PDF
  const generatePDF = async () => {
    const certificateElement = document.getElementById('certificate');

    // Capture certificate as an image using html2canvas
    const canvas = await html2canvas(certificateElement, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Create a jsPDF instance and add the image
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('certificate.pdf');
  };

  useEffect(() => {
    if (triggerDownload) {
      generatePDF();
      resetTrigger(); // Reset the trigger to prevent repeated clicks
    }
  }, [triggerDownload, resetTrigger]);


  return (
      <div
        className={styles.container}
        style={{
          visibility: page === "courseDetails" ? "hidden" : "visible",
          position: page === "courseDetails" ? "absolute" : "static",
        }}
      >
      <div className={styles.certificate}  id="certificate">
        <div className={styles.certificateTitle}>Certificate of Completion</div>
        <div className={styles.certificateBody}>
          This is to certify that<br />
          <span className={styles.certificateName} >{name || '[Name]'}</span><br />
          has successfully completed the {title} 
        </div>
      </div>
{/* 
      <input
        type="text"
        id="name-input"
        className={styles.nameInput}
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />*/}
      <button onClick={generatePDF} style={{display:'none'}}>Download PDF</button>
    </div> 
  );

}

export default MidContainer;