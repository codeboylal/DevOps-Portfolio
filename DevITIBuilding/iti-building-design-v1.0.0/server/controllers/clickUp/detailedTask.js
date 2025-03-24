const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const API_TOKEN = process.env.clickUpToken;
if (!API_TOKEN) {
  console.error("❌ Missing ClickUp API token! Please check your .env file.");
  process.exit(1);
}

const BASE_URL = "https://api.clickup.com/api/v2/task/";
const { ProjectRunning } = require("../../Models/projects/projectsRunning.js"); // Assuming a DB module to handle updates

async function fetchWithRetry(url, params = {}) {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: API_TOKEN },
      params,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      console.warn("⚠️ Rate limit hit! Retrying in 10 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 10000));
      return fetchWithRetry(url, params);
    } else {
      console.error(`❌ Error fetching ${url}:`, error.response?.data || error.message);
      return null;
    }
  }
}

async function getAllSubtaskIds(taskId, parentDueDate) {
  let subtaskIds = [];

  async function fetchSubtasksRecursively(taskId) {
    const taskData = await fetchWithRetry(`${BASE_URL}${taskId}`, { include_custom_fields: true });

    if (!taskData) return;
    
    const customItem = taskData.custom_fields?.find((field) => field.id === "custom_item_id");
    if (customItem?.value === 1004 || customItem?.value === 1005) return; // Skip fetching subtasks if custom_item_id is 1004
    
    if (taskData?.subtasks?.length) {
      for (const subtask of taskData.subtasks) {
        subtaskIds.push(subtask.id);
        await fetchSubtasksRecursively(subtask.id); // Recursively fetch deeper subtasks
      }
    }
  }

  await fetchSubtasksRecursively(taskId);
  return subtaskIds;
}

async function getSubtasksWithCustomFields(taskId) {
  console.log(`🔍 Fetching main task and all its subtasks for Task ID: ${taskId}`);

  // Fetch Main Task
  const mainTask = await fetchWithRetry(`${BASE_URL}${taskId}`, { include_custom_fields: true });
  if (!mainTask) {
    console.error("❌ Failed to fetch main task.");
    return;
  }

  // Get due date
  const parentDueDate = mainTask.due_date;

  // Retrieve existing task from DB
  let existingTask = await ProjectRunning.findOne({ TaskID: taskId });
  if (!existingTask) {
    existingTask = new ProjectRunning({ TaskID: taskId, subtasks: [] });
  }
  let existingSubtasks = existingTask.data.subtasks || [];

  // Get all subtask IDs (recursively with conditions)
  const subtaskIds = await getAllSubtaskIds(taskId, parentDueDate);
  console.log(`📌 Found ${subtaskIds.length} new subtasks. Fetching their details...`);

  // Fetch subtask details (including custom fields) in parallel
  const subtaskRequests = subtaskIds.map((subtaskId) =>
    fetchWithRetry(`${BASE_URL}${subtaskId}`, { include_custom_fields: true })
  );
  const detailedSubtasks = await Promise.allSettled(subtaskRequests);

  // Filter out failed requests
  const newSubtasks = detailedSubtasks
    .filter((result) => result.status === "fulfilled" && result.value !== null)
    .map((result) => {
      if (!result.value.custom_fields) {
        console.warn(`⚠️ Missing custom fields for subtask ${result.value.id}`);
      }
      return result.value;
    });

  // Merge new and existing subtasks
  const updatedSubtasksMap = {};
  existingSubtasks.forEach((subtask) => (updatedSubtasksMap[subtask.id] = subtask));
  newSubtasks.forEach((subtask) => (updatedSubtasksMap[subtask.id] = subtask));

  mainTask.subtasks = Object.values(updatedSubtasksMap);

  console.log("✅ Final Task with Subtasks and Custom Fields:", JSON.stringify(mainTask, null, 2));

  // Save updated tasks and subtasks to DB
  existingTask.subtasks = mainTask.subtasks;
  await existingTask.save();
  console.log("✅ Data successfully merged into the database.");

  return mainTask;
}

module.exports = {
  getSubtasksWithCustomFields,
};