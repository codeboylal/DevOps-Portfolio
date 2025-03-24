const User = require("../../Models/Sign In Up/SignIn/signInModel.js")
const ResponseHandler = require("../../utils/responseHandler.js");

const editUserController = async (req, res) => {
    // try{
    // console.log(req.body)
    const {id, email, formData, image} = req.body;
    let selectedId = req.body.selectedId
    // console.log(req.body.selectedId)
    // if(!req.body.selectedId) selectedId = "1"
    if(formData?.accountType === "" || formData?.accountType === "Type") formData.accountType = 'individual'
    const userProfile = await User.findOne({_id: id})
    if(userProfile){
        let userRole = userProfile?.role
        // console.log(image)
            const profile = await User.findOne({email})
            if(profile){
                profile.userImg = image
                profile.name = formData?.name
                profile.accountTypeId = "1"
                // profile.userImg = formData?.userImg
                profile.markModified('name','userImg', 'accountTypeId')
                // await profile.save()
                if(userRole === "companyAdmin" || userRole === "ITI"){
                    let role = ''
                    let roleCount = 0
                    if(formData.role && formData?.type?.toLowerCase() !== "iti" && formData?.type?.toLowerCase() !== "individual"){
                        for (let i of formData.role){
                            if(i?.value){
                                role = 'company' + i?.label
                                roleCount += 1
                                profile.accountTypeId = selectedId
                            }
                        }
                    }else{
                        role = 'individual'
                        profile.accountTypeId = "1"
                    }
                    if(roleCount > 1){
                        return res.status(200).json(ResponseHandler(403 , null, `More than one role is selected`));
                    }
                    // console.log(formData?.role)
                    if(!role || formData?.type?.toLowerCase() === 'iti' || formData?.type?.toLowerCase() === "individual"){
                        // console.log(role)
                        if(formData?.type?.toLowerCase() === "iti"){
                            role = "ITI"
                            profile.accountTypeId = "0"
                        }else{
                            role = "individual"
                            profile.accountTypeId = "1"
                        }
                    }
                    profile.role = role
                    profile.payment = formData?.payment
                    profile.markModified('role','payment', 'accountTypeId')
                    // await profile.save()
                }
                if(userRole === "ITI"){
                    let count = 0
                    for (let i of formData?.access){
                        if(!i?.value){
                            count += 1
                        }
                    }
                    if(count === 5){
                        profile.accountStatus = "not verified"
                        profile.markModified('accountStatus')
                    }else{
                        profile.accountStatus = "verified"
                        profile.markModified('accountStatus')
                    }
                    profile.access = formData?.access
                    profile.discount = formData?.discount
                    if(formData?.type === "Individual"){
                        profile.accountType = 'individual'
                    }else if(formData?.type === "ITI"){
                        profile.role= "ITI"
                    }else{
                        // console.log(formData?.role)
                        if(formData?.type?.toLowerCase() !== "iti" && formData?.type?.toLowerCase() !== "individual"){
                            if(!formData?.role){
                                profile.role = "companyContractors"
                            }else{
                                for (let i of formData.role){
                                    if(i?.value){
                                        profile.role = 'company' + i?.label
                                    }
                                }
                            }
                        }else if(formData?.type?.toLowerCase() === "iti"){
                            profile.role = "ITI"
                        }else{
                            profile.role = "individual"
                        }
                    }
                    if(formData?.type){
                        profile.accountType = formData.type
                        profile.accountTypeId = selectedId
                    }else{
                        profile.accountType = "individual"
                        profile.accountTypeId = "1"
                    }
                    profile.markModified('access','discount','accountType','role', 'accountTypeId')
                }
                await profile.save()
                return res.status(200).json(ResponseHandler(200 , null, `Profile Updated Successfully`));
            }else{
                return res.status(200).json(ResponseHandler(404 , null, `Profile not found`));
            }
    //     }
        }else{
            return res.status(200).json(ResponseHandler(404 , null, `Please login Again`));
        }
    // }
//   catch (error) {
//     res.status(500).json(ResponseHandler(500 , null, "Internal Server Error"));
//   } 
}


module.exports =  {editUserController} ;







