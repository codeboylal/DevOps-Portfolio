const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  educationLevel: {
    type: String, // Example: "Bachelor's", "Master's", "PhD", "Diploma"
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
  },
  courseType: {
    type: String,
    enum: ["Full time", "Part time", "Distance learning"],
    required: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
    required: true,
  },
  marks: {
    type: String,
  },
  isPrimaryEducation: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Education", EducationSchema);
