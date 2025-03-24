// import React, { useEffect, useState } from "react";
// import styles from "./Bio.module.css";

// import EditIcon from '@mui/icons-material/Edit';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// function Bio({userData, setShowHidePopup,showHidePopup }) {
//     const [divState, setDivState] = useState(false);
//     useEffect(() => {
//         try {
//             // Retrieve and parse the value from sessionStorage
//             const storedState = sessionStorage.getItem("BioDivState");
//             if (storedState !== null) {
//                 setDivState(storedState === "true"); // Convert to boolean
//             } else {
//                 sessionStorage.setItem("BioDivState", false);
//             }
//         } catch (error) {
//             console.error("Error accessing sessionStorage", error);
//             setDivState(true); // Default to true in case of error
//         }
//     }, [divState]);

//     const handleToggle = () => {
//         const newState = !divState;
//         setDivState(newState);
//         sessionStorage.setItem("BioDivState", newState);
//     };

//     return (
//         <div className={styles.bioDiv} style={{gap:divState? '': '16px', transition: 'gap 0.2s ease-in-out'}}>
//             <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <div>
//                     <label>
//                         Bio
//                     </label>
//                 </div>
//                 <div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'5px'}}>
//                     <EditIcon onClick={()=>{ setShowHidePopup(!showHidePopup)}} className={styles.pointer} style={{ color: '#f57c00' }} />
//                     <ExpandLessIcon onClick={() => {setDivState(!divState); handleToggle()}} className={styles.pointer} style={{ color: '#BDBDBD', display: divState ? 'none' : '' }} />
//                     <ExpandMoreIcon onClick={() => {setDivState(!divState); handleToggle()}} className={styles.pointer} style={{ color: '#BDBDBD', display: divState ? '' : 'none' }} />
//                 </div>
//             </div>
//             <div className={`${styles.content} ${divState ? styles.closed : styles.open}`}>
//             <label
//                 className={styles.bioDesc}
//                 dangerouslySetInnerHTML={{
//                     __html: userData?.bio?.length ? userData.bio : 'No Bio Added'
//                 }}
//             />
//             </div>
//         </div>
//     );
// }

// export default Bio;










































import React, { useEffect, useState } from "react";
import styles from "./Bio.module.css";
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NoDataFound from '../../../../Common Components/No Data Found/noDataFound'; // Import the NoDataFound component

function Bio({ userData, setShowHidePopup, showHidePopup }) {
    const [divState, setDivState] = useState(false);

    useEffect(() => {
        try {
            // Retrieve and parse the value from sessionStorage
            const storedState = sessionStorage.getItem("BioDivState");
            if (storedState !== null) {
                setDivState(storedState === "true"); // Convert to boolean
            } else {
                sessionStorage.setItem("BioDivState", false);
            }
        } catch (error) {
            console.error("Error accessing sessionStorage", error);
            setDivState(true); // Default to true in case of error
        }
    }, [divState]);

    const handleToggle = () => {
        const newState = !divState;
        setDivState(newState);
        sessionStorage.setItem("BioDivState", newState);
    };

    // Check if userData or bio is missing
    const isDataAvailable = userData?.bio?.length > 0;

    return (
        <div className={styles.bioDiv} style={{ gap: divState ? '' : '16px', transition: 'gap 0.2s ease-in-out' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <label style={{fontWeight:'bold'}}>Bio</label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <EditIcon onClick={() => { setShowHidePopup(!showHidePopup); }} className={styles.pointer} style={{ color: '#f57c00' }} />
                    <ExpandLessIcon onClick={() => { setDivState(!divState); handleToggle(); }} className={styles.pointer} style={{ color: '#BDBDBD', display: divState ? 'none' : '' }} />
                    <ExpandMoreIcon onClick={() => { setDivState(!divState); handleToggle(); }} className={styles.pointer} style={{ color: '#BDBDBD', display: divState ? '' : 'none' }} />
                </div>
            </div>
            
            {/* Conditionally render the content or NoDataFound component */}
            <div className={`${styles.content} ${divState ? styles.closed : styles.open}`}>
                {isDataAvailable ? (
                    <label
                        className={styles.bioDesc}
                        dangerouslySetInnerHTML={{ __html: userData.bio }}
                    />
                ) : (
                    <NoDataFound message="" />
                )}
            </div>
        </div>
    );
}

export default Bio;
