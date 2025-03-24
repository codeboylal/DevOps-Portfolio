


import React from "react";
import styles from "../projects/projects.module.css";
import PageSetup from "../../components/Container/pageSetup/pageSetup";
import ScrollBar from "../../components/scrollBar/scrollBar";
import consSvg from "./imgs/cons.svg";

const Inbox = () => {

  
  
  return (
    <div className={styles.mainContainer}>
      <PageSetup active={"projects"} appBar={true}>
        <div className={styles.contentContainer}>
        <ScrollBar>

          <div className={styles.centeredContent}>
            <div className={styles.imageContainer}>
              <img
                src={consSvg}
                alt="Coming Soon"
                className={styles.comingSoonImage}
              />
            </div>
            <div className={styles.textContainer}>
              <h2 className={styles.comingSoonTitle}>Coming Soon!</h2>
              <p className={styles.comingSoonSubtitle}>
                This feature is under development. Stay tuned for updates!
              </p>
            </div>
          </div>
          </ScrollBar>

          {/* {cardData.map((item,index)=>{
            return(
              <div
              key={index}
              >
                <ProjectCard singleCardData={item} />
                </div>
            )
          })} */}

        </div>
      </PageSetup>
    </div>
  );
};

export default Inbox;
