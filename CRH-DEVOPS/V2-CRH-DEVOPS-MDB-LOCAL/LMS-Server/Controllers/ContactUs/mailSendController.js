const emailHelper = require("../../Helpers/email");

const PostConatctSendMailController = async(req, res, next) => {
    
    try{
        emailHelper.sendMail(req.body.name , req.body.email, req.body.query, req.body.suggestion,  req.body.userId);
        res.status(200).json({success:true, msg:"Mail Sent Successfully"})
    }catch(error){
        res.status(400).json({success:true, msg:error.message})
    }
};

module.exports = PostConatctSendMailController;