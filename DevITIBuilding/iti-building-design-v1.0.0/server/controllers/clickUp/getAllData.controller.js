// const cron = require('node-cron');

// const moment = require('moment-timezone');

// const Plan = require("../../Models/plan/projectPlans.js");
// const Facade = require("../../Models/facades/projectFacades.js");
// const dotenv = require("dotenv");
// const fs = require("fs");
// const path = require("path");
// const { createCanvas } = require("canvas");

// dotenv.config();

// const fetchAllData = async (req, res) => {
//   const fetch = (await import("node-fetch")).default;
//   const pdfjsLib = (await import("pdfjs-dist")).default;

//   const planApiUrl = `https://api.clickup.com/api/v2/list/${process.env.planListID}/task`;
//   const facadeApiUrl = `https://api.clickup.com/api/v2/list/${process.env.facadeListID}/task`;

//   /**
//    * Convert the first page of a PDF to a Base64 image
//    * @param {ArrayBuffer} pdfBuffer - The PDF file as an ArrayBuffer
//    * @returns {Promise<string|null>} Base64 string of the image or null on failure
//    */
//   async function convertPdfFirstPageToBase64(pdfBuffer) {
//     try {
//       const pdfData = new Uint8Array(pdfBuffer);

//       // Load the PDF using pdfjs-dist
//       const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;

//       // Get the first page
//       const firstPage = await pdfDoc.getPage(1);
//       const viewport = firstPage.getViewport({ scale: 2.0 }); // Adjust scale as needed

//       // Create a canvas to render the first page
//       const canvas = createCanvas(viewport.width, viewport.height);
//       const context = canvas.getContext("2d");

//       const renderContext = {
//         canvasContext: context,
//         viewport,
//       };

//       // Render the page onto the canvas
//       await firstPage.render(renderContext).promise;

//       // Convert the canvas content to a Base64 image
//       return canvas.toDataURL("image/png");
//     } catch (err) {
//       console.error("Error converting first page of PDF to Base64:", err);
//       return null;
//     }
//   }

//   /**
//    * Process PDF attachments, convert to Base64, and update the database
//    */
//   async function processAttachments(clickUpTask, taskModel) {
//     const newImages = [];

//     for (const attachment of clickUpTask.attachments) {
//       const url = attachment.url;

//       if (url && /plan/i.test(url) && url.endsWith(".pdf")) {
//         const pdfName = path.basename(url);
//         try {
//           const response = await fetch(url);
//           const contentType = response.headers.get("Content-Type");

//           if (!contentType || !contentType.includes("pdf")) {
//             console.error(`Fetched file is not a PDF: ${pdfName}`);
//             continue;
//           }

//           const pdfBuffer = await response.arrayBuffer();
//           const base64Image = await convertPdfFirstPageToBase64(pdfBuffer);

//           if (base64Image) {
//             newImages.push({
//               base64: base64Image,
//               name: `${pdfName}_page_1.png`,
//               dateAdded: new Date(),
//             });

//             // Update MongoDB task with Base64-encoded first page
//             const task = await taskModel.findOne({ TaskID: clickUpTask.id });

//             if (task) {
//               task.images.push({
//                 base64: base64Image,
//                 name: `${pdfName}_page_1.png`,
//                 dateAdded: new Date(),
//               });
//               await task.save();
//             }
//           } else {
//             console.error(`Failed to convert PDF to Base64 for ${pdfName}`);
//           }
//         } catch (error) {
//           console.error(`Failed to process PDF at ${url}:`, error);
//         }
//       }
//     }

//     if (newImages.length > 0) {
//       const existingTask = await taskModel.findOne({ TaskID: clickUpTask.id });
//       if (existingTask) {
//         existingTask.images = newImages;
//         await existingTask.save();
//       } else {
//         clickUpTask.images = newImages;
//       }
//     }
//   }

//   /**
//    * Main logic to process tasks and synchronize data with MongoDB
//    */
//   async function processTasks(tasks, model, type, sendProgress) {
//     const updatedClickUpData = [];

//     for (const [index, taskId] of tasks.map((task) => task.id).entries()) {
//       const taskResponse = await fetch(
//         `https://api.clickup.com/api/v2/task/${taskId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: process.env.clickUpToken,
//           },
//         }
//       );
//       const taskDetails = await taskResponse.json();
//       updatedClickUpData.push(taskDetails);

//       sendProgress({
//         totalTasks: tasks.length,
//         fetchedTasks: index + 1,
//         type,
//       });
//     }

//     const mongoDBData = await model.find({});

//     for (let clickUpTask of updatedClickUpData) {
//       const existingTask = mongoDBData.find(
//         (dbTask) => dbTask.TaskID === clickUpTask.id
//       );
//       const customFieldIndex = type === "Plan" ? 10 : 9;
//       const taskType = type === "Plan" ? "Plan" : "Facade";

//       if (existingTask) {
//         if (clickUpTask.date_updated > existingTask.data.date_updated) {
//           existingTask.data = clickUpTask;
//           existingTask.notifications.push({
//             message: `${taskType} updated: ${clickUpTask?.custom_fields?.[customFieldIndex]?.value ||
//               clickUpTask?.name
//               }`,
//             taskId: clickUpTask.id,
//             date: new Date(),
//           });

//           if (taskType === "Plan") {
//             await processAttachments(clickUpTask, model);
//           }

//           await existingTask.save();
//         }
//       } else {
//         const newTask = new model({
//           TaskID: clickUpTask.id,
//           data: clickUpTask,
//           images: [],
//           notifications: [
//             {
//               message: `New ${taskType} added: ${clickUpTask?.custom_fields?.[customFieldIndex]?.value ||
//                 clickUpTask?.name
//                 }`,
//               taskId: clickUpTask.id,
//               date: new Date(),
//             },
//           ],
//         });
//         if (taskType === "Plan") {
//           await processAttachments(clickUpTask, model);
//           newTask.images = clickUpTask.images;
//         }
//         await newTask.save();
//       }
//     }
//   }

//   try {
//     res.setHeader("Content-Type", "text/event-stream");
//     res.setHeader("Cache-Control", "no-cache");
//     res.setHeader("Connection", "keep-alive");

//     const sendProgress = (message) => {
//       res.write(`data: ${JSON.stringify(message)}\n\n`);
//     };

//     const fetchTasks = async (apiUrl, type) => {
//       const response = await fetch(apiUrl, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: process.env.clickUpToken,
//         },
//       });
//       const data = await response.json();
//       return { tasks: data.tasks, type };
//     };

//     const [planData, facadeData] = await Promise.all([
//       fetchTasks(planApiUrl, "Plan"),
//       fetchTasks(facadeApiUrl, "Facade"),
//     ]);

//     const tasks = [
//       { type: "Plan", data: planData.tasks },
//       { type: "Facade", data: facadeData.tasks },
//     ];

//     sendProgress({
//       totalTasks: tasks.reduce((sum, item) => sum + item.data.length, 0),
//       fetchedTasks: 0,
//     });

//     for (const { data, type } of tasks) {
//       const model = type === "Plan" ? Plan : Facade;
//       await processTasks(data, model, type, sendProgress);
//     }

//     sendProgress({
//       totalTasks: tasks.reduce((sum, item) => sum + item.data.length, 0),
//       fetchedTasks: tasks.reduce((sum, item) => sum + item.data.length, 0),
//       message: "Data Synced Successfully.",
//     });

//     res.end();
//   } catch (error) {
//     console.error("Error fetching or processing data:", error);
//     res.write(
//       `data: ${JSON.stringify({ error: "Internal Server Error" })}\n\n`
//     );
//     res.end();
//   }
// };

// cron.schedule('*/5 0 * * *', () => {
//   const currentTime = moment().tz("Australia/Sydney").format("HH:mm");
//   console.log(`Cron job triggered at ${currentTime} in Australian timezone.`);

//   fetchAllData();
// }, {
//   timezone: "Australia/Sydney" // Ensure cron runs in the Australian timezone
// });

// module.exports = { fetchAllData };

// const cron = require('node-cron');
// const moment = require('moment-timezone');
// const Plan = require("../../Models/plan/projectPlans.js");
// const Facade = require("../../Models/facades/projectFacades.js");
// const dotenv = require("dotenv");
// const fs = require("fs");
// const path = require("path");
// const { createCanvas } = require("canvas");

// dotenv.config();

// const fetchAllData = async (req = null, res = null, isCron = false) => {
//   if(!isCron){
//     console.log("cron job")
//   }
//   const fetch = (await import("node-fetch")).default;
//   const pdfjsLib = (await import("pdfjs-dist")).default;

//   const planApiUrl = `https://api.clickup.com/api/v2/list/${process.env.planListID}/task`;
//   const facadeApiUrl = `https://api.clickup.com/api/v2/list/${process.env.facadeListID}/task`;

//   async function convertPdfFirstPageToBase64(pdfBuffer) {
//     try {
//       const pdfData = new Uint8Array(pdfBuffer);
//       const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
//       const firstPage = await pdfDoc.getPage(1);
//       const viewport = firstPage.getViewport({ scale: 2.0 });
//       const canvas = createCanvas(viewport.width, viewport.height);
//       const context = canvas.getContext("2d");
//       await firstPage.render({ canvasContext: context, viewport }).promise;
//       return canvas.toDataURL("image/png");
//     } catch (err) {
//       console.error("Error converting first page of PDF to Base64:", err);
//       return null;
//     }
//   }

//   async function processAttachments(clickUpTask, taskModel) {
//     for (const attachment of clickUpTask.attachments) {
//       const url = attachment.url;
//       if (url && /plan/i.test(url) && url.endsWith(".pdf")) {
//         try {
//           const response = await fetch(url);
//           const contentType = response.headers.get("Content-Type");
//           if (!contentType || !contentType.includes("pdf")) continue;
//           const pdfBuffer = await response.arrayBuffer();
//           const base64Image = await convertPdfFirstPageToBase64(pdfBuffer);
//           if (base64Image) {
//             const task = await taskModel.findOne({ TaskID: clickUpTask.id });
//             if (task) {
//               task.images.push({ base64: base64Image, name: `${path.basename(url)}_page_1.png`, dateAdded: new Date() });
//               await task.save();
//             }
//           }
//         } catch (error) {
//           console.error(`Failed to process PDF at ${url}:`, error);
//         }
//       }
//     }
//   }

//   async function processTasks(tasks, model, type, sendProgress) {
//     for (const [index, taskId] of tasks.map(task => task.id).entries()) {
//       const taskResponse = await fetch(`https://api.clickup.com/api/v2/task/${taskId}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json", Authorization: process.env.clickUpToken },
//       });
//       const taskDetails = await taskResponse.json();
//       const existingTask = await model.findOne({ TaskID: taskDetails.id });
//       if (existingTask) {
//         if (taskDetails.date_updated > existingTask.data.date_updated) {
//           existingTask.data = taskDetails;
//           existingTask.notifications.push({ message: `${type} updated: ${taskDetails.name}`, taskId: taskDetails.id, date: new Date() });
//           if (type === "Plan") await processAttachments(taskDetails, model);
//           await existingTask.save();
//         }
//       } else {
//         const newTask = new model({ TaskID: taskDetails.id, data: taskDetails, images: [], notifications: [{ message: `New ${type} added: ${taskDetails.name}`, taskId: taskDetails.id, date: new Date() }] });
//         if (type === "Plan") await processAttachments(taskDetails, model);
//         await newTask.save();
//       }
//       if (!isCron) sendProgress({ totalTasks: tasks.length, fetchedTasks: index + 1, type });
//     }
//   }

//   try {
//     if (!isCron) {
//       res.setHeader("Content-Type", "text/event-stream");
//       res.setHeader("Cache-Control", "no-cache");
//       res.setHeader("Connection", "keep-alive");
//     }

//     const sendProgress = (message) => {
//       if (!isCron) res.write(`data: ${JSON.stringify(message)}\n\n`);
//     };

//     const fetchTasks = async (apiUrl, type) => {
//       const response = await fetch(apiUrl, { method: "GET", headers: { "Content-Type": "application/json", Authorization: process.env.clickUpToken } });
//       const data = await response.json();
//       return { tasks: data.tasks, type };
//     };

//     const [planData, facadeData] = await Promise.all([
//       fetchTasks(planApiUrl, "Plan"),
//       fetchTasks(facadeApiUrl, "Facade"),
//     ]);

//     for (const { data, type } of [{ data: planData.tasks, type: "Plan" }, { data: facadeData.tasks, type: "Facade" }]) {
//       await processTasks(data, type === "Plan" ? Plan : Facade, type, sendProgress);
//     }

//     if (!isCron) {
//       sendProgress({ message: "Data Synced Successfully." });
//       res.end();
//     }
//   } catch (error) {
//     console.error("Error fetching or processing data:", error);
//     if (!isCron) {
//       res.write(`data: ${JSON.stringify({ error: "Internal Server Error" })}\n\n`);
//       res.end();
//     }
//   }
// };

// // cron.schedule('*/1 0 * * *', () => {
// //   console.log(`Cron job triggered at ${moment().tz("Australia/Sydney").format("HH:mm")} in Australian timezone.`);
// //   fetchAllData(null, null, true);
// // }, { timezone: "Australia/Sydney" });

// cron.schedule('*/5 * * * *', () => {
//   console.log(`Cron job triggered at ${moment().tz("Australia/Sydney").format("HH:mm")} in Australian timezone.`);
//   fetchAllData(null, null, true);
// }, { timezone: "Australia/Sydney" });

// // Every 10 sec
// // cron.schedule('*/10 * * * * *', () => {
// //   console.log(`Cron job triggered at ${moment().tz("Australia/Sydney").format("HH:mm:ss")} in Australian timezone.`);
// //   fetchAllData(null, null, true);
// // }, { timezone: "Australia/Sydney" });

// module.exports = { fetchAllData };

const dotenv = require("dotenv");
const moment = require("moment-timezone");
const Plan = require("../../Models/plan/projectPlans.js");
const Facade = require("../../Models/facades/projectFacades.js");
const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

dotenv.config();

const fetchAllData = async (req, res) => {
  console.log("Manual sync request received.");

  const fetch = (await import("node-fetch")).default;
  const pdfjsLib = (await import("pdfjs-dist")).default;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const sendProgress = (message) => {
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  };

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
      console.error("Error converting PDF to Base64:", err);
      return null;
    }
  }

  async function processAttachments(clickUpTask, taskModel) {
    // clickUpTask.images = []
    // clickUpTask.markModified("images")
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
            } else {
              console.log("Task not found", clickUpTask.id);
            }
          }
        } catch (error) {
          console.error(`Failed to process PDF at ${url}:`, error);
        }
      } else {
        console.log("Not a plan pdf", url);
      }
    }
  }

  async function processTasks(tasks, model, type) {
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
          existingTask.images = [];
          existingTask.notifications.push({
            message: `${type} updated: ${taskDetails.name}`,
            taskId: taskDetails.id,
            date: new Date(),
          });
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
      sendProgress({ totalTasks: tasks.length, fetchedTasks: index + 1, type });
    }
  }

  try {
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

    for (const { tasks, type } of [
      { tasks: planData.tasks, type: "Plan" },
      { tasks: facadeData.tasks, type: "Facade" },
    ]) {
      await processTasks(tasks, type === "Plan" ? Plan : Facade, type);
    }

    sendProgress({ message: "Data Synced Successfully." });
    res.end();
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    res.write(
      `data: ${JSON.stringify({ error: "Internal Server Error" })}\n\n`
    );
    res.end();
  }
};

module.exports = { fetchAllData };
