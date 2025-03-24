const express = require("express");
const fetchAllPlans = require("../../../controllers/displayCenter/getProjects.controller.js");
const fetchAllfacade = require("../../../controllers/displayCenter/getFacade.controller.js");
const {
  getContractorContacts,
} = require("../../../controllers/projects/getContractorContacts.controller.js");
const {
  getInbox,
} = require("../../../controllers/projects/getInbox.controller.js");
const {
  completeInboxTask,
} = require("../../../controllers/projects/completeInboxTask.controller.js");
const {
  likeInboxTask,
} = require("../../../controllers/projects/likeInboxTask.controller.js");
const {
  updateAssignedToController,
} = require("../../../controllers/projects/updateAssignedTo.controller.js");
const {
  getAssignedToController,
} = require("../../../controllers/projects/getAssignedTo.controller.js");
const { GetOwnerDetails } = require("../../../controllers/projects/getOwnerDetails.controller.js");

const getRouter = express.Router();

getRouter.get("/get/displayCenter/plan", fetchAllPlans);

getRouter.get("/get/displayCenter/facade", fetchAllfacade);

getRouter.post("/get/getContractorContacts", getContractorContacts);

getRouter.post("/POST/inboxData", getInbox);

getRouter.post("/POST/inbox/completeTask", completeInboxTask);

getRouter.post("/POST/inbox/likeTask", likeInboxTask);

getRouter.post("/POST/AssignedTO/assignedTo", updateAssignedToController);

getRouter.get("/GET/AssignedTO/:TaskID", getAssignedToController);

getRouter.get("/GET/Owner/:OwnerID", GetOwnerDetails);

module.exports = getRouter;
