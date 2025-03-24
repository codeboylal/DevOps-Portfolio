import React from "react";
import styles from './Instructor.module.css';

//Mui See All button
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';

//Sample Pic 
// import sampleDP from '../../../pages/dashboard/images/sample_profile_pic.png';

import Base_URL from "../../../const/const";

function InstructorComponent({instructorsData}){

//     const ColorButton = styled(Button)(({ theme }) => ({
//         color: "#FF702D",
//         backgroundColor: '#FFEAE1',
//         '&:hover': {
//           backgroundColor: '#FF702D',
//         },
//       }));
    return(
        <div className={styles.instructorDiv}>
            {instructorsData?.length === 0 ? <div>
                    There are no courses Enrolled. Enroll a course to see instructor list.
                </div>
                :
                    <div>
                    {instructorsData.map((item, index) => {
                    return index < 4 ? (
                    <div className={styles.instructorItem} key={index}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center' ,gap:'10px'}}>
                        <img className={styles.imgDesInstructor} src={`${Base_URL}/uploads/Instructors/${item[2]}.png`} alt={`${item[2]}'s profile`} />
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <label style={{ color: '#4B4B4B', fontWeight: '500', fontSize: '18px' }}>
                            {item[0]}
                            </label>
                            <label style={{ color: '#7A7E86', fontWeight: '500', fontSize: '12px' }}>
                            {item[1]}
                            </label>
                        </div>
                        </div>
                        <div style={{ display: index === 3 ? 'none' :  'block',height:'.1px' ,backgroundColor: '#D8D8D8', marginBottom: '12px' }} />
                    </div>
                    ) : null;
                    })}
                    <button className={styles.instructorSeeAll}>
                        See All
                    </button>
                    </div>
                }
        </div>
    )
}
export default InstructorComponent;