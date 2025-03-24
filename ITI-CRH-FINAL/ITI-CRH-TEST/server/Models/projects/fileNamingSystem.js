const mongoose = require("mongoose");

// Task-related schema
const FileNamingSchema = new mongoose.Schema(
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

const FileNaming = mongoose.model("FileNaming", FileNamingSchema);

module.exports = { FileNaming };
