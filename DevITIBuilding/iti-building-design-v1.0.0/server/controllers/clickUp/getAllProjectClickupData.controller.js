const mongoose = require("mongoose");
const ResponseHandler = require("../../utils/responseHandler.js");
const dotenv = require("dotenv");
const moment = require("moment-timezone");
const cron = require("node-cron");

dotenv.config();

// Dynamically import fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const listSchema = new mongoose.Schema(
  {
    listId: {
      type: String,
      required: true,
    },
    listName: {
      type: String,
      required: true,
    },
    tasks: [
      {
        taskId: String,
        taskName: String,
        taskDetails: Object,
      },
    ],
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);
const {
  ProjectCompleted,
} = require("../../Models/projects/projectsCompleted.js");
const { ProjectRunning } = require("../../Models/projects/projectsRunning.js");
const { FileNaming } = require("../../Models/projects/fileNamingSystem.js");

// Fetch directory tasks (lists) from ClickUp API
const fetchDirectoryTasks = async (directoryID) => {
  const url = `https://api.clickup.com/api/v2/folder/${directoryID}?include_subtasks=true&include_closed=true`;
  const headers = {
    Authorization: process.env.clickUpToken,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch directory tasks for folder ${directoryID}: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.lists || [];
};

// Fetch tasks for a specific list from ClickUp API
const fetchListTasks = async (listId) => {
  // const url = `https://api.clickup.com/api/v2/list/${listId}/task`;
  const url = `https://api.clickup.com/api/v2/list/${listId}/task?include_subtasks=true&include_closed=true`;

  const headers = {
    Authorization: process.env.clickUpToken,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch tasks for list ${listId}: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.tasks || [];
};

// Fetch detailed information for a specific task from ClickUp API
const fetchTaskDetails = async (taskId) => {
    // if(taskId === "86cx7me0w") return
  const url = `https://api.clickup.com/api/v2/task/${taskId}?include_subtasks=true&include_closed=true`;
  // const url = `https://api.clickup.com/api/v2/task/${taskId}`;
  const headers = {
    Authorization: process.env.clickUpToken,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch details for task ${taskId}: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
};

// Upsert task in DB for project running or completed
const upsertTaskInDb = async (model, taskId, taskData) => {
  const existingTask = await model.findOne({ TaskID: taskId });
  if (existingTask) {
    if (taskData.date_updated >= existingTask.data.date_updated) {
      await model.deleteOne({ TaskID: taskId });
      const updatedTask = new model({
        TaskID: taskId,
        data: taskData,
      });
      await updatedTask.save();
    }
  } else {
    const newTask = new model({
      TaskID: taskId,
      data: taskData,
    });
    await newTask.save();
  }
}; 

const upsertListInDb = async (listId, listName, tasks) => {
  let existingList = await List.findOne({ listId });

  if (!existingList) {
    existingList = new List({
      listId,
      listName,
      tasks: [],
    });
    await existingList.save();
  }
  existingList.tasks = [];
  for (const task of tasks) {
    existingList.tasks.push({
      taskId: task.TaskID,
      taskName: task.data.name,
      taskDetails: task.data,
    });
  }

  await existingList.save();
};

const fetchFileNamingSystem = async () => {
  const fileNamingSystemID = process.env.fileNamingSystem;
  // console.log(fileNamingSystemID)
  const url = `https://api.clickup.com/api/v2/list/${fileNamingSystemID}/task?include_subtasks=true&include_closed=true`;
  // const url = `https://api.clickup.com/api/v2/task/${taskId}`;
  const headers = {
    Authorization: process.env.clickUpToken,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch details for List ${fileNamingSystemID}: ${response.statusText}`
    );
  }

  const data = await response.json();
  // console.log(data.tasks);
  if (data?.tasks) {
    for (let task of data.tasks) {
      upsertTaskInDb(FileNaming, task.id, task);
    }
  } else {
    console.log("No Data in File Naming System");
  }
};

const fetchProjectClickupData = async (req, res) => {
  try {
    const directoryID = process.env.directoryListID;
    const projectRunningID = process.env.projectRunningID;
    const projectCompletedID = process.env.projectCompletedID;

    const directoryLists = await fetchDirectoryTasks(directoryID);

    const [runningTasks, completedTasks] = await Promise.all([
      fetchListTasks(projectRunningID),
      fetchListTasks(projectCompletedID),
    ]);

    for (const list of directoryLists) {
      const listId = list.id;
      const listName = list.name;

      const listTasks = await fetchListTasks(listId);

      const tasksWithDetails = [];
      for (const task of listTasks) {
        const taskDetails = await fetchTaskDetails(task.id);
        tasksWithDetails.push({
          TaskID: task.id,
          data: taskDetails,
        });
      }

      await upsertListInDb(listId, listName, tasksWithDetails);
    }

    const processTasks = async (tasks, model) => {
      for (const task of tasks) {
        const taskDetails = await fetchTaskDetails(task.id);
        await upsertTaskInDb(model, task.id, taskDetails);
      }
    };

    await Promise.all([
      processTasks(runningTasks, ProjectRunning),
      processTasks(completedTasks, ProjectCompleted),
      fetchFileNamingSystem(),
    ]);

    res
      .status(200)
      .json(
        ResponseHandler(200, null, "Project and Directory Sync Successful")
      );
  } catch (error) {
    console.error(error);
    res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

cron.schedule(
  "0 0 * * *",
  () => {
    console.log(
      `Cron job triggered at ${moment()
        .tz("Australia/Sydney")
        .format("HH:mm")} in Australian timezone.`
    );
    fetchProjectClickupData();
  },
  {
    timezone: "Australia/Sydney",
  }
);

module.exports = { fetchProjectClickupData, List };
