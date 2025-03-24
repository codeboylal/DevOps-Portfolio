const mongoose = require("mongoose");


const TaskAssignedToSchema = new mongoose.Schema({
  FolderId: { type: String, default: '' },
  List_Id: { type: String, default: '' },
  ParentTask_ID: { type: String, default: '' },
  TopLevelParentTask_ID: { type: String, default: '' },
  TaskID: { type: String, default: '' },
  TaskName: { type: String, default: '' },
  AssignedTo: { type: String, default: '' },
});

const TaskAssignedTo = mongoose.model("TaskAssignedTo", TaskAssignedToSchema);

module.exports = { TaskAssignedTo };
