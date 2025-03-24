const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: Number, 
  personalize: String, 
  RemotePreferred: String, 
  City: String, 
  Amount: Number, 
  PrefferedPayPeriod: String, 
  jobList: Array
});

const candidate = mongoose.model('candidate', candidateSchema);

module.exports = candidate;