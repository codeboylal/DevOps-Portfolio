import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../services/user/getUser";
import { useEffect, useState } from "react";
import DemoPage from "../pages/demoPage/demoPage";
// import { useToaster } from "../Toaster";
 
const AccessProvider = ({ children, page }) => {
  // const setToast = useToaster();
  const id = localStorage.getItem("id");
  const location = useLocation();
  const [access, setAccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkAccessOn, setCheckAccessOn] = useState("");
 
  // Set the required access label based on `page`
  useEffect(() => {
    if (page) {
      const pageAccessMap = {
        "/": "Display Center",
        "/projects": "Pre-Construction",
        "/salespage": "Sales",
        "/constructor": "Construction",
      };
      setCheckAccessOn(pageAccessMap[page] || "");
    }
  }, [page]);
 
  // Fetch user role
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
 
    const fetchUserRole = async () => {
      try {
        const response = await getUserData({ userId: id });
        if(response?.data?.data?.accountStatus === "not verified"){
          return <Navigate to="/signin" state={{ from: location.pathname }} />;
        }
        setAccess(response?.data?.data?.access || []);
      } catch (err) {
        console.error(err);
        setAccess(null);
      } finally {
        setLoading(false);
      }
    };
 
    fetchUserRole();
  }, [id]);
 
  // Check if user has access
  const hasAccess = access?.some((acc) => acc.label === checkAccessOn && acc.value);
 
  if (loading) {
    return <DemoPage loading={true}/>;
  }
 
  // Redirect if no access
  if (!hasAccess) {
    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  }
 
  return <>{children}</>;
};
 
export default AccessProvider;
 
 