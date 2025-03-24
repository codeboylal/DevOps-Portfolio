// const Plan = require("../../Models/plan/projectPlans.js");
// const Facade = require("../../Models/facades/projectFacades.js");
// const dotenv = require("dotenv");
// const fs = require("fs");
// const path = require("path");
// const { convert } = require("pdf-poppler");

// dotenv.config();

// const fetchAllData = async (req, res) => {
//   const fetch = (await import("node-fetch")).default;

//   // const planApiUrl = `https://api.clickup.com/api/v2/list/${process.env.planListID}/task?subtasks=true&include_closed=true`;
//   // const facadeApiUrl = `https://api.clickup.com/api/v2/list/${process.env.facadeListID}/task?subtasks=true&include_closed=true`;
//   const planApiUrl = `https://api.clickup.com/api/v2/list/${process.env.planListID}/task`;
//   const facadeApiUrl = `https://api.clickup.com/api/v2/list/${process.env.facadeListID}/task`;

//   // Convert PDF to JPG
//   async function convertPdfToImage(pdfBuffer, outputDir, pdfName) {
//     const tempPdfPath = path.join(outputDir, `temp_${Date.now()}.pdf`);
//     const outputFileBase = path.join(outputDir, pdfName.replace(".pdf", ""));

//     try {
//       fs.writeFileSync(tempPdfPath, pdfBuffer);

//       const options = {
//         format: "jpeg",
//         out_dir: outputDir,
//         out_prefix: path.basename(outputFileBase),
//         page: null,
//       };

//       await convert(tempPdfPath, options);

//       // console.log(`PDF converted successfully to images at ${outputDir}`);
//       return fs.readdirSync(outputDir)
//         .filter((file) => file.startsWith(path.basename(outputFileBase)))
//         .map((file) => ({ name: file, dateAdded: new Date() }));
//     } catch (err) {
//       console.error("Error during PDF to image conversion:", err);
//       return [];
//     } finally {
//       if (fs.existsSync(tempPdfPath)) {
//         fs.unlinkSync(tempPdfPath);
//       }
//     }
//   }

//   async function deletePreviousImages(imageArray) {
//     for (const image of imageArray) {
//       const imagePath = path.join(__dirname, "../../public/plans", image.name);
//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath);
//         // console.log(`Deleted previous image: ${image.name}`);
//       }
//     }
//   }

//   async function processAttachments(clickUpTask, taskModel) {
//     // console.log(`Processing attachments for task: ${clickUpTask.id}`);
//     const newImages = [];

//     for (const attachment of clickUpTask.attachments) {
//       const url = attachment.url;

//       if (url && /plan/i.test(url) && url.endsWith(".pdf")) {
//         const pdfName = path.basename(url);
//         // console.log(`Processing attachment: ${url}`);
//         try {
//           const response = await fetch(url);
//           const pdfBuffer = await response.buffer();

//           const outputDir = path.join(__dirname, "../../public/plans", clickUpTask.id.toString());
//           if (!fs.existsSync(outputDir)) {
//             fs.mkdirSync(outputDir, { recursive: true });
//           }

//           const convertedImages = await convertPdfToImage(pdfBuffer, outputDir, pdfName);
//           newImages.push(...convertedImages);
//         } catch (error) {
//           console.error(`Failed to process PDF at ${url}:`, error);
//         }
//       }
//     }

//     if (newImages.length > 0) {
//       const existingTask = await taskModel.findOne({ TaskID: clickUpTask.id });
//       if (existingTask) {
//         await deletePreviousImages(existingTask.images);
//         existingTask.images = newImages;
//         await existingTask.save();
//       } else {
//         clickUpTask.images = newImages;
//       }
//     }
//   }

//   async function processTasks(tasks, model, type, sendProgress) {
//     const updatedClickUpData = [];

//     for (const [index, taskId] of tasks.map((task) => task.id).entries()) {
//       const taskResponse = await fetch(
//         // `https://api.clickup.com/api/v2/task/${taskId}?include_subtasks=true`,
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
//             message: `${taskType} updated: ${clickUpTask?.custom_fields?.[customFieldIndex]?.value || clickUpTask?.name}`,
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
//               message: `New ${taskType} added: ${clickUpTask?.custom_fields?.[customFieldIndex]?.value || clickUpTask?.name}`,
//               taskId: clickUpTask.id,
//               date: new Date(),
//             },
//           ],
//         });
//         if (taskType === "Plan") {
//           await processAttachments(clickUpTask, model);
//           newTask.images = clickUpTask.images
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

// module.exports = { fetchAllData };






  const Plan = require("../../Models/plan/projectPlans.js");
  const Facade = require("../../Models/facades/projectFacades.js");
  const dotenv = require("dotenv");
  const fs = require("fs");
  const path = require("path");
  const { createCanvas } = require("canvas");
  const pdfjsLib = require("pdfjs-dist");
  
  dotenv.config();
  
  const fetchAllData = async (req, res) => {
    const fetch = (await import("node-fetch")).default;
    const planApiUrl = `https://api.clickup.com/api/v2/list/${process.env.planListID}/task`;
    const facadeApiUrl = `https://api.clickup.com/api/v2/list/${process.env.facadeListID}/task`;
  
    /**
     * Convert the first page of a PDF to a Base64 image
     * @param {ArrayBuffer} pdfBuffer - The PDF file as an ArrayBuffer
     * @returns {Promise<string|null>} Base64 string of the image or null on failure
     */
    async function convertPdfFirstPageToBase64(pdfBuffer) {
      try {
        const pdfData = new Uint8Array(pdfBuffer);
  
        // Load the PDF using pdfjs-dist
        const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
  
        // Get the first page
        const firstPage = await pdfDoc.getPage(1);
        const viewport = firstPage.getViewport({ scale: 2.0 }); // Adjust scale as needed
  
        // Create a canvas to render the first page
        const canvas = createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext("2d");
  
        const renderContext = {
          canvasContext: context,
          viewport,
        };
  
        // Render the page onto the canvas
        await firstPage.render(renderContext).promise;
  
        // Convert the canvas content to a Base64 image
        return canvas.toDataURL("image/png");
      } catch (err) {
        console.error("Error converting first page of PDF to Base64:", err);
        return null;
      }
    }
  
    /**
     * Process PDF attachments, convert to Base64, and update the database
     */
    async function processAttachments(clickUpTask, taskModel) {
      const newImages = [];
  
      for (const attachment of clickUpTask.attachments) {
        const url = attachment.url;
  
        if (url && /plan/i.test(url) && url.endsWith(".pdf")) {
          const pdfName = path.basename(url);
          try {
            const response = await fetch(url);
            const contentType = response.headers.get("Content-Type");
  
            if (!contentType || !contentType.includes("pdf")) {
              console.error(`Fetched file is not a PDF: ${pdfName}`);
              continue;
            }
  
            const pdfBuffer = await response.arrayBuffer();
            const base64Image = await convertPdfFirstPageToBase64(pdfBuffer);
  
            if (base64Image) {
              newImages.push({
                base64: base64Image,
                name: `${pdfName}_page_1.png`,
                dateAdded: new Date(),
              });
  
              // Update MongoDB task with Base64-encoded first page
              const task = await taskModel.findOne({ TaskID: clickUpTask.id });
  
              if (task) {
                task.images.push({
                  base64: base64Image,
                  name: `${pdfName}_page_1.png`,
                  dateAdded: new Date(),
                });
                await task.save();
              }
            } else {
              console.error(`Failed to convert PDF to Base64 for ${pdfName}`);
            }
          } catch (error) {
            console.error(`Failed to process PDF at ${url}:`, error);
          }
        }
      }
  
      if (newImages.length > 0) {
        const existingTask = await taskModel.findOne({ TaskID: clickUpTask.id });
        if (existingTask) {
          existingTask.images = newImages;
          await existingTask.save();
        } else {
          clickUpTask.images = newImages;
        }
      }
    }
  
    /**
     * Main logic to process tasks and synchronize data with MongoDB
     */
    async function processTasks(tasks, model, type, sendProgress) {
      const updatedClickUpData = [];
  
      for (const [index, taskId] of tasks.map((task) => task.id).entries()) {
        const taskResponse = await fetch(
          `https://api.clickup.com/api/v2/task/${taskId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: process.env.clickUpToken,
            },
          }
        );
        const taskDetails = await taskResponse.json();
        updatedClickUpData.push(taskDetails);
  
        sendProgress({
          totalTasks: tasks.length,
          fetchedTasks: index + 1,
          type,
        });
      }
  
      const mongoDBData = await model.find({});
  
      for (let clickUpTask of updatedClickUpData) {
        const existingTask = mongoDBData.find(
          (dbTask) => dbTask.TaskID === clickUpTask.id
        );
        const customFieldIndex = type === "Plan" ? 10 : 9;
        const taskType = type === "Plan" ? "Plan" : "Facade";
  
        if (existingTask) {
          if (clickUpTask.date_updated > existingTask.data.date_updated) {
            existingTask.data = clickUpTask;
            existingTask.notifications.push({
              message: `${taskType} updated: ${
                clickUpTask?.custom_fields?.[customFieldIndex]?.value ||
                clickUpTask?.name
              }`,
              taskId: clickUpTask.id,
              date: new Date(),
            });
  
            if (taskType === "Plan") {
              await processAttachments(clickUpTask, model);
            }
  
            await existingTask.save();
          }
        } else {
          const newTask = new model({
            TaskID: clickUpTask.id,
            data: clickUpTask,
            images: [],
            notifications: [
              {
                message: `New ${taskType} added: ${
                  clickUpTask?.custom_fields?.[customFieldIndex]?.value ||
                  clickUpTask?.name
                }`,
                taskId: clickUpTask.id,
                date: new Date(),
              },
            ],
          });
          if (taskType === "Plan") {
            await processAttachments(clickUpTask, model);
            newTask.images = clickUpTask.images;
          }
          await newTask.save();
        }
      }
    }
  
    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
  
      const sendProgress = (message) => {
        res.write(`data: ${JSON.stringify(message)}\n\n`);
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
  
      const tasks = [
        { type: "Plan", data: planData.tasks },
        { type: "Facade", data: facadeData.tasks },
      ];
  
      sendProgress({
        totalTasks: tasks.reduce((sum, item) => sum + item.data.length, 0),
        fetchedTasks: 0,
      });
  
      for (const { data, type } of tasks) {
        const model = type === "Plan" ? Plan : Facade;
        await processTasks(data, model, type, sendProgress);
      }
  
      sendProgress({
        totalTasks: tasks.reduce((sum, item) => sum + item.data.length, 0),
        fetchedTasks: tasks.reduce((sum, item) => sum + item.data.length, 0),
        message: "Data Synced Successfully.",
      });
  
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
  