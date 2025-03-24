const express = require('express');
const { getAllProjects, getAllRunningTasks, addProject,updateProjectLike,getAllCompletedTasks, getUserById} = require('../../controllers/projects/projectControllers');

const projectRouter = express.Router();

// Routes for projects
projectRouter.get(`/get/projects/:userId`, getAllProjects);
projectRouter.post('/projects', addProject);

// Routes for running tasks
projectRouter.get('/running-tasks', getAllRunningTasks);
projectRouter.get(`/get/completed-tasks/:userId`, getAllCompletedTasks);
projectRouter.patch('/projects/like', updateProjectLike); // Update liked state

projectRouter.get("/users/getUser", getUserById);

module.exports = projectRouter;
