// import React from "react";
// import styles from "./announcements.module.css";

// const AnnouncementPopup = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.popup}>
//         <div className={styles.header}>
//           <h2>Announcements</h2>
//           <button className={styles.close} onClick={onClose}>✖</button>
//         </div>
//         <textarea className={styles.textarea} placeholder="Write your text ..."></textarea>
//         <div className={styles.footer}>
//           <button className={styles.cancel} onClick={onClose}>Cancel</button>
//           <button className={styles.save}>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnnouncementPopup;














import React, { useState } from "react";
import axios from "axios";
import styles from "./announcements.module.css";
import BASEURL from '../../../const/const';
import { useToaster } from "../../../Toaster"; // Import toaster

const AnnouncementPopup = ({ isOpen, onClose }) => {
  const [text, setText] = useState("");
  const showToaster = useToaster(); // Get toaster function

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const response = await axios.post(`${BASEURL}/api/announcements/add`, { text });
      showToaster(response.data.message, "success"); // Show success message
      setText("");  
      onClose();    
    } catch (error) {
      showToaster("Error saving announcement", "error"); // Show error message
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>Announcements</h2>
          <button className={styles.close} onClick={onClose}>✖</button>
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Write your text ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className={styles.footer}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPopup;
