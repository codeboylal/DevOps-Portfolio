const { ProjectRunning, Project } = require('../../Models/projects/projectsRunning');

const getAllProjects = async (req, res) => {
    try {
      console.log('Fetching all projects...');
      const projects = await ProjectRunning.find();
      // console.log('Projects fetched:', projects);
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: 'Error fetching projects', error });
    }
  };
  

// Fetch all running tasks
const getAllRunningTasks = async (req, res) => {
  try {
    const runningTasks = await ProjectRunning.find();
    res.status(200).json(runningTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching running tasks', error });
  }
};

// Add a new project (optional)
const addProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error adding project', error });
  }
};

module.exports = {
  getAllProjects,
  getAllRunningTasks,
  addProject,
};
