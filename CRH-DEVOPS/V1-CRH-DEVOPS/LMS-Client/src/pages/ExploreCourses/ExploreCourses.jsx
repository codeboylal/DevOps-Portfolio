import React, { useState, useEffect } from "react";
import styles from './ExploreCourses.module.css';
import FilterResultLayout from "../../components/FilterResultLayout/FilterResultLayout";
import FilterSection from "../../components/filterSection/filterSection";
import { getExploreCourses } from "../../services/Courses/GetCourses.js";
import EnrollCourseCard from "../../Common Components/Course Cards Component/Enroll Course/enrollCourse.jsx";
import PaginationComponent from "../../Common Components/Pagination Component/paginationComponent.jsx";
import LoadingSpinner from "../../Common Components/Loader/Loader.jsx";
import SidebarDashboard from "../../Common Components/SideBar Dashboard/sideBarDashboard.jsx";
import HeaderDashboardPage from "../../Common Components/Header Dashboard Page/headerDashboardPage.jsx";
import SuccessModal from "../../components/container/Success Modal/successModal.jsx";
import { courseReviewAdmin } from "../../services/Courses/purchaseCourses.js";

import {useToaster} from "../../Toaster.js"

function ExploreCourses() {
    const setToast = useToaster();
    const [userId, setUserId] = useState("")
    const [refreshCards , setRefreshCards] = useState(true)
    const [isLoading , setIsLoading] = useState(false);
    const [courses, setCourse] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filterShow , setFilterShow] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = filterShow ? 4 : 6; // Set the number of courses per page

    useEffect(()=>{
        setUserId(localStorage.getItem("id"))
    },[])


    useEffect(() => {
        async function getCourseDetails() {
            try {
                setIsLoading(true)
                const response = await getExploreCourses();
                // setCourse(response?.data?.data);
                const newCourses = []
                // console.log(response?.data?.data)
                for (let i of (response?.data?.data)){
                    // console.log(i?.EnrolledStudents.includes(userId) , i?.ReviewStudents.includes(userId))
                    if(!i?.EnrolledStudents.includes(userId) && !i?.ReviewStudents.includes(userId)){
                        // console.log(i)
                        newCourses.push(i)
                    }
                }
                setCourse(newCourses)
                // setFilteredCourses(response?.data?.data);
                setFilteredCourses(newCourses);
                setIsLoading(false)
                setRefreshCards(false)
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        }
        if(refreshCards && userId){
            getCourseDetails();
        }
    }, [userId, refreshCards]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredCourses]);
    

    // Calculate the index of the last course on the current page
    const lastCourseIndex = currentPage * coursesPerPage;
    // Calculate the index of the first course on the current page
    const firstCourseIndex = lastCourseIndex - coursesPerPage;
    // Get the courses to display for the current page
    const currentCourses = filteredCourses.slice(firstCourseIndex, lastCourseIndex);
    // Calculate total pages
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);


    const [successModal, setSuccessModal] = useState(false)


    const cardClick = (id, tag) => {
        if(id && tag){
            if(tag === "Paid"){
                setSuccessModal(true)
            }else if(tag==="Free"){
                setToast("Course Purchased","success")
                // alert("Course Purchased")
            }
            courseReviewAdmin({userId, courseId: id, tag}).then(response =>{
                // console.log(response?.data?.data[0])
                setRefreshCards(true)
            }).catch(err=>{
                console.log(err)
            })
        }

    }

    return (
        <div className={styles.container} style={{ display: 'flex' }}>
            <SidebarDashboard page={"Explore"}/>
            <div className={styles.contentContainer}>
                <HeaderDashboardPage 
                pageText={"Explore Courses"}
                AppBarText={"Unlock your future with knowledge"}/>
            {isLoading ? <LoadingSpinner /> :
                <div
                    className={styles.newClassDiv}
                  >
                        <FilterResultLayout setCurrentPage={setCurrentPage}  setFilterShow={setFilterShow} filterShow={filterShow} coursesNumber={currentCourses.length} totalCourse={filteredCourses.length} />
                        <br />
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', justifyItems: 'left', width: '100%' }}>
                            {filterShow ? <div>
                                <FilterSection 
                                    courses={courses} 
                                    setFilteredCourses={setFilteredCourses} 
                                />
                            </div> : ''}
                            {/* Map over the currentCourses array and render EnrollCourseCard */}
                            <div className={styles.expCards} style={{ display: 'flex',flexDirection:'row', flexWrap: 'wrap' }}>
                                {currentCourses.map((course, index) => (
                                    <div key={index} >
                                        <EnrollCourseCard
                                        courseImg= {course.image}
                                        courseTitle={course.coursename}
                                        courseDescription={course.courseDescription}
                                        coursePrice={course.courseAmount[1]}
                                        courseLesson={course.courseLesson}
                                        courseApplied={course.courseDifficulty[0]}
                                        courseDifficulty={course.courseDifficulty[1]}
                                        courseDuration={course.courseDuration}
                                        courseRating0={course.courseRating[0]}
                                        courseRating1={course.courseRating[1]}
                                        filterShow={filterShow} //for width of course card
                                        tag={course?.Tag}
                                        onClick={()=>{cardClick(course?._id,course?.Tag)}}
                                    />
                                    </div>
                                ))}
                                {currentCourses.length === 0 && (
                                    <div>
                                        No Courses Found
                                    </div>
                                )}
                            </div>
                        </div>
                        <br />
                        <PaginationComponent 
                            // currentPage={currentPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage} // Ensure you're passing the function correctly
                            totalPages={totalPages}
                        />
                        <br />
                    </div>
            }
            </div>
            
            <SuccessModal
                successModal={successModal}
                onClose={()=>{setSuccessModal(false)}}
            />
        </div>
    );
}

export default ExploreCourses;
