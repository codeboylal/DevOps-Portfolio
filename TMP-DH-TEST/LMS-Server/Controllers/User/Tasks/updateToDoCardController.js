const todo = require("../../../Model/UserModel/toDoModel.js");
const ResponseHandler = require("../../../utils/responseHandler.js");


const updateToDoCardController = async(req, res, next) => {
  try {
    let arr = ["rainbow","thumbs-up","cherry","heart"];
    let randomIndex = Math.floor(Math.random() * arr.length); // Generates a random index
    let randomElement = arr[randomIndex]; // Accesses the random element
    // console.log(randomElement); // Prints a random element from the array

    let currentDate = new Date();
    // let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = currentDate.toLocaleDateString('en-US', options);
    // console.log(formattedDate); // Example: November 27, 2024

    const {id, para, userId, title, desc, selectedColor} = req.body;
    
    const profile = await todo.findOne({id:userId})

    if(profile){
        
        if(para === "Add"){
            profile.toDo.unshift({
                title,
                description : desc,
                emoji : randomElement,
                tasks : {
                    completed : 0,
                    total: 0
                },
                background : selectedColor,
                list: [],
                date: formattedDate,
                id: profile?.toDo?.[0]?.id + 1 || 1
            })
        }

        if (para === "Edit" && profile.toDo) {
          
          let a = 0

          for(let i of profile.toDo){
            if(i.id === id){
              break
            }
            a+=1
          }

          profile.toDo[a].title = title || profile.toDo[a].title;
          profile.toDo[a].description = desc || profile.toDo[a].description;
          profile.toDo[a].background = selectedColor || profile.toDo[a].background;

          // console.log(profile.toDo[a])

          profile.markModified('toDo');
          // console.log(profile.toDo[id])
      } else {
          console.error("Invalid parameters or ID");
      }
      

        await profile.save()
        res.status(200).json(ResponseHandler(200, profile, `ToDo Card ${para === "Edit" ? "Updated" : "Added"} successfully!`));


    }else{
        console.log("Profile not found")
        res.status(404).json(ResponseHandler(404, null, 'Profile not found'));
    }

  } catch (err) {
    console.error(err);
    res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
  }
};

module.exports = updateToDoCardController;
