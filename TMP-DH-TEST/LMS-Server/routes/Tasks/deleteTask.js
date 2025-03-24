const express = require("express");
const DeleteEducationController = require("../../Controllers/User/Tasks/Delete/deleteEducationItem");
const DeleteToDoController = require("../../Controllers/User/Tasks/Delete/deleteTodoCard");
const DeleteToDoListItemController = require("../../Controllers/User/Tasks/Delete/DeleteToDoListItemController");


const deleteRouter = express.Router();

deleteRouter.post('/post/Education/profile', DeleteEducationController);

deleteRouter.post('/post/ToDoCard', DeleteToDoController);

deleteRouter.post('/post/ToDoList', DeleteToDoListItemController);

// Independent to any client

module.exports = deleteRouter;