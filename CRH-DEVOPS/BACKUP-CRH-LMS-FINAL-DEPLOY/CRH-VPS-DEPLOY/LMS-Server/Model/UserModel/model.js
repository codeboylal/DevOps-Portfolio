// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// module.exports = User;









const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { type } = require('os');


const courseSchema = new mongoose.Schema({
  courseName: { type: String },
  courseNumber: { type: Number }
});


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    mobileNo: Number,
    profileBanner: String,
    profileImg: String,
    location: String,
    organizationName: String,
    Languages: [String], 
    bio: String,
    edu:String,
    education:{
      type: [{}]
    },
    firstName: { type: String},
    lastName: { type: String },
    
    phoneNumber: { type: String },
    toDoList:[[String]],
    course: [courseSchema],
    instructorsData:[[String]],
    notificationData:[[String]],
    continueWatching:[Object],
    resetPasswordToken: String,
  },
  { timestamps: true }
);

// // Hash the password before saving the user to the database
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
// const mongoose = require("mongoose");


