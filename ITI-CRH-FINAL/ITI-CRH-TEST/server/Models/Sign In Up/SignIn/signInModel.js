const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { type } = require("os");

const inboxSchema = new mongoose.Schema({
  projectNumber: { type: String, default: "" },
  address: {type: String, default: ""},
  email: { type: String, default: "" },
  task: { type: String, default: "" },
  dueDate: { type: String, default: "" },
  taskId: { type: String, default: "" },
  stageId: { type: String, default: "" },
  parentId: { type: String, default: "" },
  SubTaskId: { type: String, default: "" },
  subtask: {type: Object, default: {}},
  completedStatus: { type: Boolean, default: false },
  likeStatus: { type: Boolean, default: false },
});

const accessSchema = new mongoose.Schema({
  label: { type: String, default: "" },
  value: { type: Boolean, default: false },
});

const paymentSchema = new mongoose.Schema({
  label: { type: String, default: "" },
  value: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  email: { type: String },
  userImg: { type: String, default: "" },
  name: { type: String },
  password: { type: String },
  accountType: { type: String, default: "individual" },
  accountTypeId: { type: String, default: "1" },
  discount: { type: String, default: "0%" },
  role: {
    type: String,
    enum: [
      "individual",
      "companyAdmin",
      "companyStaff",
      "companyContractors",
      "ITI",
    ],
    default: "individual",
  }, // Role-based access
  access: {
    type: [accessSchema],
    default: [],
  },
  payment: {
    type: [paymentSchema],
    default: [],
  },
  likedPlans: { type: Array, default: [] },
  likedProjects: { type: Array, default: [] },
  notifications: { type: Array, default: [] },
  accountStatus: {
    type: String,
    enum: [
      "not verified",
      "verified",
      "locked",
      "unlocked",
      "deleted",
      "mail not verified",
    ],
    default: "mail not verified",
  }, //Not verified and verified are for OTP verification
  otp: {
    code: { type: String },
    expiryTime: { type: Date },
  },
  resetPasswordLink: {
    token: { type: String },
    expiresAt: { type: Date },
  },
  inbox: { type: [inboxSchema], default: [] },
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
