import React, { useState } from 'react';
import styles from './editAdminCompanyInfo.module.css'; // Updated CSS module

const EditCompanyProfile = ({ onCancel }) => {
    const [formData, setFormData] = useState({
        organizationName: '',
        industryType: '',
        website: '',
        phoneNumber: '',
        address: '',
        founded: '',
        companySize: '',
    });

    const companySizes = ['0-10', '10-50', '50-100', '100-1000', '1000-5000'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCompanySizeClick = (size) => {
        setFormData({ ...formData, companySize: size });
    };

    const handleSave = async () => {
        try {
            const response = await fetch('${Base_URL}/api/adminprofile/66dc21979af3024e9834914a', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Company profile updated successfully');
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            alert('Error updating company profile');
        }
    };

    return (
        <div className={styles.container}>
            <h2>Company Info</h2>
            <input 
                type="text" 
                name="organizationName" 
                placeholder="Organization Name" 
                value={formData.organizationName} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="industryType" 
                placeholder="Industry Type" 
                value={formData.industryType} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="website" 
                placeholder="Website" 
                value={formData.website} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="phoneNumber" 
                placeholder="Phone Number" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="address" 
                placeholder="Address" 
                value={formData.address} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="founded" 
                placeholder="Founded" 
                value={formData.founded} 
                onChange={handleChange} 
            />

            <div>
                <label>Company Size</label>
                <div className={styles.companySizeButtons}>
                    {companySizes.map((size) => (
                        <button 
                            key={size}
                            className={formData.companySize === size ? styles.activeSizeButton : ''}
                            onClick={() => handleCompanySizeClick(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.buttons}>
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditCompanyProfile;











// .container {
//     padding: 30px;
//     background-color: white;
//     border-radius: 12px;
//     max-width: 500px;
//     margin: 50px auto;
//     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//     font-family: 'Arial', sans-serif;
// }

// h2 {
//     color: #007BFF; /* Matching the blue heading in the UI */
//     font-size: 24px;
//     margin-bottom: 20px;
// }

// input {
//     display: block;
//     width: 100%;
//     padding: 10px;
//     margin: 10px 0;
//     border-radius: 6px;
//     border: 1px solid #ccc;
//     font-size: 16px;
// }

// input::placeholder {
//     color: #999;
// }

// .companySizeButtons {
//     display: flex;
//     gap: 10px;
//     margin-top: 15px;
// }

// .companySizeButtons button {
//     background-color: white;
//     border: 1px solid #ccc;
//     padding: 8px 15px;
//     border-radius: 20px;
//     cursor: pointer;
//     font-size: 14px;
//     transition: border-color 0.3s ease;
// }

// .companySizeButtons button:hover {
//     border-color: #007BFF;
// }

// .activeSizeButton {
//     border-color: #007BFF;
//     background-color: #E6F0FF;
//     color: #007BFF;
// }

// .buttons {
//     display: flex;
//     justify-content: space-between;
//     margin-top: 20px;
// }

// button {
//     padding: 10px 20px;
//     border-radius: 5px;
//     font-size: 16px;
//     cursor: pointer;
// }

