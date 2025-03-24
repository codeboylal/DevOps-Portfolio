const { ResponseHandler } = require("../../utils/responseHandler.js");
const { Course } = require("../../models/course/course.model.js");
const mongoose = require("mongoose");

const getPopularCoursesController = async (req, res) => {
  try {
    const { profileId, courseId } = req.params;

    if (!profileId || !courseId) {
      return res
        .status(200)
        .json(
          ResponseHandler(
            false,
            null,
            "ProfileId or CourseId not found in params"
          )
        );
    }

    let topCourses = [];

    if (courseId === "undefined") {
      topCourses = await Course.aggregate([
        {
          $project: {
            courseID: "$_id", // Renaming _id to courseID
            name: 1,
            image: 1,
            shortDesc: 1,
            description: 1,
            instructors: 1,
            learningOutcome: 1,
            currency: 1,
            reviews: 1,
            lessons: 1,
            difficulty: 1,
            duration: 1,
            tag: 1,
            totalUsers: {
              $add: [{ $size: "$enrolledUsers" }, { $size: "$reviewUsers" }],
            },
          },
        },
        { $sort: { totalUsers: -1 } },
        { $limit: 3 },
      ]);
    } else {
      // Convert courseId to ObjectId (assuming it's a valid MongoDB ObjectId)
      const excludedCourseId = new mongoose.Types.ObjectId(courseId);

      topCourses = await Course.aggregate([
        {
          $match: { _id: { $ne: excludedCourseId } }, // Exclude the given courseId
        },
        {
          $project: {
            courseID: "$_id", // Renaming _id to courseID
            name: 1,
            image: 1,
            shortDesc: 1,
            description: 1,
            instructors: 1,
            learningOutcome: 1,
            currency: 1,
            reviews: 1,
            lessons: 1,
            difficulty: 1,
            duration: 1,
            tag: 1,
            totalUsers: {
              $add: [{ $size: "$enrolledUsers" }, { $size: "$reviewUsers" }],
            },
          },
        },
        { $sort: { totalUsers: -1 } },
        { $limit: 3 },
      ]);
    }

    if (!topCourses || topCourses.length === 0) {
      return res
        .status(200)
        .json(ResponseHandler(false, null, "Courses Not Found"));
    }

    return res
      .status(200)
      .json(ResponseHandler(true, topCourses, "Popular Courses Fetched"));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res
      .status(500)
      .json(ResponseHandler(false, null, "Internal Server Error"));
  }
};

module.exports = {
  getPopularCoursesController,
};
