// const mongoose = require('mongoose');

// const adminSchema = new mongoose.Schema({
  
//     name: String,
//     role: String,
//     email: String,
//     currentLocation: String,
//     currentSalary: String,
//     totalExperienceYears: Number,
//     availability: String,
//     profilePicture: String,
//     completion: Number,
//     coverImage: String, // Add cover image field
//     companySize: String, // Add company size field
//     contactNumber: String, // Add contact number field
//     languages: String ,// Add languages field\

//     headline: String // New field to store the headline
// });

// const Admin = mongoose.model('Admin', adminSchema);

// module.exports = Admin;






// const mongoose = require('mongoose');

// // Define the merged schema with fields from both Profile and Admin
// const adminSchema = new mongoose.Schema({
//   // Profile-related fields
//   organizationName: {
//     type: String,
//     required: true
//   },
//   phoneNumber: {
//     type: String,
//     required: true
//   },
//   founded: {
//     type: String,
//     required: true
//   },
//   industryType: {
//     type: String,
//     required: true
//   },
//   website: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   companySize: {
//     type: String,
//     required: true
//   },

//   // Admin-related fields
//   name: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   currentLocation: {
//     type: String
//   },
//   currentSalary: {
//     type: String
//   },
//   totalExperienceYears: {
//     type: Number
//   },
//   availability: {
//     type: String
//   },
//   profilePicture: {
//     type: String
//   },
//   completion: {
//     type: Number
//   },
//   coverImage: {
//     type: String
//   },
//   contactNumber: {
//     type: String
//   },
//   languages: {
//     type: String
//   },
  
//   // New fields for additional information
//   headline: {
//     type: [String]
//   }
// });

// // Create and export the Admin model
// const Admin = mongoose.model('Admin', adminSchema);

// module.exports = Admin;















// const mongoose = require('mongoose');

// // Define the merged schema with fields from both Profile and Admin
// const adminSchema = new mongoose.Schema({
//   // Profile-related fields
//   organizationName: {
//     type: String,
//     required: true
//   },
//   phoneNumber: {
//     type: String,
//     required: true
//   },
//   founded: {
//     type: String,
//     required: true
//   },
//   industryType: {
//     type: String,
//     required: true
//   },
//   website: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   companySize: {
//     type: String,
//     required: true
//   },

//   // Admin-related fields
//   name: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   currentLocation: {
//     type: String
//   },
//   currentSalary: {
//     type: String
//   },
//   totalExperienceYears: {
//     type: Number
//   },
//   availability: {
//     type: String
//   },
//   profilePicture: {
//     type: String
//   },
//   completion: {
//     type: Number
//   },
//   coverImage: {
//     type: String
//   },
//   contactNumber: {
//     type: String
//   },
//   languages: {
//     type: [String] // Store an array of strings for languages
//   },
  
//   headline: {
//     type: [String]
//   }
// });

// // Create and export the Admin model
// const Admin = mongoose.model('Admin', adminSchema);

// module.exports = Admin;














// models/adminModel.js
const mongoose = require('mongoose');

// Define the CompanyProfile schema
const companyProfileSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  industryType: { type: String, required: true },
  website: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  founded: { type: String, required: true },
  companySize: { type: String, required: true },
});

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  currentLocation: String,
  currentSalary: String,
  totalExperienceYears: Number,
  availability: String,
  profilePicture: String,
  completion: Number,
  coverImage: String, // Cover image field
  companySize: String, // Company size field
  contactNumber: String, // Contact number field
  languages: String, // Languages field
  headline: String, // New field to store the headline

  // Embed the CompanyProfile schema as a subdocument
  companyProfile: companyProfileSchema,
});

// Create models
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
