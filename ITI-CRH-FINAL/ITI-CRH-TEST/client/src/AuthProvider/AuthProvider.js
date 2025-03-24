import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../services/user/getUser";
import DemoPage from "../pages/demoPage/demoPage";
// import { useToaster } from "../Toaster.js";
 
const AuthenticatedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [id] = useState(localStorage.getItem("id") || "");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    if (!id) {
      setShouldRedirect(true);
      return;
    }
 
    const fetchData = async () => {
      try {
        const profile = await getUserData({ userId: id });
 
        if (!profile || profile?.data?.data?.accountStatus === "not verified") {
          setShouldRedirect(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setShouldRedirect(true);
      }finally{
        setLoading(false)
      }
    };
 
    if(id){
      setLoading(true)
      fetchData();
    }
  }, [id]);
 
  if (!token || shouldRedirect) {
    return <Navigate to="/installation" state={{ from: location.pathname }} />;
  }

  if(loading){
    <DemoPage loading={true} />
  }
 
  return children;
};
 
export default AuthenticatedRoute;
 