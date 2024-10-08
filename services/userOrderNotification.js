// services/userOrderNotification.js
const sendEmailNotification = require('./emailNotification');

// وظيفة لإرسال إشعار بالبريد الإلكتروني عند إنشاء طلب جديد
const sendOrderConfirmation = async (userEmail, orderId) => {
  const subject = `تأكيد الطلب: ${orderId}`;
  const text = `شكراً لطلبك. تم تأكيد طلبك بنجاح ورقم الطلب هو: ${orderId}`;

  try {
    await sendEmailNotification(userEmail, subject, text);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

module.exports = sendOrderConfirmation;