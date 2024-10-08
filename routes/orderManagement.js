// routes/orderManagement.js
const express = require('express');
const Order = require('../models/Order');
const sendOrderStatusUpdate = require('../services/orderStatusNotification');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// تحديث حالة الطلب من قبل المسؤول أو صاحب المتجر
router.put('/update-status/:orderId', checkRole(['admin', 'store_owner']), async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId).populate('user');
    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }

    order.status = status;
    order.updatedAt = Date.now();

    await order.save();

    // إرسال إشعار بالبريد الإلكتروني للمستخدم
    await sendOrderStatusUpdate(order.user.email, order._id, status);

    res.status(200).json({ message: 'تم تحديث حالة الطلب بنجاح', order });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تحديث حالة الطلب' });
  }
});

module.exports = router;