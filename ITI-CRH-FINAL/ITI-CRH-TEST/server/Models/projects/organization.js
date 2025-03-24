const mongoose = require("mongoose");


const organtizationSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  createdBy: { type: String, default: '' },
});

const Organization = mongoose.model("Organization", organtizationSchema);

module.exports = { Organization };
