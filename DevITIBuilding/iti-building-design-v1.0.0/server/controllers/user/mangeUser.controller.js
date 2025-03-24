const User = require("../../Models/Sign In Up/SignIn/signInModel.js")
const ResponseHandler = require("../../utils/responseHandler.js");

const manageUserController = async (req, res) => {
    try{
    // console.log(req.body)
    const {id, email, action} = req.body;
    const userProfile = await User.findOne({_id: id})
    if(userProfile){
        let userRole = userProfile?.role
        // console.log(userRole)
        if ((action === "lock" || action === "unlock") && userRole !== "ITI"){
            res.status(200).json(ResponseHandler(403 , null, `Permission Denied`));
        }else if (action === "delete" && userRole !== "ITI"){
            if (action === "delete" && userRole !== "companyAdmin"){
                return res.status(200).json(ResponseHandler(403 , null, `Permission Denied`));
            }else{
                return res.status(200).json(ResponseHandler(403 , null, `Permission Denied`));
            }
        }else{
            const profile = await User.findOne({email})
            if(profile){
                let result = ''
                if(action === "delete"){
                    const deletedUser = await User.findOneAndDelete({ email });
                    if (!deletedUser) {
                        return res.status(200).json(ResponseHandler(404, null, "User not found"));
                      }
                      return res.status(200).json(ResponseHandler(200, null, "User deleted successfully"));
                }else{
                    result = action + 'ed'
                }
                profile.accountStatus = result
                await profile.save()
                return res.status(200).json(ResponseHandler(200 , null, `Profile ${result} Successfully`));
            }else{
                return res.status(200).json(ResponseHandler(404 , null, `Profile not found`));
            }
        }
    }else{
        return res.status(200).json(ResponseHandler(404 , null, `Please login Again`));
    }
  }catch (error) {
    res.status(500).json(ResponseHandler(500 , null, "Internal Server Error"));
  }
}


module.exports =  {manageUserController} ;







