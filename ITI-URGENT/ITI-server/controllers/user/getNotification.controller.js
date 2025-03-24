const Plan = require("../../Models/plan/projectPlans.js");
const Facade = require("../../Models/facades/projectFacades.js");
const ResponseHandler = require("../../utils/responseHandler.js");

const fetchNotification = async (req, res) => {
  try {
    // Fetch all plans and facades
    const plans = await Plan.find();
    const facades = await Facade.find();

 
    const plansNotifications = plans.map(plan => plan.notifications || []);
    const facadesNotifications = facades.map(facade => facade.notifications || []);

    // Combine the notifications
    const data = {
      plansNotifications,
      facadesNotifications
    };


    // console.log(data); 

    res.status(200).json(ResponseHandler(200, data, "Notification Fetched Successfully"));
  } catch (error) {
    res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

module.exports = {fetchNotification}
