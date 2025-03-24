
const { Organization } = require("../../Models/projects/organization.js")
const User = require("../../Models/Sign In Up/SignIn/signInModel.js");
const ResponseHandler = require("../../utils/responseHandler.js");

const addOrganizationController = async (req, res) => {
  try {
    console.log(req.body)

    if (req?.body?.orgName) {
      if(/^[A-Za-z\s]+$/.test(req?.body?.orgName)){
        const profile = await User.findOne({ _id: req.body.userId })
      if (profile) {
        if (profile?.role === "ITI") {
          const org = await Organization.findOne({
            name: req?.body?.orgName
          })
          if (org) {
            return res.status(200).json(ResponseHandler(403, null, "Organization Already Exists"));
          }
          const newDoc = new Organization({ name: req.body.orgName, createdBy: req?.body?.userId });
          newDoc.save();
          return res.status(200).json(ResponseHandler(200, null, "Organization Data added Successfully"));
        } else {
          return res.status(200).json(ResponseHandler(403, null, "Permission Denied"));
        }
      } else {
        return res.status(200).json(ResponseHandler(404, null, "Profile not found"));
      }
      }else{
        return res.status(200).json(ResponseHandler(403, null, "Invalid Organization name"));
      }
    }else{
      return res.status(200).json(ResponseHandler(404, null, "Organization name can't be empty"));
    }
  } catch (error) {
    res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
  }
};




module.exports = { addOrganizationController };







