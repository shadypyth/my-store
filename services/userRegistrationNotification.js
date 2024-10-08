// services/userRegistrationNotification.js
const sendEmailNotification = require('./emailNotification');

// وظيفة لإرسال إشعار بالبريد الإلكتروني عند تسجيل مستخدم جديد
const sendWelcomeEmail = async (userEmail, userName) => {
  const subject = 'مرحباً بكم في متجرنا الإلكتروني!';
  const text = `مرحباً ${userName},\n\nشكراً لانضمامك إلى متجرنا الإلكتروني. نحن سعداء بوجودك معنا ونتمنى لك تجربة تسوق رائعة.`;

  try {
    await sendEmailNotification(userEmail, subject, text);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

module.exports = sendWelcomeEmail;