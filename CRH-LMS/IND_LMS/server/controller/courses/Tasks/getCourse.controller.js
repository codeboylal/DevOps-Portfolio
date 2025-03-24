const { Course } = require("../../../models/course/course.model.js");
const { ResponseHandler } = require("../../../utils/responseHandler.js");

const getCourseController = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    if (!courseId) {
      const courses = await Course.find();
      return res
        .status(200)
        .json(
          ResponseHandler(
            true,
            courses,
            `All Courses fetched successfully, Total: ${courses.length}`
          )
        );
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(200)
        .json(ResponseHandler(false, null, "No Course Found"));
    }
    return res
      .status(200)
      .json(
        ResponseHandler(
          false,
          course,
          `Course ${course.name} fetched successfully`
        )
      );
  } catch {
    return res
      .status(500)
      .json(ResponseHandler(false, null, "Internal Sever Error"));
  }
};

module.exports = {
  getCourseController,
};
