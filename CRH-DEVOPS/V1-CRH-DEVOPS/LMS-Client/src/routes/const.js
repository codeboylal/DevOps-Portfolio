import Login from "../pages/Login/login";
import Signup from "../pages/Sign up/signup";
import HomePage from "../pages/homepage/homepage";
import Dashboard from "../pages/dashboard/dashboard";
import Forgetpassword from "../pages/Login/Forgetpassword/forgetpassword"
// import CourseCard from "../Common Components/Course Card Component/courseCard";
import GoToCourseCard from "../Common Components/Course Cards Component/Go To Course Card/goToCourseCard";
import ExploreCourses from "../pages/ExploreCourses/ExploreCourses";
import ResetPassword from "../pages/Login/Forgetpassword/Resetpassword";
import AllCourse from "../components/My Courses/All Course/allCourse";
import ProfilePage from "../pages/Profile/Profile";
import ContactPage from "../pages/ContactUs/ContactUs";
import ActiveCourses from "../components/My Courses/Active Course/activeCourses";
import CompletedCourses from "../components/My Courses/Completed Course/completedCourses";
import AllAccomplishments from "../pages/Accomplishments/All Accomplishments/AllAccomplishments";
import OpenAccomplishments from "../pages/Accomplishments/Open Accomplishments/OpenAccomplishments";
import CourseDetails from "../Common Components/courseDetails";
import Rough from "../Common Components/rough";
import ToDoCardModule from "../pages/toDoModule/toDoCard/toDoCard";
import ToDoList from "../pages/toDoModule/toDoList/toDoList";
import MyCourses from "../pages/myCourses/myCourses";


const routes = [
    {
        path: '/login',
        component: <Login />
    },
    {
        path: '/signup',
        component: <Signup />
    },
    {
        path: '/forget',
        component: <Forgetpassword />
    },
    {
        path: '/resetpassword',
        component: <ResetPassword />
    },
    {
        path: '/',
        component: <HomePage />
    },
    {
        path: '/dashboard',
        component: <Dashboard />
    },{
        path:'/allCourse',
        component:<AllCourse/>
    },{
        path:'/activeCourses',
        component:<ActiveCourses/>
    },
    {
        path:'/completedCourses',
        component:<CompletedCourses/>
    },
    {
        path: '/profile',
        component: <ProfilePage />
    },
    {
        path: '/contact',
        component: <ContactPage />
    },
   
    {
        path: '/exploreCourses',
        component: <ExploreCourses />
    },{
        path: '/AllAccomplishments',
        component: <AllAccomplishments />
    },{
        path: '/OpenAccomplishments',
        component: <OpenAccomplishments />
    },{
        path: '/courseDetails',
        component: <CourseDetails />
    },{
        path: '/toDoModule',
        component: <ToDoCardModule />
    },{
        path: '/toDoList',
        component: <ToDoList />
    },   
    {
        path: '/rough',
        component: <Rough />
    },   
    {
        path: '/myCourses',
        component: <MyCourses />
    }
];

export default routes;