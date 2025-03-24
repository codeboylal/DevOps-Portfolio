const { sendEmail } = require("../../utils/emailService");
const ResponseHandler = require("../../utils/responseHandler");
const users = require('../../Models/Sign In Up/SignIn/signInModel.js');
const moment = require("moment");
const crypto = require("crypto");

let setMailToAdmin = false
let adminMail = ''
const sendResLink = async (req, res) => {
  const  email  = req.body.email;
  const Client_URL = req.body.Client_URL;

  if (!email) {
    return res.status(200).json(ResponseHandler(400, null, "Email is required"));
  }

  const adminReq = req.body.adminRequest;

  // console.log(adminReq)
  if(adminReq){
    const profile = await users.findOne({_id: req.body.adminId})
    if(!profile){
      return res.status(200).json(ResponseHandler(404, null, "Admin profile not found"));
    }else{
      if(profile?.role === "ITI" || profile?.role === "companyAdmin"){
        setMailToAdmin = true
        adminMail = profile?.email
      }else{
        return res.status(200).json(ResponseHandler(403, null, "Permission Denied"));
      }
    }
  }

  try {
    // Check if the user exists in the database
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(200).json(ResponseHandler(404, null, "Email does not exist in our records"));
    }

    // Check if reset token exists and if it is expired
    const resetTokenData = user.resetPasswordLink;
    let resetToken, resetPasswordLink, expirationTime;

    if (resetTokenData && new Date(resetTokenData.expiresAt) > new Date()) {
      // Token is not expired, reuse the same token
      resetToken = resetTokenData.token;
      resetPasswordLink = `${Client_URL}/resetPass?token=${resetToken}&email=${encodeURIComponent(email)}`;
      expirationTime = moment(resetTokenData.expiresAt);
    } else {
      // Generate a new token and reset link if expired or not present
      resetToken = crypto.randomBytes(32).toString("hex");
      resetPasswordLink = `${Client_URL}/resetPass?token=${resetToken}&email=${encodeURIComponent(email)}`;
      expirationTime = moment().add(1, "hour"); // Link expires in 1 hour

      // Update the user's reset link information
      user.resetPasswordLink = {
        token: resetToken,
        expiresAt: expirationTime.toISOString(),
      };
      await user.save();
    }

    // Send the reset password email
    await sendEmail({
      to: setMailToAdmin ? adminMail : email,
      subject: "Reset Password Link",
      text: `Click the link to reset your password: ${resetPasswordLink}`,
      html: `
        <p>Click the link to reset your password:</p>
        <a href="${resetPasswordLink}">${resetPasswordLink}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    res.status(200).json(
      ResponseHandler(200, null, `Reset Password Link sent to ${setMailToAdmin ? adminMail : email}`)
    );
  } catch (error) {
    console.error("Error sending reset link email:", error);
    res.status(500).json(
      ResponseHandler(500, null, "Failed to send reset password email")
    );
  }
};

module.exports = sendResLink;
