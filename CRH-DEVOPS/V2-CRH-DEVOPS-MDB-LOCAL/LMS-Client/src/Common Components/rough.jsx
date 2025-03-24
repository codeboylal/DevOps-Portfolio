

import React, { useEffect, useState } from 'react';
import SidebarDashboard from './SideBar Dashboard/sideBarDashboard';
import NoDataFound from './No Data Found/noDataFound';
import FreeTag from './Course Cards Component/Free-Paid Tags/Free Tag/freeTag';
import SuccessModal from '../components/container/Success Modal/successModal';

const Rough = () => {
 
  return (
    <>
     <FreeTag />
     <SuccessModal />
    </>
  );
};

export default Rough;
