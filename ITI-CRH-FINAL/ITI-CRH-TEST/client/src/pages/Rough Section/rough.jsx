import React from 'react';
import HelpSection from '../../components/Settings Section/Help Section/help';
import TermsConditions from '../../components/Settings Section/Terms And Conditions/termAndCondition';
import SubTaskPopUp from '../../components/Container/projectsModule/subTaskPopUp/subTaskPopUp';
import StatusFilter from '../../components/Container/projectsModule/statusFilter/statusFilter';
import SideBarPopUpProjectDetails from '../../components/Projects/Project Details/Project Details Side Popup/sideBarPopUp';
import SidebarButton from '../../components/Projects/Project Details/Project Details Side Popup/Side Bar Popup Buttons/sidebarButtons';
import SideBar from '../../components/sideBar/sideBar';
import AppBar from '../../components/appBar/appBar';
import Conformation from '../UACP/popUps/confirmation/confirmation';
import Edit from '../UACP/popUps/edit/edit';
import TypeDropdown from '../UACP/dropDown/typeDropDown';

const Rough = () => {
  return (
    <div style={{
      backgroundColor:'black',
      height:'100vh',
      display:'flex',
      flexWrap:'wrap',
      justifyContent:'space-evenly',
      alignItems:'center',
      overflow:'auto',
      gap:'40px',
      padding:'40px 0px'
    }}>

      
{/* <SideBarPopUpProjectDetails /> */}

{/* <SidebarButton /> */}
{/* <SubTaskPopUp /> */}
      
    {/* <div
      style={{
        position:'fixed',
        width:'100vw',
        height:'100vh',
        // backgroundColor:'#000000D9',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-evenly',
      }}
    >
      <SideBar />
      <AppBar />
 
    </div> */}

      <Conformation popUp={"delete"}/>
      <Conformation popUp={"lock"}/>
      <Conformation popUp={"unlock"}/>

      <Edit />
      <TypeDropdown />
    </div>
  );
};

export default Rough;
