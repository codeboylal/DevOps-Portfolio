import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload, FaTrash } from 'react-icons/fa'; 
import styles from './resumeSection.module.css';
import {useToaster} from "../../Toaster.js"
import moment from 'moment'; 

import { Base_URL } from '../../../const/const.js';

const ResumeList = () => {
  const setToast = useToaster()
  const [resume, setResume] = useState(null); // Initialize as null
  const [resumes, setResumes] = useState([]); // Store all uploaded resumes
  // const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    // Fetch the uploaded resumes when the component mounts
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const email = localStorage.getItem('email'); // Fetch email from localStorage
      const response = await axios.get(`${Base_URL}/api/resumes/${email}`);
      setResumes(response.data.resumes); // Set the resumes data to state
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  // const closeToaster = () => {
  //   setToast({ message: '', type: '' });
  // };

  const selectedResume = async (e) => {
    const selectedFile = e.target.files[0];
    setResume(selectedFile);
  
    // Get the email and name from localStorage
    const userEmail = localStorage.getItem('email');
    const userName = localStorage.getItem('name'); // Ensure this is set in localStorage
  
    // Extract the original name of the file (without the extension)
    const originalName = selectedFile.name.split('.')[0]; // Get file name without extension
  
    // Check if the original filename starts with the user's name
    // if (!originalName.startsWith(userName)) {
    //   setToast({ message: `Invalid format: Resume must start with ${userName}`, type: 'error' });
    //   return; // Stop the upload process if the format is incorrect
    // }
  
    const formData = new FormData();
    formData.append('resume', selectedFile); // Append the file
    formData.append('email', userEmail);     // Append the email
    formData.append('name', userName);       // Append the name from localStorage
  
    try {
      const result = await axios.put('${Base_URL}/api/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(result);
  
      // Display toaster and fetch updated resumes after successful upload/update
      setToast('Resume updated successfully!', 'success' );
      fetchResumes(); // Fetch the updated resumes to display them
    } catch (error) {
      console.error('Error uploading resume:', error);
      setToast( 'Failed to upload resume',  'error' );
    }
  };
  

// Function to download a resume
const downloadResume = async (resumeId, filename) => {
  try {
    const response = await axios.get(`${Base_URL}/api/resumes/download/${resumeId}`, {
      responseType: 'blob', // Important for handling binary files
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], { type: response.data.type });
    
    // Create a download URL
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); // Use the filename from the response
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the link
  } catch (error) {
    console.error('Error downloading resume:', error);
    setToast( 'Failed to download resume',  'error' );
  }
};

  // Function to delete a resume by its ID
  const deleteResume = async (resumeId) => {
    try {
      await axios.delete(`${Base_URL}/api/resumes/${resumeId}`);
      setToast('Resume deleted successfully!', 'success' );
      fetchResumes(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting resume:', error);
      setToast( 'Failed to delete resume', 'error' );
    }
  };

  return (
    <div className={styles.resumeContainer}>
      <h3 className={styles.title}>Resume</h3>

      {/* Display all uploaded resumes */}
      {resumes.length > 0 ? (
        <div className={styles.resumeList}>
          {resumes.map((resume) => (
            <div key={resume._id} className={styles.resumeItem}>
              <div className={styles.resumeDetails}>
                <p className={styles.resumeName}>{resume.filename}</p>
                {/* Display the upload date in the format you want */}
                <p className={styles.uploadDate}>
                  Upload on {moment(resume.uploadDate).format('MMM DD, YYYY')}
                </p>
              </div>

              <div className={styles.actions}>
                <button className={styles.actionButton} onClick={() => downloadResume(resume._id, resume.filename)}>
                  <FaDownload /> {/* Download icon */}
                </button>
                <button className={styles.actionButton} onClick={() => deleteResume(resume._id)}>
                  <FaTrash /> {/* Delete icon */}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No resumes uploaded yet.</p>
      )}

      <div className={styles.uploadSection}>
       <div style={{marginTop:'10px'}}>
        <label className={styles.uploadButton} htmlFor="resumeUpload">
            Upload resume
          </label>
       </div>
        <input
          id="resumeUpload"
          type="file"
          accept=".doc,.docx,.rtf,.pdf"
          style={{ display: 'none' }}
          onChange={selectedResume}
        />
        <p className={styles.supportedFormats}>
          Supported Formats: doc, docx, rtf, pdf, up to 2MB
        </p>
      </div>

      {/* {toast.message && (
        <Toaster message={toast.message} type={toast.type} onClose={closeToaster} />
      )} */}
    </div>
  );
};

export default ResumeList;

