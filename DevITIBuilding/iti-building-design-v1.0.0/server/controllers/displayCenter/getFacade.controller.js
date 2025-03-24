const ResponseHandler = require("../../utils/responseHandler.js");
const Facade = require("../../Models/facades/projectFacades.js")


const fetchAllfacade = async (req, res) => {
  try {
    const facades = await Facade.find(); // Fetch all plans

    // Filter and format plans based on the condition
    const filteredFacades = facades
      .filter(facade => {
        return facade.data?.custom_fields?.some(field => field.name === "Published" && field.value === "true");
      })
      .map(facade => ({
        TaskID: facade.TaskID,
        custom_fields: facade.data.custom_fields,
        attachments: facade.data.attachments
      }));



    res.status(200).json(ResponseHandler(200, filteredFacades, "Filtered Facades Fetched Successfully"));
  } catch (error) {
    res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

module.exports = fetchAllfacade;