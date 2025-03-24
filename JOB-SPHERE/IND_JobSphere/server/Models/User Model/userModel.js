
// const mongoose = require('mongoose');


// const resumeSchema = new mongoose.Schema({
//   userId: String,
//   name: String,
//   url: String,
//   date: { type: Date, default: Date.now },
// });

// // Current profile schema
// const currentProfileSchema = new mongoose.Schema({
//   currentIndustry: { type: String, required: true },
//   department: { type: String, required: true },
//   roleCategory: { type: String, required: true },
//   jobRole: { type: String, required: true },
//   jobType: {
//       permanent: { type: Boolean, default: false },
//       contractual: { type: Boolean, default: false },
//   },
//   employmentType: {
//       fullTime: { type: Boolean, default: false },
//       partTime: { type: Boolean, default: false },
//   },
//   preferredShift: { type: String, enum: ['day', 'night', 'flexible'], required: true },
//   preferredWorkLocation: { type: [String], default: [] },
//   expectedSalary: {
//       currency: { type: String, required: true },
//       amount: { type: Number, required: true },
//   },
// }, { timestamps: true });

// // Education schema
// const educationSchema = new mongoose.Schema({
//   education: { type: String, required: true },
//   universityName: { type: String, required: true },
//   courseName: { type: String, required: true },
//   specialization: { type: String },
//   courseType: { type: String, enum: ['fullTime', 'partTime', 'distance'], required: true },
//   startYear: { type: Number, required: true },
//   endYear: { type: Number, required: true },
//   marks: { type: String },
//   primary: { type: Boolean, default: false },
// });

// // Work Experience schema
// const workExperienceSchema = new mongoose.Schema({
//   currentEmployment: { type: String, required: true },
//   employmentType: { type: String, required: true },
//   companyName: { type: String, required: true },
//   jobTitle: { type: String, required: true },
//   joiningDate: {
//     year: { type: String, required: true },
//     month: { type: String, required: true },
//   },
//   workedTill: {
//     year: { type: String, required: true },
//     month: { type: String, required: true },
//   },
//   jobProfile: { type: String, required: true },
// }, { timestamps: true });

// // Profile schema
// const profileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   totalExperienceYears: { type: Number },
//   totalExperienceMonths: { type: Number },
//   joiningYear: { type: Number },
//   joiningMonth: { type: String },
//   currentSalary: { type: String },
//   currentLocation: { type: String },
//   city: { type: String },
//   mobileNumber: { type: String },
//   email: { type: String },
//   availability: { type: String },
//   headline: { type: String },
//   currentIndustry: { type: String },
//   skills: [{ type: String }], // Array of skills
//   department: { type: String },
//   roleCategory: { type: String },
//   jobRole: { type: String },
//   jobType: {
//     permanent: { type: Boolean, default: false },
//     contractual: { type: Boolean, default: false },
//   },
//   name: { type: String, required: true },
//   employmentType: {
//     fullTime: { type: Boolean, default: false },
//     partTime: { type: Boolean, default: false },
//   },
//   expectedSalary: {
//     currency: { type: String },
//     amount: { type: Number },
//   },
//   preferredShift: { type: String },
//   remoteOptions: {
//     temporarilyRemote: { type: Boolean, default: false },
//     remote: { type: Boolean, default: false },
//     hybrid: { type: Boolean, default: false },
//     inPerson: { type: Boolean, default: false },
//   },
//   selectedLocations: [{ type: String }],
//   gender: { type: String },
//   maritalStatus: { type: String },
//   dateOfBirth: {
//     day: { type: String },
//     month: { type: String },
//     year: { type: String },
//   },
//   category: { type: String },
//   differentlyAbled: { type: String },
//   workPermitCountries: [{ type: String }],
//   address: {
//     permanent: { type: String },
//     hometown: { type: String },
//     pincode: { type: String },
//   },
//   education: [educationSchema], // Array of education objects
//   currentProfile: [currentProfileSchema], // Array of current profile objects
//   resume: [resumeSchema], // Array of resume objects
//   workExperience: [workExperienceSchema], // Array of work experience objects
// }, { timestamps: true });

// const Profile = mongoose.model('Profile', profileSchema);

// module.exports = Profile;























const mongoose = require('mongoose');



// Current profile schema
const currentProfileSchema = new mongoose.Schema({
  currentIndustry: { type: String, required: true },
  department: { type: String, required: true },
  roleCategory: { type: String, required: true },
  jobRole: { type: String, required: true },
  jobType: {
      permanent: { type: Boolean, default: false },
      contractual: { type: Boolean, default: false },
  },
  employmentType: {
      fullTime: { type: Boolean, default: false },
      partTime: { type: Boolean, default: false },
  },
  // preferredShift: { type: String, enum: ['day', 'night', 'flexible'], required: true },
  preferredWorkLocation: [[String]] ,
  expectedSalary: {
      currency: { type: String, required: true },
      amount: { type: Number, required: true },
  },
}, { timestamps: true });

// Education schema
const educationSchema = new mongoose.Schema({
  education: { type: String},
  universityName: { type: String },
  courseName: { type: String },
  specialization: { type: String },
  courseType: { type: String, enum: ['Full Time', 'Part Time', 'Distance Learning']},
  startYear: { type: Number },
  endYear: { type: Number },
  marks: { type: String },
  primary: { type: Boolean, default: false },




});

// Work Experience schema
const workExperienceSchema = new mongoose.Schema({
  // currentEmployment: { type: String, required: true },
  // employmentType: { type: String, required: true },
  // companyName: { type: String, required: true },
  // jobTitle: { type: String, required: true },
  // joiningYear: { type: String, required: true },
  // joiningMonth: { type: String, required: true },
  // workedUntilYear: { type: String, required: true },
  // workedUntilMonth: { type: String, required: true },
  // jobProfile: { type: String },

  // totalExperienceYears: { type: Number, required: true },
  // totalExperienceMonths: { type: Number, required: true },
  // currentSalary: { type: Number, required: true },
  // skills: { type: [String], required: true },
  // noticePeriod: { type: String, required: true },

  // currentEmployment: { type: String, required: true },
  // employmentType: { type: String, required: true },
  // companyName: { type: String, required: true },
  // jobTitle: { type: String, required: true },
  // joiningYear: { type: String, required: true },
  // joiningMonth: { type: String, required: true },
  // workedUntilYear: { type: String, required: true },
  // workedUntilMonth: { type: String, required: true },
  // totalExperienceYears: { type: Number, required: true },
  // totalExperienceMonths: { type: Number, required: true },
  // currentSalary: { type: Number, required: true },
  // jobProfile: { type: String, required: true },
  // skills: { type: [String], required: true },
  // noticePeriod: { type: String, required: true },


  currentEmployment: { type: String },
  employmentType: { type: String },
  companyName: { type: String },
  jobTitle: { type: String },
  joiningYear: { type: String },
  joiningMonth: { type: String },
  workedUntilYear: { type: String },
  workedUntilMonth: { type: String },
  totalExperienceYears: { type: Number },
  totalExperienceMonths: { type: Number },
  currentSalary: { type: Number },
  jobProfile: { type: String },
  skills: { type: [String] },
  noticePeriod: { type: String },



}, { timestamps: true });


// Profile schema
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalExperienceYears: { type: Number },
  totalExperienceMonths: { type: Number },
  joiningYear: { type: Number },
  appliedJobs: Array,
  savedJobs: Array,
  password: String,
  jobList: Array,
  joiningMonth: { type: String },
  currentSalary: { type: String },
  currentLocation: { type: String },
  city: { type: String },
  mobileNumber: { type: String },
  email: { type: String },
  availability: { type: String },
  headline: { type: String },
  currentIndustry: { type: String },
  skills: [{ type: String }], // Array of skills
  department: { type: String },
  roleCategory: { type: String },
  jobRole: { type: String },
  jobType: {
    permanent: { type: Boolean, default: false },
    contractual: { type: Boolean, default: false },
    fullTime: { type: Boolean, default: false },
    partTime: { type: Boolean, default: false },
  },
  name: { type: String, required: true },
  employmentType: {
    fullTime: { type: Boolean, default: false },
    partTime: { type: Boolean, default: false },
  },
  expectedSalary: {
    currency: { type: String },
    amount: { type: Number },
  },
  preferredShift: { type: String },
  preferredWorkLocation: { type: [[String]] },
  remoteOptions: {
    site: { type: Boolean, default: false },
    remote: { type: Boolean, default: false },
    hybrid: { type: Boolean, default: false },
    inPerson: { type: Boolean, default: false },
  }, // Added this block
  selectedLocations: [{ type: String }],
  gender: { type: String },
  maritalStatus: { type: String },
  bannerImageURL: String,
  picImageURL: String,
  dateOfBirth: {
    day: { type: String },
    month: { type: String },
    year: { type: String },
  },
  category: { type: String },
  differentlyAbled: { type: String },
  workPermitCountries: [{ type: String }],
  address: {

    permanent: { type: String}, 
    hometown: { type: String },      
    pincode: { type: String },    
    country: { type: String },    
    city: { type: String},       
  },
  education: [educationSchema], // Array of education objects
  currentProfile: [currentProfileSchema], // Array of current profile objects
  // resume: [resumeSchema], // Array of resume objects
  workExperience: [workExperienceSchema], // Array of work experience objects
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
