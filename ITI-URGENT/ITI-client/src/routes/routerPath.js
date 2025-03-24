import { Route, Routes } from "react-router-dom";
import routes from "./const.js";

import AuthenticatedRoute from "../AuthProvider/AuthProvider";


import NoPage from "../pages/noPage/NoPage.jsx";
// import DisplayCenter from "../pages/displayCenter/displayCenter.jsx";
import InstallationPage from "../pages/signIn/SignIn Installation/installation.jsx";
import SignIn from "../pages/signIn/Sign In Page/signIn.jsx";
// import Settings from "../pages/settings/settings.jsx";
import Rough from "../pages/Rough Section/rough.jsx";



const RouterPath = () => {
  return (
    <Routes>
  
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/installation" element={<InstallationPage />} />
      {/* <Route path="/settings" element={<Settings />} /> */}
      <Route path="/rough" element={<Rough />} />
      {
        routes.map((item, index) => {
          return <Route key={index} path={item.path} element={<AuthenticatedRoute>{item.element}</AuthenticatedRoute>} />
        })
      }
      <Route path="*" element={<NoPage />} />
    </Routes>
  )
}

export default RouterPath;