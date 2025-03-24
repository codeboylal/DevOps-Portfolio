const User = require("../../Models/Sign In Up/SignIn/signInModel.js")
const ResponseHandler = require("../../utils/responseHandler.js");

const fetchUserData = async (req, res) => {
  try {
    const user = await User.find({_id: req.body.userId});
    // console.log(user)
    const data = {
      id: user[0]._id,
      name: user[0].name, 
      email: user[0].email,
      likedPlans: user[0].likedPlans, 
      likedProjects: user[0].likedProjects,
      role: user[0].role,
      accountStatus: user[0].accountStatus,
      accountType: user[0].accountType,
      discount: user[0].discount,
      access: user[0].access,
      payment: user[0].payment,
      userImg: user[0].userImg,
      accountTypeId: user[0].accountTypeId
    }
    res.status(200).json(ResponseHandler(200 , data, "User Data Fetched Successfully"));
  } catch (error) {
    res.status(500).json(ResponseHandler(500 , null, "Internal Server Error"));
  }
};




module.exports =  {fetchUserData} ;







