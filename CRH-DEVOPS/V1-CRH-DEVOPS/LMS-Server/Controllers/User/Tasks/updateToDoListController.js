const todo = require("../../../Model/UserModel/toDoModel.js");
const ResponseHandler = require("../../../utils/responseHandler.js");


const updateToDoListController = async(req, res, next) => {
  try {
    let currentDate = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let weekday = days[currentDate.getDay()];
    let day = currentDate.getDate();
    let month = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();

    let formattedDate = `${weekday}, ${day} ${month} ${year}`;
    console.log(formattedDate); // Example: Wednesday, 27 November 2024

    

    const {userId, taskId, itemId, title, para} = req.body;
    
    const profile = await todo.findOne({id:userId})
    let a = 0
    if(profile){
        
        if(para === "Add"){


            for(let i of profile.toDo){
                if(i.id === taskId){
                  break
                }
                a+=1
              }

            profile.toDo[a].list.unshift({
                title,
                completed: false,
                fav: false,
                date: formattedDate,
                id: profile?.toDo?.[a]?.list?.[0]?.id + 1 || 1
            })
        

        const updatedfavList = profile.toDo[a].list.sort((a, b) => {
          // Compare based on the 'fav' property
          if (a.fav === b.fav) return 0; // If both are either true or false, maintain their order
              return a.fav ? -1 : 1; // Fav items come first
          });
          profile.toDo[a].tasks.total = profile.toDo[a].tasks.total + 1;
          // Update the matchingToDo object
          profile.toDo[a].list = updatedfavList;

        }else if (para === "Update" && profile.toDo) {
          for(let i of profile.toDo){
            if(i.id === taskId){
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

          profile.toDo[a].list[b].title = title || profile.toDo[a].list[b].title;

          profile.markModified('toDo');

        }else if(para === "completed"){
          for(let i of profile.toDo){
            if(i.id === taskId){
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

          profile.toDo[a].list[b].completed = !profile.toDo[a].list[b].completed ;


          if(profile.toDo[a].list[b].completed){
            profile.toDo[a].tasks.completed = profile.toDo[a].tasks.completed + 1
          }else{
            profile.toDo[a].tasks.completed = profile.toDo[a].tasks.completed - 1 
          }


          profile.markModified('toDo');
        }else if(para === "fav"){
          for(let i of profile.toDo){
            if(i.id === taskId){
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

          profile.toDo[a].list[b].fav = !profile.toDo[a].list[b].fav ;
          profile.markModified('toDo');
          const updatedfavList = profile.toDo[a].list.sort((a, b) => {
            // Compare based on the 'fav' property
            if (a.fav === b.fav) return 0; // If both are either true or false, maintain their order
            return a.fav ? -1 : 1; // Fav items come first
        });
        
        // Update the matchingToDo object
        profile.toDo[a].list = updatedfavList;
        

        }else {
            console.error("Invalid parameters or ID");
        }
      
        profile.markModified('toDo');
        await profile.save()
        res.status(200).json(ResponseHandler(200, profile.toDo[a], `ToDo List ${para === "Add" ? "Added" : "fav"} successfully!`));


    }else{
        console.log("Profile not found")
        res.status(404).json(ResponseHandler(404, null, 'Profile not found'));
    }

  } catch (err) {
    console.error(err);
    res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
  }
};

module.exports = updateToDoListController;
