// import React, { useEffect, useState } from "react";
// import styles from "./Education.module.css";

// // import material ui icons
// import EditIcon from '@mui/icons-material/Edit';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';

// import DeleteEducationPopUp from "./DeleteEducation/DeleteEducation";

// function Education({deletePopup,setDeletePopup, setSaveState,userData, setUserData, setShowHideEduPopup }) {

//     const [index, setIndex] = useState();

    
//     const [divState, setDivState] = useState(true);
//     const [ID, setID] = useState();
//     const [educationData, setEducationData] = useState(userData?.education || []); // State to store education data

    

//     useEffect(() => {
//         setID(localStorage.getItem("id"));
//     }, []);

//     useEffect(() => {
//         // Retrieve and parse the state from sessionStorage
//         const state = sessionStorage.getItem("EduDivState");
//         if (state !== null) {
//             setDivState(state === "true"); // Convert to boolean
//         } else {
//             sessionStorage.setItem("EduDivState", divState);
//         }
//     }, [divState]);

//     const handleToggle = () => {
//         const newState = !divState;
//         setDivState(newState);
//         sessionStorage.setItem("EduDivState", newState); // Store as string
//     };

//     // Re-run the effect each time userData changes
//     useEffect(() => {
//         setEducationData(userData?.education || []);
//     }, [userData]);



//     const editEducationItem = (index) => {
//         localStorage.setItem("EducationIndex", index);
//         localStorage.setItem("EducationData", JSON.stringify(educationData[index]))
//         setShowHideEduPopup(true);
//     };

//     return (
//         <div className={styles.eduDiv} style={{ transition: 'gap 0.2s ease-in-out' }}>
//             <div style={{ padding: '24px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <div>
//                     <label>Education</label>
//                 </div>
//                 <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
//                     <AddIcon onClick={() => setShowHideEduPopup(true)} className={styles.pointer} style={{ color: 'white', backgroundColor: '#f57c00', borderRadius: '50%' }} />
//                     <ExpandLessIcon onClick={() => {setDivState(!divState); handleToggle()}} className={styles.pointer} style={{ color: '#BDBDBD', display: divState ? 'none' : '' }} />
//                     <ExpandMoreIcon onClick={() => {setDivState(!divState); handleToggle()}} className={styles.pointer} style={{ color: '#BDBDBD', display: divState ? '' : 'none' }} />
//                 </div>
//             </div>
//             <div className={`${styles.content} ${divState ? styles.closed : styles.open}`}>
//                 {educationData && educationData.length > 0 ? (
//                     educationData.map((item, index) => (
//                         <div key={index} className={styles.eduItem}>
//                             <div>
//                                 <div>
//                                     <label>{item?.courseNameValue || "-"}</label>
//                                 </div>
//                                 <div>
//                                     <label>{item?.universityNameValue || "-"}</label>
//                                 </div>
//                                 <div style={{ color: '#767676', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//                                     <div>
//                                         <label>{item?.startDate || "-"}</label>
//                                     </div>
//                                     <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
//                                         <label>- {item?.endDate || "-"}</label>
//                                         <div style={{ height: '15px', width: '1.1px', backgroundColor: '#767676' }}></div>
//                                         <label>{item?.selectedValue || "-"}</label>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className={styles.visibleState} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
//                                 <EditIcon onClick={() => editEducationItem(index)} className={styles.pointer} style={{ color: '#f57c00' }} />
//                                 <DeleteIcon onClick={() => {setDeletePopup(true); setIndex(index)}} className={styles.pointer} style={{ color: '#f57c00' }} />
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p style={{ padding: '0px 24px 10px 24px', fontSize: '14px', color: 'black' }}>
//                         No Education Details are added
//                     </p>
//                 )}
//             </div>
//             <DeleteEducationPopUp setUserData={setUserData} setSaveState={setSaveState} ID={ID} index={index} deletePopup={deletePopup} setDeletePopup={setDeletePopup}/>
//         </div>
//     );
// }

// export default Education;





















import React, { useEffect, useState } from "react";
import styles from "./Education.module.css";

// Import Material-UI icons
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import DeleteEducationPopUp from "./DeleteEducation/DeleteEducation";
import NoDataFound from "../../../../Common Components/No Data Found/noDataFound"; // Import the NoDataFound component

function Education({ deletePopup, setDeletePopup, setSaveState, userData, setUserData, setShowHideEduPopup }) {
    const [index, setIndex] = useState();
    const [divState, setDivState] = useState(true);
    const [ID, setID] = useState();
    const [educationData, setEducationData] = useState(userData?.education || []); // State to store education data

    useEffect(() => {
        setID(localStorage.getItem("id"));
    }, []);

    useEffect(() => {
        // Retrieve and parse the state from sessionStorage
        const state = sessionStorage.getItem("EduDivState");
        if (state !== null) {
            setDivState(state === "true"); // Convert to boolean
        } else {
            sessionStorage.setItem("EduDivState", divState);
        }
    }, [divState]);

    const handleToggle = () => {
        const newState = !divState;
        setDivState(newState);
        sessionStorage.setItem("EduDivState", newState); // Store as string
    };

    // Re-run the effect each time userData changes
    useEffect(() => {
        setEducationData(userData?.education || []);
    }, [userData]);

    const editEducationItem = (index) => {
        localStorage.setItem("EducationIndex", index);
        localStorage.setItem("EducationData", JSON.stringify(educationData[index]));
        setShowHideEduPopup(true);
    };

    return (
        <div className={styles.eduDiv} style={{ transition: 'gap 0.2s ease-in-out' }}>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <label style={{fontWeight:'bold'}}>Education</label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <AddIcon onClick={() => setShowHideEduPopup(true)} className={styles.pointer} style={{ color: 'white', backgroundColor: '#f57c00', borderRadius: '50%' }} />
                    <ExpandLessIcon onClick={() => { setDivState(!divState); handleToggle(); }} className={styles.pointer} style={{ color: '#BDBDBD', display: divState ? 'none' : '' }} />
                    <ExpandMoreIcon onClick={() => { setDivState(!divState); handleToggle(); }} className={styles.pointer} style={{ color: '#BDBDBD', display: divState ? '' : 'none' }} />
                </div>
            </div>
            <div className={`${styles.content} ${divState ? styles.closed : styles.open}`}>
                {educationData && educationData.length > 0 ? (
                    educationData.map((item, index) => (
                        <div key={index} className={styles.eduItem}>
                            <div>
                                <div>
                                    <label>{item?.courseNameValue || "-"}</label>
                                </div>
                                <div>
                                    <label>{item?.universityNameValue || "-"}</label>
                                </div>
                                <div style={{ color: '#767676', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div>
                                        <label>{item?.startDate || "-"}</label>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                                        <label>- {item?.endDate || "-"}</label>
                                        <div style={{ height: '15px', width: '1.1px', backgroundColor: '#767676' }}></div>
                                        <label>{item?.selectedValue || "-"}</label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.visibleState} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                                <EditIcon onClick={() => editEducationItem(index)} className={styles.pointer} style={{ color: '#f57c00' }} />
                                <DeleteIcon onClick={() => { setDeletePopup(true); setIndex(index); }} className={styles.pointer} style={{ color: '#f57c00' }} />
                            </div>
                        </div>
                    ))
                ) : (
                    <NoDataFound message="" />
                )}
            </div>
            <DeleteEducationPopUp setUserData={setUserData} setSaveState={setSaveState} ID={ID} index={index} deletePopup={deletePopup} setDeletePopup={setDeletePopup} />
        </div>
    );
}

export default Education;
