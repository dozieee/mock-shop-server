//
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// send email api
function sendEmail(data) {
  return new Promise((resolve, reject) => {
    const { subject, to, text } = data;
    var smtpConfig = {
      service: 'Gmail',
      host: 'smtp.gmail.com',
      post: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    };
    // email object
    var email = {
      from: `"AppiPlace" ${process.env.EMAIL}`,
      bcc: to,
      subject: subject,
      text: 'FROM AppiPlace NOTIFICATION SERVICE',
      html: text,
      cc: '*******',
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    transporter.sendMail(email, function (error, info) {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }
      resolve(email);
    });
  });
}

export function sendNotification(message, callback = () => {}) {
   const { event, data } = message;
   switch (event) {
      case "EVENT_REGISTRATION":
         (() => {
            const { email } = data;
            const emailData = { subject: 'Event Registration', to: email, text: '<h1>Template to be added here</h1>' };
            sendEmail(emailData);
            callback(null, true);
         })()
         break;

      case "USER_SIGIN":
         (() => {
            const { email } = data;
            const emailData = { subject: 'Login Action', to: email, text: '<h1>Template to be added here</h1>' };
            sendEmail(emailData);
            callback(null, true);
         })()
         break;

      default:
         console.log('Not a registered event');
         callback(null, false);
         break;
   }
}