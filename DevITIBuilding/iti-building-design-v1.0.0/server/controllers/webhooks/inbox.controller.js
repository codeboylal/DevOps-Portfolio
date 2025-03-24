const dotenv = require("dotenv");

const crypto = require("crypto");

const {
  ProjectCompleted,
} = require("../../Models/projects/projectsCompleted.js");

const { ProjectRunning } = require("../../Models/projects/projectsRunning.js");

const User = require("../../Models/Sign In Up/SignIn/signInModel.js");

const ResponseHandler = require("../../utils/responseHandler.js");

const { TaskAssignedTo } = require("../../Models/projects/assignedTo.js");

dotenv.config();

const RemoveFromDB = async (task_Id) => {
  const profileData = await User.find();
  const profile = profileData.find((data) =>
    data?.inbox?.some((task) => task.SubTaskId === task_Id)
  );
  // console.log(profiles)
  // for(let profile of profiles){
  if (profile) {
    profile.inbox = profile.inbox.filter((task) => task.SubTaskId !== task_Id);
    await profile.save();
  }
};

const storeAssignedToEmail = async (task_Id, assigneeEmail, taskDetails) => {
  if (task_Id && taskDetails) {
    // console.log(JSON.stringify(taskDetails))
    const task = await TaskAssignedTo.findOne({ TaskID: task_Id });
    if (task) {
      (task.TopLevelParentTask_ID = taskDetails?.top_level_parent),
        (task.ParentTask_ID = taskDetails?.parent),
        (task.TaskName = taskDetails?.name),
        (task.AssignedTo = assigneeEmail || "-"),
        (task.List_Id = taskDetails?.list?.id),
        (task.FolderId = taskDetails?.folder?.id);
      await task.save();
    } else {
      const newTask = new TaskAssignedTo({
        TopLevelParentTask_ID: taskDetails?.top_level_parent,
        ParentTask_ID: taskDetails?.parent,
        TaskID: task_Id,
        TaskName: taskDetails?.name,
        AssignedTo: assigneeEmail || "-",
        List_Id: taskDetails?.list?.id,
        FolderId: taskDetails?.folder?.id,
      });
      await newTask.save();
    }
  }
};

const deleteTaskNoProfile = async (task_Id) => {
  const profiles = await User.find();
  await Promise.all(
    profiles.map(async (p) => {
      if (p?.inbox?.length > 0) {
        p.inbox = p.inbox.filter((task) => task?.SubTaskId !== task_Id);
        await p.save();
      }
    })
  );
};

const InboxWebhook = async (req, res) => {
  try {
    // const signature = req.headers["x-signature"];
    // const payload = JSON.stringify(req.body);

    // // Verify the signature
    // const hmac = crypto
    //   .createHmac("sha256", process.env.CLICKUP_WEBHOOK_SECRET)
    //   .update(payload)
    //   .digest("hex");

    // if (signature !== hmac) {
    //   console.log("Invalid signature, rejecting request.");
    //   return res.status(401).send("Unauthorized");
    // }
    // console.log(signature === hmac , signature, hmac)

    // return res.status(200).json(ResponseHandler(200, null, "Got a Trigger"));

    const fetch = (await import("node-fetch")).default;
    console.log("Req.body", req.body);
    // console.log("data",req.body.history_items[0].before,req.body.history_items[0].after)
    // console.log(req.body.history_items[0]?.custom_field)
    // console.log("Parent ID", req.body.history_items[0].parent_id)
    if(req?.body?.event === "taskDeleted"){
      deleteTaskNoProfile(req?.body?.task_id)
      return res.status(200).json(ResponseHandler(true, null, "Task Deleted from clickup and removed from inbox in users"))
    }
    else if (
      req.body.event === "taskUpdated"
      // || req.body.event === "taskPriorityUpdated" ||
      // req.body.event === "taskStatusUpdated" ||
      // req.body.event === "taskAssigneeUpdated" ||
      // req.body.event === "taskDueDateUpdated" ||
      // req.body.event === "taskTagUpdated" ||
      // req.body.event === "taskMoved" ||
      // req.body.event === "taskCommentPosted" ||
      // req.body.event === "taskCommentUpdated" ||
      // req.body.event === "taskTimeEstimateUpdated" ||
      // req.body.event === "taskTimeTrackedUpdated"
    ) {
      if (req?.body?.history_items?.[0]?.parent_id) {
        let model = null;
        const parent_id = req.body.history_items[0].parent_id;
        const task_Id = req.body?.task_id;
        if (parent_id === process.env.webhook_project_completed) {
          console.log(`Project Completed ${req?.body?.event || "event"}`);
          model = ProjectCompleted;
        } else if (parent_id === process.env.webhook_project_running) {
          console.log(`Project Running ${req?.body?.event || "event"}`);
          model = ProjectRunning;
        } else {
          return res
            .status(200)
            .json(
              ResponseHandler(
                404,
                null,
                `No DB Found ${parent_id} ${req?.body?.event || "event"}`
              )
            );
        }
        if (model && model.length > 0) {
          const taskResponse = await fetch(
            // `https://api.clickup.com/api/v2/task/${task_Id}?include_subtasks=true&include_closed=true`,
            `https://api.clickup.com/api/v2/task/${task_Id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: process.env.clickUpToken,
              },
            }
          );
          const taskDetails = await taskResponse.json();
          if (taskDetails) {
            // {
            //     event: 'taskUpdated',
            //     history_items: [
            //       {
            //         id: '4444526275533318688',
            //         type: 1,
            //         date: '1740710549471',
            //         field: 'name',
            //         parent_id: '901605161944',
            //         data: {},
            //         source: null,
            //         user: [Object],
            //         before: 'Waiting for Contact sdsd',
            //         after: 'Waiting for Contact sds'
            //       }
            //     ],
            //     task_id: '86cxvgz2y',
            //     webhook_id: '6f02698c-e478-4a77-95d3-cf0e25b37271'
            //   }
            // console.log(taskDetails.top_level_parent || taskDetails.id);

            if (
              taskDetails?.custom_item_id === 1004 ||
              taskDetails?.custom_item_id === 1005
            ) {
              RemoveFromDB(task_Id);
              return res
                .status(200)
                .json(
                  ResponseHandler(403, null, `Task ${task_Id} is a Design Task`)
                );
            }
            const assigneeEmail = taskDetails?.custom_fields?.filter(
              (field) => field.name.toLowerCase() === "contact email"
            )?.[0]?.value;
            storeAssignedToEmail(task_Id, assigneeEmail, taskDetails);
            if (assigneeEmail) {
              const profile = await User.findOne({ email: assigneeEmail });
              if (!profile) {
                deleteTaskNoProfile(taskDetails?.id);
                return res
                  .status(200)
                  .json(
                    ResponseHandler(
                      true,
                      null,
                      "Assignee not found , Task deleted if there was any"
                    )
                  );
              }
              if (profile && !profile?.inbox) {
                profile.inbox = [];
                await profile.save();
              }
              const parentTaskResponse = await fetch(
                // `https://api.clickup.com/api/v2/task/${task_Id}?include_subtasks=true&include_closed=true`,
                `https://api.clickup.com/api/v2/task/${
                  taskDetails.top_level_parent || taskDetails.id
                }`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.clickUpToken,
                  },
                }
              );
              const parentTaskDetails = await parentTaskResponse.json();
              if (!parentTaskDetails) {
                return res
                  .status(200)
                  .json(
                    ResponseHandler(
                      404,
                      null,
                      "Error Fetch Parent Task Details"
                    )
                  );
              }
              console.log(taskDetails?.status?.status);
              let taskFound = false;
              for (let i of profile.inbox) {
                if (i?.SubTaskId === task_Id) {
                  taskFound = true;
                  i.subtask = taskDetails;
                  i.task = taskDetails.name;
                  i.projectNumber = parentTaskDetails.name.split("_")[0];
                  i.address = parentTaskDetails.name;

                  (i.completedStatus =
                    taskDetails?.status?.status === "complete" ? true : false),
                    await profile.save();
                  return res
                    .status(200)
                    .json(
                      ResponseHandler(
                        200,
                        null,
                        `Task ${task_Id} Updated Successfully of ${assigneeEmail}`
                      )
                    );
                }
              }
              if (!taskFound) {
                const task = {
                  taskId: taskDetails?.top_level_parent, // Top-level ID
                  projectNumber: parentTaskDetails?.name?.split("_")[0],
                  address: parentTaskDetails?.name,
                  parentId: taskDetails?.parent, // Stages ID
                  SubTaskId: taskDetails?.id, // Subtask ID
                  task: taskDetails?.name, // Subtask name
                  email: taskDetails?.creator?.email, // Extract email
                  subtask: taskDetails,
                  completedStatus:
                    taskDetails?.status?.status === "complete" ? true : false,
                };
                profile.inbox.push(task);
                await profile.save();
                return res
                  .status(200)
                  .json(
                    ResponseHandler(
                      200,
                      null,
                      `${task_Id} assigned successfully to ${assigneeEmail}`
                    )
                  );
              }
            } else {
              RemoveFromDB(task_Id);
              return res
                .status(200)
                .json(ResponseHandler(404, null, "No Email Found"));
            }
          } else {
            return res
              .status(200)
              .json(ResponseHandler(404, null, "No Task Details Found"));
          }
          // console.log(req.body, req.body.history_items[0].user, req.body.history_items[0]?.custom_field)
        } else {
          return res
            .status(200)
            .json(ResponseHandler(404, null, "No DB Found"));
        }
      } else {
        console.log("Parent ID is not defined");
      }
    } else {
      return res
        .status(200)
        .json(ResponseHandler(404, null, "Undefined Trigger"));
    }
    return res.status(200).json(ResponseHandler(200, null, "Got a Trigger"));
  } catch (error) {
    console.error("Error in trigger webhooks controller:", error);
    return res
      .status(500)
      .json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

module.exports = {
  InboxWebhook,
};

// event
// taskUpdated
// taskCreated
// taskDeleted

// task_id
// parent_id

// history_items
