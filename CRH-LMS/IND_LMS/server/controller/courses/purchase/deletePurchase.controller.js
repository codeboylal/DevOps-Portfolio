const { ResponseHandler } = require("../../../utils/responseHandler.js");
const { User } = require("../../../models/user.js");
const { Course } = require("../../../models/course/course.model.js");

const deletePurchase = async (req, res) => {
  try {
    const { profileId } = req.params;

    if (profileId) {
      const profile = await User.findById(profileId);
      if (!profile) {
        return res
          .status(404)
          .json(ResponseHandler(false, null, "User profile not found"));
      }

      const purchasedCourses = profile.purchasedCourses;
      await User.findByIdAndUpdate(profileId, {
        $set: {
          courseData: {},
          purchasedCourses: [],
          instructors: [],
          notification: []
        },
      });

      for (let purchasedCourse of purchasedCourses) {
        const course = await Course.findById(purchasedCourse.courseId);
        if (course) {
          course.enrolledUsers = [];
          course.reviewUsers = [];
          await course.save();
        }
      }

      return res
        .status(200)
        .json(
          ResponseHandler(
            true,
            null,
            `Course Purchase Deleted Successfully from ${profileId}`
          )
        );
    }

    await User.updateMany({}, { $set: { courseData: {}, purchasedCourses: [], instructors: [], notification: [] } });
    const courses = await Course.find();
    for (let course of courses) {
      course.enrolledUsers = [];
      course.reviewUsers = [];
      await course.save();
    }

    return res
      .status(200)
      .json(
        ResponseHandler(true, null, `All Course Purchases Deleted Successfully`)
      );
  } catch (error) {
    console.error("Error in deletePurchase:", error);
    return res
      .status(500)
      .json(ResponseHandler(false, null, "Internal Server Error"));
  }
};

module.exports = {
  deletePurchase,
};
