const User = require("../../../Model/UserModel/model.js");
const ResponseHandler = require("../../../utils/responseHandler.js");

const updateToDoDashboardController = async(req, res, next) => {
  try {
    const { toDoItem, index, userId } = req.body;

    // Find user profile by user ID
    const profile = await User.findById(userId);

    if (profile) {
      // Update the specific toDoList item
      profile.toDoList[index] = toDoItem;

      // Save the updated profile
      await profile.save();

      res.status(200).json(ResponseHandler(200, profile, 'Details fetched successfully!'));
    } else {
      console.log("Profile not found");
      res.status(404).json(ResponseHandler(404, null, 'Profile not found'));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
  }
};

module.exports = updateToDoDashboardController;
