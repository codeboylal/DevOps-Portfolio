const express = require('express');
const cors = require('cors');
const path = require('path'); // Add this line to import the 'path' module
// import { fileURLToPath } from "url";
// import path, { dirname } from "path";
const multer = require('multer');
const Resume = require('./Models/User Model/userModel')

const connectDB = require('./Config/db');
const editProfile = require('./All Routes/Profile Form Routes/editProfileRoute');
const editHeadline = require('./All Routes/Profile Form Routes/editHeadlineRoute');
const getHeadline = require('./All Routes/Profile Form Routes/editHeadlineRoute');
const profileRoutes = require('./All Routes/Profile Form Routes/editPersonalDetailsRoute');
const editEducationRoutes = require('./All Routes/Profile Form Routes/editEducationDetailsRoute');
const editSkillRoutes  = require('./All Routes/Profile Form Routes/editSkillRoute');
const editWorkExperienceTypeNo=require('./All Routes/Profile Form Routes/Work Experience/workExperienceTypeNoRoute');
const editJobPreferenceRoutes=require("./All Routes/Profile Form Routes/editJobPreferenceRoute")
const editCurrentProfile = require('./All Routes/Profile Form Routes/editCurrentProfileRoute')
const resumeRoutes = require('./All Routes/Profile Form Routes/resumeRoute'); // Import routes
const job = require('./Models/Admin Models/Jobs')
const Profile = require('./Models/User Model/userModel.js');

// Adimn Profile Routes
const adminRoutes = require('./All Routes/Admin Profile Routes/adminProfileHeader');
const adminHeadlineRoute = require('./All Routes/Admin Profile Routes/adminHeadlineRoutes')
const companyInfoRoutes = require('./All Routes/Admin Profile Routes/AdminCompanyInfoRoute')
// const yesWorkExperienceRoutes = require('./All Routes/Profile Form Routes/Work Experience/workExperienceTypeYesRoute')
const experienceYes = require('./All Routes/Profile Form Routes/Work Experience/workExperienceTypeYesRoute.js')
const workExperiences = require('./Models/User Model/userModel')

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use('/uploads', express.static('server/uploads'));
app.use(express.json());

// Connect to database
connectDB();
// app.get('/api/profile/:id',async (req,res)=>{
//   console.log("profile",req.params)
//   const profile = await workExperiences.findOne({_id:req.params.id})
//   console.log(profile)
//   res.json({data:profile.data})
// })

const { default: mongoose } = require('mongoose');


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const profile = await Profile.findOne({email , password });
  if(profile){    
      res.json({ success: true , id:profile._id, email:profile.email, name:profile.name ,savedJobs:profile.savedJobs , appliedJobs:profile.appliedJobs });
  }else{
      console.log(profile)
      res.json({ success: false , error:"User does not exists" });
  }
});

app.post('/register', async (req,res)=>{
  const profile = await Profile.findOne({email:req.body.email})
  if(profile){
      res.json({ success: false  , error: "Email Already Exists"});
  }else{
      Profile.create(req.body).then(response=>{
          res.json({ success: true });
      }).catch(err =>{
          console.log(err);
      })
  }
})

//get profile image for header
app.get('/apiGetIMG/:userID',async(req,res)=>{
  try{
    const userID = req.params.userID;
    const profile = await Profile.findOne({_id: userID})
    res.json({profile})
  }catch{
    console.log("Internal Server Error in Header Pic")
  }
})

app.put('/api/Profiles/:id/savedJobs', async (req, res) => {
  const ProfileId = req.params.id;
  const { savedJobs } = req.body;

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      ProfileId, 
      { savedJobs }, 
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({ message: 'Saved jobs updated successfully', savedJobs: updatedProfile.savedJobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


app.get('/api/jobs', async (req, res) => {
  try {
    const { jobType, experienceLevel, jobLocation, applicants, Country } = req.query;
    const filters = [];

    // Filter for job type
    if (jobType) filters.push({ levels: { $in: jobType.split(",") } });

    // Filter for experience level
    if (experienceLevel) filters.push({ levels: { $in: experienceLevel.split(",") } });

    // Filter for job location
    if (jobLocation) filters.push({ levels: { $in: jobLocation.split(",") } });

    // Filter for number of applicants (applicants is an array)
    if (applicants) {
      const [minApplicants, maxApplicants] = applicants.split("-").map(Number);
      if (!isNaN(minApplicants) && !isNaN(maxApplicants)) {
        filters.push({
          $expr: {
            $and: [
              { $gte: [{ $size: "$applicants" }, minApplicants] },
              { $lte: [{ $size: "$applicants" }, maxApplicants] }
            ]
          }
        });
      }
    }

    // Filter for country
    if (Country) {
      filters.push({ location: Country });
    }

    // Use aggregation pipeline to filter data
    const jobData = await job.aggregate([
      { $match: filters.length > 0 ? { $and: filters } : {} } // Apply filters if any exist
    ]);

    res.json(jobData);

  } catch (error) {
    console.error('Error fetching job data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//api for calling all jobs
// app.get('/api/jobs', async (req, res) => {
//   try {
//       const jobData = await job.find();
//       res.json(jobData);

//   } catch (error) {
//       console.error('Error fetching job data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



app.get('/jobs/:jobId', async (req, res) => {
  try {
      const jobId = req.params.jobId;
      if (!mongoose.Types.ObjectId.isValid(jobId)) {
          return res.status(400).send("Invalid Job ID");
      }
      const Job = await job.findOne({_id:jobId})  
      if (Job) {
          res.json(Job);
      } else {
          console.log("Job not found");
          res.status(404).send("Job not found");
      }
  } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
  }
});


app.get('/api/jobs/distinct', async (req, res) => {
try {
  const excludeId = req.query.exclude;
  // const jobs = await job.find({ _id: { $ne: (excludeId) } }).limit(2);
  const jobs = await job.find({ _id: { $ne: (excludeId) } })
  res.json(jobs);
} catch (error) {
  res.status(500).json({ message: 'An error occurred', error: error.message });
}
});

app.post('/api/applyJob', async (req, res) => {
  try {
    const { jobId, userId } = req.body;

    let updatedProfile = await Profile.findByIdAndUpdate(
      userId, 
      { $push: { appliedJobs: jobId } }, 
      { new: true } 
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "User does not exist" });
    }

    let updatedJob = await job.findByIdAndUpdate(
      jobId,
      { $push: { applicants: userId } },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job does not exist' });
    }

    res.status(200).json({ message: 'Job application successful' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







app.post('/api/findAppliedJobs', async (req, res) => {
  try {
    const appliedJobs = req.body.appliedJobs;

    // Validate the UserID


    // Fetch user profile
    const profile = await job.find();

    if (!profile) {
      console.log("User not found");
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract applied jobs with companyName and jobTitle
    // const appliedJobs = profile.map(job => ({
    //   companyName: job._id
    // }));
    // console.log(appliedJobs.length)
    let newJobs=[];
    for(let i of profile){
      if(appliedJobs.includes(i.id)){
        newJobs.push(i);
      }
    }
    // console.log(newJobs , profile)
    // Respond with the list of applied jobs
    res.json({ newJobs });
  } catch (err) {
    console.error('Internal Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// app.get('/api/findNoAppliedJobs/:UserID', async (req, res) => {
//   try {
//     const UserID = req.params.UserID;
//     // Validate the UserID
//     if (!mongoose.Types.ObjectId.isValid(UserID)) {
//       return res.status(400).json({ error: 'Invalid User ID' });
//     }

//     // Fetch user profile
//     const Profilelength = await Profile.findOne({ _id: UserID });
   
//     if (!Profilelength) {
//       console.log("User not found");
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Respond with the count of applied jobs within an object
//     res.json({ appliedJobLength: Profilelength.appliedJobs.length });
//   } catch (err) {
//     console.error('Internal Server Error:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

//get clicked job details from job details page
app.get('/changeJobDetail/:changedJobId' , async(req,res)=>{
  try{
    const profile = await job.findOne({_id:req.params.changedJobId});
    if(profile){
      res.json({jobDetailsProfile: profile})
    }else{
      console.log("Job not found");
      return res.status(404).json({ error: 'Job not found' });
    }
  }catch (err) {
    console.error('Internal Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//Profile banner 

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const fs = require('fs');
const { profile } = require('console');
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userID = req.params.userID || 'No_User'; 
    const directory = path.join('uploads', userID);

    // Ensure the directory exists
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    cb(null, directory);
  },
  filename: (req, file, cb) => {
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
      // Determine which field to update based on `para`
      let updateField;
      if (para === 'banner' && req.files['media']) {
        updateField = { bannerImageURL: `/uploads/${userID}/${req.files['media'][0].filename}` };
      } else if (para === 'profilePic' && req.files['mediaPic']) {
        updateField = { picImageURL: `/uploads/${userID}/${req.files['mediaPic'][0].filename}` };
      } else {
        return res.status(400).send({ message: 'Invalid parameter or missing file' });
      }

      // Update the Profile document
      await Profile.updateOne({ _id: userID }, { $set: updateField });
      console.log('File uploaded successfully');
      return res.json({success:true , message: 'File uploaded successfully'})
      // res.status(200).send({ message: 'File uploaded successfully' , success:true});
      
    } catch (error) {
      console.error('Database Update Error:', error);
      res.status(500).send({ message: 'Profile update failed', error });
    }
  });
});

//delete education 
app.delete('/api/education/:userId/:index', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.userId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const index = parseInt(req.params.index); // Convert the index from string to number
    // console.log(index , typeof(index))
    if (index < 0 || index >= profile.education.length) {
      return res.status(400).json({ message: 'Invalid index' });
    }

    profile.education.splice(index, 1); // Remove the education item at the specified index

    await profile.save(); // Save the updated profile

    res.status(200).json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error('Error deleting education data:', error);
    res.status(500).json({ message: 'Failed to delete education' });
  }
});



// DELETE a specific work experience by index
app.delete('/api/profile/:userId/experience/:index', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.userId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const index = parseInt(req.params.index); // Convert index to number
    if (index < 0 || index >= profile.workExperience.length) {
      return res.status(400).json({ message: 'Invalid experience index' });
    }

    // Remove the experience at the specified index
    profile.workExperience.splice(index, 1);

    // Save the updated profile
    await profile.save();

    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error); // Log the error for debugging
    res.status(500).json({ message: 'Failed to delete experience' });
  }
});


// Routes
// app.use('/api/profiles', editProfile);
app.use('/api/profile', editProfile);

app.use('/api/profile', editHeadline);
app.use('/api/profile', getHeadline);  // Register the new GET route
app.use("/api", profileRoutes);
app.use('/api', editEducationRoutes); // Use profile routes
app.use('/api', editSkillRoutes );
app.use('/api/profile', editWorkExperienceTypeNo);
app.use('/api', editJobPreferenceRoutes);
app.use('/api/profiles', editCurrentProfile);
app.use('/api/resumes', resumeRoutes); // Prefix routes with /api/resumes
// app.use('/api/profiles', yesWorkExperienceRoutes);



app.use('/api/resumes', resumeRoutes); // Prefix routes with /api/resumes

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // This line uses the 'path' module











// Admin Profile Routes 
app.use('/api/adminProfile', adminRoutes);
app.use('/api', adminRoutes);

app.use('/api/adminProfile', adminHeadlineRoute);
// app.use('/api/adminprofile', companyInfoRoutes);
app.use('/api/adminProfile', companyInfoRoutes);

app.use('/api', experienceYes);  










// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });
  
  // Upload route
  app.post('/upload', upload.single('resume'), (req, res) => {
    const { file } = req;
    const newResume = new Resume({
      name: file.originalname,
      date: new Date().toLocaleDateString(),
      url: `/uploads/${file.filename}`,
    });
  
    newResume.save()
      .then(() => res.status(200).json(newResume))
      .catch(err => res.status(400).json(err));
  });
  
  // Get resumes route
  app.get('/resumes', (req, res) => {
    Resume.find()
      .then(resumes => res.json(resumes))
      .catch(err => res.status(400).json(err));
  });
  
  // Delete resume route
  app.delete('/resumes/:id', (req, res) => {
    Resume.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json({ message: 'Resume deleted' }))
      .catch(err => res.status(400).json(err));
  });


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));





