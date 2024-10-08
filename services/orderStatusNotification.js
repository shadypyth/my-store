// services/orderStatusNotification.js
const sendEmailNotification = require('./emailNotification');

// وظيفة لإرسال إشعار بالبريد الإلكتروني عند تحديث حالة الطلب
const sendOrderStatusUpdate = async (userEmail, orderId, newStatus) => {
  const subject = `تحديث حالة الطلب: ${orderId}`;
  const text = `تم تحديث حالة طلبك رقم ${orderId} إلى: ${newStatus}`;

  try {
    await sendEmailNotification(userEmail, subject, text);
    console.log('Order status update email sent successfully');
  } catch (error) {
    console.error('Error sending order status update email:', error);
  }
};

module.exports = sendOrderStatusUpdate;