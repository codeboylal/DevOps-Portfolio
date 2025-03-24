import Login from '../Pages/Login/login.jsx';
import SignUp from '../Pages/SignUp/SignUp.jsx';
import FindJob from '../Pages/FindJob/FindJob.jsx';
import JobDetails from '../Pages/JobDetails/JobDetails.jsx';
import MainProfile from '../components/Profile/MainProfile/mainProfile.jsx'
// import EditExperienceTypeNo from '../components/Profile/Experience Section/Edit Section/Edit Experience Section Type N/editExperienceTypeNo.jsx';
// import EditExperienceTypeYes from '../components/Profile/Experience Section/Edit Section/Edit Experience Section Type Yes/editExperienceTypeYes.jsx';
import NoDataFound from '../components/Profile/Empty Screen/noDataFound.jsx';

const routes = [
    {
      path: '/',
      component: <FindJob />
    },
    {
      path: '/jobDetails',
      component: <JobDetails /> 
    },
    {
      path: '/login',
      component: <Login />
    },
    {
      path: '/signup',
      component: <SignUp />
    },{
      path: '/profile',
      component: <MainProfile/>
    },
    {
      path: '/experienceYes',
      component: <NoDataFound/>
      // component: <EditExperienceTypeNo/>

    }
  ];
  
  export default routes;