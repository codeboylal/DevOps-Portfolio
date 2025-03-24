// import React, { useState } from "react";

// import styles from "./contractorContacts.module.css";


// import PageSetup from "../../components/Container/pageSetup/pageSetup";
// import TopBar from "../../components/topBar/topBar";
// import ScrollBar from "../../components/scrollBar/scrollBar";
// import Box from "../../components/Container/contractor contacts/box";

// import BuildingLoader from "../../components/loader/loader";
// import { getContractorContacts } from "../../services/projects/getContractorContacts.js";

// function ContractorContacts() {

//     const [loading, setLoading] = useState(false)

//     const [contacts, setContacts] = useState([])

//     getContractorContacts().then(response=>{
//         // console.log(response?.data)
//         setContacts(response?.data?.data)
//     }).catch(err=>{
//         console.log(err)
//     })

//     return (
//         <PageSetup
//             loaderState={false}
//             setLoading={setLoading}
//             active={"Contractor Contacts"}
//             appBar={true}
//         >
//             <div className={styles.mainDiv}>

//                 <div>
//                     <TopBar text={"Contractor Contacts"} filterEnable={false} />
//                 </div>
//                 {loading ? <BuildingLoader  marginTop={'175px'}/> :
//                     <ScrollBar>
//                         <div className={styles.boxContainer}>
//                             {contacts?.map((item, index)=>{
//                                 return(
//                                     <Box key={index} contact={item}/>
//                                 )
//                             })}
//                         </div>
//                     </ScrollBar>
//                 }
//             </div>
//         </PageSetup>
//     )
// }

// export default ContractorContacts;

import React, { useState, useEffect } from "react";
import { useToaster } from "../../Toaster.js";

import styles from "./contractorContacts.module.css";

import PageSetup from "../../components/Container/pageSetup/pageSetup";
import TopBar from "../../components/topBar/topBar";
import ScrollBar from "../../components/scrollBar/scrollBar";
import Box from "../../components/Container/contractor contacts/box";

import BuildingLoader from "../../components/loader/loader";
import { getContractorContacts } from "../../services/projects/getContractorContacts.js";

function ContractorContacts() {
    const setToast = useToaster();
    const [loading, setLoading] = useState(true); // Start with loading state true
    const [contacts, setContacts] = useState([]);

    const [userId, setUserId] = useState(localStorage?.getItem("id") || null)

    useEffect(() => {
        if(userId){
            getContractorContacts({
                userId
            })
                .then((response) => {
                    setContacts(response?.data?.data);
                    setLoading(false); // Set loading to false once data is fetched
                    if(response?.data?.status === 404){
                        setToast("Profile not Found","error")
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false); // Stop loading on error as well
                });
        }
    }, [userId]);

    return (
        <PageSetup
            loaderState={false}
            setLoading={setLoading}
            active={"Contractor Contacts"}
            appBar={true}
        >
            <div className={styles.mainDiv}>
                <div style={{marginBottom:'23px'}}>
                    <TopBar text={"Contractor Contacts"} filterEnable={false} />
                </div>
                {loading ? (
                    <BuildingLoader marginTop={"175px"} />
                ) : (
                    <ScrollBar>
                        <div className={styles.boxContainer}>
                            {contacts?.map((item, index) => (
                                <Box key={index} contact={item} />
                            ))}
                            {
                                contacts?.length === 0 && 
                                <div>
                                    No Contractors are working on your project
                                </div>
                            }
                        </div>
                    </ScrollBar>
                )}
            </div>
        </PageSetup>
    );
}

export default ContractorContacts;
