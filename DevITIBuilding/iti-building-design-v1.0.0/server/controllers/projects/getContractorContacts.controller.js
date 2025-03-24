const ResponseHandler = require('../../utils/responseHandler.js');

const User = require("../../Models/Sign In Up/SignIn/signInModel.js");

const { List } = require('../clickUp/getAllProjectClickupData.controller.js');
const {ProjectCompleted} = require("../../Models/projects/projectsCompleted.js");
const { ProjectRunning } = require("../../Models/projects/projectsRunning.js");

const getContractorContacts = async (req, res) => {
    try {
        // console.log(req.body.userId)
        // const ownerName = 'Sanam Shrestha';
        // const ownerName = 'Rafina Joshi';

        const profile = await User.findOne({_id:req.body.userId})


        if(!profile){
            res.status(200).json(ResponseHandler(404, null, "Profile not Found"));
        }

        // console.log(profile.email)

        const ownerName = profile?.accountType

        const list = await List.find();
        let contractorContacts = [];

        for (let i of list) {
            if (i?.listName === "\ud83d\udcde Contacts: Contractors") {
                contractorContacts.push(...i?.tasks);
            }
        }

        const projectCompleted = await ProjectCompleted.find();
        const projectRunning = await ProjectRunning.find();

        let projectID = [];
        const lists = [projectCompleted, projectRunning];

        // console.log(ownerName)
        if(ownerName?.toLowerCase() === "individual"){
            // console.log("Individual")
            for (let list of lists) {
                for (let task of list) {
                    if (task?.data?.custom_fields) {
                        for (let field of task.data.custom_fields) {
                            if (field?.name?.toLowerCase() === "contact email" && field?.value) {
                                // console.log(field?.value?.[0]?.name , ownerName)
                                // for (let val of field.value) {
                                if (field?.value === ownerName) {
                                    projectID.push(task.TaskID);
                                }
                            }
                        }
                    }
                }
            }
        }else{
            // console.log("Not Individual")
            for (let list of lists) {
                for (let task of list) {
                    if (task?.data?.custom_fields) {
                        for (let field of task.data.custom_fields) {
                            if (field?.name?.toLowerCase() === "company" && field?.value) {
                                // console.log(field?.value?.[0]?.name , ownerName)
                                // for (let val of field.value) {
                                    if(ownerName?.toLowerCase() === "iti"){
                                        projectID.push(task.TaskID);
                                    }else{
                                        if (field?.value?.[0]?.name === ownerName) {
                                            projectID.push(task.TaskID);
                                        }
                                    }
                                // }
                            }
                        }
                    }
                }
            }
        }

        let ownerProjectConstructor = [];
        let uniqueTaskIds = new Set();

        for (let contact of contractorContacts) {
            for (let field of contact?.taskDetails?.custom_fields) {
                if (field?.name === "Projects: Running" || field?.name === "Projects: Completed") {
                    if (field?.value) {
                        for (let val of field.value) {
                            if (projectID.includes(val?.id) && !val?.deleted && val?.access) {
                                if (!uniqueTaskIds.has(contact.taskId)) {
                                    uniqueTaskIds.add(contact.taskId);
                                    ownerProjectConstructor.push(contact);
                                }
                            }
                        }
                    }
                }
            }
        }
        const finalConstructorContacts = []
        for (let contact of ownerProjectConstructor){
            if(contact?.taskDetails?.custom_fields.find(field => field.name === "Published")?.value === "true"){
                finalConstructorContacts.push({
                    _id: contact?._id,
                    taskId: contact?.taskId,
                    taskName: contact?.taskName,
                    taskDetails: {
                        // contactPerson: contact?.taskDetails?.custom_fields?.[5]?.value,
                        // contactEmail: contact?.taskDetails?.custom_fields?.[6]?.value,
                        // contactPhone: contact?.taskDetails?.custom_fields?.[13]?.value,
                        contactPerson : contact?.taskDetails?.custom_fields.find(field => field.name === "Contact Person")?.value,
                        contactEmail : contact?.taskDetails?.custom_fields.find(field => field.name === "Contact Person Email")?.value,
                        contactPhone : contact?.taskDetails?.custom_fields.find(field => field.name === "Phone Number")?.value,
                    }
                })
            }
        }
        // console.log(finalConstructorContacts)
        res.status(200).json(ResponseHandler(200, finalConstructorContacts, "Contractor Contacts Fetched Successfully"));
    } catch (error) {
        console.error('Error fetching Contractor Contacts:', error);
        res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
    }
};

module.exports = { getContractorContacts };
