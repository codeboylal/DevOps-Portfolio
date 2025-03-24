const {TaskAssignedTo} = require("../../Models/projects/assignedTo.js");
const ResponseHandler = require("../../utils/responseHandler.js");

const updateAssignedToController = async (req, res) => {
  try {
    // TaskID: { type: String, default: '' },
    // AssignedTo: { type: String, default: '' },
    return res.status(200).json(ResponseHandler(200, null, "Request Successfull"));
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

module.exports = {
  updateAssignedToController,
};
