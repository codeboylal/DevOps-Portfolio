// const mongoose = require("mongoose");

// const ProjectRunningSchema = new mongoose.Schema(
//     {
//       TaskID: {
//         type: String,
//         required: true,
//         unique: true,
//       },
//       data: {
//         type: Object,
//         required: true,
//       },
//       fetchedAt: {
//         type: Date,
//         default: Date.now,
//       },
//       custom_fields: { type: Array, default: [] },
//     },
//     { timestamps: true }
//   );
  
//   module.exports = mongoose.model("ProjectRunning", ProjectRunningSchema);
  
















const mongoose = require("mongoose");

// Task-related schema
const ProjectRunningSchema = new mongoose.Schema(
  {
    TaskID: {
      type: String,
      required: true,
      unique: true,
    },
    data: {
      type: Object,
      required: true,
    },
    fetchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ProjectRunning = mongoose.model("ProjectRunning", ProjectRunningSchema);




const projectSchema = new mongoose.Schema({
  projectNumber: { type: String, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
  client: { type: String, required: true },
  stage: { type: String, required: true },
  developer: { type: String, required: true },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = { ProjectRunning, Project };
