const User = require("../../Models/Sign In Up/SignIn/signInModel.js")
const ResponseHandler = require("../../utils/responseHandler.js");

const fetchUserData = async (req, res) => {
  try {
    const user = await User.find({_id: req.body.userId});
    // console.log(user)
    const data = {name: user[0].name, likedPlans: user[0].likedPlans}
    res.status(200).json(ResponseHandler(200 , data, "User Data Fetched Successfully"));
  } catch (error) {
    res.status(500).json(ResponseHandler(500 , null, "Internal Server Error"));
  }
};




module.exports =  {fetchUserData} ;







