import React from "react";
import SettingContainer from "../settingContainer/SettingContainer";
import Account from "../SVGS/Account.svg";
import email from "../SVGS/email.svg";
import PageSetup from "../../../components/Container/pageSetup/pageSetup";
import ScrollBar from "../../../components/scrollBar/scrollBar";
import TopBar from "../../../components/topBar/topBar";

const AccountPage = () => {
  const cardData = [
    {
      iconSrc: Account,
      title: "Single",
      description: "Provide personal details and how we can reach you",
    },
    {
      iconSrc: email,
      title: "Double",
      description:
        "Manage your personal data, connected services, and data sharing settings",
    },
  ];
  return (
    <>
      <PageSetup appBar={true} active="Account">
        <TopBar text={"Accounts"} filterEnable={false} />
        <ScrollBar>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {cardData.map((card, index) => (
              <SettingContainer
                key={index}
                iconSrc={card.iconSrc}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </ScrollBar>
      </PageSetup>
    </>
  );
};

export default AccountPage;
