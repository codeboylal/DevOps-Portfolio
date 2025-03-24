// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './adminProfileHeader.module.css';
// import John from './John.png'
// // import EditProfileForm from './Edit Profile/editProfile'; // Import the EditForm component

// const AdminProfileHeader = () => {
//     const [profile, setProfile] = useState(null);
//     const [isEditFormVisible, setEditFormVisible] = useState(false);

//     useEffect(() => {
//         axios.get('${Base_URL}/api/adminProfile/66dc21979af3024e9834914a')
//             .then(response => {
//                 setProfile(response.data);
//             })
//             .catch(error => console.log(error));
//     }, []);

//     // Handler to open the Edit Form
//     const handleEditClick = () => {
//         setEditFormVisible(true);
//     };

//     // Handler to close the Edit Form
//     const handleCancelClick = () => {
//         setEditFormVisible(false);
//     };

//     if (!profile) return <div>Loading...</div>;

//     return (
//         <div className={styles.profileContainer}>
//             {/* Cover Picture */}
//             <div className={styles.coverPicture} style={{ backgroundImage: `url(${John})` }}>
//                 <button className={styles.updateCoverButton}>Update Cover</button>
//             </div>

//             {/* Profile Details */}
//             <div className={styles.profileDetails}>
//                 <div className={styles.profilePicture}>
//                     <img src={profile.profilePicture || John} alt={profile.name} />
//                     <div className={styles.completionRate}>
//                         <span>{profile.completion}%</span>
//                     </div>
//                 </div>

//                 {/* Profile Info */}
//                 <div className={styles.profileInfo}>
//                     <h2>{profile.name}</h2>
//                     <h5>{profile.role}</h5>
//                     <div className={styles.profileSubInfo}>
//                         <div className={styles.profileSubLeft}>
//                             <p>📧 {profile.email}</p>
//                             <p>📍 {profile.currentLocation}</p>
//                             <p>💰 {profile.currentSalary}</p>
//                         </div>
//                         <div className={styles.profileSubRight}>
//                             <p>🔒 {profile.totalExperienceYears} Years</p>
//                             <p>📞 {profile.availability}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Edit Profile Button */}
//                 <button className={styles.editProfileButton} onClick={handleEditClick}>Edit Profile</button>
//             </div>

//             {/* Edit Profile Form Modal */}
//             {isEditFormVisible && (
//                 <div className={styles.editFormOverlay}>
//                     <div className={styles.editProfileForm}>
//                         {/* <EditProfileForm profile={profile} onCancel={handleCancelClick} /> */}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default AdminProfileHeader;



















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './adminProfileHeader.module.css';
// import defaultProfileImage from './John.png'; // Default image

// const AdminProfileHeader = () => {
//     const [profile, setProfile] = useState(null);
//     const [isEditFormVisible, setEditFormVisible] = useState(false);
//     const [coverImage, setCoverImage] = useState('');

//     useEffect(() => {
//         // Fetch profile data
//         axios.get('${Base_URL}/api/adminProfile/66dc21979af3024e9834914a')
//             .then(response => {
//                 setProfile(response.data);
//                 setCoverImage(response.data.coverImage || defaultProfileImage); // Handle cover image
//             })
//             .catch(error => console.log(error));
//     }, []);

//     // Handle cover image update (stub function for now)
//     const handleUpdateCoverClick = () => {
//         alert('Cover update functionality is not yet implemented.');
//     };

//     // Handle opening of the Edit Form
//     const handleEditClick = () => {
//         setEditFormVisible(true);
//     };

//     // Handle closing of the Edit Form
//     const handleCancelClick = () => {
//         setEditFormVisible(false);
//     };

//     if (!profile) return <div>Loading...</div>;

//     // Format languages (if they are in array form)
//     const formattedLanguages = profile.languages ? profile.languages.join(', ') : 'N/A';

//     return (
//         <div className={styles.profileContainer}>
//             {/* Cover Picture */}
//             <div className={styles.coverPicture} style={{ backgroundImage: `url(${coverImage})` }}>
//                 <button className={styles.updateCoverButton} onClick={handleUpdateCoverClick}>Update Cover</button>
//             </div>

//             {/* Profile Details */}
//             <div className={styles.profileDetails}>
//                 <div className={styles.profilePicture}>
//                     <img src={profile.profilePicture || defaultProfileImage} alt={profile.name} />
//                     <div className={styles.completionRate}>
//                         <span>{profile.completion || 0}%</span>
//                     </div>
//                 </div>

//                 {/* Profile Info */}
//                 <div className={styles.profileInfo}>
//                     <h2>{profile.name}</h2>
//                     <h5>{profile.role}</h5>
//                     <div className={styles.profileSubInfo}>
//                         <div className={styles.profileSubLeft}>
//                             <p>📧 {profile.email}</p>
//                             <p>📍 {profile.currentLocation}</p>
//                             <p>💼 Company Size: {profile.companySize || 'N/A'}</p>
//                         </div>
//                         <div className={styles.profileSubRight}>
//                             <p>📞 {profile.contactNumber}</p>
//                             <p className={styles.profileLang}>🌐 Languages: {formattedLanguages}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Edit Profile Button */}
//                 <button className={styles.editProfileButton} onClick={handleEditClick}>Edit Profile</button>
//             </div>

//             {/* Edit Profile Form Modal */}
//             {isEditFormVisible && (
//                 <div className={styles.editFormOverlay}>
//                     <div className={styles.editProfileForm}>
//                         {/* Placeholder for Edit Form */}
//                         <button onClick={handleCancelClick}>Close</button>
//                         {/* Insert your EditProfileForm component here */}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdminProfileHeader;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAdminProfile from './Edit Profile/editAdminProfile'; // Import the EditAdminProfile component
import styles from './adminProfileHeader.module.css';
import defaultProfileImage from './John.png'; // Default image

const AdminProfileHeader = () => {
    const [profile, setProfile] = useState(null);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [coverImage, setCoverImage] = useState('');

    useEffect(() => {
        // Fetch profile data
        axios.get('${Base_URL}/api/adminProfile/66dc21979af3024e9834914a')
            .then(response => {
                setProfile(response.data);
                setCoverImage(response.data.coverImage || defaultProfileImage); // Handle cover image
            })
            .catch(error => console.log(error));
    }, []);

    // Handle opening of the Edit Form
    const handleEditClick = () => {
        setEditFormVisible(true);
    };

    // Handle closing of the Edit Form
    const handleCancelClick = () => {
        setEditFormVisible(false);
    };

    if (!profile) return <div>Loading...</div>;

    // Format languages (if they are in array form)
    const formattedLanguages = profile.languages ? profile.languages.join(', ') : 'N/A';

    return (
        <div className={styles.profileContainer}>
            {/* Cover Picture */}
            <div className={styles.coverPicture} style={{ backgroundImage: `url(${coverImage})` }}>
                <button className={styles.updateCoverButton} onClick={() => alert('Cover update not implemented.')}>Update Cover</button>
            </div>

            {/* Profile Details */}
            <div className={styles.profileDetails}>
                <div className={styles.profilePicture}>
                    <img src={profile.profilePicture || defaultProfileImage} alt={profile.name} />
                    <div className={styles.completionRate}>
                        <span>{profile.completion || 0}%</span>
                    </div>
                </div>

                {/* Profile Info */}
                <div className={styles.profileInfo}>
                    <h2>{profile.name}</h2>
                    <h5>{profile.role}</h5>
                    <div className={styles.profileSubInfo}>
                        <div className={styles.profileSubLeft}>
                            <p>📧 {profile.email}</p>
                            <p>📍 {profile.currentLocation}</p>
                            <p>💼 Company Size: {profile.companySize || 'N/A'}</p>
                        </div>
                        <div className={styles.profileSubRight}>
                            <p>📞 {profile.contactNumber}</p>
                            <p className={styles.profileLang}>🌐 Languages: {formattedLanguages}</p>
                        </div>
                    </div>
                </div>

                {/* Edit Profile Button */}
                <button className={styles.editProfileButton} onClick={handleEditClick}>Edit Profile</button>
            </div>

            {/* Edit Profile Form Modal */}
            {isEditFormVisible && (
                <div className={styles.editFormOverlay}>
                    <div className={styles.editProfileForm}>
                        {/* Render EditAdminProfile component with cancel button handler */}
                        <EditAdminProfile onCancel={handleCancelClick} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProfileHeader;
















// ProfileHeader.module.css
// .profileContainer {
//     width: 97%;
//     /* width: 1390px; */
//     border: 1px solid #ccc;
//     border-radius: 10px;
//     overflow: hidden;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// }

// .coverPicture {
//     position: relative;
//     height: 150px; /* Adjust height as needed */
//     background-size: cover;
//     background-position: center;
// }

// .updateCoverButton {
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     padding: 8px 12px;
//     background-color: white;
//     color: black;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
// }

// .updateCoverButton:hover {
//     background-color: rgba(0, 0, 0, 0.1);
// }

// .profileDetails {
//     display: flex;
//     flex-direction: column;
//     padding-left: 20px;
//     background-color: white;
//     height: 250px;
// }

// .profilePicture {
//     position: relative;
//     width: 120px;
//     height: 120px;
//     margin-top: -60px; /* Adjust to overlap the cover picture */
//     border-radius: 50%;
//     overflow: hidden;
//     border: 5px solid #ff4d4f;
//     background-color: black;
// }

// .profilePicture img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
// }

// .completionRate {
//     position: absolute;
//     bottom: 0;
//     left: 50%;
//     transform: translateX(-50%);
//     background-color: #ff4d4f;
//     color: white;
//     padding: 5px 10px;
//     border-radius: 20px;
//     font-size: 14px;
//     font-weight: bold;
// }

// .profileInfo {
//     flex-grow: 1;
//     margin-left: 30px;
// }

// .profileInfo h2 {
//     margin: 0;
//     font-size: 32px;
//     font-weight: 500;
// }

// .profileInfo h5 {
//     margin: 5px 0;
//     font-size: 16px;
//     color: #2A85FE;
// }

// .profileSubInfo {
//     display: flex;
//     justify-content: space-between;
//     margin-top: 10px;
//     width: 1100px;
// }

// .profileSubLeft p, 
// .profileSubRight p {
//     margin: 5px 0;
//     font-size: 16px;
//     color: #767676;
// }

// .editProfileButton {
//     background-color: #DEF0FF;
//     color: #2A85FE;
//     border: none;
//     padding: 8px 12px;
//     border-radius: 4px;
//     cursor: pointer;
//     font-size: 14px;
//     margin-left: auto;
// }

// .editProfileButton:hover {
//     background-color: #0056b3;
// }


// .editFormOverlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000; /* Ensure it’s on top of other content */
// }

// .profileLang{
//     padding: 10px;
// }