// import React, { useState } from 'react';
// import styles from './editAdminProfile.module.css'; // CSS module for styling

// const EditAdminProfile = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phoneNumber: '',
//         location: '',
//         jobRole: '',
//         languages: ['Hindi', 'English'], // predefined languages
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const removeLanguage = (index) => {
//         const updatedLanguages = formData.languages.filter((_, i) => i !== index);
//         setFormData({ ...formData, languages: updatedLanguages });
//     };

//     const handleSave = async () => {
//         // const adminId = '66dc21979af3024e9834914a'; // hardcoded admin ID

//         try {
//             const response = await fetch('${Base_URL}/api/adminProfile/66dc21979af3024e9834914a' , {
//                 method: 'PUT', // Change to PUT for update
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 alert('Profile updated successfully');
//             } else {
//                 alert('Failed to update profile');
//             }
//         } catch (error) {
//             alert('Error updating profile');
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <h2>Edit Profile</h2>
//             <input 
//                 type="text" 
//                 name="name" 
//                 placeholder="Name" 
//                 value={formData.name} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="email" 
//                 name="email" 
//                 placeholder="Email" 
//                 value={formData.email} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="text" 
//                 name="phoneNumber" 
//                 placeholder="Phone Number" 
//                 value={formData.phoneNumber} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="text" 
//                 name="location" 
//                 placeholder="Location" 
//                 value={formData.location} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="text" 
//                 name="jobRole" 
//                 placeholder="Job Role" 
//                 value={formData.jobRole} 
//                 onChange={handleChange} 
//             />
//             <div>
//                 <label>Language</label>
//                 <input 
//     type="text" 
//     name="languages" 
//     placeholder="Languages" 
//     value={formData.languages.join(', ')} // Join the array for display purposes
//     onChange={(e) => setFormData({ ...formData, languages: e.target.value.split(', ') })} // Split by comma to convert back to array
// />

//                 <div className={styles.languageTags}>
//                     {formData.languages.map((lang, index) => (
//                         <span key={index} className={styles.languageTag}>
//                             {lang} <button onClick={() => removeLanguage(index)}>X</button>
//                         </span>
//                     ))}
//                 </div>
//             </div>
//             <div className={styles.buttons}>
//                 <button onClick={handleSave}>Save</button>
//                 <button onClick={() => alert('Cancel')}>Cancel</button>
//             </div>
//         </div>
//     );
// };

// export default EditAdminProfile ;










// import React, { useState } from 'react';
// import styles from './editAdminProfile.module.css'; // CSS module for styling

// const EditAdminProfile = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phoneNumber: '',
//         location: '',
//         jobRole: '',
//         languages: [], // Empty initially, to add dynamically
//     });

//     const predefinedLanguages = ['Hindi', 'English'];

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const addLanguage = (language) => {
//         if (!formData.languages.includes(language)) {
//             setFormData({ ...formData, languages: [...formData.languages, language] });
//         }
//     };

//     const removeLanguage = (index) => {
//         const updatedLanguages = formData.languages.filter((_, i) => i !== index);
//         setFormData({ ...formData, languages: updatedLanguages });
//     };

//     const handleSave = async () => {
//         try {
//             const response = await fetch('${Base_URL}/api/adminProfile/66dc21979af3024e9834914a', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 alert('Profile updated successfully');
//             } else {
//                 alert('Failed to update profile');
//             }
//         } catch (error) {
//             alert('Error updating profile');
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <h2>Edit Profile</h2>
//             <input 
//                 type="text" 
//                 name="name" 
//                 placeholder="Name" 
//                 value={formData.name} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="email" 
//                 name="email" 
//                 placeholder="Email" 
//                 value={formData.email} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="text" 
//                 name="phoneNumber" 
//                 placeholder="Phone Number" 
//                 value={formData.phoneNumber} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="text" 
//                 name="location" 
//                 placeholder="Location" 
//                 value={formData.location} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="text" 
//                 name="jobRole" 
//                 placeholder="Job Role" 
//                 value={formData.jobRole} 
//                 onChange={handleChange} 
//             />

//             <div>
//                 <label>Languages</label>
//                 <div className={styles.predefinedLanguages}>
//                     {predefinedLanguages.map((lang, index) => (
//                         <button key={index} onClick={() => addLanguage(lang)}>
//                             {lang}
//                         </button>
//                     ))}
//                 </div>

//                 <div className={styles.languageTags}>
//                     {formData.languages.map((lang, index) => (
//                         <span key={index} className={styles.languageTag}>
//                             {lang} <button onClick={() => removeLanguage(index)}>X</button>
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             <div className={styles.buttons}>
//                 <button onClick={handleSave}>Save</button>
//                 <button onClick={() => alert('Cancel')}>Cancel</button>
//             </div>
//         </div>
//     );
// };

// export default EditAdminProfile;













// import React, { useState } from 'react';
// import styles from './editAdminProfile.module.css'; // CSS module for styling

// const EditAdminProfile = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phoneNumber: '',
//         currentLocation: '',
//         jobRole: '',
//         languages: [], // Empty initially, to add dynamically
//     });

//     const [newLanguage, setNewLanguage] = useState('');

//     const predefinedLanguages = ['Hindi', 'English'];

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const addLanguage = (language) => {
//         if (!formData.languages.includes(language) && language.trim() !== "") {
//             setFormData({ ...formData, languages: [...formData.languages, language] });
//             setNewLanguage(''); // Clear the input after adding the language
//         }
//     };

//     const removeLanguage = (index) => {
//         const updatedLanguages = formData.languages.filter((_, i) => i !== index);
//         setFormData({ ...formData, languages: updatedLanguages });
//     };

//     const handleSave = async () => {
//         try {
//             const response = await fetch('${Base_URL}/api/adminProfile/66dc21979af3024e9834914a', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 alert('Profile updated successfully');
//             } else {
//                 alert('Failed to update profile');
//             }
//         } catch (error) {
//             alert('Error updating profile');
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <h2>Edit Profile</h2>
//             <input 
//                 type="text" 
//                 name="name" 
//                 placeholder="Name" 
//                 value={formData.name} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="email" 
//                 name="email" 
//                 placeholder="Email" 
//                 value={formData.email} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="text" 
//                 name="phoneNumber" 
//                 placeholder="Phone Number" 
//                 value={formData.phoneNumber} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="text" 
//                 name="location" 
//                 placeholder="Location" 
//                 value={formData.currentLocation} 
//                 onChange={handleChange} 
//             />
//             <input 
//                 type="text" 
//                 name="jobRole" 
//                 placeholder="Job Role" 
//                 value={formData.jobRole} 
//                 onChange={handleChange} 
//             />

//             <div>
//                 <label>Languages</label>
//                 <div className={styles.predefinedLanguages}>
//                     {predefinedLanguages.map((lang, index) => (
//                         <button key={index} onClick={() => addLanguage(lang)}>
//                             {lang}
//                         </button>
//                     ))}
//                 </div>

//                 <div className={styles.addLanguage}>
//                     <input 
//                         type="text" 
//                         value={newLanguage} 
//                         placeholder="Type a language and add" 
//                         onChange={(e) => setNewLanguage(e.target.value)} 
//                     />
//                     <button onClick={() => addLanguage(newLanguage)}>Add Language</button>
//                 </div>

//                 <div className={styles.languageTags}>
//                     {formData.languages.map((lang, index) => (
//                         <span key={index} className={styles.languageTag}>
//                             {lang} <button onClick={() => removeLanguage(index)}>X</button>
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             <div className={styles.buttons}>
//                 <button onClick={handleSave}>Save</button>
//                 <button onClick={() => alert('Cancel')}>Cancel</button>
//             </div>
//         </div>
//     );
// };

// export default EditAdminProfile;










import React, { useState } from 'react';
import styles from './editAdminProfile.module.css'; // CSS module for styling

const EditAdminProfile = ({ onCancel })  => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        currentLocation: '', // Match this with the input field
        jobRole: '',
        languages: [], // Empty initially, to add dynamically
    });

    const [newLanguage, setNewLanguage] = useState('');

    const predefinedLanguages = ['Hindi', 'English'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addLanguage = (language) => {
        if (!formData.languages.includes(language) && language.trim() !== "") {
            setFormData({ ...formData, languages: [...formData.languages, language] });
            setNewLanguage(''); // Clear the input after adding the language
        }
    };

    const removeLanguage = (index) => {
        const updatedLanguages = formData.languages.filter((_, i) => i !== index);
        setFormData({ ...formData, languages: updatedLanguages });
    };

    const handleSave = async () => {
        try {
            const response = await fetch('${Base_URL}/api/adminProfile/66dc21979af3024e9834914a', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Profile updated successfully');
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            alert('Error updating profile');
        }
    };

    return (
        <div className={styles.container}>
            <h2>Edit Profile</h2>
            <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={formData.name} 
                onChange={handleChange} 
            />
            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email} 
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
                name="currentLocation" // Changed this to match state property
                placeholder="Location" 
                value={formData.currentLocation} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="jobRole" 
                placeholder="Job Role" 
                value={formData.jobRole} 
                onChange={handleChange} 
            />

            <div>
                <label>Languages</label>
                <div className={styles.predefinedLanguages}>
                    {predefinedLanguages.map((lang, index) => (
                        <button key={index} onClick={() => addLanguage(lang)}>
                            {lang}
                        </button>
                    ))}
                </div>

                <div className={styles.addLanguage}>
                    <input 
                        type="text" 
                        value={newLanguage} 
                        placeholder="Type a language and add" 
                        onChange={(e) => setNewLanguage(e.target.value)} 
                    />
                    <button onClick={() => addLanguage(newLanguage)}>Add Language</button>
                </div>

                <div className={styles.languageTags}>
                    {formData.languages.map((lang, index) => (
                        <span key={index} className={styles.languageTag}>
                            {lang} <button onClick={() => removeLanguage(index)}>X</button>
                        </span>
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

export default EditAdminProfile;
