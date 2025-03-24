
// const express = require('express');
// const cors = require('cors');
// const path = require('path'); // Add this line to import the 'path' module
// const multer = require('multer');
// const Resume = require('./Models/User Model/userModel')

// const connectDB = require('./Config/db');
// const editProfile = require('./All Routes/Profile Form Routes/editProfileRoute');
// const editHeadline = require('./All Routes/Profile Form Routes/editHeadlineRoute');
// const getHeadline = require('./All Routes/Profile Form Routes/editHeadlineRoute');
// const profileRoutes = require('./All Routes/Profile Form Routes/editPersonalDetailsRoute');
// const editEducationRoutes = require('./All Routes/Profile Form Routes/editEducationDetailsRoute');
// const editSkillRoutes  = require('./All Routes/Profile Form Routes/editSkillRoute');
// const editWorkExperienceTypeNo=require('./All Routes/Profile Form Routes/Work Experience/workExperienceTypeNoRoute');
// const editJobPreferenceRoutes=require("./All Routes/Profile Form Routes/editJobPreferenceRoute")
// const Profile = require ('./Models/User Model/userModel');
// const editCurrentProfile = require('./All Routes/Profile Form Routes/editCurrentProfileRoute')
// const resumeRoutes = require('./All Routes/Profile Form Routes/resumeRoute'); // Import routes
// const job = require('./Models/Admin Models/Jobs')

// // Adimn Profile Routes
// const adminRoutes = require('./All Routes/Admin Profile Routes/adminProfileHeader');
// const adminHeadlineRoute = require('./All Routes/Admin Profile Routes/adminHeadlineRoutes')
// const companyInfoRoutes = require('./All Routes/Admin Profile Routes/AdminCompanyInfoRoute')
// const yesWorkExperienceRoutes = require('./All Routes/Profile Form Routes/Work Experience/workExperienceTypeYesRoute')

// const workExperiences = require('./Models/User Model/userModel')

// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to database
// connectDB();
// // app.get('/api/profile/:id',async (req,res)=>{
// //   console.log("profile",req.params)
// //   const profile = await workExperiences.findOne({_id:req.params.id})
// //   console.log(profile)
// //   res.json({data:profile.data})
// // })


// app.get('/api/jobs', async (req, res) => {
//   try {
//       const { jobType, experienceLevel, jobLocation, applicants ,Country} = req.query;
//       const filters = {};
//       if (jobType) filters.levels = { $in: jobType.split(",") };
//       if (experienceLevel) filters.levels = { $in: experienceLevel.split(",") };
//       if (jobLocation) filters.levels = { $in: jobLocation.split(",") };

    
//       if (applicants) {
//           const [minApplicants, maxApplicants] = applicants.split("-").map(Number);
//           if (!isNaN(minApplicants) && !isNaN(maxApplicants)) {
//               filters.applicants = { $gte: minApplicants, $lte: maxApplicants };
//           }
//       }

//       if (Country) {
//           filters.location = Country;
//       }

//       const jobData = await job.find(filters).lean();
//       res.json(jobData);

//   } catch (error) {
//       console.error('Error fetching job data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// // Routes
// // app.use('/api/profiles', editProfile);
// app.use('/api/profile', editProfile);

// app.use('/api/profile', editHeadline);
// app.use('/api/profile', getHeadline);  // Register the new GET route
// app.use("/api", profileRoutes);
// app.use('/api', editEducationRoutes); // Use profile routes
// app.use('/api', editSkillRoutes );
// app.use('/api/profile', editWorkExperienceTypeNo);
// app.use('/api', editJobPreferenceRoutes);
// app.use('/api/profiles', editCurrentProfile);
// app.use('/api/resumes', resumeRoutes); // Prefix routes with /api/resumes
// // app.use('/api/profiles', yesWorkExperienceRoutes);


// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     console.log("re",req.body)
//     const profile = await Profile.findOne({email });
//     if(profile){
//         res.json({ success: true , id:profile._id });
//     }else{
//         console.log(profile)
//         res.json({ success: false , error:"User does not exists" });
//     }
// });

// app.post('/register', async (req,res)=>{
//     const profile = await Profile.findOne({email:req.body.email})
//     if(profile){
//         res.json({ success: false  , error: "User Exists"});
//     }else{
//         Profile.create(req.body).then(response=>{
//             res.json({ success: true });
//         }).catch(err =>{
//             console.log(err);
//         })
//     }
// })


// app.use('/api/resumes', resumeRoutes); // Prefix routes with /api/resumes

// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // This line uses the 'path' module











// // Admin Profile Routes 
// app.use('/api/adminProfile', adminRoutes);
// app.use('/api', adminRoutes);

// app.use('/api/adminProfile', adminHeadlineRoute);
// // app.use('/api/adminprofile', companyInfoRoutes);
// app.use('/api/adminProfile', companyInfoRoutes);












// // Multer configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './uploads');
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname));
//     },
//   });
  
//   const upload = multer({ storage });
  
//   // Upload route
//   app.post('/upload', upload.single('resume'), (req, res) => {
//     const { file } = req;
//     const newResume = new Resume({
//       name: file.originalname,
//       date: new Date().toLocaleDateString(),
//       url: `/uploads/${file.filename}`,
//     });
  
//     newResume.save()
//       .then(() => res.status(200).json(newResume))
//       .catch(err => res.status(400).json(err));
//   });
  
//   // Get resumes route
//   app.get('/resumes', (req, res) => {
//     Resume.find()
//       .then(resumes => res.json(resumes))
//       .catch(err => res.status(400).json(err));
//   });
  
//   // Delete resume route
//   app.delete('/resumes/:id', (req, res) => {
//     Resume.findByIdAndDelete(req.params.id)
//       .then(() => res.status(200).json({ message: 'Resume deleted' }))
//       .catch(err => res.status(400).json(err));
//   });





// app.get('/jobs/:jobId', async (req, res) => {
//     try {
//         const jobId = req.params.jobId;

//         if (!mongoose.Types.ObjectId.isValid(jobId)) {
//             return res.status(400).send("Invalid Job ID");
//         }

//         const Job = await job.findOne({ _id: jobId });
        
//         if (Job) {
//             res.json(Job);
//         } else {
//             console.log("Job not found");
//             res.status(404).send("Job not found");
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//     }
// });
// app.get('/api/jobs/distinct', async (req, res) => {
//   try {
//     const excludeId = req.query.exclude;
//     const jobs = await job.find({ _id: { $ne: (excludeId) } }).limit(2);
//     res.json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: 'An error occurred', error: error.message });
//   }
// });



// app.post('/api/applyJob', async (req, res) => {
//     try {
//       const { jobId  , userId } = req.body;
      
//       const profile = await Profile.findOne({_id:userId});

//       if(profile){
//         profile.appliedJobs.push(jobId);
//         profile.save()
//       }else{
//         console.log("User does not exist")
//       }
  
//       res.status(200).json({ message: 'Job application successful' });
//     } catch (error) {
//       console.error('Error applying for job:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });





// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server running on port ${port}`));
