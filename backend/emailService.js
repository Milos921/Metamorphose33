const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mgajevic1992@gmail.com',
    pass: 'xyzqpflkdbebzrrw',
  }
});

function sendMail(subject, htmlContent, replyToEmail) {
  const mailOptions = {
    from: 'mgajevic1992@gmail.com',
    to: 'bozovic.denis@gmail.com',
    replyTo: replyToEmail,
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
