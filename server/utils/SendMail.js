import nodemailer from 'nodemailer';
const { createTransport } = nodemailer;
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);import dotenv from 'dotenv'
dotenv.config();

const sendMail = async (option)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || 587),
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    });

    const {email, subject, template, data} = option;
    // get the template path
    const templatePath =path.join(__dirname,'../mails',template);
    
    // Render the eamil.
    const html = await ejs.renderFile(templatePath, data);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
}

export default sendMail;