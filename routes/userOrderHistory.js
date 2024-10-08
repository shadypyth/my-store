// routes/userOrderHistory.js
const express = require('express');
const Order = require('../models/Order');
const { checkRole } = require('../middlewares/auth');
const router = express.Router();

// جلب سجل الطلبات للمستخدم الحالي
router.get('/history', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب سجل الطلبات' });
  }
});

module.exports = router;