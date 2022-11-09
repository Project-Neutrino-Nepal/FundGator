const sgMail = require("@sendgrid/mail");
const SENDGRID_API = process.env.SENDGRID_API;
const HOST_EMAIL = process.env.APP_HOST_EMAIL;

sgMail.setApiKey(SENDGRID_API);

const sendMail = async (email, subject, text, html) => {
  try {
    const msg = {
      html,
      text,
      subject,
      to: email,
      from: HOST_EMAIL,
    };
    console.log(msg);
    await sgMail.send(msg);
    console.log("MAIL_SENT");
  } catch (err) {
    console.log("ERROR_MAILING", err.message);
  } finally {
    return;
  }
};

module.exports =  sendMail;
