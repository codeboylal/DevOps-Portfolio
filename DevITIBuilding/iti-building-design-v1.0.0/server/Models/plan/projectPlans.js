// const mongoose = require("mongoose");

// const ProjectPlanSchema = new mongoose.Schema(
//   {
//     TaskID: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     data: {
//       type: Object,
//       required: true,
//     },
//     fetchedAt: {
//       type: Date,
//       default: Date.now, 
//     },
//     notifications: {type: Array,default:[]},


//   },
//   { timestamps: true } 
// );

// module.exports = mongoose.model("Plan", ProjectPlanSchema);
















// const mongoose = require("mongoose");

// // Define the Notification subdocument schema
// const notificationSchema = new mongoose.Schema({
//   message: { type: String, required: true },
//   taskId: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// // Define the Project Plan schema
// const ProjectPlanSchema = new mongoose.Schema(
//   {
//     TaskID: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     data: {
//       type: Object,
//       required: true,
//     },
//     fetchedAt: {
//       type: Date,
//       default: Date.now,
//     },
//     notifications: {
//       type: [notificationSchema], // Embed notifications as an array of subdocuments
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Plan", ProjectPlanSchema);


const mongoose = require("mongoose");

// Define the Notification subdocument schema
const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  taskId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Define the Image subdocument schema
const imageSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the image file
  base64: { type: String }, 
  dateAdded: { type: Date, default: Date.now }, // Metadata: when the image was added
});

// Define the Project Plan schema
const ProjectPlanSchema = new mongoose.Schema(
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
    images: {
      type: [imageSchema], // Array of images
      default: [],
    },
    notifications: {
      type: [notificationSchema], // Embed notifications as an array of subdocuments
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", ProjectPlanSchema);
