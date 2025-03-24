// models/fileModel.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  size: String,
  s3Url: String,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
