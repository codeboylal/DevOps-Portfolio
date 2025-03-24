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
import SalesPage from "../pages/sales/sales";
import Inbox from "../pages/inbox/inbox";
import Projects from "../pages/projects/projects";
import Constructor from "../pages/Constructor/constructor";
// import ProjectCards from "../components/Projects/Project Cards/projectCards";
import ProjectDetails from "../pages/projects/Project Details Page/projectDetails";
import UACP from "../pages/UACP/uacp/uacp.jsx";
import Profile from "../pages/UACP/profile/profile.jsx";
import ContractorContacts from "../pages/contractorContacts/contractorContacts.jsx";

import SalesDetails from "../pages/sales/SalesDetails/index.jsx";
import Quatation from "../pages/sales/quotationPage/Quatation.jsx";
import TemplateDetails from "../pages/sales/TemplateDetails/TemplateDetails.jsx";
import Template from "../pages/settings/template/Template.jsx";
import AccountPage from "../pages/settings/account/Account.jsx";



export const routes = [
  {
    path: "/rough",
    element: <Rough />,
  },

  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/installation",
    element: <InstallationPage />,
  },
  {
    path: "/projectDetails",
    element: <ProjectDetails />,
  },
  {
    path: "/terms&cond",
    element: <TermsConditions />,
  },
  {
    path: "/help",
    element: <HelpSection />,
  },
  {
    path: "/popup", // Add the new route for the popup
    element: <IphonePopup />,
  },

  {
    path: "/notificationList",
    element: <NotificationList />,
  },


  {
    path: "/inbox",
    element: <Inbox />,
  },


  {
    path: "/users",
    element: <UACP />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  // {
  //   path: "/sales-details/:id",
  //   element: <SalesDetails />
  // },
  {
    path: "/contractor",
    element: <ContractorContacts />,
  },
  // {
  //   path: "/quotations",
  //   element: <Quatation />,
  // },
  // {
  //   path: "/story",
  //   element: <TemplateDetails />,
  // },
  // {
  //   path:"/template",
  //   element: <Template />,
  // },
  // {
  //   path:"/accounts",
  //   element:<AccountPage/>
  // }
];

export const accessRoutes = [
  {
    path: "/",
    element: <DisplayCenter />,
  },{
    path: "/salespage",
    element: <SalesPage />,
  },{
    path: "/projects",
    element: <Projects />,
  },{
    path: "/constructor",
    element: <Constructor />,
  }
]

