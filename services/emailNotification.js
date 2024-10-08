// services/emailNotification.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// إعداد الناقل (transporter) لإرسال البريد الإلكتروني
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// وظيفة لإرسال بريد إلكتروني
const sendEmailNotification = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmailNotification;