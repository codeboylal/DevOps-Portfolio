
import React, { useState } from 'react';
import styles from './editHeadlineForm.module.css';
import axios from 'axios';
import { Base_URL } from '../../../../../const/const';
const EditHeadlineForm = ({ onClose, onSave, currentHeadline, profileId }) => {
    const [headline, setHeadline] = useState(currentHeadline);

    const handleSave = async (event) => {
        event.preventDefault();
        try {
            const profileId = '66da0fede91d581e19657ffa';  
            const response = await axios.put(`${Base_URL}/api/profile/headline/${profileId}`, { headline });
            onSave(response.data.profile.headline);
        } catch (error) {
            console.error('Error updating headline:', error);
        }
    };

    return (
        <div className={styles.modalContainer}>
            <form onSubmit={handleSave} className={styles.formContainer}>
                <h2 className={styles.formTitle}>Edit Headline</h2>
                <textarea
                    className={styles.textArea}
                    value={headline}
                    placeholder="Enter your headline here..."
                    onChange={(e) => setHeadline(e.target.value)}
                />
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className={styles.saveButton}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditHeadlineForm;

















// /* Modal Container */
// .modalContainer {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
//     width: 100vw;
//     background-color: rgba(0, 0, 0, 0.3); /* Dimmed background */
//     position: fixed;
//     top: 0;
//     left: 0;
//     z-index: 1000;
// }

// /* Form Container */
// .formContainer {
//     background-color: white;
//     width: 524px;
//     padding: 30px;
//     border-radius: 16px;
//     box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// }

// /* Form Title */
// .formTitle {
//     color: #007bff;
//     font-size: 1.8rem;
//     margin-bottom: 20px;
// }

// /* Text Area */
// .textArea {
//     width: 100%;
//     height: 191px;
//     padding: 10px 16px;
//     border-radius: 8px;
//     border: 1px solid #ddd;
//     font-size: 1rem;
//     margin-bottom: 30px;
//     resize: none;
//     outline: none;
// }

// /* Button Container */
// .buttonContainer {
//     display: flex;
//     justify-content: flex-end;
//     width: 100%;
//     padding: 0 16px;
// }

// /* Cancel Button */
// .cancelButton {
//     background-color: #fff;
//     color: #000;
//     border: 1px solid #ddd;
//     border-radius: 8px;
//     padding: 10px 20px;
//     font-size: 1rem;
//     margin-right: 10px;
//     cursor: pointer;
// }

// /* Save Button */
// .saveButton {
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 8px;
//     padding: 10px 20px;
//     font-size: 1rem;
//     cursor: pointer;
// }
