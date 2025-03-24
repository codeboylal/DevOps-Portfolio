const { ResponseHandler } = require("../../../utils/responseHandler.js");

const { Course } = require("../../../models/course/course.model.js");

const deleteCourseController = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    if (!courseId) {
      return res
        .status(200)
        .json(ResponseHandler(false, null, "Course Id not found in params"));
    }
    const course = await Course.findByIdAndDelete(courseId);
    return res.status(200).json(ResponseHandler(true, null, "Course Deleted"));
  } catch {
    return res
      .status(500)
      .json(ResponseHandler(false, null, "Internal Server Error"));
  }
};

module.exports = {
  deleteCourseController,
};
