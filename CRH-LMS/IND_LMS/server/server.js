// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const { exec } = require("child_process");

//MongoDB
const connectToDatabase = require("./config/db");

//Router
const authRoute = require("./routes/authRoutes.js");
const routerPath = require("./routes/index.js");
const profileRoutes = require("./routes/profileRoute.js");
const bioRoutes = require("./routes/bioRoutes.js");
const educationRoutes = require("./routes/educationRoutes");

// Initialize environment variables
dotenv.config();

// Create the Express app
const app = express();



app.use(express.json()); // Parse JSON request bodies
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true,
// };

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json())

// Define a simple route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

app.use("/api/auth", authRoute);
app.use("/api/v1", routerPath);
app.use("/api/profile", profileRoutes);
app.use("/api/bio", bioRoutes);
app.use("/api/education", educationRoutes);

app.get("*", (req, res) => {
  res.send("Please enter a valid path");
});

// Start the server
const PORT = process.env.PORT || 8089;

// Server start function
const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

const closePort = (port) => {
  return new Promise((resolve) => {
    if (process.platform === "win32") {
      // Windows: Find and kill the process using the port
      exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
        if (stdout) {
          const lines = stdout.trim().split("\n");
          lines.forEach((line) => {
            const pid = line.trim().split(/\s+/).pop();
            exec(`taskkill /PID ${pid} /F`, () => resolve());
          });
        } else {
          resolve();
        }
      });
    } else {
      // macOS/Linux: Find and kill the process using the port
      exec(`lsof -ti :${port} | xargs kill -9`, () => resolve());
    }
  });
};

// Call the functions in sequence
const initApp = async () => {
  await closePort(PORT);
  await connectToDatabase(); // Connect to MongoDB first
  startServer(); // Start the server after the DB connection is established
  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log("\nClosing server...");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
};

// Initialize the app
initApp();
