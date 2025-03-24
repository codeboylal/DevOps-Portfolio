// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {

//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection failed:', error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    // console.log(process.env.MONGODB_URI)
    const resp = await mongoose.connect(process.env.MONGODB_URI);
    // const resp = await mongoose.connect('mongodb://127.0.0.1:27017/lms')
    console.log(process.env.MONGODB_URI)
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
// mongodb://localhost:27017/
