const User = require("../../Models/Sign In Up/SignIn/signInModel.js")
const ResponseHandler = require("../../utils/responseHandler.js");

function simplifyUsers(users, actualId){
    let newUsers = []
    for (let i of users){
        if( actualId.toString() !== i?._id.toString() && i.accountStatus !== "deleted" && i.accountStatus !== "mail not verified"){
            newUsers.push({
                id: i._id,
                name: i.name, 
                email: i.email,
                likedPlans: i.likedPlans, 
                likedProjects: i.likedProjects,
                role: i.role,
                accountStatus: i.accountStatus,
                accountType: i.accountType,
                discount: i.discount,
                access: i.access,
                payment: i.payment
            })
        }
    }
    return newUsers;
}

const fetchAllUsersData = async (req, res) => {
  try {
    const user = await User.find({_id: req.body.id});
    let catchUsers =[]
    if(user?.[0]){
        if(user[0]?.role === "individual" || user[0]?.role === "companyStaff" || user[0]?.role === "companyContractors"){
            return res.status(200).json(ResponseHandler(403 , null, "Access Denied"));
        }else if(user[0]?.role === "companyAdmin"){
            const users = await User.find({accountType: user[0].accountType})
            catchUsers = simplifyUsers(users, req.body.id)
            return res.status(200).json(ResponseHandler(200 , catchUsers, `All users of ${user[0].role} are fetched successfully`));
        }else if(user[0]?.role === "ITI"){
            const users = await User.find()
            catchUsers = simplifyUsers(users, req.body.id)
            return res.status(200).json(ResponseHandler(200 , catchUsers, `All users of ITI are fetched successfully`));
        }
    }
    
    return res.status(200).json(ResponseHandler(404 , null, "Profile not found"));
  } 
  catch (error) {
    res.status(500).json(ResponseHandler(500 , null, "Internal Server Error"));
  }
};




module.exports =  {fetchAllUsersData} ;







