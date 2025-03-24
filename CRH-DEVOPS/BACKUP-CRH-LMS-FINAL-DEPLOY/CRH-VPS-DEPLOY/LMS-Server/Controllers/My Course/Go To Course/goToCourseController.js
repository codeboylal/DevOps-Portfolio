const User = require('../../../Model/UserModel/model');

// Controller to fetch courses based on user ID
const getCoursesByUserId = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the route parameter

    // Find the user by ID and select the "continueWatching" array for courses
    const user = await User.findById(userId).select('continueWatching');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the list of courses the user is currently watching
    res.json(user.continueWatching);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};

module.exports = {
  getCoursesByUserId,
};