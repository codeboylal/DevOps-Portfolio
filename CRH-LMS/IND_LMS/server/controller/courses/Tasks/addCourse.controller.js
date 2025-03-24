const { Course } = require("../../../models/course/course.model.js");
const { ResponseHandler } = require("../../../utils/responseHandler.js");

const addCourseController = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    return res
      .status(200)
      .json(
        ResponseHandler(
          true,
          course,
          `Course ${req.body.name} Added Successfull`
        )
      );
  } catch {
    return res
      .status(500)
      .json(ResponseHandler(false, null, "Internal server error"));
  }
};

module.exports = {
  addCourseController,
};
