import React, { useState, useEffect } from "react";
import styles from "./commonSubTask.module.css";
import SubtaskTable from "../Project Details Subtasks Tabel/subtaskTabelContent";

const CommonSubTasks = ({ data, stage }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [projectData, setProjectData] = useState([]);
  const [subtasks, setSubTasks] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (data) {
      setEmail(
        data[0]?.data?.custom_fields?.find(
          (field) => field?.name === "Contact Email"
        )?.value
      );
      setProjectData(data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (projectData) {
      setSubTasks(projectData?.data?.subtasks || []);
    }
  }, [projectData]);

  useEffect(() => {
    if (stage && subtasks.length > 0) {
      const stageIndex = subtasks.findIndex(
        (subtask) => subtask.name.toLowerCase().includes(stage.toLowerCase())
      );
      if (stageIndex !== -1) {
        setActiveTab(stageIndex);
      }
    }
  }, [stage, subtasks]);

  const getTaskNameAfterHyphen = (taskName) => {
    const match = taskName.match(/-(.*)/);
    return match ? match[1].trim() : taskName;
  };

  if (subtasks.length === 0) {
    return <div>No SubTask Available</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        {subtasks.map((subtask, index) => (
          <div
            key={index}
            className={`${styles.tab} ${
              activeTab === index ? styles.active : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {getTaskNameAfterHyphen(subtask?.name.replace(/stage/gi, '').trim() || "Unnamed Subtask")}
          </div>
        ))}
        <div
          className={styles.underline}
          style={{
            transform: `translateX(${activeTab * 100}%)`,
            width: `${100 / subtasks.length}%`,
          }}
        />
      </div>

      <div className={styles.subtaskDetails}>
        {subtasks.length !== 0 && subtasks[activeTab]?.name ? (
          <SubtaskTable subtask={subtasks[activeTab]} email={email} />
        ) : (
          <p>No details available for this subtask.</p>
        )}
      </div>
    </div>
  );
};

export default CommonSubTasks;
