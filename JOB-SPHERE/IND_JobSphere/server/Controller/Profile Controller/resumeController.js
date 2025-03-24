
// const resumeSchema = require('../../Models/User Model/resumeDataModel');
// const upload = require('../../Middleware/multerMiddleware');
// const path = require('path'); 
// const fs = require('fs');


// const uploadResume = async (req, res) => {
//   try {
//     // Ensure a file was uploaded
//     if (!req.file) {
//       return res.status(400).send({ status: "error", message: "No file uploaded" });
//     }

//     // Extract the file details from req.file
//     const { filename, path, mimetype, size } = req.file;

//     // Get the email from the request body
//     const email = req.body.email;

//     console.log(`Attempting to upload resume for email: ${email}`);

//     // Check if there's an existing resume for this user
//     const existingResume = await resumeSchema.findOne({ email: email });

//     if (existingResume) {
//       console.log(`Existing resume found: ${existingResume.filename} at ${existingResume.path}`);

//       // Delete the previous resume from the server storage
//       const existingFilePath = existingResume.path;
//       if (fs.existsSync(existingFilePath)) {
//         fs.unlinkSync(existingFilePath); // Delete the file from the server
//         console.log(`Deleted existing resume file from path: ${existingFilePath}`);
//       } else {
//         console.log(`File not found at path: ${existingFilePath}`);
//       }

//       // Delete the previous resume entry from the database
//       const deleted = await resumeSchema.findByEmailAndDelete(existingResume._id);
//       if (deleted) {
//         console.log(`Deleted resume entry from database with ID: ${existingResume._id}`);
//       } else {
//         console.log(`Failed to delete resume entry from database`);
//       }
//     } else {
//       console.log(`No existing resume found for email: ${email}`);
//     }

//     // Save the new resume details and email to the database
//     await resumeSchema.create({
//       filename: filename,
//       path: path,
//       mimetype: mimetype,
//       size: size,
//       email: email,
//     });

//     console.log('New resume uploaded successfully!');
//     res.send({ status: "ok", message: "Resume uploaded successfully!" });
//   } catch (error) {
//     console.error("Error uploading resume:", error);
//     res.status(500).json({ status: "error", message: error.message });
//   }
// };



// const getResumes = async (req, res) => {
//   try {
//     const userEmail = req.params.email;
//     const resumes = await resumeSchema.find({ email: userEmail }); // Find resumes by email
//     res.json({ resumes });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching resumes', error });
//   }
// };




// // Function to delete a resume by its ID
// const deleteResume = async (req, res) => {
//   try {
//     const resumeId = req.params.id;
//     await resumeSchema.findByIdAndDelete(resumeId); // Delete the resume by its ID
//     res.send({ status: "ok", message: "Resume deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting resume:", error);
//     res.status(500).json({ status: "error", message: "Failed to delete resume" });
//   }
// };



// const downloadResume = async (req, res) => {
//   try {
//     const resumeId = req.params.id;
//     const resume = await resumeSchema.findById(resumeId);

//     if (!resume) {
//       return res.status(404).send('Resume not found');
//     }

//     const filePath = path.resolve(resume.path); // Resolve the file path

//     // Check if the file exists
//     if (fs.existsSync(filePath)) {
//       res.download(filePath, resume.filename); // Trigger file download
//     } else {
//       return res.status(404).send('File not found on server');
//     }
//   } catch (error) {
//     console.error('Error in downloadResume:', error); // Log the error
//     res.status(500).json({ message: 'Error downloading resume', error });
//   }
// };



// module.exports = {
//   uploadResume,
//   getResumes,
//   deleteResume,
//   downloadResume,
// };

























// const resumeSchema = require('../../Models/User Model/resumeDataModel');
// const upload = require('../../Middleware/multerMiddleware');
// const path = require('path'); 
// const fs = require('fs');
// const moment = require('moment')

// // const uploadResume = async (req, res) => {
// //   try {
// //     // Ensure a file was uploaded
// //     if (!req.file) {
// //       return res.status(400).send({ status: "error", message: "No file uploaded" });
// //     }

// //     // Extract the file details from req.file
// //     const { filename, path, mimetype, size } = req.file;

// //     // Get the email from the request body
// //     const email = req.body.email;

// //     // Check if a resume already exists for this user and update it
// //     const existingResume = await resumeSchema.findOneAndUpdate(
// //       { email }, // Search by email
// //       { filename, path, mimetype, size, uploadDate: new Date() }, // Update the details
// //       { new: true, upsert: true } // Create new if not found (upsert)
// //     );

// //     res.send({ status: "ok", message: existingResume ? "Resume updated successfully!" : "Resume uploaded successfully!" });
// //   } catch (error) {
// //     console.error("Error uploading resume:", error);
// //     res.status(500).json({ status: "error", message: error.message });
// //   }
// // };

// const uploadResume = async (req, res) => {
//   try {
//     // Ensure a file was uploaded
//     if (!req.file) {
//       return res.status(400).send({ status: "error", message: "No file uploaded" });
//     }

//     // Get the email and name from the request body
//     const email = req.body.email;
//     const name = req.body.name;  // Get the user's name

//     console.log('Received Name:', name);  // Check if name is being received properly
//     console.log('File Info:', req.file);  // Check the uploaded file information

//     // Set the file path directly as it's already passed with the new filename
//     const newPath = `uploads/resumes/${req.file.filename}`;

//     // Check if a resume already exists for this user and update it
//     const existingResume = await resumeSchema.findOneAndUpdate(
//       { email }, // Search by email
//       { filename: req.file.filename, path: newPath, mimetype: req.file.mimetype, size: req.file.size, uploadDate: new Date() }, // Update the details
//       { new: true, upsert: true } // Create new if not found (upsert)
//     );

//     res.send({ status: "ok", message: existingResume ? "Resume updated successfully!" : "Resume uploaded successfully!" });
//   } catch (error) {
//     console.error("Error uploading resume:", error);
//     res.status(500).json({ status: "error", message: error.message });
//   }
// };





// const getResumes = async (req, res) => {
//   try {
//     const userEmail = req.params.email;
//     const resumes = await resumeSchema.find({ email: userEmail }); // Find resumes by email
//     res.json({ resumes });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching resumes', error });
//   }
// };

// // Function to delete a resume by its ID
// const deleteResume = async (req, res) => {
//   try {
//     const resumeId = req.params.id;
//     await resumeSchema.findByIdAndDelete(resumeId); // Delete the resume by its ID
//     res.send({ status: "ok", message: "Resume deleted successfully!" });
//   } catch (error) {
//     console.error("Error deleting resume:", error);
//     res.status(500).json({ status: "error", message: "Failed to delete resume" });
//   }
// };

// const downloadResume = async (req, res) => {
//   try {
//     const resumeId = req.params.id;
//     const resume = await resumeSchema.findById(resumeId);

//     if (!resume) {
//       return res.status(404).send('Resume not found');
//     }

//     const filePath = path.resolve(resume.path); // Resolve the file path

//     // Check if the file exists
//     if (fs.existsSync(filePath)) {
//       res.download(filePath, resume.filename); // Trigger file download
//     } else {
//       return res.status(404).send('File not found on server');
//     }
//   } catch (error) {
//     console.error('Error in downloadResume:', error);
//     res.status(500).json({ message: 'Error downloading resume', error });
//   }
// };



// module.exports = {
//   uploadResume,
//   getResumes,
//   deleteResume,
//   downloadResume,
// };




























const resumeSchema = require('../../Models/User Model/resumeDataModel');
const upload = require('../../Middleware/multerMiddleware');
const path = require('path'); 
const fs = require('fs');
const moment = require('moment')

// const uploadResume = async (req, res) => {
//   try {
//     // Ensure a file was uploaded
//     if (!req.file) {
//       return res.status(400).send({ status: "error", message: "No file uploaded" });
//     }

//     // Extract the file details from req.file
//     const { filename, path, mimetype, size } = req.file;

//     // Get the email from the request body
//     const email = req.body.email;

//     // Check if a resume already exists for this user and update it
//     const existingResume = await resumeSchema.findOneAndUpdate(
//       { email }, // Search by email
//       { filename, path, mimetype, size, uploadDate: new Date() }, // Update the details
//       { new: true, upsert: true } // Create new if not found (upsert)
//     );

//     res.send({ status: "ok", message: existingResume ? "Resume updated successfully!" : "Resume uploaded successfully!" });
//   } catch (error) {
//     console.error("Error uploading resume:", error);
//     res.status(500).json({ status: "error", message: error.message });
//   }
// };

const uploadResume = async (req, res) => {
  try {
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    // Get the email and name from the request body
    const email = req.body.email;
    const name = req.body.name; // Get the user's name from the payload

    // console.log('Received Name:', name); // Debug: Check if name is being received

    // Set the file path with the correct filename
    const newPath = `uploads/resumes/${req.file.filename}`;

    // Check if a resume already exists for this user and update it
    const existingResume = await resumeSchema.findOneAndUpdate(
      { email }, // Search by email
      { filename: req.file.filename, path: newPath, mimetype: req.file.mimetype, size: req.file.size, uploadDate: new Date() }, // Update details
      { new: true, upsert: true } // Create new if not found (upsert)
    );

    res.send({ status: "ok", message: existingResume ? "Resume updated successfully!" : "Resume uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading resume:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};







const getResumes = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const resumes = await resumeSchema.find({ email: userEmail }); // Find resumes by email
    res.json({ resumes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error });
  }
};

// Function to delete a resume by its ID
const deleteResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    await resumeSchema.findByIdAndDelete(resumeId); // Delete the resume by its ID
    res.send({ status: "ok", message: "Resume deleted successfully!" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ status: "error", message: "Failed to delete resume" });
  }
};

const downloadResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const resume = await resumeSchema.findById(resumeId);

    if (!resume) {
      return res.status(404).send('Resume not found');
    }

    // Path to the resumes directory
    const filePath = path.resolve(__dirname, '../../uploads', resume.filename); // Adjust path to your uploads folder

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      res.download(filePath, resume.filename); // Trigger file download
    } else {
      return res.status(404).send('File not found on server');
    }
  } catch (error) {
    console.error('Error in downloadResume:', error);
    res.status(500).json({ message: 'Error downloading resume', error });
  }
};




module.exports = {
  uploadResume,
  getResumes,
  deleteResume,
  downloadResume,
};
