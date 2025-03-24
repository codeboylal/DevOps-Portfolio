import NotificationList from "../components/Container/Notification/notificationPopUp";
import HelpSection from "../components/Settings Section/Help Section/help";
import TermsConditions from "../components/Settings Section/Terms And Conditions/termAndCondition";
import AdminPanel from "../pages/Admin Panel/Admin Page/adminPage";
import DisplayCenter from "../pages/displayCenter/displayCenter";
import Rough from "../pages/Rough Section/rough";
import Settings from "../pages/settings/settings";
import SignIn from "../pages/signIn/Sign In Page/signIn";
import IphonePopup from "../components/iphone-popup/iphonepop"; 
// import SignIn from "../pages/signIn/signIn";
import InstallationPage from "../pages/signIn/SignIn Installation/installation";
import SalesPage from '../pages/sales/sales';
import Inbox from '../pages/inbox/inbox';
import Projects from '../pages/projects/projects';
import Constructor from '../pages/Constructor/constructor';


const routes = [
  {
    path: '/',
    element: <DisplayCenter />
  },{
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/signin',
    element: <SignIn />
  },{
    path: '/installation',
    element: <InstallationPage />
  },
  {
    path: '/rough',
    element: <Rough />
  },
  {
    path: '/terms&cond',
    element: <TermsConditions />
  },
  {
    path: '/help',
    element: <HelpSection />
  },
  {
    path: '/popup', // Add the new route for the popup
    element: <IphonePopup />},
    {
    path: '/adminPanel',
    element: <AdminPanel />
  },
  {
    path: '/notificationList',
    element: <NotificationList />
  },
 

  {
    path: '/salespage',
    element: <SalesPage />
  },
  
  {
    path: '/inbox',
    element: <Inbox />
  },

  {
    path: '/projects',
    element: <Projects />
  },
  {
    path: '/Constructor',
    element: <Constructor />
  }
  
  
  
  

];

export default routes;