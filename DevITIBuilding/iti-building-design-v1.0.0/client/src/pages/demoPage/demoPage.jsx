import React, { useState } from "react";

import styles from "./demoPage.module.css";


import PageSetup from "../../components/Container/pageSetup/pageSetup";
import BuildingLoader from "../../components/loader/loader";

function DemoPage({loading}){
    const [loadings, setLoading] = useState(false);
    return(
        <PageSetup
            loaderState={false}
            setLoading={setLoading}
            active={""}
            appBar={true}
        >   
        {
            loading && 
            <BuildingLoader loaderValue={true} marginTop={"0"}/>
        }

        </PageSetup>
    )
}

export default DemoPage;