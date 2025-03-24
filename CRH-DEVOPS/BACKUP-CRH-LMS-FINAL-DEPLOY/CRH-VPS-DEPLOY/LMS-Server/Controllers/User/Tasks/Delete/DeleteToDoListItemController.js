const todo = require("../../../../Model/UserModel/toDoModel.js");
const ResponseHandler = require("../../../../utils/responseHandler.js");

const DeleteToDoListItemController = async (req, res, next) => {
    const { userId, itemId, listId } = req.body;
    // console.log(id , userId);

    try {
        const profile = await todo.findOne({id:userId})

        if(profile){

            let a = 0

            for(let i of profile.toDo){
                if(i.id === listId){
                break
                }
                a+=1
            }

            let b = 0 

            for(let i of profile.toDo[a].list){
                if(i.id === itemId){
                break
                }
                b+=1
            }

            if(profile.toDo[a].list[b].completed){
                profile.toDo[a].tasks.completed = profile.toDo[a].tasks.completed - 1
              }
            profile.toDo[a].list = [
                ...profile.toDo[a].list.slice(0, b),
                ...profile.toDo[a].list.slice(b + 1)
              ];
            
            const updatedfavList = profile.toDo[a].list.sort((a, b) => {
            // Compare based on the 'fav' property
                if (a.fav === b.fav) return 0; // If both are either true or false, maintain their order
                return a.fav ? -1 : 1; // Fav items come first
            });
            
            // Update the matchingToDo object
            profile.toDo[a].list = updatedfavList;
            profile.toDo[a].tasks.total = profile.toDo[a].tasks.total - 1;

            
            profile.markModified('toDo');

            await profile.save()
            res.status(200).json(ResponseHandler(200, profile.toDo[a] , 'To Do List Deleted Successfully'));
        }else{
            res.status(500).json(ResponseHandler(500, null, 'Profile not found'));
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
    }
};

module.exports = DeleteToDoListItemController;
