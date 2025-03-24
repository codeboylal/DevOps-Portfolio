const cron = require("node-cron");
const moment = require("moment-timezone");
const Plan = require("../../Models/plan/projectPlans.js");
const Facade = require("../../Models/facades/projectFacades.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

dotenv.config();

const cronSync = async (req = null, res = null, isCron = false) => {
  if (!isCron) {
    console.log("cron job");
  }
  const fetch = (await import("node-fetch")).default;
  const pdfjsLib = (await import("pdfjs-dist")).default;

  const planApiUrl = `https://api.clickup.com/api/v2/list/${process.env.planListID}/task?include_subtasks=true&include_closed=true`;
  const facadeApiUrl = `https://api.clickup.com/api/v2/list/${process.env.facadeListID}/task?include_subtasks=true&include_closed=true`;

  async function convertPdfFirstPageToBase64(pdfBuffer) {
    try {
      const pdfData = new Uint8Array(pdfBuffer);
      const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const firstPage = await pdfDoc.getPage(1);
      const viewport = firstPage.getViewport({ scale: 2.0 });
      const canvas = createCanvas(viewport.width, viewport.height);
      const context = canvas.getContext("2d");
      await firstPage.render({ canvasContext: context, viewport }).promise;
      return canvas.toDataURL("image/png");
    } catch (err) {
      console.error("Error converting first page of PDF to Base64:", err);
      return null;
    }
  }

  async function processAttachments(clickUpTask, taskModel) {
    for (const attachment of clickUpTask.attachments) {
      const url = attachment.url;
      if (url && url.toLowerCase().includes("plan") && url.endsWith(".pdf")) {
        try {
          const response = await fetch(url);
          const contentType = response.headers.get("Content-Type");
          if (!contentType || !contentType.includes("pdf")) continue;
          const pdfBuffer = await response.arrayBuffer();
          const base64Image = await convertPdfFirstPageToBase64(pdfBuffer);
          if (base64Image) {
            const task = await taskModel.findOne({ TaskID: clickUpTask.id });
            if (task) {
              console.log("Image saved");
              task.images.push({
                base64: base64Image,
                name: `${path.basename(url)}_page_1.png`,
                dateAdded: new Date(),
              });
              await task.save();
            }
          }
        } catch (error) {
          console.error(`Failed to process PDF at ${url}:`, error);
        }
      }
    }
  }

  async function processTasks(tasks, model, type, sendProgress) {
    for (const [index, taskId] of tasks.map((task) => task.id).entries()) {
      const taskResponse = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}?include_subtasks=true&include_closed=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.clickUpToken,
          },
        }
      );
      const taskDetails = await taskResponse.json();
      const existingTask = await model.findOne({ TaskID: taskDetails.id });
      if (existingTask) {
        if (taskDetails.date_updated > existingTask.data.date_updated) {
          existingTask.data = taskDetails;
          existingTask.notifications.push({
            message: `${type} updated: ${taskDetails.name}`,
            taskId: taskDetails.id,
            date: new Date(),
          });
          existingTask.images = [];
          await existingTask.save();
          if (type === "Plan") await processAttachments(taskDetails, model);
          await existingTask.save();
        }
      } else {
        const newTask = new model({
          TaskID: taskDetails.id,
          data: taskDetails,
          images: [],
          notifications: [
            {
              message: `New ${type} added: ${taskDetails.name}`,
              taskId: taskDetails.id,
              date: new Date(),
            },
          ],
        });
        await newTask.save();
        if (type === "Plan") await processAttachments(taskDetails, model);
      }
      if (!isCron)
        sendProgress({
          totalTasks: tasks.length,
          fetchedTasks: index + 1,
          type,
        });
    }
  }

  try {
    // if (!isCron) {
    //   res.setHeader("Content-Type", "text/event-stream");
    //   res.setHeader("Cache-Control", "no-cache");
    //   res.setHeader("Connection", "keep-alive");
    // }

    const sendProgress = (message) => {
      //   if (!isCron) res.write(`data: ${JSON.stringify(message)}\n\n`);
    };

    const fetchTasks = async (apiUrl, type) => {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.clickUpToken,
        },
      });
      const data = await response.json();
      return { tasks: data.tasks, type };
    };

    const [planData, facadeData] = await Promise.all([
      fetchTasks(planApiUrl, "Plan"),
      fetchTasks(facadeApiUrl, "Facade"),
    ]);

    for (const { data, type } of [
      { data: planData.tasks, type: "Plan" },
      { data: facadeData.tasks, type: "Facade" },
    ]) {
      await processTasks(
        data,
        type === "Plan" ? Plan : Facade,
        type,
        sendProgress
      );
    }

    if (!isCron) {
      sendProgress({ message: "Data Synced Successfully." });
      //   res.end();
    }
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    // if (!isCron) {
    //   res.write(`data: ${JSON.stringify({ error: "Internal Server Error" })}\n\n`);
    //   res.end();
    // }
  }
};

// cron.schedule('0 0 * * *', () => {
//   console.log(`Cron job triggered at ${moment().tz("Australia/Sydney").format("HH:mm")} in Australian timezone.`);
//   fetchAllData(null, null, true);
// }, { timezone: "Australia/Sydney" });

// Every 5 Minutes
// cron.schedule('*/5 * * * *', () => {
//   console.log(`Cron job triggered at ${moment().tz("Australia/Sydney").format("HH:mm")} in Australian timezone.`);
//   fetchAllData(null, null, true);
// }, { timezone: "Australia/Sydney" });

cron.schedule(
  "0 0 * * *",
  () => {
    console.log(
      `Cron job triggered at ${moment()
        .tz("Australia/Sydney")
        .format("HH:mm")} in Australian timezone.`
    );
    fetchAllData(null, null, true);
  },
  {
    timezone: "Australia/Sydney",
  }
);

// Every 10 sec
// cron.schedule('*/10 * * * * *', () => {
//   console.log(`Cron job triggered at ${moment().tz("Australia/Sydney").format("HH:mm:ss")} in Australian timezone.`);
//   cronSync(null, null, true);
// }, { timezone: "Australia/Sydney" });

module.exports = { cronSync };
