// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const connectToDatabase = require('./config/db');

const signInRoutes = require('./routes/Sign In Up/SignIn/signIn');
const routerPath = require("./routes/index.js");
const getprojectCardDetails = require('./routes/projects/projectCard.js');
const projectRouter = require('./routes/projects/projectCard.js');

// Initialize environment variables
dotenv.config();

// Create the Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS

app.use(express.json()); // Parse JSON request bodies

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false, }));



// Define a simple route
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});








// Api From SignIn
app.use("/api", signInRoutes);
app.use("/api", routerPath)
app.use("/api",projectRouter)



app.get('*', (req, res) => {
  res.send('Please enter a valid path');
});


app.use('/api', getprojectCardDetails);
















// Start the server
const PORT = process.env.PORT || 8000;


// Server start function
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

// Call the functions in sequence
const initApp = async () => {
  await connectToDatabase();  // Connect to MongoDB first
  startServer();              // Start the server after the DB connection is established
};

// Initialize the app
initApp();
