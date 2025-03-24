const mongoose = require("mongoose");

// Define Task Schema
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    emoji: { type: String, required: true },
    description: { type: String, default: "Static description content" },
    priority: { type: String, default: "High" },
    deadline: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // Static deadline
});

// Task Model
const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
