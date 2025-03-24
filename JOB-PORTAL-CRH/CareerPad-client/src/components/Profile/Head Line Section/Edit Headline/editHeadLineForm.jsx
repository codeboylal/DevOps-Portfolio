import React, { useState } from 'react';
import axios from 'axios';
import styles from './editHeadlineForm.module.css';
import {useToaster} from '../../../Toaster';
import { TextField } from '@mui/material';

import { Base_URL } from '../../../../const/const';
const EditHeadlineForm = ({ onClose, onSave, currentHeadline, onHeadlineChange }) => {
    const [headline, setHeadline] = useState(currentHeadline);
    const setToast = useToaster()
    // const [toast, setToast] = useState({ message: '', type: '' });
    const [wordCount, setWordCount] = useState(currentHeadline?.length);
    const [isWordLimitExceeded, setIsWordLimitExceeded] = useState(false);

    const handleHeadlineChange = (e) => {
        const inputHeadline = e.target.value;
        const words = inputHeadline?.length;
        const wordLimit = 400;

        if (words <= wordLimit) {
            setHeadline(inputHeadline);
            setWordCount(words);
            setIsWordLimitExceeded(false);
            onHeadlineChange(inputHeadline); // Update the popUpHeadline state in the parent
        } else {
            setIsWordLimitExceeded(true);
            setToast('You cannot exceed 400 Characters', 'error' );
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();
        if (isWordLimitExceeded) {
            setToast( 'You cannot exceed 400 Characters', 'error' );
            return;
        }
        try {
            const id = localStorage.getItem('id');
            const response = await axios.put(`${Base_URL}/api/profile/headline/${id}`, { headline });
            onSave(response.data.profile.headline);
            
            setToast( 'Headline updated successfully',  'success' );
        } catch (error) {
            setToast('Error updating Headline', 'error' );
        }
    };

    return (
        <div>
            <div className={styles.modalContainer}>
                <form onSubmit={handleSave} className={styles.formContainer}>
                    <h2 className={styles.formTitle}>Headline</h2>
                    <TextField
                    variant="outlined"
                    className={styles.textArea}
                    value={headline}
                    label="Enter your headline here..."
                    placeholder="Enter your headline here..."
                    onChange={handleHeadlineChange}
                    multiline
                    rows={7}
                    InputLabelProps={{
                        shrink: !!headline,
                        style: {
                        color: headline ? 'black' : '#aaa', // Default color if there is text
                        },
                    }}
                    InputProps={{
                        style: {
                        borderColor: '#ddd', // Default border color
                        height: '190px',
                        overflow: 'hidden',
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ddd',  // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: '#ddd',  // Keep the border color the same on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'black',  // Change border color to red when focused
                        },
                        },
                        '& .MuiInputLabel-root': {
                        color: 'black', // Default label color
                        },
                        '& .Mui-focused .MuiInputLabel-root': {
                        color: 'red', // Change label color to red when focused
                        },
                    }}
                    />

                    <div className={styles.wordCount} style={{paddingTop:'10px'}}>
                        {wordCount}/400 Characters
                    </div>
                    <div className={styles.buttonContainer}>
                        <button 
                            type="submit" 
                            className={styles.saveButton} 
                            disabled={isWordLimitExceeded}
                        >
                            Save
                        </button>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* {toast?.message?.length > 0 && (
                <Toaster
                    message={toast.message}
                    type={toast.type}
                    // onClose={() => setToast({ message: '', type: '' })}
                />
            )} */}
        </div>
    );
};

export default EditHeadlineForm;