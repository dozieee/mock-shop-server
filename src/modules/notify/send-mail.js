//
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import path from 'path';

dotenv.config();


const EVENT_REGISTRATION = 'EVENT_REGISTRATION'
const USER_SIGIN = 'USER_SIGIN'
const USER_CREATION = 'USER_CREATION'

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
      console.log("Email sent")
      resolve(email);
    });
  });
}

export function sendNotification(message, callback = () => {}) {
   const { event, data } = message;
   switch (event) {
      case EVENT_REGISTRATION:
         (() => {
           console.log("Mail block == > ",data)
            const { email, email2, name, event: { id, event_name, description, category, paid, venue, date, ticket_name, ticket_price, ticket_count } } = data;
            let emailData = { subject: 'Event Registration', to: email, text: getNotifyTemplate(event)({name, id, event_name, description, category, paid, venue, date, ticket_name, ticket_price, ticket_count}) };
            sendEmail(emailData);
            emailData = { subject: 'Event Registration', to: email2, text: getNotifyTemplate('EVENT_REGISTRATION_CREATOR')({id, event_name, ticket_name, ticket_price, ticket_count, paid}) };
            sendEmail(emailData);
            callback(null, true);
         })()
         break;

      case USER_SIGIN:
         (() => {
            //  TODO: add device info
            const { email, name } = data;
            const emailData = { subject: 'Login Action', to: email, text: getNotifyTemplate(event)({ email, name }) };
            sendEmail(emailData);
            callback(null, true);
         })()
         break;

      case USER_CREATION:
         (() => {
            const { email, name } = data;
            const emailData = { subject: 'Login Action', to: email, text: getNotifyTemplate(event)({ name, email }) };
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



/**
* getNotifyTemplate: MailTemplate
*/
function getNotifyTemplate(event) {
    // wait-list
    const user_sigin_html = readFileSync(path.resolve(__dirname, '..', '..', '..', 'template', `${USER_SIGIN}.html`), 'utf8');
    const user_creation_html = readFileSync(path.resolve(__dirname, '..', '..', '..', 'template', `${USER_CREATION}.html`), 'utf8');
    const event_reg = readFileSync(path.resolve(__dirname, '..', '..', '..', 'template', `${EVENT_REGISTRATION}.html`), 'utf8');
    // Configure
    const notifyTemplate = {
       [USER_SIGIN]: compile(user_sigin_html),
       [USER_CREATION]: compile(user_creation_html),
       [EVENT_REGISTRATION]: compile(event_reg)
    };
  return notifyTemplate[event];
}
