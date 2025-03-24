const {
  ProjectRunning,
  Project,
} = require("../../Models/projects/projectsRunning");
const { ProjectCompleted } = require("../../Models/projects/projectsCompleted");
const User = require("../../Models/Sign In Up/SignIn/signInModel");

const getUserById = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const user = await User.findById(userId).select("accountType");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("AccountType:", user.accountType); // Logs the account type
    //
    return res
      .status(200)
      .json({ id: user._id, accountType: user.accountType });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    // console.log(req.params.userId)
    const profile = await User.find({ _id: req.params.userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    
    // console.log(profile?.[0]?.email)
    // console.log('Fetching all projects...');
    let projects = await ProjectRunning.find();

    projects = projects.filter((project)=>{
      return(
        project.data.custom_fields.find(
          (field) => field?.name?.toLowerCase() === "published"
        ).value
      )
    })
    let filteredProjects = []
    if(profile[0].accountType){
      if(profile[0].accountType.toLowerCase() === "iti"){
        filteredProjects = projects;
      }else if (profile[0].accountType === "individual"){
        filteredProjects = projects.filter((project) => {
          return (
            project.data.custom_fields.find(
              (field) => field?.name?.toLowerCase() === "contact email"
            ).value === profile?.[0]?.email 
          );
        });
      }else{
        filteredProjects = projects.filter((project) => {
          return (
            project.data.custom_fields.find(
              (field) => field?.name?.toLowerCase() === "company"
            ).value?.[0]?.name === profile?.[0]?.accountType 
          );
        });
      }
    }else{
      res.status(500).json({ message: "No account type", error });
    }
    // console.log('Projects fetched:', projects);
    res.status(200).json(filteredProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// Fetch all running tasks
const getAllRunningTasks = async (req, res) => {
  try {
    const runningTasks = await ProjectRunning.find();
    res.status(200).json(runningTasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching running tasks", error });
  }
};

const getAllCompletedTasks = async (req, res) => {
  try {
    // console.log("Fetching completed tasks...");
    const profile = await User.find({ _id: req.params.userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // console.log(profile?.[0]?.email)
    // console.log('Fetching all projects...');
    let projects = await ProjectCompleted.find();
    // const filteredProjects = projects.filter((project) => {
    //   return (
    //     project.data.custom_fields.find(
    //       (field) => field?.name?.toLowerCase() === "contact email"
    //     ).value === profile?.[0]?.email
    //   );
    // });
    projects = projects.filter((project)=>{
      return(
        project.data.custom_fields.find(
          (field) => field?.name?.toLowerCase() === "published"
        ).value
      )
    })
    let filteredProjects = []
    if(profile[0].accountType){
      if(profile[0].accountType.toLowerCase() === "iti"){
        filteredProjects = projects;
      }else if (profile[0].accountType === "individual"){
        filteredProjects = projects.filter((project) => {
          return (
            project.data.custom_fields.find(
              (field) => field?.name?.toLowerCase() === "contact email"
            ).value === profile?.[0]?.email 
          );
        });
      }else{
        filteredProjects = projects.filter((project) => {
          return (
            project.data.custom_fields.find(
              (field) => field?.name?.toLowerCase() === "company"
            ).value?.[0]?.name === profile?.[0]?.accountType 
          );
        });
      }
    }else{
      res.status(500).json({ message: "No account type", error });
    }
    // console.log('Projects fetched:', projects);
    res.status(200).json(filteredProjects);
    // const completedTasks = await ProjectCompleted.find();
    // // console.log("Completed tasks fetched:", completedTasks);
    // res.status(200).json(completedTasks);
  } catch (error) {
    console.error("Error fetching completed tasks:", error.stack);
    res
      .status(500)
      .json({
        message: "Error fetching completed tasks",
        error: error.message,
      });
  }
};

// Add a new project (optional)
const addProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: "Error adding project", error });
  }
};

const updateProjectLike = async (req, res) => {
  const { projectId, liked } = req.body;

  try {
    const project = await ProjectRunning.findOne({ "data._id": projectId });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Safely update the `liked` state
    if (!project.liked) {
      project.liked = {}; // Ensure `liked` exists
    }
    project.liked.liked = liked; // Update the liked state

    await project.save();

    res
      .status(200)
      .json({ message: "Project like state updated successfully", project });
  } catch (error) {
    console.error("Error updating project like state:", error);
    res
      .status(500)
      .json({ message: "Error updating project like state", error });
  }
};

module.exports = {
  getAllProjects,
  getAllRunningTasks,
  addProject,
  updateProjectLike,
  getAllCompletedTasks,
  getUserById,
};
