const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("./config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

const sendEmail = (toEmail, emailSubject, emailText, ccEmail) => {
  const mailOptions = {
    from: EMAIL,
    to: toEmail,
    cc: [ccEmail],
    subject: emailSubject,
    html: emailText,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = sendEmail;
