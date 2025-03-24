const toDo = require("../../../Model/UserModel/toDoModel.js")
const ResponseHandler = require("../../../utils/responseHandler.js"); 

const GetUserToDoController = (req, res, next) => {
    toDo.find({id:req.query.userID})
    .then(response => {
      // console.log(response)
      res.status(200).json(ResponseHandler(200, response, 'Details fetched successfully!'));
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
    });
};

module.exports = GetUserToDoController;
