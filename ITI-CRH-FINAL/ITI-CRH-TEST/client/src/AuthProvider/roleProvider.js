import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../services/user/getUser";
import { useEffect, useState } from "react";
import DemoPage from "../pages/demoPage/demoPage";
// import { useToaster } from "../Toaster";
 
const AuthenticatedRole = ({ children }) => {
  // const setToast = useToaster();
  const id = localStorage.getItem("id");
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
 
  useEffect(() => {
    if (!id) {
      // setToast("Please login to access this page", "error");  
      setLoading(false); // No need to fetch if id is missing
      return;
    }
 
    const fetchUserRole = async () => {
      try {
        const response = await getUserData({ userId: id });
        setRole(response?.data?.data?.role || null);
      } catch (err) {
        console.error(err);
        setRole(null); // Handle error by resetting the role
      } finally {
        setLoading(false);
      }
    };
 
    if(id){
      fetchUserRole();
    }
  }, [id]);
 
  // Show a loading screen while fetching user data
  if (loading) {
    return <DemoPage loading={true}/>;
  }
 
  // Redirect if no user ID or unauthorized role
  if (!id || ( role !== "ITI" && role !== "companyAdmin")) {
    // setToast("Access Denied", "error");  
    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  }
 
  // Render children for authorized users
  return <>{children}</>;
};
 
export default AuthenticatedRole;