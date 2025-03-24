// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false,
//     tls: {
//         rejectUnauthorized: false,  
//     },
//     auth:{
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

// /**
//  * Send an email using Nodemailer
//  * @param {string} to - Recipient email address
//  * @param {string} subject - Email subject
//  * @param {string} text - Plain text content of the email
//  * @param {string} html - HTML content of the email (optional)
//  * @returns {Promise} - Resolves if email is sent successfully, otherwise rejects
//  */
// const sendEmail = async ({ to, subject, text, html }) => {
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to,
//     subject,
//     text,
//     html,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return { success: true };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email");
//   }
// };

// module.exports = { sendEmail };

const AWS = require("aws-sdk");

// Configure AWS SES
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  // region: process.env.AWS_REGION || "us-east-1",
  region: "us-east-1",
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

/**
 * Send an email using Amazon SES without Nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content of the email
 * @param {string} html - HTML content of the email (optional)
 * @returns {Promise} - Resolves if email is sent successfully, otherwise rejects
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const params = {
    Source: process.env.SENDER_EMAIL, // Must be a verified email in SES
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject },
      Body: {
        Text: text ? { Data: text } : undefined,
        Html: html ? { Data: html } : undefined,
      },
    },
  };

  try {
    const response = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", response);
    return { success: true, messageId: response.MessageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };
