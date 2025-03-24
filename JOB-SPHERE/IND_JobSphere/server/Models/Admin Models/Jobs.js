const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
    jobTitle: String,
    companyName: String,
    applicants: Array,
    postingDate: String,
    levels: Array,
    description: String,
    salaryRange: String,
    location: String,
    about: String,
    skills: Array,
    experience: String,
    approach: String, 
    services: Array
});

const job = mongoose.model('job', jobsSchema);

module.exports = job;