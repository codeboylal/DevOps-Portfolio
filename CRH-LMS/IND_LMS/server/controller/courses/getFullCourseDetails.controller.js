const { ResponseHandler } = require("../../utils/responseHandler.js");
const { Course } = require("../../models/course/course.model.js");
const { User } = require("../../models/user.js");

const getFullCourseDetailsController = async (req, res) => {
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

    const course = await Course.findById(courseId).lean(); // Convert to plain object for merging

    if (!course) {
      return res
        .status(200)
        .json(ResponseHandler(false, null, "No Course Found in DB"));
    }

    const profile = await User.findById(profileId).lean();

    if (!profile) {
      return res
        .status(200)
        .json(ResponseHandler(false, null, "Profile Not Found"));
    }

    // Find if the user has purchased this course
    const purchasedCourse = profile.purchasedCourses?.find(
      (p) => p?.courseId?.toString() === courseId
    );

    if (purchasedCourse) {
      // Merge purchasedCourse data into the course object
      course.purchasedData = purchasedCourse;
    }

    return res
      .status(200)
      .json(ResponseHandler(true, course, "Course Data Fetched"));
  } catch (error) {
    console.error("Error fetching full course details:", error);
    return res
      .status(500)
      .json(ResponseHandler(false, null, "Internal Server Error"));
  }
};

module.exports = {
  getFullCourseDetailsController,
};
