import React, { useEffect, useState } from "react";

import styles from "./myCourses.module.css";
import cx from "classnames";

import { useToaster } from "../../Toaster"; 

// Icons and components import
import SidebarDashboard from "../../Common Components/SideBar Dashboard/sideBarDashboard";
import HeaderDashboardPage from "../../Common Components/Header Dashboard Page/headerDashboardPage";
import LoadingSpinner from "../../Common Components/Loader/Loader";
import { GetUserDetails } from "../../services/Tasks/getTasks";
import StartCourseCard from "../../Common Components/Course Cards Component/Start Course Card/startCourseCard";
import GoToCourseCard from "../../Common Components/Course Cards Component/Go To Course Card/goToCourseCard";
import ProgressCourseCard from "../../Common Components/Course Cards Component/Progress Course Card/progressCourseCard";
import { updateProgressOfCourse } from "../../services/Courses/startToProgressCourse";
import PaginationComponent from "../../Common Components/Pagination Component/paginationComponent";// Assuming this is your pagination component

function MyCourses() {
    const showToaster = useToaster();

    const [id, setId] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 6;
    const [isLoading, setIsLoading] = useState(false);


    const [searchValue, setSearchValue] = useState('');



    useEffect(() => {
        setId(localStorage.getItem("id"));
        localStorage.removeItem("selectedModule");
    }, []);

    useEffect(() => {
        if (id) {
            setIsLoading(true)
            const UserId = id;
            GetUserDetails(UserId)
                .then(response => {
                    if(searchValue?.length > 0){
                        setCourses(response?.data?.data?.[0]?.continueWatching.filter(course =>
                            course.title.toLowerCase().startsWith(searchValue.toLowerCase())))
                    }else{
                        setCourses(response?.data?.data?.[0]?.continueWatching || []);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            setIsLoading(false)
        }
    }, [id, searchValue]);

    useEffect(() => {
        // Filter courses based on activeTab and paginate
        const filtered = courses.filter(item => {
            if (activeTab === 0) return true; // All courses
            if (activeTab === 1) return item.progress > 0 && item.progress < 100; // In progress
            if (activeTab === 2) return item.progress === 100; // Completed
            return false;
        });

        setFilteredCourses(filtered);
        setCurrentPage(1); // Reset to the first page when filters change
    }, [courses, activeTab]);

    const handleStartCourse = async (UserId, courseId) => {
        updateProgressOfCourse({
            id: UserId,
            courseId
        })
            .then(response => {
                setCourses(response?.data?.data || []);
            })
            .catch(err => {
                console.log(err);
            });
    };

    // Calculate the index of the last course on the current page
    const lastCourseIndex = currentPage * coursesPerPage;
    // Calculate the index of the first course on the current page
    const firstCourseIndex = lastCourseIndex - coursesPerPage;
    // Get the courses to display for the current page
    const currentCourses = filteredCourses.slice(firstCourseIndex, lastCourseIndex);
    // Calculate total pages
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    return (
        <div className={styles.container} style={{ display: "flex" }}>
            <SidebarDashboard page={"myCourses"} />
            <div className={styles.contentContainer}>
                <HeaderDashboardPage 
                    on_change={e => setSearchValue(e.target.value)}
                    searchValue={searchValue}
                    pageText={"My Courses"}
                    AppBarText={"Your Success Path Begins Here."}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                />
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className={styles.containerContact}>
                        <div className={styles.coursesDiv}>
                            {currentCourses.map((item, index) => (
                                <div key={index}>
                                    {item?.progress === 0 && activeTab === 0 && (
                                        <StartCourseCard
                                            course={item}
                                            progress={0}
                                            onStartCourse={() => {
                                                handleStartCourse(id, item?.courseId);
                                            }}
                                        />
                                    )}
                                    {item?.progress === 100 && (activeTab === 2 || activeTab === 0) && (
                                        <GoToCourseCard course={item} />
                                    )}
                                    {item?.progress < 100 &&
                                        (activeTab === 0 || activeTab === 1) &&
                                        item?.progress > 0 && (
                                            <ProgressCourseCard course={item} />
                                        )}
                                </div>
                            ))}
                            {
                                (currentCourses?.length === 0 && searchValue?.length > 0) ?
                                <div> 
                                    No course found, clear the search bar
                                </div>
                            : currentCourses?.length === 0 &&
                                <div>
                                    You have not enrolled in any course , Enroll a course first.
                                </div>
                            }
                        </div>
                        <div style={{display: totalPages <= 1 && 'none'}}>
                            <PaginationComponent
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyCourses;
