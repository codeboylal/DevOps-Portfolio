import React, { useEffect, useState } from "react";
import styles from './LowerContainer.module.css';

const LowerContainer = ({name, startDate, completionDate, moduleName}) => {

    // console.log(moduleName)

    const [completion , setCompletion] = useState('');

    useEffect(() => {
        if (completionDate) {
            let formattedDate = completionDate.split("-");
            formattedDate = formattedDate[1] + " " + formattedDate[0].padStart(2, '0') + ", " + formattedDate[2];
            setCompletion(formattedDate); 
        }
    }, [completionDate]);
    

    const [timeTaken, setTimeTaken] = useState('');

useEffect(() => {
    if (startDate && completionDate) {
        const monthNames = {
            January: 0,
            February: 1,
            March: 2,
            April: 3,
            May: 4,
            June: 5,
            July: 6,
            August: 7,
            September: 8,
            October: 9,
            November: 10,
            December: 11,
        };

        const startComponents = startDate.split('-');
        const completionComponents = completionDate.split('-');

        if (startComponents.length === 3 && completionComponents.length === 3) {
            const startDay = Number(startComponents[0]);
            const startMonth = monthNames[startComponents[1]];
            const startYear = Number(startComponents[2]);
            const completionDay = Number(completionComponents[0]);
            const completionMonth = monthNames[completionComponents[1]];
            const completionYear = Number(completionComponents[2]);

            const start = new Date(startYear, startMonth, startDay);
            const completion = new Date(completionYear, completionMonth, completionDay);

            if (!isNaN(start.getTime()) && !isNaN(completion.getTime())) {
                const diffInTime = completion - start;

                if (diffInTime < 0) {
                    setTimeTaken('Completion date is before the start date');
                } else {
                    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
                    setTimeTaken(`${diffInDays} days`);
                }
            } else {
                setTimeTaken('Invalid date format');
            }
        } else {
            setTimeTaken('Invalid date format');
        }
    }
}, [startDate, completionDate]);

    

    
    return(
        <div className={styles.container} style={{position:'relative'}}>
            <div>
                <label className={styles.completedBy}>
                    COMPLETED BY {name?.toUpperCase()}
                </label>
            </div>
            <div className={styles.bottomCompletedByDiv}>
                <div>
                    <label className={styles.completionDate}>
                        {completion}
                    </label>
                </div>
                <div>
                    <label className={styles.approx}>
                        Approximately {timeTaken} to  complete
                    </label>
                </div>
                <div style={{fontWeight:'500', position:'absolute',bottom:'24px'}} className={styles.courseCompletedDiv}>
                    <label className={styles.courseCompleted}>
                        {moduleName?.length>0?
                            "Course Certificates Completed" : "Course Certificate Completed"
                        }
                        
                    </label>
                    {moduleName?.slice(0, 6).map((item, index) => {
                        return (
                            <div key={index}>
                                <label>
                                    {item}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div> 
    )
}

export default LowerContainer;