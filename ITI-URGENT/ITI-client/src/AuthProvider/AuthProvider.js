import { Navigate, useLocation } from "react-router-dom";
const AuthenticatedRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/installation" state={{ from: location.pathname }} />
  }

  return children;
};

export default AuthenticatedRoute;