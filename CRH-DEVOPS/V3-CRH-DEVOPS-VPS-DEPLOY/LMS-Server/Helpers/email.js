const { error } = require("console");
const nodemailer =  require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    tls: {
        rejectUnauthorized: false,  
    },
    auth:{
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendMail = async (name, email, query, suggestion , userId) => {
    var mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email, 
        subject: 'Contact Us Email',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h2 style="color: #4CAF50;">${name} with user ID ${userId} has contacted you!</h2>
                <p>Below is the ${query} he sent you:</p>
                <p style="background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    ${suggestion}
                </p>
            </div>
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent:", info.messageId);
    });
}

module.exports={
    sendMail
}


// `
//     <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
//         <h2 style="color: #4CAF50;">${name} has contacted you,!</h2>
//         <p>We have received your message and will get back to you as soon as possible. Below is the message you sent us:</p>
//         <p style="background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
//             ${content}
//         </p>
{/* <p style="background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
Suggestion: ${content}
</p> */}
//         <br/>
//         <p style="font-size: 12px; color: #999;">Best regards,<br/>The Support Team</p>
//     </div>
// `