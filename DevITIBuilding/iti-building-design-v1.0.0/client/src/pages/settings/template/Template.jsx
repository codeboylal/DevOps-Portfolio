import React from 'react'
import SettingContainer from '../settingContainer/SettingContainer'
import Users from "../SVGS/Users.svg"
import email from "../SVGS/email.svg"
import document from "../SVGS/document.svg"
import PageSetup from '../../../components/Container/pageSetup/pageSetup'
import ScrollBar from '../../../components/scrollBar/scrollBar'
import TopBar from '../../../components/topBar/topBar'
const Template = () => {

  const cardData = [
    {
      iconSrc: Users,
      title: "Single",
      description: "Provide personal details and how we can reach you",
    },
    {
      iconSrc: email,
      title: "Double",
      description: "Manage your personal data, connected services, and data sharing settings",
    },
    {
      iconSrc: document,
      title: "Triple",
      description: "View and manage the apps connected to Metrix.",
    },
  ];

  return (
    <>
   <PageSetup appBar={true} active='Template'>
   <TopBar text={"Template"} filterEnable={false} />
    <ScrollBar>
    <div  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>   
     {cardData.map((card, index) => (
      <div> 
        <SettingContainer
          key={index}
          iconSrc={card.iconSrc}
          title={card.title}
          description={card.description}
        />

        </div>
      ))}
       </div>
    </ScrollBar>
   </PageSetup>
    </>
  )
}

export default Template