const {List} = require("../clickUp/getAllProjectClickupData.controller.js");
const dotenv = require("dotenv");

dotenv.config()

const ResponseHandler = require("../../utils/responseHandler.js");

const GetOwnerDetails = async (req, res) =>{
    try{
        const OwnerID = req.params.OwnerID

        if(!OwnerID){
            return res.status(200).json(ResponseHandler(404,null,"Onwer ID not found in params"));
        }

        const ListID = process.env.webhook_contacts_owner_details;

        if(!ListID){
            return res.status(200).json(ResponseHandler(404,null,"List ID not found in .env"));
        }

        const allOnwerData = await List.findOne({listId: ListID})

        if(!allOnwerData){
            return res.status(200).json(ResponseHandler(404,null,"Can not fetch All Owner Data"));
        }
        
        const ownerData = allOnwerData.tasks.find(data => (data.taskId === OwnerID))
        // console.log(ownerData?.taskDetails?.custom_fields)

        if(!ownerData){
            return res.status(200).json(ResponseHandler(404,null,`Can not fetch Owner Data for ${OwnerID}`));
        }

        // const published = ownerData?.taskDetails?.custom_fields.find(field => (field?.name?.toLowerCase() === "published"))?.value || false
        // console.log(ownerData?.taskDetails?.custom_fields.find(field => (field?.name?.toLowerCase() === "published")), published)

        // if(!published){
        //     return res.status(200).json(ResponseHandler(403,null,`Owner Data for ${OwnerID} is not yet published`));
        // }

        const address = ownerData?.taskDetails?.custom_fields.find(field => (field?.name?.toLowerCase() === "address"))?.value

        const email = ownerData?.taskDetails?.custom_fields.find(field => (field?.name?.toLowerCase() === "contact person email"))?.value

        const contact = ownerData?.taskDetails?.custom_fields.find(field => (field?.name?.toLowerCase() === "phone number"))?.value

        return res.status(200).json(ResponseHandler(200, {
            OwnerID,
            address,
            email,
            contact
        }, "Onwer Details Fetch Successfully"));
    }catch{
        return res.status(500).json(ResponseHandler(500,null,"Internal Server Error"));
    }
}

module.exports = {
    GetOwnerDetails
}