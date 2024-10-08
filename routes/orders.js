// routes/orders.js
const express = require('express');
const Order = require('../models/Order');
const sendEmailNotification = require('../services/emailNotification');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// إنشاء طلب جديد
router.post('/create', async (req, res) => {
  const { userId, items, totalAmount, shippingAddress } = req.body;

  try {
    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      shippingAddress,
    });

    await newOrder.save();

    // إرسال إشعار بالبريد الإلكتروني بعد إنشاء الطلب بنجاح
    await sendEmailNotification(
      req.user.email,
      'Order Confirmation',
      `Thank you for your order. Your order ID is ${newOrder._id}.`
    );

    res.status(201).json({ message: 'تم إنشاء الطلب بنجاح', newOrder });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الطلب' });
  }
});

// جلب جميع الطلبات للمستخدم الحالي
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب الطلبات' });
  }
});

module.exports = router;