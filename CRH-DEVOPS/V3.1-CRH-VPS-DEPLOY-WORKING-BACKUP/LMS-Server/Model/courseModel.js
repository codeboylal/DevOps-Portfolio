const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema(
    { 
        image: String,
        coursename: String,
        courseDescription: String,
        courseRating: [Number],
        courseAmount: [String],
        courseLesson: Number,
        courseDifficulty: [String],
        courseSubject: String,
        courseLanguage: String,
        courseDuration: String,
        courseSkills: String,
        courseEducator: String,
        courseData: {Array},
        moduleName: [String],
        EnrolledStudents: [String],
        courseInstructor: [String],
        Tag: String,
        ReviewStudents: [String],
    },
    { timestamps: true }
  );
  

const Course = mongoose.model('CourseDetails', courseSchema);

module.exports = Course;