const nodeMailer = require("nodemailer");

const defaultEmailData = { from: "samhi2596@gmail.com" };

exports.sendEmail = emailData => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "samhi2596@gmail.com",
      pass: "rzidthawnhfwvymr"
    }
  });
  return transporter
    .sendMail(emailData)
    .then(info => console.log(`Message sent: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
};
