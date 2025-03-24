// import { useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";

 
const AuthenticatedRoute = ({ children }) => {
  // const token = localStorage.getItem("token");
  // const location = useLocation();
  // const [id] = useState(localStorage.getItem("id") || "");

  // if (!token || !id) {
  //   return <Navigate to="/" state={{ from: location.pathname }} />;
  // }
 
  return children;
};
 
export default AuthenticatedRoute;
 