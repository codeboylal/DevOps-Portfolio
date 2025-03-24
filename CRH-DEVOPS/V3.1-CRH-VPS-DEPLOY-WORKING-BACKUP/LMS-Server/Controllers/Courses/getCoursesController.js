const Course = require("../../Model/courseModel.js");
const ResponseHandler = require("../../utils/responseHandler.js"); 

const getExploreCourseDetails = (req, res, next) => {
    Course.find()
    .then(response => {
      // console.log(response)
      res.status(200).json(ResponseHandler(200, response, 'Course Details fetched successfully!'));
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(ResponseHandler(500, null, 'Internal server error'));
    });
};

module.exports = getExploreCourseDetails;
