
const mongoose = require("mongoose");

// Define the Notification subdocument schema
const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  taskId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Define the Project Plan schema
const ProjectFacadesSchema = new mongoose.Schema(
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
    notifications: {
      type: [notificationSchema], // Embed notifications as an array of subdocuments
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Facade", ProjectFacadesSchema);
