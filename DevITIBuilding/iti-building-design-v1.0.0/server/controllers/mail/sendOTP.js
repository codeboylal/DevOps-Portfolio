const { sendEmail } = require("../../utils/emailService");
const ResponseHandler = require("../../utils/responseHandler");
const User = require("../../Models/Sign In Up/SignIn/signInModel.js"); // Import your User model
const moment = require("moment"); // For handling OTP expiry time

// Function to generate a random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Helper function to send OTP email
const sendOtpEmail = async (email, otp) => {
  try {
    await sendEmail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

// Controller function to send OTP
const sendOTP = async (req, res) => {
  const { email } = req.body;

  // Step 1: Check if email is provided
  if (!email) {
    return res
      .status(400)
      .json(ResponseHandler(400, null, "Email is required"));
  }

  try {
    // Step 2: Check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    // Step 3: Generate a random OTP and set its expiry time to 10 minutes
    const otp = generateOTP();
    const expiryTime = moment().add(10, "minutes").toDate();

    if (!existingUser) {
      return res
        .status(404)
        .json(ResponseHandler(404, null, `${email} is not registered`));
    }

    if (existingUser.accountStatus === "mail not verified") {
      if (
        existingUser.otp &&
        moment().isBefore(moment(existingUser.otp.expiryTime))
      ) {
        // If OTP is not expired, resend the existing OTP
        await sendOtpEmail(email, existingUser.otp.code);
      } else {
        // If OTP is expired, send a new OTP
        await sendOtpEmail(email, otp);
        existingUser.otp = { code: otp, expiryTime };
        await existingUser.save();
      }
      return res
        .status(200)
        .json(ResponseHandler(200, null, `OTP sent to ${email}`));
    }

    if (existingUser.accountStatus === "verified") {
      return res
        .status(200)
        .json(ResponseHandler(201, null, "User Already exists"));
    }
  } catch (error) {
    console.error("Error processing OTP request:", error);
    return res
      .status(500)
      .json(
        ResponseHandler(
          500,
          null,
          "An error occurred while processing your request"
        )
      );
  }
};

module.exports = sendOTP;
