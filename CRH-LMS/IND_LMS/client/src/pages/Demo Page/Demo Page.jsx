import React from "react";

import PageSetup from "../../components/container/Page Setup/pageSetup.jsx";

function DemoPage({children}) {
  return <PageSetup loading={true}> 
  {children}
  </PageSetup>;
}

export default DemoPage;
