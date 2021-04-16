const nodeMailer = require("nodemailer");
const defaultEmailData = { from: "scara22@gmail.com" };

exports.send_Email_func = emailData => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "scara22@gmail.com",
      pass: "qwertyuiop"
    }
  });
  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
};
