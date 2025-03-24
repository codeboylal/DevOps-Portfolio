const User = require('../../../Model/UserModel/model');

// Controller function to fetch courses for a specific user
exports.getCourses = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from request parameters
    const user = await User.findById(userId).select('continueWatching'); // Fetch the courses in continueWatching

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // console.log(user?.continueWatching)
    // If user exists, return their continueWatching courses
    res.status(200).json(user.continueWatching);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// exports.updateCourseStatus = async (req, res) => {
//   const { userId, courseId } = req.params;

//   try {
//     // Find the user by their ID
//     const profile = await User.findOne({ _id: userId });

//     if (!profile) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Find the course in the continueWatching array
//     const courseToUpdate = profile.continueWatching.find(
//       (course) => course.id.toString() === courseId
//     );

//     if (!courseToUpdate) {
//       return res.status(404).json({ message: 'Course not found in continueWatching' });
//     }

//     console.log(courseToUpdate)

//     // Update the course status to 'progress'
//     courseToUpdate.status = 'progress';

//     console.log("after",courseToUpdate)

//     await profile.save().catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: 'Error saving profile', error });
//     });
    

//     res.status(200).json({ message: 'Course status updated to progress', profile });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };



exports.updateCourseStatus = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    // Find the user by their ID
    let profile = await User.findOne({ _id: userId });

    if (!profile) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the course in the continueWatching array by its `id` (ensure courseId is a string for proper comparison)
    const courseToUpdate = profile.continueWatching.find(
      (course) => course.id.toString() === courseId
    );

    if (!courseToUpdate) {
      return res.status(404).json({ message: 'Course not found in continueWatching' });
    }

    // Update the course status to 'progress'
    courseToUpdate.status = 'progress';

    // Save the updated profile
    await profile.save();

    res.status(200).json({ message: 'Course status updated to progress', profile });
  } catch (error) {
    console.error('Error updating course status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
