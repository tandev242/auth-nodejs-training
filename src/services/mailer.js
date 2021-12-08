const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "laptrinhwebcungtandz@gmail.com", //email ID
        pass: "tan240600", //Password
    },
});


exports.sendOtpCodeToMail = async (otp, email) => {
    const details = {
        from: "Tan Dev 2k", // sender address same as above
        to: email, // Receiver's email id
        subject: "Mã OTP có hiệu lực trong 1 phút, OTP của bạn là: ", // Subject of the mail.
        html: `<h1> ${otp} </h1>`, // Sending OTP
    };
    await transporter.sendMail(details);
}