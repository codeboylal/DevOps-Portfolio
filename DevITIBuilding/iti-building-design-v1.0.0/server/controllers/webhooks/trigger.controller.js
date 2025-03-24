const dotenv = require("dotenv");

const { List } = require("../clickUp/getAllProjectClickupData.controller.js");
const {
  ProjectCompleted,
} = require("../../Models/projects/projectsCompleted.js");
const { ProjectRunning } = require("../../Models/projects/projectsRunning.js");
// const Plan = require("../../Models/plan/projectPlans.js");
// const Facade = require("../../Models/facades/projectFacades.js")
const User = require("../../Models/Sign In Up/SignIn/signInModel.js");

const ResponseHandler = require("../../utils/responseHandler.js");

dotenv.config();

const taskSave = async (fetch, model, task_Id, res, parent_id) => {
  const taskResponse = await fetch(
    `https://api.clickup.com/api/v2/task/${task_Id}?include_subtasks=true&include_closed=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.clickUpToken,
      },
    }
  );
  const taskDetails = await taskResponse.json();
  const taskParentId = taskDetails?.top_level_parent || task_Id
  const task = await model.findOne({ TaskID: taskParentId });

  if (task) {
    const parentTaskResponse = await fetch(
      `https://api.clickup.com/api/v2/task/${taskParentId}?include_subtasks=true&include_closed=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.clickUpToken,
        },
      }
    );
    const ParentDetails = await parentTaskResponse.json();
    // console.log(taskDetails)
    if (ParentDetails) {
      task.data = ParentDetails;
      await task.save();
      //   console.log("task is saved");

      return {
        status: 200,
        responseStatus: 404,
        message: `${model} ${task_Id} Updated`,
      };
    } else {
      return {
        status: 200,
        responseStatus: 404,
        message: `Error fetching ${task_Id} details`,
      };
    }
  } else {
    return {
      status: 200,
      responseStatus: 404,
      message: "No Task Found",
    };
  }
};

// const findList = async (parent_id) => {
//   const list = await List.findOne({ listId: parent_id });
//   if (!list) {
//   }

//   return [list._id, list.tasks];
// };

const TriggerWebhooks = async (req, res) => {
  try {
    // const signature = req.headers["x-clickup-signature"];
    // const payload = JSON.stringify(req.body);

    // // Verify the signature
    // const hmac = crypto.createHmac("sha256", process.env.CLICKUP_WEBHOOK_SECRET).update(payload).digest("hex");

    // if (signature !== hmac) {
    //     console.log("Invalid signature, rejecting request.");
    //     return res.status(401).send("Unauthorized");
    // }

    const fetch = (await import("node-fetch")).default;
    const contactList = [
      process.env.webhook_contacts_company,
      process.env.webhook_contacts_company_contacts,
      process.env.webhook_contacts_councils,
      process.env.webhook_contacts_estate,
      process.env.webhook_contacts_contractors,
      process.env.webhook_contacts_water_authority,
      process.env.webhook_contacts_owner_details,
    ];
    // console.log("Req.body",req.body)
    // console.log("data",req.body.history_items[0].before,req.body.history_items[0].after)
    // console.log(req.body.history_items[0]?.custom_field)
    // console.log("Parent ID", req.body.history_items[0].parent_id)
    if (
      req.body.event === "taskUpdated"
      || req.body.event === "taskPriorityUpdated" ||
      req.body.event === "taskStatusUpdated" ||
      req.body.event === "taskAssigneeUpdated" ||
      req.body.event === "taskDueDateUpdated" ||
      req.body.event === "taskTagUpdated" ||
      req.body.event === "taskMoved" ||
      req.body.event === "taskCommentPosted" ||
      req.body.event === "taskCommentUpdated" ||
      req.body.event === "taskTimeEstimateUpdated" ||
      req.body.event === "taskTimeTrackedUpdated"
    ) {
      if (req?.body?.history_items?.[0]?.parent_id) {
        let model = null;
        const parent_id = req.body.history_items[0].parent_id;
        const task_Id = req.body?.task_id;
        // if(parent_id === process.env.webhook_plans){
        //     console.log(`Plan ${req?.body?.event || "event"}`)
        //     model = Plan
        // }else if(parent_id === process.env.webhook_facades){
        //     console.log(`Facade ${req?.body?.event || "event"}`)
        //     model = Facade
        // }else
        if (parent_id === process.env.webhook_project_completed) {
          console.log(`Project Completed ${req?.body?.event || "event"}`);
          model = ProjectCompleted;
        } else if (parent_id === process.env.webhook_project_running) {
          console.log(`Project Running ${req?.body?.event || "event"}`);
          model = ProjectRunning;
        } else if (contactList.includes(parent_id)) {
          // const listIndex = contactList.findIndex(parent_id)
          // console.log(listIndex, contactList?.[listIndex])
          // const [listID,tasks ] = await findList(parent_id)
          const list = await List.findOne({ listId: parent_id });
          if (!list) {
            return res
              .status(200)
              .json(
                ResponseHandler(404, null, `No List Found for ${parent_id}`)
              );
          }
          const listID = list._id;
          const tasks = list.tasks;
          // console.log(listID);
          console.log(`Contact ${parent_id} ${req?.body?.event || "event"}`);
          for (let task of tasks) {
            // console.log(task.id);
            if (task.taskId === task_Id) {
              const taskResponse = await fetch(
                `https://api.clickup.com/api/v2/task/${task_Id}?include_subtasks=true&include_closed=true`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.clickUpToken,
                  },
                }
              );
              const taskDetails = await taskResponse.json();
              if (!taskDetails) {
                return res
                  .status(200)
                  .json(
                    ResponseHandler(
                      404,
                      null,
                      `No Task details Found for ${task_Id}`
                    )
                  );
              }
              task.taskName = taskDetails.name
              task.taskDetails = taskDetails;
              await list.save();
              const orgId = taskDetails.id;
              const orgName = taskDetails.name;

              const profiles = await User.find();
              for (let profile of profiles) {
                if (profile?.accountTypeId === orgId) {
                  profile.accountType = orgName;
                  await profile.save();
                }
              }

              return res
                .status(200)
                .json(ResponseHandler(200, null, "List details updated"));
            }
          }

          // model = List
        } else {
          console.log(
            `No DB Found ${parent_id} ${req?.body?.event || "event"}`
          );
        }
        if (model && model.length > 0) {
          const responseObj = taskSave(
            fetch,
            model,
            task_Id,
            res,
            parent_id
          );
          return res
            .status((await responseObj).status)
            .json(
              ResponseHandler(
                (await responseObj).responseStatus,
                null,
                (await responseObj).message
              )
            );
        } else {
          return res
            .status(200)
            .json(ResponseHandler(404, null, "No DB Found"));
        }
      } else {
        console.log("Parent ID is not defined");
      }
      return res.status(200).json(ResponseHandler(200, null, "Got a Trigger"));
    } else if (req.body.event === "taskCreated") {
      // const parent_id = req.body.history_items[0].parent_id;
      // const task_Id = req.body?.task_id;
      // console.log(req.body)
      // return req.status(200)
    }
    console.log(req.body.event);
    return res
      .status(200)
      .json(
        ResponseHandler(404, null, `No Function found for ${req.body.event}`)
      );
  } catch (error) {
    console.error("Error in trigger webhooks controller:", error);
    return res
      .status(500)
      .json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

module.exports = {
  TriggerWebhooks,
};

// event
// taskUpdated
// taskCreated
// taskDeleted

// task_id
// parent_id

// history_items

// const dotenv = require("dotenv");

// const { List } = require("../clickUp/getAllProjectClickupData.controller.js");
// const {
//   ProjectCompleted,
// } = require("../../Models/projects/projectsCompleted.js");
// const { ProjectRunning } = require("../../Models/projects/projectsRunning.js");
// // const Plan = require("../../Models/plan/projectPlans.js");
// // const Facade = require("../../Models/facades/projectFacades.js")
// const User = require("../../Models/Sign In Up/SignIn/signInModel.js");

// const ResponseHandler = require("../../utils/responseHandler.js");

// dotenv.config();

// const taskSave = async (fetch, model, task, task_Id, res, parent_id) => {
//   if (task) {
//     const taskResponse = await fetch(
//       `https://api.clickup.com/api/v2/task/${task_Id}?include_subtasks=true&include_closed=true`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: process.env.clickUpToken,
//         },
//       }
//     );
//     const taskDetails = await taskResponse.json();
//     // console.log(taskDetails)
//     if (taskDetails) {
//       task.data = taskDetails;
//       await task.save();
//       //   console.log("task is saved");
//       if (
//         parent_id === process.env.webhook_project_completed ||
//         parent_id === process.env.webhook_project_running
//       ) {
//         // if (taskDetails?.subtasks && Array.isArray(taskDetails?.subtasks)) {
//         //   for (let stages of taskDetails.subtasks) {
//         //     if (stages?.subtasks && Array.isArray(stages?.subtasks)) {
//         //       for (let task of stages.subtasks) {
//         //         if(task?.subtasks && Array.isArray(task?.subtasks)){
//         //             for (let subtask of task?.subtasks) {
//         //                 console.log(subtask.assignees?.[0]);
//         //               }
//         //         }
//         //       }
//         //     }
//         //   }
//         // }
//         if (Array.isArray(taskDetails?.subtasks)) {
//           const taskData = taskDetails.subtasks
//             .flatMap((stages) =>
//               Array.isArray(stages?.subtasks)
//                 ? stages.subtasks.map((task) => task.custom_item_id !== 1004 && ({
//                     ...task,
//                     stageId: stages.id,
//                   }))
//                 : []
//             )
//             .flatMap((task) =>
//               Array.isArray(task?.subtasks)
//                 ? task.subtasks.map((subtask) => ({
//                     ...subtask,
//                     taskId: task.id,
//                   }))
//                 : []
//             )
//             .map((subtask) => ({
//               taskId: taskDetails.id, // Top-level ID
//               projectNumber: taskDetails.name.split("_")[0],
//               address: taskDetails.name,
//               stageId: subtask.taskId, // Stages ID
//               SubTaskId: subtask.id, // Subtask ID
//               task: subtask.name, // Subtask name
//               email: subtask.assignees?.[0]?.email, // Extract email
//               subtask: subtask,
//             }))
//             .filter((item) => item.email); // Remove items with no assignee

//           //   console.log("Task Data:", taskData);
//           if (taskData && taskData?.length > 0) {
//             for (let data of taskData) {
//               const profile = await User.findOne({ email: data.email });
//               if (profile) {
//                 if(profile?.inbox?.length > 0){
//                   for (let id of profile.inbox) {
//                     if (id?.subtask?.id !== data?.SubTaskId) {
//                       profile.inbox.push(data);
//                       await profile.save();
//                     }
//                   }
//                 }else{
//                   profile.inbox.push(data);
//                   await profile.save();
//                 }
//               }
//             }
//           }
//         }
//       }

//       //   [
//       //     {
//       //     taskId: '86cx7mcdf',
//       //     stageId: '86cx7mcez',
//       //     SubTaskId: '86cx7mcg6',
//       //     task: 'Receive and review the final Documents',
//       //     email: 'No Assignee'
//       //   },
//       //   {
//       //     taskId: '86cx7mcdf',
//       //     stageId: '86cx7mcez',
//       //     SubTaskId: '86cx7mcg1',
//       //     task: 'Submit Documents to RBS',
//       //     email: 'No Assignee'
//       //   }
//       // ]

//       return {
//         status: 200,
//         responseStatus: 404,
//         message: `${model} ${task_Id} Updated`,
//       };
//     } else {
//       return {
//         status: 200,
//         responseStatus: 404,
//         message: `Error fetching ${task_Id} details`,
//       };
//     }
//   } else {
//     return {
//       status: 200,
//       responseStatus: 404,
//       message: "No Task Found",
//     };
//   }
// };

// // const findList = async (parent_id) => {
// //   const list = await List.findOne({ listId: parent_id });
// //   if (!list) {
// //   }

// //   return [list._id, list.tasks];
// // };

// const TriggerWebhooks = async (req, res) => {
//   try {

//     // const signature = req.headers["x-clickup-signature"];
//     // const payload = JSON.stringify(req.body);

//     // // Verify the signature
//     // const hmac = crypto.createHmac("sha256", process.env.CLICKUP_WEBHOOK_SECRET).update(payload).digest("hex");

//     // if (signature !== hmac) {
//     //     console.log("Invalid signature, rejecting request.");
//     //     return res.status(401).send("Unauthorized");
//     // }

//     const fetch = (await import("node-fetch")).default;
//     const contactList = [
//       process.env.webhook_contacts_company,
//       process.env.webhook_contacts_company_contacts,
//       process.env.webhook_contacts_councils,
//       process.env.webhook_contacts_estate,
//       process.env.webhook_contacts_contractors,
//       process.env.webhook_contacts_water_authority,
//       process.env.webhook_contacts_owner_details,
//     ];
//     // console.log("Req.body",req.body)
//     // console.log("data",req.body.history_items[0].before,req.body.history_items[0].after)
//     // console.log(req.body.history_items[0]?.custom_field)
//     // console.log("Parent ID", req.body.history_items[0].parent_id)
//     if (
//       req.body.event === "taskUpdated" ||
//       req.body.event === "taskPriorityUpdated" ||
//       req.body.event === "taskStatusUpdated" ||
//       req.body.event === "taskAssigneeUpdated" ||
//       req.body.event === "taskDueDateUpdated" ||
//       req.body.event === "taskTagUpdated" ||
//       req.body.event === "taskMoved" ||
//       req.body.event === "taskCommentPosted" ||
//       req.body.event === "taskCommentUpdated" ||
//       req.body.event === "taskTimeEstimateUpdated" ||
//       req.body.event === "taskTimeTrackedUpdated"
//     ) {
//       if (req?.body?.history_items?.[0]?.parent_id) {
//         let model = null;
//         const parent_id = req.body.history_items[0].parent_id;
//         const task_Id = req.body?.task_id;
//         // if(parent_id === process.env.webhook_plans){
//         //     console.log(`Plan ${req?.body?.event || "event"}`)
//         //     model = Plan
//         // }else if(parent_id === process.env.webhook_facades){
//         //     console.log(`Facade ${req?.body?.event || "event"}`)
//         //     model = Facade
//         // }else
//         if (parent_id === process.env.webhook_project_completed) {
//           console.log(`Project Completed ${req?.body?.event || "event"}`);
//           model = ProjectCompleted;
//         } else if (parent_id === process.env.webhook_project_running) {
//           console.log(`Project Running ${req?.body?.event || "event"}`);
//           model = ProjectRunning;
//         } else if (contactList.includes(parent_id)) {
//           // const listIndex = contactList.findIndex(parent_id)
//           // console.log(listIndex, contactList?.[listIndex])
//           // const [listID,tasks ] = await findList(parent_id)
//           const list = await List.findOne({ listId: parent_id });
//           if (!list) {
//             return res
//               .status(200)
//               .json(
//                 ResponseHandler(404, null, `No List Found for ${parent_id}`)
//               );
//           }
//           const listID = list._id;
//           const tasks = list.tasks;
//           // console.log(listID);
//           console.log(`Contact ${parent_id} ${req?.body?.event || "event"}`);
//           for (let task of tasks) {
//             // console.log(task.id);
//             if (task.taskId === task_Id) {
//               const taskResponse = await fetch(
//                 `https://api.clickup.com/api/v2/task/${task_Id}?include_subtasks=true&include_closed=true`,
//                 {
//                   method: "GET",
//                   headers: {
//                     "Content-Type": "application/json",
//                     Authorization: process.env.clickUpToken,
//                   },
//                 }
//               );
//               const taskDetails = await taskResponse.json();
//               if (!taskDetails) {
//                 return res
//                   .status(200)
//                   .json(
//                     ResponseHandler(
//                       404,
//                       null,
//                       `No Task details Found for ${task_Id}`
//                     )
//                   );
//               }

//               task.taskDetails = taskDetails;
//               //   await task.save()
//               await list.save();
//               return res
//                 .status(200)
//                 .json(ResponseHandler(200, null, "List details updated"));
//             }
//           }

//           // model = List
//         } else {
//           console.log(
//             `No DB Found ${parent_id} ${req?.body?.event || "event"}`
//           );
//         }
//         if (model && model.length > 0) {
//           const task = await model.findOne({ TaskID: task_Id });
//           const responseObj = taskSave(
//             fetch,
//             model,
//             task,
//             task_Id,
//             res,
//             parent_id
//           );
//           return res
//             .status((await responseObj).status)
//             .json(
//               ResponseHandler(
//                 (await responseObj).responseStatus,
//                 null,
//                 (await responseObj).message
//               )
//             );
//         } else {
//           return res
//             .status(200)
//             .json(ResponseHandler(404, null, "No DB Found"));
//         }
//       } else {
//         console.log("Parent ID is not defined");
//       }
//       return res.status(200).json(ResponseHandler(200, null, "Got a Trigger"));
//     }else if(
//       req.body.event === "taskCreated"
//     ){
//       // const parent_id = req.body.history_items[0].parent_id;
//       // const task_Id = req.body?.task_id;
//       // console.log(req.body)
//       // return req.status(200)
//     }
//     console.log(req.body.event);
//     return res
//       .status(200)
//       .json(
//         ResponseHandler(404, null, `No Function found for ${req.body.event}`)
//       );
//   } catch (error) {
//     console.error("Error in trigger webhooks controller:", error);
//     return res
//       .status(500)
//       .json(ResponseHandler(500, null, "Internal Server Error"));
//   }
// };

// module.exports = {
//   TriggerWebhooks,
// };

// // event
// // taskUpdated
// // taskCreated
// // taskDeleted

// // task_id
// // parent_id

// // history_items
