const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  country: { type: String, default: "" },
  amount: { type: Number, default: 0 },
});

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, default: 5 },
  review: {
    type: [
      new mongoose.Schema({
        userId: { type: String, default: "" },
        rating: { type: Number, default: 0 },
      }),
    ],
    default: [],
  },
});

const durationSchema = new mongoose.Schema({
  duration: { type: Number, default: 5 },
  type: {
    type: String,
    enum: ["Minutes", "Weeks", "Months"],
    default: "Minutes",
  },
});

const languageSchema = new mongoose.Schema({
  language: {
    type: String,
    enum: ["English", "Hindi", "Nepali"],
    default: "English",
  },
});

const instructorSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  post: { type: String, default: "" },
  image: { type: String, default: "" },
});

const learningOutcomeSchema = new mongoose.Schema({
  value: { type: String, default: "" },
});

// Lesson Schema
const lessonSchema = new mongoose.Schema({
  subTitle: { type: String, required: true, default: "" },
  transcript: { type: String, default: "" },
  notes: { type: String, default: "" },
  videoLink: { type: String, default: "" },
  attachments: { type: [String], default: [] },
  timeRequired: {type: new mongoose.Schema({
    duration: {type: Number, default: 30},
    type: {type: String, enum:["Hour", "Hours" , "Minutes", "Weeks", "Month"], default: "Minutes"}
  }), default: {}},
  summary: { type: String, default: "" },
});

// Module Schema
const moduleSchema = new mongoose.Schema({
  lessons: { type: Map, of: lessonSchema, default: [] }, // Array of lessons in each module,
  name: {type: String, default: ""},
  timeRequired: {type: new mongoose.Schema({
    duration: {type: Number, default: 1},
    type: {type: String, enum:["Hour", "Hours" , "Minutes", "Weeks", "Month"], default: "Hour"}
  }), default: {}},
  image: {type: String, default: ""}
});

// Course Schema
const courseSchema = new mongoose.Schema({
  image: { type: String, default: "" },
  name: { type: String, default: "" },
  shortDesc: { type: String, default: "" },
  description: { type: String, default: "" },
  currency: currencySchema,
  reviews: reviewSchema,
  enrolledUsers: { type: Array, default: [] },
  reviewUsers: { type: Array, default: [] },
  lessons: { type: Number, default: 0 },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Mixed"],
    default: "Beginner",
  },
  duration: durationSchema,
  subject: { type: String, default: "" },
  language: { type: [languageSchema], default: [] },
  skills: { type: String, default: "" },
  educator: { type: String, default: "CodroidHub" },
  instructors: { type: [instructorSchema], default: [] },
  learningOutcome: { type: [learningOutcomeSchema], default: [] },
  courseData: { type: Map, of: moduleSchema, default: {} }, // Modules stored as a Map
  tag: {
    type: String,
    enum: ["free", "paid"],
    default: "paid",
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = {
  Course,
};
