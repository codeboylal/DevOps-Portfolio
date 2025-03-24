const mongoose = require('mongoose');

// JobSchema, but targeting 'profiles' collection
const JobSchema = new mongoose.Schema({
  currentEmployment: String,
  employmentType: String,
  totalExperience: String,
  companyName: String,
  jobTitle: String,
  joiningDate: Date,
  currentSalary: Number,
  skills: [String],
  jobProfile: String,
  noticePeriod: String,
}, { collection: 'profiles' }); // Explicit collection

module.exports = mongoose.model('JobSchema', JobSchema);
