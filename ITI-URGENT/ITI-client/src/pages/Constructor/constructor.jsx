
import React from "react";
import styles from "../Constructor/constructor.module.css";
import PageSetup from "../../components/Container/pageSetup/pageSetup";
import consSvg from './imgs/cons.svg';
import ScrollBar from "../../components/scrollBar/scrollBar";


const Inbox = () => {
  return (
    <div className={styles.mainContainer}>
      <PageSetup active={"Constructor"} appBar={true}>
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

        </div>
      </PageSetup>
    </div>
  );
};

export default Inbox;

