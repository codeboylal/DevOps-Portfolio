const User = require("../../Models/Sign In Up/SignIn/signInModel.js");
const ResponseHandler = require("../../utils/responseHandler.js");
const bcrypt = require("bcrypt");
const moment = require("moment");

const registerUser = async (req, res) => {
  try {
    const { email, firstName, lastName, password, otp } = req.body;
    const name = `${firstName} ${lastName}`;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.accountStatus === "mail not verified") {
        if (otp && existingUser.otp?.code === otp) {
          const currentTime = moment();
          const expiryTime = moment(existingUser.otp.expiryTime);

          if (currentTime.isAfter(expiryTime)) {
            return res.status(200).json(ResponseHandler(203, {}, "OTP has expired. Please request a new one."));
          }

          existingUser.accountStatus = "not verified";
          await existingUser.save();

          return res.status(200).json(ResponseHandler(201, { email, name }, "User registration successful"));
        }else{
          return res.status(200).json(ResponseHandler(400, null, "Incorrect OTP"));
        }
      }
      return res.status(200).json(ResponseHandler(202, null, "User Already Exists"));
    }

    // Register new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      accountStatus: "mail not verified",
      access: [
        { label: "Display Center", value: false },
        { label: "Sales", value: false },
        { label: "Chat", value: false },
        { label: "Pre-Construction", value: false },
        { label: "Construction", value: false }
      ],
      payment: [
        { label: "Company", value: false },
        { label: "Individual", value: false }
      ]
    });

    await newUser.save();
    return res.status(200).json(ResponseHandler(200, null, "Verify OTP"));
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json(ResponseHandler(500, null, "Internal Server Error"));
  }
};

module.exports = registerUser;
