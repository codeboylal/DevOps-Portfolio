const { TaskAssignedTo } = require("../../Models/projects/assignedTo.js");
const ResponseHandler = require("../../utils/responseHandler.js");

const dotenv = require("dotenv");
dotenv.config();

// Dynamically import fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getAssignedToController = async (req, res) => {
  try {
    // TaskID: { type: String, default: '' },
    // AssignedTo: { type: String, default: '' },
    const TaskID = req.params.TaskID;
    // console.log(TaskID);

    const task = await TaskAssignedTo.findOne({
      TaskID,
    });

    if (!task || task?.AssignedTo === "-") {
      return res.status(200).json(ResponseHandler(404, null, "Assignee not Found"));
    //   const url = `https://api.clickup.com/api/v2/task/${TaskID}`;
    //   const headers = {
    //     Authorization: process.env.clickUpToken,
    //     "Content-Type": "application/json",
    //   };

    //   const response = await fetch(url, { headers });
    //   if (!response.ok) {
    //     // throw new Error(
    //     //   `Failed to fetch tasks for list ${TaskID}: ${response.statusText}`
    //     // );
    //     return res.status(200).json(ResponseHandler(500, null, "Too many Requests"));
    //   }

    //   const data = await response.json();
    //   // console.log(await data.custom_fields[2])
    //   // console.log(data.custom_fields?.find(field=> (field?.name?.toLowerCase() === "contact email")), TaskID);
    //   const TaskEmail = data.custom_fields?.find(field=> (field?.name?.toLowerCase() === "contact email"))?.value || "-"
    //   // console.log(data.custom_fields?.find(field=> field?.name?.toLowerCase() === "contact email")?.value)
    //   // return data || [];
    //   if(!task){
    //     const newTask = new TaskAssignedTo({
    //       FolderId: data?.folder?.id,
    //       List_Id: data?.list?.id,
    //       ParentTask_ID: data?.parent,
    //       TopLevelParentTask_ID: data?.top_level_parent,
    //       TaskID: TaskID,
    //       TaskName: data?.name,
    //       AssignedTo: TaskEmail,
    //     })
    //     await newTask.save()
    //   }else if (task?.AssignedTo === "-"){
    //     task.AssignedTo = TaskEmail
    //     await task.save()
    //   }
    //   return res
    //   .status(200)
    //   .json(ResponseHandler(200, TaskEmail, "Assigend To added"));
    //   // return res.status(200).json(ResponseHandler(404, null, "No task found"));
    }

    return res
      .status(200)
      .json(ResponseHandler(200, task.AssignedTo, "Request Successfull"));
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

module.exports = {
  getAssignedToController,
};
