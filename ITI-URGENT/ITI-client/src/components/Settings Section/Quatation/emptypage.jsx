
import React from 'react';
// import styles from './help.module.css';
import PageSetup from '../../Container/pageSetup/pageSetup';

const EmptySection = () => {
  return (
    <div className={styles.mainContainer}>
      <PageSetup active={"sales"} appBar={true}>
        


      </PageSetup>
    </div>
  );
};

export default HelpSection;
