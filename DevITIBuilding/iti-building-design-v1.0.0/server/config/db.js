const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();


mongoose.set('strictQuery', false);
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URL);
        console.log(`Connected to ${process.env.Mongo_URL}`);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);  // Exit the process if database connection fails
    }
};

module.exports = connectToDatabase;


