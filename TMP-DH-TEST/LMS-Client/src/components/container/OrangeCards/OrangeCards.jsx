import React from "react";
import styles from "./OrangeCards.module.css";

function OrangeCards({courseData}){
    return(
        <div className={styles.courseDiv}>
            {courseData.map((item, index) => {
            const displayString = String(item[1]);
            const formattedString = displayString.length === 1 ? `0${displayString}` : displayString;

            return (
                <div className={styles.courseItemDiv} key={index}>
                    <label className={styles.courseHeadingLabel}>
                        {item[0]} 
                    </label>
                    <div className={styles.courseMidDiv}>
                        {formattedString}
                    </div>
                </div>
            );
            })}

        </div>
    )
}

export default OrangeCards;









// import React, { useEffect, useState } from "react";
// import { GetUserToDoDetails } from "../../../services/Tasks/getTasks"; // Update with actual path to the API function
// import OrangeCards from "./OrangeCards";

// function Dashboard({ userId }) {
//   const [courseData, setCourseData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchCourses() {
//       try {
//         setLoading(true);
//         const response = await GetUserToDoDetails(userId);
//         if (response?.data) {
//           // Assuming response.data contains the required format: [[label, count], [label, count], ...]
//           setCourseData(response.data);
//         } else {
//           throw new Error("Invalid response format");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (userId) {
//       fetchCourses();
//     }
//   }, [userId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return <OrangeCards courseData={courseData} />;
// }

// export default Dashboard;
