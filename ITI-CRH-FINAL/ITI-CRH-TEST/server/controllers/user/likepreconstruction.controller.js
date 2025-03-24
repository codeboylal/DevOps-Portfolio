const User = require("../../Models/Sign In Up/SignIn/signInModel.js");
const ResponseHandler = require("../../utils/responseHandler.js");

const updateLikedPreConstruction = async (req, res) => {
  try {
    const { taskId, userId , like} = req.body;

    // Fetch user by ID
    const user = await User.findOne({_id:userId});

    if (user) {
      // console.log(like)
      // Add taskId if it doesn't exist
      if(like){
        if(!user?.likedProjects.includes(taskId)){
          user.likedProjects.push(taskId);
          await user.save();
          return res.status(200).json(ResponseHandler(200, like, "Task added to liked projects successfully"));
        }else{
          return res.status(200).json(ResponseHandler(304, like, "Task is already in Liked projects"));
        }
        
      }else{
        const index = user.likedProjects.indexOf(taskId);
        if (index !== -1) {
            // Remove taskId if it already exists
            user.likedProjects.splice(index, 1);
            await user.save();
            return res.status(200).json(ResponseHandler(200, like, "Task removed from liked projects successfully"));
          }
      }
    
    } 

    return res.status(200).json(ResponseHandler(404, null, "User not found"));
  } catch (error) {
    return res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

module.exports = updateLikedPreConstruction;
