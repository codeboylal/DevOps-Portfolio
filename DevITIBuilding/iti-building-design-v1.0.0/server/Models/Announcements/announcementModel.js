// models/announcementModel.js
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Announcement = mongoose.model("Announcement", announcementSchema);
module.exports =  Announcement;