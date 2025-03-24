const Plan = require("../../Models/plan/projectPlans.js");
const ResponseHandler = require("../../utils/responseHandler.js");

const fetchAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find(); // Fetch all plans

    // Filter and format plans based on the condition
    const filteredPlans = plans
      .filter(plan =>
        plan.data?.custom_fields?.some(field => field.name === "Published" && field.value === "true") // Check the condition
      )
      .map(plan => ({
        TaskID: plan.TaskID,
        custom_fields: plan.data.custom_fields,
        attachments: plan.images
      })); // Extract the required fields



    res.status(200).json(ResponseHandler(200, filteredPlans, "Filtered Plans Fetched Successfully"));
  } catch (error) {
    res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

module.exports = fetchAllPlans;



