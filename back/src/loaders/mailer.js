const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS
    }
})

function sendMail(email, subject, body) {
    transporter.sendMail({
        from: process.env.NODEMAILER_FROM,
        to: email,
        subject: subject,
        html: body
    })
}

module.exports = { sendMail }