const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: Number, 
  personalize: String, 
  RemotePreferred: String, 
  City: String, 
  Amount: Number, 
  PrefferedPayPeriod: String, 
  jobList: Array,
  savedJobs: Array,
  appliedJobs: Array
});

const Candidate = mongoose.model('candidate', candidateSchema);

module.exports = Candidate;





// const mongoose = require('mongoose');

// const resumeSchema = new mongoose.Schema({
//   userId: String,
//   name: String,
//   url: String,
//   date: { type: Date, default: Date.now },
// });

// const currentProfileSchema = new mongoose.Schema({
//   currentIndustry: { type: String, required: true },
//   department: { type: String, required: true },
//   roleCategory: { type: String, required: true },
//   jobRole: { type: String, required: true },
//   jobType: {
//       permanent: { type: Boolean, default: false },
//       contractual: { type: Boolean, default: false }
//   },
//   employmentType: {
//       fullTime: { type: Boolean, default: false },
//       partTime: { type: Boolean, default: false }
//   },
//   preferredShift: { type: String, enum: ['day', 'night', 'flexible'], required: true },
//   preferredWorkLocation: { type: [String], default: [] },
//   expectedSalary: {
//       currency: { type: String, required: true },
//       amount: { type: Number, required: true }
//   }
// }, { timestamps: true });



// const workExperienceSchema = new mongoose.Schema({
//   currentEmployment: {
//     type: String,
//     enum: ['Yes', 'No'],
//     required: true,
//   },
//   employmentType: {
//     type: String,
//     enum: ['Full-time', 'Internship'],
//     required: true,
//   },
//   companyName: {
//     type: String,
//     required: true,
//   },
//   jobTitle: {
//     type: String,
//     required: true,
//   },
//   joiningYear: {
//     type: Number,
//     required: true,
//   },
//   joiningMonth: {
//     type: String,
//     enum: [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ],
//     required: true,
//   },
//   workedUntilYear: {
//     type: Number,
//   },
//   workedUntilMonth: {
//     type: String,
//     enum: [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ],
//   },
//   jobProfile: {
//     type: String,
//     required: true,
//   },
// }, { _id: false }); // Add this to disable the automatic _id for array elements


// // Define the Education schema
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

// // Define the JobPreference schema
// const jobPreferenceSchema = new mongoose.Schema({
//   jobRole: {
//     type: String,
//     required: true
//   },
//   employmentType: {
//     fullTime: {
//       type: Boolean,
//       required: true
//     },
//     partTime: {
//       type: Boolean,
//       required: true
//     }
//   },
//   preferredWorkLocation: {
//     type: [String],
//     required: true
//   },
//   selectedLocations: {
//     type: [String],
//     required: true
//   },
//   // expectedSalary: {
//   //   amount: {
//   //     type: Number,
//   //     required: true
//   //   }
//   // },
//   preferredShift: {
//     type: String,
//     required: true
//   },
//   remoteOptions: {
//     TemporarilyRemote: {
//       type: Boolean,
//       required: true
//     },
//     remote: {
//       type: Boolean,
//       required: true
//     },
//     hybrid: {
//       type: Boolean,
//       required: true
//     },
//     inperson: {
//       type: Boolean,
//       required: true
//     }
//   }
  
// });

// // Define the Profile schema
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
//   employmentType: {
//     fullTime: { type: Boolean, default: false },
//     partTime: { type: Boolean, default: false },
//   },
//   preferredShift: { type: String },
//   preferredWorkLocation: [{ type: String }],
//   expectedSalary: {
//     currency: { type: String },
//     amount: { type: Number },
//   },
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
//   // workExperiences: [workExperienceSchema], // Array of work experience objects
//   workExperiences: [workExperienceSchema], // Embedded work experience schema

//   jobPreferences: jobPreferenceSchema, // Embedded JobPreference schema
//   // candidate:[candidateSchema],
//   currentSchema:[currentProfileSchema],
//   Resume:[resumeSchema],
// }, 
// { timestamps: true });

// const Profile = mongoose.model('Profile', profileSchema);

// module.exports = Profile;


// Resume schema remains the same
const resumeSchema = new mongoose.Schema({
  userId: String,
  name: String,
  url: String,
  date: { type: Date, default: Date.now },
});

// Current profile schema remains the same
const currentProfileSchema = new mongoose.Schema({
  currentIndustry: { type: String, required: true },
  department: { type: String, required: true },
  roleCategory: { type: String, required: true },
  jobRole: { type: String, required: true },
  jobType: {
      permanent: { type: Boolean, default: false },
      contractual: { type: Boolean, default: false }
  },
  employmentType: {
      fullTime: { type: Boolean, default: false },
      partTime: { type: Boolean, default: false }
  },
  preferredShift: { type: String, enum: ['day', 'night', 'flexible'], required: true },
  preferredWorkLocation: { type: [String], default: [] },
  expectedSalary: {
      currency: { type: String, required: true },
      amount: { type: Number, required: true }
  }
}, { timestamps: true });

// Education schema remains the same
const educationSchema = new mongoose.Schema({
  education: { type: String, required: true },
  universityName: { type: String, required: true },
  courseName: { type: String, required: true },
  specialization: { type: String },
  courseType: { type: String, enum: ['fullTime', 'partTime', 'distance'], required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true },
  marks: { type: String },
  primary: { type: Boolean, default: false },
});

// Job preference schema remains the same
const jobPreferenceSchema = new mongoose.Schema({
  jobRole: {
    type: String,
    required: true
  },
  employmentType: {
    fullTime: {
      type: Boolean,
      required: true
    },
    partTime: {
      type: Boolean,
      required: true
    }
  },
  preferredWorkLocation: {
    type: [String],
    // required: true
  },
  selectedLocations: {
    type: [String],
    required: true
  },
  preferredShift: {
    type: String,
    required: true
  },
  remoteOptions: {
    TemporarilyRemote: {
      type: Boolean,
      required: true
    },
    remote: {
      type: Boolean,
      required: true
    },
    hybrid: {
      type: Boolean,
      required: true
    },
    inperson: {
      type: Boolean,
      required: true
    }
  }
});

// Define the Work Experience schema (as per the request)
const workExperienceSchema = new mongoose.Schema({
  currentEmployment: { type: String, required: true },
  employmentType: { type: String, required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  joiningDate: {
    year: { type: String, required: true },
    month: { type: String, required: true }
  },
  workedTill: {
    year: { type: String, required: true },
    month: { type: String, required: true }
  },
  jobProfile: { type: String, required: true },
}, { timestamps: true });

// Define the Profile schema (with the embedded schemas)
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalExperienceYears: { type: Number },
  totalExperienceMonths: { type: Number },
  joiningYear: { type: Number },
  joiningMonth: { type: String },
  currentSalary: { type: String },
  currentLocation: { type: String },
  city: { type: String },
  mobileNumber: { type: Number },
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
  },
  employmentType: {
    fullTime: { type: Boolean, default: false },
    partTime: { type: Boolean, default: false },
  },
  preferredShift: { type: String },
  preferredWorkLocation: [{ type: String }],
  expectedSalary: {
    currency: { type: String },
    amount: { type: Number },
  },
  gender: { type: String },
  maritalStatus: { type: String },
  dateOfBirth: {
    day: { type: String },
    month: { type: String },
    year: { type: String },
  },
  category: { type: String },
  differentlyAbled: { type: String },
  workPermitCountries: [{ type: String }],
  address: {
    permanent: { type: String },
    hometown: { type: String },
    pincode: { type: String },
  },
  education: [educationSchema], // Array of education objects
  jobPreferences: jobPreferenceSchema, // Embedded JobPreference schema
  currentProfile: [currentProfileSchema], // Array of current profile objects
  resume: [resumeSchema], // Array of resume objects
  workExperience: [workExperienceSchema], // Array of work experience objects
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
