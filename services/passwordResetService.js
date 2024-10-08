// services/passwordResetService.js
const sendEmailNotification = require('./emailNotification');
const crypto = require('crypto');

// وظيفة لإنشاء رمز إعادة تعيين كلمة المرور
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// وظيفة لإرسال بريد إلكتروني لإعادة تعيين كلمة المرور
const sendPasswordResetEmail = async (userEmail, resetToken) => {
  const subject = 'إعادة تعيين كلمة المرور';
  const text = `لقد طلبت إعادة تعيين كلمة المرور. يرجى استخدام الرابط التالي لإعادة تعيين كلمة المرور الخاصة بك: \n\nhttp://yourdomain.com/reset-password?token=${resetToken}`;

  try {
    await sendEmailNotification(userEmail, subject, text);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

module.exports = { generateResetToken, sendPasswordResetEmail };