const mongoose = require("mongoose");

const ProjectCompletedSchema = new mongoose.Schema(
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
  
  module.exports = mongoose.model("ProjectCompleted", ProjectCompletedSchema);
  