const { ResponseHandler } = require("../../../utils/responseHandler.js");

const { Course } = require("../../../models/course/course.model.js");

const editCourseController = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    if (!courseId) {
      return res.status(200).json(false, null, "Course ID not found in params");
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(200).json(false, null, "Course not found");
    }
    const oldCourse = { ...course._doc };

    // Update only the fields provided in the request body
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        course[key] = req.body[key];
      }
    });

    await course.save();
    return res
      .status(200)
      .json(ResponseHandler(true, course, "Course updated successfully"));
  } catch {
    return res
      .status(500)
      .json(ResponseHandler(false, null, "Internal Server Error"));
  }
};

module.exports = {
  editCourseController,
};
