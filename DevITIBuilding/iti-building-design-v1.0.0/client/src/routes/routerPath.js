import { Route, Routes } from "react-router-dom";
import {routes, accessRoutes} from "./const.js";

import AuthenticatedRoute from "../AuthProvider/AuthProvider";

import NoPage from "../pages/noPage/NoPage.jsx";
// import DisplayCenter from "../pages/displayCenter/displayCenter.jsx";
import InstallationPage from "../pages/signIn/SignIn Installation/installation.jsx";
import SignIn from "../pages/signIn/Sign In Page/signIn.jsx";
// import Settings from "../pages/settings/settings.jsx";
import Rough from "../pages/Rough Section/rough.jsx";
import SignUp from "../pages/Signup/signup.jsx";
import ResetPassword from "../pages/Reset Password/resetPassword.jsx";
import ForgotPassword from "../pages/Forgot Password/forgotPassword.jsx";
// import ContractorContacts from "../pages/contractorContacts/contractorContacts.jsx";
import EmailVerification from "../pages/Email Verification/EmailVerification.jsx";
import AuthenticatedRole from "../AuthProvider/roleProvider.js";
import AdminPanel from "../pages/Admin Panel/Admin Page/adminPage.jsx";
import AccessProvider from "../AuthProvider/accessProvider.js";
// import accessRoutes from "./const.js";

const RouterPath = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verifyEmail" element={<EmailVerification />} />
      <Route path="/resetPass" element={<ResetPassword />} />
      <Route path="/forgotPass" element={<ForgotPassword />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/installation" element={<InstallationPage />} />
      <Route
        path="/adminPanel"
        element={
          <AuthenticatedRoute>
            <AuthenticatedRole>
              <AdminPanel />
            </AuthenticatedRole>
          </AuthenticatedRoute>
        }
      />
      {routes.map((item, index) => {
        return (
          <Route
            key={index}
            path={item.path}
            element={
              <AuthenticatedRoute>
                {item.element}
              </AuthenticatedRoute>
            }
          />
        );
      })}
      <Route path="/rough" element={<Rough />} />
      {accessRoutes.map((item, index) => {
        return (
          <Route
            key={index}
            path={item.path}
            element={
              <AuthenticatedRoute>
                <AccessProvider page={item.path}>{item.element}</AccessProvider>
              </AuthenticatedRoute>
            }
          />
        );
      })}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default RouterPath;
