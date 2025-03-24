// const User = require('../../../Model/UserModel/model');
// const getUserCoursesProgress = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     // Find user by ID and select continueWatching field
//     const user = await User.findById(userId).select('continueWatching');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Return all courses, regardless of progress, from continueWatching array
//     const progressCourses = user.continueWatching.map((course) => {
//       return {
//         title: course.title,
//         description: course.description,
//         image: course.image,
//         lessons: course.lessons // should be in "completed/total" format
//       };
//     });

//     return res.status(200).json(progressCourses);
//   } catch (error) {
//     console.error('Error fetching progress courses:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };






// module.exports = {
//   getUserCoursesProgress
// };












const User = require('../../../Model/UserModel/model');

const getUserCoursesProgress = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID and select continueWatching field
    const user = await User.findById(userId).select('continueWatching');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter courses with status 'progress' and return only those
    const progressCourses = user.continueWatching
      .filter(course => course.status === 'progress') // Filter courses with status 'progress'
      .map((course) => {
        return {
          title: course.title,
          description: course.description,
          image: course.image,
          lessons: course.lessons,// should be in "completed/total" format
          id: course.id,
          courseID: course.courseID
        };
      });

      // console.log(progressCourses)

    return res.status(200).json(progressCourses);
  } catch (error) {
    console.error('Error fetching progress courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserCoursesProgress
};
