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

const ForgetPassMail = async (name, email, content) => {
    console.log(process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_MAIL);

    var mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email, 
        subject: 'Contact Us Email',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <label>
            Hi ${name}, 
                    This is forget password mail! Click the link to complete the process
                </label>
                ${content}
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
    ForgetPassMail
}


