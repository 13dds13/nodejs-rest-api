const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fromEmail = process.env.SENDGRID_VERIFIED_EMAIL;
const port = process.env.PORT;

const createMsg = (email, verificationToken) => ({
  to: email,
  from: fromEmail,
  subject: "Please verify your email",
  text: `Follow this link for Your verification: http://localhost:${port}/api/users/verify/${verificationToken}`,
});

const sendVerifyLetter = async (msg) => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = {
  createMsg,
  sendVerifyLetter,
};
