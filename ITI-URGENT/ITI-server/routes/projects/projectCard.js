const express = require('express');
const { getAllProjects, getAllRunningTasks, addProject } = require('../../controllers/projects/projectControllers');

const projectRouter = express.Router();

// Routes for projects
projectRouter.get('/get/projects', getAllProjects);
projectRouter.post('/projects', addProject);

// Routes for running tasks
projectRouter.get('/running-tasks', getAllRunningTasks);

module.exports = projectRouter;
