import React, { useState, useEffect } from 'react';
import styles from './headLineSection.module.css';
import EditHeadlineForm from './Admin Edit Headline/editHeadLineForm';
import axios from 'axios';

const AdminHeadlineSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };
  const handleSaveHeadline = async (newHeadline) => {
    try {
      await axios.put('${Base_URL}/api/adminProfile/headline/66dc21979af3024e9834914a', { headline: newHeadline });
      setHeadline(newHeadline);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating headline:', error);
    }
  };

  // Fetch the headline from the AdminDB
  useEffect(() => {
    const fetchAdminHeadline = async () => {
      try {
        const response = await axios.get('${Base_URL}/api/adminProfile/headline/66dc21979af3024e9834914a'); // Replace with actual ID
        setHeadline(response.data.headline);
      } catch (error) {
        console.error('Error fetching headline:', error);
      }
    };

    fetchAdminHeadline();
  }, []);

  return (
    <div className={styles.card}>
      {!isEditing ? (
        <>
          <div className={styles.headline}>
            Company's Headline
            <span className={styles.editIcon} onClick={handleEditClick}>✏️</span>
          </div>
          <div className={styles.description}>
            {headline || 'Loading...'}
          </div>
        </>
      ) : (
        <EditHeadlineForm
          onClose={handleCloseForm}
          onSave={handleSaveHeadline}
          currentHeadline={headline}
        />
      )}
    </div>
  );
};

export default AdminHeadlineSection;

















// Headline Card Styles
// .card {
//     border-radius: 12px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     padding: 20px;
//     background-color: white;
//     width: 870px;
// }

// .headline {
//     font-size: 18px;
//     font-weight: bold;
//     color: #2A85FE;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
// }

// .editIcon {
//     font-size: 16px;
//     cursor: pointer;
// }

// .description {
//     font-size: 16px;
//     color: #767676;
//     font-weight: 400;
//     margin-top: 10px;
// }

// /* Modal Background */
// .modalBackground {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     background-color: rgba(0, 0, 0, 0.5); /* Transparent/dimmed background */
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000; /* Ensure it's above everything */
// }

