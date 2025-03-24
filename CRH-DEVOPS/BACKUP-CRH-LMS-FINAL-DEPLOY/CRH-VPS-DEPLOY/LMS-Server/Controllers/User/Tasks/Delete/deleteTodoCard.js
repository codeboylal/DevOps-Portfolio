const todo = require("../../../../Model/UserModel/toDoModel.js");
const ResponseHandler = require("../../../../utils/responseHandler.js");

const DeleteToDoController = async (req, res, next) => {
    const { id, userId } = req.body;
    // console.log(id , userId);

    try {
        const profile = await todo.findOne({id:userId})

        if(profile){

            let a = 0

            for(let i of profile.toDo){
                if(i.id === id){
                break
                }
                a+=1
            }


            profile.toDo = [
                ...profile.toDo.slice(0, a),
                ...profile.toDo.slice(a + 1)
              ];

            await profile.save()
            res.status(200).json(ResponseHandler(200, profile, 'To Do Card Deleted Successfully'));
        }else{
            res.status(500).json(ResponseHandler(500, null, 'Profile not found'));
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
    }
};

module.exports = DeleteToDoController;
