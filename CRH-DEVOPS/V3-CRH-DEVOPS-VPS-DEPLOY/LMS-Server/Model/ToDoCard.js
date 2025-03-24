// models/ToDoCard.js
const mongoose = require('mongoose');

const toDoCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  emoji: { type: String },
  description: { type: String, default: "Sarah Johnson is a seasoned UI/UX designer with over 7 years of hard..." },
  date: { type: Date, default: new Date('2024-05-29') },
});

module.exports = mongoose.model('ToDoCard', toDoCardSchema);
