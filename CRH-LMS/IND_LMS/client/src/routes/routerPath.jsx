import { Route, Routes } from "react-router-dom";
import { ComponentRoutes, PagesRoutes } from "./const.jsx";

import AuthenticatedRoute from "../AuthProvider/AuthenticatedRoute.jsx";

import NoPage from "../pages/noPage/NoPage.jsx";
import MyCourses from "../pages/myCourses/myCourses.jsx";
import ExploreCourses from "../pages/exploreCourses/exploreCourses.jsx";

const RouterPath = ({courseFilter="All", searchQuery = ""}) => {
  return (
    <Routes>
      {/* <Route path="/signup" element={<SignUp />} /> */}
      {PagesRoutes.map((item, index) => {
        return (
          <Route
            key={index}
            path={item.path}
            element={
              item.path === "/myCourses" ? (
                <AuthenticatedRoute>
                  <MyCourses courseFilter={courseFilter} searchQuery={searchQuery}/>
                </AuthenticatedRoute>
              ) : item.path === "/exploreCourses" ? (
                <AuthenticatedRoute>
                  <ExploreCourses searchQuery={searchQuery}/>
                </AuthenticatedRoute>
              ) : (
                <AuthenticatedRoute>{item.element}</AuthenticatedRoute>
              )
            }
          />
        );
      })}
      {ComponentRoutes.map((item, index) => {
        return <Route key={index} path={item.path} element={item.element} />;
      })}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default RouterPath;
