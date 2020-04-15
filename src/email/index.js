require("dotenv").config();
const nodemailer = require('nodemailer')

async function sendEmail({ id, from = process.env.EMAIL_FROM, to, subject, html, text = '' }) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        name: process.env.APP_URL,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: (process.env.EMAIL_SECURE === 'false') ? false : true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASS // generated ethereal password
        },
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html
    }, function (error, info) {

        if (error) {
            console.log(error)
        } else {
            console.log(info)
        }

    })

}

module.exports = {
    sendEmail
}