//Pages
import Home from "../pages/home/home";
import ExploreCourses from "../pages/exploreCourses/exploreCourses";

//Componenets
import Loader from "../components/loader/loader";
import Appbar from "../components/appbar/appbar";
import Sidebar from "../components/sidebar/sidebar";
import DemoPage from "../pages/Demo Page/Demo Page";
import SidebarPopup from "../components/container/popUp/sidebar";
import Dashboard from "../pages/dashboard/dashboard";
import Profile from "../pages/profile/profile";
import CoursePreview from "../pages/coursePreview/coursePreview";
import MyCourses from "../pages/myCourses/myCourses";
import CourseDetails from "../pages/courseDetails/courseDetails";
import CreateProfile from "../pages/profile/createProfile";

export const PagesRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/exploreCourses",
    element: <ExploreCourses />,
  },
  {
    path: "/course/:id",
    element: <CoursePreview />,
  },
  {
    path: "/myCourses",
    element: <MyCourses />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/courseDetails/:courseId/:moduleId",
    element: <CourseDetails />,
  },
  {
    path: "/createprofile",
    element: < CreateProfile/>,
  }
];

export const ComponentRoutes = [
  {
    path: "/loader",
    element: <Loader />,
  },
  {
    path: "/appbar",
    element: <Appbar />,
  },
  {
    path: "/sidebar",
    element: <Sidebar />,
  },
  {
    path: "/demoPage",
    element: <DemoPage />,
  },
  {
    path: "/sideBarPopUp",
    element: <SidebarPopup />,
  },
];
