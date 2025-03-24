const { ResponseHandler } = require("../../../utils/responseHandler.js");

const { Course } = require("../../../models/course/course.model.js");

const { User } = require("../../../models/user.js");

const purchaseCourseController = async (req, res) => {
  try {
    const { profileId, courseId } = req.params;
    if (!profileId || !courseId) {
      return res
        .status(200)
        .json(ResponseHandler(false, null, "No Id found in params"));
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(200)
        .json(ResponseHandler(false, null, "No Course Found"));
    }
    const profile = await User.findById(profileId);
    if (!profile) {
      return res
        .status(200)
        .json(ResponseHandler(false, null, "No Profile Found"));
    }
    for (let course of profile.purchasedCourses) {
      if (course.courseId === courseId) {
        return res
          .status(200)
          .json(ResponseHandler(false, null, "Course Already Purchased"));
      }
    }
    for (let instructor of course.instructors) {
      profile.instructors.push({
        courseId: courseId,
        name: instructor.name,
        post: instructor.post,
        image: instructor.image,
      });
    }
    await profile.save();
    if (
      course.enrolledUsers.includes(profileId) ||
      course.reviewUsers.includes(profileId)
    ) {
      return res
        .status(200)
        .json(ResponseHandler(false, null, "Course Already Purchased"));
    } else {
      if (course.tag === "free") {
        profile.notification.push({content : `You have successfully enrolled in ${course.name}! Start learning now.`})
        profile.purchasedCourses.push({ courseId, courseStatus: "Not Started", lessons: {total: course.lessons} });
        profile.courseData.active += 1;
        course.enrolledUsers.push(profileId);
      } else {
        profile.notification.push({content : `Your purchase for ${course.name} is under review. You will get access soon!`})
        profile.purchasedCourses.push({ courseId, courseStatus: "In Review", lessons: {total: course.lessons} });
        profile.courseData.review += 1;
        course.reviewUsers.push(profileId);
      }
    }
    profile.courseData.total += 1;
    await profile.save();
    await course.save();
    return res
      .status(200)
      .json(ResponseHandler(true, null, "Course Purchased Successfully"));
  } catch {
    return res
      .status(500)
      .json(ResponseHandler(false, null, "Internal Server Error"));
  }
};

module.exports = {
  purchaseCourseController,
};
