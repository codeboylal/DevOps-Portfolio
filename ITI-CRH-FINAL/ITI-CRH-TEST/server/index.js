// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const connectToDatabase = require("./config/db");

const signInRoutes = require("./routes/Sign In Up/SignIn/signIn");
const routerPath = require("./routes/index.js");
const getprojectCardDetails = require("./routes/projects/projectCard.js");
const projectRouter = require("./routes/projects/projectCard.js");
const {
  announcementRoutes,
} = require("./routes/Admin Panel/Announcemnet/announcementRoutes.js");
const fileRoutes = require("./routes/AWS Routes/Project Details/filesRoutes.js");
// const { cronSync } = require("./controllers/clickUp/cronSync.js");
const {
  TriggerWebhooks,
} = require("./controllers/webhooks/trigger.controller.js");
const {
  getSubtasksWithCustomFields,
} = require("./controllers/clickUp/detailedTask.js");
const {
  fetchProjectClickupData,
} = require("./controllers/clickUp/getAllProjectClickupData.controller.js");
// Initialize environment variables
dotenv.config();

// Create the Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS

app.use(express.json()); // Parse JSON request bodies

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", fileRoutes);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Api From SignIn
app.use("/api", signInRoutes);
app.use("/api", routerPath);
app.use("/api", projectRouter);

app.post("/", async (req, res) => {
  // const data = req.body;
  // console.log('Received ClickUp webhook:', data);
  // Handle task update logic here
  TriggerWebhooks(req, res);
  // res.status(200).send('Webhook received');
});

app.use("/api", getprojectCardDetails);

app.use("/api/announcements", announcementRoutes);

app.get("*", (req, res) => {
  res.send("Please enter a valid path");
});

// Start the server
const PORT = process.env.PORT || 8000;

// Server start function
const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // getSubtasksWithCustomFields("86cx7me0w");
    // fetchProjectClickupData();
  });
};

// Call the functions in sequence
const initApp = async () => {
  await connectToDatabase(); // Connect to MongoDB first
  startServer(); // Start the server after the DB connection is established
  // cronSync();
};

// Initialize the app
initApp();
