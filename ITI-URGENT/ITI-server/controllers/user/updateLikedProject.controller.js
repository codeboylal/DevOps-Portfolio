const User = require("../../Models/Sign In Up/SignIn/signInModel.js");
const ResponseHandler = require("../../utils/responseHandler.js");

const updateLikedProject = async (req, res) => {
  try {
    const { taskId, userId , like} = req.body;

    // Fetch user by ID
    const user = await User.findById(userId);

    if (user) {
      // console.log(like)
      // Add taskId if it doesn't exist
      if(like){
        if(!user?.likedPlans.includes(taskId)){
          user.likedPlans.push(taskId);
          await user.save();
          return res.status(200).json(ResponseHandler(200, like, "Task added to liked plans successfully"));
        }else{
          return res.status(200).json(ResponseHandler(304, like, "Task is already in Liked Plans"));
        }
        
      }else{
        const index = user.likedPlans.indexOf(taskId);
        if (index !== -1) {
            // Remove taskId if it already exists
            user.likedPlans.splice(index, 1);
            await user.save();
            return res.status(200).json(ResponseHandler(200, like, "Task removed from liked plans successfully"));
          }
      }
    
    } 

    return res.status(404).json(ResponseHandler(404, null, "User not found"));
  } catch (error) {
    return res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

module.exports = updateLikedProject;
