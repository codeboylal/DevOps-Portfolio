const mongoose = require('mongoose');


const userToDoSchema = new mongoose.Schema(
  {
    id: String,
    email: String,
    toDo: [Object],
  },
  { timestamps: true }
);


const todo = mongoose.model('todo', userToDoSchema);

module.exports = todo;



