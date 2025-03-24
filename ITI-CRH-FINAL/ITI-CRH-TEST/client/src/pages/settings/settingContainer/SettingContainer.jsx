import React from "react";
import styles from "./index.module.css";

const SettingContainer = ({ iconSrc, title, description }) => {
  return (
    <div className={styles.card} style={{ cursor: "pointer" }}>
      <img src={iconSrc} alt="title" className={styles.icon} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default SettingContainer;
