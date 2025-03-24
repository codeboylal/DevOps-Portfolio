// import React from "react";
// import styles from './FilterResultLayout.module.css';


// // icon
// import TuneIcon from '@mui/icons-material/Tune';
// import GridViewIcon from '@mui/icons-material/GridView';
// import { Box } from '@mui/material';


// import cx from 'classnames';
// import MostRecentFilter from "../Filter/Most Recent Filter/mostRecentFilter";

// function FilterResultLayout({page, setFilterValue, filterValue, coursesNumber, totalCourse, setFilterShow, filterShow, currentPage, setCurrentPage,mostRecentFilter}){
//     const formattedCoursesNumber = coursesNumber.toString().padStart(2, '0');

//     const handleFilterShowHide = () =>{
//         setFilterShow(!filterShow);
//         setCurrentPage(1);
//     }

//     return(
//         <div className={styles.topLineBelowNav}>
//             <div className={styles.filterButtonShowing} style={{gap: filterShow ? '223px' : '24px' }} >
//                 <div className={cx(styles.filterButton,styles.pointer)} onClick={handleFilterShowHide} style={{display:mostRecentFilter === true ? "none" : page === "accomplishments" ? 'none' :'' }}>
//                     <label className={styles.pointer}>
//                         Filter
//                     </label>
//                     <TuneIcon />
//                 </div>
//                 <div style={{ display:mostRecentFilter === true ? "block" : page === "accomplishments" ? 'none' :'none' }}>
//                     <MostRecentFilter filterValue={filterValue} setFilterValue={setFilterValue} />
//                 </div>
                
//                 <div className={styles.showingNumCourses}>
//                     <label style={{display: page === "accomplishments" ? 'none' : 'block'}}>
//                         Showing
//                     </label>
//                     <label style={{
//                         fontSize:'24px',
//                         fontWeight:'600',
//                         color:'#FF702D',
//                     }}>
//                         {formattedCoursesNumber > 8 ? '08' : formattedCoursesNumber}
//                     </label>
//                     <label>
//                         Courses
//                     </label>
//                     <label style={{
//                         fontSize:'12px',
//                         color:'#4B4B4B',
//                         display: page === "accomplishments" ? 'none' : 'block'
//                     }}>
//                         (Total {totalCourse})
//                     </label>
//                 </div>
//             </div>
//             <div className={styles.disFlexRow}>
//                 {/* <Box
//                     sx={{
//                         width: '36px',
//                         height: '36px',
//                         backgroundColor: '#FFE2D4',
//                         borderRadius: '3px',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                     >
//                     <Box
//                         sx={{
//                         width: '20px',
//                         height: '9px',
//                         border: '3px solid #FF6F2C',
//                         borderRadius: '3px',
//                         marginBottom: '3px',
//                         }}
//                     ></Box>
//                     <Box
//                         sx={{
//                         width: '20px',
//                         height: '9px',
//                         border: '3px solid #FF6F2C',
//                         borderRadius: '3px',
//                         }}
//                     ></Box>
//                     </Box> */}
//                     <Box
//                     sx={{
//                         width: '36px',
//                         height: '36px',
//                         borderRadius: '3px',
//                         display: 'flex',
//                         backgroundColor: '#FFE2D4',
//                         flexDirection: 'column',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                     className={styles.pointer}
//                     >
//                         <GridViewIcon style={{color:'#FF702D'}}/>
//                     </Box>
//             </div>
//         </div>
//     )
// }

// export default FilterResultLayout;































import React from "react";
import styles from './FilterResultLayout.module.css';

// icons
import TuneIcon from '@mui/icons-material/Tune';
import GridViewIcon from '@mui/icons-material/GridView';
import { Box } from '@mui/material';

import cx from 'classnames';
import MostRecentFilter from "../Filter/Most Recent Filter/mostRecentFilter";
import ToolTip from '../../Common Components/Tool Tip/toolTip'; // Import the custom Tooltip component

function FilterResultLayout({ page, setFilterValue, filterValue, coursesNumber, totalCourse, setFilterShow, filterShow, currentPage, setCurrentPage, mostRecentFilter }) {
    const formattedCoursesNumber = coursesNumber.toString().padStart(2, '0');

    const handleFilterShowHide = () => {
        setFilterShow(!filterShow);
        setCurrentPage(1);
    };

    return (
        <div className={styles.topLineBelowNav}>
            <div className={styles.filterButtonShowing} style={{ gap: filterShow ? '223px' : '24px' }}>
                <div className={cx(styles.filterButton, styles.pointer)} onClick={handleFilterShowHide} style={{ display: mostRecentFilter === true ? "none" : page === "accomplishments" ? 'none' : '' }}>
                    <label className={styles.pointer}>
                        Filter
                    </label>
                    <TuneIcon />
                </div>
                <div style={{ display: mostRecentFilter === true ? "block" : page === "accomplishments" ? 'none' : 'none' }}>
                    <MostRecentFilter filterValue={filterValue} setFilterValue={setFilterValue} />
                </div>

                <div className={styles.showingNumCourses}>
                    <label style={{ display: page === "accomplishments" ? 'none' : 'block' }}>
                        Showing
                    </label>
                    <label style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#FF702D',
                    }}>
                        {formattedCoursesNumber > 8 ? '08' : formattedCoursesNumber}
                    </label>
                    <label>
                        Courses
                    </label>
                    <label style={{
                        fontSize: '12px',
                        color: '#4B4B4B',
                        display: page === "accomplishments" ? 'none' : 'block'
                    }}>
                        (Total {totalCourse})
                    </label>
                </div>
            </div>
            <div className={styles.disFlexRow}>
                <ToolTip title="Grid View">
                    <Box
                        sx={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '3px',
                            display: 'flex',
                            backgroundColor: '#FFE2D4',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        className={styles.pointer}
                    >
                        <GridViewIcon style={{ color: '#FF702D' }} />
                    </Box>
                </ToolTip>
            </div>
        </div>
    );
}

export default FilterResultLayout;
