const signup = require("../../Models/Sign In Up/SignIn/signInModel.js");
const ResponseHandler = require("../../utils/responseHandler.js");

const completeInboxTask = async (req, res) => {
  try {
    const { taskId, userId } = req?.body;
    const profile = await signup.findOne({ _id: userId });
    if (profile) {
      if (profile.inbox) {
        for (let task of profile.inbox) {
          if (task?._id?.toString() === taskId) {
            task.completedStatus = !task.completedStatus;
            await profile.save();
            return res
              .status(200)
              .json(
                ResponseHandler(200, null, `${taskId} is marked completed`)
              );
          }
        }
        return res
          .status(200)
          .json(ResponseHandler(200, null, `${taskId} is not found in Inbox`));
      } else {
        return res
          .status(200)
          .json(ResponseHandler(200, null, "No inbox Data found"));
      }
    }
    return res.status(200).json(ResponseHandler(200, null, "No Profile Found"));
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

module.exports = {
  completeInboxTask,
};
