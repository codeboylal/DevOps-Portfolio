

require('dotenv').config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use('/api/users', userRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Config/db'); // DB connection
const userRoutes = require('./All Routes/User Routes/userRoute'); // Routes for users
// const loginRoute = require('./All Routes/User Routes/loginRoute'); // Import login route
const goToCourseRoutes = require('./All Routes/My Course/Go To Course/goToCourseRoute');
const startCourseRoutes = require('./All Routes/My Course/Start Course/startCourse');
const progressRoutes = require('./All Routes/My Course/Progress Course/progressCourse')

const router = require('./routes/index');
const User = require('./Model/UserModel/model');
const toDo = require("./Model/UserModel/toDoModel.js");
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
const session = require('express-session');

// const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const UserModel = require("./Model/user");
const app = express();
const crypto = require('crypto');

app.use(session({
  secret: 'your-secret-key',  // Replace with a secure secret
  resave: false,
  saveUninitialized: true,
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
// mongoose.connect("mongodb://localhost:27017/lms")
//     .then(() => console.log("MongoDB Connected!"))
//     .catch(err => {
//         console.error("Mongo Connection Error: ", err);
//         process.exit(1); // Exit the application if the database connection fails
//     });

// JWT Secret
const JWT_SECRET=process.env.JWT_SECRET;

// User Authentication Routes
// Signup Route
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
          name: firstName+ " "+lastName,
          email,
          password: hashedPassword,
          mobileNo: parseInt(phone, 10), 
      });

      await newUser.save();
      res.status(201).json({ success: true, message: "User created successfully!" });
  } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: error.message || "Server error" });
  }
});


// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "No user found" });
        }
        // console.log(user)
        // Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const profile = await toDo.findOne({id:user._id})

        if(!profile){
          const newToDo = new toDo({
            id: user._id,
            email: user.email,
            toDo: []
          })
          await newToDo.save()
        }

        

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, email: user.email , id:user.id});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
// const express = require('express');
// const express = require('express');
// const session = require('express-session');
// const passport = require('./passport');
const { config } = require('dotenv');

// Load environment variables
config();

// const app = express();

// Set up express-session
app.use(session({
    secret: 'your_secret_key', // Use a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize Passport
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api', router);       //taks.js in tasks
// app.use('/api/users', loginRoute); // Use login route for API
app.use(bodyParser.json({ limit: '10mb' }));  // For JSON payloads
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Google Strategy for Passport
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `/auth/google/callback`,
  passReqToCallback: true,
}, (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/success',
  failureRedirect: '/failure'
}));

app.get('/success', async (req, res) => {
  if (!req.user) return res.redirect('/failure');

  try {
    let profile = await User.findOne({ email: req.user.email });
    if (!profile) {
      const name = req.user.email.split('@')[0];
      profile = await User.create({ email: req.user.email, name });
      console.log("New profile created:", profile);
    }
    res.redirect(`${process.env.CLIENT_URL}/dashboard?id=${profile.id}`);
  } catch (error) {
    console.error("Error in success Google API:", error);
    res.redirect('/failure');
  }
});

app.get('/failure', (req, res) => {
  res.send("Error: Authentication failed");
});

// const successGoogleLogin = ;

// // Failure route
// app.get('/failure', (req, res) => {
//     res.send("Error during authentication.");
// });

const emailHelper = require ('./Helpers/ForgetPassMail')
// Forgot Password Route
// app.post('/forgot-password', async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         const resetToken = crypto.randomBytes(32).toString("hex");
//         const resetLink = `${process.env.CLIENT_URL}/resetpassword`;
//         emailHelper.ForgetPassMail(user.name , req.body.email, resetLink)
//         // Here you would typically send the reset link via email
//         console.log(`Password reset link: ${resetLink}`);

//         // For simplicity, just return the link (in production, this should be emailed)
//         res.json({ message: 'Password reset link sent', resetLink });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error in resetting password' });
//     }
// });

// Reset Password Route
// app.post('/reset-password/:token', async (req, res) => {
//     const { token } = req.params;
//     const { newPassword } = req.body;

//     try {
//         // Validate token (in a real app, you'd store and verify the token)
//         if (!token) {
//             return res.status(400).json({ message: 'Invalid token' });
//         }

//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         // Update user password (for simplicity, we assume token is valid)
//         const user = await User.findOne({ email: 'user_email@example.com' }); // Use email from token in real case
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         user.password = hashedPassword;
//         await user.save();

//         res.json({ message: 'Password reset successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error in resetting password' });
//     }
// });


// Forgot Password Route
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    await user.save();
    const resetLink = `${process.env.CLIENT_URL}/resetpassword?token=${resetToken}`;
    emailHelper.ForgetPassMail(user.name, email, resetLink);

    // Store token (in DB) for user with expiration if needed
    res.json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error in resetting password' });
  }
});

// Reset Password Route
app.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    console.log(token)
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error in resetting password' });
  }
});

// Starting the server
// const PORT = 5000; // Change to 5000 or any port you prefer
app.post(
  '/api/update/inprogresscourses/:userId' , async(req,res)=>{
    const id= req.params.userId;
    const courses = req.body.newCourses;

    console.log(id, courses)
    const profile = await User.findById(id);

    profile.continueWatching = courses;

    await profile.save();
  }
)

//google authentication
// Initialize Passport

// app.use(passport.initialize());
// app.use(passport.session());

// const successGoogleLogin = async (req, res) => {
//   if (!req.user) {
//     return res.redirect('/failure');
//   }

//   try {
//     // Use `await` to handle the asynchronous `User.findOne` call
//     const profile = await User.findOne({ email: req.user.email });

//     if (profile) {
//       return res.redirect('/failure');
//     } else {
//       console.log(profile)
//       // Using template literals to send a single response message
//       res.send(`Welcome ${req.user.email} \n Profile: ${profile}`);
//     }
//   } catch (error) {
//     console.error("Error in success Google API:", error);
//     res.redirect('/failure');
//   }
// };

// const failureGoogleLogin = (req, res) => {
//   res.send("error");
// };

// app.get(
//   '/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] })
// );

// app.get(
//   '/auth/google/callback', passport.authenticate('google', {
//     successRedirect: '/success',
//     failureRedirect: '/failure'
//   })
// );

// app.get('/success', successGoogleLogin);
// app.get('/failure', failureGoogleLogin);



// Error handling middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});















app.use('/api/goToCourses', goToCourseRoutes);
app.use('/api/startCourses', startCourseRoutes);
app.use('/api/progressCourse', progressRoutes);

// app.use('/api', courseRoutes);







// Pic upload folder
const { Octokit } = require('@octokit/rest');   //Github library
const path = require('path');
const multer = require('multer');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// GitHub authentication and configuration
const octokit = new Octokit({
  auth: process.env.GithubToken,


});
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_REPO = process.env.GITHUB_REPO;

const fs = require('fs');
const { profile } = require('console');

// Function to delete a folder and its contents locally
const deleteFolderRecursive = (folderPath) => {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursively delete folder
        deleteFolderRecursive(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
    console.log(`Deleted folder: ${folderPath}`);
  }
};


const Storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const userID = req.params.userID || 'No_User';
    let subFolder;

    // Determine the subfolder based on the file field name
    if (file.fieldname === 'media') {
      subFolder = 'Banner'; // For banner images
    } else if (file.fieldname === 'mediaPic') {
      subFolder = 'Profile'; // For profile pictures
    }

    const directory = path.join('uploads', userID, subFolder);

    // Check and delete the existing folder (locally and on GitHub)
    deleteFolderRecursive(directory); // Local folder delete

    // Recreate the folder 
    fs.mkdirSync(directory, { recursive: true });

    cb(null, directory);
  },
  filename: (req, file, cb) => {
    // Retain the original file name for the new upload
    cb(null, file.originalname);
  }
});

// Multer instance for uploading
const uploadBanner = multer({
  storage: Storage,
}).fields([
  { name: 'media', maxCount: 1 },
  { name: 'mediaPic', maxCount: 1 }
]);

app.post('/pic/:userID/:para', (req, res) => {
  const para = req.params.para;
  const userID = req.params.userID;

  uploadBanner(req, res, async (err) => {
    if (err) {
      console.error('Multer Error:', err);
      return res.status(500).send({ message: 'File upload failed', error: err });
    }

    try {
      let updateField, folderPath, fileToUpload, githubFilePath;

      // Determine folder path based on the 'para'
      if (para === 'banner' && req.files['media']) {
        fileToUpload = req.files['media'][0];
        updateField = { profileBanner: `/uploads/${userID}/Banner/${fileToUpload.filename}` };
        folderPath = path.join(__dirname, 'uploads', userID, 'Banner');
        githubFilePath = `uploads/${userID}/Banner/${fileToUpload.filename}`;
      } else if (para === 'profilePic' && req.files['mediaPic']) {
        fileToUpload = req.files['mediaPic'][0];
        updateField = { profileImg: `/uploads/${userID}/Profile/${fileToUpload.filename}` };
        folderPath = path.join(__dirname, 'uploads', userID, 'Profile');
        githubFilePath = `uploads/${userID}/Profile/${fileToUpload.filename}`;
      } else {
        return res.status(400).send({ message: 'Invalid parameter or missing file' });
      }

      // Ensure directory exists or create it
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Add a short delay before reading the file to avoid conflicts
      setTimeout(async () => {
        try {
          // Read the newly uploaded file
          const filePath = path.join(folderPath, fileToUpload.filename);
          const fileContent = fs.readFileSync(filePath, { encoding: 'base64' });

          // Update the Profile document
          await User.updateOne({ _id: userID }, { $set: updateField });

          let sha;
          try {
            // Check if the file already exists on GitHub to get its SHA
            const { data } = await octokit.repos.getContent({
              owner: GITHUB_USERNAME,
              repo: GITHUB_REPO,
              path: githubFilePath,
            });
            sha = data.sha;
          } catch (error) {
            if (error.status !== 404) {
              throw error;
            }
          }

          // Create or update the file in the GitHub repository
          await octokit.repos.createOrUpdateFileContents({
            owner: GITHUB_USERNAME,
            repo: GITHUB_REPO,
            path: githubFilePath,
            message: `Upload ${fileToUpload.filename}`,
            content: fileContent,
            sha: sha,
          });

          console.log('File uploaded successfully');
          return res.json({ success: true, message: 'File uploaded successfully' });
        } catch (readError) {
          console.error('File Read Error:', readError);
          return res.status(500).send({ message: 'File read failed', error: readError });
        }
      }, 100);  // Delay of 100 milliseconds to allow the file system to release the lock

    } catch (error) {
      console.error('Database Update Error:', error);
      res.status(500).send({ message: 'Profile update failed', error });
    }
  });
});






// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});




app.post("/tasks", (req, res) => {
  console.log("Create Task route hit");
  const { title, emoji } = req.body;

  // Validate input
  if (!title || !emoji) {
      return res.status(400).json({ error: "Title and Emoji are required" });
  }

  // Create a new task with static content
        
  const newTask = new TaskModel({
      title,
      emoji,
      description: "Static description content",
      priority: "High",
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  newTask.save()
      .then(task => res.status(201).json(task))
      .catch(err => res.status(500).json({ error: err.message }));
});

app.get("/tasks", (req, res) => {
  TaskModel.find()
      .then(tasks => res.status(200).json(tasks))
      .catch(err => res.status(500).json({ error: err.message }));
});


app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;

  TaskModel.findByIdAndUpdate(id, req.body, { new: true })
      .then(task => {
          if (task) {
              res.status(200).json(task);
          } else {
              res.status(404).json({ error: "Task not found" });
          }
      })
      .catch(err => res.status(500).json({ error: err.message }));
});


app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete(id)
      .then(task => {
          if (task) {
              res.status(200).json({ message: "Task deleted successfully" });
          } else {
              res.status(404).json({ error: "Task not found" });
          }
      })
      .catch(err => res.status(500).json({ error: err.message }));
});

