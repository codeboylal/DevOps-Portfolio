const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  courseId: {type: String, default: ""},
  name: { type: String, default: "" },
  post: { type: String, default: "" },
  image: { type: String, default: "" },
});

const lessonSchema = new mongoose.Schema({
  completed: {type: Number, default: 0},
  total: {type: Number, default: 0}
})

const courseSchema = new mongoose.Schema({
  courseId: { type: String, default: "" },
  startDate: {type: Date, default: Date.now},
  endDate: {type: Date, default: ""},
  courseStatus: {type: String, enum:["In Review","Not Started", "In Progress", "Compelted"], default: "Not Started"},
  lessons: { type: lessonSchema, default: {}},
  gradeAchieved: {type: Number, default: 0},
  userModule: {type: Number, default: 1}
});

const courseData = new mongoose.Schema({
  total: { type: Number, default: 0 },
  review: { type: Number, default: 0 },
  completed: { type: Number, default: 0 },
  active: { type: Number, default: 0 },
});

const NotificationData = new mongoose.Schema({
  content: { type: String, default: "" },
  date: { type: Date, default: Date.now },
  success: { type: Boolean, default: true },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  instructors: { type: [instructorSchema], default: [] },
  purchasedCourses: { type: [courseSchema], default: [] },
  courseData: { type: courseData, default: {} },
  notification: { type: [NotificationData], default: [] },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
