import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";

// loader
import Loader from "../../components/loader/loader";
import Scrollbar from "../../components/scrollBar/scrollBar.jsx";

import InstructorComponent from "../../components/container/Instructor/Instructor";
import OrangeCards from "../../components/container/OrangeCards/OrangeCards";
import NotificationComponent from "../../components/container/Notification/Notification.jsx";
import CourseCard from "../../components/container/course-card/courseCard.jsx";
import {
  getUserCourseData,
  getUserNotificationData,
} from "../../services/user/getUser.jsx";
import { getUserInstrutorData } from "../../services/user/getUser.jsx";
import LowerSection from "../coursePreview/sections/lowerSection/lowerSection.jsx";

function Dashboard() {
  const courses = [
    {
      image: "https://via.placeholder.com/150",
      title: "PHP Advanced",
      description:
        "Advance PHP Knowledge with JS to make smart web applications.",
      progress: 9,
      totalLessons: 20,
    },
    {
      image: "https://via.placeholder.com/150",
      title: "React Mastery",
      description: "Master React and build real-world applications.",
      progress: 12,
      totalLessons: 30,
    },

    {
      image: "https://via.placeholder.com/150",
      title: "React Mastery",
      description: "Master React and build real-world applications.",
      progress: 12,
      totalLessons: 30,
    },

    {
      image: "https://via.placeholder.com/150",
      title: "React Mastery",
      description: "Master React and build real-world applications.",
      progress: 12,
      totalLessons: 30,
    },

    {
      image: "https://via.placeholder.com/150",
      title: "React Mastery",
      description: "Master React and build real-world applications.",
      progress: 12,
      totalLessons: 30,
    },
  ];

  const [isLoading, setIsloading] = useState(false);

  const [userId] = useState(localStorage.getItem("profileId") || "");

  const [courseData, setCourseData] = useState({});
  const [instructorData, setInstructorData] = useState([]);
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    if (userId) {
      getUserCourseData({ profileId: userId })
        .then((res) => {
          setCourseData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
      getUserInstrutorData({ profileId: userId })
        .then((res) => {
          setInstructorData(res?.data?.data || []);
        })
        .catch((err) => {
          console.log(err);
        });
      getUserNotificationData({ profileId: userId })
        .then((res) => {
          setNotificationData(res?.data?.data || []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  return (
    <Scrollbar height={"100vh"}>
      <div className={styles.container}>
        <div className="w-full">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[24px] p-[24px] ">
                {Array.from({ length: 4 }, (_, index) => (
                  <OrangeCards
                    key={index}
                    title={
                      index === 0
                        ? "Total Courses"
                        : index === 1
                        ? "Under Review"
                        : index === 2
                        ? "Completed"
                        : "Active"
                    }
                    number={
                      index === 0
                        ? courseData?.total
                        : index === 1
                        ? courseData?.review
                        : index === 2
                        ? courseData?.completed
                        : index === 3
                        ? courseData?.active
                        : 0
                    }
                  />
                ))}
              </div>
            </>
          )}
          <div className="gap-[24px] w-full  xl:flex lg:flex mb-[24px]">
            <div className="lg:w-[70%] w-full">
              <h1 className="text-xl font-semibold p-4">My Notificatons</h1>
              <NotificationComponent
                notificationData={notificationData}
                showNotification={true}
              />
            </div>
            <div className="mt-10 lg:mt-0 lg:w-[30%]">
              <h1 className="text-xl font-semibold p-4">My Instructors</h1>
              <InstructorComponent instructorsData={instructorData} />
            </div>
          </div>

          <LowerSection />
        </div>
      </div>
    </Scrollbar>
  );
}

export default Dashboard;
