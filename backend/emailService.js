const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mgajevic1992@gmail.com', // tvoj gmail ili nalog sa kog šalješ mail
    pass: 'xyzqpflkdbebzrrw', // možeš koristiti App Password za Gmail
  }
});

function sendMail(subject, htmlContent, replyToEmail) {
  const mailOptions = {
    from: 'mgajevic1992@gmail.com', // tvoj nalog sa kog šalješ
    to: 'bozovic.denis@gmail.com', // Denisov mail koji prima
    replyTo: replyToEmail,           // korisnikov email za Reply
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
