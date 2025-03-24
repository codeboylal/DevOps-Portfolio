const User = require("../../Model/UserModel/model.js");
const ResponseHandler = require("../../utils/responseHandler.js"); 

const updateProgressOfCourse = async (req, res, next) => {
    const {id, courseId} = req.body;
    // console.log(req.body)
    try{
    const profile = await User.findOne({_id: id})
      if(profile){
        let a= 0
        for(let i of profile.continueWatching){
            // console.log(i)
            if(i.courseId === courseId){
                i.progress = 1
                profile.markModified('continueWatching')
                break
            }
            a++;
        }
        // console.log(profile.continueWatching?.[a]?.progress)
        await profile.save()
        res.status(200).json(ResponseHandler(200, profile.continueWatching, 'Course Id not found in DB'));
      }else{
        console.log("Error: Profile Id not found in DB")
        res.status(200).json(ResponseHandler(404, null, 'Course Id not found in DB'));
      }
    }catch(err){
      console.log(err);
      res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
    };
};

module.exports = updateProgressOfCourse;
