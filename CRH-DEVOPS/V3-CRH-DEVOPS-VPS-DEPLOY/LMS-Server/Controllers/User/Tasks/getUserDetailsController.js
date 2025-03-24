const User = require("../../../Model/UserModel/model.js");
const ResponseHandler = require("../../../utils/responseHandler.js"); 

const GetUserDetailsController = (req, res, next) => {
  User.find({_id:req.query.userID})
    .then(response => {
      // console.log(response)
      res.status(200).json(ResponseHandler(200, response, 'Details fetched successfully!'));
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
    });
};

module.exports = GetUserDetailsController;
