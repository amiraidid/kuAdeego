import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config({path:'./.env'})


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendEMail = (email, name, message) => {
    const mailOptions = {
        to: process.env.EMAIL,
        email: email,
        name: name,
        message: message
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};

export {
    sendEMail
}