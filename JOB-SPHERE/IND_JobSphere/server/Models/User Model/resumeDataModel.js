// const  mongoose = require("mongoose")
// const { collection } = require("./userModel")
// const resumeDataModel= new mongoose.Schema({
//     pdf:String,
//     docs:String,
//     doc:String,
// });
// module.exports = mongoose.model('resumes ', resumeDataModel);











const mongoose = require("mongoose");

const resumeDataModel = new mongoose.Schema({
    filename: String,   // Store the original filename
    path: String,       // Store the path to the uploaded file
    mimetype: String,   // Store the file type (e.g., application/pdf)
    size: Number,       // Store the file size in bytes
    email: String,      // Store the user's email (or user ID) associated with the resume
});

module.exports = mongoose.model('Resume', resumeDataModel);

