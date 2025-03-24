// const {Organization} = require("../../Models/projects/organization.js")
const { Organizations } = require("aws-sdk");
const {List} = require("../../controllers/clickUp/getAllProjectClickupData.controller.js");
const ResponseHandler = require("../../utils/responseHandler.js");

const dotenv = require("dotenv");

dotenv.config()

const getOrganizationData = async (req, res) => {
  try {

    // const organizations = await Organization.find()
    let organizations = []
    const organization = await List.find()
    const org = organization.filter((org)=>{
      return org?.listId === process.env.webhook_contacts_company
    })

    const finalOrg = org?.[0]?.tasks.filter((or)=>{
      return or?.taskDetails?.status?.status?.toLowerCase() === "active contacts"
    })

    // console.log(finalOrg)
    if(finalOrg){
      for(let i of finalOrg){
        // console.log(i.taskId)
        organizations.push([i.taskId,i.taskName])
      }
    }

    
    res.status(200).json(ResponseHandler(200 , organizations, "Organization Data Fetched Successfully"));
  } catch (error) {
    res.status(500).json(ResponseHandler(500 , null, "Internal Server Error"));
  }
};




module.exports =  {getOrganizationData} ;







